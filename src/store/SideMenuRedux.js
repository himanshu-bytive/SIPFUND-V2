/** @format */

import SiteAPI from "../services/SiteApis";
import { Alert } from "react-native";
import axios from "axios";
import { HomeActions } from "./HomeRedux";

const types = {
  RESETDATA: "RESETDATA",

  FETCH_DATA_PENDING: "FETCH_DATA_PENDING",
  FETCH_DATA_SUCCESS: "FETCH_DATA_SUCCESS",
  FETCH_DATA_FAILURE: "FETCH_DATA_FAILURE",

  FETCH_ADD_PENDING: "FETCH_ADD_PENDING",
  FETCH_ADD_SUCCESS: "FETCH_ADD_SUCCESS",
  FETCH_ADD_FAILURE: "FETCH_ADD_FAILURE",

  FETCH_UPDATE_PENDING: "FETCH_UPDATE_PENDING",
  FETCH_UPDATE_SUCCESS: "FETCH_UPDATE_SUCCESS",
  FETCH_UPDATE_FAILURE: "FETCH_UPDATE_FAILURE",

  FETCH_REFER_PENDING: "FETCH_REFER_PENDING",
  FETCH_REFER_SUCCESS: "FETCH_REFER_SUCCESS",
  FETCH_REFER_FAILURE: "FETCH_REFER_FAILURE",

  FETCH_REFER_PASS_PENDING: "FETCH_REFER_PASS_PENDING",
  FETCH_REFER_PASS_SUCCESS: "FETCH_REFER_PASS_SUCCESS",
  FETCH_REFER_PASS_FAILURE: "FETCH_REFER_PASS_FAILURE",

  FETCH_REFERRAL_PENDING: "FETCH_REFERRAL_PENDING",
  FETCH_REFERRAL_SUCCESS: "FETCH_REFERRAL_SUCCESS",
  FETCH_REFERRAL_FAILURE: "FETCH_REFERRAL_FAILURE",

  FETCH_NOTIFICATION_PENDING: "FETCH_NOTIFICATION_PENDING",
  FETCH_NOTIFICATION_SUCCESS: "FETCH_NOTIFICATION_SUCCESS",
  FETCH_NOTIFICATION_FAILURE: "FETCH_NOTIFICATION_FAILURE",

  FETCH_NOTIFICATION_READ_PENDING: "FETCH_NOTIFICATION_READ_PENDING",
  FETCH_NOTIFICATION_READ_SUCCESS: "FETCH_NOTIFICATION_READ_SUCCESS",
  FETCH_NOTIFICATION_READ_FAILURE: "FETCH_NOTIFICATION_READ_FAILURE",

  FETCH_NOTIFICATION_DELETED_PENDING: "FETCH_NOTIFICATION_DELETED_PENDING",
  FETCH_NOTIFICATION_DELETED_SUCCESS: "FETCH_NOTIFICATION_DELETED_SUCCESS",
  FETCH_NOTIFICATION_DELETED_FAILURE: "FETCH_NOTIFICATION_DELETED_FAILURE",
};
export const SideMenuActions = {
  resetData() {
    return { type: types.RESETDATA };
  },
  getrm: async (dispatch, tokan) => {
    dispatch({ type: types.FETCH_DATA_PENDING });
    let data = await SiteAPI.apiGetCall("/request-static/rm", {}, tokan);
    if (data.error) {
      //if(data.message) Alert.alert(data.message);
      dispatch({ type: types.FETCH_DATA_FAILURE, error: data.message });
    } else {
      dispatch({ type: types.FETCH_DATA_SUCCESS, rmDetails: data });
    }
  },
  inquiry: async (dispatch, params, tokan) => {
    dispatch({ type: types.FETCH_ADD_PENDING });
    let data = await SiteAPI.apiPostCall(
      "/request-static/enquiry",
      params,
      tokan
    );
    if (data.error) {
      if (data.message) Alert.alert(data.message);
      dispatch({ type: types.FETCH_ADD_FAILURE, error: data.message });
    } else {
      alert(data?.responseString);
      dispatch({ type: types.FETCH_ADD_SUCCESS, details: data.output });
    }
  },
  updateInn: async (dispatch, params, tokan) => {
    dispatch({ type: types.FETCH_UPDATE_PENDING });
    let data = await SiteAPI.apiPutCall("/user", params, tokan);
    if (data.error) {
      // if (data.message) {
      // this alert gives message of "IIN is already exists with another account "
      // Alert.alert(data.message);
      // }
      dispatch({ type: types.FETCH_UPDATE_FAILURE, error: data.message });
    } else {
      HomeActions.getsteps(dispatch, params, tokan);
      dispatch({ type: types.FETCH_UPDATE_SUCCESS, details: data.output });
    }
  },
  getRefer: async (dispatch, tokan) => {
    dispatch({ type: types.FETCH_REFER_PENDING });
    let data = await SiteAPI.apiGetCall(
      "/user-transactions/credit-debit",
      {},
      tokan
    );
    let dataConfig = await SiteAPI.apiGetCall("/referral-config", {}, tokan);
    console.log(data, dataConfig, "abcd");
    if (data.error || dataConfig.error) {
      if (data.message) Alert.alert(data.message);
      dispatch({ type: types.FETCH_REFER_FAILURE, error: data.message });
    } else {
      dispatch({
        type: types.FETCH_REFER_SUCCESS,
        refers: data.data,
        refersConfig: dataConfig.data,
      });
    }
  },
  passRefer: async (dispatch, tokan) => {
    dispatch({ type: types.FETCH_REFER_PASS_PENDING });
    let data = await SiteAPI.apiPostCall(
      "/user-transactions/credit-debit",
      {},
      tokan
    );
    if (data.error) {
      if (data.message) Alert.alert(data.message);
      dispatch({ type: types.FETCH_REFER_PASS_FAILURE, error: data.message });
    } else {
      dispatch({ type: types.FETCH_REFER_PASS_SUCCESS });
    }
  },
  getReferralLink: async (dispatch, params) => {
    console.log("PARAMS=", params);
    dispatch({ type: types.FETCH_REFERRAL_PENDING });
    try {
      let data = await axios.post(
        `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyDuY1P9kTWmzZq-rSPrU_wKO6MZYAT8qZ4`,
        params
      );
      console.log("DATA=", data);
      dispatch({
        type: types.FETCH_REFERRAL_SUCCESS,
        referralLink: data.data.shortLink,
      });
    } catch (err) {
      console.log("ERR=", err.message);

      Alert.alert(err.message);
      dispatch({ type: types.FETCH_REFERRAL_FAILURE, error: err.message });
    }
  },
  getNotifications: async (dispatch, tokan) => {
    dispatch({ type: types.FETCH_NOTIFICATION_PENDING });
    try {
      let data = await SiteAPI.apiGetCall("/notification/mobile", {}, tokan);
      dispatch({
        type: types.FETCH_NOTIFICATION_SUCCESS,
        notificationData: data?.results,
      });
    } catch (err) {
      console.log("ERR=", err.message);
      Alert.alert(err.message);
      dispatch({ type: types.FETCH_NOTIFICATION_FAILURE, error: err.message });
    }
  },
  readNotifications: async (dispatch, params, tokan) => {
    dispatch({ type: types.FETCH_NOTIFICATION_READ_PENDING });
    try {
      let data = await SiteAPI.apiPutCall(
        "/notification/mobile/" + params,
        { params },
        tokan
      );
      dispatch({
        type: types.FETCH_NOTIFICATION_READ_SUCCESS,
        notificationData: data?.results,
      });
    } catch (err) {
      console.log("ERR=", err.message);
      Alert.alert(err.message);
      dispatch({
        type: types.FETCH_NOTIFICATION_READ_FAILURE,
        error: err.message,
      });
    }
  },
  deleteNotifications: async (dispatch, params, tokan) => {
    dispatch({ type: types.FETCH_NOTIFICATION_DELETED_PENDING });
    try {
      let data = await SiteAPI.apiDelCall(
        "/notification/mobile/" + params,
        { params },
        tokan
      );
      dispatch({
        type: types.FETCH_NOTIFICATION_DELETED_SUCCESS,
        // notificationData: data?.results,
      });
      SideMenuActions.getNotifications(dispatch, tokan);
    } catch (err) {
      console.log("ERR=", err.message);
      Alert.alert(err.message);
      dispatch({
        type: types.FETCH_NOTIFICATION_DELETED_FAILURE,
        error: err.message,
      });
    }
  },
};

