import SiteAPI from '../services/SiteApis'
import { Alert } from 'react-native';
const types = {

    LOGOUT: 'LOGOUT',

    FETCH_FE_REDEEM_AMOUNT_PENDING: "FETCH_FE_REDEEM_AMOUNT_PENDING",
    FETCH_FE_REDEEM_AMOUNT_SUCCESS: "FETCH_FE_REDEEM_AMOUNT_SUCCESS",
    FETCH_FE_REDEEM_AMOUNT_FAILURE: "FETCH_FE_REDEEM_AMOUNT_FAILURE",

};

export const RedemptionActions = {
    
    redeemAmount: async (dispatch, params) => {
        dispatch({ type: types.FETCH_FE_REDEEM_AMOUNT_PENDING });
        let auth = await SiteAPI.apiPostCall('/exceptional/REDEEMTRXNEXCEPTION', params);
        if (auth.error) {
            Alert.alert(auth.message)
            dispatch({ type: types.FETCH_FE_REDEEM_AMOUNT_FAILURE, error: auth.message });
        } else {
            Alert.alert(auth.responseString)
            dispatch({ type: types.FETCH_FE_REDEEM_AMOUNT_SUCCESS, phone: params.mobileNo, signUpSteps: auth.signUpSteps, validFlag: auth.validFlag });
        }
    },

    logout() {
        return { type: types.LOGOUT };
    },

};

const initialState = {
    isFetching: false,
    error: null,
    signUpSteps: null,
    validFlag: null,
    phone: null,
    phones: [],
    user: null,
    token: null,
};

export const reducer = (state = initialState, action) => {
    const { type, error, phone, signUpSteps, validFlag, user, token } = action;
    switch (type) {

       
        case types.FETCH_FE_REDEEM_AMOUNT_PENDING: {

            return {
                ...state,
                isFetching: true,
                error: null,
            };
        }

        case types.FETCH_FE_REDEEM_AMOUNT_FAILURE:{
       
            return {
                ...state,
                isFetching: false,
                error,
            };
        }

        case types.FETCH_FE_REDEEM_AMOUNT_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                error: null,
            };
        }

        case types.LOGOUT:
            return Object.assign({}, initialState, { phones: state.phones });
        default:
            return state;
    }
};
