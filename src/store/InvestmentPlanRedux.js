/** @format */

import SiteAPI from "../services/SiteApis";
import { Alert } from "react-native";
const types = {
  FETCH_PLAN_NAME_PENDING: "FETCH_PLAN_NAME_PENDING",
  FETCH_PLAN_NAME_SUCCESS: "FETCH_PLAN_NAME_SUCCESS",
  FETCH_PLAN_NAME_FAILURE: "FETCH_PLAN_NAME_FAILURE",

  FETCH_INVESTMENT_PLAN_PENDING: "FETCH_INVESTMENT_PLAN_PENDING",
  FETCH_INVESTMENT_PLAN_SUCCESS: "FETCH_INVESTMENT_PLAN_SUCCESS",
  FETCH_INVESTMENT_PLAN_FAILURE: "FETCH_INVESTMENT_PLAN_FAILURE",

  FETCH_INVESTMENT_CONFIG: "FETCH_INVESTMENT_CONFIG",
  FETCH_MY_INVESTMENTS: "FETCH_MY_INVESTMENTS",

  FETCH_NEW_INVESTMENT_PENDING: "FETCH_NEW_INVESTMENT_PENDING",
  FETCH_NEW_INVESTMENT_SUCCESS: "FETCH_NEW_INVESTMENT_SUCCESS",
  FETCH_NEW_INVESTMENT_FAILURE: "FETCH_NEW_INVESTMENT_FAILURE",

  FETCH_USER_INVESTMENT_PENDING: "FETCH_USER_INVESTMENT_PENDING",
  FETCH_USER_INVESTMENT_SUCCESS: "FETCH_USER_INVESTMENT_SUCCESS",
  FETCH_USER_INVESTMENT_FAILURE: "FETCH_USER_INVESTMENT_FAILURE",

  FETCH_INDIVIDUAL_INVESTMENT_PENDING: "FETCH_INDIVIDUAL_INVESTMENT_PENDING",
  FETCH_INDIVIDUAL_INVESTMENT_SUCCESS: "FETCH_INDIVIDUAL_INVESTMENT_SUCCESS",
  FETCH_INDIVIDUAL_INVESTMENT_FAILURE: "FETCH_INDIVIDUAL_INVESTMENT_FAILURE",
};

export const InvestmentPlanActions = {
  allPlans: async (dispatch, token) => {
    dispatch({ type: types.FETCH_PLAN_NAME_PENDING });
    let data = await SiteAPI.apiGetCall(
      `/investmentPlans/allInvestmentPlans`,
      {},
      token
    );
    if (data.error) {
      if (data.message) Alert.alert(data.message);
      dispatch({ type: types.FETCH_PLAN_NAME_FAILURE, error: data.message });
    } else {
      dispatch({
        type: types.FETCH_PLAN_NAME_SUCCESS,
        investments: data.response,
      });
    }
  },
  investmentPlans: async (dispatch, params, token) => {
    dispatch({ type: types.FETCH_INVESTMENT_PLAN_PENDING });
    let data = await SiteAPI.apiPostCall(
      `/investmentPlans/singlePlan`,
      params,
      token
    );
    if (data.error) {
      if (data.message) Alert.alert(data.message);
      dispatch({
        type: types.FETCH_INVESTMENT_PLAN_FAILURE,
        error: data.message,
      });
    } else {
      dispatch({
        type: types.FETCH_INVESTMENT_PLAN_SUCCESS,
        investment: data.response,
        myInvestlist: data.response ? data.response.schemes : [],
      });
    }
  },
  investmentConfig: async (dispatch, configs) => {
    dispatch({ type: types.FETCH_INVESTMENT_CONFIG, configs });
  },
  myInvestments: async (dispatch, myInvestlist) => {
    dispatch({ type: types.FETCH_MY_INVESTMENTS, myInvestlist });
  },
  newInvestment: async (dispatch, params, token) => {
    dispatch({ type: types.FETCH_NEW_INVESTMENT_PENDING });
    let pincodes = await SiteAPI.apiPostCall(
      `/investmentPlans/createPlan`,
      params,
      token
    );
    if (pincodes.response) {
      alert("Added to cart!");
      dispatch({
        type: types.FETCH_NEW_INVESTMENT_SUCCESS,
        pincodeInfo: pincodes.response,
      });
    }
  },
  userInvetment: async (dispatch, code, token) => {
    if (code) {
      dispatch({ type: types.FETCH_USER_INVESTMENT_PENDING });
      let banks = await SiteAPI.apiPostCall(
        `/investmentPlans/userinfo`,
        {},
        token
      );
      if (banks.validFlag) {
        dispatch({
          type: types.FETCH_USER_INVESTMENT_SUCCESS,
          bankDetails: banks.responseString,
        });
      }
    }
  },
  individualInvestment: async (dispatch, code, token) => {
    if (code) {
      dispatch({ type: types.FETCH_INDIVIDUAL_INVESTMENT_PENDING });
      let banks = await SiteAPI.apiPostCall(
        `/investmentPlans/usersingleplaninfo`,
        {},
        token
      );
      if (banks.validFlag) {
        dispatch({
          type: types.FETCH_INDIVIDUAL_INVESTMENT_SUCCESS,
          bankDetails: banks.responseString,
        });
      }
    }
  },
};

const initialState = {
  isFetching: false,
  error: null,
  investments: [],
  investment: {},
  configs: {},
  myInvestlist: [],
  pincodeInfo: null,
};

export const reducer = (state = initialState, action) => {
  const {
    type,
    error,
    investments,
    investment,
    myInvestlist,
    configs,
    pincodeInfo,
  } = action;
  switch (type) {
    case types.FETCH_PLAN_NAME_PENDING:
    case types.FETCH_INVESTMENT_PLAN_PENDING:
    case types.FETCH_INDIVIDUAL_INVESTMENT_PENDING:
    case types.FETCH_NEW_INVESTMENT_PENDING:
    case types.FETCH_USER_INVESTMENT_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }

    case types.FETCH_PLAN_NAME_FAILURE:
    case types.FETCH_INDIVIDUAL_INVESTMENT_FAILURE:
    case types.FETCH_NEW_INVESTMENT_FAILURE:
    case types.FETCH_USER_INVESTMENT_FAILURE:
    case types.FETCH_INVESTMENT_PLAN_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error,
        myInvestlist: [],
      };
    }
    case types.FETCH_PLAN_NAME_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        investments,
      };
    }
    case types.FETCH_INVESTMENT_PLAN_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        investment,
        myInvestlist,
      };
    }
    case types.FETCH_MY_INVESTMENTS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        myInvestlist,
      };
    }
    case types.FETCH_INVESTMENT_CONFIG: {
      return {
        ...state,
        isFetching: false,
        error: null,
        configs,
      };
    }
    case types.FETCH_NEW_INVESTMENT_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        pincodeInfo,
      };
    }
    case types.FETCH_USER_INVESTMENT_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    }
    case types.FETCH_INDIVIDUAL_INVESTMENT_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    }

    default:
      return state;
  }
};
