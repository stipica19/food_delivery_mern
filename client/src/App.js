import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import BottomNavBar from "./components/BottomNavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import ShippingScreen from "./components/ShippingScreen";
import OrderListScreen from "./components/OrderListScreen";
import OrderDetailsScreen from "./components/OrderDetailsScreen";
import RightMenu from "./components/RightMenu";
import { useDispatch } from "react-redux";
import AddNewFood from "./components/AddNewFood";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Profil from "./components/Profil";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const menuLi = document.querySelectorAll("#menu li");

    function setMenuActive() {
      menuLi.forEach((n) => n.classList.remove("actives"));
      this.classList.add("actives");
    }

    menuLi.forEach((n) => n.addEventListener("click", setMenuActive));
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registracija" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/myorders" element={<OrderListScreen />} />
          <Route path="/myorder/:id" element={<OrderDetailsScreen />} />
          <Route path="/addFood" element={<AddNewFood />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profil" element={<Profil />} />
        </Routes>
        <RightMenu />
        <BottomNavBar />
      </BrowserRouter>
    </div>
  );
}

export default App;
