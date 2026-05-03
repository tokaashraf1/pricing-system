import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBottle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    size_ml: "",
    base_price: "",
    ingredients: [],
  });

  const [allIngredients, setAllIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [quantity, setQuantity] = useState("");

  // 🟢 fetch bottle + ingredients
  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`/bottles/${id}`);

      const bottle = res.data.data;

      setForm({
        name: bottle.name,
        size_ml: bottle.size_ml,
        base_price: bottle.base_price,
        ingredients: bottle.ingredients || [],
      });
    };

    fetchData();
  }, [id]);

  // 🟢 fetch all ingredients
  useEffect(() => {
    const fetchIngredients = async () => {
      const res = await api.get("/ingredients");
      setAllIngredients(res.data.data || res.data);
    };

    fetchIngredients();
  }, []);

  // 🟢 add ingredient
  const addIngredient = () => {
    if (!selectedIngredient || !quantity) return;

    const exists = form.ingredients.find(
      (i) => i.id === parseInt(selectedIngredient),
    );

    if (exists) {
      alert("Ingredient already added");
      return;
    }

    setForm({
      ...form,
      ingredients: [
        ...form.ingredients,
        {
          id: parseInt(selectedIngredient),
          quantity: parseFloat(quantity),
        },
      ],
    });

    setSelectedIngredient("");
    setQuantity("");
  };

  // 🟢 update
  const handleUpdate = async () => {
    await api.put(`/bottles/${id}`, form);
    navigate("/");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Bottle</h2>

      {/* name */}
      <input
        value={form.name}
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      {/* size */}
      <input
        value={form.size_ml}
        placeholder="Size ML"
        type="number"
        onChange={(e) => setForm({ ...form, size_ml: e.target.value })}
      />

      {/* base price */}
      <input
        value={form.base_price}
        placeholder="Base Price"
        type="number"
        onChange={(e) => setForm({ ...form, base_price: e.target.value })}
      />

      <hr />

      {/* ingredient select */}
      <select
        value={selectedIngredient}
        onChange={(e) => setSelectedIngredient(e.target.value)}
      >
        <option value="">Select Ingredient</option>
        {allIngredients.map((i) => (
          <option key={i.id} value={i.id}>
            {i.name}
          </option>
        ))}
      </select>

      {/* quantity */}
      <input
        value={quantity}
        placeholder="Quantity"
        type="number"
        onChange={(e) => setQuantity(e.target.value)}
      />

      <button onClick={addIngredient}>Add Ingredient</button>

      <hr />

      {/* show ingredients */}
      <h4>Ingredients</h4>
      {form.ingredients.map((i, index) => (
        <p key={index}>
          ID: {i.id} | Qty: {i.quantity}
        </p>
      ))}

      <hr />

      <button onClick={handleUpdate}>Update Bottle</button>
    </div>
  );
}
