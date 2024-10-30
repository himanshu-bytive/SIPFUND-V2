/** @format */

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

function TransactionHistoryScreen(props) {
  const {
    token,
    user,
    fetchTransaction,
    transactionHistory,
    profile,
    isFetching,
  } = props;
  const [visible, setVisible] = useState(false);

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (transactionHistory) {
      //console.log(JSON.stringify(transactionHistory, null, 2));
      setTransactions(transactionHistory);
    }
  }, [transactionHistory]);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const toDate = () => {
    const monthArr = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEPT",
      "OCT",
      "NOV",
      "DEC",
    ];
    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    const prevYear = year - 1;
    var toDate = ("0" + day).slice(-2) + "-" + monthArr[month] + "-" + year;
    // var fromDate =
    //   ("0" + day).slice(-2) + "-" + monthArr[month] + "-" + prevYear;

    return toDate;
  };

  useEffect(() => {
    if (user !== null && profile !== null) {
      setTransactions([]);
      // console.log("user=", user);

      let params = {
        service_request: {
          iin: user.IIN,
          from_date: profile.CREATED_DATE,
          to_date: toDate(),
          unique_no: "",
        },
      };
      // console.log("token=", token);
      // console.log("params=", params);
      fetchTransaction(params, token);
    }
  }, [user, profile]);

  return (
    <>
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
            <Cart
              nav={() => {
                props.navigation.navigate("TopRatedList");
              }}
            />
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
        {isFetching && (
          <View
            style={{
              backgroundColor: "#0000",
              left: Dimensions.get("window").width / 2 - 25,
              top: Dimensions.get("window").height / 2 + 61,
              position: "absolute",
              zIndex: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size={50} color="black" />
          </View>
        )}
        <ScrollView style={styles.containerScroll}>
          <View style={styles.switch_sec}>
            <Text style={styles.transaction}>Transaction History</Text>
          </View>
          {!transactionHistory || transactionHistory.length === 0 ? (
            <View
              style={{
                alignItems: "center",
                marginTop: "50%",
              }}
            >
              <Text>{!isFetching && "You don't have any transactions!"}</Text>
            </View>
          ) : (
            transactions &&
            transactions.map((item) => {
              return (
                <View style={styles.transaction_history}>
                  <View style={styles.fund_sec}>
                    <Text style={styles.Fund}>Fund</Text>
                    <Text style={styles.axis}>{item.LONG_NAME}</Text>
                  </View>
                  <View style={styles.fund_sec}>
                    <Text style={styles.Fund}>Folio No</Text>
                    <Text style={styles.axis}>
                      {typeof item?.FOLIO_NO === "object" ? "" : item?.FOLIO_NO}
                    </Text>
                  </View>
                  <View style={styles.fund_sec}>
                    <Text style={styles.Fund}>Scheme Name</Text>
                    <Text style={styles.axis}>{item.PRODUCT_CODE}</Text>
                  </View>
                  <View style={styles.fund_sec}>
                    <Text style={styles.Fund}>Trxn Type</Text>
                    <Text style={styles.axis}>{item.TRXN_TYPE}</Text>
                  </View>
                  <View style={styles.fund_sec}>
                    <Text style={styles.Fund}>Trxn Status</Text>
                    <Text style={styles.axis}>{item.TRXN_STATUS}</Text>
                  </View>
                  <View style={styles.fund_sec}>
                    <Text style={styles.Fund}>Amount</Text>
                    <Text style={styles.axis}>{item.AMOUNT}</Text>
                  </View>
                  <View style={styles.fund_sec}>
                    <Text style={styles.Fund}>Unit</Text>
                    <Text style={styles.axis}>
                      {typeof item?.UNITS === "object" ? "" : item?.UNITS}
                    </Text>
                  </View>
                  <View style={styles.fund_sec}>
                    <Text style={styles.Fund}>Date</Text>
                    <Text style={styles.axis}>{item.DATE_OF_TRXN_REQUEST}</Text>
                  </View>
                </View>
              );
            })
          )}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#D3D6DB" },

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

  transaction_history: {
    backgroundColor: Colors.WHITE,
    marginHorizontal: 15,
    marginTop: 10,
    padding: 10,
  },
  fund_sec: {
    flexDirection: "row",
    marginBottom: 5,
  },
  Fund: {
    width: "30%",
    fontSize: 12,
    fontWeight: "bold",
  },
  axis: {
    width: "70%",
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.DEEP_GRAY,
  },
});

const mapStateToProps = (state) => ({
  token: state.auth.token,
  users: state.auth.users,
  user: state.auth.user,
  transactionHistory: state.transactionHis.transactionHistory,
  isFetching: state.transactionHis.isFetching,
  profile: state.auth.profile,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { AuthActions } = require("../../store/AuthRedux");
  const { TransactionHisActions } = require("../../store/TransactionHisRedux");
  return {
    ...stateProps,
    ...ownProps,
    logOut: () => {
      AuthActions.logOut(dispatch);
    },
    fetchTransaction: (params, token) => {
      TransactionHisActions.fetchTransaction(dispatch, params, token);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(TransactionHistoryScreen);
