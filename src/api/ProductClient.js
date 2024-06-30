import Config from "@/api/Config";
import axios from "axios";

class ProductClient {
  constructor() {
    this.config = new Config();
    this.axiosInstance = axios.create({
      baseURL: this.config.PRODUCT_URL,
      headers: this.config.defaultHeaders(),
    });
    this.size = 5;
  }

  async fetchList(keySearch, page, sortBy, sortOrder) {
    try {
      console.log("page", page);
      const queryParams = `?keySearch=${keySearch}&page=${page - 1}&size=${
        this.size
      }&sortBy=${sortBy}&sortDir=${sortOrder}`;
      const response = await this.axiosInstance.get(`search${queryParams}`);
      console.log("data list", response);
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async fetchByid(prodId) {
    console.log("Fetching product for Id: " + prodId);
    try {
      const response = await this.axiosInstance.get(`/${prodId}`);
      console.log("Response JSON: " + JSON.stringify(response.data));
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  handleError(error) {
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
}

export default ProductClient;
