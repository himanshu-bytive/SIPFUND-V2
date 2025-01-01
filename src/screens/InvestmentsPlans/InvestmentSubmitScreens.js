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
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import { Styles, Config, Colors, FormValidate } from "../../common";
import { MyImage } from "../../components";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { Image, Header, CheckBox } from "react-native-elements";
import Cart from "../../components/Cart";

function InvestmentSubmitScreens(props) {
  const pageActive = useRef(false);
  const {
    investment,
    configs,
    isFetching,
    myInvestlist,
    pincodeInfo,
    newInvestment,
    getCartDetails,
    token,
  } = props;

  const [paymentInitiated, setPaymentInitiated] = useState(false);

  useEffect(() => {
    if (paymentInitiated && !isFetching && pincodeInfo) {
      setPaymentInitiated(false);
      props.navigation.navigate("TopRatedFunds", {
        screen: "TopRatedList",
        params: {
          fromScreen: "InvestmentSubmit",
          planName: investment.investmentPlan,
          currentTab: props.route.params?.isLumpsum ? "LUMPSUM" : "SIP",
        },
      });      
    }
  }, [paymentInitiated, isFetching]);

  const [sum, setSum] = useState(0);

  const getSip = (value) => {
    if (!isNaN(value)) {
      return Number(value);
    }
    return 0;
  };

  useEffect(() => {
    let total = 0;
    for (let category in Object.keys(myInvestlist)) {
      for (let item in myInvestlist[Object.keys(myInvestlist)[category]]) {
        let amount = getSip(
          myInvestlist[Object.keys(myInvestlist)[category]][item].sip
        );
        if (amount < item.default_min_amount) {
          alert("Amount is less than minimum amount");
          return;
        }
        total = total + amount;
      }
    }
    setSum(total);
  }, [myInvestlist]);

  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{ marginTop: 20 }}
          >
            <AntDesign name={"arrowleft"} size={40} color={Colors.RED} />
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
          <View style={{marginTop:30}}>
           <Cart
            nav={() => {
              props.navigation.navigate("TopRatedFunds", { screen: "TopRatedList" });
            }}
          />
         </View>
        }
      />

      <ScrollView>
        <View style={styles.education}>
          <View style={styles.child_sec}>
            <MyImage width="100" svg={true} url={investment.planImagePath} />
          </View>
          <View style={styles.education_sec}>
            <Text style={styles.child}>Summary</Text>
            <Text style={styles.child_text}>Investment Plan</Text>
          </View>
        </View>

        <Text style={styles.mygoal}>
          My Investment :{" "}
          <Text style={styles.my_goal}>{investment.investmentPlan}</Text>
        </Text>

        <View style={styles.fund_sec}>
          <Text style={styles.fund_secleft}>Fund List</Text>
          <Text style={styles.fund_secright}>₹ {sum}</Text>
        </View>

        {Object.keys(myInvestlist).map((category) => {
          return (
            <>
              {myInvestlist[category]
                .filter((value) => !isNaN(value.sip) && value?.sip != 0)
                .map((item, key) => (
                  <View key={key} style={styles.sbi_sec}>
                    <View
                      style={{
                        flex: 1,
                        marginHorizontal: 10,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={{ uri: item.imagePath }}
                        style={styles.Hybrid}
                      />
                      <Text numberOfLines={2} style={styles.sbi_text}>
                        {item?.name}
                      </Text>
                      <Text style={styles.price}>₹ {item.sip}</Text>
                    </View>
                  </View>
                ))}
            </>
          );
        })}
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          //let data = [];
          //for (let category in Object.keys(myInvestlist)) {
          //for (let item in myInvestlist[
          //Object.keys(myInvestlist)[category]
          //]) {
          //if (
          //!isNaN(
          //myInvestlist[Object.keys(myInvestlist)[category]][item].sip
          //) &&
          //myInvestlist[Object.keys(myInvestlist)[category]][item].sip != 0
          //) {
          //data.push(
          //myInvestlist[Object.keys(myInvestlist)[category]][item]
          //);
          //}
          //}
          //}
          //props.navigation.navigate("Upi", {
          //cart: data,
          //sum: sum,
          //fromCart: false,
          //fromPlanGoals: false,
          //isLumpsum: props.navigation.state.params.isLumpsum,
          //groupId: pincodeInfo?._id,
          //groupType: "Investment Plans",
          //groupName: investment.investmentPlan,
          //});

          var empIds = "";
          var empIds2 = "0";

          var filteredArray =
            props?.navigation?.route?.params?.holdings.filter(function (
              itm
            ) {
              return empIds.indexOf(itm.amount) == -1;
            });
          var filteredArray2 =
            props?.route?.params?.params?.holdings.filter(function (
              itm
            ) {
              return empIds2.indexOf(itm.amount) == -1;
            });
          props.route.params.params.holdings = filteredArray2;
          newInvestment(props.route.params.params, token);
          setPaymentInitiated(true);
          setTimeout(() => {
            getCartDetails(token);
          }, 1000);
        }}
        style={styles.botton_box}
      >
        <Text style={styles.get_otp}>Invest</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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

  education: {
    flexDirection: "row",
    marginHorizontal: 20,
    padding: 20,
  },
  child_sec: { width: "30%" },
  education_sec: {
    width: "70%",
    marginLeft: 30,
  },
  goals_2: {
    height: 112,
    width: 118,
  },
  child: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.DEEP_GRAY,
  },
  child_text: {
    fontSize: 18,
    color: Colors.RED,
    paddingVertical: 10,
    fontWeight: "bold",
  },
  formsec: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 50,
    borderColor: Colors.DEEP_GRAY,
    marginHorizontal: 20,
    padding: 10,
  },
  Midcap: {
    fontSize: 18,
    paddingLeft: 10,
  },
  results: {
    fontSize: 12,
    marginLeft: 50,
    marginTop: 5,
    color: Colors.DEEP_GRAY,
  },
  sbi_sec: {
    flexDirection: "row",
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: Colors.DEEP_GRAY,
    paddingBottom: 10,
    marginVertical: 5,
    alignItems: "center",
  },
  Hybrid: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  sbi_text: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color:"black"
  },
  price: {
    fontSize: 15,
    textAlign: "right",
    fontWeight: "bold",
    color:"black"
  },
  fund_sec: {
    flexDirection: "row",
    backgroundColor: Colors.LIGHT_GRAY,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  fund_secright: {
    position: "absolute",
    right: 0,
    fontSize: 15,
    fontWeight: "bold",
    paddingTop: 10,
    paddingRight: 10,
  },
  fund_secleft: {
    fontSize: 18,
    fontWeight: "bold",
    color:"black"
  },
  mygoal: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
    color: Colors.RED,
    marginBottom: 20,
  },
  my_goal: {
    color: Colors.DEEP_GRAY,
    fontWeight: "normal",
  },
  add: {
    marginVertical: 20,
    textAlign: "center",
    color: Colors.RED,
    fontSize: 18,
  },
  botton_box: {
    backgroundColor: Colors.RED,
    marginHorizontal: 30,
    marginVertical: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.DEEP_GRAY,
    paddingVertical: 10,
  },
  get_otp: {
    color: Colors.WHITE,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  childbottom: {
    flexDirection: "row",
    paddingLeft: 20,
  },

  sf: {
    width: 16,
    height: 16,
  },
  year: {
    fontSize: 15,
    paddingLeft: 10,
  },
});
const mapStateToProps = (state) => ({
  token: state.auth.token,
  users: state.auth.users,
  isFetching: state.investmentplan.isFetching,
  myInvestlist: state.investmentplan.myInvestlist,
  investment: state.investmentplan.investment,
  configs: state.investmentplan.configs,
  pincodeInfo: state.investmentplan.pincodeInfo,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { InvestmentPlanActions } = require("../../store/InvestmentPlanRedux");
  const { CartActions } = require("../../store/CartActionsRedux");
  return {
    ...stateProps,
    ...ownProps,
    investmentConfig: (data) => {
      InvestmentPlanActions.investmentConfig(dispatch, data);
    },
    newInvestment: (params, token) => {
      InvestmentPlanActions.newInvestment(dispatch, params, token);
    },
    getCartDetails: (token) => {
      CartActions.cartDetails(dispatch, token);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(InvestmentSubmitScreens);
