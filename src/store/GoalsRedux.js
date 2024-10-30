/** @format */

import SiteAPI from "../services/SiteApis";
import { Alert } from "react-native";
const types = {
  FETCH_GOAL_DETAILS_PENDING: "FETCH_GOAL_DETAILS_PENDING",
  FETCH_GOAL_DETAILS_SUCCESS: "FETCH_GOAL_DETAILS_SUCCESS",
  FETCH_GOAL_DETAILS_FAILURE: "FETCH_GOAL_DETAILS_FAILURE",

  FETCH_SINGLE_DETAILS_PENDING: "FETCH_SINGLE_DETAILS_PENDING",
  FETCH_SINGLE_DETAILS_SUCCESS: "FETCH_SINGLE_DETAILS_SUCCESS",
  FETCH_SINGLE_DETAILS_FAILURE: "FETCH_SINGLE_DETAILS_FAILURE",

  FETCH_MY_CONFIG: "FETCH_MY_CONFIG",
  FETCH_MY_GOLES: "FETCH_MY_GOLES",

  FETCH_GOALUSER_PENDING: "FETCH_GOALUSER_PENDING",
  FETCH_GOALUSER_SUCCESS: "FETCH_GOALUSER_SUCCESS",
  FETCH_GOALUSER_FAILURE: "FETCH_GOALUSER_FAILURE",

  FETCH_SAVED_USER_PENDING: "FETCH_SAVED_USER_PENDING",
  FETCH_SAVED_USER_SUCCESS: "FETCH_SAVED_USER_SUCCESS",
  FETCH_SAVED_USER_FAILURE: "FETCH_SAVED_USER_FAILURE",

  FETCH_SINGLESAVED_USER_PENDING: "FETCH_SINGLESAVED_USER_PENDING",
  FETCH_SINGLESAVED_USER_SUCCESS: "FETCH_SINGLESAVED_USER_SUCCESS",
  FETCH_SINGLESAVED_USER_FAILURE: "FETCH_SINGLESAVED_USER_FAILURE",

  FETCH_SUMMARY_PENDING: "FETCH_SUMMARY_PENDING",
  FETCH_SUMMARY_SUCCESS: "FETCH_SUMMARY_SUCCESS",
  FETCH_SUMMARY_FAILURE: "FETCH_SUMMARY_FAILURE",

  FETCH_SUMMARY_RETRIEVE_PENDING: "FETCH_SUMMARY_RETRIEVE_PENDING",
  FETCH_SUMMARY_RETRIEVE_SUCCESS: "FETCH_SUMMARY_RETRIEVE_SUCCESS",
  FETCH_SUMMARY_RETRIEVE_FAILURE: "FETCH_SUMMARY_RETRIEVE_FAILURE",

  FETCH_SUMMARY_DETAILS: "FETCH_SUMMARY_DETAILS",
  FETCH_SUMMARY_DETAILS_INVESTMENT: "FETCH_SUMMARY_DETAILS_INVESTMENT",

  EMPTY_SUMMERY: "EMPTY_SUMMERY",

  SET_PLAN_YOUR_GOALS_DETAILS: "SET_PLAN_YOUR_GOAL_DETAILS",
  SET_CHILD_NAME: "SET_CHILD_NAME",
};

