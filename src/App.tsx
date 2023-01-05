import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import About from "./pages/About";
import FavoritePage from "./pages/FavoritePage";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";


function App() {
  return <div className="App">
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/wishlist" element={<FavoritePage />}></Route>
      <Route path="/about" element={<About />}></Route>
    </Routes>
    <Footer />
  </div>;
}

export default App;
