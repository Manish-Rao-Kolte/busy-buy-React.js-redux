// import React from "react";
// import styles from "./productCard.module.css";

// function ProductCard(props) {
//   const { prod, incart, qty } = props;
//   const { image, price, title } = prod;
//   const {
//     handleAddCart,
//     handleRemoveCart,
//     handleIncreaseQty,
//     handleDecreaseQty,
//     loading,
//   } = useProductValue();

//   return (
//     <div className={styles.cardContainer}>
//       <div className={styles.imgContainer}>
//         <img src={image} alt={title} />
//       </div>
//       <div className={styles.prodDetail}>{title}</div>
//       <div className={styles.prcbtnContainer}>
//         <div className={styles.price}>&#8377; {price}</div>
//         {incart && (
//           <div className={styles.btnContainer}>
//             <img
//               src="https://cdn-icons-png.flaticon.com/128/1828/1828899.png"
//               alt="decrease-btn"
//               className={styles.decBtn}
//               onClick={() => handleDecreaseQty(prod)}
//             />
//             <b>{incart && qty}</b>
//             <img
//               src="https://cdn-icons-png.flaticon.com/128/1828/1828919.png"
//               alt="increase-btn"
//               className={styles.incBtn}
//               onClick={() => handleIncreaseQty(prod)}
//             />
//           </div>
//         )}
//       </div>
//       <button
//         disabled={loading}
//         className={styles.cardBtn}
//         style={incart && { backgroundColor: "rgb(236, 74, 74)" }}
//         onClick={
//           incart ? () => handleRemoveCart(prod) : () => handleAddCart(prod)
//         }
//       >
//         {incart ? "Remove From Cart" : "Add To Cart"}
//       </button>
//     </div>
//   );
// }

// export default ProductCard;
