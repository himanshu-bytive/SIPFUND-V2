import SiteAPI from "../services/SiteApis";
import { Alert } from "react-native";

const types = {
  FETCH_PORTFOLIO_DETAIL_PENDING: "FETCH_PORTFOLIO_DETAIL_PENDING",
  FETCH_PORTFOLIO_DETAIL_FAILURE: "FETCH_PORTFOLIO_DETAIL_FAILURE",
  FETCH_PORTFOLIO_DETAIL_SUCCESS: "FETCH_PORTFOLIO_DETAIL_SUCCESS",
};

export const PortfolioRedux = {
  getPortfolioDetail: async (dispatch, params, token) => {
    dispatch({ type: types.FETCH_PORTFOLIO_DETAIL_PENDING });

    try {
      let data = await SiteAPI.apiPostCall(`/portfolio`, params, token);
      if (data.error) {
        dispatch({
          type: types.FETCH_PORTFOLIO_DETAIL_FAILURE,
          error: data,
        });
      } else {
        dispatch({
          type: types.FETCH_PORTFOLIO_DETAIL_SUCCESS,
          portfolioList: data,
        });
      }
    } catch (err) {
      dispatch({
        type: types.FETCH_SIP_DETAIL_FAILURE,
        error: "An error occurred while fetching SIP details.",
      });
    }
  },
};

const initialState = {
    portfolioList: {},
    isFetching: false,
    error: null,
};

export const portfolioReducer = (state = initialState, action) => {
  const { type, error, portfolioList } = action;

  switch (type) {
    case types.FETCH_PORTFOLIO_DETAIL_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }

    case types.FETCH_PORTFOLIO_DETAIL_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error,
      };
    }

    case types.FETCH_PORTFOLIO_DETAIL_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        portfolioList,
      };
    }

    default:
      return state;
  }
};
