/** @format */

import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Dimensions, StatusBar, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { Image, Header } from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";
import Colors from "../../common/Colors";

const { width } = Dimensions.get("window");

function NotificationViewScreen(props) {
  // Extracting params from route
  const { notificationtemplate, notification } = props.route.params || {}; 
  console.log("NotificationViewScreen Props:", notificationtemplate, notification);
  
  const { readNotifications, token } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure the data is available before proceeding
    if (!notificationtemplate || !notification) {
      console.log("Notification data is not available yet.");
      setLoading(false);  // Stop loading if no data is found
      return;
    }

    // Mark notification as read
    readNotifications(notification.id, token);
    setLoading(false); // Data has been loaded, set loading to false
  }, [notificationtemplate, notification, token]);

  // If the data is loading, show the activity indicator
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.RED} />
      </View>
    );
  }

  // If data is not available, show a fallback message
  if (!notificationtemplate || !notification) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 18, color: "gray", textAlign: "center", marginTop: 20 }}>
          Notification data is missing or invalid.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="pink" barStyle="light-content" />

      <Header
        leftComponent={
          <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ marginTop: 5 }}>
            <AntDesign name={"arrowleft"} size={20} color={Colors.WHITE} />
          </TouchableOpacity>
        }
        backgroundColor={Colors.RED}
        height={100}
        centerComponent={
          <Text style={{ color: Colors.WHITE, fontSize: 20, fontWeight: "800" }}>
            {notificationtemplate?.name || "Notification"}
          </Text>
        }
      />

      <ScrollView>
        {notificationtemplate?.image && (
          <View style={{ marginTop: 20 }}>
            <Image
              source={{ uri: notificationtemplate?.image }}
              style={{ height: width / 1.7, width: width }}
              resizeMode={"contain"}
            />
          </View>
        )}

        <View style={{ marginHorizontal: 15, marginVertical: 20 }}>
          <Text style={{ fontSize: 18,color:"black" }}>{notificationtemplate?.message}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

const mapDispatchToProps = (dispatch) => {
  const { SideMenuActions } = require("../../store/SideMenuRedux");
  return {
    readNotifications: (id, token) => SideMenuActions.readNotifications(dispatch, id, token),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationViewScreen);
