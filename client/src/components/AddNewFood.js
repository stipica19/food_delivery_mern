import React, { useState } from "react";
import "./Form.css";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";

const options = [
  { label: "kečap", value: "kečap" },
  { label: "majoneza", value: "majoneza" },
  { label: "zelena salata", value: "zelena salata" },
];
const AddNewFood = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [dodaci, setDodatci] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(dodaci);

    const { data } = await axios.post(
      "http://164.92.176.75:5000/api/products/",
      {
        name,
        image,
        category,
        description,
        price,
        dodaci,
      },
      config
    );
  };

  return (
    <div classNameName="register">
      <div className="wrapper">
        <div className="registration_form">
          <div className="title">Registracija</div>

          <form onSubmit={handleSubmit}>
            <div className="form_wrap">
              <div className="input_wrap">
                <label for="naziv">Naziv</label>
                <input
                  type="text"
                  id="naziv"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <h1>Izaberi dodatke</h1>
                <MultiSelect
                  options={options}
                  value={dodaci}
                  onChange={setDodatci}
                  labelledBy="Select"
                />
              </div>

              <div className="input_wrap">
                <label for="slika">URL SLIKE</label>
                <input
                  type="text"
                  id="slika"
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
              <div className="input_wrap">
                <label for="kategorija">Kategorija</label>
                <input
                  type="text"
                  id="kategorija"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>

              <div className="input_wrap">
                <label for="opis">Opis</label>
                <input
                  type="text"
                  id="opis"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="input_wrap">
                <label for="cijena">cijena</label>
                <input
                  type="text"
                  id="cijena"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="input_wrap">
                <input
                  type="submit"
                  value="Spremi proizvod"
                  className="submit_btn"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewFood;
