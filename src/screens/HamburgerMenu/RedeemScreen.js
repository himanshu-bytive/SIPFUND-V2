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
  Alert,
} from "react-native";
import { connect } from "react-redux";
import { Styles, Config, Colors, FormValidate } from "../../common";
import AntDesign  from "react-native-vector-icons/AntDesign";
import { Header, Overlay, CheckBox, colors } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import RedeemItem from "./RedeemItem";
import Cart from "../../components/Cart";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const mutualfund = [
  {
    title: "Axis Treasury Advantage Fund - Growth",
    text: "Folio",
    number: "91075739541",
    text1: "Units",
    number1: "9.211",
    text2: "Value",
    number2: "22372.87",
    text3: "Switch To",
    text4: "Select Scheme",
    button: "ADD",
  },
  {
    title: "Axis Treasury Advantage Fund - Growth",
    text: "Folio",
    number: "91075739541",
    text1: "Units",
    number1: "9.211",
    text2: "Value",
    number2: "22372.87",
    text3: "Switch To",
    text4: "Select Scheme",
    button: "ADD",
  },
];

function RedeemScreen(props) {
  const {
    token,
    fetchTransactionDetails,
    panNumber,
    isInn,
    user,
    switchRes,
    externalSwitch,
    setRedeemCheckoutDetails,
    setRedeemExternalCheckoutDetails,
    getSchemeList,
  } = props;
  const [selectTab, setSelectTab] = useState("REDEEM");
  const [addedScheme, setAddedScheme] = useState([]);
  const [keys, setKeys] = useState([]);

  const toggleTab = (value) => {
    setSelectTab(value);
  };

  useEffect(() => {
    console.log("USER=", user);
    if (user !== null) {
      let params = {
        pan: user.pan,
      };
      console.log("params=", params);
      fetchTransactionDetails(params, token);
    }
  }, [user]);

  // useEffect(() => {
  //   console.log("Added Scheme=", addedScheme);
  //   console.log("typeOf=", typeof addedScheme);
  // }, [addedScheme]);

  const setAddedSchemeFun = (key, newElement) => {
    if (keys.indexOf(key) === -1) {
      setKeys((prevState) => [...prevState, key]);
      setAddedScheme((prevState) => [...prevState, newElement]);
    } else {
      let keyIndex = keys.indexOf(key);
      setAddedScheme((prevState) => prevState[keyIndex] === newElement);
    }
  };

  const remove = (key) => {
    let filteredArray = addedScheme.filter((item) => item.key !== key);
    setAddedScheme(filteredArray);
    let filteredKeys = keys.filter((item) => item !== key);
    setKeys(filteredKeys);
  };

  const RedeemCheckout = () => {
    console.log("RedeemCheckOut");
    let filteredArray = addedScheme.filter((item) => item.type === "REDEEM");
    if (filteredArray.length >= 1) {
      setRedeemCheckoutDetails(filteredArray);
      props.navigation.navigate("RedeemCheckout");
    } else {
      alert("Please add a scheme");
    }
  };
  const RedeemExternalCheckout = () => {
    console.log("ExternalCheckOut");
    let filteredArray = addedScheme.filter((item) => item.type === "EXTERNAL");
    if (filteredArray.length >= 1) {
      setRedeemExternalCheckoutDetails(filteredArray);
      props.navigation.navigate("RedeemCheckout");
    } else {
      alert("Please add a scheme");
    }
  };

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
      <ScrollView style={styles.containerScroll}>
        <View style={styles.switch_sec}>
          <Text style={styles.transaction}>Redeem</Text>
          <View style={styles.tab_sec}>
            <TouchableOpacity
              onPress={() => toggleTab("REDEEM")}
              style={selectTab == "REDEEM" ? styles.tab1 : styles.tab2}
            >
              <Text
                style={selectTab == "REDEEM" ? styles.switch : styles.switchAct}
              >
                REDEEM
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
                EXTERNAL REDEEM
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Axis Mutual Fund_sec... */}
        {console.log("SWITCH REs=", switchRes)}
        {selectTab === "REDEEM" &&
          switchRes &&
          switchRes.map((item, index) => (
            <RedeemItem
              key={`${index}${item.scheme}`}
              item={item}
              index={index}
              values={addedScheme}
              keys={keys}
              setAddedScheme={setAddedSchemeFun}
              remove={remove}
              type="REDEEM"
            />
          ))}
        {selectTab === "EXTERNAL" &&
          externalSwitch &&
          externalSwitch.map((item, index) => (
            <RedeemItem
              key={`${index}${item.scheme}`}
              item={item}
              index={index}
              values={addedScheme}
              keys={keys}
              setAddedScheme={setAddedSchemeFun}
              remove={remove}
              type="EXTERNAL"
            />
          ))}
      </ScrollView>
      <TouchableOpacity
        onPress={() =>
          selectTab === "REDEEM" ? RedeemCheckout() : RedeemExternalCheckout()
        }
        style={styles.botton_box2}
      >
        <Text style={styles.proceed}>PROCEED</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#D3D6DB",
  },

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
    marginVertical: 10,
  },
  growth_sec: {
    padding: 10,
  },
  axis_treasury: {
    fontSize: 13,
    marginBottom: 10,
  },
  value_sec: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
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
    marginVertical: 20,
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
  users: state.auth.users,
  panNumber: state.auth.panNumber,
  isInn: state.registration.isInn,
  user: state.auth.user,
  switchRes: state.switch.switchRes,
  externalSwitch: state.switch.externalSwitch,
  schemeDetails: state.switch.schemeDetails,
  amcScheme: state.switch.amcScheme,
  targetCode: state.switch.targetCode,
  targetReinvest: state.switch.targetReinvest,
  userDetails: state.registration.userDetails,
  nseDetails: state.registration.nseDetails,
  fatcaDetails: state.registration.fatcaDetails,
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
    fetchTransactionDetails: (params, token) => {
      SwitchActions.fetchTransactionDetails(dispatch, params, token);
    },
    getSchemeList: (params, token) => {
      SwitchActions.getSchemeList(dispatch, params, token);
    },
    setRedeemCheckoutDetails: (params) => {
      SwitchActions.setRedeemCheckoutDetails(dispatch, params);
    },
    setRedeemExternalCheckoutDetails: (params) => {
      SwitchActions.setRedeemExternalCheckoutDetails(dispatch, params);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(RedeemScreen);
