/** @format */

import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import { Colors, FormValidate } from "../../common";
import Geolocation from 'react-native-geolocation-service';
import messaging from '@react-native-firebase/messaging';
import { MaterialIcons } from "react-native-vector-icons";
import DeviceInfo from "react-native-device-info";
import appsFlyer from "react-native-appsflyer";

const width = Dimensions.get("window").width;

function VerifyScreen(props) {
  const pageActive = useRef(false);
  const phoneInput = useRef(null);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState({});
  const { verify, isFetching, signUpSteps, phones, setToken, clearSummery } = props;

  useEffect(() => {
    const getPhoneNumber = async () => {
      const phone = await DeviceInfo.getPhoneNumber();
      if (!isNaN(phone) && phone && phone.length >= 10 && phones.length === 0) {
        Alert.alert(
          "Phone Number",
          `Do you want to use ${phone} to register?`,
          [
            { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
            { text: "OK", onPress: () => onAction(phone.slice(-10)) },
          ]
        );
      }
    };

    getPhoneNumber();
  }, []);

  useEffect(() => {
    if (signUpSteps == 0 && pageActive.current) {
      pageActive.current = false;
      props.navigation.navigate("otp");
    }
    if (signUpSteps == 1 && pageActive.current) {
      pageActive.current = false;
      props.navigation.navigate("createAccount");
    }
    if (signUpSteps >= 3 && pageActive.current) {
      pageActive.current = false;
      props.navigation.navigate("login");
    }
  }, [signUpSteps]);

  useEffect(() => {
    checkAllPermissions();
    getCurrentLocation();
  }, []);

  async function checkAllPermissions() {
    const authStatus = await messaging().requestPermission();
    if (authStatus) {
      const token = await messaging().getToken();
      setToken(token);
      console.log("Firebase token:", token);
    } else {
      console.log("Notification permissions not granted");
    }
  }

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setDisplayCurrentAddress({ latitude, longitude });
      },
      (error) => {
        console.log(error);
        Alert.alert("Error", "Unable to get location.");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const [state, setState] = useState({
    phone: phones && phones[0] ? String(phones[0]) : "",
  });

  const [errors, setError] = useState({
    phone: null,
  });

  const onAction = async (ph) => {
    let phone = ph || state.phone;
    if (phone === "") {
      phoneInput.current.focus();
      setError({ ...errors, phone: "Please enter phone number" });
      return;
    }

    const eventName = "add_phone";
    const eventValues = { phone: ph || state.phone };

    appsFlyer.logEvent(eventName, eventValues, (res) => {
      console.log("######## AppsFlyer #######", res);
    }, (err) => {
      console.error("######## AppsFlyer #######", err);
    });

    clearSummery({}, "");

    if (FormValidate.isPhone(phone)) {
      pageActive.current = true;
      let params = {
        minorFlag: false,
        mobileNo: Number(phone),
        referenceInfo: {
          latitude: displayCurrentAddress.latitude,
          longitude: displayCurrentAddress.longitude,
          mobileNo: phone,
        },
      };
      verify(params);
      setState({ ...state, phone: "" });
    } else {
      phoneInput.current.focus();
      setError({ ...errors, phone: "Please check your mobile number" });
    }
  };

  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };

  useEffect(() => {
    const backHandlerSubscription = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => {
      backHandlerSubscription.remove(); // Unsubscribe from back button press
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.mainbox}>
        <Text style={styles.title}>
          Achieve Your <Text style={styles.highlight}>Dreams</Text>
        </Text>
        <Image
          source={require("../../../assets/LoginPageImage.png")}
          style={styles.image}
        />
        {phones.length > 0 && <Text style={styles.code}>Continue with</Text>}

        <View style={styles.phoneList}>
          {phones.map((item, key) => (
            <TouchableOpacity
              key={key}
              onPress={() => onAction(item)}
              style={styles.phone_number}
            >
              <MaterialIcons name="call" size={20} color="#838280" />
              <Text style={styles.number}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.or}>
          <Text style={styles.code}>or</Text>
          <Text style={[styles.code, { marginTop: 0 }]}>Enter Your Mobile number</Text>
        </View>

        <View style={styles.phoneInput}>
          <TextInput
            ref={phoneInput}
            style={styles.input}
            placeholder={"Phone"}
            keyboardType="numeric"
            maxLength={10}
            onChangeText={(phone) => {
              setError({ ...errors, phone: null });
              setState({ ...state, phone });
            }}
            value={state.phone}
          />
        </View>
        {errors.phone && (
          <View style={styles.text_box}>
            <Text style={styles.error}>{errors.phone}</Text>
          </View>
        )}
        <View>
          {isFetching ? (
            <View style={styles.botton_box}>
              <ActivityIndicator size={30} color={Colors.WHITE} />
            </View>
          ) : (
            <TouchableOpacity onPress={() => onAction()} style={styles.button}>
              <Text style={styles.get_otp}>ENTER</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.otp}>
          <Text style={{ color: "grey" }}>
            OTP will be sent to this Mobile Number
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Image
          source={require("../../../assets/nse.png")}
          style={styles.footerImage}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mainbox: {
    borderRadius: 25,
    width: width - 50,
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
  highlight: {
    color: "#D9534F",
  },
  image: {
    height: 200,
    aspectRatio: 1.5,
    alignSelf: "center",
    marginVertical: 20,
    resizeMode: "contain",
  },
  phoneList: {
    borderWidth: 1,
    borderRadius: 20,
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
    borderColor: "#FFB2AA",
  },
  phone_number: {
    flexDirection: "row",
  },
  number: {
    fontSize: 18,
    marginTop: -3,
    marginLeft: 5,
  },
  code: {
    marginBottom: 5,
    fontSize: 16,
    color: "#7E7E7E",
  },
  or: {
    width: "100%",
    alignItems: "center",
  },
  phoneInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFB2AA",
    borderRadius: 5,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: "#D9534F",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginHorizontal: 10,
    alignSelf: "center",
  },
  get_otp: {
    color: Colors.WHITE,
    fontSize: 15,
  },
  error: {
    color: Colors.RED,
    fontSize: 13,
  },
  otp: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 12,
    color: Colors.GREY_1,
    alignItems: "center",
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
  token: state.auth.token,
  isFetching: state.auth.isFetching,
  signUpSteps: state.auth.signUpSteps,
  phones: state.auth.phones,
});

const mapDispatchToProps = (dispatch) => {
  const { AuthActions } = require("../../store/AuthRedux");
  const { GoalsActions } = require("../../store/GoalsRedux");
  const { PushNotificationActions } = require("../../store/PushNotificationRedux");

  return {
    verify: (params) => {
      AuthActions.verify(dispatch, params);
    },
    setToken: (token) => dispatch(PushNotificationActions.setToken(token)),
    clearSummery: (params, token) => {
      GoalsActions.clearSummery(dispatch, params, token);
    },
  };
};

export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(VerifyScreen);
