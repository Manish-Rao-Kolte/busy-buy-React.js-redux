import React, { useState } from "react";
import styles from "./productCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartAsync,
  decreaseCartQtyAsync,
  increaseCartQtyAsync,
  removeFromCartAsync,
} from "../../redux/reducers/cartReducer";
import { authSelector } from "../../redux/reducers/authReducer";

function ProductCard(props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { prod, incart, qty } = props;
  const { image, price, title } = prod;
  const { user } = useSelector(authSelector);

  const handleAddToCart = () => {
    setLoading(true);
    dispatch(addToCartAsync({ user, prod })).then(() => {
      setLoading(false);
    });
  };

  const handleRemoveCart = () => {
    setLoading(true);
    dispatch(removeFromCartAsync({ user, prod })).then(() => {
      setLoading(false);
    });
  };

  const handleIncreaseCartQty = () => {
    setLoading(true);
    dispatch(increaseCartQtyAsync({ user, prod })).then(() => {
      setLoading(false);
    });
  };

  const handleDecreaseCartQty = () => {
    setLoading(true);
    dispatch(decreaseCartQtyAsync({ user, prod })).then(() => {
      setLoading(false);
    });
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.imgContainer}>
        <img src={image} alt={title} />
      </div>
      <div className={styles.prodDetail}>{title}</div>
      <div className={styles.prcbtnContainer}>
        <div className={styles.price}>&#8377; {price}</div>
        {incart && (
          <div className={styles.btnContainer}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/1828/1828899.png"
              alt="decrease-btn"
              className={styles.decBtn}
              onClick={() => handleDecreaseCartQty(prod)}
            />
            <b>{incart && qty}</b>
            <img
              src="https://cdn-icons-png.flaticon.com/128/1828/1828919.png"
              alt="increase-btn"
              className={styles.incBtn}
              onClick={() => handleIncreaseCartQty(prod)}
            />
          </div>
        )}
      </div>
      <button
        disabled={loading}
        className={styles.cardBtn}
        style={incart && { backgroundColor: "rgb(236, 74, 74)" }}
        onClick={
          incart ? () => handleRemoveCart(prod) : () => handleAddToCart(prod)
        }
      >
        {loading ? "..." : incart ? "Remove From Cart" : "Add To Cart"}
      </button>
    </div>
  );
}

export default ProductCard;
