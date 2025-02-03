import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
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
import {
  Ionicons,
  AntDesign,
  Entypo,
  FontAwesome5,
} from "react-native-vector-icons";
import appsFlyer from "react-native-appsflyer";
import { Colors, FormValidate } from "../../../common";
import Header from "../common/Header";
import InputBox from "../common/InputBox";
import CustomButton from "../common/Button";

function PanScreen(props) {
  const pageActive = useRef(false);
  const pannumberInput = useRef(null);
  const { token, isFetching, phone, pan, updatePan, checkPANNumber, iinExist } =
    props;

  useEffect(() => {
    if (pan) {
      props.navigation.navigate("Home", { refresh: true });
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
      setError({ ...errors, pannumber: "Please Enter Pan" });
      return;
    }
    if (!FormValidate.validatePan(state.pannumber)) {
      pannumberInput.current.focus();
      setError({ ...errors, pannumber: "Please Enter Validate Pan" });
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
      (res) => {
        console.log("######## AppsFlyer #######", res);
      },
      (err) => {
        console.error("######## AppsFlyer #######", err);
      }
    );

    checkPANNumber(params, token);

    // updatePan(params, token);
    setState({ ...state, pannumber: "" });
  };

  return (
    <View style={styles.container}>
      <View>
        <Header
          showBackBtn={true}
          containerStyle={{
            marginTop: 0,
          }}
        />
        <View style={styles.textWrapper}>
          <Text style={styles.title}>Enter Your PAN</Text>
          <Text style={styles.subtitle}>
            PAN is compulsory for investing in India.
          </Text>
        </View>

        <View style={styles.imgbox}>
          <Image
            source={require("../../../../assets/Pancard.png")}
            style={styles.Panimg}
          />
        </View>

        <View>
          <InputBox
            containerStyle={{
              width: "60%",
              alignSelf: "center",
            }}
            autoFocus
            ref={pannumberInput}
            autoCapitalize={"characters"}
            placeholder={"Pan Number"}
            onChangeText={(pannumber) => {
              if (pannumber.length <= 10) {
                setError({ ...errors, pannumber: null });
                setState({ ...state, pannumber });
              }
            }}
            value={state.pannumber}
            error={errors.pannumber}
          />
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
        }}
      >
        <Text style={styles.securityNote}>
          Your PAN details are completely safe and secure with us.
        </Text>
        <CustomButton
          mainContainerStyle={{
            marginTop: 0,
          }}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </CustomButton>
      </View>
    </View>
  );
}

/*
<ScrollView
        style={styles.containerScroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainbox}>
          <View style={styles.imgbox}>
            <Image
              source={require("../../../../assets/Pancard.png")}
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
            <Text style={styles.error}>{errors.pannumber}</Text>
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
        </View>
      </ScrollView>






    //   new 




*/

const mapStateToProps = (state) => ({
  token: state.auth.token,
  phone: state.auth.phone,
  pan: state.home.pan,
  isFetching: state.home.isFetching,
  error: state.home.error,
  iinExist: state.home.iinExist,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { HomeActions } = require("../../../store/HomeRedux");
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

const styles = StyleSheet.create({
  textWrapper: {
    paddingLeft: 15,
    paddingTop: 20,
  },
  imgbox: {
    alignItems: "center",
    marginVertical: 30,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },

  Panimg: {
    height: 130,
    width: 225,
  },

  backButtonText: {
    fontSize: 24,
    color: "#000",
  },
  panImage: {
    width: 200,
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },

  infoIcon: {
    position: "absolute",
    right: 30,
    top: "45%",
  },
  infoIconText: {
    fontSize: 16,
    color: "#999",
  },
  securityNote: {
    fontSize: 12,
    color: "#666",
    marginTop: 10,
    textAlign: "center",
    marginBottom: 20,
  },
  nextButton: {
    width: "100%",
    backgroundColor: "#ff0000",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
