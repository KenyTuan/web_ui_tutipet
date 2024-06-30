"use client";
import React, { createContext, useReducer, useContext } from "react";

const initialLocationState = {
  provinces: [],
  districts: [],
  wards: [],
  selectedProvince: "",
  selectedDistrict: "",
  selectedWard: "",
};

export const LocationContext = createContext();

function useLocationContext() {
  return useContext(LocationContext);
}

const SET_PROVINCES = "SET_PROVINCES";
const SET_DISTRICTS = "SET_DISTRICTS";
const SET_WARDS = "SET_WARDS";
const SET_SELECTED_PROVINCE = "SET_SELECTED_PROVINCE";
const SET_SELECTED_DISTRICT = "SET_SELECTED_DISTRICT";
const SET_SELECTED_WARD = "SET_SELECTED_WARD";
const RESET_INFO_LOCATION = "RESET_INFO_LOCATION";

export function setProvinces(data) {
  return { type: SET_PROVINCES, payload: data };
}

export function setDistricts(response) {
  return { type: SET_DISTRICTS, payload: response?.data.results };
}

export function setWards(response) {
  return { type: SET_WARDS, payload: response?.data.results };
}

export function setSelectedProvinces(value) {
  return { type: SET_SELECTED_PROVINCE, payload: value };
}

export function setSelectedDistricts(value) {
  return { type: SET_SELECTED_DISTRICT, payload: value };
}

export function setSelectedWards(value) {
  return { type: SET_SELECTED_WARD, payload: value };
}

export function resetInfoSelection() {
  return { type: RESET_INFO_LOCATION };
}

export function locationReducer(state, action) {
  switch (action.type) {
    case SET_PROVINCES:
      return {
        ...state,
        provinces: action.payload,
      };
    case SET_DISTRICTS:
      return {
        ...state,
        districts: action.payload,
      };
    case SET_WARDS:
      return {
        ...state,
        wards: action.payload,
      };
    case SET_SELECTED_PROVINCE:
      return {
        ...state,
        selectedProvince: action.payload,
      };
    case SET_SELECTED_DISTRICT:
      return {
        ...state,
        selectedDistrict: action.payload,
      };
    case SET_SELECTED_WARD:
      return {
        ...state,
        selectedWard: action.payload,
      };
    case RESET_INFO_LOCATION:
      return {
        ...state,
        selectedProvince: "",
        selectedDistrict: "",
        selectedWard: "",
      };
    default:
      return state;
  }
}

const LocationProvider = ({ children }) => {
  const [locationState, dispatchLocation] = useReducer(
    locationReducer,
    initialLocationState
  );

  return (
    <LocationContext.Provider value={{ locationState, dispatchLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
export { LocationProvider, useLocationContext };
