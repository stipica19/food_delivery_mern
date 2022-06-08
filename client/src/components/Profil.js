import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getUserDetails,
  logout,
  updateUser,
  updateUserProfile,
} from "../actions/userActions";
import LockIcon from "@mui/icons-material/Lock";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
const Profil = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [display, setDiplayForm] = useState(false);
  const [addressDisplay, setAddressDisplay] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [userInputValue, setUserInputValue] = useState(user.address);

  useEffect(() => {
    if (!userInfo) {
      navigation("/login");
    } else {
      if (!user || !user.name) {
        // dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
      } else {
        console.log("first");
      }
    }
  }, [dispatch, navigation, userInfo, user]);

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      //setMessage('Passwords do not match')
    } else {
      if (userInputValue !== user.address) {
        dispatch(updateUserProfile({ _id: user._id, address: userInputValue }));
      }

      dispatch(updateUserProfile({ id: user._id, password }));
    }

    setAddressDisplay(!addressDisplay);
  };

  const onInputValueChange = (value) => {
    console.log(value);
    setUserInputValue(value);
  };
  const logoutHandle = () => {
    dispatch(logout());
  };
  return (
    <div className="profile">
      <div className="card-profil">
        <div className="icon-mui">
          <PersonIcon />
          <h4>Račun</h4>
        </div>

        <p>
          {user.first_name} {user.last_name}
        </p>
        <p> {user.tel}</p>
      </div>
      <div className="card-profil">
        <div className="icon-mui">
          {" "}
          <EditLocationAltIcon />
          <h4>Adresa za dostavu</h4>
        </div>

        {!addressDisplay ? (
          <p className="address-profile">
            {user.address}{" "}
            <span onClick={() => setAddressDisplay(!addressDisplay)}>
              IZMJENI
            </span>
          </p>
        ) : (
          <div className="">
            <input
              type="text"
              value={userInputValue}
              onChange={(e) => onInputValueChange(e.target.value)}
            />
            <div className="address-profile">
              <button className="btn" onClick={() => handleSubmit()}>
                Ažuriraj
              </button>
              <span onClick={() => setAddressDisplay(!addressDisplay)}>
                Odustani
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="card-profil">
        <div className="address-profile">
          <div className="icon-mui">
            {" "}
            <LockIcon />
            <h4> Promjeni šifru</h4>
          </div>

          <span onClick={() => setDiplayForm(!display)}> IZMJENI</span>
        </div>

        <div
          className={
            display ? `card-profile-password` : "card-profile-password-none"
          }
        >
          <form onSubmit={handleSubmit}>
            <p>Trenutna šifra</p>
            <input type="text" />
            <p>Nova šifra</p>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p>Ponovite novu šifru</p>
            <input
              type="text"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="address-profile">
              <button className="btn">Spremi</button>
              <span onClick={() => setDiplayForm(!display)}>Odustani</span>
            </div>
          </form>
        </div>
      </div>
      <div className="icon-mui" onClick={() => logoutHandle()}>
        <p>Odjava &nbsp;</p> <LogoutIcon />
      </div>
    </div>
  );
};

export default Profil;
