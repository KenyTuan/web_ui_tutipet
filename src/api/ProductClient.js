import { PRODUCT_URL, defaultHeaders } from "@/api/Config";
import axios from "axios";

const size = 5;

export async function fetchListProduct(keySearch, page, sortBy, sortOrder) {
  try {
    const queryParams = `?keySearch=${keySearch}&page=${
      page - 1
    }&size=${size}&sortBy=${sortBy}&sortDir=${sortOrder}`;
    const response = await axios.get(PRODUCT_URL + `/search${queryParams}`, {
      headers: defaultHeaders(),
    });
    console.log("data list", response);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
}

export async function fetchByid(prodId) {
  console.log("Fetching product for Id: " + prodId);
  try {
    const response = await axios.get(PRODUCT_URL + `/${prodId}`, {
      headers: defaultHeaders(),
    });
    console.log("Response JSON: " + JSON.stringify(response.data));
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
}

function handleError(error) {
  let errMsg = "An unknown error occurred.";
  if (error.response) {
    errMsg = error.response.data;
    console.log("Error response data: ", error.response.data);
  } else if (error.request) {
    errMsg = "No response received from server.";
    console.log("Error request: ", error.request);
  } else {
    errMsg = error.message;
    console.log("Error message: ", error.message);
  }
  return { success: false, error: errMsg };
}
