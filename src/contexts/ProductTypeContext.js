"use client";
import React, { createContext, useContext, useReducer } from "react";

export const LOADING_PRODUCT_TYPES = "LOADING_PRODUCT_TYPES";
export const LOADING_PRODUCT_TYPES_SUCCESS = "LOADING_PRODUCT_TYPES_SUCCESS";
export const LOADING_PRODUCT_TYPES_ERROR = "LOADING_PRODUCT_TYPES_ERROR";
const ProductTypeContext = createContext();

export function loadingProductTypes() {
  return { type: LOADING_PRODUCT_TYPES };
}

export function setProductTypes(response) {
  return {
    type: LOADING_PRODUCT_TYPES_SUCCESS,
    payload: response.data,
  };
}

export function loadingFail(response) {
  return {
    type: LOADING_PRODUCT_TYPES_ERROR,
    payload: response.error,
  };
}

const productReducer = (state, action) => {
  switch (action.type) {
    case LOADING_PRODUCT_TYPES:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOADING_PRODUCT_TYPES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOADING_PRODUCT_TYPES_SUCCESS:
      return {
        ...state,
        productTypeList: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

const initialState = {
  productTypeList: [],
  loading: true,
  error: null,
};

export const ProductTypeProvider = ({ children }) => {
  const [productTypeState, dispatchProductType] = useReducer(
    productReducer,
    initialState
  );

  return (
    <ProductTypeContext.Provider
      value={{ productTypeState, dispatchProductType }}
    >
      {children}
    </ProductTypeContext.Provider>
  );
};
export const useProductTypeContext = () => useContext(ProductTypeContext);
