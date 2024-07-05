import {
  PRODUCT_URL,
  defaultHeaders,
  headersWithAuthorization,
} from "@/api/Config";
import axios from "axios";

export async function fetchListProduct(
  keySearch,
  page,
  sortBy = "",
  sortOrder = "",
  size = 5
) {
  try {
    const queryParams = `?keySearch=${keySearch}&page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortOrder}`;
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

export async function addProduct(req) {
  console.log("Fetching product for Id: " + req);
  try {
    const response = await axios.post(PRODUCT_URL, req, {
      headers: headersWithAuthorization(),
    });
    console.log("Response JSON: " + JSON.stringify(response.data));
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error add product", error);
    return handleError(error);
  }
}

export async function updateProduct(req, id) {
  console.log("Fetching product for Id: " + req);
  try {
    const response = await axios.put(PRODUCT_URL + `/${id}`, req, {
      headers: headersWithAuthorization(),
    });
    console.log("Response JSON: " + JSON.stringify(response.data));
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error add product", error);
    return handleError(error);
  }
}

export async function updateProductStatus(id, enable) {
  try {
    const response = await axios.patch(PRODUCT_URL + `/${id}`, enable, {
      headers: headersWithAuthorization(),
    });
    console.log("Response JSON: " + JSON.stringify(response.data));
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error add product", error);
    return handleError(error);
  }
}

export async function deleteProduct(id) {
  console.log("Fetching product for Id: " + id);
  try {
    const response = await axios.delete(PRODUCT_URL + `/${id}`, {
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
