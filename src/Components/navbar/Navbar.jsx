import React from "react";
import styles from "./navbar.module.css";
import { NavLink, Outlet } from "react-router-dom";
import Navlink from "../Navlink";

const Navbar = () => {
  const user = false;
  const handleSignOut = () => {};

  return (
    <>
      <div className={styles.navContainer}>
        <div className={styles.navLogoContainer}>
          <NavLink className={styles.navLogo} to={user ? "/user" : "/"}>
            <h3 style={{ display: "inline" }}>Busy Buy</h3>
          </NavLink>
          <span>
            {" "}
            &nbsp; Hi {user && user.displayName ? user.displayName : "User"}!
          </span>
        </div>
        <div className={styles.navItemContainer}>
          {user ? (
            <NavLink className={styles.navItem} onClick={handleSignOut}>
              <span>
                <img
                  className={styles.navIcon}
                  src="https://cdn-icons-png.flaticon.com/128/12484/12484007.png"
                  alt="SignOut-Icon"
                />
              </span>
              SignOut
            </NavLink>
          ) : (
            <Navlink
              imgSrc={"https://cdn-icons-png.flaticon.com/128/2996/2996170.png"}
              imgAlt={"SignIn-Icon"}
              navClass={styles.navItem}
              name={"SignIn"}
              imgClass={styles.navIcon}
              to={"/login"}
            />
          )}
          {user && (
            <Navlink
              imgSrc={"https://cdn-icons-png.flaticon.com/128/7708/7708151.png"}
              imgAlt={"Orders-Icon"}
              navClass={styles.navItem}
              name={"My orders"}
              imgClass={styles.navIcon}
              to={`/user/${user.uid}/orders`}
            />
          )}
          {user && (
            <Navlink
              imgSrc={"https://cdn-icons-png.flaticon.com/128/4290/4290854.png"}
              imgAlt={"Cart-Icon"}
              navClass={styles.navItem}
              name={"Cart"}
              imgClass={styles.navIcon}
              to={`/user/${user.uid}/cart`}
            />
          )}
          <Navlink
            imgSrc={"https://cdn-icons-png.flaticon.com/128/609/609803.png"}
            imgAlt={"Home-Icon"}
            navClass={styles.navItem}
            name={"Home"}
            imgClass={styles.navIcon}
            to={user ? "/user" : "/"}
          />
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
