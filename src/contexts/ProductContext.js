"use client";
import React, { createContext, useContext, useReducer } from "react";

export const LOADING_PRODUCTS = "LOADING_PRODUCTS";
export const LOADING_PRODUCTS_SUCCESS = "LOADING_PRODUCTS_SUCCESS";
export const LOADING_PRODUCTS_ERROR = "LOADING_PRODUCTS_ERROR";
const ProductContext = createContext();

export function loadingProducts() {
  return { type: LOADING_PRODUCTS };
}

export function setProducts(response, page, search, sortBy, sortOrder) {
  return {
    type: LOADING_PRODUCTS_SUCCESS,
    payload: {
      products: response.data.content,
      total_pages: response.data.totalPages,
      page,
      search,
      sortBy,
      sortOrder,
    },
  };
}

export function setLoadingFail(response) {
  return {
    type: LOADING_PRODUCTS_ERROR,
    payload: response.error,
  };
}

const productReducer = (state, action) => {
  switch (action.type) {
    case LOADING_PRODUCTS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOADING_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOADING_PRODUCTS_SUCCESS:
      return {
        ...state,
        productList: {
          ...state.productList,
          [action.payload.page]: {
            data: action.payload.products,
            timestamp: Date.now(),
            search: action.payload.search,
            sortBy: action.payload.sortBy,
            sortOrder: action.payload.sortOrder,
          },
        },
        total_pages: action.payload.total_pages,
        page: action.payload.page,
        loading: false,
      };
    default:
      return state;
  }
};

const initialState = {
  productList: {},
  total_pages: 1,
  page: 1,
  loading: true,
  error: null,
};

export const ProductProvider = ({ children }) => {
  const [productState, dispatch] = useReducer(productReducer, initialState);

  return (
    <ProductContext.Provider value={{ productState, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};
export const useProductContext = () => useContext(ProductContext);
