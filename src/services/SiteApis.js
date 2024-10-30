/** @format */

import { Platform, Alert } from "react-native";
import Config from "../common/Config";
import ApiClient from "./apiClient";

const Api = new ApiClient({
  baseUrl: Config.apiBaseUrl,
});

const getMimeType = (ext) => {
  switch (ext) {
    case "pdf":
      return "application/pdf";
    case "jpg":
      return "image/jpeg";
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
  }
};

const SiteApis = {
  apiPostCall: async (api, params, token) => {
    try {
      const response = await Api.post(api, params, { token });
      
      if (response.statusCode === 200) {
        return response.body;
      } else {
        throw response.body;
      }
    } catch (err) {
      return err;
    }
  },
  apiPutCall: async (api, params, token) => {
    try {
      const response = await Api.put(api, params, { token });
      if (response.statusCode === 200) {
        return response.body;
      } else {
        throw response.body;
      }
    } catch (err) {
      return err;
    }
  },
  apiGetCall: async (api, params, token) => {
    if (api == "/bank/custbanklist")
      console.log(
        "🚀 ~ apiGetCall: ~ api, params, token:",
        api + " . " + JSON.stringify(params) + " . " + token
      );
    try {
      const response = await Api.get(api, params, { token });
      console.log(api, params,'api, params');
      // if (api == "/bank/custbanklist")
      if (response.statusCode === 200) {
        return response.body;
      } else {
        throw response.body;
      }
    } catch (err) {
      return err;
    }
  },
  apiDelCall: async (api, params, token) => {
    try {
      const response = await Api.delete(api, params, { token });
      if (response.statusCode === 200) {
        return response.body;
      } else {
        throw response.body;
      }
    } catch (err) {
      return err;
    }
  },
  uploadImgApi(url, file, token) {
    //console.log(file);
    let fileUri;
    if (file.assets) {
      fileUri = file.assets[0].uri;
    } else {
      fileUri = file.uri;
    }
    let filename = fileUri.split("/").pop();
    const extArr = /\.(\w+)$/.exec(filename);
    const type = getMimeType(extArr[1]);
    let formData = new FormData();
    formData.append(
      "document",
      { uri: fileUri, name: filename, type },
      filename
    );
    return fetch(Config.apiBaseUrl + url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
      body: formData,
    })
      .then((response) => response.text())
      .then((result) => {
        return JSON.parse(result);
      })
      .catch((error) => {
        return { error: true, message: error };
      });
  },
};

export default SiteApis;
