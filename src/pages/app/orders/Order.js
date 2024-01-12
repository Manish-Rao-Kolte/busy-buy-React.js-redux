import React, { useLayoutEffect } from "react";
import OrderCard from "../../../Components/order-card/OrderCard";
import styles from "./order.module.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrdersAsync,
  orderSelector,
} from "../../../redux/reducers/orderReducer";
import {
  loadingSelector,
  toggleLoading,
} from "../../../redux/reducers/loadingReducer";
import { authSelector } from "../../../redux/reducers/authReducer";

const Order = () => {
  const { orders } = useSelector(orderSelector);
  const { loading } = useSelector(loadingSelector);
  const { user } = useSelector(authSelector);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    user && dispatch(getOrdersAsync(user)).then(() => {});
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
    <div className={styles.orderContainer}>
      {orders.length === 0 && <h2>No Order To Show, Place a new order!</h2>}
      <div className={styles.oderList}>
        {orders.length !== 0 &&
          orders.map((item) => {
            return (
              <OrderCard
                order={item.order}
                date={item.orderDate}
                orderTotal={item.orderTotal}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Order;
