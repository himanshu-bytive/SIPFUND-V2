import SiteAPI from "../services/SiteApis";
import { Alert } from "react-native";

const types = {
  FETCH_SIP_DETAIL_PENDING: "FETCH_SIP_DETAIL_PENDING",
  FETCH_SIP_DETAIL_FAILURE: "FETCH_SIP_DETAIL_FAILURE",
  FETCH_SIP_DETAIL_SUCCESS: "FETCH_SIP_DETAIL_SUCCESS",

  PAUSE_SIP_PENDING: "PAUSE_SIP_PENDING",
  PAUSE_SIP_FAILURE: "PAUSE_SIP_FAILURE",
  PAUSE_SIP_SUCCESS: "PAUSE_SIP_SUCCESS",
};

export const PauseSipRedux = {
  getSipDetail: async (dispatch, params, token) => {
    dispatch({ type: types.FETCH_SIP_DETAIL_PENDING });

    try {
      let data = await SiteAPI.apiGetCall(`/sip?pan=${params}&null=null&type=START`, {}, token);
      if (data.error) {
        dispatch({
          type: types.FETCH_SIP_DETAIL_FAILURE,
          error: data.message,
        });
      } else {
        dispatch({
          type: types.FETCH_SIP_DETAIL_SUCCESS,
          sipList: data,
        });
      }
    } catch (err) {
      dispatch({
        type: types.FETCH_SIP_DETAIL_FAILURE,
        error: "An error occurred while fetching SIP details.",
      });
    }
  },
  pauseSipEntry: async (dispatch, params, token, setSelectedMonths, setSelectedItems,setMessage,setShowModal) => {
    dispatch({ type: types.PAUSE_SIP_PENDING });

    try {
      let data = await SiteAPI.apiPostCall("/customer/pauseSipEntry", params, token);
      if (data.error) {
        setShowModal(true);
        setMessage("An error occurred while pausing SIP entry, Try again");
        dispatch({
          type: types.PAUSE_SIP_FAILURE,
          error: data.message,
        });
        setSelectedMonths({});
        setSelectedItems([]);
      } else {
        setShowModal(true);
        setMessage("A confirmation email for your SIP pause request has been sent to your registered email. Please check and confirm.")
        dispatch({
          type: types.PAUSE_SIP_SUCCESS,
          pauseSipRes: data,
        });
        setSelectedMonths({});
        setSelectedItems([]);
      }
    } catch (err) {
      setMessage("");
      setShowModal(false);
      dispatch({
        type: types.PAUSE_SIP_FAILURE,
        error: "An error occurred while pausing SIP entry.",
      });
      setSelectedMonths({});
      setSelectedItems([]);
    }
  },
};

const initialState = {
  sipList: {},
  pauseSipRes: {},
  isFetching: false,
  error: null,
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

    case types.FETCH_SIP_DETAIL_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        sipList,
      };
    }

    case types.PAUSE_SIP_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        pauseSipRes,
      };
    }

    default:
      return state;
  }
};
