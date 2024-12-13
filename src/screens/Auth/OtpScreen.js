/** @format */

import React, { useState, useRef, useEffect, } from "react";
import {
  StyleSheet,
  View,
  Platform,
  ActivityIndicator,
  BackHandler,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  Keyboard,
} from "react-native";
import { connect } from "react-redux";
import { Colors } from "../../common";
const width = Dimensions.get("window").width;
import OTPInputView from "@twotalltotems/react-native-otp-input";
import NotificationService from "../../../NotificationService";
import Geolocation from "@react-native-community/geolocation";
import RNOtpVerify from "react-native-otp-verify";
function OtpScreen(props) {
  const pageActive = useRef(false);
  const {
    otp,
    resendOtp,
    phone,
    isFetching,
    signUpSteps,
    // appToken
  } = props;
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState([]);
  const [appToken, setAppToken] = useState("-");

  useEffect(() => {
    new NotificationService(onRegister);
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const onRegister = (token) => {
    if (token) {
      setAppToken(token);
    }
  };

  /* Auto read OTP */
  useEffect(() => {
    RNOtpVerify.getHash()
    .then(console.log)
    .catch(console.log)

    RNOtpVerify.getOtp()
    .then(p => RNOtpVerify.addListener(OtpHandler))
    .catch(p=> console.log(p))

    return () => RNOtpVerify.removeListener();
  }, []);

  const OtpHandler = (message) =>{
    console.log("MESSAGE",message);
    
    const otp = /(\d{4})/g.exec(message)[1];
    // this.setState({otp});
    console.log("OTP",otp);
    setVerificationCode(otp);
    RNOtpVerify.removeListener();
    Keyboard.dismiss();
  }

  useEffect(() => {
    if (verificationCode) {
      onAction(verificationCode);
    }
  }, [verificationCode]);

  useEffect(() => {
    GetCurrentLocation();
  }, []);

  useEffect(() => {
    if (signUpSteps == 1 && pageActive.current) {
      pageActive.current = false;
      props.navigation.navigate("createAccount");
    }
  }, [signUpSteps]);

  const GetCurrentLocation = async () => {
    Geolocation.getCurrentPosition( async (position) =>{
      const { latitude, longitude } = position.coords;
      console.log(position);
      console.log(latitude);
      console.log(longitude);
      // Fetch address details using a geocoding service
      const apiKey = 'AIzaSyBZZFjaQWAKZd-6gvBlFAlRiw1D5bUO5FA';
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
      const response = await axios.get(url);
      // console.log("GOT RESPONSE",response);
      if (response.data.status === 'OK') {
       const addressComponents = response.data.results[0].address_components;
       const address = response.data.results[0].formatted_address;
       console.log(address);
       const city = addressComponents.find(component => component.types.includes("locality"))?.long_name || "";
       const state = addressComponents.find(component => component.types.includes("administrative_area_level_1"))?.long_name || "";
       const pincode = addressComponents.find(component => component.types.includes("postal_code"))?.long_name || "";
       console.log(city + " " + state + " " + pincode);
       setDisplayCurrentAddress({
        latitude : latitude,
        longitude : longitude,
        address : address,
        city : city,
        state : state,
        pincode : pincode,
       });
      }else {
        console.error("Geocoding API error:", response.data.status);
        Alert.alert("Error", "Unable to fetch address details");
      }
    })
  };
  const [verificationCode, setVerificationCode] = useState("");

  const onAction = async (text) => {
    if (text.length === 4) {
      let params = {
        deviceToken: appToken,
        minorFlag: false,
        mobileNo: phone,
        otp: text,
        platform: Platform.OS == "ios" ? "IOS" : "ANDROID",
        referenceInfo: {
          latitude: displayCurrentAddress?.latitude,
          longitude: displayCurrentAddress?.longitude,
          mobileNo: phone,
          pincode: displayCurrentAddress?.pincode,
        },
      };
      pageActive.current = true;

      otp(params);
      setVerificationCode("");
    }
  };

  const reSendAction = async () => {
    let params = { mobileNo: phone };
    resendOtp(params);
    setVerificationCode("");
  };

  return (
    <ScrollView style={styles.containerScroll}>
      <View style={styles.containBox}>
        <Text style={styles.slogan}>
          Achieve Your <Text style={styles.sloganRed}>Dreams</Text>
        </Text>
        <View style={styles.mainbox}>
          <Image
            source={require("../../../assets/logo.png")}
            style={styles.logimg}
          />
          <Text style={styles.number}>
            {"Enter OTP to verify\nyour mobile number"}
          </Text>
          <View style={styles.otpsec}>
              <View>
                <OTPInputView
                  style={{
                    height: 100,
                    width: "75%",
                    marginBottom: 25,
                  }}
                  codeInputFieldStyle={{
                    color: "black",
                    borderWidth: 0,
                    borderBottomColor: "darkgrey",
                    borderBottomWidth: 1,
                  }}
                  pinCount={4}
                  code={verificationCode}
                  onCodeChanged={(code) => setVerificationCode(code)}
                  onCodeFilled={() => onAction(verificationCode)}
                />
              </View>
            {isFetching ? (
              <View style={styles.botton_box}>
                <ActivityIndicator size={30} color={Colors.RED} />
              </View>
            ) : (
              <>
              <TouchableOpacity
                style={styles.proceedButtonContainer}
                onPress={() => onAction(verificationCode)}
              >
                <Text style={styles.proceedButtonText}>PROCEED</Text>
              </TouchableOpacity>
           
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => reSendAction()}
                  style={styles.botton_box}
                >
                  <Text style={styles.get_otp}>RESEND OTP</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate("verify")}>
                  <Text style={[styles.get_otp, { marginTop: 10 }]}>
                    Back to Login
                  </Text>
                </TouchableOpacity>
              </View>
            </>
            )}
          </View>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../../../assets/pan_footer_img.png")}
          style={styles.nseimg}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.GREY_1,
  },
  slogan: {
    fontSize: 30,
    color: Colors.BLACK,
    marginTop: 100,
    marginBottom: 20,
  },
  sloganRed: {
    color: Colors.RED,
  },
  containBox: {
    alignItems: "center",
  },
  mainbox: {
    padding: 20,
    borderWidth: 2,
    borderRadius: 20,
    borderStyle: "solid",
    alignItems: "center",
    width: width - 50,
    borderColor: Colors.GREY_1,
    backgroundColor: Colors.WHITE,
    paddingTop: 30,
    marginBottom: 20,
  },
  logimg: {
    marginTop: 10,
    marginBottom: 10,
    height: 100,
    aspectRatio: 1,
  },
  otpsec: {
    alignItems: "center",
  },
  inputsec: {
    borderBottomWidth: 4,
    width: 35,
    borderColor: Colors.GREY_1,
    marginLeft: 4,
    marginRight: 4,
  },
  get_otp: {
    color: Colors.RED,
  },
  nseimg: {
    //marginVertical: 50,
  },
  number: {
    fontSize: 18,
    textAlign: "center",
    paddingTop: 4,
    paddingBottom: 4,
    color:"black"
  },
  containerScroll: {
    width: "100%",
  },
  proceedButtonContainer: {
    backgroundColor: Colors.LIGHT_RED,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  proceedButtonText: {
    fontSize: 20,
    color: Colors.WHITE,
  },
});

const mapStateToProps = (state) => ({
  isFetching: state.auth.isFetching,
  phone: state.auth.phone,
  signUpSteps: state.auth.signUpSteps,
  appToken: state.notification.token,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { AuthActions } = require("../../store/AuthRedux");
  return {
    ...stateProps,
    ...ownProps,
    otp: (params) => {
      AuthActions.otp(dispatch, params);
    },
    resendOtp: (params) => {
      AuthActions.resendOtp(dispatch, params);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(OtpScreen);
