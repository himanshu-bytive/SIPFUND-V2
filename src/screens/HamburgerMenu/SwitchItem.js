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
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Header, Overlay, CheckBox, colors } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";

function SwitchItem(props) {
  const {
    item,
    keys,
    setAddedScheme,
    index,
    remove,
    type,
    // targetCode,
    // targetReinvest,
    // amcScheme,
    setAmcCode,
    getSchemeList,
    token,
    navToSchemeList,
    setSchemeListKey,
    Scheme,
    values,
  } = props;
  const [amount, setAmount] = useState(true);
  const [allUnits, setAllUnits] = useState(false);
  const [amountValue, setAmountValue] = useState("");
  const [schemeIndex, setSchemeIndex] = useState();
  const [selectedScheme, setSelectedScheme] = useState("");

  useEffect(() => {
    if (Scheme && Scheme !== null) {
      if (Scheme.key === `${index}${item.scheme}`) {
        setSelectedScheme(Scheme);
      }
    }
  }, [Scheme]);

  const toggleRadio = (identifier) => {
    // setToggle(key);

    if (selectedScheme === "") {
      alert("Please select the scheme");
      return;
    }
    if (identifier === "AMOUNT") {
      setAmount(true);
      setAllUnits(false);
    } else {
      setAllUnits(true);
      setAmount(false);
    }
  };

  const selectScheme = (params, index) => {
    if (keys.indexOf(index) !== -1) {
      remove(index);
    }
    // console.log("Index=", index);
    setAmcCode(params);
    setSchemeIndex(index);
    getSchemeList(params, token);
    setSchemeListKey(index);
    navToSchemeList(true);
    // props.navigation.navigate("SchemeList");
  };

  const add = (
    key,
    longName,
    units,
    folio,
    currentvalue,
    identifier,
    productAmcName,
    amcCode,
    productCode,
    sourceReinvest,
    groupId,
    groupName,
    groupType
  ) => {
    if (selectedScheme === "") {
      alert("Please select the scheme");
      return;
    }
    if (amount && amountValue.length === 0) {
      alert("Please Enter the amount");
      return;
    }
    if (
      selectedScheme !== "" &&
      (amount && amountValue.length === 0 ? false : true)
    ) {
      console.log("AMOUNT=", amountValue.length);
      console.log("value=", typeof value);
      if (amount && +amountValue > currentvalue) {
        console.log("here");
        Alert.alert("Alert", "Amount should be less than value");
        return;
      }
      let value;
      let valueName;
      if (amount === true) {
        valueName = "Amount";
        value = amountValue;
      } else {
        valueName = "Unit";
        value = units;
      }
      let newElement = {
        key: key,
        amcCode: amcCode,
        productAmcName: productAmcName,
        productCode: productCode,
        targetCode: selectedScheme.targetCode,
        sourceReinvest: sourceReinvest,
        targetReinvest: selectedScheme.targetReinvest,
        fromScheme: longName,
        toScheme: selectedScheme.amcScheme,
        folioNo: folio,
        valueName: valueName,
        value: value,
        type: identifier,
        groupId,
        groupName,
        groupType,
      };
      // setKeys((prevState) => [...prevState, key]);
      setAddedScheme(key, newElement);
      console.log("NEwss ElementSSSSSS=", newElement);
    }
  };

  return (
    <View style={styles.fund_sec}>
      <View style={styles.axis_sec}>
        <Text style={styles.axis}>
          {item?.nseSchemeDetails?.productAmcName}
        </Text>
      </View>
      <View style={styles.growth_sec}>
        <Text style={styles.axis_treasury}>{item.scheme}</Text>
        <Text style={{color:"black"}}>
          {item?.groupName} {item?.groupType ? `(${item?.groupType})` : ""}
        </Text>
        <View style={styles.value_sec}>
          <View style={styles.folio_sec}>
            <Text style={styles.folio}>Folio</Text>
            <Text style={styles.folio}>{item.folio_no}</Text>
          </View>

          <View style={styles.folio_sec}>
            <Text style={styles.folio}>Units</Text>
            <Text style={styles.folio}>
              {parseFloat(item.units).toFixed(3)}
            </Text>
          </View>

          <View style={styles.folio_sec}>
            <Text style={styles.folio}>value</Text>
            <Text style={styles.folio}>
              {parseFloat(item.currentValue).toFixed(3)}
            </Text>
          </View>
        </View>
        <Text style={styles.folio}>Switch To</Text>

        <TouchableOpacity
          onPress={() => selectScheme(item.amc_code, `${index}${item.scheme}`)}
        >
          <View style={styles.scheme_sec}>
            <Text style={styles.select}>
              {selectedScheme !== ""
                ? selectedScheme.amcScheme
                : "Select Scheme"}
            </Text>
            <AntDesign name="right" size={15} />
          </View>
        </TouchableOpacity>
        <View style={styles.units_sec}>
          <CheckBox
            containerStyle={{
              backgroundColor: Colors.TRANSPARENT,
              borderColor: Colors.TRANSPARENT,
            }}
            checkedColor={
              keys !== [] && keys.indexOf(`${index}${item.scheme}`) === -1
                ? Colors.RED
                : Colors.GRAY_DEEP_1
            }
            checked={amount === false ? false : true}
            title="Amount"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            onPress={() => toggleRadio("AMOUNT")}
            disabled={
              keys !== [] && keys.indexOf(`${index}${item.scheme}`) === -1
                ? false
                : true
            }
          />

          <CheckBox
            containerStyle={{
              backgroundColor: Colors.TRANSPARENT,
              borderColor: Colors.TRANSPARENT,
            }}
            checked={allUnits === true ? true : false}
            checkedColor={
              keys !== [] && keys.indexOf(`${index}${item.scheme}`) === -1
                ? Colors.RED
                : Colors.GRAY_DEEP_1
            }
            title="All Units"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            onPress={() => toggleRadio("ALLUNITS")}
            disabled={
              keys !== [] && keys.indexOf(`${index}${item.scheme}`) === -1
                ? false
                : true
            }
          />
        </View>
        <View style={styles.input_box}>
          {allUnits === true ? (
            <TextInput
              style={styles.inputsec}
              placeholder={`${parseFloat(item.units).toFixed(3)}`}
              placeholderTextColor={"grey"}
              editable={false}
              selectTextOnFocus={false}
            />
          ) : (
            <TextInput
              style={styles.inputsec}
              keyboardType="numeric"
              placeholder="Enter Amount"
              placeholderTextColor={"grey"}
              value={
                values.filter((i) => i.folioNo === item.folio_no)[0]?.value
              }
              onChangeText={setAmountValue}
              editable={
                keys !== [] && keys.indexOf(`${index}${item.scheme}`) === -1
                  ? true
                  : false
              }
            />
          )}
          {keys !== [] && keys.indexOf(`${index}${item.scheme}`) === -1 ? (
            <Text />
          ) : (
            <TouchableOpacity onPress={() => remove(`${index}${item.scheme}`)}>
              <Entypo name={"cross"} size={30} color={Colors.RED} />
            </TouchableOpacity>
          )}

          {keys !== [] && keys.indexOf(`${index}${item.scheme}`) === -1 ? (
            <TouchableOpacity
              onPress={() => {
                add(
                  `${index}${item.scheme}`,
                  item.scheme,
                  item.units,
                  item.folio_no,
                  item.currentValue,
                  type === "SWITCH" ? "SWITCH" : "EXTERNAL",
                  item.nseSchemeDetails.productAmcName,
                  item.amc_code,
                  item.nseSchemeDetails.productCode,
                  item.nseSchemeDetails.reinvestTag,
                  item.groupId,
                  item.groupName,
                  item.groupType
                );
              }}
              style={styles.botton_box}
            >
              <Text style={styles.get_otp}>ADD</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.disabledBox}>
              <Text style={styles.disabled}>ADDED</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D3D6DB",
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
    color:"black"
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
    color:"black"
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
  schemeDetails: state.switch.schemeDetails,
  //   amcScheme: state.switch.amcScheme,
  //   targetCode: state.switch.targetCode,
  //   targetReinvest: state.switch.targetReinvest,
  Scheme: state.switch.Scheme,
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
    getSchemeList: (params, token) => {
      SwitchActions.getSchemeList(dispatch, params, token);
    },
    setAmcCode: (params) => {
      SwitchActions.setAmcCode(dispatch, params);
    },
    setSchemeListKey: (params) => {
      SwitchActions.setSchemeListKey(dispatch, params);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(SwitchItem);
