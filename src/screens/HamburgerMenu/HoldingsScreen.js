import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  Button,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { Styles, Config, Colors, FormValidate } from "../../common";
import { Entypo, AntDesign } from "react-native-vector-icons";
import { Header, Overlay } from "react-native-elements";
import Cart from "../../components/Cart";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const investmentData = [
  { title: "Long Term", image: require("../../../assets/term1.png") },
  { title: "Tax Saving Funds", image: require("../../../assets/term2.png") },
  { title: "Better Than", image: require("../../../assets/term3.png") },
  { title: "Tax Saving Funds", image: require("../../../assets/term4.png") },
  { title: "Better Than FD", image: require("../../../assets/term5.png") },
  { title: "Aggressive Funds", image: require("../../../assets/term6.png") },
];

function HoldingsScreen(props) {
  const [selectTab, setSelectTab] = useState("HOLDINGS");
  const toggleTab = (value) => {
    setSelectTab(value);
  };

  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{ marginTop: 20 }}
          >
            <AntDesign name={"arrowleft"} size={30} color={Colors.RED} />
          </TouchableOpacity>
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
        backgroundColor={Colors.LIGHT_WHITE}
        containerStyle={styles.header}
        centerComponent={
          <Image
            source={require("../../../assets/icon.png")}
            style={styles.logimg}
          />
        }
      />
      <ScrollView style={styles.containerScroll}>
        <View style={styles.switch_sec}>
          <Text style={styles.transaction}>
            {selectTab === "HOLDINGS" ? "HOLDINGS" : "EXTERNAL HOLDINGS"}
          </Text>

          <View style={styles.tab_sec}>
            <TouchableOpacity
              onPress={() => toggleTab("HOLDINGS")}
              style={selectTab == "HOLDINGS" ? styles.tab1 : styles.tab2}
            >
              <Text
                style={
                  selectTab == "HOLDINGS" ? styles.switch : styles.switchAct
                }
              >
                HOLDINGS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => toggleTab("EXTERNAL")}
              style={selectTab == "EXTERNAL" ? styles.tab1 : styles.tab2}
            >
              <Text
                style={
                  selectTab == "EXTERNAL" ? styles.switch : styles.switchAct
                }
              >
                EXTERNAL HOLDINGS
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Total Investment_sec... */}

        <View style={styles.main_box}>
          <View style={styles.investment_sec}>
            <View style={styles.blue_sec}>
              <Text style={styles.total_investment}>Total Investment</Text>
              <Text style={styles.price}>₹ 3,23,930.00</Text>
            </View>
            <View style={styles.red_sec}>
              <Text style={styles.total_investment}>Current Value</Text>
              <Text style={styles.price}>₹ 4,13,550.94</Text>
            </View>
            <View style={styles.green_sec}>
              <Text style={styles.total_investment}>Unrealized Profit</Text>
              <Text style={styles.price}>₹ 89,620.94</Text>
            </View>
          </View>

          {/* FRANKLIN TEMPLETON MUTUAL FUND_SEC... */}

          <View style={styles.fund_sec}>
            <View style={styles.axis_sec}>
              <Text style={styles.axis}>FRANKLIN TEMPLETON MUTUAL FUND</Text>
            </View>

            <View style={styles.growth_sec}>
              <Text style={styles.axis_treasury}>
                Franklin India Ultra Short Bond Fund - Super Institutional Plan{" "}
              </Text>

              {/* value_sec */}

              <View style={styles.value_sec}>
                <View style={styles.folio_sec}>
                  <Text style={styles.folio}>18.639</Text>
                  <Text style={styles.folio}>Units</Text>
                </View>

                <View style={styles.folio_sec}>
                  <Text style={styles.folio}>500.762</Text>
                  <Text style={styles.folio}>Invested Amount</Text>
                </View>

                <View style={styles.folio_sec}>
                  <Text style={styles.folio}>6.4</Text>
                  <Text style={styles.folio}>CAGR %</Text>
                </View>
              </View>

              {/* value_sec_end */}

              {/* value_sec2_start */}

              <View style={styles.value_sec}>
                <View style={styles.folio_sec}>
                  <Text style={styles.folio}>567.904</Text>
                  <Text style={styles.folio}>Market Value</Text>
                  <Text style={styles.folio}>On 13-Jul-2021</Text>
                </View>

                <View style={styles.folio_sec}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={[styles.folio, styles.green]}>67.142</Text>
                    <AntDesign name="caretup" size={15} color="#5DA753" />
                  </View>
                  <Text style={styles.folio}>Unrealized Profit</Text>
                </View>

                <View style={styles.folio_sec}>
                  <Text style={[styles.folio, styles.green]}>13.408</Text>
                  <Text style={styles.folio}>Unrealized Profit %</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Axis Mutual Fund_sec.. */}

          <View style={styles.fund_sec}>
            <View style={styles.axis_sec}>
              <Text style={styles.axis}>Axis Mutual Fund</Text>
            </View>

            <View style={styles.growth_sec}>
              <Text style={styles.axis_treasury}>
                Axis Long Term Equilty Fund - Regular Growth
              </Text>

              {/* value_sec */}

              <View style={styles.value_sec}>
                <View style={styles.folio_sec}>
                  <Text style={styles.folio}>3089.835</Text>
                  <Text style={styles.folio}>Units</Text>
                </View>

                <View style={styles.folio_sec}>
                  <Text style={styles.folio}>151996.56</Text>
                  <Text style={styles.folio}>Invested Amount</Text>
                </View>

                <View style={styles.folio_sec}>
                  <Text style={styles.folio}>17.86</Text>
                  <Text style={styles.folio}>CAGR %</Text>
                </View>
              </View>

              {/* value_sec_end */}

              <View style={styles.value_sec}>
                <View style={styles.folio_sec}>
                  <Text style={styles.folio}>208998.61</Text>
                  <Text style={styles.folio}>Market Value</Text>
                  <Text style={styles.folio}>On 13-Jul-2021</Text>
                </View>

                <View style={styles.folio_sec}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={[styles.folio, styles.green]}>57002.047</Text>
                    <AntDesign name="caretup" size={15} color="#5DA753" />
                  </View>
                  <Text style={styles.folio}>Unrealized Profit</Text>
                </View>

                <View style={styles.folio_sec}>
                  <Text style={[styles.folio, styles.green]}>37.502</Text>
                  <Text style={styles.folio}>Unrealized Profit %</Text>
                </View>
              </View>
            </View>
          </View>

          {/* SBI Mutual Fund_sec */}

          <View style={styles.fund_sec}>
            <View style={styles.axis_sec}>
              <Text style={styles.axis}>SBI Mutual Fund</Text>
            </View>

            <View style={styles.growth_sec}>
              <Text style={styles.axis_treasury}>
                SBI Flexicap Fund - Regular Plan - Growth
              </Text>

              {/* value_sec */}

              <View style={styles.value_sec}>
                <View style={styles.folio_sec}>
                  <Text style={styles.folio}>328.609</Text>
                  <Text style={styles.folio}>Units</Text>
                </View>

                <View style={styles.folio_sec}>
                  <Text style={styles.folio}>20999.08</Text>
                  <Text style={styles.folio}>Invested Amount</Text>
                </View>

                <View style={styles.folio_sec}>
                  <Text style={styles.folio}>14.43</Text>
                  <Text style={styles.folio}>CAGR %</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  logimg: {
    height: 65,
    width: 203,
    marginTop: 10,
  },
  switch_sec: {
    backgroundColor: Colors.RED,
  },
  transaction: {
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: Colors.WHITE,
  },
  tab_sec: {
    flexDirection: "row",
  },
  tab1: {
    width: "50%",
    alignItems: "center",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.WHITE,
  },
  tab2: {
    width: "50%",
    alignItems: "center",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.RED,
  },
  switch: {
    color: Colors.WHITE,
    fontSize: 13,
  },
  switchAct: {
    color: Colors.GREY_1,
    fontSize: 13,
  },
  main_box: {
    backgroundColor: Colors.GREY_1,
    padding: 15,
  },
  investment_sec: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  blue_sec: {
    backgroundColor: Colors.BLUE_1,
    alignItems: "center",

    width: "32%",
  },
  red_sec: {
    backgroundColor: Colors.LIGHT_PINK,
    alignItems: "center",

    width: "32%",
  },
  green_sec: {
    backgroundColor: Colors.GREEN_1,
    alignItems: "center",
    width: "32%",
  },
  total_investment: {
    fontSize: 12,
    marginTop: 15,
    color: Colors.WHITE,
  },
  price: {
    fontSize: 12,
    marginBottom: 15,
    color: Colors.WHITE,
  },
  fund_sec: {
    backgroundColor: Colors.WHITE,
    marginTop: 20,
  },
  axis_sec: {
    backgroundColor: "#838793",
  },
  axis: {
    fontSize: 16,
    color: Colors.WHITE,
    marginLeft: 10,
    marginVertical: 10,
  },
  growth_sec: {
    padding: 10,
  },
  axis_treasury: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.DEEP_GRAY,
    marginBottom: 10,
    width: "80%",
  },
  value_sec: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  folio_sec: {
    width: "33%",
  },
  folio: {
    fontSize: 15,
    color: Colors.BLACK,
  },
  green: { color: "#5DA753" },

  // holding_sec

  holding_sec: {
    backgroundColor: Colors.RED,
    alignItems: "center",
  },
  botton_box: {
    backgroundColor: Colors.RED,
    paddingVertical: 20,
  },
  proceed: {
    color: Colors.WHITE,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  footer_box: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  botton_box2: {
    width: "49%",
    backgroundColor: Colors.RED,
    paddingVertical: 20,
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
)(HoldingsScreen);
