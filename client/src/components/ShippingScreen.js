import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { createdOrder } from "../actions/orderActions.js";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserDetails } from "../actions/userActions";

const ShippingScreen = () => {
  let id = useLocation();
  const dispatch = useDispatch();
  const [napomena, setNapomena] = useState("");
  const [lokacija, setLokacija] = useState("");
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  let navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    if (id.pathname === "/shipping") {
      document.querySelector(".rightMenu").classList.remove("active");
    }
  }, [id, dispatch, userInfo, navigate]);

  const handleSubmit = () => {
    dispatch(
      createdOrder({
        orderItems: cart.cartItems,
        shippingAddress: lokacija,
        totalPrice: cart.itemsPrice,
      })
    );
    navigate("/");
  };
  return (
    <div className="shipping">
      <div className="cartContainer">
        <div className="cartItems">
          {cartItems &&
            cartItems.map((data) => (
              <CartItem
                key={data._id}
                category={data.category}
                name={data.name}
                image={data.image}
                qty={data.qty}
                price={data.price}
                product={data.product}
              />
            ))}
        </div>
      </div>
      <div className="totalSection">
        <h3>Ukupno za platiti</h3>
        <p>
          {cart.itemsPrice} <span>KM </span>
        </p>
      </div>

      <div class="form_wrap">
        <div class="input_wrap">
          <label for="lokacija">Unesite lokaciju za dostavu</label>
          <input
            type="text"
            id="lokacija"
            onChange={(e) => setLokacija(e.target.value)}
          />
        </div>
        <div class="input_wrap">
          <label for="napomena">Napomena</label>
          <input
            type="text"
            id="napomena"
            onChange={(e) => setNapomena(e.target.value)}
          />
        </div>
        <button className="checkOut" type="submit" onClick={handleSubmit}>
          Završi narudžbu
        </button>
      </div>
    </div>
  );
};

export default ShippingScreen;
