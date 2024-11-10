import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  Button,
  ScrollView,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import { Colors, FormValidate } from "../../common";
import { Image, Header } from "react-native-elements";

function ForgotPasswordScreen(props) {
  const pageActive = useRef(false);
  const emailInput = useRef(null);
  const { forgotPassword, isFetching, password } = props;

  useEffect(() => {
    if (password && pageActive.current) {
      pageActive.current = false;
      props.navigation.navigate("login");
    }
  }, [password]);

  const [state, setState] = useState({
    email: "",
  });

  const [errors, setError] = useState({
    email: null,
  });

  const onAction = async () => {
    if (!FormValidate.isEmail(state.email)) {
      emailInput.current.focus();
      setError({ ...errors, email: "Please enter Email Address" });
      return;
    }
    pageActive.current = true;
    let params = {
      email: state.email,
    };
    forgotPassword(params);
    setState({ ...state, email: "" });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
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
            source={require("../../../assets/lock.png")}
            style={styles.passwordimg2}
          />
          <Text style={styles.number}>Forgot Password?</Text>
          <Text style={styles.confrom_button}>
            You can reset your password here
          </Text>
        </View>
        <TextInput
          ref={emailInput}
          style={styles.inputsec}
          placeholder={"Enter Email Address"}
          placeholderTextColor={"grey"}
          color="black"
          onChangeText={(email) => {
            setError({ ...errors, email: null });
            setState({ ...state, email });
          }}
          value={state.email}
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}
        <View style={styles.bottom}>
          {isFetching ? (
            <View style={styles.botton_box}>
              <ActivityIndicator size={30} color={Colors.WHITE} />
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => onAction()}
              style={styles.botton_box}
            >
              <Text style={styles.get_otp}>Send My Password</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Text style={{ color: "red" }}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GRAY_LIGHT_2,
  },
  containerScroll: {
    width: "100%",
  },
  mainBox: {
    alignItems: "center",
    marginTop: 60,
  },
  logimg: {
    height: 65,
    width: 203,
    marginTop: 10,
  },
  passwordimg2: {
    marginTop: 30,
    height: 140,
    width: 116,
  },
  number: {
    fontSize: 17,
    paddingVertical: 15,
    color:"black"
  },
  inputsec: {
    borderBottomWidth: 2,
    borderColor: Colors.GRAY_LIGHT,
    height: 50,
    fontSize: 20,
    marginTop: 5,
    paddingHorizontal: 10,
    marginHorizontal: 25,
    backgroundColor: Colors.LITTLE_WHITE,
  },
  error: {
    color: Colors.RED,
    fontSize: 13,
    marginLeft: 25,
    marginTop: 5,
  },
  confrom_button: { fontSize: 15,color:"black" },
  bottom: { alignItems: "center" },
  botton_box: {
    backgroundColor: Colors.LIGHT_RED,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginTop: 20,
    marginVertical: 20,
    width: "90%",
  },
  get_otp: {
    color: Colors.WHITE,
    fontSize: 16,
    marginRight: 5,
    textAlign: "center",
  },
  email: {
    fontSize: 16,
    paddingHorizontal: 25,
    marginTop: 30,
    color: Colors.GRAY_LIGHT_1,
  },
  border: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.GRAY_LIGHT,
    marginHorizontal: 25,
    marginVertical: 3,
  },
});

const mapStateToProps = (state) => ({
  isFetching: state.auth.isFetching,
  password: state.auth.password,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { AuthActions } = require("../../store/AuthRedux");
  return {
    ...stateProps,
    ...ownProps,
    forgotPassword: (params) => {
      AuthActions.forgotPassword(dispatch, params);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(ForgotPasswordScreen);
