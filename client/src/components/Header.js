import React, { useEffect } from "react";
import {} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";

import {
  SearchRounded,
  ShoppingCartCheckoutRounded,
} from "@mui/icons-material";
import { getUserDetails } from "../actions/userActions";

const Header = () => {
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    const toggleIcon = document.querySelector(".toggleMenu");
    toggleIcon.addEventListener("click", () => {
      document.querySelector(".rightMenu").classList.toggle("active");
    });
  }, []);

  return (
    <header>
      <img
        src="https://www.pngall.com/wp-content/uploads/8/Restaurant-Logo-PNG-Free-Image.png"
        alt=""
        className="logo"
      />
      <div className="inputBox">
        <SearchRounded className="searchIcon" />
        <input type="text" placeholder="search" />
      </div>
      <div className="profileContainer">
        <h2 className="userName">
          {userInfo ? (
            <p onClick={() => navigate("/profil")}>{userInfo.user_name}</p>
          ) : (
            <span className="icon-mui" onClick={() => navigate("/login")}>
              <LoginIcon /> Prijavi se
            </span>
          )}
        </h2>
      </div>
      <div className="toggleMenu">
        <ShoppingCartCheckoutRounded className="toggleIcon" />
        <div className="cart_content">
          <p>{cartItems.length}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
