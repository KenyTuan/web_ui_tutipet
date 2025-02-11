import { PRODUCT_TYPE_URL, defaultHeaders } from "@/api/Config";
import axios from "axios";

export async function fetchListProductType() {
  try {
    const response = await axios.get(PRODUCT_TYPE_URL, {
      headers: defaultHeaders(),
    });
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
}

export async function fetchProductTypeByid(prodId) {
  try {
    const response = await axios.get(PRODUCT_TYPE_URL + `/${prodId}`, {
      headers: defaultHeaders(),
    });
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
}

function handleError(error) {
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
