import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CartItem from "./CartItem";

const RightMenu = () => {
  let navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  useEffect(() => {
    const menuLi = document.querySelectorAll("#menu li");

    function setMenuActive() {
      menuLi.forEach((n) => n.classList.remove("active"));
      this.classList.add("active");
    }

    menuLi.forEach((n) => n.addEventListener("click", setMenuActive));
  }, []);

  const placeOrderHandler = () => {
    navigate("/shipping");
  };
  return (
    <div className="rightMenu">
      {!cart ? (
        <div className="addSomeItem">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/food-delivery-37c59.appspot.com/o/Images%2FemptyCart.png?alt=media&token=50b733d4-cdd9-4025-bffe-8efa4066ca24"
            alt=""
            className="emptyCart"
          />
        </div>
      ) : (
        <div className="cartCheckOutContianer">
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
                    dodaci={data.dodaci}
                    cart_id={data.cart_id}
                  />
                ))}
            </div>
          </div>
          <div className="totalSection">
            <h3>Ukupno za platiti</h3>
            <p>
              {cart.itemsPrice}
              <span> KM </span>
            </p>
          </div>
          <button className="checkOut" onClick={placeOrderHandler}>
            Idi na blagajnu
          </button>
        </div>
      )}
    </div>
  );
};

export default RightMenu;
