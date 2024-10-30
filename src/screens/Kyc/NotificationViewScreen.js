/** @format */

import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  Button,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  StatusBar,
} from "react-native";
import { connect } from "react-redux";
import { Styles, Config, Colors, FormValidate } from "../../common";
import {
  Ionicons,
  AntDesign,
  MaterialIcons,
  Feather,
  Entypo,
  FontAwesome,
  FontAwesome5,
} from "react-native-vector-icons";
import { Image, Header, ListItem, Overlay } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Cart from "../../components/Cart";

const { height, width } = Dimensions.get("window");
function NotificationViewScreen(props) {
  const { notificationtemplate, notification } =
    props?.navigation?.state?.params;
  const {
    isFetching,
    getNotifications,
    readNotifications,
    token,
    notificationData,
  } = props;

  useEffect(() => {
    readNotifications(notification?.id, token);
  }, []);

  return (
    <View style={styles.container}>
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
        backgroundColor={Colors.RED}
        height={100}
        centerComponent={
          <Text
            style={{ color: Colors.WHITE, fontSize: 20, fontWeight: "800" }}
          >
            {notificationtemplate?.name}
          </Text>
        }
      />
      <ScrollView>
        {notificationtemplate?.image?.length > 0 && (
          <View style={{ marginTop: 20 }}>
            <Image
              source={{ uri: notificationtemplate?.image }}
              style={{
                height: width / 1.7,
                width: width,
              }}
              resizeMode={"contain"}
            />
          </View>
        )}
        <View style={{ marginHorizontal: 15, marginVertical: 20 }}>
          <Text style={{ fontSize: 18 }}>{notificationtemplate?.message}</Text>
        </View>
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
  heading: { fontSize: 16, fontWeight: "bold" },
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
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(NotificationViewScreen);

// export default NotificationViewScreen;
