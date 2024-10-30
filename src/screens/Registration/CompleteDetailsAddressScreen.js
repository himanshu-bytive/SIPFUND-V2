/** @format */

import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Text,
  Keyboard,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import { Styles, Colors } from "../../common";
import { MySelectPicker, MyTextInput } from "../../components";
import { AntDesign } from "react-native-vector-icons";
import { Image, Header } from "react-native-elements";
import Cart from "../../components/Cart";

function CompleteDetailsAddressScreen(props) {
  const pageActive = useRef(false);
  const {
    token,
    updateRegister,
    fatcaDetails,
    nseDetails,
    userDetails,
    statess,
    citys,
    getCitys,
    getPincode,
    pincodeInfo,
    updateSuccess,
    isFetching,
  } = props;
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const [state, setState] = useState({
    address: "",
    pincode: "",
    states: "",
    city: "",
  });

  const [errors, setErrors] = useState({
    address: null,
    pincode: null,
    states: null,
    city: null,
  });

  useEffect(() => {
    if (updateSuccess && pageActive.current) {
      pageActive.current = false;
      props.navigation.navigate("RegisterBankDetails");
    }
  }, [updateSuccess]);

  useEffect(() => {
    if (fatcaDetails || nseDetails || userDetails) {
      // console.log(fatcaDetails, nseDetails, userDetails)
      setState({
        address: nseDetails.addr1,
        pincode: nseDetails.pincode,
        states: nseDetails.state.STATE_CODE,
        city: nseDetails.city.CITY,
      });
      if (nseDetails.state.STATE_CODE) {
        getCitys(nseDetails.state.STATE_CODE, token);
      }
    }
  }, [fatcaDetails, nseDetails, userDetails]);

  useEffect(() => {
    if (statess) {
      const stateList = statess
        ? statess.map((item) => ({
            value: item.STATE_CODE,
            label: String(item.STATE_NAME),
          }))
        : [];
      setStateList(stateList);
    }
    if (citys) {
      let result = citys.reduce(function (r, a) {
        r[a.CITY] = r[a.CITY] || [];
        r[a.CITY].push(a);
        return r;
      }, Object.create(null));
      result = Object.keys(result);
      setCityList(result.map((item) => ({ value: item, label: item })));
    }
  }, [statess, citys]);

  useEffect(() => {
    if (pincodeInfo && pincodeInfo?.stateCode) {
      
      // getCitys(pincodeInfo.stateCode, token);
      setState({
        ...state,
        states: pincodeInfo?.stateCode,
        city: pincodeInfo?.cityName,
      });
    }
  }, [pincodeInfo]);

  useEffect(() => {
    setState({
      ...state,
      // states: pincodeInfo.stateCode,
      city: pincodeInfo?.cityName,
    });
  }, [cityList])
  

  const getStateCitys = async (pincode) => {
    if (pincode && pincode?.length > 5) {
      getPincode(pincode, token);
    }
  };

  const onAction = async () => {
    const { address, pincode, states, city } = state;
    if (!address) {
      setErrors({ ...errors, address: "Please Add a Address" });
      return;
    }
    if (!pincode || pincode.length < 6 || isNaN(pincode)) {
      alert(pincode);
      setErrors({ ...errors, pincode: "Please Enter a Valid Pincode" });
      return;
    }
    if (!states) {
      setErrors({ ...errors, states: "Please Select a Value" });
      return;
    }
    if (!city) {
      setErrors({ ...errors, city: "Please Select a Value" });
      return;
    }
    let params = { ...{ nseDetails }, ...{ fatcaDetails }, ...{ userDetails } };
    let selStates = statess.find((x) => x.STATE_CODE === states);
    let selCity = citys.find((x) => x.CITY === city);
    params.nseDetails.addr1 = address;
    params.nseDetails.pincode = pincode;
    params.nseDetails.state = {
      STATE_CODE: selStates.STATE_CODE,
      STATE_NAME: selStates.STATE_NAME,
    };
    params.nseDetails.city = {
      CITY: selCity.CITY,
      STATE_CODE: selStates.STATE_CODE,
    };
    updateRegister(params, token);
    pageActive.current = true;
  };

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardHeight(parseFloat(e.endCoordinates.height));
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView behavior={"height"} enabled style={styles.container}>
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{ marginTop: 20 }}
          >
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
        {/* container_sec */}
        <View style={styles.container_sec}>
          <Text style={styles.occupation}>
            Address1 (As per address proof) <Text style={styles.error}>*</Text>
          </Text>
          <MyTextInput
            placeholder={"Add Address"}
            value={state.address}
            error={errors.address}
            onChangeText={(address) => {
              setErrors({ ...errors, address: null });
              setState({ ...state, address });
            }}
          />

          {/* DOB/DOI_sec */}
          <Text style={styles.occupation}>
            Pincode <Text style={styles.error}>*</Text>
          </Text>
          <MyTextInput
            placeholder={"Pincode"}
            maxLength={6}
            keyboardType="numeric"
            value={state.pincode}
            error={errors.pincode}
            onChangeText={(pincode) => {
              setErrors({ ...errors, pincode: null });
              setState({ ...state, pincode:pincode,states:null, city: "" });
              getStateCitys(pincode);
              // setErrors({ ...errors, states: null });
                  // setState({ ...state, states:null, city: "" });
            }}
          />

          {/* TITLE_sec */}
          {state.pincode != "" && state.pincode.length > 5 && (
            <View>
              <Text style={styles.occupation}>
                State <Text style={styles.error}>*</Text>
              </Text>
              <MySelectPicker
                values={stateList}
                defultValue={state.states}
                error={errors.states}
                onChange={(states) => {
                  setErrors({ ...errors, states: null });
                  setState({ ...state, states, city: "" });
                  getCitys(states, token);
                }}
              />
            </View>
          )}

          {/* Investor Name_sec */}
          {state.pincode != "" && state.pincode.length > 5  && (
            <View>
              <Text style={styles.occupation}>
                {/* {state.city} */}
                City <Text style={styles.error}>*</Text>
              </Text>
              <MySelectPicker
                values={cityList}
                defultValue={state.city}
                error={errors.city}
                onChange={(city) => {
                  setErrors({ ...errors, city: null });
                  setState({ ...state, city });
                }}
              />
            </View>
          )}
        </View>
      </ScrollView>
      {/* click_box */}
      <View
        style={[
          styles.footer,
          {
            position: "absolute",
            top: Dimensions.get("window").height / 1.2,
            alignSelf: "center",
          },
        ]}
      >
        <View style={styles.click_box}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={styles.botton_box}
          >
            <Text style={styles.get_otp}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onAction} style={styles.botton_box}>
            <Text style={styles.get_otp}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    borderBottomColor: Colors.BLACK,
    borderBottomWidth: 1,
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
  },
  click_box: {
    flexDirection: "row",
    marginHorizontal: 25,
  },
  botton_box: {
    width: "50%",
    backgroundColor: Colors.RED,
    paddingVertical: 10,
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
  nseDetails: state.registration.nseDetails,
  fatcaDetails: state.registration.fatcaDetails,
  userDetails: state.registration.userDetails,
  isFetching: state.registration.isFetching,
  pincodeInfo: state.registration.pincodeInfo,
  statess: state.registration.states,
  citys: state.registration.citys,
  updateSuccess: state.registration.updateSuccess,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { RegistrationActions } = require("../../store/RegistrationRedux");
  return {
    ...stateProps,
    ...ownProps,
    getCitys: (code, token) => {
      RegistrationActions.getCitys(dispatch, code, token);
    },
    getPincode: (code, token) => {
      RegistrationActions.getPincode(dispatch, code, token);
    },
    updateRegister: (params, token) => {
      RegistrationActions.updateRegister(dispatch, params, token);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(CompleteDetailsAddressScreen);
