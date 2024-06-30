import axios from "axios";
import Config from "./Config";

export default class CartClient {
  auth;
  constructor(auth) {
    this.auth = auth;
    this.config = new Config();
  }

  async getList() {
    // if (this.config.tokenExpired()) {
    // }
    try {
      const userInfo = this.config.getUserInfo();
      const response = await axios.get(this.config.CART_URL, {
        params: { userId: userInfo.id },
        headers: {
          ...this.config.headersWithAuthorization(),
        },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async addOrUpdate(payload) {
    // if (this.config.tokenExpired()) {
    //   await this.auth.refreshToken();
    // }
    try {
      const userInfo = this.config.getUserInfo();
      const response = await axios.put(this.config.CART_URL, payload, {
        params: { userId: userInfo.id },
        headers: {
          ...this.config.headersWithAuthorization(),
        },
      });
      console.log("hihi");
      return { success: true, data: response.data };
    } catch (error) {
      console.log("handleError", error);
      return this.handleError(error);
    }
  }

  async remove(productId) {
    // if (this.config.tokenExpired()) {
    //   await this.auth.refreshToken();
    // }

    try {
      const userInfo = this.config.getUserInfo();
      await axios.delete(this.config.CART_URL, {
        params: { userId: userInfo.id, productId: productId },
        headers: {
          ...this.config.headersWithAuthorization(),
        },
      });
      return { success: true };
    } catch (error) {
      return this.handleError(error);
    }
  }

  handleError(error) {
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
}
