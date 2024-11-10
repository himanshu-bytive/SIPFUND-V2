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
  ToastAndroid,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import { Styles, Config, Colors, FormValidate } from "../../common";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Header, Overlay, CheckBox, SearchBar } from "react-native-elements";
import Toast from "react-native-simple-toast";

function RedeemCheckout(props) {
  const {
    redeemActive,
    redeemCheckoutDetails,
    redeemExternalCheckoutDetails,
    setRedeemCheckoutDetails,
    setRedeemExternalCheckoutDetails,
    redeemTransactionSucces,
    redeemCheckout,
    setRedeemTransactionSucces,
    nseDetails,
    user,
    token,
  } = props;

  useEffect(() => {
    if (redeemTransactionSucces === true) {
      Toast.show("Transaction Happen Succesfully", Toast.LONG);
      setRedeemTransactionSucces(false);
      props.navigation.navigate("dashboard");
    }
  }, [redeemTransactionSucces]);

  const remove = (key, type) => {
    Alert.alert(
      "Exit from Sipfund!",
      "Do you want to close this application?",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "YES",
          onPress: () => {
            if (type === "REDEEM") {
              let filteredArray = redeemCheckoutDetails.filter(
                (item) => item.type === "REDEEM" && item.key !== key
              );
              setRedeemCheckoutDetails(filteredArray);
            } else {
              let filteredArray = redeemExternalCheckoutDetails.filter(
                (item) => item.type === "EXTERNAL" && item.key !== key
              );
              setRedeemExternalCheckoutDetails(filteredArray);
            }
          },
        },
      ]
    );
  };

  const checkout = () => {
    if (redeemActive === "REDEEM" && redeemCheckoutDetails !== null) {
      if (redeemCheckoutDetails.length < 1) {
        alert("It's Empty");
        return;
      }
      let child = redeemCheckoutDetails.map((item) => {
        return {
          amc: item.amcCode,
          folio: item.folioNo,
          product_code: item.productCode,
          // target_product_code: item.targetCode,
          amt_unit_type: item.valueName,
          reinvest: item.sourceReinvest,
          // target_reinvest: item.targetReinvest,
          amt_unit: item.value,
          all_units: item.valueName === "Unit" ? "Y" : "N",
          groupId: item?.groupId,
          groupName: item?.groupName,
          groupType: item?.groupType,
        };
      });
      let params = {
        service_request: {
          iin: user.IIN,
          poa: "N",
          trxn_acceptance: "OL",
          dp_id: " ",
          acc_no: nseDetails.acc_no,
          bank_name: nseDetails.bank_name.BANK_NAME,
          ifsc_code: nseDetails.ifsc_code,
          remarks: "Redemption",
          iin_conf_flag: "N",
          trxn_initiator: "O",
          trans_count: redeemCheckoutDetails.length,
        },
        childtrans: [...child],
      };
      redeemCheckout(params, token);
    } else if (redeemExternalCheckoutDetails !== null) {
      if (redeemExternalCheckoutDetails.length < 1) {
        alert("It's Empty");
        return;
      }
      let child = redeemExternalCheckoutDetails.map((item) => {
        return {
          amc: item.amcCode,
          folio: item.folioNo,
          product_code: item.productCode,
          // target_product_code: item.targetCode,
          amt_unit_type: item.valueName,
          reinvest: "N",
          // target_reinvest: item.targetReinvest,
          amt_unit: item.value,
          all_units: item.valueName === "Unit" ? "Y" : "N",
          groupId: item?.groupId,
          groupName: item?.groupName,
          groupType: item?.groupType,
        };
      });
      let params = {
        service_request: {
          iin: user.IIN,
          poa: "N",
          trxn_acceptance: "OL",
          dp_id: " ",
          acc_no: nseDetails.acc_no,
          bank_name: nseDetails.bank_name.BANK_NAME,
          ifsc_code: nseDetails.ifsc_code,
          remarks: "Redemption",
          iin_conf_flag: "N",
          trxn_initiator: "O",
          trans_count: redeemExternalCheckoutDetails.length,
        },
        childtrans: [...child],
      };
      redeemCheckout(params, token);
    }
  };

  const back = () => {
    props.navigation.navigate("Redeem");
  };
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TouchableOpacity onPress={back}>
          <AntDesign
            name={"arrowleft"}
            size={28}
            color={Colors.WHITE}
            style={styles.arrow}
          />
        </TouchableOpacity>
        <Text style={styles.transaction}>Redeem Checkout</Text>
      </View>
      <ScrollView style={styles.containerScroll}>
        {/* Axis Mutual Fund_sec... */}

        {redeemActive === "REDEEM" &&
          redeemCheckoutDetails !== null &&
          redeemCheckoutDetails.map((item, index) => (
            <View style={styles.fund_sec}>
              <View style={styles.axis_sec}>
                <Text style={styles.axis}>{item.productAmcName}</Text>
              </View>
              <View style={styles.growth_sec}>
                <Text style={styles.axis_treasury}>{item.fromScheme}</Text>

                <View style={styles.value_sec}>
                  <View style={styles.folio_sec}>
                    <Text style={styles.folio}>Folio</Text>
                    <Text style={styles.folio}>{item.folioNo}</Text>
                  </View>

                  <View style={styles.folio_sec}>
                    <Text style={styles.folio}>{item.valueName}</Text>
                    <Text style={styles.folio}>
                      {parseFloat(item.value).toFixed(3)}
                    </Text>
                  </View>

                  <View style={styles.folio_sec}>
                    <TouchableOpacity
                      onPress={() => remove(item.key, item.type)}
                    >
                      <MaterialIcons
                        name={"delete"}
                        size={30}
                        color={Colors.BLACK}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
        {redeemActive === "EXTERNAL" &&
          redeemExternalCheckoutDetails !== null &&
          redeemExternalCheckoutDetails.map((item, index) => (
            <View style={styles.fund_sec}>
              <View style={styles.axis_sec}>
                <Text style={styles.axis}>{item.productAmcName}</Text>
              </View>
              <View style={styles.growth_sec}>
                <Text style={styles.axis_treasury}>{item.fromScheme}</Text>
                <View style={styles.value_sec}>
                  <View style={styles.folio_sec}>
                    <Text style={styles.folio}>Folio</Text>
                    <Text style={styles.unit}>{item.folioNo}</Text>
                  </View>

                  <View style={styles.folio_sec}>
                    <Text style={styles.folio}>Units</Text>
                    <Text style={styles.unit}>
                      {parseFloat(item.value).toFixed(3)}
                    </Text>
                  </View>

                  <View style={styles.folio_sec}>
                    <TouchableOpacity
                      onPress={() => remove(item.key, item.type)}
                    >
                      <MaterialIcons
                        name={"delete"}
                        size={30}
                        color={Colors.BLACK}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
      </ScrollView>
      <TouchableOpacity onPress={checkout} style={styles.botton_box2}>
        <Text style={styles.proceed}>CHECKOUT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D3D6DB",
  },
  search: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: Colors.RED,
    marginTop: 20,
  },
  arrow: {
    marginLeft: 10,
    marginVertical: 20,
    marginRight: 20,
  },
  logimg: {
    height: 65,
    width: 203,
    marginTop: 10,
  },
  switch_sec: {
    backgroundColor: Colors.RED,
    marginTop: 20,
  },
  transaction: {
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "left",
    marginVertical: 20,
    marginLeft: 10,
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
  fund_sec: {
    backgroundColor: Colors.WHITE,
    marginHorizontal: 15,
    marginTop: 10,
  },
  axis_sec: {
    backgroundColor: "#838793",
  },
  axis: {
    fontSize: 16,
    color: Colors.WHITE,
    marginLeft: 10,
    padding: 10,
    marginVertical: 10,
  },
  growth_sec: {
    padding: 10,
  },
  axis_treasury: {
    fontSize: 15,
    marginBottom: 10,
    color:"black"
  },
  unit: {
    fontSize: 15,
    marginBottom: 10,
    color: Colors.BLACK,
  },
  value_sec: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  // folio_sec: {
  //   width: "34%",
  //   fontSize: 15,
  //   color: Colors.DEEP_GRAY,
  // },
  folio: {
    fontSize: 15,
    color: Colors.DEEP_GRAY,
  },
  scheme_sec: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  select: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.DEEP_GRAY,
  },
  units_sec: {
    flexDirection: "row",
    width: "50%",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  amount: {
    fontSize: 12,
    color: Colors.DEEP_GRAY,
  },
  input_box: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  inputsec: {
    borderBottomWidth: 1,
    borderColor: Colors.DEEP_GRAY,
    width: "60%",
    fontSize: 16,
  },
  botton_box: {
    width: "30%",
    backgroundColor: Colors.RED,
    paddingVertical: 10,
  },
  get_otp: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  disabledBox: {
    width: "30%",
    backgroundColor: Colors.LIGHT_RED1,
    paddingVertical: 10,
  },
  disabled: {
    color: Colors.GRAY_LIGHT,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  botton_box2: {
    backgroundColor: Colors.RED,
    paddingVertical: 10,
    marginBottom: 20,
    marginHorizontal: 15,
  },
  proceed: {
    color: Colors.WHITE,
    fontSize: 16,
    textAlign: "center",
  },
});

const mapStateToProps = (state) => ({
  token: state.auth.token,
  redeemActive: state.switch.redeemActive,
  redeemCheckoutDetails: state.switch.redeemCheckoutDetails,
  redeemExternalCheckoutDetails: state.switch.redeemExternalCheckoutDetails,
  redeemTransactionSucces: state.switch.redeemTransactionSucces,
  user: state.auth.user,
  nseDetails: state.registration.nseDetails,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { AuthActions } = require("../../store/AuthRedux");
  const { SwitchActions } = require("../../store/SwitchRedux");
  return {
    ...stateProps,
    ...ownProps,
    logOut: () => {
      AuthActions.logOut(dispatch);
    },
    setRedeemCheckoutDetails: (params) => {
      SwitchActions.setRedeemCheckoutDetails(dispatch, params);
    },
    setRedeemExternalCheckoutDetails: (params) => {
      SwitchActions.setRedeemExternalCheckoutDetails(dispatch, params);
    },
    redeemCheckout: (params, token) => {
      SwitchActions.redeemCheckout(dispatch, params, token);
    },
    setRedeemTransactionSucces: (params) => {
      SwitchActions.setRedeemTransactionSucces(dispatch, params);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(RedeemCheckout);
