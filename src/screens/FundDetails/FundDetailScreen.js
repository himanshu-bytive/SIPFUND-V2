/** @format */

import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ToastAndroid,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import { Styles, Config, Colors, FormValidate } from "../../common";

import AntDesign  from "react-native-vector-icons/AntDesign";
import ReturnsCalculator from "./ReturnsCalculator";
import Returns from "./Returns";
import Top10Holdings from "./Top10Holdings";
import MinimumInvestments from "./MinimumInvestments";
import PerformanceHistory from "./PerformanceHistory";
import PortfolioSummary from "./PortfolioSummary";
import RiskRating from "./RiskRating";
import ExpenseRatio from "./ExpenseRatio";
import FundManagers from "./FundManagers";
import Toast from "react-native-simple-toast";
import { Overlay } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
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

function FundDetailScreen(props) {
  const [fundType, setFundType] = useState([
    { text: "Returns Calculator", show: true },
    // { text: "Returns", show: false },
    { text: "Top Holdings", show: false },
    { text: "Minimum Investments", show: false },
    { text: "Performance History", show: false },
    { text: "Portfolio Summary", show: false },
    { text: "Risk & Rating", show: false },
    { text: "Expense Ratio", show: false },
  ]);
  const [visible, setVisible] = useState(false);
  const [selectTab, setSelectTab] = useState("SIP");
  const [price, setPrice] = useState(0);
  const [states, setStates] = useState({
    amount: "",
    date: "01",
    productName: "",
    productCode: "",
    amcCode: "",
    amcName: "",
    imagePath: "",
    minimumSIPAmount: 0,
    minimumLumpsumAmount: 0,
    dates: [],
  });
  const [item, setItem] = useState({});

  const { token, detailsInfo, addItomToSip } = props;

  const focusInput = React.createRef();

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const invest = (
    imagePath,
    amcCode,
    amcName,
    productCode,
    productName,
    minimumSIPAmount,
    minimumLumpsumAmount,
    newDates
  ) => {
    if (selectTab === "SIP") {
      setPrice(() => states.minimumSIPAmount);
    } else if (selectTab === "LUMPSUM") {
      setPrice(() => states.minimumLumpsumAmount);
    }
    setStates({
      ...states,
      productCode,
      productName,
      amcCode,
      amcName,
      imagePath,
      minimumSIPAmount,
      minimumLumpsumAmount,
      groupType: "toprated",
      dates: newDates,
    });
    setVisible(!visible);
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
      `${parseInt(year) + 30}`
    );
  };

  const toggleTab = (tab) => {
    if (tab === "SIP") {
      setPrice(() => states.minimumSIPAmount);
    } else if (tab === "LUMPSUM") {
      setPrice(() => states.minimumLumpsumAmount);
    }
    setSelectTab(tab);
  };

  const numberWithCommas = (x) => {
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != "") lastThree = "," + lastThree;
    var res =
      "₹" + otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
  };

  const removeSpecialChars = (val) => {
    let string = val
      .replace(/[&\/\\#,+()$~%.'":*?<>{}₹]/g, "")
      .replace(/^0+(?=\d)/, "");

    if (string) {
      setPrice(() => string);
    } else {
      setPrice(() => 0);
    }
  };

  const addToCartLumpSum = () => {
    let priceNew = price;
    if (parseInt(price) >= 0) {
      if (price < states?.minimumLumpsumAmount) {
        alert("Amount is less than minimum amount");
        return;
      }
    } else {
      priceNew = states?.minimumLumpsumAmount;
    }

    let params = {
      cartDetails: {
        trxn_nature: "N",
        amc: states.amcCode,
        amc_name: states.amcName,
        folio: "",
        product_code: states.productCode,
        product_name: states.productName,
        reinvest: "Z",
        amount: priceNew,
        sip_amount: price,
        image_path: states.imagePath,
        groupType: "toprated",
      },
    };
    toggleOverlay();
    addItomToSip(params, token);
  };

  const addToCartSip = () => {
    let priceNew = price;
    if (parseInt(price) >= 0) {
      if (price < states?.minimumSIPAmount) {
        alert("Amount is less than minimum amount");
        return;
      }
    } else {
      priceNew = states?.minimumSIPAmount;
    }
    let params = {
      cartDetails: {
        trxn_nature: "S",
        sip_period_day: states.date,
        sip_from_date: sipFromDate(states.date),
        sip_freq: "OM",
        sip_end_date: sipEndDate(states.date),
        sip_amount: priceNew,
        reinvest: "Z",
        product_name: states.productName,
        product_code: states.productCode,
        folio: "",
        amount: priceNew,
        amc_name: states.amcName,
        amc: states.amcCode,
        image_path: states.imagePath,
        groupType: "toprated",
      },
    };

    toggleOverlay();
    addItomToSip(params, token);
  };

  useEffect(() => {
    if (props.navigation) {
      const focusListener = props.navigation.addListener("willFocus", () => {
        setPrice("");
        setStates({
          ...states,
          amount: "",
          dates: [
            {
              value: "01",
              label: "01",
            },
          ],
        });
      });

      const blurListener = props.navigation.addListener("willBlur", () => {});

      return () => {
        focusListener.remove();
        blurListener.remove();
      };
    }
  }, [props.navigation]);

  const toggleFundType = (key) => {
    let values = JSON.parse(JSON.stringify(fundType));
    values[key].show = !values[key].show;
    setFundType(values);
  };

  const getFundData = async (isin) => {
    const { data } = await axios.get(
      `https://sipfund.com/api/minmax/search?isin=${isin}`
    );

    setItem(data?.responseString);
  };

  useEffect(() => {
    if (detailsInfo?.length) {
      getFundData(detailsInfo?.[0]?._id);
    }
  }, [detailsInfo]);

  return (
    <View style={styles.contain_box}>
      {/* loop start */}
      {fundType.map((item, key) => (
        <View key={key}>
          <View style={styles.bottom_sec}>
            <View style={styles.holding}>
              <View>
                <Text style={styles.holding_text}>
                  {item.text}{" "}
                  {item.text === "Portfolio Summary" && (
                    <Text style={styles.current}>(Current Date)</Text>
                  )}
                </Text>
              </View>
              <View style={styles.holding_icon}>
                <TouchableOpacity onPress={() => toggleFundType(key)}>
                  <AntDesign
                    name={item.show ? "up" : "down"}
                    size={20}
                    color={Colors.RED}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {item.show && (
            <View>
              {item.text === "Returns Calculator" && <ReturnsCalculator />}
              {/* {item.text === "Returns" && <Returns />} */}
              {item.text === "Top Holdings" && <Top10Holdings />}
              {item.text === "Minimum Investments" && <MinimumInvestments />}
              {item.text === "Performance History" && <PerformanceHistory />}
              {item.text === "Portfolio Summary" && <PortfolioSummary />}
              {item.text === "Risk & Rating" && <RiskRating />}
              {item.text === "Expense Ratio" && <ExpenseRatio />}
            </View>
          )}
        </View>
      ))}
      {props?.fromScreen === "Owner" && (
        <View style={styles.submit}>
          <TouchableOpacity
            onPress={() => {
              Toast.show("Fund Selected!", Toast.SHORT);
              props.goBack();
            }}
          >
            <Text style={styles.submit_text}>SELECT FUND</Text>
          </TouchableOpacity>
        </View>
      )}
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={styles.pop_top}>
          <View style={styles.click_sec}>
            <View
              style={
                selectTab == "SIP"
                  ? styles.buttom_botton2
                  : styles.buttom_botton
              }
            >
              <TouchableOpacity onPress={() => toggleTab("SIP")}>
                <Text
                  style={
                    selectTab == "SIP" ? styles.sip_text2 : styles.sip_text
                  }
                >
                  SIP
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={
                selectTab == "LUMPSUM"
                  ? styles.buttom_botton2
                  : styles.buttom_botton
              }
            >
              <TouchableOpacity
                onPress={() => {
                  toggleTab("LUMPSUM");
                }}
              >
                <Text
                  style={
                    selectTab == "LUMPSUM" ? styles.sip_text2 : styles.sip_text
                  }
                >
                  Lumpsum
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {selectTab == "SIP" && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <View style={styles.amount_sec}>
                  <Text style={styles.amount_tex}>Amount</Text>
                  <View style={styles.bordersec}>
                    <TextInput
                      keyboardType={"numeric"}
                      value={numberWithCommas(price)}
                      onChangeText={(amount) => removeSpecialChars(amount)}
                      placeholder="₹0"
                      style={styles.amount_tex2}
                    />
                  </View>
                </View>
                <View style={styles.amount_sec}>
                  <Text style={styles.amount_tex}>Date</Text>
                  <View style={{ marginTop: 10 }}>
                    <RNPickerSelect
                      fixAndroidTouchableBug
                      ref={focusInput}
                      placeholder={{
                        label: "Select a Date",
                        value: null,
                      }}
                      style={{
                        inputIOS: styles.dropDown,
                        inputAndroid: styles.dropDown,
                        placeholder: styles.dropDown,
                        zIndex: 1,
                      }}
                      useNativeAndroidPickerStyle={false}
                      onValueChange={(value) => {
                        setStates({ ...states, date: value });
                      }}
                      value={states?.date}
                      items={states?.dates}
                      // items={selList}
                      Icon={() => {
                        return (
                          <AntDesign
                            name="caretdown"
                            size={15}
                            style={{
                              marginTop: 7,
                              marginRight: -10,
                            }}
                            color="#C0392B"
                          />
                        );
                      }}
                    />
                  </View>
                </View>
              </View>

              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  onPress={addToCartSip}
                  style={styles.buttom_botton2box}
                >
                  <Text style={styles.sip_text2}>Add To Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {selectTab == "LUMPSUM" && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  paddingHorizontal: 50,
                }}
              >
                <View style={styles.amount_sec}>
                  <Text style={styles.amount_tex}>Amount</Text>
                  <View style={styles.bordersec}>
                    <TextInput
                      keyboardType={"numeric"}
                      value={numberWithCommas(price)}
                      onChangeText={(amount) => removeSpecialChars(amount)}
                      placeholder="₹0"
                      style={styles.amount_tex2}
                    />
                  </View>
                </View>
              </View>

              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  onPress={addToCartLumpSum}
                  style={styles.buttom_botton2box}
                >
                  <Text style={styles.sip_text2}>Add To Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Overlay>
      <TouchableOpacity
        style={[styles.botton_box, { width: "100%", marginHorizontal: 0 }]}
        onPress={() => {
          var newDates = item?.sipDates ?? [];
          newDates = newDates?.split(",");
          var newDates = newDates.map((object) => {
            return {
              label: ("0" + object.replace(/\s/g, "")).slice(-2),
              value: ("0" + object.replace(/\s/g, "")).slice(-2),
            };
          });
          invest(
            item.productAMCImage,
            item.productAmcCode,
            item.productAmcName,
            item.productCode,
            item.productName,
            parseInt(item?.minimumSIPAmount) < 1000
              ? 1000
              : parseInt(item?.minimumSIPAmount),
            parseInt(item?.minimumLumpsumAmount) < 1000
              ? 1000
              : parseInt(item?.minimumLumpsumAmount),
            newDates
          );
        }}
      >
        <Text style={styles.get_otp}>INVEST</Text>
      </TouchableOpacity>
    </View>
  );
}

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
  contain: {
    flexDirection: "row",
  },
  bnp: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 7,
    paddingLeft: 20,
  },
  detailimg: {
    height: 42,
    width: 42,
  },

  contain_box: { margin: 20 },
  bottom_sec: { paddingVertical: 10 },
  holding: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: Colors.RED,
    paddingVertical: 5,
  },
  holding_text: {
    fontSize: 18,
    color: Colors.RED,
  },
  holding_icon: {
    position: "absolute",
    right: 0,
    marginTop: 5,
  },
  submit: {
    backgroundColor: Colors.LIGHT_RED,
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  submit_text: {
    fontSize: 25,
    color: Colors.WHITE,
    paddingVertical: 10,
  },

  get_otp: {
    color: Colors.WHITE,
    fontSize: 16,
    marginRight: 5,
    textAlign: "center",
  },
  tax_left: {
    flexDirection: "row",
    width: "66%",
  },
  tax_left_text: {
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 10,
  },
  mainbox: {
    margin: 5,
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.GRAY_LIGHT,
    borderRadius: 20,
  },
  check: {
    fontSize: 15,
    marginLeft: 30,
    marginTop: 10,
  },
  click_box: {
    flexDirection: "row",
    marginHorizontal: 20,
  },
  current: { fontSize: 10 },
  botton_box: {
    width: "50%",
    backgroundColor: Colors.RED,
    paddingVertical: 10,
    marginTop: 20,
    marginBottom: 20,

    borderColor: Colors.DEEP_GRAY,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  get_otp: {
    color: Colors.WHITE,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  botton_box2: {
    width: "50%",
    borderWidth: 1,
    paddingVertical: 10,
    marginTop: 20,
    marginBottom: 20,

    borderColor: Colors.DEEP_GRAY,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  get_otp2: {
    color: Colors.RED,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  amount_box: {
    flexDirection: "row",
    marginVertical: 10,
  },
  amount: {
    fontSize: 18,
    marginLeft: 20,
    width: "73%",
  },
  price: {
    fontSize: 18,
    color: Colors.RED,
  },
  back_sec: {
    flexDirection: "row",
  },
  back1: {
    width: "20%",
    marginHorizontal: 30,
  },
  back_year: {
    fontSize: 18,
    color: Colors.RED,
  },
  back_year2: {
    fontSize: 18,
  },
  rs: {
    fontSize: 20,
    color: Colors.RED,
    marginTop: 10,
    marginLeft: 15,
  },

  with: {
    fontSize: 15,
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 20,
  },
  pop_top: { width: "85%" },
  click_sec: {
    flexDirection: "row",
    paddingVertical: 20,
    justifyContent: "space-evenly",
  },
  buttom_botton: {
    width: "45%",
    borderWidth: 1,
    borderColor: Colors.RED,
    borderRadius: 5,
    marginHorizontal: 2,
    alignItems: "center",
  },
  buttom_botton2: {
    width: "45%",
    borderRadius: 5,
    backgroundColor: Colors.RED,
    marginHorizontal: 2,
    alignItems: "center",
  },
  sip_text: {
    fontSize: 17,
    color: Colors.RED,
    fontWeight: "bold",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  sip_text2: {
    fontSize: 17,
    color: Colors.WHITE,
    fontWeight: "bold",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  amount_sec: { alignItems: "center" },
  bordersec: {
    borderWidth: 1,
    borderColor: Colors.GRAY_DEEP_1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 3,
  },
  new: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 3,
  },
  buttom_botton2box: {
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: Colors.RED,
    marginLeft: 2,
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  amount_tex2: {
    color: Colors.DEEP_GRAY,
    width: 120,
    textAlign: "center",
    paddingVertical: 3,
    fontSize: 18,
  },
  amount_tex: { fontSize: 18 },
  fundRisk: {
    fontSize: 12,
  },
  dropDown: {
    color: Colors.BLACK,
    paddingRight: 5,
    paddingTop: 3,
  },
});

const mapStateToProps = (state) => ({
  token: state.auth.token,
  users: state.auth.users,
  detailsInfo: state.fundDetail.detailsInfo,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { AuthActions } = require("../../store/AuthRedux");
  const { CartActions } = require("../../store/CartActionsRedux");
  return {
    ...stateProps,
    ...ownProps,
    logOut: () => {
      AuthActions.logOut(dispatch);
    },
    addItomToSip: (params, token) => {
      CartActions.addItomToSip(dispatch, params, token);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(FundDetailScreen);
