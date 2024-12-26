/** @format */

import SiteAPI from "../services/SiteApis";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const types = {
  LOGOUT: "LOGOUT",
  RESET: "RESET",
  FETCH_VERIFY_PENDING: "FETCH_VERIFY_PENDING",
  FETCH_VERIFY_SUCCESS: "FETCH_VERIFY_SUCCESS",
  FETCH_VERIFY_FAILURE: "FETCH_VERIFY_FAILURE",

  FETCH_OTP_PENDING: "FETCH_OTP_PENDING",
  FETCH_OTP_SUCCESS: "FETCH_OTP_SUCCESS",
  FETCH_OTP_FAILURE: "FETCH_OTP_FAILURE",

  FETCH_RESEND_OTP_PENDING: "FETCH_RESEND_OTP_PENDING",
  FETCH_RESEND_OTP_SUCCESS: "FETCH_RESEND_OTP_SUCCESS",
  FETCH_RESEND_OTP_FAILURE: "FETCH_RESEND_OTP_FAILURE",

  FETCH_FORGET_PASS_PENDING: "FETCH_FORGET_PASS_PENDING",
  FETCH_FORGET_PASS_SUCCESS: "FETCH_FORGET_PASS_SUCCESS",
  FETCH_FORGET_PASS_FAILURE: "FETCH_FORGET_PASS_FAILURE",

  FETCH_CHANGE_PASSWORD_PENDING: "FETCH_CHANGE_PASSWORD_PENDING",
  FETCH_CHANGE_PASSWORD_SUCCESS: "FETCH_CHANGE_PASSWORD_SUCCESS",
  FETCH_CHANGE_PASSWORD_FAILURE: "FETCH_CHANGE_PASSWORD_FAILURE",

  FETCH_PAN_NUMBER_PENDING: "FETCH_PAN_NUMBER_PENDING",
  FETCH_PAN_NUMBER_SUCCESS: "FETCH_PAN_NUMBER_SUCCESS",
  FETCH_PAN_NUMBER_FAILURE: "FETCH_PAN_NUMBER_FAILURE",

  FETCH_LOGIN_PENDING: "FETCH_LOGIN_PENDING",
  FETCH_LOGIN_SUCCESS: "FETCH_LOGIN_SUCCESS",
  FETCH_LOGIN_FAILURE: "FETCH_LOGIN_FAILURE",

  FETCH_CREAT_ACCOUNT_PENDING: "FETCH_CREAT_ACCOUNT_PENDING",
  FETCH_CREAT_ACCOUNT_SUCCESS: "FETCH_CREAT_ACCOUNT_SUCCESS",
  FETCH_CREAT_ACCOUNT_FAILURE: "FETCH_CREAT_ACCOUNT_FAILURE",

  FETCH_PROFILE_PENDING: "FETCH_PROFILE_PENDING",
  FETCH_PROFILE_SUCCESS: "FETCH_PROFILE_SUCCESS",
  FETCH_PROFILE_FAILURE: "FETCH_PROFILE_FAILURE",

  FETCH_IIN_BANK_SUCCESS: "FETCH_IIN_BANK_SUCCESS",
};

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

