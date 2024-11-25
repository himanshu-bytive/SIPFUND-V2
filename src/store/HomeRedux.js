import SiteAPI from "../services/SiteApis";
const { SideMenuActions } = require("../store/SideMenuRedux");

import { Alert } from "react-native";
import { AuthActions } from "./AuthRedux";
import { RegistrationActions } from "./RegistrationRedux";
let timeoutRef;
const types = {
  RESETDATA: "RESETDATA",

  FETCH_STEPS_PENDING: "FETCH_STEPS_PENDING",
  FETCH_STEPS_SUCCESS: "FETCH_STEPS_SUCCESS",
  FETCH_STEPS_FAILURE: "FETCH_STEPS_FAILURE",

  FETCH_HOMEDATA_PENDING: "FETCH_HOMEDATA_PENDING",
  FETCH_HOMEDATA_SUCCESS: "FETCH_HOMEDATA_SUCCESS",
  FETCH_HOMEDATA_FAILURE: "FETCH_HOMEDATA_FAILURE",
  FETCH_UPDATE_PAN_FAIL: "FETCH_UPDATE_PAN_FAIL",

  FETCH_UPDATE_PAN_PENDING: "FETCH_UPDATE_PAN_PENDING",
  FETCH_UPDATE_PAN_SUCCESS: "FETCH_UPDATE_PAN_SUCCESS",
  FETCH_UPDATE_PAN_FAILURE: "FETCH_UPDATE_PAN_FAILURE",

  FETCH_IIN_EXIST: "FETCH_IIN_EXIST",
};
export const HomeActions = {
  resetData() {
    return { type: types.RESETDATA };
  },
  getsteps: async (dispatch, params, tokan) => {
    dispatch({ type: types.FETCH_STEPS_PENDING });
    let data = await SiteAPI.apiGetCall("/flags/step-state", params, tokan);
    if (data.error) {
      if (data.message) Alert.alert(data.message);
      dispatch({ type: types.FETCH_STEPS_FAILURE, error: data.message });
    } else {
      dispatch({ type: types.FETCH_STEPS_SUCCESS, steps: data.signUpSteps });
    }
  },
  getHomeData: async (dispatch, params, tokan) => {
    dispatch({ type: types.FETCH_HOMEDATA_PENDING });
    let data = await SiteAPI.apiGetCall("/retrieveData", params, tokan);
    if (data.error) {
      if (data.message) Alert.alert(data.message);
      dispatch({ type: types.FETCH_HOMEDATA_FAILURE, error: data.message });
    } else {
      dispatch({ type: types.FETCH_HOMEDATA_SUCCESS, home: data });
    }
  },
  updatePan: async (dispatch, params, tokan) => {
    let data1 = await SiteAPI.apiPostCall("/auth/verifypan", params, tokan);
    if (data1?.validFlag) {
      // this gives alert as "your pan is already registered"
      Alert.alert(data1?.responseString);
      return;
      // dispatch({ type: types.FETCH_UPDATE_PAN_FAIL });
    } else {
      dispatch({ type: types.FETCH_UPDATE_PAN_PENDING });

      let data = await SiteAPI.apiPostCall("/user/userPan", params, tokan);
      console.log("UPDATE PAN",data);
      
      if (data.error) {
        if (data.message) Alert.alert(data.message);
        dispatch({ type: types.FETCH_UPDATE_PAN_FAILURE, error: data.message });
        // dispatch({ type: types.FETCH_UPDATE_PAN_SUCCESS, pan: params.pan });
      } else {
        dispatch({ type: types.FETCH_UPDATE_PAN_SUCCESS, pan: data.data });
      }
    }
    return;
    // let data = await SiteAPI.apiPostCall("/user/userPan", params, tokan);
  },
  checkPANNumber: async (dispatch, params, tokan) => {
    dispatch({ type: types.FETCH_UPDATE_PAN_PENDING });
    let data1 = await SiteAPI.apiGetCall(`/user/getIINonPAN?pan=${params.pan}`);
    if (data1?.validflag) {
      const newParams = {
        iin: data1?.data[0]?.CUSTOMER_ID,
        pan: params.pan,
      };

      await SiteAPI.apiGetCall(`/user/setIINmapping?iin=${newParams.iin}`);
      if (timeoutRef) {
        clearTimeout(timeoutRef);
      }
      timeoutRef = setTimeout(() => {
        HomeActions.updatePan(dispatch, params, tokan);
        SideMenuActions.updateInn(dispatch, newParams, tokan);
        AuthActions.getProfile(dispatch,{ service_request: { iin: newParams.iin  } }, tokan);
        RegistrationActions.getDocuments(dispatch, tokan);
      }, 1000);
    } else {
      HomeActions.updatePan(dispatch, params, tokan);
      // dispatch({ type: types.FETCH_UPDATE_PAN_PENDING });

      // let data = await SiteAPI.apiPostCall("/user/userPan", params, tokan);
      // if (data.error) {
      //   if (data.message) Alert.alert(data.message);
      //   // dispatch({ type: types.FETCH_UPDATE_PAN_FAILURE, error: data.message });
      //   dispatch({ type: types.FETCH_UPDATE_PAN_SUCCESS, pan: params.pan });
      // } else {
      //   dispatch({ type: types.FETCH_UPDATE_PAN_SUCCESS, pan: data.data });
      // }
    }
    return;
    // let data = await SiteAPI.apiPostCall("/user/userPan", params, tokan);
  },
};

const initialState = {
  isFetching: false,
  error: null,
  steps: null,
  home: null,
  pan: null,
  iinExist: false,
};

export const reducer = (state = initialState, action) => {
  const { type, error, steps, home, pan } = action;
  switch (type) {
    case types.FETCH_UPDATE_PAN_PENDING:
    case types.FETCH_HOMEDATA_PENDING:
    case types.FETCH_STEPS_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case types.FETCH_UPDATE_PAN_FAILURE:
    case types.FETCH_HOMEDATA_FAILURE:
    case types.FETCH_STEPS_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error,
      };
    }
    // case type.:
    //  return{
    //   ...state,
    //  } ;
    // }
    case types.FETCH_IIN_EXIST: {
      return {
        ...state,
        iinExist: true,
      };
    }
    case types.FETCH_STEPS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        steps,
      };
    }
    case types.FETCH_HOMEDATA_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        home,
      };
    }
    case types.FETCH_UPDATE_PAN_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        pan,
      };
    }    
    case types.FETCH_UPDATE_PAN_FAIL: {
      return {
        isFetching: false,
      };
    }
    case types.RESETDATA:
      return Object.assign({}, initialState);
    default:
      return state;
  }
};
