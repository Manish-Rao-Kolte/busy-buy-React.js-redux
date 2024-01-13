import React from "react";
import { NavLink } from "react-router-dom";

const Navlink = (props) => {
  const { navClass, to, imgClass, imgSrc, imgAlt, name } = props;

  return (
    <NavLink className={navClass} to={to}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "0 1.3vmax",
        }}
      >
        <span>
          <img className={imgClass} src={imgSrc} alt={imgAlt} />
        </span>
        <p style={{ whiteSpace: "nowrap", fontSize: "1.1vmax" }}>{name}</p>
      </div>
    </NavLink>
  );
};

export default Navlink;
