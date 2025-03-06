import React, { useState } from "react";
import Home from "./components/Home";
import Admin from "./components/Admin";
import Login from "./components/Login";
import Register from "./components/Signup";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const App = () => {
  const [images, setImages] = useState([]); // Initialize images as an empty array

  return (
    <Router>
      <nav className="nav">
        <ul>
          <div className="left-side">
            <li>
              <Link to="/">Home</Link>
            </li>
          </div>
          <div className="right-side">
            <li>
              <Link to="/admin">Admin</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Signup</Link>
            </li>
          </div>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home images={images} />} />
        <Route
          path="/admin"
          element={<Admin images={images} setImages={setImages} />} // Pass images and setImages to Admin
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;