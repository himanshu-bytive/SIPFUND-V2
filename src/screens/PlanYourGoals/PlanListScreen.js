/** @format */

import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  Button,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import { Styles, Config, Colors, FormValidate } from "../../common";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { Image, Header, CheckBox, colors } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { MyImage, GoalFundType } from "../../components";
import Cart from "../../components/Cart";

function PlanListScreen(props) {
  const pageActive = useRef(false);
  const {
    token,
    goalDetail,
    isFetching,
    mygolelist,
    myGoles,
    fundDetails,
    planYourGoalsDetails,
    newInvestment,
    navigation,
    isLumpsum,
    totalAmount,
    childName,
    setChildName,
    disableFunds,
    time,
    users,
  } = props;
  const monthsArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [showModified, setShowModified] = useState(false);

  const handleDelete = (productCode) => {
    let goals = mygolelist;
    for (let index in goals) {
      if (goals[index]?.schemeInfo.productCode === productCode) {
        delete goals[index];
        break;
      }
    }
    myGoles(goals);
    navigation.replace("PlanHome");
  };

  const getSip = (value) => {
    if (!isNaN(value)) {
      return Number(value);
    }
    return 0;
  };

  const sipFromDate = (sipDay) => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    if (month === 11) {
      month = 0;
      year = year + 1;
    } else {
      month += 1;
    }

    if (day > sipDay) {
      if (month === 11) {
        month = 0;
        year = year + 1;
      } else {
        month += 1;
      }
    }

    return (
      ("00" + sipDay).match(/\d{2}$/) + "-" + monthsArr[month] + "-" + year
    );
  };
  const sipEndDate = (sipDay) => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    if (month === 11) {
      month = 0;
      year = year + 1;
    } else {
      month += 1;
    }

    if (day > sipDay) {
      if (month === 11) {
        month = 0;
        year = year + 1;
      } else {
        month += 1;
      }
    }

    return (
      ("00" + sipDay).match(/\d{2}$/) +
      "-" +
      monthsArr[month] +
      "-" +
      `${parseInt(year) + parseInt(time)}`
    );
  };

  const getParams = (goals, sum) => {
    let dat = [];
    for (let i in goals) {
      let a = goals[i].schemeInfo;
      a.schemeName = a.name;
      a.trxn_nature = isLumpsum ? "N" : "S";
      a.expectedInflationRate = props.inflation;
      a.exprectedRateOfReturn = props.returnRate;
      a.currentInvestment = props.currentInvestment;
      a.costOfLiving = props.costOfLiving;
      a.category = goals[i].schems;

      if (!isLumpsum) {
        a.sip_freq = "OM";
        let sipDay = a?.sip_period_day
          ? a?.sip_period_day
          : parseInt(a?.sipDates.split(",")[0]);
        a.sip_period_day = sipDay;
        a.sip_from_date = sipFromDate(sipDay);
        a.sip_end_date = sipEndDate(sipDay);
      }

      let amount = goals[i].schemeInfo?.sip
        ? goals[i].schemeInfo?.sip
        : showModified
        ? goals[i].schemeInfo?.allocationAmountModifiled
          ? goals[i].schemeInfo?.allocationAmountModifiled.toFixed(0)
          : 0
        : goals[i].schemeInfo?.allocationAmount
        ? goals[i].schemeInfo?.allocationAmount.toFixed(0)
        : 0;
      a.amount = amount;
      a.sip_amount = amount;
      delete a.name;
      if (!isNaN(amount) && parseInt(amount) != 0) {
        dat.push(a);
      }
    }
    return {
      userPhoneNumber: users?.mobileNo,
      goal: {
        name: goalDetail?.goal,
        numberOfYears: goalDetail?.additionalInfo.time_years,
        totalAmount: sum,
        yearOfComplition: goalDetail?.time_years,
        holdings: dat,
        createdAt: "",
      },
    };
  };

  useEffect(() => {
    setShowModified(false);
    if (
      goalDetail.allocationFlag === false &&
      goalDetail.investmentAmountDifference
    ) {
      Alert.alert(
        "Alert Title",
        `Your total investment amount will be increased by ₹${goalDetail.investmentAmountDifference.toFixed(
          2
        )} in order to satisfy the scheme(s) minimum investment amount. Would you like to continue with this increased amount?`,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => setShowModified(true) },
        ]
      );
    }
  }, [goalDetail]);

  return (
    <View style={styles.container}>
      {/*}<Header
        leftComponent={
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginTop: 20 }}
          >
            <AntDesign name={"arrowleft"} size={40} color={Colors.RED} />
          </TouchableOpacity>
        }
        containerStyle={Styles.header}
        backgroundColor={Colors.LIGHT_WHITE}
        centerComponent={
          <Image
            source={require("../../../assets/icon.png")}
            style={styles.logimg}
          />
        }
        rightComponent={
          <Cart
            nav={() => {
              navigation.navigate("TopRatedList");
            }}
          />
        }
      />*/}
      {/*isFetching && (
        <View style={Styles.loading}>
          <ActivityIndicator color={Colors.BLACK} size="large" />
        </View>
      )*/}
      {/* SIP_sec */}
      {/*<View style={styles.education}>
          <View style={styles.child_sec}>
            <MyImage
              width="117"
              height="117"
              svg={true}
              url={goalDetail?.goalImagePath}
            />
          </View>
          <View style={styles.education_sec}>
            <Text style={styles.child}>{goalDetail?.goal}</Text>
            <Text style={styles.child_text}>{goalDetail?.goalDescription}</Text>
          </View>
        </View>*/}

      <View style={styles.fund_sec}>
        <Text style={styles.month}>
          {isLumpsum === true ? "Lumpsum" : "SIP Per Month"}
        </Text>
      </View>

      <View style={styles.fund_sec}>
        <Text style={styles.investment}>
          Recommended
          <Text style={{ color: Colors.RED }}>{`\n${goalDetail?.goal}`}</Text>
        </Text>
        <Text style={styles.price}>{`₹${
          totalAmount ? Number(totalAmount).toFixed(0) : 0
        }`}</Text>
      </View>

      {mygolelist && (
        <GoalFundType
          data={mygolelist}
          myGoles={myGoles}
          selectedOption={isLumpsum === true ? "LUMPSUM" : "SIP"}
          onPress={(item) => {
            fundDetails(item);
            //disableFunds();
            navigation.navigate( "Funds",{screen : "FundsDetails",params : {
              fromScreen: "PlanHome",
            }});
          }}
          handleDelete={handleDelete}
          showModified={showModified}
        />
      )}
      {/* <TouchableOpacity
        onPress={() => {
          //disableFunds();
          navigation.navigate("PlanSearch", { isLumpsum: isLumpsum });
        }}
      >
        <Text style={styles.add}>I would like to add more funds</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        onPress={() => {
          setChildName(childName);

          let sum = 0;
          for (let item in mygolelist) {
            let amount = mygolelist[item].schemeInfo?.sip
              ? mygolelist[item].schemeInfo?.sip
              : showModified
              ? mygolelist[item].schemeInfo?.allocationAmountModifiled
                ? mygolelist[
                    item
                  ].schemeInfo?.allocationAmountModifiled.toFixed(0)
                : 0
              : mygolelist[item].schemeInfo?.allocationAmount
              ? mygolelist[item].schemeInfo?.allocationAmount.toFixed(0)
              : 0;
            sum = sum + getSip(amount);
          }

          let goals = mygolelist.filter((item) => {
            let amount = item.schemeInfo?.sip
              ? item.schemeInfo?.sip
              : showModified
              ? item?.schemeInfo?.allocationAmountModifiled
                ? item?.schemeInfo?.allocationAmountModifiled.toFixed(0)
                : 0
              : item?.schemeInfo?.allocationAmount
              ? item?.schemeInfo?.allocationAmount.toFixed(0)
              : 0;
            return parseInt(amount) > 0 ? true : false;
          });

          if (goals) {
            for (let item in goals) {


              console.log(
                parseInt(
                  goals[item]?.schemeInfo?.sip
                    ? goals[item]?.schemeInfo?.sip
                    : goals[item]?.schemeInfo?.allocationAmountModifiled
                ) < parseInt(goals[item]?.schemeInfo?.default_min_amount)
              );

              if (
                parseInt(
                  goals[item]?.schemeInfo?.sip
                    ? goals[item]?.schemeInfo?.sip
                    : goals[item]?.schemeInfo?.allocationAmountModifiled
                ) < parseInt(goals[item]?.schemeInfo?.default_min_amount)
              ) {
                alert("Amount is less than minimum amount");
                return;
              }
              //if (parseInt(goals[item].schemeInfo.sip) % 500 !== 0) {
              //alert("Amount must be a multiple of 500");
              //return;
              //}
            }
          }

          /* Don't allow if sum of all investments exceed the amount */
          if (sum > totalAmount) {
            Alert.alert(
              "Amount exceeds total",
              `Total invested amount exceeds the amount by ₹${(
                sum - totalAmount
              ).toFixed(2)}. Proceed?`,
              [
                {
                  text: "Don't",
                  onPress: () => console.log("Cancel Pressed"),
                },
                {
                  text: "Yes, please",
                  onPress: () => {
                    let params = getParams(
                      //myInvestlist.filter((value) => !isNaN(value.schemes.sip)),
                      goals,
                      sum
                    );
                    //newInvestment(params, token);
                    disableFunds();
                    navigation.navigate("PlanSubmit", {
                      sum: sum,
                      isLumpsum,
                      showModified,
                      params,
                    });
                  },
                },
              ],
              { cancelable: false }
            );
          } else if (sum < totalAmount) {
            alert(
              `Invested amount less than the total by ₹${(
                totalAmount - sum
              ).toFixed(2)}`
            );
          } else {
            let params = getParams(
              //myInvestlist.filter((value) => !isNaN(value.schemes.sip)),
              goals,
              sum
            );
            //newInvestment(params, token);
            disableFunds();
            navigation.navigate("PlanSubmit", {
              sum: sum,
              isLumpsum,
              showModified,
              params,
            });
          }
        }}
        style={styles.botton_box}
      >
        <Text style={styles.get_otp}>NEXT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
  },
  logimg: {
    height: 65,
    width: 203,
    marginTop: 10,
  },

  header: {
    borderBottomColor: Colors.BLACK,
    borderBottomWidth: 1,
  },
  containerScroll: {
    width: "100%",
  },
  sip_sec: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 30,
  },
  sip_left: {
    width: "50%",
    borderBottomWidth: 1,
    borderBottomColor: Colors.RED,
  },
  lumpsum: {
    width: "50%",
    borderBottomWidth: 1,
    borderBottomColor: Colors.DEEP_GRAY,
  },
  sip: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: Colors.RED,
  },
  lump: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  fund_sec: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 25,
    marginTop: 20,
  },
  fund_sec2: {
    flexDirection: "row",
    marginHorizontal: 25,
    marginTop: 20,
    marginBottom: 30,
  },
  selected: {
    fontSize: 15,
    fontWeight: "bold",
    color: Colors.DEEP_GRAY,
  },
  month: {
    fontSize: 13,
    fontWeight: "bold",
    color: Colors.DEEP_GRAY,
    position: "absolute",
    right: 0,
  },
  investment: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.DEEP_GRAY,
    marginTop: -18,
    //textAlign: "center",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.RED,
    right: 0,
    marginBottom: 10,
  },
  hybrid_sec: {
    marginHorizontal: 15,
    marginVertical: 20,
  },
  hybrid: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.RED,
    marginVertical: 10,
    marginLeft: 10,
  },
  axis_asset: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: Colors.WHITE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    padding: 10,
  },
  company: {
    flexDirection: "row",
  },
  management: {
    marginLeft: 10,
    width: "65%",
  },
  axis: {
    fontSize: 15,
  },
  moderately: {
    fontSize: 12,
    color: Colors.DEEP_GRAY,
  },
  axisimg: {
    height: 44,
    width: 39,
  },
  checkbox: {
    position: "absolute",
    right: -20,
    top: -15,
  },
  border_sec: {
    flexDirection: "row",
    marginTop: 10,
  },
  border: {
    width: "85%",
    marginRight: 7,
  },
  icons: {
    width: "10%",
    marginTop: -15,
  },
  selectfolio_sec: {
    flexDirection: "row",
  },
  select: {
    alignItems: "center",
    width: "31%",
  },
  no: {
    fontSize: 15,
    color: Colors.DEEP_GRAY,
  },
  new: {
    fontSize: 18,
  },
  more_funds: {
    fontSize: 18,
    color: Colors.RED,
    textAlign: "center",
    marginTop: 10,
  },
  botton_box: {
    backgroundColor: Colors.RED,
    marginHorizontal: 30,
    marginVertical: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.DEEP_GRAY,
    paddingVertical: 10,
  },
  get_otp: {
    color: Colors.WHITE,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  education: {
    flexDirection: "row",
    paddingHorizontal: 20,
    backgroundColor: Colors.WHITE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  education_sec: {
    width: "60%",
    marginTop: 10,
    paddingTop: 30,
  },
  goals_2: {
    height: 145,
    width: 145,
  },
  child: {
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 20,
    color: Colors.DEEP_GRAY,
  },
  child_text: {
    fontSize: 16,
    color: Colors.RED,
    paddingTop: 10,
    paddingLeft: 20,
    fontWeight: "bold",
  },
  planyour: {
    width: 414,
    height: 756,
  },
  add: {
    marginVertical: 20,
    textAlign: "center",
    color: Colors.RED,
    fontSize: 18,
  },
});
const mapStateToProps = (state) => ({
  token: state.auth.token,
  users: state.auth.user,
  isFetching: state.goals.isFetching,
  goalDetail: state.goals.goalDetail,
  mygolelist: state.goals.mygolelist,
  planYourGoalsDetails: state.goals.planYourGoalsDetails,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { GoalsActions } = require("../../store/GoalsRedux");
  const { FundDetailActions } = require("../../store/FundDetailRedux");
  return {
    ...stateProps,
    ...ownProps,
    singleDetails: (params, token) => {
      GoalsActions.singleDetails(dispatch, params, token);
    },
    myGoles: (data) => {
      GoalsActions.myGoles(dispatch, data);
    },
    fundDetails: (data) => {
      FundDetailActions.fundDetails(dispatch, data);
    },
    newInvestment: (params, token) => {
      GoalsActions.goalUser(dispatch, params, token);
    },
    setChildName: (name) => {
      GoalsActions.setChildName(dispatch, name);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(PlanListScreen);
