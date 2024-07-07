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

export async function fetchLiveAndUpcomingPromotions() {
  try {
    const response = await axios.get(PROMOTION_URL + `/live-and-upcoming`, {
      headers: headersWithAuthorization(),
    });
    console.log("Response JSON: " + JSON.stringify(response.data));
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
}

export async function fetchPromotionByid(id) {
  try {
    const response = await axios.get(PROMOTION_URL + `/${id}`, {
      headers: headersWithAuthorization(),
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

export async function updatePromotion(id, req) {
  try {
    const response = await axios.put(PROMOTION_URL + `/${id}`, req, {
      headers: headersWithAuthorization(),
    });
    console.log("Response JSON: " + JSON.stringify(response.data));
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error add product", error);
    return handleError(error);
  }
}

export async function deletePromotion(id) {
  try {
    const response = await axios.delete(PROMOTION_URL + `/${id}`, {
      headers: headersWithAuthorization(),
    });
    console.log("Response JSON: " + JSON.stringify(response.data));
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error add product", error);
    return handleError(error);
  }
}

export async function updatePromotionStatus(id, enable) {
  try {
    const response = await axios.patch(PROMOTION_URL + `/${id}`, enable, {
      headers: headersWithAuthorization(),
    });
    console.log("Response JSON: " + JSON.stringify(response.data));
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error add product", error);
    return handleError(error);
  }
}

export async function validateCodePromotion(code) {
  try {
    const response = await axios.patch(PROMOTION_URL + `/${code}/validate`, {
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
