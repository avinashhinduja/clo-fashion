import { Routes, Route } from "react-router-dom";
import Home from "./App/Products/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
