import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./pages/About";
import FavoritePage from "./pages/FavoritePage";
import Home from "./pages/Home";


function App() {
  return <div className="App">
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/favorites" element={<FavoritePage />}></Route>
      <Route path="/about" element={<About />}></Route>
    </Routes>
  </div>;
}

export default App;
