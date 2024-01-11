import React from "react";
import { NavLink } from "react-router-dom";

const Navlink = (props) => {
  const { navClass, to, imgClass, imgSrc, imgAlt, name } = props;
  return (
    <NavLink className={navClass} to={to}>
      <span>
        <img className={imgClass} src={imgSrc} alt={imgAlt} />
      </span>
      {name}
    </NavLink>
  );
};

export default Navlink;
