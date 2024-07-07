import { PAYMENT_URL, headersWithAuthorization } from "@/api/Config";
import axios from "axios";

export async function createPaymentVnPay(req) {
  try {
    const response = await axios.post(
      PAYMENT_URL + "/create-transaction-vnp",
      req,
      {
        headers: headersWithAuthorization(),
      }
    );
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