export const AuthActions = {
  verify: async (dispatch, params) => {
    console.log("Login Params",params);
    await AsyncStorage.removeItem("USERNAME");
    await AsyncStorage.removeItem('LOGIN');
    dispatch({ type: types.FETCH_VERIFY_PENDING });
    let data = await SiteAPI.apiPostCall("/auth/verify", params);
    console.log("Login params Response",data);
    
    if (data.error) {
      if (data.message) Alert.alert(data.message);
      dispatch({ type: types.FETCH_VERIFY_FAILURE, error: data.message });
    } else {
      dispatch({
        type: types.FETCH_VERIFY_SUCCESS,
        phone: params.mobileNo,
        signUpSteps: data.signUpSteps,
        validFlag: data.validFlag,
      });
    }
  },
  otp: async (dispatch, params) => {
    console.log("PARAMS",params);
    
    dispatch({ type: types.FETCH_OTP_PENDING });
    let data = await SiteAPI.apiPostCall("/auth/validate", params);
    if (data.error) {
      if (data.message) Alert.alert(data.message);
      dispatch({ type: types.FETCH_OTP_FAILURE, error: data.message });
    } else {
      dispatch({
        type: types.FETCH_OTP_SUCCESS,
        signUpSteps: data.signUpSteps,
        validFlag: data.validFlag,
      });
      // Alert.alert("SIP Fund", data.responseString, [
      //   {
      //     text: "OK",
      //     onPress: () => {
      //       dispatch({
      //         type: types.FETCH_OTP_SUCCESS,
      //         signUpSteps: data.signUpSteps,
      //         validFlag: data.validFlag,
      //       });
      //     },
      //   },
      // ]);
    }
  },
  resendOtp: async (dispatch, params) => {
    dispatch({ type: types.FETCH_RESEND_OTP_PENDING });
    let data = await SiteAPI.apiPostCall("/auth/resend", params);
    if (data.error) {
      if (data.message) Alert.alert(data.message);
      dispatch({ type: types.FETCH_RESEND_OTP_FAILURE, error: data.message });
    } else {
      Alert.alert("SIP Fund", data.responseString, [
        {
          text: "OK",
          onPress: () => {
            dispatch({ type: types.FETCH_RESEND_OTP_SUCCESS });
          },
        },
      ]);
    }
  },
  changePassword: async (dispatch, params) => {
    dispatch({ type: types.FETCH_CHANGE_PASSWORD_PENDING });
    let data = await SiteAPI.apiPutCall("/password/changePassword", params);
    if (data.error) {
      if (data.message) Alert.alert(data.message);
      dispatch({
        type: types.FETCH_CHANGE_PASSWORD_FAILURE,
        error: data.message,
      });
    } else {
      Alert.alert("SIP Fund", data.responseString, [
        {
          text: "OK",
          onPress: () => {
            dispatch({
              type: types.FETCH_CHANGE_PASSWORD_SUCCESS,
              signUpSteps: data.signUpSteps,
              validFlag: data.validFlag,
            });
          },
        },
      ]);
    }
  },
  panNumber: async (dispatch, params) => {
    dispatch({ type: types.FETCH_PAN_NUMBER_PENDING });
    let data = await SiteAPI.apiPostCall("/user/userPan", params);
    if (data.error) {
      if (data.message) Alert.alert(data.message);
      dispatch({ type: types.FETCH_PAN_NUMBER_FAILURE, error: data.message });
    } else {
      Alert.alert("SIP Fund", data.responseString, [
        {
          text: "OK",
          onPress: () => {
            dispatch({
              type: types.FETCH_PAN_NUMBER_SUCCESS,
              panNumber: data.data,
            });
          },
        },
      ]);
    }
  },
  forgotPassword: async (dispatch, params) => {
    dispatch({ type: types.FETCH_FORGET_PASS_PENDING });
    let data = await SiteAPI.apiPostCall("/password/forgotPassword", params);
    if (data.error) {
      if (data.message) Alert.alert(data.message);
      dispatch({ type: types.FETCH_FORGET_PASS_FAILURE, error: data.message });
    } else {
      Alert.alert("SIP Fund", data.message, [
        {
          text: "OK",
          onPress: () => {
            dispatch({ type: types.FETCH_FORGET_PASS_SUCCESS });
          },
        },
      ]);
    }
  },
  login: async (dispatch, params, token) => {
    dispatch({ type: types.FETCH_LOGIN_PENDING });
    let data = await SiteAPI.apiPostCall("/token", params, token);
    console.log("====================================");
    console.log(JSON.stringify(data));
    console.log("====================================");
    if (data.error) {
      if (data.message) Alert.alert(data.message);
      dispatch({ type: types.FETCH_LOGIN_FAILURE, error: data.message });
      await AsyncStorage.setItem('LOGIN', 'FAIL');
    } else {
      /* Save the password to storage */
      storeData(toString(params.username), params.password);
      await AsyncStorage.setItem('LOGIN', 'SUCCESS');
      dispatch({
        type: types.FETCH_LOGIN_SUCCESS,
        user: data,
        token: data.access_token,
      });
    }
  },
  logout : async () => {
    console.log("Logging out...");
    await AsyncStorage.removeItem("USERNAME");
    await AsyncStorage.removeItem('LOGIN');
    return { type: types.LOGOUT };
  },
  resetApp() {
    return { type: types.RESET };
  },
  creatAccount: async (dispatch, params) => {
    dispatch({ type: types.FETCH_CREAT_ACCOUNT_PENDING });
    let data = await SiteAPI.apiPostCall("/auth", params);
    if (data.error) {
      if (data.message) Alert.alert(data.message);
      dispatch({
        type: types.FETCH_CREAT_ACCOUNT_FAILURE,
        error: data.message,
      });
    } else {
      Alert.alert(
        "SIP Fund",
        "Congrats! Your signup is successful. Proceed further to set up your Account",
        [
          {
            text: "OK",
            onPress: () => {
              dispatch({
                type: types.FETCH_CREAT_ACCOUNT_SUCCESS,
                signUpSteps: data.signUpSteps,
              });
            },
          },
        ]
      );
    }
  },
  getProfile: async (dispatch, params, token) => {
    dispatch({ type: types.FETCH_PROFILE_PENDING });
    let data = await SiteAPI.apiPostCall("/apiData/IINDETAILS", params, token);
    console.log("Yes Data Got",data.Data.INVESTOR_NAME);
    const UserName = AsyncStorage.setItem("USERNAME",data.Data.INVESTOR_NAME);
    if (params?.service_request?.iin > 0 && params?.service_request?.iin) {
      let data1 = await SiteAPI.apiGetCall(
        "/bank/custbanklist?iin=" + params?.service_request?.iin,
        {},
        token
      );
      if (data.error) {
        dispatch({ type: types.FETCH_PROFILE_FAILURE, error: data1.message });
      } else {
        dispatch({ type: types.FETCH_IIN_BANK_SUCCESS, iinBank: data1.data });
      }
      if (data.error) {
        //if(data.message) Alert.alert(data.message)
        dispatch({ type: types.FETCH_PROFILE_FAILURE, error: data.message });
      } else {
        dispatch({ type: types.FETCH_PROFILE_SUCCESS, profile: data.Data });
      }
      return;
    }
    if (data.error) {
      //if(data.message) Alert.alert(data.message)
      dispatch({ type: types.FETCH_PROFILE_FAILURE, error: data.message });
    } else {
      dispatch({ type: types.FETCH_PROFILE_SUCCESS, profile: data.Data });
    }
  },
};

