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
} from "react-native";
import { connect } from "react-redux";
import { Styles, Config, Colors, FormValidate } from "../../common";
import { MyImage } from "../../components";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { Image, Header, CheckBox } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Cart from "../../components/Cart";

function PlanSubmitScreen(props) {
  const pageActive = useRef(false);
  const {
    token,
    goalDetail,
    isFetching,
    configs,
    mygolelist,
    users,
    childName,
    pincodeInfo,
    newInvestment,
    getCartDetails,
  } = props;

  const [paymentInitiated, setPaymentInitiated] = useState(false);

  useEffect(() => {
    if (paymentInitiated && !isFetching && pincodeInfo) {
      setPaymentInitiated(false);
      props.navigation.navigate("TopRatedFunds",{screen : "TopRatedList", params : {
        fromScreen: "PlanHome",
        planName: goalDetail?.goal,
        currentTab: props.route.params?.isLumpsum
          ? "LUMPSUM"
          : "SIP",
      }});
    }
  }, [paymentInitiated, isFetching]);

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
          <View style={{marginTop:30}}>
         <Cart
            nav={() => {
              props.navigation.navigate("Dashboard",{screen : "TopRatedList"});
            }}
          />
        </View>
        }
      />
      <ScrollView>
        <View style={styles.education}>
          <View style={styles.child_sec}>
            <MyImage
              width="117"
              height="117"
              svg={true}
              url={goalDetail?.goalImagePath}
            />
          </View>
          <View style={styles.education_sec}>
            <Text style={styles.child}>Summary</Text>
            <Text style={styles.child_text}>{goalDetail?.goal}</Text>
            {goalDetail?.goal === "Child's Education" && (
              <Text style={styles.child_master}>{childName}</Text>
            )}
          </View>
        </View>

        <Text style={styles.mygoal}>
          My Goal : <Text style={styles.my_goal}>{goalDetail?.goal}</Text>
        </Text>

        <View style={styles.fund_sec}>
          <Text style={styles.fund_secleft}>Fund List</Text>
          <Text style={styles.fund_secright}>
            ₹ {props.route.params.sum.toFixed(0)}
          </Text>
        </View>

        {mygolelist
          .filter(
            (item) =>
              !isNaN(item.schemeInfo.amount) &&
              Number(item.schemeInfo?.amount) != 0
          )
          .map((item, key) => {
            if (item.schemeInfo != "NA") {
              return (
                <View key={key} style={styles.sbi_sec}>
                  <Image
                    source={{ uri: item.schemeInfo.imagePath }}
                    style={styles.Hybrid}
                  />
                  <Text style={styles.sbi_text}>
                    {item.schemeInfo.schemeName}
                  </Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.price}>
                      ₹ {item.schemeInfo?.amount}
                    </Text>
                  </View>
                </View>
              );
            }
          })}
      </ScrollView>
      {/*<TouchableOpacity onPress={() => props.navigation.navigate("PlanList")}>
        <Text style={styles.add}>Add another child’s education plan</Text>
      </TouchableOpacity>*/}
      <TouchableOpacity
        onPress={() => {
          //props.navigation.navigate("Upi", {
          //cart: mygolelist.filter(
          //(item) =>
          //(!isNaN(item.schemeInfo.sip) && item.schemeInfo?.sip != 0) ||
          //!isNaN(item.schemeInfo.allocationAmount)
          //),
          //sum: props.navigation.state.params.sum,
          //fromPlanGoals: true,
          //fromCart: false,
          //isLumpsum: props.navigation.state.params.isLumpsum,
          //groupId: pincodeInfo?._id,
          //groupType: "Goals",
          //groupName: goalDetail?.goal,
          //showModified: props.navigation.state.params?.showModified,
          //});
          //newInvestment(props.navigation.state.params?.params, token);
          newInvestment(props.route.params?.params, token);
          setPaymentInitiated(true);
          setTimeout(() => {
            getCartDetails(token);
          }, 1000);
        }}
        style={styles.botton_box}
      >
        <Text style={styles.get_otp}>START GOAL</Text>
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
    marginHorizontal: 10,
    padding: 10,
  },
  education_sec: {
    width: "70%",
    paddingTop: 20,
  },
  goals_2: {
    height: 117,
    width: 126,
  },
  child: {
    fontWeight: "bold",
    fontSize: 18,
    paddingLeft: 20,
    color: Colors.DEEP_GRAY,
  },
  child_master: {
    fontSize: 16,
    paddingLeft: 20,
    color: Colors.DEEP_GRAY,
    fontWeight: "bold",
  },
  child_text: {
    fontSize: 18,
    color: Colors.RED,
    paddingVertical: 10,
    paddingLeft: 20,
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
    marginHorizontal: 10,
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
    fontSize: 15,
    width: "60%",
    color:"black"
  },
  price: {
    paddingTop: 10,
    fontSize: 15,
    paddingRight: 10,
    textAlign: "right",
    fontWeight: "bold",
    color:"black"
  },
  fund_sec: {
    flexDirection: "row",
    backgroundColor: Colors.LIGHT_GRAY,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  fund_secright: {
    position: "absolute",
    right: 0,
    fontSize: 15,
    fontWeight: "bold",
    paddingTop: 10,
    paddingRight: 10,
    color:"black"
  },
  fund_secleft: {
    fontSize: 18,
    fontWeight: "bold",
    color:Colors.RED
  },
  mygoal: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
    color: Colors.RED,
    marginBottom: 20,
    marginTop: 40,
  },
  my_goal: {
    color: Colors.DEEP_GRAY,
    fontWeight: "bold",
  },
  add: {
    marginVertical: 10,
    textAlign: "center",
    color: Colors.RED,
    fontSize: 18,
  },
  botton_box: {
    backgroundColor: Colors.RED,
    marginHorizontal: 30,
    marginVertical: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.DEEP_GRAY,
    paddingVertical: 10,
  },
  get_otp: {
    color: Colors.WHITE,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
const mapStateToProps = (state) => ({
  token: state.auth.token,
  users: state.auth.user,
  isFetching: state.goals.isFetching,
  goalDetail: state.goals.goalDetail,
  configs: state.goals.configs,
  mygolelist: state.goals.mygolelist,
  childName: state.goals.childName,
  pincodeInfo: state.goals.pincodeInfo,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { GoalsActions } = require("../../store/GoalsRedux");
  const { CartActions } = require("../../store/CartActionsRedux");
  return {
    ...stateProps,
    ...ownProps,
    singleDetails: (params, token) => {
      GoalsActions.singleDetails(dispatch, params, token);
    },
    newInvestment: (params, token) => {
      GoalsActions.goalUser(dispatch, params, token);
    },
    getCartDetails: (token) => {
      CartActions.cartDetails(dispatch, token);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(PlanSubmitScreen);