const initialState = {
  isFetching: false,
  error: null,
  rmDetails: null,
  details: null,
  refers: null,
  refersConfig: null,
  referralLink: null,
  notificationData: [],
  delLoading: false,
};

export const reducer = (state = initialState, action) => {
  const {
    type,
    error,
    rmDetails,
    details,
    refers,
    refersConfig,
    referralLink,
    notificationData,
  } = action;
  switch (type) {
    case types.FETCH_REFER_PASS_PENDING:
    case types.FETCH_REFER_PENDING:
    case types.FETCH_NOTIFICATION_PENDING:
    case types.FETCH_NOTIFICATION_READ_PENDING:
    case types.FETCH_UPDATE_PENDING:
    case types.FETCH_ADD_PENDING:
    case types.FETCH_DATA_PENDING:
    case types.FETCH_REFERRAL_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case types.FETCH_REFER_PASS_FAILURE:
    case types.FETCH_REFER_FAILURE:
    case types.FETCH_UPDATE_FAILURE:
    case types.FETCH_ADD_FAILURE:
    case types.FETCH_DATA_FAILURE:
    case types.FETCH_REFERRAL_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error,
      };
    }
    case types.FETCH_NOTIFICATION_DELETED_PENDING: {
      return {
        delLoading: true,
      };
    }
    case types.FETCH_NOTIFICATION_DELETED_SUCCESS: {
      return {
        delLoading: false,
      };
    }
    case types.FETCH_NOTIFICATION_DELETED_FAILURE: {
      return {
        ...state,
        delLoading: false,
        isFetching: true,
        error: null,
      };
    }
    case types.FETCH_DATA_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        rmDetails,
      };
    }
    case types.FETCH_ADD_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        details,
      };
    }
    case types.FETCH_UPDATE_SUCCESS: {
      // Alert.alert("Thanks for creating  your investors account!");
      return {
        ...state,
        isFetching: false,
        error: null,
        details,
      };
    }
    case types.FETCH_REFER_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        refers,
        refersConfig,
      };
    }

    case types.FETCH_REFERRAL_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        referralLink,
      };
    }
    case types.FETCH_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        notificationData,
      };
    }

    case types.RESETDATA:
      return Object.assign({}, initialState);
    default:
      return state;
  }
};
