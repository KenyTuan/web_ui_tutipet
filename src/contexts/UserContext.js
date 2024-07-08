"use client";
import React, { createContext, useContext, useReducer } from "react";

export const LOADING_USERS = "LOADING_USERS";
export const LOADING_USERS_SUCCESS = "LOADING_USERS_SUCCESS";
export const LOADING_USERS_ERROR = "LOADING_USERS_ERROR";
export const SET_ROW_USERS = "SET_ROW_USERS";
export const ADD_USER = "ADD_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";
export const LOADING_USERS_ADMIN_SUCCESS = "LOADING_USERS_ADMIN_SUCCESS";

const UserContext = createContext();

export function loadingUsers() {
  return { type: LOADING_USERS };
}

export function loadingUsersSuccess(response) {
  return {
    type: LOADING_USERS_SUCCESS,
    payload: response.data,
  };
}

export function loadingManagerUserSuceess(response) {
  return {
    type: LOADING_USERS_ADMIN_SUCCESS,
    payload: response.data,
  };
}

export function loadingFailUser(response) {
  return {
    type: LOADING_USERS_ERROR,
    payload: response.error,
  };
}

export function setRowPage(rowPage) {
  return {
    type: SET_ROW_USERS,
    payload: rowPage,
  };
}

export function acctionAddUser(response) {
  return {
    type: ADD_USER,
    payload: response.data,
  };
}

export function acctionUpdateUser(response, index) {
  return {
    type: UPDATE_USER,
    payload: { updateUser: response.data, index: index },
  };
}

export function acctionDeleteUser(id) {
  return {
    type: DELETE_USER,
    payload: id,
  };
}

const userReducer = (state, action) => {
  switch (action.type) {
    case LOADING_USERS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOADING_USERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOADING_USERS_SUCCESS:
      return {
        ...state,
        userList: action.payload,
        loading: false,
      };
    case LOADING_USERS_ADMIN_SUCCESS:
      return {
        ...state,
        userListAdmin: action.payload,
        loading: true,
      };
    case ADD_USER:
      return {
        ...state,
        userListAdmin: [...state.userListAdmin, action.payload],
      };
    case UPDATE_USER:
      const { updateUser, index } = action.payload;
      const newUserListAdmin = [...state.userListAdmin];
      newUserListAdmin[index] = updateUser;
      return {
        ...state,
        userListAdmin: newUserListAdmin,
      };
    case DELETE_USER:
      return {
        ...state,
        userListAdmin: state.userListAdmin.filter(
          (item) => item.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

const initialState = {
  userList: [],
  userListAdmin: [],
  loading: true,
  error: null,
};

export const UserProvider = ({ children }) => {
  const [userState, dispatchUser] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ userState, dispatchUser }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUserContext = () => useContext(UserContext);
