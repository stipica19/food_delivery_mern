import React from "react";
import { Link } from "react-router-dom";

const MenuContainer = ({ link, icon }) => {
  return (
    <li>
      <Link to={`/${link}`}>
        <span className="icon">{icon}</span>
      </Link>
    </li>
  );
};

export default MenuContainer;
