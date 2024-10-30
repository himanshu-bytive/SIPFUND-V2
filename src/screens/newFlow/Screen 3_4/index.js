import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from "react";
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
  KeyboardAvoidingView,
  Alert,
  Text,
} from "react-native";
import { connect } from "react-redux";
import * as Location from "expo-location";
import SmsRetriever from "react-native-sms-retriever";
import { Colors } from "../../../common";
import { OtpInputs } from "../../../components";
const width = Dimensions.get("window").width;
import OTPInputView from "@twotalltotems/react-native-otp-input";
import appsFlyer from "react-native-appsflyer";
import NotificationService from "../../../../NotificationService";

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
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
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
    _startSmsListener = async () => {
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
    if (signUpSteps == 1 && pageActive.current) {
      pageActive.current = false;
      props.navigation.navigate("createAccount");
    }
  }, [signUpSteps]);
  const timeRef = useRef();
  const timeStatusRef = useRef(false);
  const [timeStatus, setTimeStatus] = useState(false);
  const [timerValue, setTimerValue] = useState(0);
  console.log("🚀 ~ OtpScreen ~ timerValue:", timerValue);
  const clearTimeInterval = (timeRefVal) => {
    clearInterval(timeRefVal);
  };
  const startTimer = useCallback(() => {
    timeStatusRef.current = true;
    setTimerValue((prev) => 30);
    if (timeRef.current) {
      clearTimeInterval(timeRef.current);
    }
    timeRef.current = setInterval(() => {
      setTimerValue((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          timeStatusRef.current = false;
          clearTimeInterval(timeRef.current);
          return prev;
        }
      });
    }, 1000);
  }, []);

  const GetCurrentLocation = async () => {
    let { coords } = await Location.getCurrentPositionAsync();
    if (coords) {
      const { latitude, longitude } = coords;
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
    }
  };
  const [verificationCode, setVerificationCode] = useState("");
  const [errors, setError] = useState(null);

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
    <View style={styles.container}>
      <View>
        <Text
          style={{
            textAlign: "center",
            height: "15%",
          }}
        >
          {!errors ? (
            <Text style={styles.title}>{"Enter OTP"}</Text>
          ) : (
            <Text
              style={{
                fontSize: 16,
                lineHeight: 30,
              }}
            >
              {"Seems you entered the wrong OTP\n Enter the OTP"}
            </Text>
          )}
        </Text>
        <View style={styles.otpsec}>
          {!isFetching && (
            <View style={styles.otpViewBox}>
              <OTPInputView
                style={styles.otpStyle}
                codeInputFieldStyle={styles.otpCodeInputStyle}
                pinCount={4}
                code={verificationCode}
                onCodeChanged={(code) => setVerificationCode(code)}
                onCodeFilled={() => onAction(verificationCode)}
                autoFocusOnLoad={false}
              />
            </View>
          )}
          {isFetching ? (
            <View style={styles.botton_box}>
              <ActivityIndicator size={30} color={Colors.RED} />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => onAction(verificationCode)}
            >
              <Text style={styles.buttonText}>Enter</Text>
            </TouchableOpacity>
          )}
          {!isFetching && (
            <View style={styles.gapBtwnBtn}>
              <TouchableOpacity
                disabled={timeStatusRef.current && timerValue ? true : false}
                onPress={() => {
                  reSendAction();
                  startTimer();
                }}
                style={styles.botton_box}
              >
                <Text
                  style={[styles.get_otp, timerValue && { color: "black" }]}
                >
                  RESEND OTP
                  {timeStatusRef.current && timerValue ? (
                    <Text> in {timerValue} seconds</Text>
                  ) : null}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <View style={styles.footer}>
        <Image
          source={require("../../../../assets/nse.png")}
          style={styles.footerImage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: "20%",
    backgroundColor: "#fff",
  },
  otpStyle: {
    height: 100,
    width: "75%",
    marginBottom: 25,
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "600",
  },
  otpCodeInputStyle: {
    color: "#000",
    borderWidth: 1,
    height: 65,
    borderRadius: 5,
    borderColor: "#FFB2AA",
  },
  otpViewBox: {
    alignItems: "center",
    width: "100%",
  },
  gapBtwnBtn: {
    paddingTop: "10%",
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

  button: {
    backgroundColor: "#D9534F",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginHorizontal: 10,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
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
  number: {
    fontSize: 18,
    textAlign: "center",
    paddingTop: 4,
    paddingBottom: 4,
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
  footer: {
    alignItems: "center",
    marginBottom: "10%",
  },
  footerImage: {
    width: "100%",
    resizeMode: "contain",
    aspectRatio: 4.5,
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
  const { AuthActions } = require("../../../store/AuthRedux");
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
