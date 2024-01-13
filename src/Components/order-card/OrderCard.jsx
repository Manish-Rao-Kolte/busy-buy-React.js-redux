import React from "react";
import styles from "./orderCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrderAsync } from "../../redux/reducers/orderReducer";
import { authSelector } from "../../redux/reducers/authReducer";
import { toast } from "react-toastify";
import { setLoadingTrue } from "../../redux/reducers/loadingReducer";

function OrderCard(props) {
  const { order, date, orderTotal, index } = props;
  const { user } = useSelector(authSelector);
  const dispatch = useDispatch();

  const deleteOrder = () => {
    dispatch(setLoadingTrue());
    dispatch(deleteOrderAsync({ index, user }))
      .then(() => {
        toast.success("Order deleted successfully!!");
      })
      .catch((err) => {
        toast.error("An error occurred!!");
      });
  };

  return (
    <div className={styles.oderCardContainer}>
      <div className={styles.orderCardHeader}>
        {" "}
        <h3>Orderd on :-&nbsp; {date}</h3>{" "}
        <span>
          <button onClick={deleteOrder}>Delete order</button>
        </span>
      </div>
      <table className={styles.orderTable}>
        <thead>
          <tr>
            <th className={styles.title}>
              <p>Item Name</p>
            </th>
            <th className={styles.fixedWidth}>Price</th>
            <th className={styles.fixedWidth}>Quantity</th>
            <th className={styles.fixedWidth}>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {order.map((item) => {
            return (
              <tr>
                <td className={styles.title}>
                  <p>{item.prod.title}</p>
                </td>
                <td>&#8377; {item.prod.price}</td>
                <td>{item.qty}</td>
                <td>&#8377; {(item.qty * item.prod.price).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>Grand Total</td>
            <td>&#8377; {orderTotal.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default OrderCard;
