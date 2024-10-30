/** @format */

import SiteAPI from "../services/SiteApis";
import { Alert, Linking } from "react-native";
import RNFS from "react-native-fs";
import axios from "axios";
import RNFetchBlob from "rn-fetch-blob";
import Toast from "react-native-simple-toast";

const types = {
  FETCH_REPORT_SUMMARY_PENDING: "FETCH_REPORT_SUMMARY_PENDING",
  FETCH_REPORT_SUMMARY_SUCCESS: "FETCH_REPORT_SUMMARY_SUCCESS",
  FETCH_REPORT_SUMMARY_FAILURE: "FETCH_REPORT_SUMMARY_FAILURE",
};

export const ReportsActions = {
  downloadReport: async (dispatch, params, token) => {
    dispatch({ type: types.FETCH_REPORT_SUMMARY_PENDING });
    Toast.show("Downloading...", Toast.LONG);
    let data = await SiteAPI.apiGetCall(`/reports/${params}`, {}, token);
    if (data.error) {
      if (data.message) Alert.alert(data.message);
      dispatch({
        type: types.FETCH_REPORT_SUMMARY_FAILURE,
        error: data.message,
        urls: null,
      });
    } else {
      if (!data?.status && data?.message) {
        Alert.alert(data?.message);
      }
      dispatch({ type: types.FETCH_REPORT_SUMMARY_SUCCESS, urls: data });

      if (data.path) {
        let fileName = data.path.includes("capital-gain/")
          ? data.path.split("capital-gain/").pop()
          : data.path.split("reports/live-portfolio/").pop();
        const downloadDest = `${RNFS.DownloadDirectoryPath}/${fileName}`;
        
        const options = {
          fromUrl: data.path,
          toFile: downloadDest,
          headers: {
            // some headers if needed
          },
        };

        RNFS.downloadFile(options)
          .promise.then(() => {
            Toast.show("File downloaded", Toast.LONG);
            // Optionally open the file
            // Linking.openURL(downloadDest);
          })
          .catch(error => {
            Alert.alert("Download failed", error.message);
          });
      }
    }
  },
  downloadReportWithParams: async (dispatch, link, params, token) => {
    dispatch({ type: types.FETCH_REPORT_SUMMARY_PENDING });
    let data = await SiteAPI.apiGetCall(`/reports/${link}`, params, token);
    if (data.error) {
      if (data.message) Alert.alert(data.message);
      dispatch({
        type: types.FETCH_REPORT_SUMMARY_FAILURE,
        error: data.message,
        urls: null,
      });
      console.log(data);
    } else {
      console.log(data);
    }
  },
};

const initialState = {
  isFetching: false,
  error: null,
  urls: null,
};

export const reducer = (state = initialState, action) => {
  const { type, error, urls } = action;
  switch (type) {
    case types.FETCH_REPORT_SUMMARY_PENDING: {
      return {
        ...state,
        error: null,
      };
    }
    case types.FETCH_REPORT_SUMMARY_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error,
        urls,
      };
    }
    case types.FETCH_REPORT_SUMMARY_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        urls,
      };
    }
    default:
      return state;
  }
};
