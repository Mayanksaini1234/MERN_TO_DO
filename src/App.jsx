import React from 'react'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Custom/Header.jsx";
import Home from "./Pages/Home.jsx"
import Login from "./Pages/Login.jsx";
import NotFound from "./Pages/NotFound.jsx";
import Register from "./Pages/Register.jsx";
import Profile from "./Pages/Profile.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/myProfile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
