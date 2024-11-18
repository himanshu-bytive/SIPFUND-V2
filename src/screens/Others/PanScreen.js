import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  Button,
  View,
  Image,
  TouchableOpacity,
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
import { Header, CheckBox } from "react-native-elements";
import appsFlyer from "react-native-appsflyer";

function PanScreen(props) {
  const pageActive = useRef(false);
  const pannumberInput = useRef(null);
  const { token, isFetching, phone, pan, updatePan,checkPANNumber,iinExist } = props;

  useEffect(() => {
    if (pan) {
      props.navigation.navigate("Explore",{screen : "Home", params : { refresh: true }});
    }
  }, [pan]);

  // useEffect(() => {
  //   // alert(iinExist)
    
  // }, [iinExist])
  

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
      navigation:props.navigation
    };

    const eventName = "add_pan";

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

    checkPANNumber(params, token)

    // updatePan(params, token);
    setState({ ...state, pannumber: "" });
  };

  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{ marginTop: 20 }}
          >
            <AntDesign name="arrowleft" size={40} color={Colors.RED} />
          </TouchableOpacity>
        }
        containerStyle={styles.header}
        backgroundColor={Colors.LIGHT_WHITE}
        centerComponent={
          <Image
            source={require("../../../assets/icon.png")}
            style={styles.logimg}
          />
        }
      />
      <ScrollView style={Styles.containerScroll}>
        <View style={styles.mainbox}>
          <View style={styles.imgbox}>
            <Image
              source={require("../../../assets/Pancard.png")}
              style={styles.Panimg}
            />
          </View>
          <Text style={styles.pan}>PAN Number</Text>
          <View style={styles.text_box}>
            <FontAwesome5 name="credit-card" size={20} color="#838280" />
            <TextInput
              autoFocus
              ref={pannumberInput}
              style={styles.inputsec}
              color="black"
              placeholderTextColor={"grey"}
              autoCapitalize={"characters"}
              placeholder={"Pan"}
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
          <View style={styles.button}>
            {isFetching ? (
              <View style={styles.botton_box}>
                <ActivityIndicator size={30} color={Colors.WHITE} />
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => onAction()}
                style={styles.botton_box}
              >
                <Text style={styles.get_otp}>CREATE</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../../../assets/pan_footer_img.png")}
              style={styles.nseimg}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  phone: state.auth.phone,
  pan: state.home.pan,
  isFetching: state.home.isFetching,
  error: state.home.error,
  iinExist:state.home.iinExist
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { HomeActions } = require("../../store/HomeRedux");
  return {
    ...stateProps,
    ...ownProps,
    updatePan: (params, token) => {
      HomeActions.updatePan(dispatch, params, token);
    },
    checkPANNumber: (params, token) => {
      HomeActions.checkPANNumber(dispatch, params, token);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(PanScreen);
