/** @format */

import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  Button,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { connect } from "react-redux";
import { Styles, Config, Colors, FormValidate } from "../../common";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { Image, Header, ListItem, Overlay } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Cart from "../../components/Cart";

function NotificationScreen(props) {
  const {
    isFetching,
    getNotifications,
    readNotifications,
    token,
    notificationData,
    deleteNotifications,
    delLoading,
  } = props;
  
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setShowLoader(true); // Show loader immediately on mount
    const hideTimer = setTimeout(() => {
      setShowLoader(false); // Hide loader after 5 seconds
    }, 5000); // 5 seconds for hiding the loader
  
    // Cleanup for the hide timer
    return () => clearTimeout(hideTimer);
  }, []); // Only runs on mount

  useEffect(() => {
    const unsubscribe = props?.navigation.addListener("didFocus", () => {
      getNotifications(token);
    });

    return unsubscribe;
  }, []); // Add listener when the screen is focused.

  useEffect(() => {
    getNotifications(token); // Get notifications when the component mounts
  }, []); // Empty dependency ensures this runs only on mount

  const deleteConfirm = (id) => {
    Alert.alert("SIP Fund", "Do you want to delete this notification", [
      {
        text: "Cancel",
        onPress: () => {},
      },
      {
        text: "Yes",
        onPress: () => {
          deleteNotifications(id, token);
        },
      },
    ]);
  };

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
            Notifications
          </Text>
        }
      />

      {showLoader && (
        <View
          style={{
            backgroundColor: "#fffe",
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            position: "absolute",
            zIndex: 100,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size={60} color="black" />
        </View>
      )}

      <ScrollView>
        {notificationData?.map((item, index) => (
          <TouchableOpacity
            style={[
              styles.notificationContainer,
              { backgroundColor: item?.notification?.isRead ? "white" : "#FFF2EF" },
            ]}
            onPress={() => {
              console.log("ITEM", item);
              props.navigation.navigate("NotificationView", {
                notificationtemplate: item.notificationtemplate,
                notification: item.notification
              });
            }}
          >
            <View style={styles.rowItems}>
              <View style={styles.contentRight}>
                <View style={styles.rowItems}>
                  {item?.notificationtemplate?.image ? (
                    <Image
                      source={{ uri: item?.notificationtemplate?.image }}
                      style={{ height: 50, width: 50, borderRadius: 25, marginRight: 5 }}
                    />
                  ) : (
                    <View style={{ height: 50, width: 50, backgroundColor: "gray", borderRadius: 25, marginRight: 5 }}></View>
                  )}
                  <View>
                    <Text style={styles.heading}>{item?.notificationtemplate?.name}</Text>
                    <Text numberOfLines={1} style={{ width: Dimensions.get("window").width / 1.5, color: "black" }}>
                      {item?.notificationtemplate?.message}
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.contentLeft}
                activeOpacity={0.5}
                onPress={() => deleteConfirm(item?.notification?.id)}
              >
                <Image source={require("../../../assets/Frame.png")} style={styles.imageStyle} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  rowItems: { flexDirection: "row", alignItems: "center" },
  contentRight: { width: "80%", height: 70, padding: 10 },
  contentLeft: { width: "20%", height: 70, justifyContent: "center", alignItems: "center" },
  heading: { fontSize: 16, fontWeight: "bold", color: "black" },
  notificationContainer: { height: 70, width: "100%", backgroundColor: "#FFF2EF", borderBottomWidth: 0.2 },
  imageStyle: { height: 20, width: 20 },
});

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isFetching: state.sideMenu.isFetching,
  notificationData: state.sideMenu.notificationData,
});

const mapDispatchToProps = (dispatch) => {
  const { SideMenuActions } = require("../../store/SideMenuRedux");
  return {
    getNotifications: (token) => SideMenuActions.getNotifications(dispatch, token),
    deleteNotifications: (params, token) => SideMenuActions.deleteNotifications(dispatch, params, token),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);
