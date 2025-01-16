import SiteAPI from "../services/SiteApis";
import { Alert } from "react-native";
const types = {

  FETCH_SIP_DETAIL_PENDING: "FETCH_SIP_DETAIL_PENDING",
  FETCH_SIP_DETAIL_FAILURE: "FETCH_SIP_DETAIL_FAILURE",
  FETCH_SIP_DETAIL_SUCCES: "FETCH_SIP_DETAIL_SUCCES",

};

export const SwitchActions = {
  getSipDetail: async (dispatch, params, token) => {
    dispatch({ type: types.FETCH_SIP_DETAIL_PENDING });
    let data = await SiteAPI.apiGetCall("sip?pan=" + params + "&null=null&type=START", token);
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
};

const initialState = {
  sipList : [],
};

export const reducer = (state = initialState, action) => {
  const {
    type,
    error,
    sipList,
  } = action;

  switch (type) {
    case types.FETCH_SIP_DETAIL_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }

    case types.FETCH_SIP_DETAIL_FAILURE: {
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

    case types.LOGOUT:
      return Object.assign({}, initialState, { phones: state.phones });
    default:
      return state;
  }
};