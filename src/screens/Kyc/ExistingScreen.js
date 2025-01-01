import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  Button,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import { Styles, Config, Colors, FormValidate } from "../../common";
import 
  AntDesign from "react-native-vector-icons/AntDesign";
import { Image, Header, ListItem, Overlay } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Cart from "../../components/Cart";

function ExistingScreen(props) {
  const pageActive = useRef(false);
  const innInput = useRef(null);
  const panInput = useRef(null);
  const { isFetching, token, nseDetails, updateInn, users, isInn } = props;
  const [state, setState] = useState({
    inn: isInn ? String(isInn).trim() : users.IIN ? users.IIN : "",
    pan: nseDetails?.pan ? nseDetails?.pan : users?.pan ? users?.pan : null,
  });

  const [errors, setError] = useState({
    inn: null,
    pan: null,
  });
  const [pan, setPan] = useState("");

  const onAction = async () => {
    if (!state.inn || state.inn.length < 10) {
      innInput.current.focus();
      setError({ ...errors, inn: "Please enter valid INN" });
      return;
    }
    if (
      !state?.pan ||
      state?.pan?.length != 10 ||
      !FormValidate.validatePan(state?.pan)
    ) {
      panInput.current.focus();
      setError({ ...errors, pan: "Please enter valid PAN" });
      return;
    }
    pageActive.current = true;
    let params = {
      iin: state.inn,
      pan: state?.pan,
    };
    updateInn(params, token);
    setState({ ...state, inn: "", pan: "" });
    setTimeout(() => props.navigation.navigate("UploadDocument"), 1000);
  };

  return (
    <View style={styles.container}>
      {/* header  */}
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Home")}
            style={{ marginTop: 20 }}
          >
            <AntDesign name={"arrowleft"} size={30} color={Colors.RED} />
          </TouchableOpacity>
        }
        backgroundColor={Colors.PEACH}
        // backgroundColor={Colors.WHITE}
        centerComponent={
          <Image
            source={require("../../../assets/icon.png")}
            style={styles.logimg}
          />
        }
        rightComponent={
          <View style={{marginTop:30}}>
           <Cart
            nav={() => {
              props.navigation.navigate("TopRatedFunds", { screen: "TopRatedList" });
            }}
          />
         </View>
        }
      />
      <ScrollView>
        {/* invest section */}
        <View style={styles.invest_sec}>
          <Text style={styles.already}>Already Have Account?</Text>
          <Text style={styles.identyfication}>
            If you are existing NSE customer, please enter IIN(Investor
            Identification Number) & PAN details
          </Text>

          <TextInput
            ref={innInput}
            style={styles.inputsec}
            placeholder={"Enter your Investor Identification Number"}
            onChangeText={(inn) => {
              setError({ ...errors, inn: null });
              setState({ ...state, inn });
            }}
            keyboardType={"numeric"}
            value={state.inn}
          />
          {errors.inn && <Text style={styles.error}>{errors.inn}</Text>}
          <TextInput
            ref={panInput}
            style={styles.inputsec}
            placeholder={"Enter your PAN number"}
            autoCapitalize={"characters"}
            onChangeText={(pan) => {
              setError({ ...errors, pan: null });
              setState({ ...state, pan });
              //setPan(a);
            }}
            maxLength={10}
            textContentType={"none"}
            value={state.pan}
          />
          {errors?.pan && <Text style={styles.error}>{errors?.pan}</Text>}

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
                <Text style={styles.get_otp}>SUBMIT</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
          <Text style={styles.submit}>skip for now</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logimg: {
    height: 65,
    width: 203,
    marginTop: 10,
  },
  inputsec: {
    borderBottomWidth: 1,
    marginTop: 40,
    fontSize: 16,
    borderColor: "#828282",
  },
  invest_sec: {
    marginTop: 120,
    backgroundColor: Colors.WHITE,
    marginHorizontal: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.62,
    elevation: 4,
    padding: 20,
  },
  already: {
    color: Colors.RED,
    fontSize: 15,
  },
  identyfication: {
    color: Colors.DEEP_GRAY_1,
    fontSize: 13,
    paddingVertical: 20,
  },
  bottom_input: { marginTop: 50 },

  bottom: { alignItems: "center" },
  botton_box: {
    backgroundColor: Colors.LIGHT_RED,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginTop: 30,
    width: "100%",
  },
  get_otp: {
    color: Colors.WHITE,
    fontSize: 16,
    marginRight: 5,
    textAlign: "center",
  },
  submit: {
    color: Colors.RED,
    textAlign: "center",
    fontSize: 15,
    paddingTop: 10,
  },
  error: {
    color: "red",
  },
});
const mapStateToProps = (state) => ({
  token: state.auth.token,
  isInn: state.registration.isInn,
  nseDetails: state.registration.nseDetails,
  users: state.auth.user,
  userDetails: state.registration.userDetails,
  isFetching: state.sideMenu.isFetching,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { SideMenuActions } = require("../../store/SideMenuRedux");
  return {
    ...stateProps,
    ...ownProps,
    updateInn: (params, token) => {
      SideMenuActions.updateInn(dispatch, params, token);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(ExistingScreen);
