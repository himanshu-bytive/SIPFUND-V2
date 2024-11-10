import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  Button,
  ScrollView,
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
import { MyImage } from "../../components";
import { Styles, Config, Colors, FormValidate } from "../../common";

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { Image, Header, CheckBox } from "react-native-elements";

function NoGoalsScreen(props) {
  const { isFetching, token, goals, singleDetails, goalDetail, users } = props;
  const pageActiveGoles = useRef(false);

  useEffect(() => {
    if (goalDetail && pageActiveGoles.current) {
      pageActiveGoles.current = false;
      props.navigation.navigate("Plan",{screen : "PlanHome"});
    }
  }, [goalDetail]);

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
        <Image
          source={require("../../../assets/Goalsimg.png")}
          style={styles.Goalsimg}
        />
        <Text style={styles.text_goals}>Goals</Text>
        <Text style={styles.text_goalsDesc}>No Goals set as of now !</Text>
      </View>
      <ScrollView style={styles.containerScroll}>
        {goals.map((item, key) => (
          <TouchableOpacity
            key={key}
            onPress={() => {
              singleDetails(item, token);
              pageActiveGoles.current = true;
            }}
          >
            <View style={styles.education}>
              <View style={styles.child_sec}>
                <MyImage
                  width="145"
                  height="145"
                  svg={true}
                  url={item.goalImagePath}
                />
              </View>
              <View tyle={styles.education_sec}>
                <Text style={styles.child}>{item.goal}</Text>
                <Text
                  style={{
                    maxWidth: "70%",
                    fontSize: 10,
                    fontWeight: "bold",
                    color: "#7E7E7E",
                    marginVertical: 5,
                  }}
                >
                  {item.description}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  },

  Goalsimg: {
    height: 87,
    width: 94,
  },
  text_goals: {
    fontSize: 20,
    marginVertical: 15,
    fontWeight: "bold",
    color:"black"
  },
  text_goalsDesc: {
    fontSize: 15,
    marginVertical: 5,
    color:"black"
  },
  education: {
    flexDirection: "row",
    marginHorizontal: 20,
    borderWidth: 2,
    borderColor: Colors.GRAY_LIGHT,
    borderRadius: 15,
    marginVertical: 10,
    padding: 5,
    paddingBottom: 0,
    backgroundColor: Colors.WHITE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  child_sec: {
    width: "50%",
  },
  sip: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#7E7E7E",
    marginVertical: 5,
  },
  child: {
    fontSize: 15,
    fontWeight: "bold",
    color:"black"
  },
  child_text: {
    fontSize: 10,
    fontWeight: "bold",
    color: Colors.LIGHT_BLACK,
    marginVertical: 3,
    paddingLeft: 20,
  },
  goals_3: {
    height: 18,
    width: 18,
  },
  img_sec: {
    flexDirection: "row",
    marginVertical: 3,
  },
  price: {
    fontSize: 12,
    fontWeight: "bold",
    paddingLeft: 5,
  },
  clock_icon: {
    height: 15,
    width: 15,
  },
  logimg: {
    height: 65,
    width: 203,
    marginTop: 10,
  },
  goals_2: {
    height: 145,
    width: 145,
  },
  botton_box: {
    backgroundColor: Colors.RED,
    marginTop: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.DEEP_GRAY,
    paddingVertical: 20,
  },
  get_otp: {
    color: Colors.WHITE,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
const mapStateToProps = (state) => ({
  token: state.auth.token,
  users: state.auth.user,
  goals: state.goals.goals,
  goalDetail: state.goals.goalDetail,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { GoalsActions } = require("../../store/GoalsRedux");
  return {
    ...stateProps,
    ...ownProps,
    singleDetails: (params, token) => {
      GoalsActions.singleDetails(dispatch, params, token);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(NoGoalsScreen);
