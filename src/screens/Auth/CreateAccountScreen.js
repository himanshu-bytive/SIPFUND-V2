/** @format */

import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Button,
  ScrollView,
  View,
  Linking,
  ImageBackground,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import Geolocation from 'react-native-geolocation-service';
import { Styles, Config, Colors, FormValidate } from "../../common";
import { Ionicons, AntDesign } from "react-native-vector-icons";
import { Image, Header, CheckBox } from "react-native-elements";
import appsFlyer from "react-native-appsflyer";
import NotificationService from "../../../NotificationService";
import AsyncStorage from "@react-native-async-storage/async-storage";

function CreateAccountScreen(props) {
  const {
    creatAccount,
    isFetching,
    error,
    signUpSteps,
    phone,
    login,
    getUserDetails,
    token,
    user,
  } = props;
  
  const pageActive = useRef(false);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const referenceCodeInput = useRef(null);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState([]);
  const [referral, setReferral] = useState(false);
  const [appToken, setAppToken] = useState("-");

  const passwordValidationMessages = {
    length: "Must be between 8 to 16 characters",
    caps: "Must have at least one capital letter",
    small: "Must have at least one small letter",
    number: "Must contain a number",
    specialChar: "Must contain at least one special character",
  };

  const validatePass = (pass) => {
    let validationMessages = [];
    // Add password validation logic here
    // if (pass.length < 8 || pass.length > 16) {
    //   validationMessages.push(passwordValidationMessages.length);
    // }
    // if (pass.match(/[A-Z]/g) === null) {
    //   validationMessages.push(passwordValidationMessages.caps);
    // }
    // if (pass.match(/[a-z]/g) === null) {
    //   validationMessages.push(passwordValidationMessages.small);
    // }
    // if (pass.match(/[0-9]/g) === null) {
    //   validationMessages.push(passwordValidationMessages.number);
    // }
    // if (pass.match(/\W+/) === null) {
    //   validationMessages.push(passwordValidationMessages.specialChar);
    // }
    return validationMessages;
  };

  useEffect(() => {
    GetCurrentLocation();
    new NotificationService(onRegister);
  }, []);

  const onRegister = (token) => {
    if (token) {
      setAppToken(token);
    }
  };

  const GetCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Use a reverse geocoding API here to get the address
        // For example: 
        // fetch(`https://your-api/reverse-geocode?lat=${latitude}&lon=${longitude}`)
        //   .then(response => response.json())
        //   .then(data => {
        //     setDisplayCurrentAddress({
        //       latitude,
        //       longitude,
        //       address: data.address,
        //       // additional fields...
        //     });
        //   });
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    if (signUpSteps >= 3 && pageActive.current) {
      pageActive.current = false;
      let params = {
        username: String(phone),
        password: state.password,
        grant_type: "password",
        scope: "user",
        deviceToken: appToken,
      };
      login(params, Config.loginToken);
      setState({
        ...state,
        email: "",
        password: "",
        referenceCode: "",
        term: false,
      });
    }
    if (error) {
      console.log(error);
    }
  }, [signUpSteps, error]);

  useEffect(() => {
    if (token) {
      getUserDetails({}, token);
    }
    if (user) {
      props.navigation.navigate("Home");
    }
    getRef();
  }, [token, user]);

  const getRef = async () => {
    var referenceCode = await AsyncStorage.getItem("referenceCode");
    if (referenceCode) {
      referenceCode = JSON.parse(referenceCode);
      setState({ ...state, referenceCode });
      setReferral(true);
    }
  };

  const [state, setState] = useState({
    email: "",
    password: "",
    referenceCode: "",
    term: false,
  });

  const [errors, setError] = useState({
    email: null,
    password: null,
    referenceCode: null,
    term: null,
  });

  const onAction = async () => {
    if (!FormValidate.isEmail(state.email)) {
      emailInput.current.focus();
      setError({ ...errors, email: "Please enter Email Address" });
      return;
    }
    if (!state.password) {
      passwordInput.current.focus();
      setError({ ...errors, password: "Please enter Password" });
      return;
    }
    if (!state.term) {
      setError({ ...errors, term: "Please check Terms" });
      return;
    }
    pageActive.current = true;
    let params = {
      deviceToken: appToken,
      email: state.email,
      minorFlag: false,
      mobileNo: String(phone),
      pan: "",
      password: state.password,
      platform: Platform.OS == "ios" ? "IOS" : "ANDROID",
      referenceCode: state.referenceCode.toUpperCase(),
      referenceInfo: {
        deviceId: "",
        latitude: displayCurrentAddress?.latitude,
        longitude: displayCurrentAddress?.longitude,
        mobileNo: phone,
        pincode: displayCurrentAddress?.pincode,
      },
    };

    const eventName = "signup";
    appsFlyer.logEvent(
      eventName,
      params,
      (res) => {
        console.log("######## AppsFlyer #######", res);
      },
      (err) => {
        console.error("######## AppsFlyer #######", err);
      }
    );

    creatAccount(params);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Header
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
        <View style={styles.mainBox}>
          <Image
            source={require("../../../assets/luck.png")}
            style={styles.passwordimg2}
          />
          <Text style={styles.number}>Enter Email</Text>
          <TextInput
            ref={emailInput}
            style={styles.inputsec}
            placeholder={"Email"}
            onChangeText={(email) => {
              setError({ ...errors, email: null });
              setState({ ...state, email });
            }}
            value={state.email}
          />
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}
          <Text style={styles.number}>Enter Password</Text>
          <TextInput
            ref={passwordInput}
            style={styles.inputsec}
            placeholder={"Set Password"}
            secureTextEntry={true}
            onChangeText={(password) => {
              setError({ ...errors, password: null });
              setState({ ...state, password });
            }}
            value={state.password}
          />
          {errors.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )}
          <View style={styles.passwordValidationContainer}>
            {validatePass(state.password).map((item, index) => (
              <Text key={index} style={styles.passwordValidationText}>
                {item}
              </Text>
            ))}
          </View>
          <TouchableOpacity
            onPress={() => setReferral(!referral)}
            style={{ alignSelf: "flex-end", marginVertical: 10 }}
          >
            <Text style={styles.refreshcode}>Have Referral Code?</Text>
          </TouchableOpacity>
          {referral && (
            <View style={{ width: "100%" }}>
              <Text
                style={[styles.number, { marginTop: 0, textAlign: "center" }]}
              >
                Referral Code
              </Text>
              <TextInput
                ref={referenceCodeInput}
                style={styles.inputsec}
                autoCapitalize="characters"
                placeholder={"Reference Code"}
                onChangeText={(referenceCode) => {
                  setError({ ...errors, referenceCode: null });
                  setState({ ...state, referenceCode });
                }}
                value={state.referenceCode}
              />
              {errors.referenceCode && (
                <Text style={styles.error}>{errors.referenceCode}</Text>
              )}
            </View>
          )}
          <Text style={styles.confrom_button}>
            By tapping confirm button, you agreeing to the
          </Text>
          <CheckBox
            title={
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    "https://sipfund.com/SipFund_Terms&Conditions.html"
                  )
                }
              >
                <Text style={{ color: Colors.RED }}>Terms & Conditions</Text>
              </TouchableOpacity>
            }
            containerStyle={styles.checkbox_style}
            textStyle={{ color: Colors.RED, fontSize: 14 }}
            checked={state.term}
            checkedColor={Colors.BLACK}
            uncheckedColor={Colors.RED}
            onPress={() => {
              setError({ ...errors, term: null });
              setState({ ...state, term: !state.term });
            }}
          />
          {errors.term && <Text style={styles.error}>{errors.term}</Text>}
          <View style={styles.button}>
            {isFetching ? (
              <View style={styles.botton_box}>
                <ActivityIndicator size={30} color={Colors.WHITE} />
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  if (validatePass(state.password).length > 0) {
                    alert("Enter a valid Password!");
                    return;
                  }
                  onAction();
                }}
                style={styles.botton_box}
              >
                <Text style={styles.get_otp}>CONFIRM</Text>
                <AntDesign name={"right"} size={26} color={Colors.WHITE} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  containerScroll: {
    width: "100%",
  },
  header: {
    borderBottomColor: Colors.BLACK,
    borderBottomWidth: 1,
  },
  mainBox: {
    alignItems: "center",
    paddingHorizontal: 30,
  },
  logimg: {
    height: 65,
    width: 203,
    marginTop: 10,
  },
  passwordimg2: {
    marginTop: 30,
    marginBottom: 40,
    height: 136,
    width: 136,
  },
  number: { fontSize: 22, marginTop: 20 },
  inputsec: {
    borderWidth: 2,
    borderColor: Colors.GRAY_LIGHT,
    width: "100%",
    height: 50,
    fontSize: 20,
    marginTop: 5,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.LITTLE_WHITE,
  },
  error: {
    color: Colors.RED,
    fontSize: 13,
  },
  refreshcode: {
    textAlign: "right",
    color: Colors.RED,
    fontSize: 15,
  },
  confrom_button: {
    marginTop: 5,
    marginBottom: 5,
  },
  checkbox_style: {
    backgroundColor: Colors.TRANSPARENT,
    borderColor: Colors.TRANSPARENT,
  },
  botton_box: {
    flexDirection: "row",
    backgroundColor: Colors.RED,
    paddingHorizontal: 70,
    paddingVertical: 20,
    borderRadius: 10,
  },
  get_otp: {
    color: Colors.WHITE,
    fontSize: 22,
    fontWeight: "bold",
    marginRight: 5,
  },
  passwordValidationContainer: {
    flex: 1,
    marginVertical: 10,
  },
  passwordValidationText: {
    color: "red",
  },
});

const mapStateToProps = (state) => ({
  isFetching: state.auth.isFetching,
  error: state.auth.error,
  signUpSteps: state.auth.signUpSteps,
  validFlag: state.auth.validFlag,
  phone: state.auth.phone,
  token: state.auth.token,
  user: state.auth.user,
  appToken: state.notification.token,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { AuthActions } = require("../../store/AuthRedux");
  const { RegistrationActions } = require("../../store/RegistrationRedux");
  return {
    ...stateProps,
    ...ownProps,
    creatAccount: (params) => {
      AuthActions.creatAccount(dispatch, params);
    },
    login: (params, token) => {
      AuthActions.login(dispatch, params, token);
    },
    getUserDetails: (params, token) => {
      RegistrationActions.getUserDetails(dispatch, params, token);
    },
  };
};

export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(CreateAccountScreen);
