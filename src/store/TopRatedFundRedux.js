/** @format */

import SiteAPI from "../services/SiteApis";
import { Alert } from "react-native";
const types = {
  RESETDATA: "RESETDATA",

  FETCH_CATEGORY_PENDING: "FETCH_CATEGORY_PENDING",
  FETCH_CATEGORY_SUCCESS: "FETCH_CATEGORY_SUCCESS",
  FETCH_CATEGORY_FAILURE: "FETCH_CATEGORY_FAILURE",

  FETCH_DETAILS_PENDING: "FETCH_DETAILS_PENDING",
  FETCH_DETAILS_SUCCESS: "FETCH_DETAILS_SUCCESS",
  FETCH_DETAILS_FAILURE: "FETCH_DETAILS_FAILURE",
};
export const TopRatedActions = {
  resetData() {
    return { type: types.RESETDATA };
  },
  getAllcategorys: async (dispatch, tokan) => {
    dispatch({ type: types.FETCH_CATEGORY_PENDING });
    let data = await SiteAPI.apiGetCall("/algo-ranking/allcategory", {}, tokan);
    if (data.error) {
      if (data.message) Alert.alert(data.message);
      dispatch({ type: types.FETCH_CATEGORY_FAILURE, error: data.message });
    } else {
      dispatch({ type: types.FETCH_CATEGORY_SUCCESS, category: data.response });
    }
  },
  getDetails: async (dispatch, params, tokan) => {
    
    dispatch({ type: types.FETCH_DETAILS_PENDING });
    let data = await SiteAPI.apiPostCall(
      "/algo-ranking/listDetails",
      params,
      tokan
    );
    if (data.error) {
      if (data.message) Alert.alert(data.message);
      dispatch({ type: types.FETCH_DETAILS_FAILURE, error: data.message });
    } else {
      dispatch({ type: types.FETCH_DETAILS_SUCCESS, details: data.output });
    }
  },
};

const initialState = {
  isFetching: false,
  error: null,
  category: null,
  details: null,
};

export const reducer = (state = initialState, action) => {
  const { type, error, category, details } = action;
  switch (type) {
    case types.FETCH_DETAILS_PENDING:
    case types.FETCH_CATEGORY_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case types.FETCH_DETAILS_FAILURE:
    case types.FETCH_CATEGORY_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error,
      };
    }
    case types.FETCH_CATEGORY_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        category,
      };
    }
    case types.FETCH_DETAILS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        details,
      };
    }
    case types.RESETDATA:
      return Object.assign({}, initialState);
    default:
      return state;
  }
};
