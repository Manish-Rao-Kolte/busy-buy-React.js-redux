import React, { useLayoutEffect } from "react";
import ProductCard from "../../../Components/product-card/ProductCard";
import styles from "./product.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  productSelector,
  getProductsAsync,
} from "../../../redux/reducers/productReducer";
import { authSelector } from "../../../redux/reducers/authReducer";
import {
  boxFilteredProducts,
  changeFilterRange,
  filterSelector,
  priceFilteredProducts,
  textFilteredProducts,
} from "../../../redux/reducers/filterReducer";
import {
  setLoadingFalse,
  setLoadingTrue,
} from "../../../redux/reducers/loadingReducer";

const Product = () => {
  const { user } = useSelector(authSelector);
  const { products } = useSelector(productSelector);
  const { filterRange, filteredProducts } = useSelector(filterSelector);
  const dispatch = useDispatch();

  const setSearchTextFilter = (e) => {
    dispatch(textFilteredProducts({ products, searchText: e.target.value }));
  };

  const setPriceFilter = (value) => {
    dispatch(changeFilterRange(value));
    if (filteredProducts.length === 0) {
      dispatch(priceFilteredProducts(products));
    } else {
      dispatch(priceFilteredProducts(filteredProducts));
    }
  };

  const boxPriceFilter = (e) => {
    dispatch(
      boxFilteredProducts({
        isChecked: e.target.checked,
        products,
        value: e.target.value,
      })
    );
  };

  useLayoutEffect(() => {
    dispatch(getProductsAsync());
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.productPage}>
      <div className={styles.filterContainer}>
        <div className={styles.filterHeading}> Filter </div>
        <p> Price: &#8377; {filterRange}</p>
        <input
          type="range"
          onChange={(e) => setPriceFilter(e.target.value * 20)}
        />
        <div className={styles.filterHeading}> Category </div>
        <br />
        <div className={styles.inputContainer}>
          <div>
            <input
              type="checkbox"
              value="men's clothing"
              onChange={(e) => boxPriceFilter(e)}
            />
            <span>Men's clothing</span>
          </div>
          <div>
            <input
              type="checkbox"
              value="electronics"
              onChange={(e) => boxPriceFilter(e)}
            />
            <span>Electronics</span>
          </div>
          <div>
            <input
              type="checkbox"
              value="jewelery"
              onChange={(e) => boxPriceFilter(e)}
            />
            <span>Jewelery</span>
          </div>
          <div>
            <input
              type="checkbox"
              value="women's clothing"
              onChange={(e) => boxPriceFilter(e)}
            />
            <span>Women's clothing</span>
          </div>
        </div>
      </div>
      <div className={styles.productsContainer}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search Item By Name"
            onChange={(e) => {
              setSearchTextFilter(e);
            }}
          />
        </div>
        <div className={styles.prodList}>
          {filterRange !== 0 ? (
            filteredProducts.length === 0 ? (
              products.map((prod, i) => {
                return <ProductCard key={i} prod={prod} />;
              })
            ) : (
              filteredProducts.map((prod, i) => {
                return <ProductCard key={i} prod={prod} />;
              })
            )
          ) : (
            <div
              style={{
                width: "50vw",
                padding: "20% 25%",
                fontSize: "2vmax",
              }}
            >
              Sorry!! No Products in this range...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
