import React, { useLayoutEffect } from "react";
import OrderCard from "../../../Components/order-card/OrderCard";
import styles from "./order.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrdersAsync,
  orderSelector,
} from "../../../redux/reducers/orderReducer";
import { authSelector } from "../../../redux/reducers/authReducer";

const Order = () => {
  const { orders } = useSelector(orderSelector);
  const { user } = useSelector(authSelector);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    user && dispatch(getOrdersAsync(user)).then(() => {});
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.orderContainer}>
      {orders.length === 0 && <h2>No Order To Show, Place a new order!</h2>}
      <div className={styles.oderList}>
        {orders.length !== 0 &&
          orders.map((item, index) => {
            return (
              <OrderCard
                order={item.order}
                date={item.orderDate}
                orderTotal={item.orderTotal}
                key={index}
                index={index}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Order;
