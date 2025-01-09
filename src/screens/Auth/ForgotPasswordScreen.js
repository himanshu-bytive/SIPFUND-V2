import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
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
import AntDesign from "react-native-vector-icons/AntDesign";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import Button from "../../components/Atom/Button/Button";

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
        leftComponent={
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <AntDesign name={"arrowleft"} size={35} color={Colors.BLACK} />
          </TouchableOpacity>
        }
        backgroundColor={Colors.WHITE}
        containerStyle={styles.header}
        rightComponent={
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
          
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Text style={{ color: "red" }}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{justifyContent:"center",alignItems:"center",alignSelf:"center",flex:1,backgroundColor:"white"}}>
       <Button backgroundColor={"white"} borderColor={"#FFB2AA"} borderWidth={2} fontSize={responsiveFontSize(2)} height={responsiveHeight(5)} width={responsiveWidth(70)} onPress={onAction} text={"Send My Password"} textColor={"black"} isLoading={isFetching}/>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  header: {
    zIndex: 100,
    flexDirection: "row", // Arrange items in a row
    justifyContent: "space-between", // Space out items evenly
    alignItems: "center", // Center items vertically
    paddingHorizontal: 10, // Add spacing from edges
    height: 80, // Set a consistent height for the header
    backgroundColor: Colors.WHITE, // Ensure background matches
  },
  containerScroll: {
    width: "100%",
  },
  mainBox: {
    alignItems: "center",
    marginTop: 60,
  },
  logimg: {
    height: 35,
    width: 153,
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
    borderWidth: 2,
    borderColor: '#FFB2AA',
    height: 50,
    fontSize: 20,
    marginTop: 5,
    paddingHorizontal: 10,
    marginHorizontal: 25,
    backgroundColor: Colors.WHITE,
  },
   bottomButtonContainer: {
    position: "absolute",
    bottom: responsiveHeight(1),
    width: "100%",
    padding: responsiveWidth(4),
    backgroundColor: Colors.WHITE,
    alignItems: "center",
  },
  bottomButton: {
    width: "95%",
    borderWidth: 1,
    borderColor: "#FFB2AA",
    borderRadius: 8,
    paddingVertical: responsiveHeight(1),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.WHITE,
  },
  buttonText: {
    color: Colors.BLACK,
    fontSize: responsiveFontSize(2),
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
