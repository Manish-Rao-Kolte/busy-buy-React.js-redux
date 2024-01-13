import React, { useLayoutEffect } from "react";
import styles from "./navbar.module.css";
import {
  NavLink,
  Outlet,
  redirect,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Navlink from "../Navlink";
import { useDispatch, useSelector } from "react-redux";
import {
  authSelector,
  setInitialUser,
  signoutUserAsync,
} from "../../redux/reducers/authReducer";
import { auth } from "../../config/firebaseInit";
import {
  loadingSelector,
  setLoadingFalse,
  setLoadingTrue,
} from "../../redux/reducers/loadingReducer";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user } = useSelector(authSelector);
  const { loading } = useSelector(loadingSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  if (loading) {
    setTimeout(() => {
      dispatch(setLoadingFalse());
    }, 400);
  }

  if (user) {
    const bool = location.pathname.includes(user.uid);
    if (!bool) {
      navigate(`/user/${user.uid}`);
    }
  }

  const handleSignOut = () => {
    dispatch(signoutUserAsync())
      .then(() => {
        navigate("/");
        toast.success("Signed out successfully!!");
      })
      .catch((err) => {
        toast.error("An error occured!!");
      });
  };

  const handleLoading = () => {
    dispatch(setLoadingTrue());
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

  if (loading) {
    return (
      <>
        <Backdrop
          sx={{ color: "red", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    );
  }

  return (
    <>
      <div className={styles.navContainer}>
        <div className={styles.navLogoContainer}>
          <NavLink
            className={styles.navLogo}
            to={user ? `/user/${user.uid}` : "/"}
            onClick={() => handleLoading()}
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
          <div
            onClick={() => {
              handleLoading();
              user && handleSignOut();
            }}
          >
            {user ? (
              <Navlink
                imgSrc={
                  "https://cdn-icons-png.flaticon.com/128/12484/12484007.png"
                }
                imgAlt={"SignOut-Icon"}
                navClass={styles.navItem}
                name={"SignOut"}
                imgClass={styles.navIcon}
                to={"/"}
              ></Navlink>
            ) : (
              <Navlink
                imgSrc={
                  "https://cdn-icons-png.flaticon.com/128/2996/2996170.png"
                }
                imgAlt={"SignIn-Icon"}
                navClass={styles.navItem}
                name={"SignIn"}
                imgClass={styles.navIcon}
                to={"/login"}
                onClick={() => handleLoading()}
              />
            )}
          </div>
          <div onClick={() => handleLoading()}>
            {user && (
              <Navlink
                imgSrc={
                  "https://cdn-icons-png.flaticon.com/128/7708/7708151.png"
                }
                imgAlt={"Orders-Icon"}
                navClass={styles.navItem}
                name={"My orders"}
                imgClass={styles.navIcon}
                to={`/user/${user.uid}/orders`}
              />
            )}
          </div>
          <div onClick={() => handleLoading()}>
            {user && (
              <Navlink
                imgSrc={
                  "https://cdn-icons-png.flaticon.com/128/4290/4290854.png"
                }
                imgAlt={"Cart-Icon"}
                navClass={styles.navItem}
                name={"Cart"}
                imgClass={styles.navIcon}
                to={`/user/${user.uid}/cart`}
                onClick={() => handleLoading()}
              />
            )}
          </div>
          <div onClick={() => handleLoading()}>
            <Navlink
              imgSrc={"https://cdn-icons-png.flaticon.com/128/609/609803.png"}
              imgAlt={"Home-Icon"}
              navClass={styles.navItem}
              name={"Home"}
              imgClass={styles.navIcon}
              to={user ? `/user/${user.uid}` : "/"}
              onClick={() => handleLoading()}
            />
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
