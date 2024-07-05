import { PROMOTION_URL, headersWithAuthorization } from "@/api/Config";
import axios from "axios";

export async function fetchAllPromotion() {
  try {
    const response = await axios.get(PROMOTION_URL, {
      headers: headersWithAuthorization(),
    });
    console.log("data list", response);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("error", error);
    return handleError(error);
  }
}

export async function fetchListPromotion(
  keySearch,
  page,
  sortBy = "",
  sortOrder = "",
  size = 5
) {
  try {
    const queryParams = `?keySearch=${keySearch}&page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortOrder}`;
    const response = await axios.get(PROMOTION_URL + `/search${queryParams}`, {
      headers: headersWithAuthorization(),
    });
    console.log("data list", response);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("error", error);
    return handleError(error);
  }
}

export async function fetchPromotionByid(id) {
  try {
    const response = await axios.get(PROMOTION_URL + `/${id}`, {
      headers: defaultHeaders(),
    });
    console.log("Response JSON: " + JSON.stringify(response.data));
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
}

export async function addPromotion(req) {
  try {
    const response = await axios.post(PROMOTION_URL, req, {
      headers: headersWithAuthorization(),
    });
    console.log("Response JSON: " + JSON.stringify(response.data));
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error add product", error);
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
