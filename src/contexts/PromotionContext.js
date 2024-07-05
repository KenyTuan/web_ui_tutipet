"use client";
import React, { createContext, useContext, useReducer } from "react";

export const LOADING_PROMOTIONS = "LOADING_PROMOTIONS";
export const LOADING_PROMOTIONS_SUCCESS = "LOADING_PROMOTIONS_SUCCESS";
export const LOADING_PROMOTIONS_ERROR = "LOADING_PROMOTIONS_ERROR";
export const SET_ROW_PROMOTIONS = "SET_ROW_PROMOTIONS";
export const ADD_PROMOTION = "ADD_PROMOTION";
export const LOADING_PROMOTIONS_ADMIN_SUCCESS =
  "LOADING_PROMOTIONS_ADMIN_SUCCESS";

const PromotionContext = createContext();

export function loadingPromotions() {
  return { type: LOADING_PROMOTIONS };
}

export function setPromotions(response, page, search, sortBy, sortOrder) {
  return {
    type: LOADING_PROMOTIONS_SUCCESS,
    payload: {
      promotions: response.data.content,
      total_pages: response.data.totalPages,
      page,
      search,
      sortBy,
      sortOrder,
    },
  };
}

export function loadingManagerPromotionSuceess(response) {
  return {
    type: LOADING_PROMOTIONS_ADMIN_SUCCESS,
    payload: response.data,
  };
}

export function loadingFailPromotion(response) {
  return {
    type: LOADING_PROMOTIONS_ERROR,
    payload: response.error,
  };
}

export function setRowPage(rowPage) {
  return {
    type: SET_ROW_PROMOTIONS,
    payload: rowPage,
  };
}

export function acctionAddPromotion(response) {
  return {
    type: ADD_PROMOTION,
    payload: response.data,
  };
}

const promotionReducer = (state, action) => {
  switch (action.type) {
    case LOADING_PROMOTIONS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOADING_PROMOTIONS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOADING_PROMOTIONS_SUCCESS:
      return {
        ...state,
        promotionList: {
          ...state.promotionList,
          [action.payload.page]: {
            data: action.payload.promotions,
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
    case LOADING_PROMOTIONS_ADMIN_SUCCESS:
      return {
        ...state,
        promotionListAdmin: action.payload,
        loading: true,
      };
    case SET_ROW_PROMOTIONS:
      return {
        ...state,
        promotionList: {},
        loading: true,
        error: null,
        row_page: action.payload,
        total_pages: 1,
        page: 1,
      };
    case ADD_PROMOTION:
      return {
        ...state,
        promotionListAdmin: [...state.promotionList, action.payload],
      };
    default:
      return state;
  }
};

const initialState = {
  promotionList: {},
  promotionListAdmin: [],
  total_pages: 1,
  page: 1,
  row_page: 5,
  loading: true,
  error: null,
};

export const PromotionProvider = ({ children }) => {
  const [promotionState, dispatchPromotion] = useReducer(
    promotionReducer,
    initialState
  );

  return (
    <PromotionContext.Provider value={{ promotionState, dispatchPromotion }}>
      {children}
    </PromotionContext.Provider>
  );
};
export const usePromotionContext = () => useContext(PromotionContext);
