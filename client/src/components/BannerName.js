import React from "react";
import { Link } from "react-router-dom";

function BannerName({ name, discount, more }) {
  const currency = "$";
  return (
    <div className="bannerContent">
      <h3>DOBRO DOŠLI :D </h3>

      <Link to="/registracija">Registracija</Link>
    </div>
  );
}

export default BannerName;
