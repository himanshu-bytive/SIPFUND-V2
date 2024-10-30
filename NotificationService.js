/** @format */

import messaging from "@react-native-firebase/messaging";
// import notifee from "@notifee/react-native";
export default class NotificationService {
  constructor(onRegister) {
    messaging().onTokenRefresh((fcmToken) => {
      onRegister(fcmToken);
    });

    messaging()
      .hasPermission()
      .then(async (enabled) => {
        if (!enabled) {
          await messaging().requestPermission();
        }
      });

    // App Closed
    messaging()
      .getInitialNotification()
      .then((notificationOpen) => {
        if (notificationOpen && notificationOpen.notification) {
          const { data } = notificationOpen.notification;
          //   onNotificationOpen({ ...data, ...{ foreground: false } });
        }
      });

    messaging().onNotificationOpenedApp((notificationOpen) => {
      if (notificationOpen && notificationOpen.notification) {
        const { data } = notificationOpen.notification;
        // onNotificationOpen({ ...data, ...{ foreground: true } });
      }
    });

    messaging().onMessage(async (remoteMessage) => {
      console.log("remoteMessage=>", remoteMessage);
      //   await notifee.createChannel({
      //     id: "NewMaxLearn",
      //     name: "NewMaxLearn",
      //   });
      //   await notifee.displayNotification({
      //     title: remoteMessage?.notification?.title || "No Title",
      //     body:
      //       remoteMessage?.notification?.body ||
      //       "Main body content of the notification",
      //     android: {
      //       channelId: "NewMaxLearn",
      //       pressAction: {
      //         id: "default",
      //       },
      //     },
      //   });
    });

    messaging()
      .getToken()
      .then((fcmToken) => {
        onRegister(fcmToken);
      });
  }
}
