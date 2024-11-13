/** @format */

import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Button,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import { Styles, Config, Colors, FormValidate } from "../../common";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { Image, Header, CheckBox, Overlay } from "react-native-elements";
import WebView from "react-native-webview";
import SiteAPI from "../../services/SiteApis";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { MySelectPicker, MyTextInput } from "../../components";
import moment from "moment";
import { capitalizeWord } from "../../utils/generalPurposeFunctions";

function UpiScreen(props) {
  const {
    token,
    profile,
    users,
    user,
    checkout,
    umrn,
    getUMRN,
    isFetching,
    emandateSuccess,
    error,
    webUrl,
    resetWebUrl,
    deletCart,
    getCartDetails,
    emandateOptions,
    toggleEmandatePopup,
    nseDetails,
    fatcaDetails,
    userDetails,
    updateRegister,
    updateNseRegistration,
    fetchNseData,
    updatedNseData,
  } = props;

  const [clicked, setClicked] = useState(false);
  let isPageActive = useRef(null);
  //const [webUrl, setWebUrl] = useState("");
  const [webViewActive, setWebViewActive] = useState(false);
  const [visibleEmandateUmrn, setVisibleEmandateUmrn] = useState(false);
  const [emandateListsUmrn, setEmandateListsUmrn] = useState([]);
  const [showNseInputs, setShowNseInputs] = useState(false);
  const [extraNseDetails, setExtraNseDetails] = useState();
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [res, setRes] = useState([]);
  const [loading, setLoading] = useState(false);

  const [CustId, setCustId] = useState();
  const [PaymentRefNo, setPaymentRefNo] = useState();
  const [PaymentStatus, setPaymentStatus] = useState();
  const [PaymentMsg, setPaymentMsg] = useState();

  useEffect(async () => {
    const response = await SiteAPI.apiGetCall(
      `/retrieveData/mandateList?iin=${users.IIN}`,
      {},
      token
    );
    setRes(response);
  }, []);

  const mobileEmailRelation = [
    { value: "SE", label: "Self" },
    { value: "SP", label: "Spouse" },
    { value: "DC", label: "Dependent Children" },
    { value: "DS", label: "Dependent Siblings" },
    { value: "DP", label: "Dependent Parents" },
    { value: "GD", label: "Guardian" },
    { value: "PM", label: "PMS" },
    { value: "CD", label: "Custodian" },
    { value: "PO", label: "POA" },
  ];

  useEffect(() => {
    if (webUrl) {
      setWebViewActive(true);
    }
  }, [webUrl]);

  useEffect(() => {
    if (isFetching === false && clicked && error) {
      setWebViewActive(false);
      //setWebUrl("");
      resetWebUrl();
      props.navigation.navigate("Profile");
      props.navigation.navigate("Home");
    }
  }, [isFetching, error]);
  useEffect(() => {
    const unsubscribe = props?.navigation.addListener("didFocus", () => {
      resetWebUrl();
      setCustId();
      setPaymentRefNo();
      setPaymentStatus();
      setPaymentMsg();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (token) {
      fetchNseData(user?.IIN, token);
    }
  }, [token]);

  useEffect(() => {
    if (emandateSuccess && isPageActive.current) {
      isPageActive.current = false;
      Alert.alert(
        "Success",
        "Transaction completed successfully. Please check your E-Mail/SMS to authorize transaction.",
        [
          {
            text: "Cancel",
            onPress: () => props.navigation.navigate("Home"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              props.navigation.navigate("Home");
            },
          },
        ]
      );
    }
  }, [emandateSuccess]);
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
  const fromDate = () => {
    const date = new Date();

    return (
      ("00" + date.getDate()).match(/\d{2}$/) +
      "-" +
      monthsArr[date.getMonth()] +
      "-" +
      date.getFullYear()
    );
  };
  const endDate = () => {
    var new_date = moment().add("days", 1).add(30, "y").format("DD-MMM-YYYY");
    return new_date;

    return (
      ("00" + date.getDate() + 1).match(/\d{2}$/) +
      "-" +
      monthsArr[date.getMonth()] +
      "-" +
      (parseInt(date.getFullYear(), 10) + 30)
    );
  };

  const sipFromDate = (default_date) => {
    const date = new Date();

    let month = date.getMonth();
    let year = date.getFullYear();

    if (month === 11) {
      month = 0;
      year = year + 1;
    }

    month = month + 2;

    //let day = default_date;
    //if (month === 2) {
    //day = parseInt(day, 10) + 2;
    //if (default_date >= 28) {
    //month = 2;
    //day = 2;
    //}
    //}

    let day = default_date;
    if (!default_date || default_date == 0) day = 1;

    return ("00" + day).match(/\d{2}$/) + "-" + monthsArr[month] + "-" + year;
  };
  const sipEndDate = (default_date) => {
    const date = new Date();

    let month = date.getMonth();
    let year = date.getFullYear();

    if (month === 11) {
      month = 0;
      year = year + 1;
    }

    month = month + 2;

    //let day = default_date;
    //if (month === 2) {
    //day = parseInt(day, 10) + 2;
    //if (default_date >= 28) {
    //month = 2;
    //day = 2;
    //}
    //}

    let day = default_date;
    if (!default_date || default_date == 0) day = 1;

    return (
      ("00" + day).match(/\d{2}$/) +
      "-" +
      monthsArr[month] +
      "-" +
      (parseInt(year, 10) + 30)
    );
  };

  const getPeriodDay = (day, month) => {
    month = month + 2;
    if (month === 2) {
      day = parseInt(day, 10) + 2;
      if (day >= 28) {
        month = 2;
        day = 2;
      }
    }
    return day;
  };

  const handleNseDetailsUnavailability = (data) => {
    setExtraNseDetails(data);
    setShowNseInputs(true);
  };

  const handleSubmitExtraNseDetails = () => {
    //let updatedData = {
    //nseDetails: {
    //...nseDetails,
    //...extraNseDetails,
    //},
    //userDetails,
    //fatcaDetails,
    //};
    //updateRegister(updatedData, token);

    const nseData = {
      title: updatedNseData?.TITLE,
      occupation: updatedNseData?.OCCUPATION_CODE,
      mfu_can: updatedNseData?.MFU_CAN,
      father_name: updatedNseData?.FATHER_NAME,
      mother_name: updatedNseData?.MOTHER_NAME,
      res_phone: "",
      res_fax: "",
      off_phone: "",
      off_fax: "",
      nri_addr1: "",
      nri_addr2: "",
      nri_addr3: "",
      nri_city: "",
      nri_state: "",
      nri_pincode: "",
      nri_country: "",
      branch_addr2: "",
      branch_addr3: "",
      branch_city: updatedNseData?.BRANCH_CITY,
      branch_pincode: updatedNseData?.BRANCH_PINCODE,
      branch_country: updatedNseData?.BRANCH_COUNTRY,
      no_of_nominee: updatedNseData?.NOMINEE_COUNT,
      nominee1_type: "",
      nominee1_name: extraNseDetails?.NOMINEE_OPTED
        ? updatedNseData?.NOM1_NAME
        : "",
      nominee1_dob: "",
      nominee1_addr1: updatedNseData?.NOM1_ADDRESS1,
      nominee1_addr2: updatedNseData?.NOM1_ADDRESS2,
      nominee1_addr3: updatedNseData?.NOM1_ADDRESS3,
      nominee1_city: updatedNseData?.NOM1_CITY,
      nominee1_state: updatedNseData?.NOM1_STATE,
      nominee1_pincode: updatedNseData?.NOM1_PINCODE,
      nominee1_relation: updatedNseData?.NOM1_RELATION,
      nominee1_percent: updatedNseData?.NOM1_PERCENTAGE,
      nominee1_guard_name: "",
      nominee1_guard_pan: "",
      nominee2_type: "N",
      nominee2_name: "",
      nominee2_dob: "",
      nominee2_relation: "",
      nominee2_percent: 0,
      nominee2_guard_name: "",
      nominee2_guard_pan: "",
      nominee3_type: "N",
      nominee3_Name: "",
      nominee3_dob: "",
      nominee3_relation: "",
      nominee3_percent: 0,
      nominee3_guard_name: "",
      nominee3_guard_pan: "",
      dp_id: "",
      Iin: users?.IIN,
      inv_name: updatedNseData?.INVESTOR_NAME,
      Dob: updatedNseData?.DATE_OF_BIRTH,
      addr1: updatedNseData?.ADDRESS1,
      addr2: updatedNseData?.ADDRESS2,
      addr3: updatedNseData?.ADDRESS3,
      City: updatedNseData?.CITY,
      State: updatedNseData?.STATE,
      Pincode: updatedNseData?.PINCODE,
      Country: updatedNseData?.COUNTRY,
      mobile_no: updatedNseData?.MOBILE_NO,
      Email: updatedNseData?.EMAIL,
      bank_name: updatedNseData?.BANK_NAME,
      acc_no: updatedNseData?.AC_NO,
      acc_type: updatedNseData?.AC_TYPE,
      ifsc_code: updatedNseData?.IFSC_CODE,
      branch_name: updatedNseData?.BRANCH_NAME,
      branch_addr1: updatedNseData?.BRANCH_ADDRESS1,
      branch_addr2: updatedNseData?.BRANCH_ADDRESS2,
      branch_addr3: updatedNseData?.BRANCH_ADDRESS3,
      mobile_relation: extraNseDetails?.mobile_relation,
      email_relation: extraNseDetails?.email_relation,
      NOMINEE_OPTED: updatedNseData?.NOM1_NAME
        ? "Y"
        : extraNseDetails?.NOMINEE_OPTED,
      NOM1_PAN: extraNseDetails?.NOM1_PAN,
      broker_code: updatedNseData?.BROK_DLR_CODE,
    };

    updateNseRegistration(nseData, token);

    setShowNseInputs(false);
  };

  const getTransactions = (data) => {
    let formatted = [];
    let format = {};
    const d = new Date();
    for (let item in data) {
      let i = data[item];
      delete i.image_path;
      format = {
        ...i,
        // folio: "",
        sip_amount: parseInt(data[item].amount),
      };
      //if (props.route.params.fromCart) {
      //format = {
      //amc: data[item].amc,
      //amount: data[item].sip_amount,
      //folio: "",
      //product_code: data[item].product_code,
      //reinvest: "Z",
      //sip_amount: data[item].amount,
      //sip_freq: "OM",
      //sip_from_date: data[item]?.sip_from_date
      //? data[item]?.sip_from_date
      //: sipFromDate(
      //data[item]?.sipDates
      //? data[item]?.sipDates[0]
      //: data[item]?.default_date
      //),
      //sip_end_date: data[item]?.sip_end_date
      //? data[item]?.sip_end_date
      //: sipEndDate(
      //data[item]?.sipDates
      //? data[item]?.sipDates[0]
      //: data[item]?.default_date
      //),
      ////sip_period_day: getPeriodDay(d.getDate(), d.getMonth()),
      //sip_period_day: data[item]?.sip_period_day
      //? data[item]?.sip_period_day
      //: data[item].sipDates[0],
      //};
      //} else if (props.route.params.fromPlanGoals) {
      //format = {
      //amc: data[item].schemeInfo.amc_code,
      //amount: data[item].schemeInfo.sip,
      //folio: "",
      //product_code: data[item].schemeInfo.productCode,
      //reinvest: "Z",
      //sip_amount: data[item].schemeInfo.sip
      //? data[item].schemeInfo?.sip
      //: props.route.params?.showModified
      //? data[item].schemeInfo?.allocationAmountModifiled
      //? data[item].schemeInfo?.allocationAmountModifiled.toFixed(0)
      //: 0
      //: data[item].schemeInfo?.allocationAmount
      //? data[item].schemeInfo?.allocationAmount.toFixed(0)
      //: 0,
      //sip_end_date: sipEndDate(data[item].schemeInfo.sipDates[0]),
      //sip_freq: "OM",
      //sip_from_date: sipFromDate(data[item].schemeInfo.sipDates[0]),
      ////sip_period_day: getPeriodDay(d.getDate(), d.getMonth()),
      //sip_period_day:
      //data[item].schemeInfo.sipDates[0] == 0
      //? 1
      //: data[item].schemeInfo.sipDates[0],
      //};
      //} else {
      //format = {
      //amc: data[item].amc_code,
      //amount: data[item].sip,
      //folio: "",
      //product_code: data[item].productCode,
      //reinvest: "Z",
      //sip_amount: data[item].sip,
      //sip_end_date: sipEndDate(data[item].sipDates[0]),
      //sip_freq: "OM",
      //sip_from_date: sipFromDate(data[item].sipDates[0]),
      ////sip_period_day: getPeriodDay(d.getDate(), d.getMonth()),
      //sip_period_day:
      //data[item].sipDates[0] == 0 ? 1 : data[item].sipDates[0],
      //};
      //}
      formatted.push(format);
    }
    return formatted;
  };

  const getPaymentMode = (upi, mandate) => {
    if (upi) {
      return "UPI";
    } else if (mandate) {
      return "M";
    } else {
      return "OL";
    }
  };

  const showNseDetailsAlert = () => {
    Alert.alert(
      "Details Missing!",
      "Verification e-mails are being triggered by NSE every week to your registered e-mail ID. Please verify to proceed further with the payment.",
      [
        {
          text: "Go Back to HomeScreen",
          onPress: () => props.navigation.navigate("Home"),
        },
        {
          text: "I have already verified",
          onPress: () => setAlreadySubmitted(true),
        },
      ]
    );
  };

  const getParams = (upi, mandate) => {
    // console.log(
    //   "🚀 ~ getParams ~ props.route.params?.cart:",
    //   props.route.params?.cart
    // );
    // return;

    return {
      service_request: {
        ac_no: profile?.AC_NO,
        ach_amt: res?.responseString?.length
          ? props?.route?.params?.sum
          : 100000,
        ach_enddate: endDate(),
        ach_fromdate: fromDate(),
        advisory_charge: " ",
        bank: profile?.BANK_NAME,
        billdesk_bank: profile?.BANK_NAME,
        cheque_deposit_mode: " ",
        Client_callback_url:
          "http://sipfund.com/SIP-Login/build/app/index.html#/paymentStatus",
        // https://sipfund.com/SIP-Login/build/app/index.html#/netstatus
        // Client_callback_url: "www.sipfund.com",
        dd_charge: " ",
        debit_amount_type: "M",
        demat_user: "N",
        dp_id: " ",
        euin: " ",
        euin_opted: "N",
        ifsc_code: profile?.IFSC_CODE,
        iin: user?.IIN,
        instrm_ac_no: " ",
        instrm_amount: props.route.params?.sum,
        instrm_bank: profile?.BANK_NAME,
        instrm_branch: " ",
        instrm_charges: " ",
        instrm_date: " ",
        instrm_no: " ",
        micr: " ",
        neft_ifsc: " ",
        no_of_nominee: "0",
        nominee1_addr1: " ",
        nominee1_addr2: " ",
        nominee1_addr3: " ",
        nominee1_city: " ",
        nominee1_dob: " ",
        nominee1_guard_name: " ",
        nominee1_guard_pan: " ",
        nominee1_name: " ",
        nominee1_percent: " ",
        nominee1_pincode: " ",
        nominee1_relation: " ",
        nominee1_state: " ",
        nominee2_dob: " ",
        nominee2_guard_name: " ",
        nominee2_guard_pan: " ",
        nominee2_name: " ",
        nominee2_percent: " ",
        nominee2_relation: " ",
        nominee3_dob: " ",
        nominee3_guard_name: " ",
        nominee3_guard_pan: " ",
        nominee3_Name: " ",
        nominee3_percent: " ",
        nominee3_relation: " ",
        nominee_flag: "C",
        payment_mode: getPaymentMode(upi, mandate),
        poa: "N",
        remarks: " ",
        Return_paymnt_flag: "Y",
        rtgs_code: " ",
        sip_ac_type: profile?.AC_TYPE,
        sip_acc_no: profile?.AC_NO,
        sip_bank: profile?.BANK_NAME,
        sip_branch: profile?.BRANCH_NAME,
        sip_ifsc_code: profile?.IFSC_CODE,
        sip_micr_no: " ",
        sub_broker_arn_code: " ",
        sub_broker_code: " ",
        sub_trxn_type: props.route.params?.isLumpsum ? "N" : "S",
        trans_count: props.route.params?.cart.length,
        trxn_acceptance: upi || mandate ? "OL" : "ALL",
        trxn_execution: " ",
        umrn: mandate && umrn ? umrn.UMRN_NO : " ",
        until_cancelled: "Y",
        utr: "",
        groupId: props.route.params?.groupId,
        groupType: props.route.params?.groupType,
        groupName: props.route.params?.groupName,
      },
      childtrans: getTransactions(props.route.params?.cart),
      //childtrans: props.route.params?.cart,
    };
  };

  function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  const handleWebviewStateChange = (webViewState) => {
    if (webViewState.url && webViewState.url.includes("/netstatus")) {
      console.log(
        "🚀 ~ handleWebviewStateChange ~ getParameterByName",
        getParameterByName("CustId", webViewState.url)
      );
      setCustId(getParameterByName("CustId", webViewState.url));
      setPaymentRefNo(getParameterByName("PaymentRefNo", webViewState.url));
      setPaymentStatus(getParameterByName("PaymentStatus", webViewState.url));
      setPaymentMsg(getParameterByName("PaymentMsg", webViewState.url));
      resetWebUrl();
      setWebViewActive(false);
      deletCart(
        props.route.params?.cart.map((item) => item._id),
        token
      );
      getCartDetails(token);
    } else if (
      webViewState.url &&
      webViewState.url.includes("play.google.com")
    ) {
      resetWebUrl();
      setWebViewActive(false);
      deletCart(
        props.route.params?.cart.map((item) => item._id),
        token
      );
      getCartDetails(token);
      props.navigation.navigate("Profile");
      props.navigation.navigate("Home");
    }
  };

  // console.log("PaymentStatus=============>", PaymentStatus);
  return (
    <>
      {isFetching && (
        <View
          style={{
            backgroundColor: "#fffe",
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            position: "absolute",
            zIndex: 100,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size={60} color="black" />
        </View>
      )}
      <View style={styles.container}>
        <Header
          leftComponent={
            <TouchableOpacity
              // onPress={() => props.navigation.toggleDrawer()}
              onPress={() => props.navigation.goBack()}
              style={{ marginTop: 25 }}
            >
              {/* <Entypo name={"menu"} size={30} color={Colors.RED} /> */}
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
        />
        <ScrollView style={Styles.containerScroll}>
          {CustId && PaymentRefNo && PaymentStatus && PaymentMsg ? (
            <>
              <View style={styles.container}>
                <Image
                  source={require("../../../assets/payment.png")}
                  style={{ height: 350, width: 400 }}
                />
                <View
                  style={{
                    // alignItems: "flex-start",
                    // borderWidth: 1,
                    // width: "90%",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 22 }}>
                    Your Payment is {`${capitalizeWord(PaymentStatus)}`}
                  </Text>
                  <View
                    style={{
                      // height: 250,
                      width: Dimensions.get("window").width - 40,
                      backgroundColor: "#DEF5FD",
                      marginVertical: 20,
                      borderRadius: 10,
                      elevation: 10,
                      padding: 20,
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontWeight: "bold" }}>Customer ID</Text>
                      <Text style={{ marginLeft: 10 }}>{CustId}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontWeight: "bold" }}>
                        Payment Reference Number
                      </Text>
                      <Text style={{ marginLeft: 10 }}>{PaymentRefNo}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontWeight: "bold" }}>Payment Status</Text>
                      <Text style={{ marginLeft: 10 }}>{PaymentStatus}</Text>
                    </View>
                    <View style={{ flexDirection: "row", width: "60%" }}>
                      <Text style={{ fontWeight: "bold" }}>
                        Payment Message
                      </Text>
                      <Text style={{ marginLeft: 10 }}>{PaymentMsg}</Text>
                    </View>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => {
                        props.navigation.navigate("Home");
                      }}
                      style={{
                        height: 40,
                        width: 150,
                        backgroundColor: "#C03A2B",
                        borderRadius: 20,
                        marginTop: 20,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ color: "white" }}>Go To Dashboard</Text>
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      fontSize: 20,
                      marginVertical: 10,
                      alignItems: "flex-start",
                      width: Dimensions.get("window").width - 40,
                    }}
                  >
                    Thank You for the payment. An automated payment reciept will
                    be sent to your registered email
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <View style={styles.container}>
              <View>
                <Text style={styles.payusing}>Pay Using</Text>
              </View>
              <View style={styles.mainbox}>
                <View style={styles.button}>
                  <TouchableOpacity
                    onPress={() => {
                      if (!alreadySubmitted) {
                        if (
                          !updatedNseData?.MOBILE_REL ||
                          !updatedNseData?.EMAIL_REL
                        ) {
                          showNseDetailsAlert();
                          return;
                        }
                      }
                      let params = getParams(true, false);
                      console.log(
                        "Upi",
                        JSON.stringify(params)
                      );
                      setClicked(true);
                      checkout(params, token);
                    }}
                    style={[styles.botton_box, styles.botton_box_none]}
                  >
                    <Image
                      source={require("../../../assets/Upi_img.png")}
                      style={styles.upiImage}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.button}>
                  <TouchableOpacity
                    onPress={() => {
                      /* Check if details are enough for nse */
                      if (!alreadySubmitted) {
                        if (
                          !updatedNseData?.MOBILE_REL ||
                          !updatedNseData?.EMAIL_REL
                        ) {
                          showNseDetailsAlert();
                          return;
                        }
                      }
                      let params = getParams(false, false);
                      setClicked(true);
                      checkout(params, token);
                    }}
                    style={styles.botton_box}
                  >
                    <Text style={styles.get_otp}>Internet Banking</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.button}>
                  <TouchableOpacity
                    onPress={async () => {
                      /* Check if details are enough for nse */
                      if (!alreadySubmitted) {
                        if (
                          !updatedNseData?.MOBILE_REL ||
                          !updatedNseData?.EMAIL_REL
                        ) {
                          showNseDetailsAlert();
                          return;
                        }
                      }

                      if (!res.validFlag) {
                        alert("Something went wrong!");
                        return;
                      }

                      if (!res.responseString.length) {
                        Alert.alert(
                          "No Mandate",
                          "You haven't registered mandate. Do you want to register E-Mandate?",
                          [
                            {
                              text: "Cancel",
                              onPress: () => console.log("Cancel Pressed"),
                              style: "cancel",
                            },
                            {
                              text: "OK",
                              onPress: () => {
                                emandateOptions(token);
                                toggleEmandatePopup(true);
                                //pageActiveEmandate.current = true;
                              },
                            },
                          ]
                        );
                        return;
                      }

                      const data = res.responseString.map(
                        (item) =>
                          `${item.achReports["UMRN_NO"]} (₹${item.achReports["AMOUNT"]})`
                      );
                      setEmandateListsUmrn(data);
                      setVisibleEmandateUmrn(true);
                      //let params = getParams(false, true);
                      //setClicked(true);
                      //checkout(params, token, true);
                    }}
                    style={styles.botton_box}
                  >
                    <Text style={styles.get_otp}>e-Mandate</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
        {webViewActive && (
          <View
            style={{
              position: "absolute",
              backgroundColor: "white",
              zIndex: 100,
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height,
            }}
          >
            <Header
              leftComponent={
                <TouchableOpacity
                  onPress={() => {
                    setWebViewActive(false);
                    //setWebUrl("");
                    resetWebUrl();
                    props.navigation.navigate("Profile");
                    props.navigation.navigate("Home");
                  }}
                  style={{ marginTop: 20 }}
                >
                  <AntDesign name={"arrowleft"} size={30} color={Colors.RED} />
                </TouchableOpacity>
              }
              rightComponent={
                <View
                  style={{
                    marginTop: 25,
                    borderWidth: 1,
                    backgroundColor: Colors.WHITE,
                    borderColor: Colors.RED,
                    padding: 5,
                    borderRadius: 7,
                  }}
                >
                  <Text style={styles.textkn}>
                    {users?.name
                      ? `${users?.name[0]}${users?.name.split(" ").pop()[0]}`
                      : ""}
                  </Text>
                </View>
              }
              backgroundColor={Colors.LIGHT_WHITE}
              containerStyle={Styles.header}
              centerComponent={
                <Image
                  source={require("../../../assets/icon.png")}
                  style={styles.logimg}
                />
              }
            />
            <WebView
              source={{ uri: webUrl }}
              onNavigationStateChange={handleWebviewStateChange}
              onLoadStart={() => {
                setLoading(true);
              }}
              onLoad={() => {
                setLoading(false);
              }}
            />
            {loading && (
              <View
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "40%",
                  height: 80,
                  width: 120,
                  backgroundColor: "white",
                  zIndex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  elevation: 10,
                  borderRadius: 10,
                }}
              >
                <ActivityIndicator size={30} color={Colors.RED} />
                <Text>Loading...</Text>
                <Text>Please Wait</Text>
              </View>
            )}
          </View>
        )}
        <Overlay
          isVisible={visibleEmandateUmrn}
          overlayStyle={{
            margin: 10,
            borderRadius: 10,
            backgroundColor: "#fff",
          }}
        >
          <View style={styles.emaMainbox}>
            <Text style={styles.emaAmc}>Select One UMRN:</Text>
            {emandateListsUmrn.map((item, key) => (
              <TouchableOpacity
                style={{
                  marginVertical: 8,
                }}
                key={key}
                onPress={() => {
                  setVisibleEmandateUmrn(false);
                  let params = getParams(false, true);
                  params = {
                    ...params,
                    service_request: {
                      ...params.service_request,
                      umrn: item.split(" ")[0],
                    },
                  };
                  setClicked(true);
                  checkout(params, token, true);
                  isPageActive.current = true;
                }}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setVisibleEmandateUmrn(false)}>
              <Text style={styles.emaCancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Overlay>
        <Overlay visible={showNseInputs}>
          <Icon
            name="close"
            style={styles.overlayCloseIcon}
            size={25}
            onPress={() => setShowNseInputs(false)}
          />
          <Text style={styles.nseInfoText}>
            As per the regulatory requirement, the following information is
            mandatory before processing payment.
          </Text>
          <View style={styles.overlayContainer}>
            <Text style={styles.occupation}>
              {"Mobile Relation"}
              <Text style={styles.error}>*</Text>
            </Text>
            <MySelectPicker
              values={mobileEmailRelation}
              placeholder={"Select Mobile Relation"}
              defultValue={extraNseDetails?.mobile_relation}
              onChange={(phone) => {
                setExtraNseDetails({
                  ...extraNseDetails,
                  ["mobile_relation"]: phone,
                });
              }}
            />

            <Text style={styles.occupation}>
              {"Email Relation"}
              <Text style={styles.error}>*</Text>
            </Text>
            <MySelectPicker
              values={mobileEmailRelation}
              placeholder={"Select email Relation"}
              defultValue={extraNseDetails?.email_relation}
              onChange={(mailRelation) => {
                setExtraNseDetails({
                  ...extraNseDetails,
                  ["email_relation"]: mailRelation,
                });
              }}
            />

            <TouchableOpacity
              onPress={handleSubmitExtraNseDetails}
              style={styles.botton_box2}
            >
              <Text style={styles.get_otp2}>Next</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setAlreadySubmitted(true);
                setShowNseInputs(false);
              }}
            >
              <Text style={styles.link}>I have already submitted</Text>
            </TouchableOpacity>
          </View>
        </Overlay>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    borderBottomColor: Colors.BLACK,
    borderBottomWidth: 1,
  },
  logimg: {
    height: 65,
    width: 203,
    marginTop: 10,
  },
  upiImage: {
    height: 43,
    width: 122,
  },
  textkn: {
    fontSize: 22,
    color: Colors.RED,
    fontWeight: "bold",
  },
  payusing: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 20,
  },
  mainbox: {
    margin: 5,
    width: "80%",
    backgroundColor: "#f9f9f9",
    borderRadius: 20,
    alignItems: "center",
  },
  button: {
    width: "90%",
    borderWidth: 1,
    borderColor: Colors.RED,
    borderStyle: "solid",
    marginVertical: 20,
  },
  botton_box: {
    alignItems: "center",
    //marginVertical: 10,
    paddingVertical: 10,
    height: 60,
    //marginTop: 20,
  },
  botton_box_none: {
    //marginTop: 5,
    //marginBottom: 5,
  },
  get_otp: {
    color: Colors.BLACK,
    fontSize: 20,
    fontWeight: "bold",
    textAlignVertical: "center",
    flex: 1,
  },
  emaMainbox: {
    margin: 10,
    padding: 10,
  },
  emaAmc: {
    fontSize: 18,
    //marginLeft: 15,
    marginVertical: 10,
    fontWeight: "bold",
  },
  emaMutual_fund: {
    fontSize: 15,
    marginVertical: 10,
  },
  emaCancel: {
    fontSize: 15,
    marginTop: 15,
    color: Colors.RED,
  },
  //mainbox: {
  //padding: 10,
  //},
  amc: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputsec: {
    borderBottomWidth: 1,
    borderColor: Colors.GRAY_LIGHT,
    width: "95%",
    marginTop: 5,
  },
  refreshcode: {
    textAlign: "right",
    color: Colors.RED,
    fontSize: 15,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  botton_box2: {
    backgroundColor: Colors.RED,
    marginHorizontal: 30,
    marginVertical: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.DEEP_GRAY,
    paddingVertical: 10,
  },
  get_otp2: {
    color: Colors.WHITE,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  overlayCloseIcon: {
    alignSelf: "flex-end",
    marginRight: 5,
    marginVertical: 5,
  },
  nseInfoText: {
    maxWidth: "90%",
    fontSize: 16,
    paddingVertical: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  overlayContainer: {
    //width: "85%",
  },
  error: {
    color: "#ff0000",
    padding: 5,
  },
  link: {
    color: "red",
    alignSelf: "center",
    marginTop: -10,
    marginBottom: 10,
  },
});
const mapStateToProps = (state) => ({
  token: state.auth.token,
  users: state.auth.user,
  profile: state.auth.profile,
  user: state.auth.user,
  umrn: state.checkout.umrn,
  isFetching: state.checkout.fetching,
  error: state.checkout.error,
  webUrl: state.checkout.webUrl,
  emandateSuccess: state.checkout.emandateSuccess,
  nseDetails: state.registration.nseDetails,
  fatcaDetails: state.registration.fatcaDetails,
  userDetails: state.registration.userDetails,
  updatedNseData: state.registration.updatedNseData,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { AuthActions } = require("../../store/AuthRedux");
  const { CheckoutActions } = require("../../store/CheckoutRedux");
  const { CartActions } = require("../../store/CartActionsRedux");
  const { EmandateActions } = require("../../store/EmandateRedux");
  const { RegistrationActions } = require("../../store/RegistrationRedux");
  return {
    ...stateProps,
    ...ownProps,
    logOut: () => {
      AuthActions.logOut(dispatch);
    },
    getProfile: (params, token) => {
      AuthActions.getProfile(dispatch, params, token);
    },
    checkout: (params, token, mandate) => {
      CheckoutActions.checkoutButton(
        dispatch,
        {
          service_request: params?.service_request,
          childtrans: params?.childtrans,
        },
        token,
        mandate
      );
      // CheckoutActions.checkoutButton(dispatch, params, token, mandate);
    },
    getUMRN: (iin, token) => {
      CheckoutActions.getUMRN(dispatch, iin, token);
    },
    resetWebUrl: () => {
      CheckoutActions.resetWebUrl(dispatch);
    },
    deletCart: (items, token) => {
      CartActions.deletCart(dispatch, items, token);
    },
    getCartDetails: (token) => {
      CartActions.cartDetails(dispatch, token);
    },
    emandateOptions: (token) => {
      EmandateActions.emandateOptions(dispatch, token);
    },
    toggleEmandatePopup: (state) => {
      EmandateActions.toggleEmandatePopup(dispatch, state);
    },
    updateNseRegistration: (params, token) => {
      RegistrationActions.updateNseRegistration(dispatch, params, token);
    },
    updateRegister: (params, token) => {
      RegistrationActions.updateRegister(dispatch, params, token);
    },
    fetchNseData: (iin, token) => {
      RegistrationActions.fetchNseData(dispatch, iin, token);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(UpiScreen);
