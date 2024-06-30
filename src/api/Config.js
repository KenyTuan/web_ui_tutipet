import Cookies from "js-cookie";

class Config {
  SCHEME = process.env.SCHEME ? process.env.SCHEME : "http";
  HOST = process.env.HOST ? process.env.HOST : "localhost";
  PORT = process.env.PORT ? process.env.PORT : "8080";
  LOGIN_URL = `${this.SCHEME}://${this.HOST}:${this.PORT}/api/v1/auth/authenticate`;
  REGISTER_URL = `${this.SCHEME}://${this.HOST}:${this.PORT}/api/v1/auth/register`;
  PRODUCT_URL = `${this.SCHEME}://${this.HOST}:${this.PORT}/api/v1/products`;
  PRODUCT_TYPE_URL = `${this.SCHEME}://${this.HOST}:${this.PORT}/api/v1/types`;
  CART_URL = `${this.SCHEME}://${this.HOST}:${this.PORT}/api/v1/carts`;
  ORDER_URL = `${this.SCHEME}://${this.HOST}:${this.PORT}/api/v1/orders`;
  USER_URL = `${this.SCHEME}://${this.HOST}:${this.PORT}/api/v1/users`;
  ACCESS_TOKEN = "accessToken";
  EXPIRATION = "expiration";
  USER_INFO = "userInfo";

  defaultHeaders() {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  headersWithAuthorization() {
    return {
      ...this.defaultHeaders(),
      Authorization: `Bearer ${Cookies.get(this.ACCESS_TOKEN)}`,
    };
  }

  tokenExpired() {
    const expDate = Number(Cookies.get(this.EXPIRATION));
    return expDate <= Date.now();
  }

  getUserInfo() {
    const userInfo = localStorage.getItem(this.USER_INFO);
    return userInfo ? JSON.parse(userInfo) : null;
  }

  storeUserInfo(user) {
    localStorage.setItem(this.USER_INFO, JSON.stringify(user));
  }

  storeAccessToken(responseData) {
    const { token, expAt } = responseData;
    const expiration = new Date(expAt).getTime();
    Cookies.set(this.ACCESS_TOKEN, token, {
      expires: new Date(expiration),
    });
    Cookies.set(this.EXPIRATION, expiration, { expires: new Date(expiration) });
  }
}

export default Config;
