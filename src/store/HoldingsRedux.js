import SiteAPI from '../services/SiteApis'

const types = {

    FETCH_MAMATA_PENDING: "FETCH_MAMATA_PENDING",
     FETCH_MAMATA_FAILURE: "FETCH_MAMATA_FAILURE",
    FETCH_MAMATA_SUCCESS: "FETCH_MAMATA_SUCCESS",
   
};


export const HoldingsActions = {
   
};

const initialState = {
    isFetching: false,
    error: null,
    pan: null,
};


export const reducer = (state = initialState, action) => {
    const { type, error, pan } = action;
    switch (type) {
        case types.FETCH_MAMATA_PENDING: {
            return {
                ...state,
                isFetching: true,
                error: null,
            };
        }
        case types.FETCH_MAMATA_FAILURE: {
            return {
                ...state,
                isFetching: false,
                error,
            };
        }
        case types.FETCH_MAMATA_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                error: null,
                pan,
            };
        }
        default:
            return state;
    }
};