export const GoalsActions = {
  goalDetails: async (dispatch, token) => {
    dispatch({ type: types.FETCH_GOAL_DETAILS_PENDING });
    let data = await SiteAPI.apiGetCall(
      `/plan_your_goals/allPlansGoals`,
      {},
      token
    );
    if (data.error) {
      if (data.message) Alert.alert(data.message);
      dispatch({ type: types.FETCH_GOAL_DETAILS_FAILURE, error: data.message });
    } else {
      dispatch({
        type: types.FETCH_GOAL_DETAILS_SUCCESS,
        goals: data.response,
      });
    }
  },
  singleDetails: async (dispatch, params, token) => {
    dispatch({ type: types.FETCH_SINGLE_DETAILS_PENDING });
    const req = {
      goal: params.goal,
      years: params?.years ? params?.years : 5,
      investmentAmount: params?.investmentAmount,
      trxn_type: params?.trxn_type,
    };
    let data = await SiteAPI.apiPostCall(
      `/plan_your_goals/planInfo`,
      req,
      token
    );
    if (data.error) {
      if (data.message !== "") if (data.message) Alert.alert(data.message);
      dispatch({
        type: types.FETCH_SINGLE_DETAILS_FAILURE,
        error: data.message,
      });
    } else {
      dispatch({
        type: types.FETCH_SINGLE_DETAILS_SUCCESS,
        goalDetail: data.response,
        mygolelist: data.response.schemesInfo,
      });
    }
  },
  golesConfig: async (dispatch, configs) => {
    dispatch({ type: types.FETCH_MY_CONFIG, configs });
  },
  myGoles: async (dispatch, mygolelist) => {
    dispatch({ type: types.FETCH_MY_GOLES, mygolelist });
  },
  goalUser: async (dispatch, params, token) => {
    if (params) {
      dispatch({ type: types.FETCH_GOALUSER_PENDING });
      let pincodes = await SiteAPI.apiPostCall(
        `/plan_your_goals/userCreate`,
        params,
        token
      );
      if (pincodes) {
        alert("Investments added to Cart!");
        dispatch({
          type: types.FETCH_GOALUSER_SUCCESS,
          pincodeInfo: pincodes.respone,
        });
      } else {
        console.log(pincodes);
      }
    }
  },
  savedUser: async (dispatch, code, token) => {
    if (code) {
      dispatch({ type: types.FETCH_SAVED_USER_PENDING });
      let banks = await SiteAPI.apiPostCall(
        `/plan_your_goals/getSingleUserDetails`,
        {},
        token
      );
      if (banks.validFlag) {
        dispatch({
          type: types.FETCH_SAVED_USER_SUCCESS,
          bankDetails: banks.responseString,
        });
      }
    }
  },
  singleSavedUser: async (dispatch, code, token) => {
    if (code) {
      dispatch({ type: types.FETCH_SINGLESAVED_USER_PENDING });
      let banks = await SiteAPI.apiPostCall(
        `/plan_your_goals/getSingleUsersSinglePlan`,
        {},
        token
      );
      if (banks.validFlag) {
        dispatch({
          type: types.FETCH_SINGLESAVED_USER_SUCCESS,
          bankDetails: banks.responseString,
        });
      }
    }
  },
  goalSummaryRetrieve: async (dispatch, params, token) => {
    dispatch({ type: types.FETCH_SUMMARY_RETRIEVE_PENDING });
    let data = await SiteAPI.apiGetCall(
      // `/retrieveData`,
      `/investments/dashboard`,
      {},
      token
    );
    if (data.error) {
      if (data.message) Alert.alert(data.message);
      dispatch({
        type: types.FETCH_SUMMARY_RETRIEVE_FAILURE,
        error: data.message,
        summary: [],
      });
    } else {
      dispatch({
        type: types.FETCH_SUMMARY_RETRIEVE_SUCCESS,
        summary: data?.data,
        // summary: data?.responseString,
      });
    }
  },

  clearSummery: async (dispatch, params, token) => {
    dispatch({
      type: types.EMPTY_SUMMERY,
      summary: {},
      // summary: data?.responseString,
    });
  },
  goalSummary: async (dispatch, params, token) => {
    dispatch({ type: types.FETCH_SUMMARY_PENDING });
    let data = await SiteAPI.apiGetCall(
      `/investments/planGoalInvestmentsDashboard`,
      {},
      token
    );
    if (data.error) {
      if (data.message) Alert.alert(data.message);
      dispatch({
        type: types.FETCH_SUMMARY_FAILURE,
        error: data.message,
        summary: [],
      });
    } else {
      dispatch({ type: types.FETCH_SUMMARY_SUCCESS, summary: data?.data });
    }
  },
  goalSummaryDetails: async (dispatch, summaryDetails) => {
    dispatch({ type: types.FETCH_SUMMARY_DETAILS, summaryDetails });
  },
  InvestmentSummaryDetails: async (dispatch, summaryInvestmentDetails) => {
    dispatch({
      type: types.FETCH_SUMMARY_DETAILS_INVESTMENT,
      summaryInvestmentDetails,
    });
  },
  setPlanYourGoalDetails: (dispatch, props) => {
    dispatch({
      type: types.SET_PLAN_YOUR_GOALS_DETAILS,
      planYourGoalsDetails: props,
    });
  },
  setChildName: (dispatch, name) => {
    dispatch({
      type: types.SET_CHILD_NAME,
      childName: name,
    });
  },
};

