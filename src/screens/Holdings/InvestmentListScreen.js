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
  TextInput,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import { Styles, Config, Colors, FormValidate } from "../../common";
import { MyImage } from "../../components";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { Image, Header, CheckBox } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import appsFlyer from "react-native-appsflyer";

function InvestmentListScreen(props) {
  const pageActiveInvest = useRef(false);
  const {
    token,
    summary,
    investments,
    InvestmentSummaryDetails,
    investmentPlans,
    investment,
    users,
  } = props;

  //useEffect(() => {
  //if (summary?.plans) {
  //let data = summary?.plans ? summary?.plans : [];
  //let newData = {};
  //for (let item of data) {
  //if (item.details.planName in newData === false) {
  //newData[item.details.planName] = item;
  //}
  //}
  //setData(newData);
  //}
  //}, [summary]);

  const investDetails = (item) => {
    // const eventName = "investment_plan_clicked";

    // appsFlyer.logEvent(
    //   eventName,
    //   {
    //     item,
    //   },
    //   (res) => {
    //     console.log("######## AppsFlyer #######", res);
    //   },
    //   (err) => {
    //     console.error("######## AppsFlyer #######", err);
    //   }
    // );
    InvestmentSummaryDetails(item);
    props.navigation.navigate("Hold",{screen : "InvestDetail"});
  };

  useEffect(() => {
    if (investment && pageActiveInvest.current) {
      pageActiveInvest.current = false;
      props.navigation.navigate("Investment",{screen : "InvestmentDetail"});
    }
  }, [investment]);

  return (
    <View style={styles.container}>
      {/* Header_sec */}
      <View style={Styles.Header_top}>
        <Header
          leftComponent={
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={{ marginTop: 25 }}
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
          source={require("../../../assets/Goles_4logo.png")}
          style={styles.Goles_4logo}
        />
        <Text style={styles.text_goals}>
          {summary?.plans?.length && summary?.plans?.length > 0
            ? "Investment Plans set for now"
            : "No investment Plan set as of now !"}
        </Text>
      </View>

      {/* container_box_sec */}
      <ScrollView style={styles.containerScroll}>
        {summary?.plans && (
          <Text style={styles.Investments}>My Investments</Text>
        )}
        <View style={styles.mainbox}>
          {summary?.plans &&
            summary?.plans.map((item, key) => (
              <TouchableOpacity key={key} onPress={() => investDetails(item)}>
                <View style={styles.container_box}>
                  <MyImage
                    width="70"
                    height="70"
                    svg={true}
                    url={item.imagePath}
                  />
                  <Text style={styles.Longterm}>{item?.planName}</Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>

        <Text style={styles.Investments}>Invest Now</Text>
        <View style={styles.mainbox}>
          {investments?.map((item) => (
            <TouchableOpacity
              key={item?._id}
              onPress={() => {
                investmentPlans(item, token);
                pageActiveInvest.current = true;
              }}
            >
              <View style={styles.container_box}>
                <MyImage
                  width="70"
                  height="70"
                  svg={true}
                  sector={item?.plan === "Sectoral Mutual Funds" ? true : false}
                  url={item?.planImagePath}
                />
                <Text style={styles.Longterm}>{item?.plan}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

// StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerScroll: {
    width: "100%",
  },
  logimg: {
    height: 65,
    width: 203,
    marginTop: 10,
  },
  Goles_4logo: {
    height: 96,
    width: 96,
  },
  text_goals: {
    fontSize: 20,
    marginVertical: 15,
    color:"black"
  },
  Investments: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 40,
    marginVertical: 10,
    color:"black"
  },
  mainbox: {
    alignItems: "center",
  },
  container_box: {
    width: Dimensions.get("window").width - 20,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    padding: 5,
    borderColor: "#F7EDED",
    borderWidth: 1,
    borderRadius: 10,
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
  longtermimg: {
    height: 80,
    width: 80,
  },
  Longterm: {
    fontSize: 18,
    marginLeft: 20,
    width: "80%",
    color: Colors.BLACK,
  },
});

const mapStateToProps = (state) => ({
  token: state.auth.token,
  users: state.auth.user,
  summary: state.goals.summary,
  investments: state.investmentplan.investments,
  investment: state.investmentplan.investment,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { GoalsActions } = require("../../store/GoalsRedux");
  const { InvestmentPlanActions } = require("../../store/InvestmentPlanRedux");
  return {
    ...stateProps,
    ...ownProps,
    InvestmentSummaryDetails: (data) => {
      GoalsActions.InvestmentSummaryDetails(dispatch, data);
    },
    investmentPlans: (params, token) => {
      InvestmentPlanActions.investmentPlans(dispatch, params, token);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(InvestmentListScreen);
