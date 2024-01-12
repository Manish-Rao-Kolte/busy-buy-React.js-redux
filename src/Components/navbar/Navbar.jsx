import React, { useLayoutEffect } from "react";
import styles from "./navbar.module.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Navlink from "../Navlink";
import { useDispatch, useSelector } from "react-redux";
import {
  authSelector,
  getUserAsync,
  setInitialUser,
  signoutUserAsync,
} from "../../redux/reducers/authReducer";
import { auth } from "../../config/firebaseInit";

const Navbar = () => {
  const { user } = useSelector(authSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signoutUserAsync()).then(() => {
      navigate("/");
    });
  };

  useLayoutEffect(() => {
    const setAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setInitialUser(user));
      } else {
        dispatch(setInitialUser(null));
      }
    });
    return () => setAuth();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className={styles.navContainer}>
        <div className={styles.navLogoContainer}>
          <NavLink
            className={styles.navLogo}
            to={user ? `/user/${user.uid}` : "/"}
          >
            <h3 style={{ display: "inline" }}>Busy Buy</h3>
          </NavLink>
          <span>
            {" "}
            &nbsp; Hi{" "}
            {user && user.displayName
              ? `${user.displayName
                  .charAt(0)
                  .toUpperCase()}${user.displayName.slice(1)}`
              : "User"}
            !
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
            to={user ? `/user/${user.uid}` : "/"}
          />
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
