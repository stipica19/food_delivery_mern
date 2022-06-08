import React from "react";
import {
  Favorite,
  HomeRounded,
  InventoryRounded,
  Settings,
} from "@mui/icons-material";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import MenuContainer from "./MenuContainer";
const BottomNavBar = () => {
  return (
    <div className="leftMenu">
      <ul id="menu">
        {/* prettier-ignore */}
        <MenuContainer link = "" icon = {<HomeRounded />}  />
        {/* prettier-ignore */}
        <MenuContainer link = "myorders" icon = {<InventoryRounded />}  />
        {/* prettier-ignore */}
        {/* prettier-ignore */}
        <MenuContainer link = {'/'} icon = {<Favorite />} />
        {/* prettier-ignore */}

        {/* prettier-ignore */}
        <MenuContainer link = {'profil'} icon = {<PermIdentityOutlinedIcon />}  />
        <div className="indicator"></div>
      </ul>
    </div>
  );
};

export default BottomNavBar;
