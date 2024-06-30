import Config from "@/api/Config";
import axios from "axios";
import Cookies from "js-cookie";

class Auth {
  constructor() {
    this.config = new Config();
  }

  async loginUser(request) {
    try {
      const response = await axios.post(this.config.LOGIN_URL, request, {
        headers: this.config.defaultHeaders(),
      });
      this.storeTokens(response.data);
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async registerUser(request) {
    console.log("request", request);
    try {
      const response = await axios.post(this.config.REGISTER_URL, request, {
        headers: this.config.defaultHeaders(),
      });
      console.log("register", response.data);
      this.storeTokens(response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.log("error", error);
      return this.handleError(error);
    }
  }

  async refreshToken() {
    try {
      const response = await axios.post(
        `${this.config.LOGIN_URL}/refresh`,
        { refreshToken: token?.refreshToken },
        {
          headers: config.defaultHeaders(),
        }
      );
      this.storeTokens(response.data);
      return { success: true, data: response.data };
    } catch (error) {
      this.clearTokens();
      return this.handleError(error);
    }
  }

  async logoutUser() {
    try {
      // await axios.delete(this.config.LOGIN_URL, {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
      //   data: { refreshToken },
      // });
      this.clearTokens();
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error) {
    this.clearTokens();
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

  storeTokens(data) {
    this.config.storeAccessToken(data);
    this.config.storeUserInfo(data.user);
  }

  clearTokens() {
    Cookies.remove(this.config.ACCESS_TOKEN);
    Cookies.remove(this.config.EXPIRATION);
  }
}

export default Auth;
