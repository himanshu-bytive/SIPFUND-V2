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
  TextInput,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import { Styles, Config, Colors, FormValidate } from "../../common";

import { Ionicons, AntDesign, Entypo } from "react-native-vector-icons";
import { Image, Header, CheckBox } from "react-native-elements";

function FaqScreen(props) {
  const { users } = props;
  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => props.navigation.toggleDrawer()}
            style={{ marginTop: 20 }}
          >
            <Entypo name={"menu"} size={30} color={Colors.RED} />
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
        rightComponent={
          <View style={Styles.headerkn}>
            <Text style={Styles.textkn}>
              {users?.name
                ? `${users?.name[0]}${users?.name.split(" ").pop()[0]}`
                : ""}
            </Text>
          </View>
        }
      />
      <View style={styles.mainbox}>
        <View>
          <Text style={styles.faqs}>FAQ’s</Text>
        </View>
        <View style={styles.imgbox}>
          <Image
            source={require("../../../assets/FAQimg.png")}
            style={styles.FAQimg}
          />
        </View>
        <View style={styles.singletext}>
          <Entypo name="dot-single" size={40} color="#FFCE00" />
          <Text style={styles.Mutualfund}>What is a Mutual Fund?</Text>
        </View>
        <View style={styles.singletext}>
          <Entypo name="dot-single" size={40} color="#FFCE00" />
          <Text style={styles.Mutualfund}>What is Open Ended Fund?</Text>
        </View>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("Explore")}
          style={styles.botton_box}
        >
          <Text style={styles.get_otp}>MORE FAQ’s</Text>
        </TouchableOpacity>
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
    height: 205,
    width: 243,
    marginVertical: 30,
  },
  faqs: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#716D6E",
  },
  singletext: {
    flexDirection: "row",
    marginTop: 10,
  },
  Mutualfund: {
    fontSize: 20,
    marginTop: 9,
    color: Colors.GREY_1,
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
    color: Colors.WHITE,
    fontSize: 20,
    fontWeight: "bold",
  },
});
const mapStateToProps = (state) => ({
  token: state.auth.token,
  users: state.auth.user,
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
)(FaqScreen);
