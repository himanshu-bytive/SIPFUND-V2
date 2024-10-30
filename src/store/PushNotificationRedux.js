import SiteAPI from '../services/SiteApis'
import { Alert } from 'react-native';
const types = {
    SET_TOKEN: "SET_TOKEN",

};
export const PushNotificationActions = {
    setToken(token) {
        return { type: types.SET_TOKEN, token };
    },

};

const initialState = {
    isFetching: false,
    error: null,
    token: null,
    notification: [],
};

export const reducer = (state = initialState, action) => {
    const { type, error, token } = action;
    switch (type) {
        case types.SET_TOKEN: {
            return {
                ...state,
                isFetching: false,
                error: null,
                token,
            };
        }
        default:
            return state;
    }
};
