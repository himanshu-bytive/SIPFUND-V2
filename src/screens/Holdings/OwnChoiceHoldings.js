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
import TopRatedHomeScreen from "../TOPRatedFunds/TopRatedHomeScreen";
import { Styles, Config, Colors, FormValidate } from "../../common";

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { Image, Header, CheckBox } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { HoldingFundType } from "../../components";
import moment from "moment";
import { OwnerChoice } from "..";
import Cart from "../../components/Cart";

function OwnChoiceHoldings(props) {
  const {
    isFetching,
    token,
    goalSummary,
    users,
    summary,
    navigation: { state },
  } = props;
  const [data, setData] = useState(
    summary?.ownchoice ? summary?.ownchoice : []
  );
  const [visible, setVisible] = useState(null);
  const [sum, setSum] = useState(0.0);
  const [scrollViewHeight, setScrollViewHeight] = useState(0.0);

  const scrollViewRef = useRef();

  useEffect(() => {
    if (data) {
      let sum = 0.0;
      for (let item of data) {
        sum += parseFloat(item?.currentValue);
      }
      if (sum < -0.1 || sum < 0.1) {
        sum = 0.0;
      }
      setSum(sum);
    }
  }, [data]);

  const onScrollViewLayout = (e) => {
    const { height } = e.nativeEvent.layout;
    setScrollViewHeight(height + Dimensions.get("window").height);
  };

  const handleAddInvestment = () => {
    if (scrollViewHeight && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, y: scrollViewHeight });
    }
  };

  return (
    <View style={styles.container}>
      {/* Header_sec */}
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
            <View style={{marginTop:0}}>
           <Cart
            nav={() => {
              props.navigation.navigate("TopRatedFunds", { screen: "TopRatedList" });
            }}
          />
         </View>
          }
        />
        <Image
          source={require("../../../assets/choice.png")}
          style={styles.goles5logo}
        />
        <Text style={styles.text_goals}>Own Choice</Text>
      </View>

      {/* container_box_sec */}
      <ScrollView
        style={styles.containerScroll}
        ref={scrollViewRef}
        onLayout={onScrollViewLayout}
      >
        {data.length > 0 && (
          <Text style={styles.Investments}>My Investments</Text>
        )}

        <View>
          <Text
            style={styles.totalAmount}
          >
            {console.log("hellooo",props.route.params)}
            {`Amount: ₹ ${props.route?.params?.currentValue}`}</Text>
          {/* <Text style={styles.totalAmount}>{`Amount: ₹ ${sum.toFixed(
            2
          )}`}</Text> */}
        </View>

        <View style={styles.mainbox}>
          {data.map((item, key) => (
            <View style={{ width: "95%" }} key={key}>
              <View style={styles.container_box}>
                <View style={styles.smallbox}>
                  <Image
                    source={{
                      uri: `https://sipfund.sfo2.digitaloceanspaces.com/product-AMC-images/${item?.imagePath}`,
                    }}
                    style={styles.mid_capimg}
                  />
                  <Text style={styles.Longterm}>{item?.productName}</Text>
                </View>
                <AntDesign
                  name={visible === key ? "up" : "down"}
                  size={20}
                  color="#C0392B"
                  onPress={() => setVisible(visible === key ? null : key)}
                />
              </View>
              {/* onPress={() => props.navigation.navigate('TopRatedFundDetails')} */}
              {visible === key && (
                <>
                  <View style={styles.valua_sec}>
                    <View style={styles.price}>
                      <Text style={styles.rate_2}>
                        ₹ {item.currentValue.toFixed(2)}
                      </Text>
                      <Text style={styles.Current_Value}>Current Value</Text>
                    </View>

                    <View style={styles.Investment}>
                      <View style={styles.Investment_value}>
                        <Text style={styles.rate_2}>
                          ₹ {item.amount.toFixed(2)}
                        </Text>
                        <Text style={styles.Current_Value}>Investment</Text>
                      </View>

                      <View style={styles.Investment_value}>
                        <Text style={styles.rate_2}>
                          ₹{" "}
                          {(
                            Number(item.currentValue) - Number(item.amount)
                          ).toFixed(2)}
                        </Text>
                        <Text style={styles.Current_Value}>Profit/Loss</Text>
                      </View>

                      <View style={styles.Investment_value}>
                        <Text style={styles.rate_2}>{item.cagr}%</Text>
                        <Text style={styles.Current_Value}>CAGR</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.transactionContainer}>
                    <Text style={styles.transHeader}>Transactions</Text>
                    {item?.trxnDetails.map((trxn, key) => (
                      <View
                        style={[
                          styles.fund,
                          {
                            marginHorizontal: 10,
                            padding: 5,
                          },
                        ]}
                        key={key}
                      >
                        {console.log("Trx",trxn)}
                        <View>
                          <Text style={{color:"black"}}>
                            {moment(new Date(trxn?.navDate)).format(
                              "DD-MM-YYYY"
                            )}{" "}
                            ({trxn?.type})
                          </Text>
                          <Text style={{color:"black"}}>₹{trxn?.amount}</Text>
                        </View>
                        <View>
                          <Text style={{color:"black"}}>Nav: ₹{trxn?.purPrice}</Text>
                          <Text style={{color:"black"}}>Units: {trxn?.units}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </>
              )}
            </View>
          ))}
          <TouchableOpacity
            style={styles.addInvestmentButton}
            onPress={handleAddInvestment}
          >
            <Text style={[styles.totalAmount, { color: "white" }]}>
              Add Investment
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.Investments}>Invest Now</Text>
        <OwnerChoice showInside={true} navigation={props?.navigation} />
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
  goles5logo: {
    height: 70,
    width: 70,
  },
  text_goals: {
    fontSize: 25,
    marginVertical: 15,
    fontWeight: "bold",
    color:"black"
  },
  Investments: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 30,
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
    marginVertical: 10,
    padding: 5,
    backgroundColor: Colors.WHITE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.GREY_1,
  },
  mid_capimg: {
    height: 50,
    width: 50,
    resizeMode: "contain",
  },
  Longterm: {
    marginLeft: 10,
    maxWidth: "80%",
    fontSize: 15,
    color: Colors.BLACK,
  },
  smallbox: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
  },
  Investnow_sec: {
    flexDirection: "row",
    marginLeft: 20,
  },
  Debt: { marginHorizontal: 5, fontSize: 13, color: "#696565" },

  Equity: { fontSize: 13, color: Colors.RED, fontWeight: "bold" },

  topratedmainbox: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  toprated: { flexDirection: "row", marginBottom: 30 },
  top: {
    width: "73%",
    fontSize: 15,
    fontWeight: "bold",
    color: "#696565",
  },
  return: { fontSize: 15 },

  returnsbox: { flexDirection: "row" },

  //  Axis Asset Management Company

  axis_asset: {
    marginTop: 20,
    paddingBottom: 10,
  },

  company: {
    flexDirection: "row",
  },
  axis: {
    marginLeft: 10,
    fontSize: 15,
    width: "65%",
  },
  axisimg: {
    height: 39,
    width: 39,
  },
  botton_box: {
    width: 80,
    backgroundColor: Colors.RED,
    height: 20,
  },
  get_otp: {
    color: Colors.WHITE,
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 4,
  },
  value_sec: {
    flexDirection: "row",
    marginLeft: 50,
  },
  mininvestment: {
    width: "33%",
    alignItems: "center",
  },
  min: {
    fontSize: 12,
  },

  valua_sec: {
    width: "100%",
    borderRadius: 15,
    backgroundColor: Colors.RED,
    marginBottom: 10,
    alignItems: "center",
  },
  price: {
    alignItems: "center",
  },
  rate_2: {
    color: Colors.WHITE,
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 10,
  },
  Current_Value: {
    color: Colors.WHITE,
    fontWeight: "bold",
    fontSize: 12,
  },
  Investment: {
    marginTop: 20,
    flexDirection: "row",
  },
  Investment_value: {
    width: "30%",
    alignItems: "center",
    paddingHorizontal: 5,
    marginBottom: 20,
  },
  fund: {
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    marginTop: 10,
    backgroundColor: Colors.WHITE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2.5,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  transHeader: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
    color:"black"
  },
  transactionContainer: {
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
  },
  totalAmount: {
    textAlign: "center",
    fontSize: 18,
    color: Colors.BLACK,
    marginVertical: 10,
  },
  addInvestmentButton: {
    backgroundColor: Colors.RED,
    width: 200,
    alignSelf: "center",
    borderRadius: 5,
    marginVertical: 10,
  },
});

const mapStateToProps = (state) => ({
  token: state.auth.token,
  users: state.auth.user,
  summary: state.goals.summary,
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
)(OwnChoiceHoldings);
