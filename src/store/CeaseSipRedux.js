import SiteAPI from "../services/SiteApis";
import { Alert } from "react-native";
const types = {

  FETCH_SIP_DETAIL_PENDING: "FETCH_SIP_DETAIL_PENDING",
  FETCH_SIP_DETAIL_FAILURE: "FETCH_SIP_DETAIL_FAILURE",
  FETCH_SIP_DETAIL_SUCCES: "FETCH_SIP_DETAIL_SUCCES",

  CEASE_SIP_PENDING: "CEASE_SIP_PENDING",
  CEASE_SIP_FAILURE: "CEASE_SIP_FAILURE",
  CEASE_SIP_SUCCES: "CEASE_SIP_SUCCES",

};

export const CeaseSipRedux = {

  getSipDetail: async (dispatch, params, token) => {

    dispatch({ type: types.FETCH_SIP_DETAIL_PENDING });

    let data = await SiteAPI.apiGetCall(`/sip?pan=${params}&null=null&type=START`, {}, token);
    if (data.error) {
      dispatch({
        type: types.FETCH_SIP_DETAIL_FAILURE,
        error: data.message,
      });
    } else {
      dispatch({
        type: types.FETCH_SIP_DETAIL_SUCCES,
        sipList: data,
      });
    }
  },
  ceaseSipEntry: async (dispatch, params, token) => {
    dispatch({ type: types.CEASE_SIP_PENDING });
    let data = await SiteAPI.apiPostCall("/customer/ceaseSipEntry", params, token);
    if (data.error) {
      dispatch({
        type: types.CEASE_SIP_FAILURE,
        error: data.message,
      });
    } else {
      dispatch({
        type: types.CEASE_SIP_SUCCES,
        ceaseSipRes: data,
      });
    }
  },
};

const initialState = {
  sipList : {},
  ceaseSipRes : {},
};

export const ceaseSipReducer = (state = initialState, action) => {
  const { type, error, sipList, ceaseSipRes } = action;

  switch (type) {
    case types.FETCH_SIP_DETAIL_PENDING: 
    case types.CEASE_SIP_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }

    case types.FETCH_SIP_DETAIL_FAILURE:
    case types.CEASE_SIP_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error,
      };
    }

    case types.FETCH_SIP_DETAIL_SUCCES: {
      return {
        ...state,
        isFetching: false,
        error: null,
        sipList,
      };
    }

    case types.CEASE_SIP_SUCCES: {
      return {
        ...state,
        isFinite: false,
        error: null,
        ceaseSipRes,
      };
    }

    default:
      return state;
  }
};