import React, { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";
import PushNotification from "react-native-push-notification";
import DeviceInfo from 'react-native-device-info';
import { connect } from "react-redux";

// Configure Push Notification
PushNotification.configure({
  onNotification: function (notification) {
    console.log("Notification:", notification);
    // Handle notification (e.g., update state)
  },
  requestPermissions: Platform.OS === 'ios', // Request permissions for iOS
});

function PushNotificationComponent() {
  const [pushToken, setPushToken] = useState("");
  const [notification, setNotification] = useState(null);
  const notificationListener = useRef();

  useEffect(() => {
    // Get unique device ID
    const deviceId = DeviceInfo.getUniqueId();
    console.log(`Device ID: ${deviceId}`);

    // Register for push notifications
    PushNotification.onRegister((token) => {
      console.log("Push Notification Token:", token);
      setPushToken(token.token); // Store the token
    });

    // Listen for notifications
    notificationListener.current = PushNotification.onNotification((notification) => {
      console.log("Received Notification:", notification);
      setNotification(notification);
    });

    return () => {
      // Cleanup listeners if necessary
      PushNotification.clearAllNotifications();
    };
  }, []);

  const schedulePushNotification = () => {
    PushNotification.localNotification({
      title: "You've got mail! 📬",
      message: "Here is the notification body",
      playSound: true,
      soundName: 'default',
      actions: '["Yes", "No"]', // iOS only
      // You can add more configuration options here
    });
  };

  return (
    <View>
      <Text>Your Push Token: {pushToken}</Text>
      <Button title="Schedule Notification" onPress={schedulePushNotification} />
      {notification && <Text>Notification Received: {notification.message}</Text>}
    </View>
  );
}

const mapStateToProps = (state) => ({
  token: state.notification.token,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { HomeActions } = require("../../store/HomeRedux");
  return {
    ...stateProps,
    ...ownProps,
    resetData: () => dispatch(HomeActions.resetData()),
  };
};

export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(PushNotificationComponent);