const initialState = {
  isFetching: false,
  error: null,
  signUpSteps: -1,
  validFlag: null,
  phone: null,
  phones: [],
  user: null,
  token: null,
  password: false,
  panNumber: null,
  profile: null,
  wrongPassCount: 0,
  iinBank: [],
};

export const reducer = (state = initialState, action) => {
  const {
    type,
    error,
    phone,
    signUpSteps,
    validFlag,
    user,
    token,
    panNumber,
    profile,
    iinBank,
  } = action;
  switch (type) {
    case types.FETCH_PROFILE_PENDING:
    case types.FETCH_CREAT_ACCOUNT_PENDING:
    case types.FETCH_PAN_NUMBER_PENDING:
    case types.FETCH_CHANGE_PASSWORD_PENDING:
    case types.FETCH_RESEND_OTP_PENDING:
    case types.FETCH_VERIFY_PENDING:
    case types.FETCH_FORGET_PASS_PENDING:
    case types.FETCH_OTP_PENDING:
    case types.FETCH_LOGIN_PENDING: {
      return {
        ...state,
        signUpSteps: null,
        isFetching: true,
        error: null,
      };
    }
    case types.FETCH_PROFILE_FAILURE:
    case types.FETCH_CREAT_ACCOUNT_FAILURE:
    case types.FETCH_PAN_NUMBER_FAILURE:
    case types.FETCH_CHANGE_PASSWORD_FAILURE:
    case types.FETCH_RESEND_OTP_FAILURE:
    case types.FETCH_VERIFY_FAILURE:
    case types.FETCH_FORGET_PASS_FAILURE:
    case types.FETCH_OTP_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error,
      };
    }
    case types.FETCH_LOGIN_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error,
        wrongPassCount: parseInt(state?.wrongPassCount) + 1,
      };
    }
    case types.FETCH_VERIFY_SUCCESS: {
      let phones = [...state.phones, phone];
      let uniq = [...new Set(phones.reverse())];
      if (uniq.length >= 3) {
        uniq.length = 3;
      }
      return {
        ...state,
        isFetching: false,
        error: null,
        signUpSteps,
        validFlag,
        phone,
        phones: uniq,
      };
    }
    case types.FETCH_OTP_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        signUpSteps,
        validFlag,
      };
    }
    case types.FETCH_RESEND_OTP_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        signUpSteps,
        validFlag,
      };
    }
    case types.FETCH_FORGET_PASS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        password: true,
      };
    }
    case types.FETCH_CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    }
    case types.FETCH_PAN_NUMBER_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        panNumber,
      };
    }
    case types.FETCH_CREAT_ACCOUNT_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        signUpSteps,
      };
    }
    case types.FETCH_PROFILE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        profile,
      };
    }

    case types.FETCH_IIN_BANK_SUCCESS: {
      return {
        ...state,
        iinBank,
      };
    }
    case types.FETCH_LOGIN_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        user,
        token: `Bearer ${token}`,
        wrongPassCount: 0,
      };
    }
    case types.RESET:
      return Object.assign({}, initialState, {phones : state.phones});

    case types.LOGOUT:
      return Object.assign({}, initialState, { phones: state.phones });
    default:
      return state;
  }
};
