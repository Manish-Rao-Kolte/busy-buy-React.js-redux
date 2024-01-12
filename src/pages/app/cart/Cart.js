import React, { useLayoutEffect, useState } from "react";
import ProductCard from "../../../Components/product-card/ProductCard";
import styles from "./cart.module.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import {
  cartSelector,
  getCartAsync,
} from "../../../redux/reducers/cartReducer";
import { createOrderAsync } from "../../../redux/reducers/orderReducer";
import { authSelector } from "../../../redux/reducers/authReducer";
import { loadingSelector } from "../../../redux/reducers/loadingReducer";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, cartTotal } = useSelector(cartSelector);
  const { loading } = useSelector(loadingSelector);
  const { user } = useSelector(authSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createOrder = () => {
    dispatch(createOrderAsync({ user, cart, cartTotal })).then(() => {
      navigate(`/user/${user.uid}/orders`);
    });
  };

  useLayoutEffect(() => {
    user && dispatch(getCartAsync(user));
  }, [user]);

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
      {cart.length === 0 ? (
        <h1>Cart is Empty!!</h1>
      ) : (
        <div style={{ display: "flex" }}>
          <div className={styles.cartTotalContainer}>
            <div>Total : &#8377; {cartTotal.toFixed(2)}/-</div>
            <button
              disabled={loading}
              className={styles.purchaseBtn}
              onClick={() => createOrder(cart)}
            >
              {" "}
              Purchase{" "}
            </button>
          </div>
          <div className={styles.cartContainer}>
            <div className={styles.cartList}>
              {cart.length !== 0 &&
                cart.map((item) => {
                  return (
                    <ProductCard
                      prod={item.prod}
                      qty={item.qty}
                      incart={true}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
