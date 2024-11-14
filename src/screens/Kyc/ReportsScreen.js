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
  Linking,
} from "react-native";
import { connect } from "react-redux";
import { Styles, Config, Colors, FormValidate } from "../../common";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Image, Header, ListItem, Overlay } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Cart from "../../components/Cart";

const reports = [
  {
    number: "1.",
    title: "Sipfund holding Report",
    link: "Download",
    api: "live-portfolio-report-summary",
  },
  //{
  //number: "2.",
  //title: "Load Free units Report",
  //link: "Download",
  //api: "live-portfolio-report-details",
  //},
  {
    number: "2.",
    title: "Capital gain transaction-wise report",
    link: "Download",
    api: "capital-gain-trxn-wise-report",
  },
];

const tax = [
  {
    number: "1.",
    title: "Sipfund holding Report",
    link: "Download",
    api: "live-portfolio-report-details",
  },
  {
    number: "2.",
    title: "Load Free units Report",
    link: "Download",
    api: "load-free-unit-report",
  },
  {
    number: "3.",
    title: "Dividend Report",
    link: "Download",
    api: "live-portfolio-report-summary",
  },
  {
    number: "4.",
    title: "Financial Year Transaction Report",
    link: "Download",
    api: "live-portfolio-report-summary",
  },
];

function ReportsScreen(props) {
  const { token, isFetching, urls, downloadReport, downloadReportWithParams } = props;

  return (
    <View style={styles.container}>
      {/* header  */}
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Home")}
            style={{ marginTop: 20 }}
          >
            <AntDesign name={"arrowleft"} size={30} color={Colors.RED} />
          </TouchableOpacity>
        }
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
              props.navigation.navigate("TopRatedList");
            }}
          />
        }
      />
      {isFetching && (
        <View style={Styles.loading}>
          <ActivityIndicator color={Colors.BLACK} size="large" />
        </View>
      )}
      <ScrollView>
        <View style={styles.contain}>
          <Text style={styles.nametext}>Reports</Text>
        </View>

        {/* loop start */}
        {reports.map((item) => (
          <View style={styles.report_sec}>
            <View style={styles.tax_left}>
            {console.log(item)}
              <Text style={styles.tax_left_text}>{item.number}</Text>
              <Text style={styles.tax_left_text}>{item.title}</Text>
            </View>
            <View style={styles.bottom}>
              <TouchableOpacity
                onPress={() => downloadReport(item.api, token)}
                style={styles.botton_box}
              >
                {console.log(item.link)}
                <Text style={styles.get_otp}>{item.link}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        {/* loop end */}

        {/*<View style={styles.contain}>
          <Text style={styles.nametext}>Tax Package Reports</Text>
        </View>*/}

        {/* bottom loop start */}
        {/*tax.map((item) => (
          <View style={styles.report_sec}>
            <View style={styles.tax_left}>
              <Text style={styles.tax_left_text}>{item.number}</Text>
              <Text style={styles.tax_left_text}>{item.title}</Text>
            </View>
            <View style={styles.bottom}>
              <TouchableOpacity
                onPress={() => {
                  downloadReport(item.api, token);
                }}
                style={styles.botton_box}
              >
                <Text style={styles.get_otp}>{item.link}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))*/}
        {/* bottom loop end */}
      </ScrollView>
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
  contain: {
    alignItems: "center",
    backgroundColor: Colors.DEEP_GRAY_4,
  },
  nametext: {
    fontSize: 23,
    fontWeight: "bold",
    paddingVertical: 10,
    color:"black"
  },
  report_sec: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 5,
    justifyContent: "space-evenly",
  },
  bottom: {
    alignItems: "flex-end",
  },
  botton_box: {
    backgroundColor: Colors.LIGHT_RED1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    textAlign: "center",
  },
  get_otp: {
    color: Colors.WHITE,
    fontSize: 16,
    marginRight: 5,
    textAlign: "center",
  },
  tax_left: {
    flexDirection: "row",
    width: "60%",
  },
  tax_left_text: {
    fontSize: 16,
    fontWeight: "bold",
    paddingTop: 12,
    color:"black"
  },
});
const mapStateToProps = (state) => ({
  token: state.auth.token,
  isFetching: state.reports.isFetching,
  urls: state.reports.urls,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { ReportsActions } = require("../../store/ReportsRedux");
  return {
    ...stateProps,
    ...ownProps,
    downloadReport: (params, token) => {
      ReportsActions.downloadReport(dispatch, params, token);
    },
    downloadReportWithParams: (link, params, token) => {
      ReportsActions.downloadReportWithParams(dispatch, link, params, token);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(ReportsScreen);
