"use client";
import React, { createContext, useContext, useReducer } from "react";

export const LOADING_PROMOTIONS = "LOADING_PROMOTIONS";
export const LOADING_PROMOTIONS_SUCCESS = "LOADING_PROMOTIONS_SUCCESS";
export const LOADING_PROMOTIONS_ERROR = "LOADING_PROMOTIONS_ERROR";
export const SET_ROW_PROMOTIONS = "SET_ROW_PROMOTIONS";
export const ADD_PROMOTION = "ADD_PROMOTION";
export const UPDATE_PROMOTION = "UPDATE_PROMOTION";
export const DELETE_PROMOTION = "DELETE_PROMOTION";
export const LOADING_PROMOTIONS_ADMIN_SUCCESS =
  "LOADING_PROMOTIONS_ADMIN_SUCCESS";

const PromotionContext = createContext();

export function loadingPromotions() {
  return { type: LOADING_PROMOTIONS };
}

export function loadingPromotionsSuccess(response) {
  return {
    type: LOADING_PROMOTIONS_SUCCESS,
    payload: response.data,
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

export function acctionUpdatePromotion(response, index) {
  return {
    type: UPDATE_PROMOTION,
    payload: { updatePromotion: response.data, index: index },
  };
}

export function acctionDeletePromotion(id) {
  return {
    type: DELETE_PROMOTION,
    payload: id,
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
        promotionList: action.payload,
        loading: false,
      };
    case LOADING_PROMOTIONS_ADMIN_SUCCESS:
      return {
        ...state,
        promotionListAdmin: action.payload,
        loading: true,
      };
    case ADD_PROMOTION:
      return {
        ...state,
        promotionListAdmin: [...state.promotionListAdmin, action.payload],
      };
    case UPDATE_PROMOTION:
      const { updatePromotion, index } = action.payload;
      const newPromotionListAdmin = [...state.promotionListAdmin];
      newPromotionListAdmin[index] = updatePromotion;
      return {
        ...state,
        promotionListAdmin: newPromotionListAdmin,
      };
    case DELETE_PROMOTION:
      return {
        ...state,
        promotionListAdmin: state.promotionListAdmin.filter(
          (item) => item.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

const initialState = {
  promotionList: [],
  promotionListAdmin: [],
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
