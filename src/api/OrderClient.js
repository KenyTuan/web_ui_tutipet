import { ORDER_URL, headersWithAuthorization } from "@/api/Config";
import axios from "axios";

export async function createOrder(req) {
  try {
    const response = await axios.post(ORDER_URL, req, {
      headers: headersWithAuthorization(),
    });
    console.log("Response JSON: " + response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error add product", error);
    return handleError(error);
  }
}

export async function fetchOrderByid(id) {
  try {
    const response = await axios.get(ORDER_URL + `/${id}`, {
      headers: headersWithAuthorization(),
    });
    console.log("Response JSON: " + JSON.stringify(response.data));
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
}

export async function validateOrder(req) {
  try {
    const response = await axios.post(ORDER_URL + "/validate-payment", req, {
      headers: headersWithAuthorization(),
    });
    console.log("Response JSON: " + response.data);
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
