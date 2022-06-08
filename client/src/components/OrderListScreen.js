import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listMyOrders, listOrders } from "../actions/orderActions";
import CartItem from "./CartItem";
import OrderDoneScreen from "./OrderDoneScreen";

const OrderListScreen = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(listMyOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <div className="shipping">
      <div className="cartContainer">
        <div className="cartItems">
          {loadingOrders ? (
            <h1>LOADINGGGG.......</h1>
          ) : (
            <>
              <h4>Narudžbe</h4>
              {orders.map((data, index) => (
                <div>
                  <OrderDoneScreen
                    key={data._id}
                    id={data._id}
                    narudzba_br={index + 1}
                    totalPrice={data.totalPrice}
                    createdAt={data.createdAt}
                    isDelivered={data.isDelivered}
                    upripremi={data.upripremi}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderListScreen;
