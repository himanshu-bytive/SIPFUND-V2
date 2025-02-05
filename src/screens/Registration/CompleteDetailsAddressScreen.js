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
  Modal,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import { Styles, Colors } from "../../common";
import { MySelectPicker, MyTextInput } from "../../components";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Image, Header } from "react-native-elements";
import Cart from "../../components/Cart";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import Button from "../../components/Atom/Button/Button";
import Typography from "../../components/Atom/Typography/Typography";

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
  const [isPincodeWorked, setIsPincodeNotWorked] = useState(false);
  const [showStateCity, setShowStateCity] = useState(false);
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
    if (nseDetails) {
      console.log("nseDetails in Address:", nseDetails.addr1);
      setState({
        address: nseDetails.addr1 || "",
        pincode: nseDetails.pincode || "",
        states: nseDetails.state?.STATE_CODE || "",
        city: nseDetails.city?.CITY || "",
      });
      if (nseDetails.state?.STATE_CODE) {
        getCitys(nseDetails.state.STATE_CODE, token);
        setShowStateCity(true);
      }
    }
  }, [nseDetails]);

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
      setState((prevState) => ({
        ...prevState,
        states: pincodeInfo?.stateCode || prevState.states,
        city: pincodeInfo?.cityName || prevState.city,
      }));
    }
  }, [pincodeInfo]);

  useEffect(() => {
    if (nseDetails?.city?.CITY && cityList.length > 0) {
      setState((prevState) => ({
        ...prevState,
        city: nseDetails.city?.CITY,
      }));
    }
  }, [cityList]);



  const getStateCitys = async (pincode) => {
    if (pincode && pincode?.length > 5) {
      getPincode(pincode, token, setIsPincodeNotWorked, setShowStateCity);
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
          <Typography style={styles.title}>Address1 (As per address proof)<Text style={styles.error}>*</Text></Typography>
          <TextInput
            style={styles.inputsec2}
            editable={true}
            placeholder={"Add Address"}
            placeholderTextColor={"grey"}
            value={state.address}
            onChangeText={(address) => {
              setErrors({ ...errors, address: null });
              setState({ ...state, address });
            }}
          />
          {errors.address && <Text style={{ color: Colors.RED }}>{errors.address}</Text>}
          <Typography style={styles.title}>Pincode <Text style={styles.error}>*</Text></Typography>
          <TextInput
            style={styles.inputsec2}
            editable={true}
            placeholder={"Pincode"}
            maxLength={6}
            keyboardType="numeric"
            placeholderTextColor={"grey"}
            value={state.pincode}
            onChangeText={(pincode) => {
              setErrors({ ...errors, pincode: null });
              setState({ ...state, pincode: pincode, states: null, city: "" });
              getStateCitys(pincode);
              // setErrors({ ...errors, states: null });
              // setState({ ...state, states:null, city: "" });
            }}
          />
          {errors.pincode && <Text style={{ color: Colors.RED }}>{errors.pincode}</Text>}
          <View style={[styles.example, { flexDirection: "row" }]}>
            {/* State Section */}
            {state.pincode != "" && state.pincode.length > 5 && showStateCity && (
              <View style={{ flex: 1, marginRight: 5 }}>
                <Typography style={styles.title}>State <Text style={styles.error}>*</Text></Typography>
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
                {errors.states && <Text style={{ color: Colors.RED }}>{errors.states}</Text>}
              </View>
            )}

            {/* City Section */}
            {state.pincode != "" && state.pincode.length > 5 && showStateCity && (
              <View style={{ flex: 1, marginLeft: 5 }}>
                <Typography style={styles.title}>State <Text style={styles.error}>*</Text></Typography>
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
                {errors.city && <Text style={{ color: Colors.RED }}>{errors.city}</Text>}
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
      <Modal
        visible={isPincodeWorked}
        transparent={true}
        animationType="none"
        onRequestClose={() => setIsPincodeNotWorked(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Please Enter Correct Pincode.</Text>
            <Button
              text="Close"
              onPress={() => setIsPincodeNotWorked(false)}
              backgroundColor={Colors.RED}
              textColor={Colors.WHITE}
              height={40}
              width={100}
            />
          </View>
        </View>
      </Modal>
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'left',
    marginTop: 10
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
    borderRadius: 12,
    backgroundColor: Colors.WHITE,
    fontSize: 16,
    marginTop: 8,
  },
  inputsec: {
    fontSize: 17,
    paddingHorizontal: 10,
    color: 'black',
    backgroundColor: Colors.WHITE,
    borderBottomWidth: 8
  },
  inputsec2: {
    height: responsiveHeight(6),
    fontSize: responsiveFontSize(2),
    color: "black",
    backgroundColor: Colors.WHITE,
    borderColor: Colors.RED,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 10,
    justifyContent: "center"
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    color: "black",
    marginBottom: 20,
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
    getPincode: (code, token, setIsPincodeNotWorked, setShowStateCity) => {
      RegistrationActions.getPincode(dispatch, code, token, setIsPincodeNotWorked, setShowStateCity);
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
