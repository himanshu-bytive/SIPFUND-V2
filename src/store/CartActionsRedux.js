/** @format */

import SiteAPI from "../services/SiteApis";
import { Alert } from "react-native";
const types = {
  LOGOUT: "LOGOUT",

  FETCH_ADD_ITEM_PENDING: "FETCH_ADD_ITEM_PENDING",
  FETCH_ADD_ITEM_SUCCESS: "FETCH_ADD_ITEM_SUCCESS",
  FETCH_ADD_ITEM_FAILURE: "FETCH_ADD_ITEM_FAILURE",

  FETCH_DELET_CART_PENDING: "FETCH_DELET_CART_PENDING",
  FETCH_DELET_CART_SUCCESS: "FETCH_DELET_CART_SUCCESS",
  FETCH_DELET_CART_FAILURE: "FETCH_DELET_CART_FAILURE",

  FETCH_ADD_ITEM_SIP_PENDING: "FETCH_ADD_ITEM_SIP_PENDING",
  FETCH_ADD_ITEM_SIP_SUCCESS: "FETCH_ADD_ITEM_SIP_SUCCESS",
  FETCH_ADD_ITEM_SIP_FAILURE: "FETCH_ADD_ITEM_SIP_FAILURE",

  FETCH_CART_DETAILS_PENDING: "FETCH_CART_DETAILS_PENDING",
  FETCH_CART_DETAILS_SUCCESS: "FETCH_CART_DETAILS_SUCCESS",
  FETCH_CART_DETAILS_FAILURE: "FETCH_CART_DETAILS_FAILURE",

  SET_ADD_ITEM_SUCCESS: "SET_ADD_ITEM_SUCCES",
};

export const CartActions = {
  addItem: async (dispatch, token) => {
    dispatch({ type: types.FETCH_ADD_ITEM_PENDING });
    let data = await SiteAPI.apiPostCall("/addCart", {}, token);
    if (data.error) {
      if (data.message) Alert.alert(data.message);
      dispatch({ type: types.FETCH_ADD_ITEM_FAILURE, error: data.message });
    } else {
      dispatch({
        type: types.FETCH_ADD_ITEM_SUCCESS,
        phone: params.mobileNo,
        signUpSteps: data.signUpSteps,
        validFlag: data.validFlag,
      });
    }
  },
  deletCart: async (dispatch, params, token) => {
    dispatch({ type: types.FETCH_DELET_CART_PENDING });
    let data = await SiteAPI.apiPostCall("/addCart/delete", params, token);
    if (data.error) {
      if (data.message) Alert.alert(data.message);
      dispatch({ type: types.FETCH_DELET_CART_FAILURE, error: data.message });
    } else {
      dispatch({
        type: types.FETCH_DELET_CART_SUCCESS,
        phone: params.mobileNo,
        signUpSteps: data.signUpSteps,
        validFlag: data.validFlag,
      });
    }
  },
  addItomToSip: async (dispatch, params, token) => {
    dispatch({ type: types.FETCH_ADD_ITEM_SIP_PENDING });
    let data = await SiteAPI.apiPostCall("/addCart", params, token);
    if (data.error) {
      if (data.message) Alert.alert(data.message);
      dispatch({ type: types.FETCH_ADD_ITEM_SIP_FAILURE, error: data.message });
    } else {
      console.log("Cart=", data);
      CartActions.cartDetails(dispatch, token);
      dispatch({
        type: types.FETCH_ADD_ITEM_SIP_SUCCESS,
        phone: params.mobileNo,
        signUpSteps: data.signUpSteps,
        addItemSucces: data.validFlag,
      });
    }
  },
  cartDetails: async (dispatch, token) => {
    dispatch({ type: types.FETCH_CART_DETAILS_PENDING });
    let data = await SiteAPI.apiGetCall("/addCart", {}, token);
    if (data.error) {
      if (data.message) Alert.alert(data.message);
      dispatch({ type: types.FETCH_CART_DETAILS_FAILURE, error: data.message });
    } else {
      dispatch({
        type: types.FETCH_CART_DETAILS_SUCCESS,
        cart: data.responseString,
      });
    }
  },
  updateCart: async (dispatch, cart) => {
    dispatch({
      type: types.FETCH_CART_DETAILS_SUCCESS,
      cart,
    });
  },

  setAddItemSucces: (dispatch) => {
    dispatch({ type: types.SET_ADD_ITEM_SUCCESS });
  },

  logout() {
    return { type: types.LOGOUT };
  },
};

const initialState = {
  isFetching: false,
  error: null,
  cart: null,
  addItemSucces: false,
};

export const reducer = (state = initialState, action) => {
  const { type, error, cart, addItemSucces } = action;
  switch (type) {
    case types.FETCH_CART_DETAILS_PENDING:
    case types.FETCH_ADD_ITEM_SIP_PENDING:
    case types.FETCH_DELET_CART_PENDING:
    case types.FETCH_ADD_ITEM_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }

    case types.FETCH_CART_DETAILS_FAILURE:
    case types.FETCH_ADD_ITEM_SIP_FAILURE:
    case types.FETCH_DELET_CART_FAILURE:
    case types.FETCH_ADD_ITEM_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error,
      };
    }

    case types.FETCH_ADD_ITEM_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    }
    case types.FETCH_DELET_CART_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    }
    case types.FETCH_ADD_ITEM_SIP_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        addItemSucces,
      };
    }
    case types.FETCH_CART_DETAILS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        cart,
      };
    }

    case types.SET_ADD_ITEM_SUCCESS: {
      return {
        ...state,
        addItemSucces: false,
      };
    }

    case types.LOGOUT:
      return Object.assign({}, initialState, { phones: state.phones });
    default:
      return state;
  }
};
