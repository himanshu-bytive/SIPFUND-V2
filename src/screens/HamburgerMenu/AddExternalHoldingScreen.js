import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { MySelectPicker, MyDatePicker, MyTextInput } from "../../components";
import { Styles, Config, Colors, FormValidate } from "../../common";
import { Entypo, AntDesign } from "react-native-vector-icons";
import { Header, Overlay } from "react-native-elements";

function AddExternalHoldingScreen(props) {
  const {
    isFetching,
    token,
    users,
    userDetails,
    fetchAmcLists,
    amcLists,
    getSchemeList,
    schemeDetails,
    addExternalHoldingLumpsum,
  } = props;
  const pageActive = useRef(false);
  const [selectTab, setSelectTab] = useState("LUMPSUM");
  const toggleTab = (value) => {
    setSelectTab(value);
  };
  const [AMCS, setAMCS] = useState([]);
  const [schemeList, setScheme] = useState([]);
  const [schemeSet, setSchemeSet] = useState(false);

  const [state, setState] = useState({
    amc: "",
    scheme: "",
    transation: "",
    folio: "",
    amount: "",
    start: "",
    end: "",
  });

  const [errors, setErrors] = useState({
    amc: null,
    scheme: null,
    transation: null,
    folio: null,
    amount: null,
    start: null,
    end: null,
  });

  useEffect(() => {
    fetchAmcLists(token);
  }, []);

  useEffect(() => {
    if (schemeSet && !isFetching) {
      setSchemeSet(false);
      //alert("Holding added succesfully!");
      setState({
        amc: "",
        scheme: "",
        transation: "",
        folio: "",
        amount: "",
        start: "",
        end: "",
      });
      props.navigation.goBack();
    }
  }, [isFetching, schemeSet]);

  useEffect(() => {
    const AMCS = amcLists
      ? amcLists.map((item) => ({
          value: item.AMC_CODE,
          label: String(item.LONG_NAME),
        }))
      : [];
    setAMCS(AMCS);
  }, [amcLists]);

  useEffect(() => {
    const schemeList = schemeDetails
      ? schemeDetails.map((item) => ({
          value: item.productKey,
          label: String(item.PRODUCT_LONG_NAME),
        }))
      : [];
    setScheme(schemeList);
  }, [schemeDetails]);

  const onAction = async () => {
    setSchemeSet(true);

    const { amc, scheme, transation, folio, amount, start, end } = state;
    if (!amc) {
      setErrors({ ...errors, amc: "Please Select a AMC" });
      return;
    }
    if (!scheme) {
      setErrors({ ...errors, scheme: "Please Select a Scheme" });
      return;
    }
    if (selectTab == "SIP") {
      if (!transation) {
        setErrors({ ...errors, transation: "Please Select a Sip Date" });
        return;
      }
      if (!start) {
        setErrors({ ...errors, start: "Please Select a Sip Start Date" });
        return;
      }
      if (!end) {
        setErrors({ ...errors, end: "Please Select a Sip End Date" });
        return;
      }
    } else {
      if (!transation) {
        setErrors({ ...errors, transation: "Please Select a Transation Date" });
        return;
      }
    }
    if (!folio) {
      setErrors({ ...errors, folio: "Please Add a Folio" });
      return;
    }
    if (!amount) {
      setErrors({ ...errors, amount: "Please Add a Amount" });
      return;
    }
    let selAMC = amcLists.find((x) => x.AMC_CODE === amc);
    let product = schemeDetails.find((x) => x.productKey === scheme);
    let params = {
      amcCode: selAMC.AMC_CODE,
      amcName: selAMC.LONG_NAME,
      productKey: product.productKey,
      prodCode: product.PRODUCT_CODE,
      prodName: product.PRODUCT_LONG_NAME,
      trxnNo: "",
      folioNo: folio,
      tradDate: transation.getTime(),
      amount: amount,
      trxnType: selectTab == "SIP"?"sip":"NEWPUR",
      trxnMetaData: {},
      isinNo: product.ISIN,
      type: "",
    };
    if (selectTab == "SIP") {
      params.trxnMetaData = {
        sipStartDate: start.getTime(),
        sipEndDate: end.getTime(),
        sipDay: "1",
      };
      params.type = "sip";
    }
    console.log("🚀 ~ onAction ~ params:", JSON.stringify(params))
    addExternalHoldingLumpsum(params, token);
    pageActive.current = true;
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
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Toprated")}
            style={{ marginTop: 20 }}
          >
            <AntDesign name={"shoppingcart"} size={30} color={Colors.RED} />
          </TouchableOpacity>
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
      {isFetching && (
        <View style={Styles.loading}>
          <ActivityIndicator color={Colors.BLACK} size="large" />
        </View>
      )}

      <ScrollView style={styles.containerScroll}>
        <View style={styles.switch_sec}>
          <Text style={styles.transaction}>External Holdings</Text>
          <View style={styles.tab_sec}>
            <TouchableOpacity
              onPress={() => toggleTab("LUMPSUM")}
              style={selectTab == "LUMPSUM" ? styles.tab1 : styles.tab2}
            >
              <Text
                style={
                  selectTab == "LUMPSUM" ? styles.switch : styles.switchAct
                }
              >
                LUMPSUM
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => toggleTab("SIP")}
              style={selectTab == "SIP" ? styles.tab1 : styles.tab2}
            >
              <Text
                style={selectTab == "SIP" ? styles.switch : styles.switchAct}
              >
                SIP
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {selectTab == "LUMPSUM" && (
          <View style={styles.container_sec}>
            <View>
              <Text style={styles.occupation}>
                Select AMC <Text style={styles.error}>*</Text>
              </Text>
              <MySelectPicker
                values={AMCS}
                defultValue={state.amc}
                error={errors.amc}
                onChange={(amc) => {
                  setErrors({ ...errors, amc: null });
                  setState({ ...state, amc, scheme: "" });
                  getSchemeList(amc, token);
                }}
              />
            </View>

            <View>
              <Text style={styles.occupation}>
                Select Scheme <Text style={styles.error}>*</Text>
              </Text>
              <MySelectPicker
                values={schemeList}
                defultValue={state.scheme}
                error={errors.scheme}
                onChange={(scheme) => {
                  setErrors({ ...errors, scheme: null });
                  setState({ ...state, scheme });
                }}
              />
            </View>

            <View>
              <Text style={styles.occupation}>
                Transaction Date <Text style={styles.error}>*</Text>
              </Text>
              <MyDatePicker
                defultValue={state.transation}
                error={errors.transation}
                onChange={(transation) => {
                  setErrors({ ...errors, transation: null });
                  setState({ ...state, transation });
                }}
              />
            </View>

            <View>
              <Text style={styles.occupation}>
                Folio No <Text style={styles.error}>*</Text>
              </Text>
              <MyTextInput
                placeholder={"Folio No"}
                keyboardType="numeric"
                value={state.folio}
                error={errors.folio}
                onChangeText={(folio) => {
                  setErrors({ ...errors, folio: null });
                  setState({ ...state, folio });
                }}
              />
            </View>

            <View>
              <Text style={styles.occupation}>
                Amount INR <Text style={styles.error}>*</Text>
              </Text>
              <MyTextInput
                placeholder={"Amount"}
                keyboardType="numeric"
                value={state.amount}
                error={errors.amount}
                onChangeText={(amount) => {
                  setErrors({ ...errors, amount: null });
                  setState({ ...state, amount });
                }}
              />
            </View>
          </View>
        )}

        {selectTab == "SIP" && (
          <View style={styles.container_sec}>
            <View>
              <Text style={styles.occupation}>
                Select AMC <Text style={styles.error}>*</Text>
              </Text>
              <MySelectPicker
                values={AMCS}
                defultValue={state.amc}
                error={errors.amc}
                onChange={(amc) => {
                  setErrors({ ...errors, amc: null });
                  setState({ ...state, amc, scheme: "" });
                  getSchemeList(amc, token);
                }}
              />
            </View>

            <View>
              <Text style={styles.occupation}>
                Select Scheme <Text style={styles.error}>*</Text>
              </Text>
              <MySelectPicker
                values={schemeList}
                defultValue={state.scheme}
                error={errors.scheme}
                onChange={(scheme) => {
                  setErrors({ ...errors, scheme: null });
                  setState({ ...state, scheme });
                }}
              />
            </View>

            <View>
              <Text style={styles.occupation}>
                Sip Date <Text style={styles.error}>*</Text>
              </Text>
              <MyDatePicker
                defultValue={state.transation}
                error={errors.transation}
                onChange={(transation) => {
                  setErrors({ ...errors, transation: null });
                  setState({ ...state, transation, start: transation });
                }}
                noDefaultDate={true}
              />
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Text style={styles.occupation}>
                  Start Date <Text style={styles.error}>*</Text>
                </Text>
                <MyDatePicker
                  defultValue={state.start}
                  error={errors.start}
                  onChange={(start) => {
                    setErrors({ ...errors, start: null });
                    setState({ ...state, start, transation: start });
                  }}
                  noDefaultDate={true}
                />
              </View>

              <View>
                <Text style={styles.occupation}>
                  End Date <Text style={styles.error}>*</Text>
                </Text>
                <MyDatePicker
                  defultValue={state.end}
                  error={errors.end}
                  onChange={(end) => {
                    setErrors({ ...errors, end: null });
                    setState({ ...state, end });
                  }}
                  noMaxDate={true}
                  noDefaultDate={true}
                />
              </View>
            </View>

            <View>
              <Text style={styles.occupation}>
                Folio No <Text style={styles.error}>*</Text>
              </Text>
              <MyTextInput
                placeholder={"Folio No"}
                keyboardType="numeric"
                value={state.folio}
                error={errors.folio}
                onChangeText={(folio) => {
                  setErrors({ ...errors, folio: null });
                  setState({ ...state, folio });
                }}
              />
            </View>

            <View>
              <Text style={styles.occupation}>
                Amount INR <Text style={styles.error}>*</Text>
              </Text>
              <MyTextInput
                placeholder={"Amount"}
                keyboardType="numeric"
                value={state.amount}
                error={errors.amount}
                onChangeText={(amount) => {
                  setErrors({ ...errors, amount: null });
                  setState({ ...state, amount });
                }}
              />
            </View>
          </View>
        )}
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.click_box}>
          <TouchableOpacity onPress={onAction} style={styles.botton_box}>
            <Text style={styles.get_otp}>Add To My Holding</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  container_sec: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  logimg: {
    height: 65,
    width: 203,
    marginTop: 10,
  },
  error: {
    color: "#ff0000",
    padding: 5,
  },
  occupation: {
    fontSize: 15,
    color: Colors.DEEP_GRAY,
    fontWeight: "bold",
    marginTop: 10,
  },
  example: {
    fontSize: 15,
    marginTop: 10,
  },
  private_sector: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 5,
  },
  private: {
    fontSize: 15,
    width: "92%",
    marginBottom: 2,
  },
  Pincode: {
    color: Colors.RED,
    fontSize: 15,
    marginTop: 10,
  },
  footer: {
    alignItems: "center",
    marginBottom: 20,
  },

  click_box: {
    flexDirection: "row",
    marginHorizontal: 25,
  },
  botton_box: {
    width: "50%",
    backgroundColor: Colors.RED,
    paddingVertical: 10,
    marginTop: 20,
    borderColor: Colors.DEEP_GRAY,
    marginHorizontal: 5,
  },
  get_otp: {
    color: Colors.WHITE,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

const mapStateToProps = (state) => ({
  token: state.auth.token,
  users: state.auth.user,
  userDetails: state.registration.userDetails,
  isFetching: state.switch.isFetching,
  amcLists: state.switch.amcLists,
  schemeDetails: state.switch.schemeDetails,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { SwitchActions } = require("../../store/SwitchRedux");
  return {
    ...stateProps,
    ...ownProps,
    fetchAmcLists: (token) => {
      SwitchActions.fetchAmcLists(dispatch, token);
    },
    getSchemeList: (params, token) => {
      SwitchActions.getSchemeList(dispatch, params, token);
    },
    addExternalHoldingLumpsum: (params, token) => {
      SwitchActions.addExternalHoldingLumpsum(dispatch, params, token);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(AddExternalHoldingScreen);
