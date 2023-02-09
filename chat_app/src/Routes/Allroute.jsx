
import React from "react";
import { Route, Routes } from "react-router-dom";
import Avatar from "../Components/Avatar";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
const Allroute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/avatar" element={<Avatar />}></Route>
    </Routes>
  );
};

export default Allroute;
