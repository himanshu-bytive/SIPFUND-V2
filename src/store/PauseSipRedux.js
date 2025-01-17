import SiteAPI from "../services/SiteApis";
import { Alert } from "react-native";
const types = {

  FETCH_SIP_DETAIL_PENDING: "FETCH_SIP_DETAIL_PENDING",
  FETCH_SIP_DETAIL_FAILURE: "FETCH_SIP_DETAIL_FAILURE",
  FETCH_SIP_DETAIL_SUCCES: "FETCH_SIP_DETAIL_SUCCES",

  PAUSE_SIP_PENDING: "PAUSE_SIP_PENDING",
  PAUSE_SIP_FAILURE: "PAUSE_SIP_FAILURE",
  PAUSE_SIP_SUCCES: "PAUSE_SIP_SUCCES",

};

export const PauseSipRedux = {

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
  pauseSipEntry: async (dispatch, params, token) => {
    dispatch({ type: types.PAUSE_SIP_PENDING });
    let data = await SiteAPI.apiPostCall("/customer/pauseSipEntry", params, token);
    if (data.error) {
      dispatch({
        type: types.PAUSE_SIP_FAILURE,
        error: data.message,
      });
    } else {
      dispatch({
        type: types.PAUSE_SIP_SUCCES,
        pauseSipRes: data,
      });
    }
  },
};

const initialState = {
  sipList : {},
  pauseSipRes : {},
};

export const pauseSipReducer = (state = initialState, action) => {
  const { type, error, sipList, pauseSipRes } = action;

  switch (type) {
    case types.FETCH_SIP_DETAIL_PENDING: 
    case types.PAUSE_SIP_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }

    case types.FETCH_SIP_DETAIL_FAILURE:
    case types.PAUSE_SIP_FAILURE: {
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

    case types.PAUSE_SIP_SUCCES: {
      return {
        ...state,
        isFinite: false,
        error: null,
        pauseSipRes,
      }
    }

    default:
      return state;
  }
};