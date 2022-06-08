import React, { useEffect, useState } from "react";
import "./Form.css";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [user_name, setUser_name] = useState("");
  const [address, setAddress] = useState("");
  const [address_desc, setAddress_desc] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Lozinke se ne podudaraju");
    } else {
      dispatch(
        register(
          first_name,
          last_name,
          email,
          user_name,
          address,
          address_desc,
          tel,
          password
        )
      );
    }
  };
  return (
    <div className="register">
      <div className="wrapper">
        <div className="registration_form">
          <div className="title">Registracija</div>

          <form onSubmit={handleSubmit}>
            <div className="form_wrap">
              <div className="input_wrap">
                <label for="fname">Ime</label>
                <input
                  type="text"
                  id="first_name"
                  onChange={(e) => setFirst_name(e.target.value)}
                />
              </div>
              <div className="input_wrap">
                <label for="lname">Prezime</label>
                <input
                  type="text"
                  id="last_name"
                  onChange={(e) => setLast_name(e.target.value)}
                />
              </div>
              <div className="input_wrap">
                <label for="lname">Korisničko ime</label>
                <input
                  type="text"
                  id="user_name"
                  onChange={(e) => setUser_name(e.target.value)}
                />
              </div>

              <div className="input_wrap">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input_wrap">
                <label for="lozinka">Lozinka</label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="input_wrap">
                <label for="lozinka">Potvrdi lozinku </label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="input_wrap">
                <label for="tel">Kontakt broj</label>
                <input
                  type="text"
                  id="tel"
                  onChange={(e) => setTel(e.target.value)}
                />
              </div>

              <div className="input_wrap">
                <label for="address">Adresa</label>
                <input
                  type="text"
                  id="address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="input_wrap">
                <label for="address_desc">Opis lokacije</label>
                <input
                  type="text"
                  id="address_desc"
                  onChange={(e) => setAddress_desc(e.target.value)}
                />
              </div>

              <div className="input_wrap">
                <input
                  type="submit"
                  value="Registriraj se"
                  className="submit_btn"
                />
              </div>
            </div>
          </form>
          <div className="redirect-login">
            <p>Već imate račun?</p> <Link to="/login">Prijava</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
