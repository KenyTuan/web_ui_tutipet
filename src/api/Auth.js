import axios from "axios";
import Cookies from "js-cookie";
import {
  ACCESS_TOKEN,
  ACC_URL,
  EXPIRATION,
  LOGIN_URL,
  REGISTER_URL,
  defaultHeaders,
  storeAccessToken,
  storeUserInfo,
  headersWithAuthorization,
} from "./Config";

export async function loginUser(request) {
  try {
    const response = await axios.post(LOGIN_URL, request, {
      headers: defaultHeaders(),
    });
    storeTokens(response.data);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
}

export async function registerUser(request) {
  try {
    const response = await axios.post(REGISTER_URL, request, {
      headers: defaultHeaders(),
    });
    console.log("register", response.data);
    storeTokens(response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.log("error", error);
    return handleError(error);
  }
}

export async function refreshToken() {
  try {
    const response = await axios.post(
      `${LOGIN_URL}/refresh`,
      { refreshToken: token?.refreshToken },
      {
        headers: defaultHeaders(),
      }
    );
    storeTokens(response.data);
    return { success: true, data: response.data };
  } catch (error) {
    clearTokens();
    return handleError(error);
  }
}

export async function logoutUser() {
  try {
    // await axios.delete(LOGIN_URL, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    //   data: { refreshToken },
    // });
    clearTokens();
  } catch (error) {
    handleError(error);
  }
}

export async function updateProfile(request) {
  try {
    const response = await axios.put(ACC_URL + `/update-profile`, request, {
      headers: { ...headersWithAuthorization() },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
}

function handleError(error) {
  // clearTokens();
  let errMsg;
  if (axios.isAxiosError(error) && error.response) {
    errMsg =
      error.response.data?.message ||
      error.response.statusText ||
      "An unexpected error occurred";
  } else {
    errMsg =
      new Map([
        [TypeError, "Can't connect to server."],
        [SyntaxError, "There was a problem parsing the response."],
        [Error, error.message],
      ]).get(error.constructor) || "An unexpected error occurred";
  }
  console.error(errMsg);
  return { success: false, error: errMsg };
}

function storeTokens(data) {
  storeAccessToken(data);
  storeUserInfo(data.user);
}

function clearTokens() {
  Cookies.remove(ACCESS_TOKEN);
  Cookies.remove(EXPIRATION);
}
