import { AddRounded, RemoveRounded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";

function CartItem({
  cart_id,
  product,
  category,
  name,
  image,
  price,
  qty,
  dodaci,
}) {
  const dispatch = useDispatch();
  const [itemPrice, setItemPrice] = useState(parseInt(qty) * parseFloat(price));

  useEffect(() => {
    setItemPrice(parseInt(qty) * parseFloat(price));
  }, [qty, price]);

  const updateQty = (action, id) => {
    if (action === "add") {
      console.log(dodaci);
      dispatch(addToCart(id, qty + 1, dodaci));
    } else {
      if (qty === 1) {
        dispatch(removeFromCart(cart_id));
      } else {
        dispatch(addToCart(id, qty - 1, dodaci));
      }
    }
  };

  return (
    <div className="cartItem" id={category}>
      <div className="imgBox">
        <img src={image} alt="" />
      </div>
      <div className="itemSection">
        <h2 className="itemName">{name}</h2>
        <p className="itemPriceKom">{price.toFixed(2)} KM/kom</p>

        {dodaci &&
          dodaci.map((dodatak) => (
            <p key={dodatak} className="itemPriceKom">
              {dodatak}
            </p>
          ))}
        <div className="itemQuantity">
          <span>x {qty}</span>

          <div className="quantity">
            <RemoveRounded
              className="itemRemove"
              onClick={() => updateQty("remove", product)}
            />
            <AddRounded
              className="itemAdd"
              onClick={() => updateQty("add", product)}
            />
          </div>
        </div>
      </div>
      <p className="itemPrice">
        <span className="itemPriceValue">{itemPrice}</span>
        <span className="dolorSign">KM</span>{" "}
      </p>
    </div>
  );
}

export default CartItem;
