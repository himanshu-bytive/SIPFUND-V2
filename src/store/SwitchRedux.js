import SiteAPI from "../services/SiteApis";
import { Alert } from "react-native";
const types = {
  LOGOUT: "LOGOUT",

  FETCH_EXT_HOLDING_PENDING: "FETCH_EXT_HOLDING_PENDING",
  FETCH_EXT_HOLDING_FAILURE: "FETCH_EXT_HOLDING_FAILURE",
  FETCH_EXT_HOLDING_SUCCES: "FETCH_EXT_HOLDING_SUCCES",

  FETCH_AMC_LIST_PENDING: "FETCH_AMC_LIST_PENDING",
  FETCH_AMC_LIST_FAILURE: "FETCH_AMC_LIST_FAILURE",
  FETCH_AMC_LIST_SUCCES: "FETCH_AMC_LIST_SUCCES",

  FETCH_EXT_HOLD_ADD_LUM_PENDING: "FETCH_EXT_HOLD_ADD_LUM_PENDING",
  FETCH_EXT_HOLD_ADD_LUM_FAILURE: "FETCH_EXT_HOLD_ADD_LUM_FAILURE",
  FETCH_EXT_HOLD_ADD_LUM_SUCCES: "FETCH_EXT_HOLD_ADD_LUM_SUCCES",

  FETCH_FET_TRANSACTION_DETAILS_PENDING:
    "FETCH_FET_TRANSACTION_DETAILS_PENDING",
  FETCH_FET_TRANSACTION_DETAILS_SUCCESS:
    "FETCH_FET_TRANSACTION_DETAILS_SUCCESS",
  FETCH_FET_TRANSACTION_DETAILS_FAILURE:
    "FETCH_FET_TRANSACTION_DETAILS_FAILURE",

  FETCH_SCHEME_DETAILS_PENDING: "FETCH_SCHEME_DETAILS_PENDING",
  FETCH_SCHEME_DETAILS_FAILURE: "FETCH_SCHEME_DETAILS_FAILURE",
  FETCH_SCHEME_DETAILS_SUCCES: "FETCH_SCHEME_DETAILS_SUCCES",

  FETCH_AMC_CODE_SUCCES: "FETCH_AMC_CODE_SUCCES",

  SET_SELECTED_AMC_SCHEME: "SET_SELECTED_AMC_SCHEME",

  SWITCH_CHECKOUT_DETAILS: "SWITCH_CHECKOUT_DETAILS",

  SWITCH_EXTERNAL_CHECKOUT_DETAILS: "SWITCH_EXTERNAL_CHECKOUT_DETAILS",

  REDEEM_CHECKOUT_DETAILS: "REDEEM_CHECKOUT_DETAILS",

  REDEEM_EXTERNAL_CHECKOUT_DETAILS: "REDEEM_EXTERNAL_CHECKOUT_DETAILS",

  SET_SCHEME_LIST_KEY: "SET_SCHEME_LIST_KEY",

  SWITCH_CHECKOUT_PENDING: "SWITCH_CHECKOUT_PENDING",
  SWITCH_CHECKOUT_FAILURE: "SWITCH_CHECKOUT_FAILURE",
  SWITCH_CHECKOUT_SUCCES: "SWITCH_CHECKOUT_SUCCES",

  REDEEM_CHECKOUT_PENDING: "REDEEEM_CHECKOUT_PENDING",
  REDEEM_CHECKOUT_FAILURE: "REDEEM_CHECKOUT_FAILURE",
  REDEEM_CHECKOUT_SUCCES: "REDEEM_CHECKOUT_SUCCES",

  SET_SWITCH_TRANSACTION_SUCCES: "SET_SWITCH_TRANSACTION_SUCCES",

  SET_REDEEM_TRANSACTION_SUCCES: "SET_REDEEM_TRANSACTION_SUCCES",
};

