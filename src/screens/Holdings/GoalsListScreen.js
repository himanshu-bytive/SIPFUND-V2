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
import { Styles, Config, Colors, FormValidate } from "../../common";
import { MyImage } from "../../components";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Image, Header, CheckBox } from "react-native-elements";
import appsFlyer from "react-native-appsflyer";

function GoalsListScreen(props) {
  const { users, summary, goalSummaryDetails } = props;
  const [data, setData] = useState(summary?.goals ? summary?.goals : []);

  const GoalDetailPage = (item) => {
    const eventName = "goals_clicked";

    appsFlyer.logEvent(
      eventName,
      item,
      (res) => {
        console.log("######## AppsFlyer #######", res);
      },
      (err) => {
        console.error("######## AppsFlyer #######", err);
      }
    );
    goalSummaryDetails(item);
    props.navigation.navigate("GoalDetail");
  };

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
      </View>
      <ScrollView style={styles.containerScroll}>
        {data.map((item, key) => (
          <TouchableOpacity key={key} onPress={() => GoalDetailPage(item)}>
            <View style={styles.education}>
              <View style={styles.child_sec}>
                <MyImage
                  width="145"
                  height="145"
                  svg={true}
                  url={item?.imagePath}
                />
              </View>
              <View tyle={styles.education_sec}>
                <Text style={styles.child}>{item?.goalName}</Text>
                <Text style={styles.sip}>{item?.type}</Text>
                <View style={styles.img_sec}>
                  <View style={styles.img_sec}>
                    <Image
                      source={require("../../../assets/Goalsimg.png")}
                      style={styles.clock_icon}
                    />
                    <Text style={styles.price}>₹ {item?.targetValue}/-</Text>
                  </View>
                </View>
                <Text style={styles.child_text}>Target Set</Text>
                <View style={styles.img_sec}>
                  <Image
                    source={require("../../../assets/clock_icon.png")}
                    style={styles.clock_icon}
                  />
                  <Text style={styles.price}>{item?.noOfYears} Years</Text>
                </View>
                <Text style={styles.child_text}>Time to achieve</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          onPress={() => props.navigation.navigate("Home")}
          style={styles.botton_box}
        >
          <Text style={styles.get_otp}>SET OTHER GOALS</Text>
        </TouchableOpacity>
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
  education: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
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
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  child_sec: {
    marginHorizontal: 10,
  },
  sip: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#7E7E7E",
    //marginVertical: 5,
    
  },
  child: {
    fontSize: 15,
    //maxWidth: "90%",
    paddingLeft: 20,
    fontWeight: "bold",
    color:"black"
  },
  child_text: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.LIGHT_BLACK,
    //marginVertical: 3,
    paddingLeft: 20,
  },
  goals_3: {
    height: 18,
    width: 18,
  },
  img_sec: {
    flexDirection: "row",
    marginVertical: 3,
    alignItems: "center",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    paddingLeft: 5,
    color:"black"
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
    width: 80,
    aspectRatio: 1,
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
  summary: state.goals.summary,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { GoalsActions } = require("../../store/GoalsRedux");
  return {
    ...stateProps,
    ...ownProps,
    goalSummaryDetails: (data) => {
      GoalsActions.goalSummaryDetails(dispatch, data);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(GoalsListScreen);
