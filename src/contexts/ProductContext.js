"use client";
import React, { createContext, useContext, useReducer } from "react";

export const LOADING_PRODUCTS = "LOADING_PRODUCTS";
export const LOADING_PRODUCTS_SUCCESS = "LOADING_PRODUCTS_SUCCESS";
export const LOADING_PRODUCTS_ADMIN_SUCCESS = "LOADING_PRODUCTS_ADMIN_SUCCESS";
export const LOADING_PRODUCTS_ERROR = "LOADING_PRODUCTS_ERROR";
export const SET_ROW_PRODUCTS = "SET_ROW_PRODUCTS";
export const ADĐ_PRODUCT = "ADĐ_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

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

export function loadingManagerProductSuceess(response) {
  return {
    type: LOADING_PRODUCTS_ADMIN_SUCCESS,
    payload: response.data,
  };
}

export function setLoadingFail(response) {
  return {
    type: LOADING_PRODUCTS_ERROR,
    payload: response.error,
  };
}

export function setRowPage(rowPage) {
  return {
    type: SET_ROW_PRODUCTS,
    payload: rowPage,
  };
}

export function setProduct(response) {
  return {
    type: ADĐ_PRODUCT,
    payload: response.data,
  };
}

export function acctionAddProduct(response) {
  return {
    type: ADD_PRODUCT,
    payload: response.data,
  };
}

export function acctionUpdateProduct(response, index) {
  return {
    type: UPDATE_PRODUCT,
    payload: { updateProduct: response.data, index: index },
  };
}

export function acctionDeleteProduct(id) {
  return {
    type: DELETE_PRODUCT,
    payload: id,
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
    case LOADING_PRODUCTS_ADMIN_SUCCESS:
      return {
        ...state,
        productListAdmin: action.payload,
        loading: true,
      };
    case SET_ROW_PRODUCTS:
      return {
        ...state,
        productList: {},
        loading: true,
        error: null,
        row_page: action.payload,
        total_pages: 1,
        page: 1,
      };
    case ADĐ_PRODUCT:
      return {
        productList: {},
        total_pages: 1,
        page: 1,
        row_page: 5,
        loading: true,
        error: null,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        productListAdmin: [...state.productListAdmin, action.payload],
      };
    case UPDATE_PRODUCT:
      const { updateProduct, index } = action.payload;
      const newProductListAdmin = [...state.productListAdmin];
      newProductListAdmin[index] = updateProduct;
      return {
        ...state,
        productListAdmin: newProductListAdmin,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        productListAdmin: state.productListAdmin.filter(
          (item) => item.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

const initialState = {
  productListAdmin: [],
  productList: {},
  total_pages: 1,
  page: 1,
  row_page: 5,
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
