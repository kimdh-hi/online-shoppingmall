import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART,
  GET_CART_ITEMS,
} from "./types";
import { USER_SERVER } from "../components/Config.js";

export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .then(response => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then(response => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get(`${USER_SERVER}/auth`)
    .then(response => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function logoutUser() {
  const request = axios
    .get(`${USER_SERVER}/logout`)
    .then(response => response.data);

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}

// id: 장바구니에 넣을 상품 ID
export function addToCart(id) {
  let body = {
    productId: id,
  };
  const request = axios
    .post(`${USER_SERVER}/addToCart`, body)
    .then(response => response.data);

  return {
    type: ADD_TO_CART,
    payload: request,
  };
}

export function getCartItems(cartItemsId, userCart) {
  const request = axios
    .get(`/api/product/products_by_id?id=${cartItemsId}&type=array`)
    // response: 장바구니의 상품ID값으로 DB에서 가져온 값 (quantity 없음)
    // userCart: UserState에 있는 cart 값 (quantity를 들고있음)
    // response에 quantity정보를 삽입
    .then(response => {
      console.log(response.data);
      userCart.forEach(cartItem => {
        response.data.forEach((resItem, idx) => {
          if (cartItem.id === resItem._id) {
            response.data[idx].quantity = cartItem.quantity;
          }
        });
      });
      return response.data;
    });

  return {
    type: GET_CART_ITEMS,
    payload: request,
  };
}