export const SwitchActions = {
  fetchExtHoldings: async (dispatch, params, token) => {
    dispatch({ type: types.FETCH_EXT_HOLDING_PENDING });
    let data = await SiteAPI.apiPostCall("/retrieveData", params, token);
    if (data.error) {
      dispatch({
        type: types.FETCH_EXT_HOLDING_FAILURE,
        error: data.message,
      });
    } else {
      dispatch({
        type: types.FETCH_EXT_HOLDING_SUCCES,
        extHolding: data,
      });
    }
  },
  fetchAmcLists: async (dispatch, token) => {
    dispatch({ type: types.FETCH_AMC_LIST_PENDING });
    let data = await SiteAPI.apiGetCall("/apiData/Amc", {}, token);
    if (data.error) {
      dispatch({
        type: types.FETCH_AMC_LIST_FAILURE,
        error: data.message,
      });
    } else {
      dispatch({
        type: types.FETCH_AMC_LIST_SUCCES,
        amcLists: data.Data.amc_master,
      });
    }
  },
  addExternalHoldingLumpsum: async (dispatch, params, token) => {
    console.log((params.type = "sip")
        ? "/externalTransactions"
        // : "/externalTransactions",
        : "/externalTransactions/uploadsntrn")
    dispatch({ type: types.FETCH_EXT_HOLD_ADD_LUM_PENDING });
    const date = new Date();
    let data = await SiteAPI.apiPostCall(
      (params.type = "sip")
        ? "/externalTransactions"
        // : "/externalTransactions",
        : "/externalTransactions/uploadsntrn",
      {
        ...params,
        tradDate: date.getTime(),
      },
      token
    );
    if (data.error) {
      if (data?.message) alert(data?.message);
      else alert("Something went wrong!");
      dispatch({
        type: types.FETCH_EXT_HOLD_ADD_LUM_FAILURE,
        error: data.message,
      });
    } else {
      alert("Holding added succesfully!");
      dispatch({
        type: types.FETCH_EXT_HOLD_ADD_LUM_SUCCES,
        addList: data,
      });
    }
  },
  fetchTransactionDetails: async (dispatch, params, token) => {
    dispatch({ type: types.FETCH_FET_TRANSACTION_DETAILS_PENDING });
    let data = await SiteAPI.apiPostCall("/operationData", params, token);
    if (data.error) {
      if(data.message) Alert.alert(data.message);
      dispatch({
        type: types.FETCH_FET_TRANSACTION_DETAILS_FAILURE,
        error: data.message,
      });
    } else {
      console.log("Called");
      dispatch({
        type: types.FETCH_FET_TRANSACTION_DETAILS_SUCCESS,
        switchRes: data.responseString,
        externalSwitch: data.externalOPTrnx,
        validFlag: data.validFlag,
      });
    }
  },
  getSchemeList: async (dispatch, params, token) => {
    dispatch({ type: types.FETCH_SCHEME_DETAILS_PENDING });
    let data = await SiteAPI.apiGetCall(
      `/apiData/Product?AMCCODE=${params}`,
      {},
      token
    );
    if (data.error) {
      if(data.message) Alert.alert(data.message);
      dispatch({
        type: types.FETCH_SCHEME_DETAILS_FAILURE,
        error: data.message,
      });
    } else {
      // console.log("schemeDetails=", data.Data.product_master);
      dispatch({
        type: types.FETCH_SCHEME_DETAILS_SUCCES,
        schemeDetails: data.Data.product_master,
      });
    }
  },
  setAmcCode: (dispatch, params) => {
    // dispatch({type:types.FETCH_AMC_CODE_PENDING})
    dispatch({ type: types.FETCH_AMC_CODE_SUCCES, amcCode: params });
  },
  selectedAmcScheme: (dispatch, params) => {
    dispatch({
      type: types.SET_SELECTED_AMC_SCHEME,
      // amcScheme: params.amcScheme,
      // targetCode: params.targetCode,
      // targetReinvest: params.targetReinvest,
      Scheme: params,
    });
  },
  setSwitchCheckoutDetails: (dispatch, params) => {
    dispatch({
      type: types.SWITCH_CHECKOUT_DETAILS,
      switchCheckoutDetails: params,
      switchActive: "SWITCH",
    });
  },
  setSwitchExternalCheckoutDetails: (dispatch, params) => {
    dispatch({
      type: types.SWITCH_EXTERNAL_CHECKOUT_DETAILS,
      switchExternalCheckoutDetails: params,
      switchActive: "EXTERNAL",
    });
  },
  setRedeemCheckoutDetails: (dispatch, params) => {
    dispatch({
      type: types.REDEEM_CHECKOUT_DETAILS,
      redeemCheckoutDetails: params,
      redeemActive: "REDEEM",
    });
  },
  setRedeemExternalCheckoutDetails: (dispatch, params) => {
    dispatch({
      type: types.REDEEM_EXTERNAL_CHECKOUT_DETAILS,
      redeemExternalCheckoutDetails: params,
      redeemActive: "EXTERNAL",
    });
  },

  setSchemeListKey: (dispatch, params) => {
    dispatch({
      type: types.SET_SCHEME_LIST_KEY,
      schemeListKey: params,
    });
  },

  switchCheckout: async (dispatch, params, token) => {
    console.log("Params=", params, token);
    dispatch({ type: types.SWITCH_CHECKOUT_PENDING });
    let data = await SiteAPI.apiPostCall(
      "/exceptional/SWITCHTRXNEXCEPTION",
      params,
      token
    );
    console.log("Data=", data);
    if (data.error) {
      if(data.message) Alert.alert(data.message);
      dispatch({
        type: types.SWITCH_CHECKOUT_FAILURE,
        error: data.message,
      });
    } else {
      dispatch({
        type: types.SWITCH_CHECKOUT_SUCCES,
        switchTransactionSucces: true,
      });
    }
  },

  setSwitchTransactionSucces: (dispatch, params) => {
    dispatch({
      type: types.SET_SWITCH_TRANSACTION_SUCCES,
      switchTransactionSucces: params,
    });
  },

  redeemCheckout: async (dispatch, params, token) => {
    dispatch({ type: types.REDEEM_CHECKOUT_PENDING });
    let data = await SiteAPI.apiPostCall(
      "/exceptional/REDEEMTRXNEXCEPTION",
      params,
      token
    );
    console.log("Data=", data);
    if (data.error) {
      if(data.message) Alert.alert(data.message);
      dispatch({
        type: types.REDEEM_CHECKOUT_FAILURE,
        error: data.message,
      });
    } else {
      console.log("REDEEM SUCCES", data);
      dispatch({
        type: types.REDEEM_CHECKOUT_SUCCES,
        redeemTransactionSucces: true,
      });
    }
  },

  setRedeemTransactionSucces: (dispatch, params) => {
    dispatch({
      type: types.SET_REDEEM_TRANSACTION_SUCCES,
      redeemTransactionSucces: params,
    });
  },

  logout() {
    return { type: types.LOGOUT };
  },
};

