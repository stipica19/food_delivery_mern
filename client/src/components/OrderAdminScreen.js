import React from "react";
import moment from "moment";

const OrderAdminScreen = ({
  key,
  order_id,
  createdAt,
  totalPrice,
  childToParent,
}) => {
  return (
    <div className="cartItem" onClick={() => childToParent(order_id)}>
      <div className="imgBox">
        <img
          src="https://i.pinimg.com/originals/39/d7/4b/39d74b3aff552c18810fe8a2f0b05b1f.png"
          alt=""
        />
      </div>
      <div className="itemSection">
        <h2 className="itemName">{order_id}</h2>
        <p className="itemPriceKom">
          {moment(createdAt).format("MMMM Do YYYY, h:mm:ss a")}{" "}
        </p>

        <div className="itemQuantity">
          <span>{totalPrice} KM</span>
        </div>
      </div>
    </div>
  );
};

export default OrderAdminScreen;
