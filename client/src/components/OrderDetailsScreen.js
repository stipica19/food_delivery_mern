import { AddRounded, RemoveRounded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import { getOrderDetails } from "../actions/orderActions";
import moment from "moment";
import "moment/locale/hr";
import CartItem from "./CartItem";
import RightMenu from "./RightMenu";

function OrderDetailsScreen() {
  const dispatch = useDispatch();

  let orderId = useParams();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }
  useEffect(() => {
    dispatch(getOrderDetails(orderId.id));
  }, [dispatch, orderId]);

  return (
    <>
      {!loading ? (
        <>
          <div className="cartItem">
            <div className="cartCheckOutContianer">
              <div className="cartContainer">
                <div className="cartItems">
                  <h4 className="itemName">
                    #{order._id}
                    <span>
                      {order.isDelivered ? (
                        <p>ISPORUCENO</p>
                      ) : order.upripremi ? (
                        <p>U PRIPREMI</p>
                      ) : (
                        <p>ČEKANJE NA PRIHVACANJE</p>
                      )}
                    </span>
                    <div className="quantity">
                      {moment(order.createdAt).calendar()}
                    </div>
                  </h4>
                  <div className="itemSection">
                    <div className="itemQuantity"></div>
                  </div>
                  <p className="itemPrice">
                    Ukupno za platiti:
                    <span className="dolorSign"> {order.totalPrice} KM</span>
                  </p>

                  {order.orderItems.map((data) => (
                    <div className="cartItem" id={data.category}>
                      <div className="imgBox">
                        <img src={data.image} alt="" />
                      </div>
                      <div className="itemSection">
                        <h2 className="itemName">{data.name}</h2>
                        <div className="itemQuantity">
                          <span>x {data.qty}</span>
                        </div>
                      </div>
                      <p className="itemPrice">
                        <span className="itemPriceValue">{data.itemPrice}</span>
                        <span className="dolorSign">{data.price} KM</span>{" "}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default OrderDetailsScreen;
