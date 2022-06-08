import React, { useEffect, useState } from "react";
import "./Form.css";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../actions/userActions";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo, dispatch, userLogin]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <div className="login">
      <div className="wrapper">
        <div className="registration_form">
          <div className="title">Prijavi se</div>
          <form onSubmit={submitHandler}>
            <div className="form_wrap">
              <div className="input_wrap">
                <label for="lname">Email</label>
                <input
                  type="email"
                  id="user_name"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input_wrap">
                <label for="lozinka">Lozinka</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="input_wrap">
                <input
                  type="submit"
                  value="Prijavi se"
                  className="submit_btn"
                />
              </div>
            </div>
          </form>
          <div className="redirect-login">
            <p>Nemate račun?</p> <Link to="/registracija">Registracija</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
