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
import AntDesign from "react-native-vector-icons/AntDesign";
import { Image, Header } from "react-native-elements";
import Cart from "../../components/Cart";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

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
      props.navigation.navigate("Reg", { screen: "RegisterBankDetails" });
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
    }
    if (!pincode || pincode.length < 6 || isNaN(pincode)) {
      setErrors({ ...errors, pincode: "Please Enter a Valid Pincode" });
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
    <View behavior={"height"} enabled style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => {
              props.navigation.navigate("OnBoard", { screen: "BirthRelation" });
          }}
          style={styles.arrowButton}
        >
          <AntDesign name={"arrowleft"} size={35} color={Colors.BLACK} />
        </TouchableOpacity>
        <Image
          source={require("../../../assets/icon.png")}
          style={styles.logimg}
        />
      </View>
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
          <View style={styles.textBox}>
            <MyTextInput
              style={styles.inputsec}
              placeholder={"Add Address"}
              value={state.address}
              onChangeText={(address) => {
                setErrors({ ...errors, address: null });
                setState({ ...state, address });
              }}
            />
          </View>
          {errors.address && <Text style={{color:Colors.RED}}>{errors.address}</Text>}

          {/* DOB/DOI_sec */}
          <Text style={styles.occupation}>
            Pincode <Text style={styles.error}>*</Text>
          </Text>
          <View style={styles.textBox}>
            <MyTextInput
              style={styles.inputsec}
              placeholder={"Pincode"}
              maxLength={6}
              keyboardType="numeric"
              value={state.pincode}
              onChangeText={(pincode) => {
                setErrors({ ...errors, pincode: null });
                setState({ ...state, pincode: pincode, states: null, city: "" });
                getStateCitys(pincode);
                // setErrors({ ...errors, states: null });
                // setState({ ...state, states:null, city: "" });
              }}
            />
          </View>
          {errors.pincode && <Text style={{color : Colors.RED}}>{errors.pincode}</Text>}
          <View style={[styles.example, { flexDirection: "row" }]}>
            {/* State Section */}
            {state.pincode != "" && state.pincode.length > 5 && (
              <View style={{ flex: 1, marginRight: 5 }}>
                <Text style={styles.occupation}>
                  State <Text style={styles.error}>*</Text>
                </Text>
                <View style={styles.textBox}>
                  <MySelectPicker
                    style={styles.inputsec}
                    values={stateList}
                    defultValue={state.states}
                    onChange={(states) => {
                      setErrors({ ...errors, states: null });
                      setState({ ...state, states, city: "" });
                      getCitys(states, token);
                    }}
                  />
                </View>
                {errors.states && <Text style={{color : Colors.RED}}>{errors.states}</Text>}
              </View>
            )}

            {/* City Section */}
            {state.pincode != "" && state.pincode.length > 5 && (
              <View style={{ flex: 1, marginLeft: 5 }}>
                <Text style={styles.occupation}>
                  City <Text style={styles.error}>*</Text>
                </Text>
                <View style={styles.textBox}>
                  <MySelectPicker
                    style={styles.inputsec}
                    values={cityList}
                    defultValue={state.city}
                    onChange={(city) => {
                      setErrors({ ...errors, city: null });
                      setState({ ...state, city });
                    }}
                  />
                </View>
                {errors.city && <Text style={{color : Colors.RED}}>{errors.city}</Text>}
              </View>
            )}
          </View>

        </View>
      </ScrollView>
      {/* click_box */}
      {/* Footer Section */}
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.nextButton} onPress={onAction}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
      {/* <View
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
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
 headerRow: {
    flexDirection: "row",
    justifyContent: "space-between", // Space between arrow and logo
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20, // Add some spacing for better appearance
    backgroundColor: Colors.WHITE,       // Optional: Maintain consistency
    marginTop: 25
  },
  arrowButton: {
    marginLeft: 10,
  },
  logimg: {
    width: responsiveWidth(35),
    height: responsiveHeight(7),
    resizeMode: "contain",
  },
  bottomSection: {
    backgroundColor: 'white',
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  nextButton: {
    backgroundColor: Colors.RED,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container_sec: {
    padding: 10,
    backgroundColor: "#fff",
  },
  textBox: {
    borderWidth: 1,
    borderColor: Colors.RED,
    borderRadius: 2,
    backgroundColor: Colors.WHITE,
    fontSize: 16,
    marginTop: 8,
  },
  inputsec: {
    fontSize: 17,
    paddingHorizontal: 10,
    color: 'black',
    backgroundColor: Colors.WHITE,
    borderBottomWidth: 0
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
    flexDirection: "row", // Arrange items in a row
    justifyContent: "space-between", // Space out items evenly
    alignItems: "center", // Center items vertically
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
