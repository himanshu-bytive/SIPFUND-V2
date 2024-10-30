import SiteAPI from '../services/SiteApis'
import { Alert } from 'react-native';
const types = {
    FETCH_MAIN_CATEGORY_PENDING: "FETCH_MAIN_CATEGORY_PENDING",
    FETCH_MAIN_CATEGORY_SUCCESS: "FETCH_MAIN_CATEGORY_SUCCESS",
    FETCH_MAIN_CATEGORY_FAILURE: "FETCH_MAIN_CATEGORY_FAILURE",

    FETCH_SUB_CATAGORY_PENDING: "FETCH_SUB_CATAGORY_PENDING",
    FETCH_SUB_CATAGORY_SUCCESS: "FETCH_SUB_CATAGORY_SUCCESS",
    FETCH_SUB_CATAGORY_FAILURE: "FETCH_SUB_CATAGORY_FAILURE",

    FETCH_FETCH_SCHEME_PENDING: "FETCH_FETCH_SCHEME_PENDING",
    FETCH_FETCH_SCHEME_SUCCESS: "FETCH_FETCH_SCHEME_SUCCESS",
    FETCH_FETCH_SCHEME_FAILURE: "FETCH_FETCH_SCHEME_FAILURE",

    FETCH_SCHEME_GO_PENDING: "FETCH_SCHEME_GO_PENDING",
    FETCH_SCHEME_GO_SUCCESS: "FETCH_SCHEME_GO_SUCCESS",
    FETCH_SCHEME_GO_FAILURE: "FETCH_SCHEME_GO_FAILURE",

};

export const OwnerChoiceActions = {
    mainCategory: async (dispatch, token) => {
        dispatch({ type: types.FETCH_MAIN_CATEGORY_PENDING });
        let data = await SiteAPI.apiGetCall('/product/schemecategory', {}, token);
        if (data.error) {
            if(data.message) Alert.alert(data.message)
            dispatch({ type: types.FETCH_MAIN_CATEGORY_FAILURE, error: data.message });
        } else {
            dispatch({ type: types.FETCH_MAIN_CATEGORY_SUCCESS, mainCat: data.responseString });
        }
    },
    subCatagorys: async (dispatch, params, token) => {
        dispatch({ type: types.FETCH_SUB_CATAGORY_PENDING });
        let data = await SiteAPI.apiGetCall(`/product/schemesubcategory/${params.catagory}`, {}, token);
        if (data.error) {
            if(data.message) Alert.alert(data.message)
            dispatch({ type: types.FETCH_SUB_CATAGORY_FAILURE, error: data.message });
        } else {
            dispatch({ type: types.FETCH_SUB_CATAGORY_SUCCESS, subCat: data.responseString });
        }
    },
    fetchScheme: async (dispatch, params, token) => {
        dispatch({ type: types.FETCH_FETCH_SCHEME_PENDING });
        let data = await SiteAPI.apiGetCall(`/product/productbycategory/${params.subcatagory}`, {}, token);
        if (data.error) {
            if(data.message) Alert.alert(data.message)
            dispatch({ type: types.FETCH_FETCH_SCHEME_FAILURE, error: data.message });
        } else {
            dispatch({ type: types.FETCH_FETCH_SCHEME_SUCCESS, schemeCat: data.responseString });
        }
    },
    schemeGo: async (dispatch, params, token) => {
        dispatch({ type: types.FETCH_SCHEME_GO_PENDING });
        let data = await SiteAPI.apiPostCall('/morningStarApi/data', params, token);
        if (data.error) {
            if(data.message) Alert.alert(data.message)
            dispatch({ type: types.FETCH_SCHEME_GO_FAILURE, error: data.message });
        } else {
            dispatch({ type: types.FETCH_SCHEME_GO_SUCCESS, choices: data.responseString });
        }
    },
};

const initialState = {
    isFetching: false,
    error: null,
    mainCat: [],
    subCat: [],
    schemeCat: [],
    choices: [],
};

export const reducer = (state = initialState, action) => {
    const { type, error, mainCat, subCat, schemeCat, choices } = action;
    switch (type) {

        case types.FETCH_MAIN_CATEGORY_PENDING:
        case types.FETCH_SUB_CATAGORY_PENDING:
        case types.FETCH_SCHEME_GO_PENDING:
        case types.FETCH_FETCH_SCHEME_PENDING: {
            return {
                ...state,
                isFetching: true,
                error: null,
            };
        }

        case types.FETCH_MAIN_CATEGORY_FAILURE:
        case types.FETCH_SUB_CATAGORY_FAILURE:
        case types.FETCH_SCHEME_GO_FAILURE:
        case types.FETCH_FETCH_SCHEME_FAILURE: {
            return {
                ...state,
                isFetching: false,
                error,
            };
        }

        case types.FETCH_SCHEME_GO_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                error: null,
                choices
            };
        }

        case types.FETCH_FETCH_SCHEME_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                error: null,
                schemeCat
            };
        }
        case types.FETCH_SUB_CATAGORY_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                error: null,
                subCat
            };
        }
        case types.FETCH_MAIN_CATEGORY_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                error: null,
                mainCat
            };
        }
        default:
            return state;
    }
};
