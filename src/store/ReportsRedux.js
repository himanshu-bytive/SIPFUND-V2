/** @format */

import SiteAPI from "../services/SiteApis";
import { Alert, Linking } from "react-native";
import RNFS from "react-native-fs";
import axios from "axios";
import RNFetchBlob from "rn-fetch-blob";
import Toast from "react-native-simple-toast";
import PushNotification from 'react-native-push-notification';

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
  
        // Generate a random number to ensure uniqueness
        const randomSuffix = Math.floor(Math.random() * 1000000); // Random number
        const uniqueFileName = fileName.replace(/(\.[\w\d_-]+)$/i, `-${randomSuffix}$1`); // Append random number before the extension
  
        const downloadDest = `${RNFS.DownloadDirectoryPath}/${uniqueFileName}`;
        
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
  
            // Send a local notification after the file is downloaded
            PushNotification.localNotification({
              channelId: "download-channel",
              title: "Download Complete", // Title of the notification
              message: `The report has been successfully downloaded.`,
              playSound: true,
              soundName: 'default',
              // Add data to pass along with the notification (e.g., file path)
              data: { filePath: downloadDest },
            });
  
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