const initialState = {
  isFetching: false,
  error: null,
  goals: [],
  goalDetail: null,
  configs: {},
  mygolelist: [],
  summary: {},
  summaryDetails: {},
  summaryInvestmentDetails: {},
  planYourGoalsDetails: null,
  childName: null,
  pincodeInfo: null,
};

export const reducer = (state = initialState, action) => {
  const {
    type,
    error,
    goals,
    goalDetail,
    configs,
    mygolelist,
    summary,
    summaryDetails,
    summaryInvestmentDetails,
    planYourGoalsDetails,
    childName,
    pincodeInfo,
  } = action;
  switch (type) {
    case types.FETCH_SUMMARY_PENDING:
    case types.FETCH_GOAL_DETAILS_PENDING:
    case types.FETCH_SINGLE_DETAILS_PENDING:
    case types.FETCH_SINGLESAVED_USER_PENDING:
    case types.FETCH_GOALUSER_PENDING:
    case types.FETCH_SAVED_USER_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case types.FETCH_SUMMARY_FAILURE:
    case types.FETCH_GOAL_DETAILS_FAILURE:
    case types.FETCH_SINGLESAVED_USER_FAILURE:
    case types.FETCH_GOALUSER_FAILURE:
    case types.FETCH_SAVED_USER_FAILURE:
    case types.FETCH_SINGLE_DETAILS_FAILURE: {
      return {
        ...state,
        isFetching: false,
        summary: [],
        error,
      };
    }
    case types.FETCH_GOAL_DETAILS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        goals,
      };
    }
    case types.FETCH_SINGLE_DETAILS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        goalDetail,
        mygolelist,
      };
    }
    case types.FETCH_MY_CONFIG: {
      return {
        ...state,
        isFetching: false,
        error: null,
        configs,
      };
    }
    case types.FETCH_MY_GOLES: {
      return {
        ...state,
        isFetching: false,
        error: null,
        mygolelist,
      };
    }
    case types.FETCH_GOALUSER_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        pincodeInfo,
      };
    }
    case types.FETCH_SAVED_USER_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    }
    case types.FETCH_SINGLESAVED_USER_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    }
    case types.FETCH_SUMMARY_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        summary,
      };
    }
    case types.FETCH_SUMMARY_RETRIEVE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        summaryRetrieve: summary,
      };
    }

    case types.EMPTY_SUMMERY: {
      return {
        ...state,
        isFetching: false,
        error: null,
        summaryRetrieve: {},
      };
    }
    case types.FETCH_SUMMARY_DETAILS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        summaryDetails,
      };
    }
    case types.FETCH_SUMMARY_DETAILS_INVESTMENT: {
      return {
        ...state,
        isFetching: false,
        error: null,
        summaryInvestmentDetails,
      };
    }

    case types.SET_PLAN_YOUR_GOALS_DETAILS: {
      return {
        ...state,
        planYourGoalsDetails,
      };
    }

    case types.SET_CHILD_NAME: {
      return {
        ...state,
        childName,
      };
    }

    default:
      return state;
  }
};
