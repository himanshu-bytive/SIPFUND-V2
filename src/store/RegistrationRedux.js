/** @format */

import SiteAPI from "../services/SiteApis";
import { Alert } from "react-native";
import axios from "axios";
import Config from "../common/Config";
import { AuthActions } from "./AuthRedux";
const types = {
  GET_OCCUPATION: "GET_OCCUPATION",

  FETCH_CITY_PENDING: "FETCH_CITY_PENDING",
  FETCH_CITY_SUCCESS: "FETCH_CITY_SUCCESS",
  FETCH_CITY_FAILURE: "FETCH_CITY_FAILURE",

  FETCH_BANK_PENDING: "FETCH_BANK_PENDING",
  FETCH_BANK_SUCCESS: "FETCH_OTP_SUCCESS",
  FETCH_BANK_FAILURE: "FETCH_BANK_FAILURE",

  FETCH_BANK_TYPES_SUCCESS: "FETCH_BANK_TYPES_SUCCESS",

  FETCH_PINCODE_INFO_PENDING: "FETCH_PINCODE_INFO_PENDING",
  FETCH_PINCODE_INFO_SUCCESS: "FETCH_PINCODE_INFO_SUCCESS",
  FETCH_PINCODE_INFO_FAILURE: "FETCH_PINCODE_INFO_FAILURE",

  FETCH_USERDETAILS_PENDING: "FETCH_USERDETAILS_PENDING",
  FETCH_USERDETAILS_SUCCESS: "FETCH_USERDETAILS_SUCCESS",
  FETCH_USERDETAILS_FAILURE: "FETCH_USERDETAILS_FAILURE",

  FETCH_CREATE_REGISTER_PENDING: "FETCH_CREATE_REGISTER_PENDING",
  FETCH_CREATE_REGISTER_SUCCESS: "FETCH_CREATE_REGISTER_SUCCESS",
  FETCH_CREATE_REGISTER_FAILURE: "FETCH_CREATE_REGISTER_FAILURE",

  FETCH_CREATE_FATCA_PENDING: "FETCH_CREATE_FATCA_PENDING",
  FETCH_CREATE_FATCA_SUCCESS: "FETCH_CREATE_FATCA_SUCCESS",
  FETCH_CREATE_FATCA_FAILURE: "FETCH_CREATE_FATCA_FAILURE",

  FETCH_UPDATE_REGISTER_PENDING: "FETCH_UPDATE_REGISTER_PENDING",
  FETCH_UPDATE_REGISTER_SUCCESS: "FETCH_UPDATE_REGISTER_SUCCESS",
  FETCH_UPDATE_REGISTER_FAILURE: "FETCH_UPDATE_REGISTER_FAILURE",

  FETCH_EDIT_REGISTER_PENDING: "FETCH_EDIT_REGISTER_PENDING",
  FETCH_EDIT_REGISTER_SUCCESS: "FETCH_EDIT_REGISTER_SUCCESS",
  FETCH_EDIT_REGISTER_FAILURE: "FETCH_EDIT_REGISTER_FAILURE",

  FETCH_FILE_UPLOAD_PENDING: "FETCH_FILE_UPLOAD_PENDING",
  FETCH_FILE_UPLOAD_SUCCESS: "FETCH_FILE_UPLOAD_SUCCESS",
  FETCH_FILE_UPLOAD_FAILURE: "FETCH_FILE_UPLOAD_FAILURE",

  FETCH_DOC_PENDING: "FETCH_DOC_PENDING",
  FETCH_DOC_SUCCESS: "FETCH_DOC_SUCCESS",
  FETCH_DOC_FAILURE: "FETCH_DOC_FAILURE",

  FETCH_UPDATED_NSE_DATA_PENDING: "FETCH_UPDATED_NSE_DATA_PENDING",
  FETCH_UPDATED_NSE_DATA_FAILURE: "FETCH_UPDATE_REGISTER_FAILURE",
  FETCH_UPDATED_NSE_DATA_SUCCESS: "FETCH_UPDATED_NSE_DATA_SUCCESS",

  PROOF_OF_ACCOUNT_PENDING: "PROOF_OF_ACCOUNT_PENDING",
  PROOF_OF_ACCOUNT_FAILURE: "PROOF_OF_ACCOUNT_FAILURE",
  PROOF_OF_ACCOUNT_SUCCESS: "PROOF_OF_ACCOUNT_SUCCESS",

  SET_URI: "SET_URI",

  FETCH_NOMINEE_RELATIONSHIP_PENDING: "FETCH_NOMINEE_RELATIONSHIP_PENDING",
  FETCH_NOMINEE_RELATIONSHIP_SUCCESS: "FETCH_NOMINEE_RELATIONSHIP_SUCCESS",
  FETCH_NOMINEE_RELATIONSHIP_FAILURE: "FETCH_NOMINEE_RELATIONSHIP_FAILURE",

  FETCH_MINOR_RELATIONSHIP_PENDING: "FETCH_MINOR_RELATIONSHIP_PENDING",
  FETCH_MINOR_RELATIONSHIP_SUCCESS: "FETCH_MINOR_RELATIONSHIP_SUCCESS",
  FETCH_MINOR_RELATIONSHIP_FAILURE: "FETCH_MINOR_RELATIONSHIP_FAILURE",
};

