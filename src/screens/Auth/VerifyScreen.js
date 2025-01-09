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
  ScrollView,
} from "react-native";
import { connect, useSelector } from "react-redux";
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
import { HomeActions } from "../../store/HomeRedux";
import FileViewer from 'react-native-file-viewer';
import Button from "../../components/Atom/Button/Button";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import RNPickerSelect from 'react-native-picker-select';
function VerifyScreen(props) {
  const pageActive = useRef(false);
  const phoneInput = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState([]);
  const { verify, isFetching, signUpSteps, phones, setToken, clearSummery, resetApp, resetData, pan } = props;
  const [selectedValue, setSelectedValue] = useState('+91');
  // const reduxState = useSelector((state) => state); // renaming to reduxState

  // useEffect(() => {
  //   // Log the complete Redux state when the page loads
  //   console.log('Redux state on page load:', reduxState);
  // }, [reduxState]); // re-run if reduxState changes
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
  //           Do you want to use ${phone} to register?,
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

  // useEffect(() => {
  //   // Function to log all AsyncStorage data
  //   const logAsyncStorageData = async () => {
  //     try {
  //       // Retrieve all keys
  //       const keys = await AsyncStorage.getAllKeys();

  //       // Retrieve all values based on the keys
  //       if (keys.length > 0) {
  //         const data = await AsyncStorage.multiGet(keys);
  //         data.forEach(([key, value]) => {
  //           console.log(Key: ${key}, Value: ${value});
  //         });
  //       } else {
  //         console.log('No data found in AsyncStorageeeee');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data from AsyncStorage:', error);
  //     }
  //   };

  //   // Call the function to log AsyncStorage data when the page loads
  //   logAsyncStorageData();
  // }, []); // Empty dependency array means this runs only once when the component mounts


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
    async function initialize() {
      checkAllPermissions(); // Ensure all permissions are requested first
      // await requestSmsPermission(); // SMS permission can be requested after
      await GetCurrentLocation(); // Fetch location after permissions
      await requestCameraPermission();
      openNotificationChannel(); // Configure push notifications
      setIsLoading(false); // Update loading state
      resetApp(); // Reset app-related state
      resetData(); // Reset data state
      console.log("PAN VERIFY SCREEN", pan); // Log pan for debugging
    }

    initialize();
  }, []);



  const requestCameraPermission = async () => {
    try {
      // Request CAMERA permission
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      // Return whether permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };
  function checkAllPermissions() {
    // Request notification permissions
    PushNotification.configure({
      onRegister: function (registration) {
        console.log("TOKEN:", registration.token);
        setToken(registration.token); // Store the token if needed
      },
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);

        // Check if the notification has a filePath
        if (notification?.data?.filePath) {
          const filePath = notification.data.filePath;
          console.log("FILEPATH", filePath);

          // Open the PDF file using a file viewer
          FileViewer.open(filePath)
            .then(() => {
              console.log("PDF opened successfully");
            })
            .catch((error) => {
              console.error("Error opening PDF file", error);
            });
        }
      },
      // Request permissions (iOS)
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,  // Automatically request permissions
    });
  }

  function openNotificationChannel() {
    PushNotification.createChannel(
      {
        channelId: "download-channel", // Unique ID for the channel
        channelName: "File Downloads", // The name of the channel
        channelDescription: "A channel for default notifications", // Description of the channel
        soundName: 'default', // Sound for notifications
        importance: PushNotification.Importance.HIGH, // Notification importance level
        vibrate: true, // Enable vibration for notifications
      },
      (created) => console.log(`createChannel returned '${created}'`) // Will log 'true' once the channel is created
    );
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

    Geolocation.getCurrentPosition(async (position) => {
      console.log("Getting the locations");

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

  const [state, setState] = useState({
    phone: phones && phones[0] ? String(phones[0]) : "",
  });

  const [errors, setError] = useState({
    phone: null,
  });

  const onAction = async (ph) => {
    setIsLoading(true); // Show loader when ENTER is clicked

    let phone = ph ? ph : state.phone;
    if (phone === "") {
      phoneInput.current.focus();
      setError({ ...errors, phone: "Please enter phone number" });
      setIsLoading(false); // Hide loader immediately if there's an error
      return;
    }

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

      // Set a timer to hide the loader after 5 seconds
      setTimeout(() => {
        setIsLoading(false); // Hide the loader after 5 seconds
      }, 10000);
    } else {
      phoneInput.current.focus();
      setError({ ...errors, phone: "Please check your mobile number" });
      setIsLoading(false); // Hide loader immediately if there's an error
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
      <ScrollView>
      <View style={styles.sloganView}>
        <Text style={styles.slogan}>
          Achieve Your <Text style={styles.sloganRed}>Dreams</Text>
        </Text>
      </View>
      <View style={styles.mainbox}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../../assets/SIPFUND-NEW-LOGIN.png")}
            style={styles.logoimg}
          />
        </View>
        <View style={{ width: width - 50, marginTop: 30 }}>
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
        <View style={styles.number_box}>
          <View style={styles.country_code_box}>
            <RNPickerSelect
              onValueChange={(value) => setSelectedValue(value)} // Update state
              items={[
                { label: '🇮🇳 +91', value: '+91' }, // Indian Flag
              ]}
              value={selectedValue} // Controlled component
              style={pickerSelectStyles} // Custom styles
              placeholder={{}} // Empty placeholder
              useNativeAndroidPickerStyle={false} // For consistent behavior across platforms
            />
          </View>
          {/* Phone Number Input */}
          <View style={styles.text_box}>
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
        </View>
        {errors.phone && (
          <View style={styles.text_box}>
            <Text style={styles.error}>{errors.phone}</Text>
          </View>
        )}
        <View style={{ marginTop: 20 }}>
          <Button isLoading={isLoading}
            fontSize={responsiveFontSize(2.6)}
            textColor={"#000000"}
            onPress={() => onAction()}
            backgroundColor={Colors.WHITE}
            text="Enter"
            borderColor={"#FFB2AA"}
            borderWidth={2}
            height={responsiveHeight(5)}
            width={responsiveWidth(45)}
            loaderColor="black"
          />
        </View>
        <View style={styles.otp}>
          <Text style={{ color: "grey" }}>
            OTP will be sent to this Mobile Number
          </Text>
        </View>
      </View>
      <View style={{marginTop:20,justifyContent:"center",alignItems:'center'}}>
        <Image
          source={require("../../../assets/nse.png")}
          style={styles.nseimg}
        />
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: '#000',
    paddingRight: 30, // Ensure text isn't cut off
  },
  inputAndroid: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: '#000',
  },
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.WHITE,
  },
  sloganView: {
    marginTop: 40,
  },
  slogan: {
    fontSize: 30,
    color: Colors.BLACK,
    marginBottom: 30,
    fontWeight: 'bold',
    fontFamily: 'Inter',
  },
  sloganRed: {
    //color: Colors.RED,
    color: Colors.NEW_RED,
  },
  mainbox: {
    borderRadius: 25,
    width: width - 50,
    alignItems: "center",
    marginBottom:-20
  },
  logoimg: {
    marginTop: 20,
    width: responsiveWidth(45),
    height: responsiveHeight(20),
  },
  continue: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    //paddingLeft: 70,
  },
  phone_number: {
    flexDirection: "row",
    justifyContent: 'center',
    //paddingLeft: 70,
  },
  number: {
    fontSize: 18,
    marginTop: -3,
    marginLeft: 5,
    color: "black",
    paddingHorizontal: 5,
    marginHorizontal: 10,
  },
  code: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 19,
    color: "#000000",
    textAlign: "center",
    //paddingLeft: 70,
  },
  button: {
    alignItems: "center",
    width: "45%",
    borderWidth: 1,
    borderColor: "#FFB2AA",
    borderRadius: 8,
    paddingVertical: responsiveHeight(0.7),
    alignItems: "center",
    marginTop: 15,
    justifyContent: "center",
    backgroundColor: Colors.WHITE,
    fontWeight: 'normal',
  },
  botton_box: {
    backgroundColor: Colors.RED,
    paddingHorizontal: 50,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 10,
  },
  buttonStyle: {
    width: responsiveWidth(50),
    height: responsiveHeight(6),
    backgroundColor: Colors.RED
  },
  get_otp: {
    color: Colors.WHITE,
    fontSize: 15,
  },
  error: {
    color: Colors.RED,
    fontSize: 13,
    height: responsiveHeight(6),
  },
  nseimg: {
    marginTop: 35,
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
  number_box: {
    flexDirection: 'row', // Arrange items horizontally
    alignItems: 'center', // Align vertically
    height: 50, // Adjust height
    marginHorizontal: 8, // Add spacing from the screen edges
    backgroundColor: Colors.WHITE,
  },
  country_code_box: {
    width: "auto", // Fixed width for the dropdown
    borderWidth: 1,
    borderColor: '#FFB2AA',
    borderRadius: 1, // Rounded corners
    backgroundColor: Colors.WHITE,
    justifyContent: 'center', // Center the picker vertically
    marginRight: 10, // Spacing between dropdown and text box
   justifyContent:"center",
   alignItems:"center"
  },
  pickerInput: {
    fontSize: 14, // Text size
    color: 'black', // Text color
    textAlign: 'center', // Center align the text
    paddingHorizontal: 5, // Add padding
  },
  text_box: {
    borderWidth: 1,
    borderColor: '#FFB2AA',
    borderRadius: 1,
    backgroundColor: Colors.WHITE,
    height: '80%', // Match height with the dropdown
    fontSize: 16,
    width:responsiveWidth(40),
    height:responsiveHeight(6)
  },
  inputsec: {
    fontSize: 15,
    paddingHorizontal: 10,
    height: '100%',
    borderWidth: 2,
    borderColor: '#f9f9f9',
    color: 'black',
    backgroundColor: Colors.WHITE,
  },

});

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isFetching: state.auth.isFetching,
  signUpSteps: state.auth.signUpSteps,
  phones: state.auth.phones,
  pan: state.home.pan,
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
    resetApp: () => dispatch(AuthActions.resetApp()),
    resetData: () => dispatch(HomeActions.resetData())
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(VerifyScreen);
