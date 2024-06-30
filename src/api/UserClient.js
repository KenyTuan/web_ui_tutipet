import axios from "axios";
import { USER_URL, headersWithAuthorization } from "./Config";

export async function fetchList() {
  try {
    const response = await axios.get(USER_URL);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
}

export async function fetchByid(id) {
  try {
    const response = await axios.get(USER_URL + `/${id}`, {
      headers: { ...headersWithAuthorization() },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
}

export async function updateUser(id, request) {
  try {
    const response = await axios.put(USER_URL + `/${id}`, request, {
      headers: { ...headersWithAuthorization() },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
}

function handleError(error) {
  this.clearTokens();
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
