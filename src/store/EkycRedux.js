import SiteAPI from '../services/SiteApis'
import { Alert } from 'react-native';
const types = {

    FETCH_GETLIST_PENDING: "FETCH_GETLIST_PENDING",
    FETCH_GETLIST_SUCCESS: "FETCH_GETLIST_SUCCESS",
    FETCH_GETLIST_FAILURE: "FETCH_GETLIST_FAILURE",

    FETCH_POST_REQUEST_PENDING: "FETCH_POST_REQUEST_PENDING",
    FETCH_POST_REQUEST_SUCCESS: "FETCH_POST_REQUEST_SUCCESS",
    FETCH_POST_REQUEST_FAILURE: "FETCH_POST_REQUEST_FAILURE",

};

export const EkycActions = {
    getList: async (dispatch, token) => {
        dispatch({ type: types.FETCH_GETLIST_PENDING });
        let data = await SiteAPI.apiGetCall(`/amcforekyc/details`, {}, token);
        if (data.error) {
            if(data.message) Alert.alert(data.message)
            dispatch({ type: types.FETCH_GETLIST_FAILURE, error: data.message });
        } else {
            dispatch({ type: types.FETCH_GETLIST_SUCCESS, kycLists: data.response });
        }
    },
    postRequest: async (dispatch, params, token) => {
        dispatch({ type: types.FETCH_POST_REQUEST_PENDING });
        let data = await SiteAPI.apiPostCall(`/apiData/eKYC_REGISTRATION`, params, token);
        if (data.error) {
            if(data.message) Alert.alert(data.message)
            dispatch({ type: types.FETCH_POST_REQUEST_FAILURE, error: data.message });
        } else {
            dispatch({ type: types.FETCH_POST_REQUEST_SUCCESS, kycDetails: data.Data[0].eKyclink });
        }
    },
};

const initialState = {
    isFetching: false,
    error: null,
    kycLists: [],
    kycDetails: null,
};

export const reducer = (state = initialState, action) => {
    const { type, error, kycLists, kycDetails } = action;
    switch (type) {
        case types.FETCH_GETLIST_PENDING:
        case types.FETCH_POST_REQUEST_PENDING: {
            return {
                ...state,
                isFetching: true,
                kycDetails: null,
                error: null,
            };
        }
        case types.FETCH_GETLIST_FAILURE:
        case types.FETCH_POST_REQUEST_FAILURE: {
            return {
                ...state,
                isFetching: false,
                error,
            };
        }
        case types.FETCH_GETLIST_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                error: null,
                kycLists
            };
        }
        case types.FETCH_POST_REQUEST_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                error: null,
                kycDetails
            };
        }
        default:
            return state;
    }
};
