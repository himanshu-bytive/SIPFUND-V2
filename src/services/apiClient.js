/** @format */

import { Alert, NativeModules } from "react-native";
const axios = require("axios");
class ApiClient {
  baseUrl;

  constructor(options) {
    this.baseUrl = options.baseUrl;
  }
  post(endpoint, params, headers = null) {
    return this.requestHttp("post", this.baseUrl + endpoint, params, headers);
  }

  get(endpoint, params, headers = null) {
    return this.requestHttp("GET", this.baseUrl + endpoint, null, headers);
  }

  put(endpoint, params, headers = null) {
    return this.requestHttp("PUT", this.baseUrl + endpoint, params, headers);
  }

  patch(endpoint, params, headers = null) {
    return this.requestHttp("PATCH", this.baseUrl + endpoint, params, headers);
  }

  delete(endpoint, params, headers = null) {
    return this.requestHttp("DELETE", this.baseUrl + endpoint, params, headers);
  }

  requestHttp(method, url, params, headers) {
    return new Promise((resolve, reject) => {
      const options = {
        method,
        url: url,
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (params) {
        options.data = JSON.stringify(params);
      }
      if (headers && headers.token) {
        options.headers.Authorization = `${headers.token}`;
      }
      axios(options)
        .then((response) => {
          if (url == "/bank/custbanklist")
            console.log("🚀 ~ ApiClient ~ .then ~ response:", response);
          resolve({ statusCode: response.status, body: response.data });
        })
        .catch((error) => {
          if (error.response) {
            // Request made and server responded
            if (error.response.data === "Unauthorized") {
              alert("Session Expired!!");
              NativeModules.DevSettings.reload();
            }
            let message = "";
            let status = null;
            if (
              error?.response?.data?.Data &&
              Array.isArray(error?.response?.data?.Data)
            ) {
              message = error.response.data.Data[0].return_msg;
            } else if (error?.response?.data?.Data) {
              message = error.response.data.Data.return_msg
                ? error.response.data.Data.return_msg
                : error.response.data.Data.Status_Desc;
              status = error.response.data.Data.Status
                ? error.response.data.Data.Status
                : 400;
            } else if (error.response?.data?.responseString) {
              message = error.response?.data?.responseString;
            } else if (error.response?.data?.message) {
              message = error.response?.data?.message;
            }
            if (error.response?.data?.error) {
              message = error.response?.data?.error_description;
            }
            reject({ error: true, message, status });
          } else if (error.request) {
            reject({
              error: true,
              message: "Network error please check your internet connection.",
            });
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("ccc", error.message);
            reject({ error: true, message: error.message });
          }
        });
    });
  }
}

export default ApiClient;
