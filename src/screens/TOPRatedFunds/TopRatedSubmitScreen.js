/** @format */

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
  Alert,
} from "react-native";
import { connect } from "react-redux";
import { Styles, Config, Colors, FormValidate } from "../../common";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { Image, Header, CheckBox } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { color } from "react-native-elements/dist/helpers";
import Cart from "../../components/Cart";

function TopRatedSubmitScreen(props) {
  console.log("🚀 ~ TopRatedSubmitScreen ~ props:", JSON.stringify(props));
  const [sum, setSum] = useState(0);
  const [cart, setCart] = useState([]);
  const { users } = props;

  useEffect(() => {
    let sip = 0;
    for (var item in cart) {
      sip = sip + Number(cart[item].amount);
    }
    setSum(sip);
  }, [cart]);

  useEffect(() => {
    if (props.navigation) {
      setCart(props.route.params.cart);
    }
  }, [props.route.params.cart]);

  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{ marginTop: 20 }}
          >
            <AntDesign name={"arrowleft"} size={40} color={Colors.RED} />
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
        rightComponent={
          <Cart
            nav={() => {
              props.navigation.navigate("TopRatedList");
            }}
          />
        }
      />

      <ScrollView>
        <View style={styles.education}>
          <View style={styles.child_sec}>
            <Image
              source={require("../../../assets/term7.png")}
              style={styles.goals_2}
            />
          </View>
          <View style={styles.education_sec}>
            <Text style={styles.child}>Summary</Text>
            <Text style={styles.child_text}>
              {props.route.params?.planName}
            </Text>
          </View>
        </View>

        <Text style={styles.mygoal}>My Investment</Text>

        <View style={styles.fund_sec}>
          <Text style={styles.fund_secleft}>Fund List</Text>
          <Text style={styles.fund_secright}>₹ {sum}</Text>
        </View>
        {cart.map((item) => (
          <View style={styles.sbi_sec}>
            <Image source={{ uri: item?.image_path }} style={styles.Hybrid} />
            <Text style={styles.sbi_text}>{item?.product_name}</Text>
            <Text style={styles.price}>₹ {item?.amount}</Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        onPress={() => {
          if (users?.ACTIVATION_STATUS != "YES") {
            Alert.alert(
              "Not Allowed!",
              "Please complete the account opening process and upload the required documents, upon activation of your account, you can start your investment. Do you want to continue?",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: () => props.navigation.navigate("RegisterDetails"),
                },
              ]
            );

            return;
          }
          props.navigation.navigate("Upi", {
            cart,
            sum,
            fromCart: true,
            fromPlanGoals: false,
            isLumpsum: props.route.params.isLumpsum,
          });
        }}
        style={styles.botton_box}
      >
        <Text style={styles.get_otp}>MAKE PAYMENT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logimg: {
    height: 65,
    width: 203,
    marginTop: 10,
  },

  header: {
    borderBottomColor: Colors.BLACK,
    borderBottomWidth: 1,
  },

  education: {
    flexDirection: "row",
    marginHorizontal: 20,
    padding: 20,
  },
  child_sec: { width: "30%" },
  education_sec: {
    width: "70%",
    marginLeft: 30,
    paddingTop: 15,
  },
  goals_2: {
    height: 102,
    width: 105,
  },
  child: {
    fontSize: 18,
    color: Colors.DEEP_GRAY,
  },
  child_text: {
    fontSize: 18,
    color: Colors.RED,
    paddingVertical: 8,
    fontWeight: "bold",
  },
  formsec: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 50,
    borderColor: Colors.DEEP_GRAY,
    marginHorizontal: 20,
    padding: 10,
  },
  Midcap: {
    fontSize: 18,
    paddingLeft: 10,
  },
  results: {
    fontSize: 12,
    marginLeft: 50,
    marginTop: 5,
    color: Colors.DEEP_GRAY,
  },
  sbi_sec: {
    flexDirection: "row",
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: Colors.DEEP_GRAY,
    paddingBottom: 10,
    marginVertical: 5,
  },
  Hybrid: {
    width: 35,
    height: 35,
    resizeMode: "contain",
  },
  sbi_text: {
    marginLeft: 10,
    paddingTop: 10,
    fontSize: 15,
    maxWidth: "70%",
  },
  price: {
    position: "absolute",
    right: 0,
    paddingTop: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
  fund_sec: {
    flexDirection: "row",
    backgroundColor: Colors.LIGHT_GRAY,
    marginHorizontal: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  fund_secright: {
    position: "absolute",
    right: 0,
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 10,
    paddingRight: 10,
  },
  fund_secleft: {
    fontSize: 18,
    fontWeight: "bold",
  },
  mygoal: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
    color: Colors.RED,
    marginBottom: 20,
    paddingTop: 60,
  },
  my_goal: {
    color: Colors.DEEP_GRAY,
    fontWeight: "normal",
  },
  add: {
    marginVertical: 20,
    textAlign: "center",
    color: Colors.RED,
    fontSize: 18,
  },
  botton_box: {
    backgroundColor: Colors.RED,
    marginHorizontal: 30,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.DEEP_GRAY,
    paddingVertical: 10,
  },
  get_otp: {
    color: Colors.WHITE,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  childbottom: {
    flexDirection: "row",
    paddingLeft: 20,
  },

  sf: {
    width: 16,
    height: 16,
  },
  year: {
    fontSize: 15,
    paddingLeft: 10,
  },
});
const mapStateToProps = (state) => ({
  token: state.auth.token,
  users: state.auth.profile,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { AuthActions } = require("../../store/AuthRedux");
  return {
    ...stateProps,
    ...ownProps,
    logOut: () => {
      AuthActions.logOut(dispatch);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(TopRatedSubmitScreen);
