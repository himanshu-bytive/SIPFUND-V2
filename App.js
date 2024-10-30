/** @format */

import React, { useState, useEffect, useRef, Linking } from "react";
import AppContainer from "./src/navigation/AppNavigator";
import { SafeAreaView, Platform, LogBox, StatusBar } from "react-native";
import { Provider } from "react-redux";
import {thunk} from 'redux-thunk'
import reducers from "./src/store";
import { createStore, compose, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/es/integration/react";
// import * as Notifications from "expo-notifications";
import appsFlyer from "react-native-appsflyer";

let store = null;
const middleware = [thunk];
store = compose(applyMiddleware(...middleware))(createStore)(reducers);
let persistor = persistStore(store);

export default function App() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [updateMsg, setUpdateMsg] = useState("");
  LogBox.ignoreLogs(["Warning: ..."]);
  LogBox.ignoreAllLogs();
  useEffect(() => {
    // requestNotifications(["alert", "sound"]).then(({ status, settings }) => {});
    // new NotificationService(onRegister);
  }, []);

  useEffect(() => {
    // const unsubscribe = firebase
    //   .messaging()
    //   .onMessage(async (remoteMessage) => {});
    // firebase
    //   .messaging()
    //   .subscribeToTopic("63aab25cb5b99563a2d45819")
    //   .then(() => {});
    // return () => unsubscribe;
  }, []);
  const onRegister = (token) => {
    if (token) {
      setExpoPushToken(token);
    } else {
      setExpoPushToken("-");
    }
  };

  appsFlyer.initSdk(
    {
      devKey: "kGByPQmZsG9qUkwxJ2dRa8",
      isDebug: false,
      onInstallConversionDataListener: true, //Optional
      onDeepLinkListener: true, //Optional
    },
    (result) => {
      console.log(result);
    },
    (error) => {
      console.error(error);
    }
  );

  // Notifications.setNotificationHandler({
  //   handleNotification: async () => ({
  //     shouldShowAlert: true,
  //     shouldPlaySound: false,
  //     shouldSetBadge: false,
  //   }),
  // });

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  // useEffect(() => {
  //   registerForPushNotificationsAsync().then((token) => {
  //     setExpoPushToken(token);
  //   });
  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener((notification) => {
  //       setNotification(notification);
  //     });

  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       console.log(response);
  //     });

  //   return () => {
  //     Notifications.removeNotificationSubscription(
  //       notificationListener.current
  //     );
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  // async function schedulePushNotification() {
  //   await Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: "You've got mail! 📬",
  //       body: "Here is the notification body",
  //       data: { data: "goes here" },
  //     },
  //     trigger: { seconds: 2 },
  //   });
  // }

  // async function registerForPushNotificationsAsync() {
  //   let token;
  //   if (Constants.isDevice) {
  //     const { status: existingStatus } =
  //       await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== "granted") {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== "granted") {
  //       //alert("Failed to get push token for push notification!");
  //       return;
  //     }
  //     token = (await Notifications.getExpoPushTokenAsync()).data;
  //   } else {
  //     alert("Must use physical device for Push Notifications");
  //   }

  //   if (Platform.OS === "android") {
  //     Notifications.setNotificationChannelAsync("default", {
  //       name: "default",
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: "#FF231F7C",
  //     });
  //   }

  //   return token;
  // }

  useEffect(() => {
    // onLoad();
  }, []);

  const onLoad = async () => {
    if (__DEV__) {
      setUpdateMsg("Loading Assets");
      setAssetsLoaded(true);
    } else {
      try {
        setUpdateMsg("Cecking Updates");
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          setUpdateMsg("Downloading Updates");
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        } else {
          setAssetsLoaded(true);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaView>
          <StatusBar
            animated={true}
            backgroundColor="transparent"
            barStyle="dark-content"
          />
        </SafeAreaView>
        <AppContainer />
      </PersistGate>
    </Provider>
  );
}
