/** @format */

import React, { useState, useRef, useEffect, useContext } from "react";
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
  BackHandler,
  ToastAndroid,
  PermissionsAndroid,
} from "react-native";
import { connect } from "react-redux";
import { Colors, FormValidate } from "../../common";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useInternetStatus } from "../../components/CheckConnection";
import DeviceInfo from "react-native-device-info";
const width = Dimensions.get("window").width;
// import appsFlyer from "react-native-appsflyer";
import Geolocation from "@react-native-community/geolocation";
import PushNotification from "react-native-push-notification";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
function VerifyScreen(props) {
  const pageActive = useRef(false);
  const phoneInput = useRef(null);
  const [isLoading,setIsLoading] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState([]);
  const { verify, isFetching, signUpSteps, phones, setToken, clearSummery } =
    props;

  // useEffect(() => {
  //   const getPhoneNumber = async () => {
  //     await DeviceInfo.getPhoneNumber().then((phone) => {
  //       // alert(JSON.stringify(phone))
  //       if (
  //         !isNaN(phone) &&
  //         phone != null &&
  //         phone != "" &&
  //         phone.length >= 10 &&
  //         phones.length === 0
  //       ) { 
  //         Alert.alert(
  //           "Phone Number",
  //           `Do you want to use ${phone} to register?`,
  //           [
  //             {
  //               text: "Cancel",
  //               onPress: () => console.log("Cancel Pressed"),
  //               style: "cancel",
  //             },
  //             { text: "OK", onPress: () => onAction(phone.slice(-10)) },
  //           ]
  //         );
  //       }
  //     });
  //   };

  //   getPhoneNumber();
  // }, []);

  useEffect(() => {
    // Function to log all AsyncStorage data
    const logAsyncStorageData = async () => {
      try {
        // Retrieve all keys
        const keys = await AsyncStorage.getAllKeys();
        
        // Retrieve all values based on the keys
        if (keys.length > 0) {
          const data = await AsyncStorage.multiGet(keys);
          data.forEach(([key, value]) => {
            console.log(`Key: ${key}, Value: ${value}`);
          });
        } else {
          console.log('No data found in AsyncStorageeeee');
        }
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error);
      }
    };

    // Call the function to log AsyncStorage data when the page loads
    logAsyncStorageData();
  }, []); // Empty dependency array means this runs only once when the component mounts


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
    // if (signUpSteps == 4 && pageActive.current) {
    //   pageActive.current = false;
    //   props.navigation.navigate("login");
    // }
  }, [signUpSteps]);

  useEffect(() => {
    checkAllPermissions();
    GetCurrentLocation();
  }, []);

  function checkAllPermissions() {
    // Request notification permissions
    PushNotification.configure({
      onRegister: function (registration) {
        console.log("TOKEN:", registration.token);
        setToken(registration.token);
      },
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
      },
      // Request permissions (iOS)
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }
  
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "This app needs access to your location.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const GetCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert("Location permission denied");
      return;
    }
    console.log("Permission granted");
    
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

  const [state, setState] = useState({
    phone: phones && phones[0] ? String(phones[0]) : "",
  });

  const [errors, setError] = useState({
    phone: null,
  });

  const onAction = async (ph) => {
    setIsLoading(true);
    let phone = ph ? ph : state.phone;
    if (phone === "") {
      phoneInput.current.focus();
      setError({ ...errors, phone: "Please enter phone number" });
      return;
    }

    const eventName = "add_phone";
    const eventValues = {
      phone: ph ? ph : state.phone,
    };

    // appsFlyer.logEvent(
    //   eventName,
    //   eventValues,
    //   (res) => {
    //     console.log("######## AppsFlyer #######", res);
    //   },
    //   (err) => {
    //     console.error("######## AppsFlyer #######", err);
    //   }
    // );

    clearSummery({}, "");

    if (FormValidate.isPhone(phone)) {
      pageActive.current = true;
      let params = {
        minorFlag: false,
        mobileNo: Number(phone),
        referenceInfo: {
          latitude: displayCurrentAddress?.latitude,
          longitude: displayCurrentAddress?.longitude,
          mobileNo: phone,
          pincode: displayCurrentAddress?.pincode,
        },
      };
      verify(params);
      setIsLoading(false);
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
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  //const [InternetChecker, isInternetReachable] = useInternetStatus();
  //InternetChecker();
  //if (isInternetReachable === true) {
  //console.log("Internet is Reachable");
  //} else if (isInternetReachable === false) {
  //alert("Please check the internet connection");
  //console.log("No Internet Connection");
  //}

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View>
        <Text style={styles.slogan}>
          Achieve Your <Text style={styles.sloganRed}>Dreams</Text>
        </Text>
      </View>
      <View style={styles.mainbox}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../../assets/logo.png")}
            style={styles.logoimg}
          />
        </View>
        <View style={{ width: width - 50, marginLeft: 100 }}>
          {phones.length > 0 && <Text style={styles.code}>Continue with</Text>}
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
          {phones.length > 0 && <Text style={styles.code}>OR</Text>}
          <Text style={[styles.code, { marginTop: 0 }]}>
            Enter Your Mobile number
          </Text>
        </View>
        <View style={styles.text_box}>
          
          <MaterialIcons name="call" size={20} color="#838280" />
          <TextInput
            ref={phoneInput}
            style={styles.inputsec}
            placeholder={"Phone"}
            placeholderTextColor="grey"
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
        <View style={styles.button}>
          {isLoading ? (
            <View style={styles.botton_box}>
              <ActivityIndicator size={30} color={Colors.WHITE} />
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => onAction()}
              style={styles.botton_box}
            >
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
      <View>
        <Image
          source={require("../../../assets/nse.png")}
          style={styles.nseimg}
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
  slogan: {
    fontSize: 30,
    color: Colors.BLACK,
    marginBottom: 30,
  },
  sloganRed: {
    color: Colors.RED,
  },
  mainbox: {
    borderRadius: 25,
    width: width - 50,
    alignItems: "center",
  },
  logoimg: {
    marginTop: 30,
  },
  continue: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    //paddingLeft: 70,
  },
  inputsec: {
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: -3,
    borderColor: "#828282",
    width: "50%",
    color:"black"
  },
  phone_number: {
    flexDirection: "row",
    //paddingLeft: 70,
  },
  number: {
    fontSize: 18,
    marginTop: -3,
    marginLeft: 5,
    color:"black"
  },
  code: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 19,
    color: "#7E7E7E",
    //textAlign: "center",
    //paddingLeft: 70,
  },
  text_box: {
    flexDirection: "row",
    marginTop: 10,
    alignSelf: "flex-start",
    paddingLeft: 50,
    justifyContent:"center",
    alignItems:"center"
  },
  button: {
    alignItems: "center",
  },
  botton_box: {
    backgroundColor: Colors.RED,
    paddingHorizontal: 50,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 10,
  },
  get_otp: {
    color: Colors.WHITE,
    fontSize: 15,
  },
  error: {
    color: Colors.RED,
    fontSize: 13,
  },
  nseimg: {
    marginTop: 30,
    width: Dimensions.get("window").width * 0.8,
    resizeMode: "contain",
  },
  otp: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 12,
    color: Colors.GREY_1,
    alignItems: "center",
  },
});

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isFetching: state.auth.isFetching,
  signUpSteps: state.auth.signUpSteps,
  phones: state.auth.phones,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { AuthActions } = require("../../store/AuthRedux");
  const { GoalsActions } = require("../../store/GoalsRedux");

  const {
    PushNotificationActions,
  } = require("../../store/PushNotificationRedux");

  return {
    ...stateProps,
    ...ownProps,
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
