/** @format */

import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  Button,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  Linking,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import { Styles, Config, Colors, FormValidate } from "../../common";
import DeviceInfo from "react-native-device-info";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import { Image, Header, CheckBox, colors } from "react-native-elements";

function AboutUsScreen(props) {
  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Home")}
            style={{ marginTop: 20 }}
          >
            <AntDesign name={"arrowleft"} size={30} color={Colors.RED} />
          </TouchableOpacity>
        }
        containerStyle={styles.header}
        backgroundColor={Colors.LIGHT_WHITE}
        centerComponent={
          <Image
            source={require("../../../assets/icon.png")}
            style={styles.logimg}
          />
        }
      />
      <View style={styles.mainbox}>
        <View>
          <Text style={styles.faqs}>
            Welcome to SIPfund.com a platform for investment in mutual funds –
            Systematic Investment Plan and Lump sum.
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://sipfund.com/AboutSIPFund.html")
          }
        >
          <Text
            style={[
              styles.faqs,
              { marginTop: 20, fontWeight: "bold", color: Colors.RED },
            ]}
          >
            For more info click here
          </Text>
        </TouchableOpacity>

        <View style={styles.imgbox}>
          <Image
            source={require("../../../assets/iconLogo.png")}
            style={styles.FAQimg}
          />
        </View>
        <View style={styles.singletext}>
          <Text style={[styles.Mutualfund, { fontWeight: "bold" }]}>
            SIP Fund
          </Text>
        </View>
        <View style={styles.singletext}>
          <Text style={styles.Mutualfund}>
            Version {DeviceInfo?.getVersion()}
          </Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <Text style={styles.get_otp}>
            Copyrights © 2024 All Rights Reserved by SIP Fund.{" "}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomColor: Colors.BLACK,
    borderBottomWidth: 1,
  },
  mainbox: {
    padding: 40,
    alignItems: "center",
  },
  logimg: {
    height: 65,
    width: 203,
    marginTop: 10,
  },
  imgbox: {
    alignItems: "center",
    marginBottom: 20,
  },
  FAQimg: {
    height: 200,
    width: 200,
    marginVertical: 30,
  },
  faqs: {
    fontSize: 15,
    color: "#716D6E",
    textAlign: "center",
  },
  singletext: {
    flexDirection: "row",
    marginTop: 10,
  },
  Mutualfund: {
    fontSize: 20,
    marginTop: 9,
    color: Colors.BLACK,
  },
  botton_box: {
    alignItems: "center",
    backgroundColor: Colors.RED,
    paddingHorizontal: 70,
    paddingVertical: 20,
    marginTop: 20,
    borderRadius: 10,
  },
  get_otp: {
    color: Colors.BLACK,
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
});
const mapStateToProps = (state) => ({
  token: state.auth.token,
  users: state.auth.users,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { AuthActions } = require("../../store/AuthRedux");
  return {
    ...stateProps,
    ...ownProps,
    logOut: () => {
      AuthActions.logOut(dispatch);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(AboutUsScreen);
