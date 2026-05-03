import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateBottle() {
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

  
  useEffect(() => {
    const fetchIngredients = async () => {
      const res = await api.get("/ingredients");
      setAllIngredients(res.data);
    };

    fetchIngredients();
  }, []);

  
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

  
  const handleSubmit = async () => {
    await api.post("/bottles", form);
    navigate("/");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Create Bottle</h2>

      {/* name */}
      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      {/* size */}
      <input
        placeholder="Size ML"
        type="number"
        onChange={(e) => setForm({ ...form, size_ml: e.target.value })}
      />

      {/* base price */}
      <input
        placeholder="Base Price"
        type="number"
        onChange={(e) => setForm({ ...form, base_price: e.target.value })}
      />

      <hr />

      
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
        placeholder="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <button onClick={addIngredient}>Add Ingredient</button>

      <hr />

      {/* show selected ingredients */}
      <h4>Selected Ingredients</h4>
      {form.ingredients.map((i, index) => (
        <p key={index}>
          ID: {i.id} | Qty: {i.quantity}
        </p>
      ))}

      <hr />

      <button onClick={handleSubmit}>Create Bottle</button>
    </div>
  );
}
