import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function BottleList() {
  const [bottles, setBottles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get("/bottles");
      const data = res.data?.data;

      if (Array.isArray(data)) setBottles(data);
      else if (data) setBottles([data]);
      else setBottles([]);
    } catch (error) {
      console.error(error);
      setBottles([]);
    }
  };

  const deleteBottle = async (id) => {
    await api.delete(`/bottles/${id}`);
    fetchData();
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>🍶 Bottles Dashboard</h1>

        <button style={styles.createBtn} onClick={() => navigate("/create")}>
          + Create Bottle
        </button>
      </div>

      {/* EMPTY */}
      {bottles.length === 0 && <p style={styles.empty}>No bottles found 😴</p>}

      {/* CARDS */}
      <div style={styles.grid}>
        {bottles.map((bottle) => (
          <div key={bottle.id} style={styles.card}>
            <h3 style={styles.name}>{bottle.name}</h3>

            <p style={styles.text}>
              📏 Size: <b>{bottle.size_ml} ml</b>
            </p>

            <p style={styles.text}>
              💰 Price: <b>{bottle.price}</b>
            </p>

            <div style={styles.ingredients}>
              <b>🧪 Ingredients:</b>
              <div style={styles.ingredientList}>
                {bottle.ingredients?.map((i) => (
                  <span key={i.id} style={styles.tag}>
                    {i.name} ({i.quantity})
                  </span>
                ))}
              </div>
            </div>

            <div style={styles.actions}>
              <button
                style={styles.editBtn}
                onClick={() => navigate(`/edit/${bottle.id}`)}
              >
                ✏ Edit
              </button>

              <button
                style={styles.deleteBtn}
                onClick={() => deleteBottle(bottle.id)}
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 🎨 STYLES */
const styles = {
  page: {
    padding: "30px",
    background: "#f4f6f8",
    minHeight: "100vh",
    fontFamily: "Arial",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
  },

  createBtn: {
    padding: "10px 15px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "15px",
  },

  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    transition: "0.3s",
  },

  name: {
    marginBottom: "10px",
    color: "#111",
  },

  text: {
    margin: "5px 0",
    color: "#555",
  },

  ingredients: {
    marginTop: "10px",
  },

  ingredientList: {
    marginTop: "5px",
    display: "flex",
    flexWrap: "wrap",
    gap: "5px",
  },

  tag: {
    background: "#e0e7ff",
    color: "#3730a3",
    padding: "4px 8px",
    borderRadius: "6px",
    fontSize: "12px",
  },

  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  },

  editBtn: {
    background: "#10b981",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  empty: {
    textAlign: "center",
    color: "#777",
    marginTop: "40px",
  },
};
