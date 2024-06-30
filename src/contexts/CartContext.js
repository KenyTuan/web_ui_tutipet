"use client";
import React, { createContext, useReducer, useContext } from "react";

export const CartContext = createContext();

function useCartContext() {
  return useContext(CartContext);
}
export const LOADING_CARTS = "LOADING_CART";
export const SET_CARTS = "SET_CARTS";
export const ERROR_LOADING_CARTS = "ERROR_LOADING_CARTS";
export const UPDATE_CART = "UPDATE_CART";
export const ADD_ITEM = "ADD_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const TOGGLE_CHECK_ITEM = "TOGGLE_CHECK_ITEM";
export const CHECK_ALL_ITEMS = "CHECK_ALL_ITEMS";
export const UNCHECK_ALL_ITEMS = "UNCHECK_ALL_ITEMS";
export const SET_QUANTITY = "SET_QUANTITY";

export function loadingCarts() {
  return { type: LOADING_CARTS };
}

export function setCarts(response) {
  return { type: SET_CARTS, payload: response.data.productCart };
}

export function setLoadingFail(response) {
  return { type: ERROR_LOADING_CARTS, payload: response.error };
}

export function updateCart(response) {
  return { type: UPDATE_CART, payload: response.data.productCart };
}
export function setQuantity(item) {
  return { type: SET_QUANTITY, payload: item };
}
export function addItem(item) {
  return { type: ADD_ITEM, item };
}
export function removeItem(id) {
  return { type: REMOVE_ITEM, id };
}

export function toggleCheckItem(index) {
  return { type: TOGGLE_CHECK_ITEM, index };
}

export function checkAllItems() {
  return { type: CHECK_ALL_ITEMS };
}

export function uncheckAllItems() {
  return { type: UNCHECK_ALL_ITEMS };
}

export function cartReducer(state, action) {
  switch (action.type) {
    case LOADING_CARTS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SET_CARTS:
      return {
        ...state,
        cartList: action.payload.map((item) => ({ ...item, checked: false })),
        loading: false,
        error: null,
      };
    case ERROR_LOADING_CARTS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_CART:
      return {
        ...state,
        cartList: action.payload.map((item) => ({ ...item, checked: false })),
      };
    case ADD_ITEM:
      return {
        ...state,
        cartList: [...state.cartList, { ...action.item, checked: false }],
      };
    case SET_QUANTITY:
      return {
        ...state,
        cartList: state.cartList.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: action.payload.quantity,
                checked: item.checked,
              }
            : item
        ),
      };
    case REMOVE_ITEM:
      return {
        ...state,
        cartList: state.cartList.filter((item) => item.id !== action.id),
      };
    case TOGGLE_CHECK_ITEM:
      return {
        ...state,
        cartList: state.cartList.map((item, idx) =>
          idx === action.index ? { ...item, checked: !item.checked } : item
        ),
      };
    case CHECK_ALL_ITEMS:
      return {
        ...state,
        cartList: state.cartList.map((item) => ({ ...item, checked: true })),
      };
    case UNCHECK_ALL_ITEMS:
      return {
        ...state,
        cartList: state.cartList.map((item) => ({ ...item, checked: false })),
      };
    default:
      return state;
  }
}

const initialState = {
  cartList: [],
  loading: true,
  error: null,
};

const CartContextProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, initialState);
  const cartData = { cartState, dispatchCart };
  return <CartContext.Provider value={cartData} {...props} />;
};

export { CartContextProvider, useCartContext };
