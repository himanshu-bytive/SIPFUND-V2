import SiteAPI from "../services/SiteApis";
import { Alert, Linking } from "react-native";
const types = {
  FETCH_CHECKOUT_BUTTON_PENDING: "FETCH_CHECKOUT_BUTTON_PENDING",
  FETCH_CHECKOUT_BUTTON_SUCCESS: "FETCH_CHECKOUT_BUTTON_SUCCESS",
  FETCH_CHECKOUT_BUTTON_FAILURE: "FETCH_CHECKOUT_BUTTON_FAILURE",

  RESET_WEB_URL: "RESET_WEB_URL",
};

export const CheckoutActions = {
  checkoutButton: async (dispatch, params, token, mandate) => {
    dispatch({ type: types.FETCH_CHECKOUT_BUTTON_PENDING, fetching: true,emandateSuccess:false });
    let citys = await SiteAPI.apiPostCall(
      `/apiData/PURCHASETRXN`,
      params,
      token
    );
    console.log("token",token)
    console.log("data",citys)
    if (citys.Data) {
      if (mandate) {
        dispatch({
          type: types.FETCH_CHECKOUT_BUTTON_SUCCESS,
          // ...initialState,
          fetching: false,
          emandateSuccess:true
        });
      } else {
        dispatch({
          type: types.FETCH_CHECKOUT_BUTTON_SUCCESS,
          citys: citys.Data.city_master,
        });
        //Linking.openURL(citys?.Data[0].Paymentlink.split(">")[1].split("<")[0]);
        dispatch({
          type: types.FETCH_CHECKOUT_BUTTON_SUCCESS,
          fetching: false,
          webUrl: citys?.Data[0].Paymentlink.split(">")[1].split("<")[0],
        });
      }
    } else {
      dispatch({
        type: types.FETCH_CHECKOUT_BUTTON_FAILURE,
        fetching: false,
        webUrl: "",
      });
      alert(citys.message);
    }
  },

  resetWebUrl: async (dispatch) => {
    dispatch({ type: types.RESET_WEB_URL, webUrl: "" });
  },

  getUMRN: async (dispatch, iin, token) => {
    dispatch({ type: types.FETCH_CHECKOUT_BUTTON_PENDING });
    let data = await SiteAPI.apiGetCall(
      `/retrieveData/mandateList?iin=${iin}`,
      {},
      token
    );
    if (data.responseString && data.responseString[0]) {
      dispatch({
        type: types.FETCH_CHECKOUT_BUTTON_SUCCESS,
        umrn: data.responseString[0].achReports,
      });
    }
  },
};

const initialState = {
  isFetching: false,
  error: null,
  occupations: [],
  incomes: [],
  states: [],
  citys: [],
  pincodeInfo: null,
  accountTypes: [],
  banks: [],
  bankDetails: {},
  documents: null,
  addSuccess: false,
  updateSuccess: false,
  uploadSuccess: false,
  emandateSuccess:false,
  umrn: {},
  fetching: false,
  webUrl: "",
};

export const reducer = (state = initialState, action) => {
  const {
    type,
    error,
    occupations,
    incomes,
    states,
    citys,
    umrn,
    accountTypes,
    banks,
    emandateSuccess,
    bankDetails,
    pincodeInfo,
    documents,
    webUrl,
  } = action;
  switch (type) {
    case types.FETCH_CHECKOUT_BUTTON_PENDING: {
      return {
        ...state,
        isFetching: true,
        fetching: true,
        error: null,
        addSuccess: false,
        updateSuccess: false,
        emandateSuccess:false,
        uploadSuccess: false,
      };
    }

    case types.FETCH_CHECKOUT_BUTTON_FAILURE: {
      return {
        ...state,
        isFetching: false,
        fetching: false,
        addSuccess: false,
        updateSuccess: false,
        uploadSuccess: false,
        error,
      };
    }

    case types.FETCH_CHECKOUT_BUTTON_SUCCESS: {
      // return Object.assign({}, initialState, { emandateSuccess: true })
      return {
        ...state,
        isFetching: false,
        fetching: false,
        emandateSuccess:true,
        error: null,
        citys,
        umrn,
        webUrl,
      };
    }

    case types.RESET_WEB_URL: {
      return {
        ...state,
        webUrl,
      };
    }

    default:
      return state;
  }
};