const initialState = {
  isFetching: false,
  error: null,
  extHolding: null,
  amcLists: [],
  signUpSteps: null,
  validFlag: null,
  phone: null,
  phones: [],
  switchRes: null,
  externalSwitch: null,
  user: null,
  token: null,
  schemeDetails: [],
  amcCode: null,
  switchCheckoutDetails: null,
  switchExternalCheckoutDetails: null,
  switchActive: null,
  redeemCheckoutDetails: null,
  redeemExternalCheckoutDetails: null,
  redeemActive: null,
  schemeListKey: null,
  Scheme: null,
  switchTransactionSucces: false,
  redeemTransactionSucces: false,
};

export const reducer = (state = initialState, action) => {
  const {
    type,
    error,
    extHolding,
    amcLists,
    switchRes,
    externalSwitch,
    schemeDetails,
    amcCode,
    // amcScheme,
    switchCheckoutDetails,
    switchExternalCheckoutDetails,
    switchActive,
    // targetCode,
    // targetReinvest,
    redeemCheckoutDetails,
    redeemExternalCheckoutDetails,
    redeemActive,
    schemeListKey,
    Scheme,
    switchTransactionSucces,
    redeemTransactionSucces,
  } = action;
  switch (type) {
    case types.FETCH_EXT_HOLD_ADD_LUM_PENDING:
    case types.FETCH_AMC_LIST_PENDING:
    case types.FETCH_EXT_HOLDING_PENDING:
    case types.FETCH_FET_TRANSACTION_DETAILS_PENDING:
    case types.FETCH_SCHEME_DETAILS_PENDING:
    case types.SWITCH_CHECKOUT_PENDING:
    case types.REDEEM_CHECKOUT_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }

    case types.FETCH_EXT_HOLD_ADD_LUM_FAILURE:
    case types.FETCH_AMC_LIST_FAILURE:
    case types.FETCH_EXT_HOLDING_FAILURE:
    case types.FETCH_FET_TRANSACTION_DETAILS_FAILURE:
    case types.FETCH_SCHEME_DETAILS_FAILURE:
    case types.SWITCH_CHECKOUT_FAILURE:
    case types.REDEEM_CHECKOUT_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error,
      };
    }

    case types.FETCH_EXT_HOLDING_SUCCES: {
      return {
        ...state,
        isFetching: false,
        error: null,
        extHolding,
      };
    }
    case types.FETCH_AMC_LIST_SUCCES: {
      return {
        ...state,
        isFetching: false,
        error: null,
        amcLists,
      };
    }
    case types.FETCH_EXT_HOLD_ADD_LUM_SUCCES: {
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    }
    case types.FETCH_FET_TRANSACTION_DETAILS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        switchRes,
        externalSwitch,
      };
    }

    case types.FETCH_SCHEME_DETAILS_SUCCES: {
      return {
        ...state,
        isFetching: false,
        error: null,
        schemeDetails,
      };
    }

    case types.FETCH_AMC_CODE_SUCCES: {
      return {
        ...state,
        amcCode,
      };
    }

    case types.SET_SELECTED_AMC_SCHEME: {
      return {
        ...state,
        Scheme,
      };
    }

    case types.SWITCH_CHECKOUT_DETAILS: {
      return {
        ...state,
        switchCheckoutDetails,
        switchActive,
      };
    }

    case types.SWITCH_EXTERNAL_CHECKOUT_DETAILS: {
      return {
        ...state,
        switchExternalCheckoutDetails,
        switchActive,
      };
    }

    case types.REDEEM_CHECKOUT_DETAILS: {
      return {
        ...state,
        redeemCheckoutDetails,
        redeemActive,
      };
    }

    case types.REDEEM_EXTERNAL_CHECKOUT_DETAILS: {
      return {
        ...state,
        redeemExternalCheckoutDetails,
        redeemActive,
      };
    }

    case types.SET_SCHEME_LIST_KEY: {
      return {
        ...state,
        schemeListKey,
      };
    }

    case types.SWITCH_CHECKOUT_SUCCES: {
      return {
        ...state,
        isFetching: false,
        error: null,
        switchTransactionSucces,
      };
    }

    case types.SET_SWITCH_TRANSACTION_SUCCES: {
      return {
        ...state,
        switchTransactionSucces,
      };
    }

    case types.REDEEM_CHECKOUT_SUCCES: {
      return {
        isFetching: false,
        error: null,
        redeemTransactionSucces,
      };
    }

    case types.SET_REDEEM_TRANSACTION_SUCCES: {
      return {
        ...state,
        redeemTransactionSucces,
      };
    }

    case types.LOGOUT:
      return Object.assign({}, initialState, { phones: state.phones });
    default:
      return state;
  }
};
