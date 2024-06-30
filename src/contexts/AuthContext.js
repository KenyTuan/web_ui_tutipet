"use client";
import React, { createContext, useContext, useReducer, useEffect } from "react";
import Cookies from "js-cookie";
import { ACCESS_TOKEN, USER_INFO } from "@/api/Config";

const AuthContext = createContext();

function useAuthContext() {
  return useContext(AuthContext);
}

export const LOGIN_USER = "LOGIN_USER";
export const REGISTER_USER = "REGISTER_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const REFRESH_TOKEN = "REFRESH_TOKEN";
export const SET_USER = "SET_USER";
export const SET_TOKEN = "SET_TOKEN";

export const login = (user, token) => {
  return { type: LOGIN_USER, payload: { user, token } };
};

export const register = (user, token) => {
  return { type: REGISTER_USER, payload: { user, token } };
};

export function logout() {
  return { type: LOGOUT_USER };
}

export function setUser(user) {
  return { type: SET_USER, payload: user };
}

export function setToken(token) {
  return { type: SET_TOKEN, payload: token };
}

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
};

export function authReducer(state, action) {
  switch (action.type) {
    case REGISTER_USER:
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoggedIn: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        token: null,
        isLoggedIn: false,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
        isLoggedIn: true,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    default:
      return state;
  }
}

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const authData = { state, dispatch };

  useEffect(() => {
    const token = Cookies.get(ACCESS_TOKEN);
    const userInfo = localStorage.getItem(USER_INFO);
    if (token) {
      dispatch(setToken(token));
      dispatch(setUser(JSON.parse(userInfo)));
    }
  }, []);

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider, useAuthContext };
