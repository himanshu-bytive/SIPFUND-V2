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
import AntDesign from "react-native-vector-icons/AntDesign";
import LottieView from 'lottie-react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import Button from "../../components/Atom/Button/Button";
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
  const [isDisabled, setIsDisabled] = useState(true); // Button starts disabled
  const [timer, setTimer] = useState(30); // Initial timer value (30 seconds)
  const [onSuccess, setOnSuccess] = useState(false);
  useEffect(() => {
    let interval;
    if (isDisabled) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 1) {
            return prevTimer - 1; // Decrease timer by 1 second
          } else {
            clearInterval(interval); // Clear the timer
            setIsDisabled(false); // Enable the button
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval); // Cleanup interval
  }, [isDisabled]);

  const handleResend = () => {
    reSendAction(); // Call your resend function
    setIsDisabled(true); // Disable the button again
    setTimer(30); // Reset the timer to 30 seconds
  };

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
      .catch(p => console.log(p))

    return () => RNOtpVerify.removeListener();
  }, []);

  const OtpHandler = (message) => {
    console.log("MESSAGE", message);

    const otp = /(\d{4})/g.exec(message)[1];
    // this.setState({otp});
    console.log("OTP", otp);
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
      setOnSuccess(true);
      //props.navigation.navigate("createAccount");
      // props.navigation.navigate("newScreens",{screen : "PersonalDetails"});
    }
  }, [signUpSteps]);

  const GetCurrentLocation = async () => {
    Geolocation.getCurrentPosition(async (position) => {
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
          latitude: latitude,
          longitude: longitude,
          address: address,
          city: city,
          state: state,
          pincode: pincode,
        });
      } else {
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
      // setVerificationCode("");
    }
  };

  const reSendAction = async () => {
    let params = { mobileNo: phone };
    resendOtp(params);
    setVerificationCode("");
  };

  return (
    <>
      {onSuccess ? (
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <LottieView
              style={{ height: 200, width: 200 }}
              source={require('../../../assets/Lottie/Success.json')}
              autoPlay
              loop={false}
              onAnimationFinish={() => {
                props.navigation.navigate("createAccount");
                setOnSuccess(false);
              }}
            />
            <Text style={{ color: "black", fontSize: 18, fontWeight: "500", marginTop: -20, textAlign: "center", lineHeight: 25 }}>
              Mobile Number {"\n"}Verification successful
            </Text>
          </View>
          <Image
            source={require("../../../assets/TrustedBy.png")}
            style={{ width: 250, height: 80, alignSelf: "center", marginBottom: 50 }}
            resizeMode="contain"
          />
        </View>) : (
        <ScrollView style={styles.containerScroll}>
          <TouchableOpacity onPress={() => props.navigation.navigate("Reset", { screen: "verify" })}
            style={{ marginTop: 10, marginLeft: 15, margin: 15 }}>
            <AntDesign name={"arrowleft"} size={35} color={Colors.BLACK} />
          </TouchableOpacity>
          <View style={styles.containBox}>
            <Text style={styles.slogan}>
              Enter OTP
            </Text>
            <View style={styles.mainbox}>
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
                      borderWidth: 2,
                      borderRadius: 10,
                      borderBottomColor: "darkgrey",
                      borderBottomWidth: 1,
                      width: responsiveWidth(13),
                      height: responsiveHeight(8),
                      borderColor: Colors.RED,
                      padding: 20
                    }}
                    pinCount={4}
                    code={verificationCode}
                    onCodeChanged={(code) => setVerificationCode(code)}
                    onCodeFilled={() => onAction(verificationCode)}
                  />
                </View>
                <View>
                  <Button
                    borderColor={Colors.RED}
                    borderWidth={2}
                    height={responsiveHeight(5)}
                    width={responsiveWidth(45)}
                    backgroundColor={Colors.WHITE}
                    fontSize={responsiveFontSize(2)}
                    textColor={"black"}
                    isLoading={isFetching}
                    loaderColor="black"
                    text={"Proceed"}
                    onPress={() => onAction(verificationCode)}
                  />
                </View>

                {!isFetching && (
                  <View style={{ marginTop: 20 }}>
                    <TouchableOpacity onPress={handleResend} style={styles.botton_box} disabled={isDisabled}>
                      <Text style={[isDisabled ? { color: "gray" } : styles.get_otp,]}>
                        {isDisabled ? `Resend OTP in ${timer} seconds` : "Resend OTP"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../../../assets/nse.png")}
              style={styles.nseimg}
            />
          </View>
        </ScrollView>)}
    </>
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
    marginTop: 40,
    marginBottom: 10,
    fontFamily: 'Jomolhari',
  },
  sloganRed: {
    color: Colors.RED,
  },
  containBox: {
    alignItems: "center",
  },
  mainbox: {
    padding: 20,
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
    marginBottom: -120
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
    marginTop: '70%',
    width: Dimensions.get("window").width * 0.8,
    resizeMode: "contain",
  },
  number: {
    fontSize: 18,
    textAlign: "center",
    paddingTop: 4,
    paddingBottom: 4,
    color: "black"
  },
  containerScroll: {
    width: "100%",
    backgroundColor: Colors.WHITE,
  },
  proceedButtonContainer: {
    backgroundColor: Colors.WHITE,
    paddingVertical: 4,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: Colors.RED,
    borderWidth: 2
  },
  proceedButtonText: {
    fontSize: 20,
    fontFamily: 'Jomolhari',
    color: Colors.NEW_RED,
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
