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
  // useEffect(() => {
  // }, []);
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

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  useEffect(() => {
    getNotifications(token);
  }, []);

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
    //
  };

  return (
    <View style={styles.container}>
      {/* header  */}
      <StatusBar
        animated={true}
        backgroundColor="pink"
        barStyle="light-content"
      />
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{ marginTop: 5 }}
          >
            <AntDesign name={"arrowleft"} size={20} color={Colors.WHITE} />
          </TouchableOpacity>
        }
        // backgroundColor={Colors.PEACH}
        backgroundColor={Colors.RED}
        height={100}
        centerComponent={
          <Text
            style={{ color: Colors.WHITE, fontSize: 20, fontWeight: "800" }}
          >
            Notifications
          </Text>
          //   <Image
          //     source={require("../../../assets/icon.png")}
          //     style={styles.logimg}
          //   />
        }
        // rightComponent={
        //   <Cart
        //     nav={() => {
        //       props.navigation.navigate("TopRatedList");
        //     }}
        //   />
        // }
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
              {
                backgroundColor: item?.notification?.isRead
                  ? "white"
                  : "#FFF2EF",
              },
            ]}
            onPress={() => {
              // alert("ddd");
              props.navigation.navigate("OtherStackYou",{screen : "NotificationView",params:{ item}});
            }}
          >
            <View style={styles.rowItems}>
              <View style={styles.contentRight}>
                <View style={styles.rowItems}>
                  {item?.notificationtemplate?.image ? (
                    <Image
                      source={{ uri: item?.notificationtemplate?.image }}
                      style={{
                        height: 50,
                        width: 50,
                        // backgroundColor: "gray",
                        borderWidth: 0.5,
                        borderRadius: 25,
                        marginRight: 5,
                      }}
                    />
                  ) : (
                    <>
                      <View
                        style={{
                          height: 50,
                          width: 50,
                          backgroundColor: "gray",
                          borderRadius: 25,
                          marginRight: 5,
                        }}
                      ></View>
                    </>
                  )}
                  <View>
                    <Text style={styles.heading}>
                      {item?.notificationtemplate?.name}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{ width: Dimensions.get("window").width / 1.5,color:"black" }}
                    >
                      {item?.notificationtemplate?.message}
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.contentLeft}
                activeOpacity={0.5}
                onPress={() => {
                  deleteConfirm(item?.notification?.id);
                }}
              >
                <Image
                  source={require("../../../assets/Frame.png")}
                  style={styles.imageStyle}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
        {/* <View style={styles.contain}>
          <View style={styles.sipfund_sec}>
            <Text style={styles.nametext}>VISHNU DARIRA</Text>
            <Text style={styles.nametext}>
              09-Jul-2021{"\n"}Dear Customer,{"\n"}Your transactions for{"\n"}1.
              SBI Magnum Low Duration Fund Regular Growth Amount in ₹ 1002.51,
              Units-0.361, Nav Date-2021-07-06,{"\n"}has been uploaded.{"\n"}
              Please open your app for more info.{"\n"}SIPfund.com Type-RED{" "}
            </Text>
          </View>
        </View>

        <View style={styles.Transaction}>
          <Text style={styles.Transaction_text}>
            Transaction Alert{"\n"}for your Mutual{"\n"}Fund Investment
          </Text>
          <Image
            source={require("../../../assets/icon.png")}
            style={styles.bottomlogimg}
          />
        </View> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logimg: {
    height: 65,
    width: 203,
    marginTop: 10,
  },
  contain: { marginHorizontal: 10 },
  sipfund_sec: {
    backgroundColor: Colors.GRAY_LIGHT_5,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  nametext: { color: Colors.WHITE },
  Transaction: {
    backgroundColor: Colors.LIGHT_WHITE,
    alignItems: "center",
    marginHorizontal: 10,
    paddingBottom: 10,
  },
  Transaction_text: {
    fontSize: 18,
    color: Colors.BLACK,
    paddingVertical: 10,
  },
  bottomlogimg: {
    height: 67,
    width: 212,
  },
  rowItems: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
  },
  contentRight: {
    width: "80%",
    height: 70,
    padding: 10,
  },
  contentLeft: {
    width: "20%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: { height: 20, width: 20 },
  heading: { fontSize: 16, fontWeight: "bold",color:"black" },
  notificationContainer: {
    height: 70,
    width: "100%",
    backgroundColor: "#FFF2EF",
    borderBottomWidth: 0.2,
  },
});
const mapStateToProps = (state) => ({
  token: state.auth.token,
  users: state.auth.users,
  isFetching: state.sideMenu.isFetching,
  delLoading: state.sideMenu.delLoading,
  notificationData: state.sideMenu.notificationData,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { AuthActions } = require("../../store/AuthRedux");
  const { SideMenuActions } = require("../../store/SideMenuRedux");
  return {
    ...stateProps,
    ...ownProps,
    logOut: () => {
      AuthActions.logOut(dispatch);
    },
    getNotifications: (token) => {
      SideMenuActions.getNotifications(dispatch, token);
    },
    readNotifications: (params, token) => {
      SideMenuActions.readNotifications(dispatch, params, token);
    },
    deleteNotifications: (params, token) => {
      SideMenuActions.deleteNotifications(dispatch, params, token);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(NotificationScreen);
