import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/hr";
import { Link } from "react-router-dom";

function OrderDoneScreen({
  id,
  narudzba_br,
  totalPrice,
  createdAt,
  isDelivered,
  upripremi,
}) {
  const dispatch = useDispatch();

  return (
    <Link to={`/myorder/${id}`}>
      <div className="cartItem orderDoneScreen">
        <div className="imgBox">
          <img
            src="https://thumbs.dreamstime.com/b/food-delivery-logo-template-vector-icon-illustration-170869600.jpg"
            alt=""
          />
        </div>
        <div className="itemSection">
          <h2 className="itemName"> #{narudzba_br}</h2>
          <div className="itemQuantity">
            <span>
              {isDelivered ? (
                <p>ISPORUCENO</p>
              ) : upripremi ? (
                <p>U PRIPREMI</p>
              ) : (
                <p>ČEKANJE NA PRIHVACANJE</p>
              )}
            </span>
            <div className="quantity">{moment(createdAt).calendar()}</div>
          </div>
        </div>
        <p className="itemPrice">
          <span className="dolorSign"> {totalPrice} KM</span>
        </p>
      </div>
    </Link>
  );
}

export default OrderDoneScreen;
