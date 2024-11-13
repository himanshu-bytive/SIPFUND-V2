/** @format */

import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { connect } from "react-redux";
import { Colors, Config } from "../../common";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Image, Header } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotificationService from "../../../NotificationService";
import Toast from "react-native-simple-toast";

function LoginScreen(props) {
  const pageActive = useRef(false);
  const passwordInput = useRef(null);
  const {
    login,
    isFetching,
    token,
    getUserDetails,
    user,
    phone,
    userDetails,
    // appToken,
    wrongPassCount,
  } = props;
  const [visible, setVisible] = useState(false);
  const [appToken, setAppToken] = useState("-");
  const [loginStatus, setLoginStatus] = useState(null);
  const intervalRef = useRef(null); 
  /* Retrieve password if saved */
  console.log("ENTER");

  // useEffect(() => {
  //   if (token && pageActive.current) {
  //     pageActive.current = false;
  //     getUserDetails({}, token);
  //   }
  //   if (user) {
  //     //if (user.pan) {
  //     //props.navigation.navigate("Home");
  //     //} else {
  //     //props.navigation.navigate("Pan");
  //     //}
  //     props.navigation.navigate("Root",{screen : "Home"});
  //   }
  // }, [token, user, userDetails]);
  
  useEffect(() => {
    new NotificationService(onRegister);

    if (!phone) return;

    const getPassword = async () => {
      try {
        const password = await AsyncStorage.getItem(toString(phone));

        if (!password) return;

        setState({ ...state, password });
      } catch (e) {
        console.log(e);
      }
    };

    getPassword();
  }, [phone]);
  const onRegister = (token) => {
    if (token) {
      setAppToken(token);
    }
  };

  useEffect(() => {
    if (wrongPassCount) {
      if (wrongPassCount >= 3) {
        Toast.show("Looks like you've forgotten your password!", Toast.LONG);
        props.navigation.navigate("forgotpassword");
      }
    }
  }, [wrongPassCount]);
  
   // useEffect to run the checkLoginStatus every 0.5 seconds
   useEffect(() => {
    // Set the interval to run every 500ms (0.5 seconds)
    intervalRef.current = setInterval(() => {
      checkLoginStatus();
    }, 500); // 500ms = 0.5 seconds

    // Clean up the interval on unmount or when no longer needed
    return () => clearInterval(intervalRef.current);
  }, []); // Empty dependency array ensures this only runs once on mount


  const checkLoginStatus = async () => {
    const status = await AsyncStorage.getItem('LOGIN');
    // console.log("GOT STATUS",status);
    
    setLoginStatus(status);
  };

   // useEffect to fetch user details and navigate based on loginStatus
   useEffect(() => {
    if (loginStatus === 'SUCCESS' && pageActive.current) {
      pageActive.current = false; // Prevent further checks after user details are fetched
      if (token) {
        getUserDetails({}, token); // Fetch user details based on token
        props.navigation.navigate("Root", { screen: "Home" }); // Navigate to Home after successful login
        clearInterval(intervalRef.current); // Stop the 0.5s loop once navigation happens
      }
    }
  }, [loginStatus, token]); // Dependencies on loginStatus and token to re-run when they change

  const [state, setState] = useState({
    password: "",
  });

  const [errors, setError] = useState({
    password: null,
  });

  const onAction = async () => {
    if (!state.password) {
      passwordInput.current.focus();
      setError({ ...errors, password: "Please enter Password" });
      return;
    }
    pageActive.current = true;
    let params = {
      username: String(phone),
      password: state.password,
      grant_type: "password",
      scope: "user",
      deviceToken: appToken,
    };
    console.log("password page",params);
    
    login(params, Config.loginToken);
    setState({ ...state, password: "", term: false });
  };

  return (
    <>
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{ marginTop: 20 }}
          >
            <AntDesign name={"arrowleft"} size={30} color={Colors.RED} />
          </TouchableOpacity>
        }
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

          <View style={styles.phone_number}>
            <MaterialIcons name="call" size={30} color="#838280" />
            <Text style={[styles.number, { fontSize: 25 }]}>{phone}</Text>
          </View>

          <Text style={styles.number}>Enter Password</Text>
          <View style={{ width: "90%" }}>
            <TextInput
              ref={passwordInput}
              style={styles.inputsec}
              placeholder={"Password"}
              placeholderTextColor={"grey"}
              maxLength={30}
              secureTextEntry={!visible}
              onChangeText={(password) => {
                setError({ ...errors, password: null });
                setState({ ...state, password });
              }}
              value={state.password}
            />
            <FontAwesome5
              onPress={() => {
                setVisible(!visible);
              }}
              style={{
                position: "absolute",
                right: 10,
                top: 20,
              }}
              name={visible ? "eye-slash" : "eye"}
              size={20}
              color="#838280"
            />
          </View>
          {errors.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )}
          <TouchableOpacity
            onPress={() => props.navigation.navigate("forgotpassword")}
          >
            <Text style={styles.refreshcode}>Forgot Your Password?</Text>
          </TouchableOpacity>

          <View style={styles.conform}>
            {isFetching ? (
              <View style={styles.botton_box}>
                <ActivityIndicator size={30} color={Colors.WHITE} />
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => onAction()}
                style={styles.botton_box}
              >
                <Text style={styles.get_otp}>PROCEED</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    borderBottomColor: Colors.GRAY_LIGHT,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
  },
  containerScroll: {
    width: "100%",
    backgroundColor: "#fff",
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
    marginTop: 20,
    marginBottom: 30,
    height: 136,
    width: 136,
  },
  phone_number: {
    flexDirection: "row",
    paddingLeft: 70,
  },
  email: {
    marginTop: 5,
    fontSize: 18,
    marginLeft: 5,
    marginBottom: 30,
  },
  number: {
    fontSize: 18,
    marginLeft: 5,
    color:"black"
  },
  inputsec: {
    borderWidth: 2,
    borderColor: Colors.GRAY_LIGHT,
    width: "100%",
    height: 50,
    fontSize: 20,
    marginTop: 5,
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.LITTLE_WHITE,
    color:"black"
  },
  refreshcode: {
    textAlign: "center",
    color: Colors.RED,
    fontSize: 15,
  },
  botton_box: {
    flexDirection: "row",
    backgroundColor: Colors.RED,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    justifyContent: "center",
  },
  get_otp: {
    color: Colors.WHITE,
    fontSize: 22,
    fontWeight: "bold",
    marginRight: 5,
  },
  phone_number: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 30,
  },
  numbersec: {
    fontSize: 17,
    paddingLeft: 10,
  },
  conform: {
    width: "90%",
  },
});

const mapStateToProps = (state) => ({
  isFetching: state.auth.isFetching,
  signUpSteps: state.auth.signUpSteps,
  phone: state.auth.phone,
  user: state.auth.user,
  token: state.auth.token,
  profile: state.auth.profile,
  userDetails: state.registration.userDetails,
  appToken: state.notification.token,
  wrongPassCount: state.auth.wrongPassCount,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { AuthActions } = require("../../store/AuthRedux");
  const { RegistrationActions } = require("../../store/RegistrationRedux");
  return {
    ...stateProps,
    ...ownProps,
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
)(LoginScreen);
