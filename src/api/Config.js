import Cookies from "js-cookie";

const SCHEME = process.env.SCHEME ? process.env.SCHEME : "http";
const HOST = process.env.HOST ? process.env.HOST : "localhost";
const PORT = process.env.PORT ? process.env.PORT : "8080";
export const LOGIN_URL = `${SCHEME}://${HOST}:${PORT}/api/v1/auth/authenticate`;
export const REGISTER_URL = `${SCHEME}://${HOST}:${PORT}/api/v1/auth/register`;
export const ACC_URL = `${SCHEME}://${HOST}:${PORT}/api/v1/auth`;
export const PRODUCT_URL = `${SCHEME}://${HOST}:${PORT}/api/v1/products`;
export const PRODUCT_TYPE_URL = `${SCHEME}://${HOST}:${PORT}/api/v1/types`;
export const CART_URL = `${SCHEME}://${HOST}:${PORT}/api/v1/carts`;
export const ORDER_URL = `${SCHEME}://${HOST}:${PORT}/api/v1/orders`;
export const PROMOTION_URL = `${SCHEME}://${HOST}:${PORT}/api/v1/promotions`;
export const PAYMENT_URL = `${SCHEME}://${HOST}:${PORT}/api/v1/payment`;
export const USER_URL = `${SCHEME}://${HOST}:${PORT}/api/v1/users`;
export const ACCESS_TOKEN = "accessToken";
export const EXPIRATION = "expiration";
export const USER_INFO = "userInfo";

export function defaultHeaders() {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

export function headersWithAuthorization() {
  return {
    ...defaultHeaders(),
    Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN)}`,
  };
}

export function tokenExpired() {
  const expDate = Number(Cookies.get(EXPIRATION));
  return expDate <= Date.now();
}

export function getUserInfo() {
  const userInfo = localStorage.getItem(USER_INFO);
  return userInfo ? JSON.parse(userInfo) : null;
}

export function storeUserInfo(user) {
  localStorage.setItem(USER_INFO, JSON.stringify(user));
}

export function storeAccessToken(responseData) {
  const { token, expAt } = responseData;
  const expiration = new Date(expAt).getTime();
  Cookies.set(ACCESS_TOKEN, token, {
    expires: new Date(expiration),
  });
  Cookies.set(EXPIRATION, expiration, { expires: new Date(expiration) });
}
