import SiteAPI from "../services/SiteApis";
import { Alert } from "react-native";

const types = {
  FETCH_SIP_DETAIL_PENDING: "FETCH_SIP_DETAIL_PENDING",
  FETCH_SIP_DETAIL_FAILURE: "FETCH_SIP_DETAIL_FAILURE",
  FETCH_SIP_DETAIL_SUCCESS: "FETCH_SIP_DETAIL_SUCCESS",

  CEASE_SIP_PENDING: "CEASE_SIP_PENDING",
  CEASE_SIP_FAILURE: "CEASE_SIP_FAILURE",
  CEASE_SIP_SUCCESS: "CEASE_SIP_SUCCESS",

  CEASE_MASTER_PENDING: "CEASE_MASTER_PENDING",
  CEASE_MASTER_FAILURE: "CEASE_MASTER_FAILURE",
  CEASE_MASTER_SUCCESS: "CEASE_MASTER_SUCCESS",
};

export const CeaseSipRedux = {
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

  ceaseMaster: async (dispatch, token) => {
    dispatch({ type: types.CEASE_MASTER_PENDING });

    try {
      let data = await SiteAPI.apiGetCall("/customer/ceasemasterdata", {}, token);
      if (data.error) {
        dispatch({
          type: types.CEASE_MASTER_FAILURE,
          error: data.message,
        });
      } else {
        dispatch({
          type: types.CEASE_MASTER_SUCCESS,
          ceaseMasterLists: data.data,
        });
      }
    } catch (err) {
      dispatch({
        type: types.CEASE_MASTER_FAILURE,
        error: "An error occurred while fetching cease master data.",
      });
    }
  },
  
  ceaseSipEntry: async (dispatch, params, token, setReasons, setReasonsText,setShowModal,setMessage) => {
    dispatch({ type: types.CEASE_SIP_PENDING });

    try {
      let data = await SiteAPI.apiPostCall("/customer/ceaseSipEntry", params, token);
      if (data.error) {
        dispatch({
          type: types.CEASE_SIP_FAILURE,
          error: data.message,
        });
        setMessage("An error occurred while ceaseing SIP entry, Try again")
        setReasons({});
        setReasonsText("");
        setShowModal(false);
      } else {
        dispatch({
          type: types.CEASE_SIP_SUCCESS,
          ceaseSipRes: data,
        });
      console.log("Message",data?.service_response?.return_msg);
      
      const messages = data.service_response
                .map((resp) => resp.return_msg) // Extract all return_msg values
                .join("\n"); // Combine messages into a single string with new lines

        setMessage(messages);
        setShowModal(true);
        setReasons({});
        setReasonsText("");
      }
    } catch (err) {
      setShowModal(false)
      dispatch({
        type: types.CEASE_SIP_FAILURE,
        error: "An error occurred while ceasing SIP entry.",
      });
      setMessage("An error occurred while ceaseing SIP entry, Try again")
      setReasons({});
      setReasonsText("");
    }
  },
};

const initialState = {
  isFetching: false,
  error: null,
  sipList: {},
  ceaseSipRes: {},
  ceaseMasterLists: [],
};

export const ceaseSipReducer = (state = initialState, action) => {
  const { type, error, sipList, ceaseSipRes, ceaseMasterLists } = action;

  switch (type) {
    case types.FETCH_SIP_DETAIL_PENDING:
    case types.CEASE_SIP_PENDING:
    case types.CEASE_MASTER_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }

    case types.FETCH_SIP_DETAIL_FAILURE:
    case types.CEASE_SIP_FAILURE:
    case types.CEASE_MASTER_FAILURE: {
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

    case types.CEASE_SIP_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        ceaseSipRes,
      };
    }

    case types.CEASE_MASTER_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        ceaseMasterLists,
      };
    }

    default:
      return state;
  }
};
