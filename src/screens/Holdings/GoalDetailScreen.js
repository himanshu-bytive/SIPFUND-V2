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

import {
  Ionicons,
  AntDesign,
  FontAwesome,
  FontAwesome5,
} from "react-native-vector-icons";
import { Image, Header, CheckBox } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { HoldingFundType, MyImage } from "../../components";

function GoalDetailScreen(props) {
  const { summaryDetails, users } = props;

  return (
    <View style={styles.container}>
      <View style={Styles.Header_top}>
        <Header
          leftComponent={
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={{ marginTop: 20 }}
            >
              <AntDesign name={"arrowleft"} size={30} color={Colors.RED} />
            </TouchableOpacity>
          }
          backgroundColor={Colors.PEACH}
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
        <View
          style={{
            backgroundColor: "#f7dfd6",
            position: "absolute",
            alignItems: "center",
            zIndex: -1,
            top: 100,
            paddingBottom: 50,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
          }}
        >
          <MyImage
            width="100"
            height="100"
            svg={true}
            url={summaryDetails?.imagePath}
          />
          <Text style={styles.text_goals}>{summaryDetails?.goalName}</Text>
          <View style={styles.education_plan}>
            <View style={styles.plan_1}>
              <Image
                source={require("../../../assets/goals1_img2.png")}
                style={styles.plan_img}
              />
              <Text style={styles.rate}>₹ {summaryDetails?.targetValue}/-</Text>
              <Text style={styles.Target_Set}>Target Set</Text>
            </View>
            <View style={styles.plan_2}>
              <Image
                source={require("../../../assets/Iconmaterial_img.png")}
                style={styles.plan2_img}
              />
              <Text style={styles.year}>{summaryDetails?.noOfYears} Years</Text>
              <Text style={styles.Target_Set}>Time Left to Achieve</Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView style={styles.containerScroll}>
        <HoldingFundType
          data={summaryDetails}
          holdings={summaryDetails?.holdings ? summaryDetails?.holdings : []}
        />
      </ScrollView>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Home")}
        style={styles.botton_box}
      >
        <Text style={styles.get_otp}>SET OTHER GOALS</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  containerScroll: {
    width: "100%",
    marginTop: 200,
    zIndex: 100,
  },
  logimg: {
    height: 65,
    width: 203,
  },
  Goalsimg: {
    height: 87,
    width: 94,
  },
  text_goals: {
    //marginTop: -20,
    fontSize: 18,
  },
  education_plan: {
    flexDirection: "row",
    width: "100%",
    paddingBottom: 10,
  },
  plan_1: {
    width: "50%",
    alignItems: "center",
  },
  plan_img: {
    height: 40,
    width: 40,
  },
  price: {
    alignItems: "center",
  },
  rate: {
    fontSize: 14,
    fontWeight: "bold",
    paddingLeft: 5,
  },
  plan_2: {
    alignItems: "center",
    width: "50%",
    //paddingLeft: 40,
  },
  plan2_img: {
    height: 40,
    width: 40,
  },

  botton_box: {
    marginHorizontal: 10,
    backgroundColor: Colors.RED,
    paddingVertical: 20,
    marginTop: 20,
    borderRadius: 10,
    borderColor: Colors.DEEP_GRAY,
    borderWidth: 1,
    marginBottom: 20,
  },
  get_otp: {
    color: Colors.WHITE,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 70,
  },
});
const mapStateToProps = (state) => ({
  token: state.auth.token,
  users: state.auth.user,
  summaryDetails: state.goals.summaryDetails,
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
)(GoalDetailScreen);
