import axios from "axios";
import { CART_URL, getUserInfo, headersWithAuthorization } from "./Config";

export async function getList() {
  // if (tokenExpired()) {
  // }
  try {
    const response = await axios.get(CART_URL, {
      headers: {
        ...headersWithAuthorization(),
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
}

export async function addOrUpdate(payload) {
  // if (tokenExpired()) {
  //   await auth.refreshToken();
  // }
  try {
    const response = await axios.put(CART_URL, payload, {
      headers: {
        ...headersWithAuthorization(),
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.log("handleError", error);
    return handleError(error);
  }
}

export async function remove(productId) {
  // if (tokenExpired()) {
  //   await auth.refreshToken();
  // }

  try {
    await axios.delete(CART_URL, {
      params: { productId: productId },
      headers: {
        ...headersWithAuthorization(),
      },
    });
    return { success: true };
  } catch (error) {
    return handleError(error);
  }
}

function handleError(error) {
  let errorMessage = "An unknown error occurred.";
  if (axios.isAxiosError(error)) {
    if (error.response) {
      errorMessage = `Server responded with status ${error.response.status}: ${error.response.data}`;
    } else if (error.request) {
      errorMessage = "No response received from the server.";
    } else {
      errorMessage = `Error setting up request: ${error.message}`;
    }
  } else {
    errorMessage = error.message;
  }
  console.log(errorMessage);
  return { success: false, error: errorMessage };
}
