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
import {
  Ionicons,
  AntDesign,
  Feather,
  Entypo,
  FontAwesome,
  FontAwesome5,
} from "react-native-vector-icons";
import { Image, Header, CheckBox } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Cart from "../../components/Cart";

function CompleteDetailScreen(props) {
  return (
    <View style={styles.container}>
      {/* header  */}
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => props.navigation.toggleDrawer()}
            style={{ marginTop: 20 }}
          >
            <Entypo name={"menu"} size={30} color={Colors.RED} />
          </TouchableOpacity>
        }
        backgroundColor={Colors.RED}
        rightComponent={
          <Feather name={"gift"} size={30} color={Colors.WHITE} />
        }
      />
      <ScrollView>
        {/* invest section */}
        <View style={styles.invest_sec}>
          <View style={styles.invest}>
            <View style={styles.investleft}>
              <Image
                source={require("../../../assets/Hello.png")}
                style={styles.Goalsimg}
              />
            </View>
            <View style={styles.investright}>
              <Text style={styles.text_goals}>
                You’re Almost Ready To Invest
              </Text>
            </View>
          </View>
          <Text style={styles.Goals_text}>+ Complete Account Setup</Text>
        </View>

        {/* mutual sec */}

        <View style={styles.mutual_sec}>
          <Text style={styles.account_test}>Mutual Funds</Text>
        </View>
        <View style={styles.mutual}>
          <View style={styles.mutual_mainbox}>
            <View style={styles.fund_sec}>
              <Image
                source={require("../../../assets/mutual_1.png")}
                style={styles.mutual1}
              />
              <Text style={styles.fund_text}>Funds</Text>
            </View>

            <View style={styles.fund_sec}>
              <Image
                source={require("../../../assets/mutual_2.png")}
                style={styles.mutual2}
              />
              <Text style={styles.fund_text}>SIP</Text>
            </View>

            <View style={styles.fund_sec}>
              <Image
                source={require("../../../assets/mutual_3.png")}
                style={styles.mutual3}
              />
              <Text style={styles.fund_text}>Lumpsum</Text>
            </View>

            <View style={styles.fund_sec}>
              <Image
                source={require("../../../assets/mutual4.png")}
                style={styles.mutual4}
              />
              <Text style={styles.fund_text}>Compare</Text>
            </View>
          </View>

          <View style={styles.mutual_mainbox}>
            <View style={styles.fund_sec}>
              <Image
                source={require("../../../assets/mutual_5.png")}
                style={styles.mutual5}
              />
              <Text style={styles.fund_text}>Calculator</Text>
            </View>

            <View style={styles.fund_sec}>
              <Image
                source={require("../../../assets/mutual_6.png")}
                style={styles.mutual6}
              />
              <Text style={styles.fund_text}>Redemption</Text>
            </View>

            <View style={styles.fund_sec}>
              <Image
                source={require("../../../assets/mutual_7.png")}
                style={styles.mutual3}
              />
              <Text style={styles.fund_text}>Holding</Text>
            </View>

            <View style={styles.fund_sec}>
              <Image
                source={require("../../../assets/mutual_8.png")}
                style={styles.mutual4}
              />
              <Text style={styles.fund_text}>External</Text>
            </View>
          </View>
          <View style={styles.mutual_mainbox}>
            <View style={styles.fund_sec}>
              <Image
                source={require("../../../assets/mutual_9.png")}
                style={styles.mutual5}
              />
              <Text style={styles.fund_text}>Transaction</Text>
            </View>

            <View style={styles.fund_sec}>
              <Image
                source={require("../../../assets/mutual_10.png")}
                style={styles.mutual6}
              />
              <Text style={styles.fund_text}>Switch</Text>
            </View>

            <View style={styles.fund_sec}>
              <Image
                source={require("../../../assets/mutual_11.png")}
                style={styles.mutual3}
              />
              <Text style={styles.fund_text}>Knowledge</Text>
            </View>
          </View>
        </View>
        <View style={[styles.mutual_sec, styles.mutual_sec_bottom]}>
          <Text style={styles.account_test}>Mutual Funds</Text>
        </View>
        <Text style={styles.know}>
          SIPFund.com brings 5 things you must know
        </Text>

        {/* bottom mutual section */}

        <ScrollView horizontal={true}>
          <View style={styles.roted_bottom}>
            <View style={styles.amount_sec}>
              <Image
                source={require("../../../assets/term9.png")}
                style={styles.term9}
              />
              <Text style={styles.minimum}>Minimum Amount</Text>
            </View>

            <View style={styles.amount_sec}>
              <Image
                source={require("../../../assets/term10.png")}
                style={styles.term9}
              />
              <Text style={styles.minimum}>Lock-ins</Text>
            </View>
            <View style={styles.amount_sec}>
              <Image
                source={require("../../../assets/term11.png")}
                style={styles.Flexibility}
              />
              <Text style={styles.minimum}>Flexibility</Text>
            </View>
          </View>
        </ScrollView>
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
  invest_sec: {
    marginVertical: 20,
    alignItems: "center",
    backgroundColor: Colors.WHITE,
    marginHorizontal: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  invest: { flexDirection: "row" },
  Goalsimg: {
    width: 132,
    height: 103,
  },

  investleft: { width: "30%" },
  investright: {
    padding: 10,
    width: "70%",
  },
  text_goals: {
    paddingTop: 30,
    fontSize: 17,
  },
  Goals_text: {
    color: Colors.RED,
    fontSize: 17,
    fontWeight: "bold",
    paddingBottom: 20,
  },
  //  {/* mutual sec */}

  mutual_sec: {
    backgroundColor: Colors.GRAY_DEEP_1,
    padding: 10,
    marginHorizontal: 20,
  },
  account_test: {
    fontWeight: "bold",
    fontSize: 17,
  },
  mutual: {
    paddingVertical: 20,
    backgroundColor: Colors.WHITE,
    marginHorizontal: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  mutual_mainbox: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  mutual1: {
    width: 49,
    height: 67,
  },

  mutual2: {
    width: 67,
    height: 66,
  },

  mutual3: {
    width: 42,
    height: 63,
  },
  mutual4: {
    width: 67,
    height: 60,
  },
  fund_sec: {
    alignItems: "center",
    paddingHorizontal: 5,
    width: "25%",
  },
  fund_text: {
    fontSize: 14,
    fontWeight: "bold",
    paddingTop: 5,
  },
  mutual5: {
    width: 58,
    height: 58,
  },
  mutual6: {
    width: 75,
    height: 60,
  },

  // bottom mutual section
  mutual_sec_bottom: { marginTop: 20 },
  know: {
    marginHorizontal: 30,
    fontSize: 15,
    marginVertical: 10,
  },

  roted_bottom: {
    flexDirection: "row",
    paddingLeft: 20,
    marginVertical: 30,
  },
  amount_sec: {
    width: 150,
    marginVertical: 20,
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: Colors.WHITE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    alignItems: "center",
  },
  minimum: {
    fontSize: 13,
    color: Colors.BLACK,
  },
  term9: {
    width: 50,
    height: 66,
    marginVertical: 10,
  },
  Flexibility: {
    width: 75,
    height: 75,
    marginVertical: 10,
  },
});
const mapStateToProps = (state) => ({
  token: state.auth.token,
  users: state.auth.users,
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
)(CompleteDetailScreen);
