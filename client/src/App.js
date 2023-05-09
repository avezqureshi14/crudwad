import "./App.css";
import Create from "./components/Create";
import Read from "./components/Read";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Update from "./components/Update";
import ProductDetail from "./components/ProductDetail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Read />}></Route>
          <Route path="/create" element={<Create />}></Route>
          <Route path="/update/:id" element={<Update />}></Route>
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
