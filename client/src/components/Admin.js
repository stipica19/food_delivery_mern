import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deliverOrder,
  listOrders,
  preparationOrder,
} from "../actions/orderActions";
import "./Table.css";
import "./Admin.css";
import CartItem from "./CartItem";
import OrderAdminScreen from "./OrderAdminScreen";
import axios from "axios";

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filtiraniPodaci, setFiltiraniPodaci] = useState();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  const [data, setData] = useState();

  //podaci od jedne narudzbe
  const childToParent = async (childdata) => {
    const { data } = await axios.get(
      `http://164.92.176.75:5000/api/orders/${childdata}`
    );
    setData(data);
  };

  //mjenja stanje pripreme konobar
  const handlePreparation = async (id) => {
    dispatch(preparationOrder(id));
  };

  const handleDeliver = async (id) => {
    dispatch(deliverOrder(id));
  };

  const handleState = async (filt) => {
    setData();
    dispatch(listOrders(filt));
  };

  return (
    <div className="orders">
      <aside>
        <button onClick={() => handleState()}>NOVE</button>
        <button onClick={() => handleState("upripremi")}>U PRIPREMI</button>
        <button onClick={() => handleState("isDelivered")}>ZAVRŠENE</button>
        {orders &&
          orders.map((data) => (
            <OrderAdminScreen
              key={data._id}
              order_id={data._id}
              createdAt={data.createdAt}
              totalPrice={data.totalPrice}
              childToParent={childToParent}
            />
          ))}
      </aside>
      <main>
        {data && (
          <>
            <h2>DETALJI NARUDŽBE </h2>
            {data &&
              data.orderItems.map((data) => (
                <div className="cartContainessr">
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
                </div>
              ))}
            <h4>Ukupno za platiti : {data && data.totalPrice.toFixed(2)} KM</h4>
            <h4>
              Podaci korisnika :{" "}
              {data &&
                data.user.first_name +
                  " " +
                  data.user.last_name +
                  ", mob: " +
                  data.user.tel}
            </h4>
            <h4>Lokacija za dostavu : {data && data.shippingAddress}</h4>
            <button
              className="btn-preuzmi"
              onClick={() => {
                !data.upripremi
                  ? handlePreparation(data._id)
                  : handleDeliver(data._id);
              }}
            >
              {!data.upripremi ? "PREUZMI NARUDŽBU" : "POŠALJI NARUDŽBU"}
            </button>
          </>
        )}
      </main>
    </div>
  );
};

export default Admin;
