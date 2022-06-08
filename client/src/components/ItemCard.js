import { AddRounded } from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
//Modal.setAppElement("#yourAppElement");

const ItemCard = ({ id, category, image, name, price, dodaci, desc }) => {
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(false);

  const [checked, setChecked] = useState([]);

  let subtitle;

  const addToCartHandler = (id) => {
    console.log(checked);
    closeModal();
    dispatch(addToCart(id, 1, checked));
  };

  function openModal() {
    setChecked([]);
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const handleCheck = (event) => {
    let updatedList = [...checked];

    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  return (
    <div className="itemCard" id={category}>
      <div className="imgBox">
        <img src={image} alt="" className="itemImg" />
      </div>

      <div className="itemContent">
        <h3 className="itemName">{name}</h3>
        <p>{desc}</p>
        <div className="bottom">
          <div className="ratings">
            <h3 className="price">
              {price} <span>KM </span>
            </h3>
          </div>
          <i className="addToCart">
            <AddRounded onClick={openModal} />
          </i>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <span className="close-modal" onClick={closeModal}>
          <CloseIcon />
        </span>
        <div>Dodaci</div>
        {dodaci.map((dodatak, index) => (
          <div className="dodatak" key={index}>
            <input
              type="checkbox"
              value={dodatak.value}
              onChange={handleCheck}
            />
            <p>{dodatak.label}</p>
          </div>
        ))}
        <button
          className="btn modal"
          onClick={() => {
            addToCartHandler(id);
          }}
        >
          Dodaj u košaricu{" "}
        </button>
      </Modal>
    </div>
  );
};

export default ItemCard;

/**/
