/** @format */

import React, { useState, useRef, useEffect } from "react";
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
  Alert,
  Text,
} from "react-native";
import { connect } from "react-redux";
import SmsRetriever from "react-native-sms-retriever";
import { Colors } from "../../common";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import appsFlyer from "react-native-appsflyer";
import NotificationService from "../../../NotificationService";
import Geolocation from "@react-native-community/geolocation";

const width = Dimensions.get("window").width;

function OtpScreen(props) {
  const pageActive = useRef(false);
  const {
    otp,
    resendOtp,
    phone,
    isFetching,
    signUpSteps,
  } = props;
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState([]);
  const [appToken, setAppToken] = useState("-");
  const [verificationCode, setVerificationCode] = useState("");

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
    const _startSmsListener = async () => {
      try {
        const registered = await SmsRetriever.startSmsRetriever();
        if (registered) {
          SmsRetriever.addSmsListener((event) => {
            var rx = /[0-9][0-9][0-9][0-9]/;
            const matches = rx.exec(event.message);
            if (matches && matches.length) {
              setVerificationCode(matches[0]);
              SmsRetriever.removeSmsListener();
            }
          });
        }
      } catch (error) {
        console.log(JSON.stringify(error));
      }
    };

    _startSmsListener();
  }, []);

  useEffect(() => {
    if (verificationCode) {
      onAction(verificationCode);
    }
  }, [verificationCode]);

  useEffect(() => {
    GetCurrentLocation();
  }, []);

  useEffect(() => {
    if (signUpSteps === 1 && pageActive.current) {
      pageActive.current = false;
      props.navigation.navigate("createAccount");
    }
  }, [signUpSteps]);

  const GetCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        reverseGeocode(latitude, longitude);
      },
      (error) => {
        console.error(error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const reverseGeocode = async (latitude, longitude) => {
    try {
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      for (let item of response) {
        setDisplayCurrentAddress({
          latitude: latitude,
          longitude: longitude,
          address: item?.name,
          city: item?.city,
          state: item?.street,
          pincode: item?.postalCode,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onAction = async (text) => {
    if (text.length === 4) {
      let params = {
        deviceToken: appToken,
        minorFlag: false,
        mobileNo: phone,
        otp: text,
        platform: Platform.OS === "ios" ? "IOS" : "ANDROID",
        referenceInfo: {
          latitude: displayCurrentAddress?.latitude,
          longitude: displayCurrentAddress?.longitude,
          mobileNo: phone,
          pincode: displayCurrentAddress?.pincode,
        },
      };
      pageActive.current = true;

      const eventName = "add_otp";
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
            {!isFetching && (
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
            )}
            {isFetching ? (
              <View style={styles.botton_box}>
                <ActivityIndicator size={30} color={Colors.RED} />
              </View>
            ) : (
              <TouchableOpacity
                style={styles.proceedButtonContainer}
                onPress={() => onAction(verificationCode)}
              >
                <Text style={styles.proceedButtonText}>PROCEED</Text>
              </TouchableOpacity>
            )}
            {!isFetching && (
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => reSendAction()}
                  style={styles.botton_box}
                >
                  <Text style={styles.get_otp}>RESEND OTP</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                  <Text style={[styles.get_otp, { marginTop: 10 }]}>
                    Back to Login
                  </Text>
                </TouchableOpacity>
              </View>
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
  containerScroll: {
    width: "100%",
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
  get_otp: {
    color: Colors.RED,
  },
  nseimg: {},
  number: {
    fontSize: 18,
    textAlign: "center",
    paddingTop: 4,
    paddingBottom: 4,
    color:"black"
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
  slogan: {
    fontSize: 30,
    color: Colors.BLACK,
    marginTop: 100,
    marginBottom: 20,
  },
  sloganRed: {
    color: Colors.RED,
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
