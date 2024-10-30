/** @format */

import SiteAPI from "../services/SiteApis";
import { Alert, Linking } from "react-native";
const types = {
  FETCH_EMANDATE_REGISTRATION_PENDING: "FETCH_EMANDATE_REGISTRATION_PENDING",
  FETCH_EMANDATE_REGISTRATION_SUCCESS: "FETCH_EMANDATE_REGISTRATION_SUCCESS",
  FETCH_EMANDATE_REGISTRATION_FAILURE: "FETCH_EMANDATE_REGISTRATION_FAILURE",

  FETCH_EMANDATE_OPTIONS_PENDING: "FETCH_EMANDATE_OPTIONS_PENDING",
  FETCH_EMANDATE_OPTIONS_SUCCESS: "FETCH_EMANDATE_OPTIONS_SUCCESS",
  FETCH_EMANDATE_OPTIONS_FAILURE: "FETCH_EMANDATE_OPTIONS_FAILURE",

  TOGGLE_EMANDATE_POPUP: "TOGGLE_EMANDATE_POPUP",
};

export const EmandateActions = {
  emandateOptions: async (dispatch, token) => {
    dispatch({ type: types.FETCH_EMANDATE_OPTIONS_PENDING });
    let data = await SiteAPI.apiGetCall(`/emandateOptions/`, {}, token);
    if (data.error) {
      if (data.message) Alert.alert(data.message);
      dispatch({
        type: types.FETCH_EMANDATE_OPTIONS_FAILURE,
        error: data.message,
      });
    } else {
      dispatch({
        type: types.FETCH_EMANDATE_OPTIONS_SUCCESS,
        emandateLists: data.response,
      });
    }
  },
  emandateRegistration: async (dispatch, params, token) => {
    dispatch({ type: types.FETCH_EMANDATE_REGISTRATION_PENDING });
    let data = await SiteAPI.apiPostCall(
      `/apiData/ACHMANDATEREGISTRATIONS`,
      params,
      token
    );

    if (data.error) {
      if (data.message) {
        Alert.alert("SIP Fund", data.message, [
          { text: "OK", onPress: () => {} },
        ]);
      }
      dispatch({
        type: types.FETCH_EMANDATE_REGISTRATION_FAILURE,
        error: data.message,
      });
    } else {
      //Linking.openURL(data.Data[0].eMandatelink);
      // alert(data.Data[0].eMandatelink);
      dispatch({
        type: types.FETCH_EMANDATE_REGISTRATION_SUCCESS,
        emandateDetails: data.response,
        emandateLink: data.Data[0].eMandatelink,
      });
    }
  },
  clearEmandateLink: async (dispatch) => {
    dispatch({
      type: types.FETCH_EMANDATE_REGISTRATION_SUCCESS,
      emandateLink: "",
    });
  },
  toggleEmandatePopup: async (dispatch, state) => {
    dispatch({
      type: types.TOGGLE_EMANDATE_POPUP,
      popupVisible: state,
    });
  },
};

const initialState = {
  isFetching: false,
  error: null,
  emandateLists: [],
  emandateDetails: null,
  emandateLink: null,
  popupVisible: false,
};

export const reducer = (state = initialState, action) => {
  const {
    type,
    error,
    emandateLists,
    emandateDetails,
    emandateLink,
    popupVisible,
  } = action;
  switch (type) {
    case types.FETCH_EMANDATE_REGISTRATION_PENDING:
    case types.FETCH_EMANDATE_OPTIONS_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }

    case types.FETCH_EMANDATE_REGISTRATION_FAILURE:
    case types.FETCH_EMANDATE_OPTIONS_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error,
      };
    }

    case types.FETCH_EMANDATE_REGISTRATION_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        emandateDetails,
        emandateLink,
      };
    }
    case types.FETCH_EMANDATE_OPTIONS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        emandateLists,
      };
    }
    case types.TOGGLE_EMANDATE_POPUP: {
      return {
        ...state,
        popupVisible,
      };
    }

    default:
      return state;
  }
};
