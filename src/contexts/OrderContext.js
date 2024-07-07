"use client";
import React, { createContext, useContext, useReducer } from "react";

export const LOADING_ORDERS = "LOADING_ORDERS";
export const LOADING_ORDERS_SUCCESS = "LOADING_ORDERS_SUCCESS";
export const LOADING_ORDERS_ERROR = "LOADING_ORDERS_ERROR";
export const SET_ROW_ORDERS = "SET_ROW_ORDERS";
export const ADD_ORDER_USER = "ADD_ORDER_USER";
export const ADD_ORDER = "ADD_ORDER";
export const UPDATE_ORDER_USER = "UPDATE_ORDER_USER";
export const UPDATE_ORDER = "UPDATE_ORDER";
export const DELETE_ORDER = "DELETE_ORDER";
export const LOADING_ORDERS_ADMIN_SUCCESS = "LOADING_ORDERS_ADMIN_SUCCESS";

const OrderContext = createContext();

export function loadingOrders() {
  return { type: LOADING_ORDERS };
}

export function loadingOrdersSuccess(response) {
  return {
    type: LOADING_ORDERS_SUCCESS,
    payload: response.data,
  };
}

export function loadingManagerOrderSuceess(response) {
  return {
    type: LOADING_ORDERS_ADMIN_SUCCESS,
    payload: response.data,
  };
}

export function loadingFailOrder(response) {
  return {
    type: LOADING_ORDERS_ERROR,
    payload: response.error,
  };
}

export function setRowPage(rowPage) {
  return {
    type: SET_ROW_ORDERS,
    payload: rowPage,
  };
}

export function acctionAddOrderUser(response) {
  return {
    type: ADD_ORDER_USER,
    payload: response.data,
  };
}

export function acctionAddOrder(response) {
  return {
    type: ADD_ORDER,
    payload: response.data,
  };
}

export function acctionUpdateOrderUser(response) {
  return {
    type: UPDATE_ORDER_USER,
    payload: { updateOrderUser: response.data },
  };
}

export function acctionUpdateOrder(response, index) {
  return {
    type: UPDATE_ORDER,
    payload: { updateOrder: response.data, index: index },
  };
}

export function acctionDeleteOrder(id) {
  return {
    type: DELETE_ORDER,
    payload: id,
  };
}

const orderReducer = (state, action) => {
  switch (action.type) {
    case LOADING_ORDERS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOADING_ORDERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOADING_ORDERS_SUCCESS:
      return {
        ...state,
        orderList: action.payload,
        loading: false,
      };
    case LOADING_ORDERS_ADMIN_SUCCESS:
      return {
        ...state,
        orderListAdmin: action.payload,
        loading: true,
      };
    case ADD_ORDER_USER:
      return {
        ...state,
        orderList: [...state.orderList, action.payload],
      };
    case UPDATE_ORDER_USER:
      const { updateOrderUser } = action.payload;
      const orderIndex = state.orderList.findIndex(
        (order) => order.code === updateOrderUser.code
      );

      if (orderIndex !== -1) {
        const newOrderList = [...state.orderList];
        newOrderList[orderIndex] = updateOrderUser;

        return {
          ...state,
          orderList: newOrderList,
        };
      }
    case ADD_ORDER:
      return {
        ...state,
        orderListAdmin: [...state.orderListAdmin, action.payload],
      };
    case UPDATE_ORDER:
      const { updateOrder, index } = action.payload;
      const newOrderListAdmin = [...state.orderListAdmin];
      newOrderListAdmin[index] = updateOrder;
      return {
        ...state,
        orderListAdmin: newOrderListAdmin,
      };
    case DELETE_ORDER:
      return {
        ...state,
        orderListAdmin: state.orderListAdmin.filter(
          (item) => item.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

const initialState = {
  orderList: [],
  orderListAdmin: [],
  loading: true,
  error: null,
};

export const OrderProvider = ({ children }) => {
  const [orderState, dispatchOrder] = useReducer(orderReducer, initialState);

  return (
    <OrderContext.Provider value={{ orderState, dispatchOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
export const useOrderContext = () => useContext(OrderContext);
