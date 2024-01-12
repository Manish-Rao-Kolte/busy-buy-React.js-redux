import React from "react";
import styles from "./orderCard.module.css";

function OrderCard(props) {
  const { order, date, orderTotal } = props;

  return (
    <div className={styles.oderCardContainer}>
      <div className="orderCardHeader">
        {" "}
        <h3>Orderd on :-&nbsp; {date}</h3>{" "}
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
