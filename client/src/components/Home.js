import React, { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import BannerName from "./BannerName";
import SubMenuContainer from "./SubMenuContainer";
import { MenuItems, Items } from "./Data";
import { useDispatch, useSelector } from "react-redux";
import ItemCard from "./ItemCard";
import CartItem from "./CartItem";
import { listProducts } from "../actions/productActions";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const setData = (itemId) => {
    dispatch(listProducts(itemId));
  };

  useEffect(() => {
    dispatch(listProducts(""));

    const menuCards = document
      .querySelector(".rowContainer")
      .querySelectorAll(".rowMenuCard");

    function setMenuCardActive() {
      menuCards.forEach((n) => n.classList.remove("active"));
      this.classList.add("active");
    }

    menuCards.forEach((n) => n.addEventListener("click", setMenuCardActive));
  }, [dispatch]);

  return (
    <main>
      <div className="mainContainer">
        <div className="banner">
          <BannerName name={"....."} discount={"20"} more={"#"} />
          <img
            src="https://firebasestorage.googleapis.com/v0/b/food-delivery-37c59.appspot.com/o/Images%2Fdelivery.png?alt=media&token=69b9823d-96df-452a-bd4e-14d27a4cc337"
            alt=""
            className="deliveryPic"
          />
        </div>

        <div className="dishContainer">
          <div className="menuCard">
            <SubMenuContainer name={"Menu Category"} />
          </div>
          <div className="rowContainer">
            {MenuItems &&
              MenuItems.map((data) => (
                <div key={data.id} onClick={() => setData(data.itemId)}>
                  <MenuCard
                    imgSrc={data.imgSrc}
                    name={data.name}
                    isActive={data.id === "1" ? true : false}
                  />
                </div>
              ))}
          </div>

          <div className="dishItemContainer">
            {products &&
              products.map((data) => (
                <ItemCard
                  key={data._id}
                  category={data.category}
                  image={data.image}
                  name={data.name}
                  price={data.price}
                  dodaci={data.dodaci}
                  desc={data.description}
                  id={data._id}
                />
              ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
