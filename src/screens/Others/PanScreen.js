import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
  ScrollView,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import { Styles, Config, Colors, FormValidate } from "../../common";
import { styles } from "./PanStyle";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Header } from "react-native-elements";
import appsFlyer from "react-native-appsflyer";
import Button from "../../components/Atom/Button/Button";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

function PanScreen(props) {
  const pageActive = useRef(false);
  const pannumberInput = useRef(null);
  const { token, isFetching, phone, pan, updatePan, checkPANNumber, iinExist } = props;

  useEffect(() => {
    if (pan) {
      props.navigation.navigate("OnBoard", { screen: "ProfileDetailsForm" });
    }
  }, [pan]);

  const [state, setState] = useState({
    pannumber: "",
  });

  const [errors, setError] = useState({
    pannumber: null,
  });

  const onAction = async () => {
    if (!state.pannumber) {
      pannumberInput.current.focus();
      setError({ ...errors, pannumber: "Please enter Pan" });
      return;
    }
    if (!FormValidate.validatePan(state.pannumber)) {
      pannumberInput.current.focus();
      setError({ ...errors, pannumber: "Please enter Validate Pan" });
      return;
    }
    pageActive.current = true;
    let params = {
      mobileNo: phone,
      pan: state.pannumber.toUpperCase(),
      navigation: props.navigation,
    };

    const eventName = "add_pan";

    appsFlyer.logEvent(
      eventName,
      params,
      (res) => console.log("AppsFlyer:", res),
      (err) => console.error("AppsFlyer Error:", err)
    );

    checkPANNumber(params, token);
    setState({ ...state, pannumber: "" });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Header
        leftComponent={
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <AntDesign name={"arrowleft"} size={35} color={Colors.BLACK} />
          </TouchableOpacity>
        }
        rightComponent={
          <Image
            source={require("../../../assets/icon.png")}
            style={styles.logimg}
          />
        }
        containerStyle={styles.headerRow}
        backgroundColor={Colors.WHITE}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ marginLeft: 20 }}>
          <Text style={styles.slogan}>Enter Your PAN</Text>
          <Text style={styles.sub_slogan}>
            PAN is compulsory for investing in India.
          </Text>
        </View>
        <View style={styles.mainbox}>
          <View style={styles.imgbox}>
            <Image
              source={require("../../../assets/Pancard.png")}
              style={styles.Panimg}
            />
          </View>
          <View style={styles.text_box}>
            <TextInput
              autoFocus
              ref={pannumberInput}
              style={styles.inputsec}
              color="black"
              placeholderTextColor={"grey"}
              autoCapitalize={"characters"}
              placeholder={"PAN Number"}
              onChangeText={(pannumber) => {
                if (pannumber.length <= 10) {
                  setError({ ...errors, pannumber: null });
                  setState({ ...state, pannumber });
                }
              }}
              value={state.pannumber}
            />
          </View>
          {errors.pannumber && (
            <Text style={Styles.error}>{errors.pannumber}</Text>
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomButtonContainer}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
          <FontAwesome5 name="shield-alt" size={20} color="#838280" />
          <Text style={{ marginLeft: 5, fontSize: 12, color: "black" }}>
            Your PAN details are completely safe and secure with us.
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Button isLoading={isFetching}
            fontSize={responsiveFontSize(2.5)}
            textColor={"#fff"}
            onPress={() => onAction()}
            text="Enter"
            backgroundColor={Colors.RED}
            height={responsiveHeight(6)}
            width={responsiveWidth(90)}
            loaderColor="white"
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  phone: state.auth.phone,
  pan: state.home.pan,
  isFetching: state.home.isFetching,
  error: state.home.error,
  iinExist: state.home.iinExist,
});

const mapDispatchToProps = (dispatch) => {
  const { HomeActions } = require("../../store/HomeRedux");
  return {
    updatePan: (params, token) => {
      HomeActions.updatePan(dispatch, params, token);
    },
    checkPANNumber: (params, token) => {
      HomeActions.checkPANNumber(dispatch, params, token);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PanScreen);