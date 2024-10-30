/** @format */

import SiteAPI from "../services/SiteApis";
const types = {
  FETCH_FUND_DETAILS: "FETCH_FUND_DETAILS",

  FETCH_CHART_PENDING: "FETCH_CHART_PENDING",
  FETCH_CHART_SUCCESS: "FETCH_CHART_SUCCESS",
  FETCH_CHART_FAILURE: "FETCH_CHART_FAILURE",

  FETCH_FUND_DETAILS_PENDING: "FETCH_FUND_DETAILS_PENDING",
  FETCH_FUND_DETAILS_SUCCESS: "FETCH_FUND_DETAILS_SUCCESS",
  FETCH_FUND_DETAILS_FAILURE: "FETCH_FUND_DETAILS_FAILURE",
};

export const FundDetailActions = {
  fundDetails: async (dispatch, details) => {
    dispatch({ type: types.FETCH_FUND_DETAILS, details });
  },
  fundChartList: async (dispatch, params, token) => {
    dispatch({ type: types.FETCH_CHART_PENDING });
    let data = await SiteAPI.apiGetCall(
      `/proxy/morningstar/service/mf/Price/isin/${params.ISIN}/accesscode/startdate=${params.from}&enddate=${params.to}`,
      params,
      token
    );
    // console.log(
    //   "🚀 ~ file: FundDetailRedux.js:27 ~ fundChartList: ~ data:",
    //   JSON.stringify(data, null, 2)
    // );
    if (data.error) {
      dispatch({ type: types.FETCH_CHART_FAILURE, error: data.message });
    } else {
      dispatch({
        type: types.FETCH_CHART_SUCCESS,
        detailsMap: data.data.Prices,
      });
    }
  },
  fundDetailsList: async (dispatch, params, token) => {
    dispatch({ type: types.FETCH_FUND_DETAILS_PENDING });
    let data = await SiteAPI.apiGetCall(
      `/proxy/morningstar/v2/service/mf/r5soaer67qpg88tr/isin/${params.ISIN}/accesscode/`,
      params,
      token
    );
    if (data.error) {
      dispatch({ type: types.FETCH_FUND_DETAILS_FAILURE, error: data.message });
    } else {
      dispatch({
        type: types.FETCH_FUND_DETAILS_SUCCESS,
        detailsInfo: data.data,
      });
    }
  },
};

const initialState = {
  isFetching: false,
  error: null,
  details: {},
  detailsMap: null,
  detailsInfo: null,
};

export const reducer = (state = initialState, action) => {
  const { type, error, details, detailsMap, detailsInfo } = action;
  switch (type) {
    case types.FETCH_CHART_PENDING:
    case types.FETCH_FUND_DETAILS_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case types.FETCH_CHART_FAILURE:
    case types.FETCH_FUND_DETAILS_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error,
      };
    }

    case types.FETCH_FUND_DETAILS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        details,
      };
    }
    case types.FETCH_CHART_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        detailsMap,
      };
    }
    case types.FETCH_FUND_DETAILS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        detailsInfo,
      };
    }

    default:
      return state;
  }
};
