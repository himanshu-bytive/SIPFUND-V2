/** @format */

import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  BackHandler,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Platform,
} from "react-native";
import moment from "moment";
import { connect } from "react-redux";
import { Styles, Config, Colors, FormValidate } from "../../common";

import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Image, Header, CheckBox } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

function GoalsSummaryScreen(props) {
  const {
    isFetching,
    token,
    goalSummary,
    users,
    summary,
    userDetails,
    goalSummaryRetrieve,
    summaryRetrieve,
  } = props;
  const [data, setData] = useState(
    summary?.holdings?.summary ? summary?.holdings?.summary : {}
  );

  useEffect(() => {
    if (token) {
      goalSummary({ phoneNumber: users?.mobileNo }, token);
      goalSummaryRetrieve({ phoneNumber: users?.mobileNo }, token);
    }
  }, [token]);

  const [currentValue, setCurrentValue] = useState(0);
  const [InvestedValue, setInvestedValue] = useState(0);
  const [ProfitLoss, setProfitLoss] = useState(0);

  const getData = () => {
    if (summaryRetrieve?.currentValue && summaryRetrieve?.totalInvestment) {
      setCurrentValue(parseFloat(summaryRetrieve?.currentValue.toFixed(2)));
      setInvestedValue(parseFloat(summaryRetrieve?.totalInvestment.toFixed(2)));
      setProfitLoss(
        (
          parseFloat(summaryRetrieve?.currentValue.toFixed(2)) -
          parseFloat(summaryRetrieve?.totalInvestment.toFixed(2))
        ).toFixed(2)
      );
    } else {
      setCurrentValue(0);
      setInvestedValue(0);
      setProfitLoss(0);
    }
  };

  useEffect(() => {
    getData();
    return;
    if (summaryRetrieve?.length > 0) {
      var investment = 0;
      var currentVal = 0;
      var proLoss = 0;
      summaryRetrieve?.map((item, index) => {
        if (index == 0) {
          console.log("🚀 ~ summaryRetrieve?.map ~ item?.currentValue:", item);
        }
        // investment =
        //   parseFloat(investment) + item?.investedAmt
        //     ? parseFloat(item?.investedAmt)
        //     : 0;
        investment =
          parseFloat(investment) + parseFloat(item?.investedAmt?.toFixed(2));
        currentVal =
          parseFloat(currentVal) + parseFloat(item?.currentValue?.toFixed(2));
        // currentVal =
        //   parseFloat(currentVal) + item?.currentValue
        //     ? parseFloat(item?.currentValue?.toFixed(2))
        //     : 0;
      });
      proLoss = parseFloat(currentVal) - parseFloat(investment);
      console.log("🚀 ~ useEffect ~ currentVal:", currentVal);
      setCurrentValue(currentVal?.toFixed(2));
      setInvestedValue(investment?.toFixed(2));
      setProfitLoss(proLoss?.toFixed(2));
    }
  }, [summaryRetrieve]);

  const plansAndGoalsData = () => {
    if (summary?.goals && summary?.goals.length > 0) {
      props.navigation.navigate("GoalsList");
    } else {
      props.navigation.navigate("NoGoals");
    }
  };

  const investplanData = () => {
    props.navigation.navigate("Hold",{screen : "InvestmentList"});
  };

  useEffect(() => {
    const backAction = () => {
      props.navigation.navigate("dashboard");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => props.navigation.navigate("dashboard")}
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

      {isFetching && (
        <View style={Styles.loading}>
          <ActivityIndicator color={Colors.BLACK} size="large" />
        </View>
      )}

      <View
        style={{
          position: "absolute",
          zIndex: -1,
          width: "100%",
          backgroundColor: "#f7dfd6",
          alignItems: "center",
          paddingBottom: 120,
          top: Platform.OS == "ios" ? "10%" : 108,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
        }}
      >
        <Image
          source={require("../../../assets/goals1_img1.png")}
          style={styles.goals1_img1}
        />
        <Text style={styles.text_goals}>Holdings</Text>
      </View>
      <ScrollView
        style={{
          marginTop: 120,
        }}
      >
        <View style={Styles.header_top}>
          <View style={styles.goals1_img1} />
          <Text style={styles.text_goals}></Text>
          {/* <Image
            source={require("../../../assets/goals1_img1.png")}
            style={styles.goals1_img1}
          />
          <Text style={styles.text_goals}>Holdings</Text> */}
        </View>

        {/* Summary....sec */}
        <View style={styles.education1}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.child5}>Summary</Text>
            <Text style={styles.value}>
              Value as of {moment(new Date()).format("DD-MM-YYYY")}
            </Text>
            <Text style={styles.rupees}>
              ₹ {currentValue}
              {/* {parseInt(summary?.summary?.currentValue)
                ? summary?.summary?.currentValue
                : "0.00"} */}
            </Text>
            <Text style={styles.value}>Current Value</Text>
          </View>

          <View style={styles.value_sec}>
            <View style={styles.Profit}>
              <Text style={styles.investment}>{`₹ ${
                InvestedValue
                // summary?.summary?.totalinvestment
                //   ? summary?.summary?.totalinvestment
                //   : 0
              }`}</Text>
              <Text style={styles.investment2}>Investment</Text>
            </View>
            <View style={styles.Profit}>
              <Text style={styles.investment}>
                ₹ {ProfitLoss}
                {/* {(
                  summary?.summary?.currentValue -
                  summary?.summary?.totalinvestment
                ).toFixed(2)} */}
              </Text>
              <Text style={styles.investment2}>Profit/Loss</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={() => plansAndGoalsData()}>
          <View style={styles.education}>
            <View style={styles.education_sec}>
              <Image
                source={require("../../../assets/goals1_img2.png")}
                style={styles.goals1_img3}
              />
              <View style={{ alignItems: "center" }}>
                <Text style={styles.Goals}>Goals</Text>
              </View>
            </View>
            <Text style={styles.number}>{summary?.summary?.goals}</Text>
          </View>
        </TouchableOpacity>

        {/* Investment Plan..._sec */}

        <TouchableOpacity onPress={() => investplanData()}>
          <View style={styles.education_2}>
            <View style={styles.education_sec}>
              <Image
                source={require("../../../assets/Goles_4logo.png")}
                style={styles.goals1_img3}
              />
              <View style={{ alignItems: "center" }}>
                <Text style={styles.Goals}>Investment Plan</Text>
              </View>
            </View>
            <Text style={styles.number}>{summary?.summary?.plans}</Text>
          </View>
        </TouchableOpacity>

        {/* Top Rated Funds..._sec */}
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Hold",{screen : "TopRatedFunds"})}
        >
          <View style={styles.education}>
            <View style={styles.education_sec}>
              <Image
                source={require("../../../assets/goals1_img4.png")}
                style={styles.goals1_img3}
              />
              <View style={{ alignItems: "center" }}>
                <Text style={styles.Goals}>Top Rated Funds</Text>
              </View>
            </View>
            <Text style={styles.number}>{summary?.summary?.toprated}</Text>
          </View>
        </TouchableOpacity>

        {/* Own Choice...sec */}
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("Hold",{screen  : "OwnChoiceHoldings", params : {
              currentValue: currentValue,
            }})
          }
        >
          <View style={styles.education_2}>
            <View style={styles.education_sec}>
              <Image
                source={require("../../../assets/goles5_img.png")}
                style={styles.goals2_img3}
              />
              <View style={{ alignItems: "center" }}>
                <Text style={styles.Goals}>Own Choice</Text>
              </View>
            </View>
            <Text style={styles.number}>{summary?.summary?.ownchoice}</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    width: "100%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: Colors.GREY_1,
    backgroundColor: "#F9F9F9",
    alignItems: "center",
    backgroundColor: Colors.LIGHT_WHITE,
    paddingTop: 10,
    paddingBottom: 10,
  },
  logimg: {
    height: 65,
    width: 203,
  },

  goals1_img1: {
    height: 86,
    width: 72,
  },
  goals1_img3: {
    height: 64,
    width: 64,
    marginLeft: 20,
  },
  goals2_img3: {
    height: 40,
    width: 30,
    marginVertical: 10,
    marginLeft: 30,
  },

  text_goals: {
    fontSize: 25,
    paddingBottom: 50,
    fontWeight: "bold",
    color:'black'
  },

  education: {
    backgroundColor: "#fff",
    flexDirection: "row",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: Colors.GRAY_LIGHT,
    marginVertical: 5,
    marginHorizontal: 20,
    alignItems: "center",
  },
  education_2: {
    backgroundColor: "#fff",
    flexDirection: "row",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: Colors.RED,
    marginVertical: 5,
    marginHorizontal: 20,
    alignItems: "center",
  },
  education_sec: {
    flexDirection: "row",
    width: "80%",
    alignItems: "center",
  },
  education1: {
    marginTop: -140,
    marginHorizontal: 20,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: Colors.GRAY_LIGHT,
    marginVertical: 20,
    padding: 10,
    backgroundColor: Colors.WHITE,
  },

  child: {
    fontSize: 20,
    fontWeight: "bold",
  },
  child5: {
    fontSize: 25,
    fontWeight: "bold",
    color:"black"
  },
  summery_sec: {
    width: "100%",
    alignItems: "center",
  },
  value: {
    fontSize: 12,
    fontWeight: "bold",
    paddingVertical: 5,
    color: Colors.DEEP_GRAY,
  },
  value_sec: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  rupees: {
    fontSize: 20,
    color: Colors.RED,
    fontWeight: "bold",
  },
  investment: {
    color: Colors.RED,
    fontSize: 20,
    fontWeight: "bold",
  },
  Profit: {
    alignItems: "center",
  },
  investment2: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.DEEP_GRAY,
    marginVertical: 10,
  },
  Goals: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
    color:"black"
  },
  number: {
    fontSize: 20,
    fontWeight: "bold",
    position: "absolute",
    right: 10,
    color:"black"
  },
  red_color: {
    color: Colors.RED,
  },
});
const mapStateToProps = (state) => ({
  token: state.auth.token,
  users: state.auth.user,
  isFetching: state.goals.isFetching,
  summary: state.goals.summary,
  summaryRetrieve: state.goals.summaryRetrieve,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { GoalsActions } = require("../../store/GoalsRedux");
  return {
    ...stateProps,
    ...ownProps,
    goalSummary: (params, token) => {
      GoalsActions.goalSummary(dispatch, params, token);
    },
    goalSummaryRetrieve: (params, token) => {
      GoalsActions.goalSummaryRetrieve(dispatch, params, token);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(GoalsSummaryScreen);
