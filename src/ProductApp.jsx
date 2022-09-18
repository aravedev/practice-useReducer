import React, { useReducer } from "react";
import { initialProductState, productReducer } from "./reducers/productReducer";
import { types } from "./reducers/types";

export const ProductApp = () => {
  const [productState, dispatch] = useReducer(
    productReducer,
    initialProductState
  );
  const { products, cart, activeProduct } = productState;

  return (
    <>
      <h2>Product App</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.title}
            <button
              onClick={() =>
                dispatch({
                  type: types.productAddToCart,
                  payload: product,
                })
              }
            >
              Add
            </button>
            <button
              onClick={() =>
                dispatch({
                  type: types.productShow,
                  payload: product,
                })
              }
            >
              show
            </button>
          </li>
        ))}
      </ul>

      <h2>Cart</h2>
      <ul>
        {cart.map((product) => (
          <li key={product.id}>
            {product.title} - quantity:{product.quantity}
            <button
              onClick={() =>
                dispatch({
                  type: types.productRemoveFromCart,
                  payload: product.id,
                })
              }
            >
              Remove All
            </button>
            <button
              onClick={() =>
                dispatch({
                  type: types.productRemoveOneFromCart,
                  payload: product.id,
                })
              }
            >
              Remove one
            </button>
          </li>
        ))}
      </ul>

      <h2>Preview</h2>
      <p>{activeProduct.title}</p>
    </>
  );
};
