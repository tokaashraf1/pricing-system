import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottleList from "./components/BottleList";
import CreateBottle from "./pages/CreateBottle";
import EditBottle from "./pages/EditBottle";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BottleList />} />
        <Route path="/create" element={<CreateBottle />} />
        <Route path="/edit/:id" element={<EditBottle />} />
      </Routes>
    </BrowserRouter>
  );
}