export const RegistrationActions = {
  settings: async (dispatch, token) => {
    let occupation = await SiteAPI.apiGetCall(
      "/nsemasterapi/getOccupation",
      {},
      token
    );
    let income = await SiteAPI.apiGetCall(
      "/nsemasterapi/getapplicableincome",
      {},
      token
    );
    let state = await SiteAPI.apiGetCall("/apiData/State", {}, token);
    let accountType = await SiteAPI.apiGetCall(
      "/apiData/AccountType",
      {},
      token
    );
    let bank = await SiteAPI.apiGetCall("/apiData/Bank", {}, token);
    let amc = await SiteAPI.apiGetCall("/amcforekyc/details", {}, token);
    if (
      occupation &&
      income &&
      state.Data &&
      accountType.Data &&
      bank.Data &&
      amc.response
    ) {
      dispatch({
        type: types.GET_OCCUPATION,
        occupations: occupation,
        incomes: income,
        states: state.Data.state_master,
        accountTypes: accountType.Data.account_type,
        banks: bank.Data.bank_master,
        amc: amc.response,
      });
    }
  },
  getDocuments: async (dispatch, token) => {
    dispatch({ type: types.FETCH_DOC_PENDING });
    let documents = await SiteAPI.apiGetCall(`/documents`, {}, token);
    if (documents.responseString) {
      dispatch({ type: types.FETCH_DOC_SUCCESS, documents: documents });
    }
  },
  getCitys: async (dispatch, code, token) => {
    if (code) {
      dispatch({ type: types.FETCH_CITY_PENDING });
      let citys = await SiteAPI.apiGetCall(
        `/apiData/City?StateCode=${code}`,
        {},
        token
      );
      if (citys.Data) {
        dispatch({
          type: types.FETCH_CITY_SUCCESS,
          citys: citys.Data.city_master,
        });
      }
    }
  },
  getPincode: async (dispatch, code, token) => {
    if (code) {
      dispatch({ type: types.FETCH_PINCODE_INFO_PENDING });
      let pincodes = await SiteAPI.apiGetCall(
        `/apiData/Pincode?pinCode=${code}`,
        {},
        token
      );
      if (pincodes.data) {
        dispatch({
          type: types.FETCH_PINCODE_INFO_SUCCESS,
          pincodeInfo: pincodes.data,
        });
      }
    }
  },
  getBankDetails: async (dispatch, code, token) => {
    if (code) {
      dispatch({ type: types.FETCH_BANK_PENDING });
      let banks = await SiteAPI.apiGetCall(`/ifsc?code=${code}`, {}, token);
      if (banks.validFlag) {
        dispatch({
          type: types.FETCH_BANK_SUCCESS,
          bankDetails: banks.responseString,
        });
      } else {
        Alert.alert(banks.message);
        dispatch({ type: types.FETCH_BANK_FAILURE, error: banks.message });
      }
    }
  },

  getAccountType: async (dispatch, code, token) => {
    let banks = await SiteAPI.apiGetCall(`/bank/accounttypelist`, {}, token);
    dispatch({
      type: types.FETCH_BANK_TYPES_SUCCESS,
      bankTypeDetails: banks?.response,
    });
  },
  getProofOfAccount: async (dispatch, code, token) => {
    let data = await SiteAPI.apiGetCall(`/bank/proofofacctlist`, {}, token);
    dispatch({
      type: types.PROOF_OF_ACCOUNT_SUCCESS,
      proofOfAccount: data?.response,
    });
  },

  getUserDetails: async (dispatch, params, tokan) => {
    dispatch({ type: types.FETCH_USERDETAILS_PENDING });
    let data = await SiteAPI.apiGetCall("/user/rawData", params, tokan);
    if (data.error) {
      if (data.message) Alert.alert(data.message);
      dispatch({ type: types.FETCH_USERDETAILS_FAILURE, error: data.message });
    } else {
      dispatch({
        type: types.FETCH_USERDETAILS_SUCCESS,
        fatcaDetails: data.data.fatcaDetails,
        nseDetails: data.data.nseDetails,
        userDetails: data.data.userDetails,
      });
    }
  },
  createRegister: async (dispatch, params, token) => {
    if (params?.hasOwnProperty("process_flag")) {
    }
    dispatch({ type: types.FETCH_CREATE_REGISTER_PENDING });
    let data = await SiteAPI.apiPostCall(
      params?.hasOwnProperty("process_flag")
        ? "/bank/addbankdetail"
        : "/apiData/CREATECUSTOMER",
      params,
      token
    );
    if (data.error) {
      if (data.message) Alert.alert(data.message);
      if (data.status == "InActive") {
        dispatch({
          type: types.FETCH_CREATE_REGISTER_SUCCESS,
          isExit: true,
          isInn: String(data.message).split("-")[1],
        });
      } else {
        dispatch({
          type: types.FETCH_CREATE_REGISTER_FAILURE,
          error: data.message,
        });
      }
    } else {
      dispatch({
        type: types.FETCH_CREATE_REGISTER_SUCCESS,
        isExit: false,
        isInn: params?.hasOwnProperty("process_flag")
          ? data?.user?.iin
          : data.IIN,
      });
      if (!params?.hasOwnProperty("process_flag")) {
        const newParams = { iin: data.IIN }; // Adjust as necessary
        console.log("YES HITTING USER API",data.IIN);
        
        await AuthActions.getProfile(dispatch, { service_request: newParams }, token);
        FatcaKYC(dispatch, params.FatcaObj, token);
      }
    }
  },
  FatcaKYC: async (dispatch, params, token) => {
    dispatch({ type: types.FETCH_CREATE_FATCA_PENDING });
    let data = await SiteAPI.apiPostCall(
      "/apiData/FATCAKYCUBOREG",
      params,
      token
    );

    if (data.error) {
      if (data.message) Alert.alert(data.message);
      // if (data.status == "InActive") {
      //   dispatch({
      //     type: types.FETCH_CREATE_REGISTER_SUCCESS,
      //     isExit: true,
      //     isInn: String(data.message).split("-")[1],
      //   });
      // } else {
      //   dispatch({
      //     type: types.FETCH_CREATE_REGISTER_FAILURE,
      //     error: data.message,
      //   });
      // }
    } else {
      // dispatch({
      //   type: types.FETCH_CREATE_REGISTER_SUCCESS,
      //   isExit: false,
      //   isInn: data.IIN,
      // });
    }
  },
  fetchNseData: async (dispatch, iin, token) => {
    try {
      dispatch({
        type: types.FETCH_UPDATED_NSE_DATA_PENDING,
      });
      const data = await axios.post(
        `${Config.apiBaseUrl}/apiData/IINDETAILS`,
        {
          service_request: {
            iin,
          },
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (data?.data?.Data) {
        dispatch({
          type: types.FETCH_UPDATED_NSE_DATA_SUCCESS,
          updatedNseData: data.data?.Data,
        });
      } else {
        dispatch({
          type: types.FETCH_UPDATED_NSE_DATA_FAILURE,
        });
      }
    } catch (e) {
      dispatch({
        type: types.FETCH_UPDATED_NSE_DATA_FAILURE,
      });
      console.log(e);
    }
  },
  updateNseRegistration: async (dispatch, params, token) => {
    params = { service_request: params };
    dispatch({
      type: types.FETCH_EDIT_REGISTER_PENDING,
    });
    try {
      const data = await axios.post(
        `${Config.apiBaseUrl}/apiData/EDITCUSTOMER`,
        params,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (data?.data?.Data) {
        Alert.alert(
          "Request Submitted",
          "Verification e-mail has been triggered from NSE to your registered email ID. Please authorize the changes to proceed further with the payment."
        );
        dispatch({
          type: types.FETCH_EDIT_REGISTER_SUCCESS,
        });
      } else {
        Alert.alert("Error", "We encountered some error making the request.");
        dispatch({
          type: types.FETCH_EDIT_REGISTER_FAILURE,
        });
      }
    } catch (e) {
      Alert.alert("Error", "We encountered some error making the request.");
      console.log(e);
    }
  },
  updateRegister: async (dispatch, params, token) => {
    console.log(
      "🚀 ~ file: RegistrationRedux.js:333 ~ updateRegister: ~ params,:",
      params
    );
    dispatch({ type: types.FETCH_UPDATE_REGISTER_PENDING });
    let data = await SiteAPI.apiPutCall("/user/rawData", params, token);
    if (data.error) {
      if (data.message) Alert.alert(data.message);
      dispatch({
        type: types.FETCH_UPDATE_REGISTER_FAILURE,
        error: data.message,
      });
    } else {
      Alert.alert("SIP Fund", data.responseString, [
        {
          text: "OK",
          onPress: () => {
            dispatch({
              type: types.FETCH_UPDATE_REGISTER_SUCCESS,
              fatcaDetails: data.data.fatcaDetails,
              nseDetails: { ...params.nseDetails, ...data.data.nseDetails },
              userDetails: data.data.userDetails,
            });
          },
        },
      ]);
    }
  },
  fileUpload: async (dispatch, params, token) => {
    dispatch({ type: types.FETCH_FILE_UPLOAD_PENDING });
    let data = await SiteAPI.uploadImgApi(
      `/documents/uploads?docType=${params.fileType}`,
      params.file,
      token
    );

    if (!data.validFlag) {
      alert(data.responseString);
      //Alert.alert("SIP Fund", JSON.stringify(data.message), [
      //{
      //text: "OK",
      //onPress: () => {
      //dispatch({ type: types.FETCH_FILE_UPLOAD_SUCCESS });
      //},
      //},
      //]);
      dispatch({ type: types.FETCH_FILE_UPLOAD_SUCCESS, uploadSuccess: true });
    } else {
      if (!data.responseString.includes("doc type not found")) {
        Alert.alert(data.responseString);
      }
      dispatch({
        type: types.FETCH_FILE_UPLOAD_FAILURE,
        error: data.responseString,
      });
    }
  },
  fileUploadSign: async (dispatch, params, token) => {
    dispatch({ type: types.FETCH_FILE_UPLOAD_PENDING });
    let data = await SiteAPI.apiPostCall(
      `/template/Investor_Form1`,
      params,
      token
    );
    let data1 = await SiteAPI.apiPostCall(`/template/ACH_FORM1`, params, token);
    if (data.error) {
      Alert.alert("SIP Fund", JSON.stringify(data.message), [
        {
          text: "OK",
          onPress: () => {
            dispatch({
              type: types.FETCH_FILE_UPLOAD_SUCCESS,
              uploadSuccess: true,
            });
          },
        },
      ]);
    } else {
      Alert.alert(data.responseString);
      dispatch({
        type: types.FETCH_FILE_UPLOAD_FAILURE,
        error: data.responseString,
      });
    }
  },

  setUri: (dispatch, params) => {
    dispatch({ type: types.SET_URI, documentUri: params });
  },

  fetchNomineeRelationship: async (dispatch, list) => {
    dispatch({
      type: types.FETCH_NOMINEE_RELATIONSHIP_PENDING,
    });

    let data = await SiteAPI.apiGetCall(`/nsemasterapi/getNomineeRelationship`);

    if (data.error) {
      if (data.message) Alert.alert(data.message);
      dispatch({
        type: types.FETCH_NOMINEE_RELATIONSHIP_FAILURE,
        error: data.message,
      });
    } else if (data?.responseData) {
      let remappingOfResponse = data?.responseData.map((item) => ({
        value: item,
        label: item,
      }));

      dispatch({
        type: types.FETCH_NOMINEE_RELATIONSHIP_SUCCESS,
        nomineeRelationship: remappingOfResponse,
      });
    }
  },

  fetchMinorGaurdianRelationship: async (dispatch, list) => {
    dispatch({
      type: types.FETCH_MINOR_RELATIONSHIP_PENDING,
    });

    let data = await SiteAPI.apiGetCall(
      `/nsemasterapi/getMinorGuardianRelationship`
    );

    if (data.error) {
      if (data.message) Alert.alert(data.message);
      dispatch({
        type: types.FETCH_MINOR_RELATIONSHIP_FAILURE,
        error: data.message,
      });
    } else if (data?.responseData) {
      let remappingOfResponse = data?.responseData.map((item) => ({
        value: item.MINOR_GUARD_REL_CODE,
        label: item.MINOR_GUARD_REL,
      }));

      dispatch({
        type: types.FETCH_MINOR_RELATIONSHIP_SUCCESS,
        minorGaurdianRelationship: remappingOfResponse,
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
  bankTypeDetails: [],
  typeOfAccount: [],
  fatcaDetails: null,
  nseDetails: null,
  userDetails: null,
  documents: null,
  isInn: null,
  isExit: false,
  updateSuccess: false,
  uploadSuccess: false,
  documentUri: null,
  mailSent: null,
  updatedNseData: null,
  nomineeRelationship: [],
  minorGaurdianRelationship: [],
};

export const reducer = (state = initialState, action) => {
  const {
    type,
    error,
    fatcaDetails,
    nseDetails,
    userDetails,
    occupations,
    incomes,
    states,
    citys,
    accountTypes,
    banks,
    bankDetails,
    pincodeInfo,
    documents,
    isInn,
    isExit,
    documentUri,
    mailSent,
    updatedNseData,
    bankTypeDetails,
    proofOfAccount,
    nomineeRelationship,
    minorGaurdianRelationship,
  } = action;
  switch (type) {
    case types.FETCH_USERDETAILS_PENDING:
    case types.FETCH_DOC_PENDING:
    case types.FETCH_FILE_UPLOAD_PENDING:
    case types.FETCH_UPDATE_REGISTER_PENDING:
    case types.FETCH_CREATE_REGISTER_PENDING:
    case types.FETCH_CREATE_FATCA_PENDING:
    case types.FETCH_EDIT_REGISTER_PENDING:
    case types.FETCH_PINCODE_INFO_PENDING:
    case types.FETCH_UPDATED_NSE_DATA_PENDING:
    case types.FETCH_BANK_PENDING:
    case types.FETCH_NOMINEE_RELATIONSHIP_PENDING:
    case types.FETCH_MINOR_RELATIONSHIP_PENDING:
    case types.FETCH_CITY_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: null,
        addSuccess: false,
        updateSuccess: false,
        uploadSuccess: false,
      };
    }
    case types.FETCH_USERDETAILS_FAILURE:
    case types.FETCH_FILE_UPLOAD_FAILURE:
    case types.FETCH_UPDATE_REGISTER_FAILURE:
    case types.FETCH_CREATE_REGISTER_FAILURE:
    case types.FETCH_EDIT_REGISTER_FAILURE:
    case types.FETCH_PINCODE_INFO_FAILURE:
    case types.FETCH_BANK_FAILURE:
    case types.FETCH_NOMINEE_RELATIONSHIP_FAILURE:
    case types.FETCH_MINOR_RELATIONSHIP_FAILURE:
    case types.FETCH_CITY_FAILURE: {
      return {
        ...state,
        isFetching: false,
        addSuccess: false,
        updateSuccess: false,
        uploadSuccess: false,
        mailSent: false,
        error,
      };
    }
    case types.GET_OCCUPATION: {
      return {
        ...state,
        isFetching: false,
        error: null,
        occupations,
        incomes,
        states,
        accountTypes,
        banks,
      };
    }
    case types.FETCH_CITY_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        citys,
      };
    }
    case types.FETCH_PINCODE_INFO_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        pincodeInfo,
      };
    }
    case types.FETCH_BANK_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        bankDetails,
      };
    }

    case types.FETCH_BANK_TYPES_SUCCESS: {
      return {
        ...state,
        bankTypeDetails,
      };
    }
    case types.PROOF_OF_ACCOUNT_SUCCESS: {
      return {
        ...state,
        proofOfAccount,
      };
    }
    case types.FETCH_USERDETAILS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        fatcaDetails,
        nseDetails,
        userDetails,
      };
    }
    case types.FETCH_CREATE_REGISTER_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        isInn,
        isExit,
      };
    }
    case types.FETCH_UPDATE_REGISTER_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        updateSuccess: true,
        fatcaDetails,
        nseDetails,
        userDetails,
        isInn: null,
      };
    }
    case types.FETCH_EDIT_REGISTER_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        mailSent: true,
      };
    }
    case types.FETCH_FILE_UPLOAD_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        uploadSuccess: true,
        error: null,
      };
    }
    case types.FETCH_DOC_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        documents,
      };
    }
    case types.FETCH_UPDATED_NSE_DATA_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        updatedNseData,
      };
    }

    case types.FETCH_NOMINEE_RELATIONSHIP_SUCCESS: {
      return {
        ...state,
        nomineeRelationship,
      };
    }

    case types.FETCH_MINOR_RELATIONSHIP_SUCCESS: {
      return {
        ...state,
        // ni,
        minorGaurdianRelationship,
      };
    }

    case types.SET_URI: {
      return {
        ...state,
        documentUri,
      };
    }
    default:
      return state;
  }
};
