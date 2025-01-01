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

function InvestmentDetailScreens(props) {
  const pageActive = useRef(false);
  const { investment, isFetching } = props;

  useEffect(() => {
    if (props.route?.params?.toggleLoading) {
      props.route.params.toggleLoading(false);
    }
  }, [props]);
  

  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Home")}
            style={{ marginTop: 20 }}
          >
            <AntDesign name={"arrowleft"} size={40} color={Colors.RED} />
          </TouchableOpacity>
        }
        containerStyle={Styles.header}
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
              props.navigation.navigate("TopRatedList", {
                fromScreen: "InvestmentDetail",
              });
            }}
          />
        </View>
        }
      />
      {/* {isFetching && (<View style={Styles.loading}>
                <ActivityIndicator color={Colors.BLACK} size='large' />
            </View>)} */}
      <ScrollView>
        <View style={styles.education}>
          <View style={styles.education_sec}>
            <Text style={styles.child}>{investment.investmentPlan}</Text>
            <Text
              style={{
                fontSize: 13,
                color: "black",
                paddingRight: 5,
              }}
            >
              {investment.description}
            </Text>
            <Text style={styles.child_text}>Recommendations</Text>
            <View style={styles.childbottom}>
              <Image
                source={require("../../../assets/sf.png")}
                style={styles.sf}
              />
              {investment.planRecommandations &&
                investment.planRecommandations.map((item, key) => (
                  <Text key={key} style={styles.far}>
                    {item.recommandationName}
                  </Text>
                ))}
            </View>
          </View>
          <View style={styles.child_sec}>
            {investment.investmentPlan === "Sectoral Mutual Funds" ? (
              <Image
                source={require("../../../assets/sector.png")}
                style={{
                  height: 120,
                  width: 120,
                  resizeMode: "contain",
                }}
              />
            ) : (
              <MyImage
                width="120"
                height="120"
                svg={true}
                url={investment.planImagePath}
              />
            )}
          </View>
        </View>

        <View style={styles.box_sec}>
          <Text style={styles.year}>Benefits</Text>
          {investment.planBenefits &&
            investment.planBenefits.map((item, key) => (
              <View key={key} style={styles.childbottom}>
                <Image
                  source={require("../../../assets/sf.png")}
                  style={styles.sf}
                />
                <Text style={styles.beat}>{item.benefitName}</Text>
              </View>
            ))}
        </View>

        <Text style={styles.recomned}>Funds recommended for you</Text>
        {/*investment.schemes &&
          investment.schemes.map((item, key) => {
            return (
              item != "NA" && (
                <View key={key} style={styles.sbi_sec}>
                  <Image
                    source={{ uri: item.schemes.imagePath }}
                    style={styles.Hybrid}
                  />
                  <Text style={styles.sbi_text}>{item.schemes.name}</Text>
                </View>
              )
            );
          })*/}
        {investment &&
          Object.keys(investment.schemes).map((category) => {
            return (
              <>
                {investment.schemes[category].map((item) => (
                  <View key={item?.productCode} style={styles.sbi_sec}>
                    <Image
                      source={{ uri: item?.imagePath }}
                      style={styles.Hybrid}
                    />
                    <Text style={styles.sbi_text}>{item?.name}</Text>
                  </View>
                ))}
              </>
            );
          })}
      </ScrollView>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Investment",{screen : "AddInvestment"})}
        style={styles.botton_box}
      >
        <Text style={styles.get_otp}>NEXT</Text>
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
  education: {
    flexDirection: "row",
    padding: 20,
  },
  education_sec: {
    width: "60%",
    //paddingTop: 10,
  },
  goals_2: {
    height: 145,
    width: 145,
  },
  child: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: "bold",
    color: Colors.RED,
  },
  child_text: {
    fontSize: 18,
    color: Colors.DEEP_GRAY,
    paddingVertical: 10,
    fontWeight: "bold",
    //marginTop: 50,
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
    borderColor: Colors.DEEP_GRAY,
    paddingBottom: 10,
    //marginVertical: 6,
    alignItems: "center",
  },
  Hybrid: {
    width: 30,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  sbi_text: {
    marginHorizontal: 10,
    fontSize: 15,
    maxWidth: "85%",
    color:"black"
  },
  price: {
    position: "absolute",
    right: 0,
    paddingTop: 10,
    fontSize: 15,
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
    marginVertical: 20,
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
    paddingVertical: 5,
  },

  sf: {
    width: 16,
    height: 16,
    marginTop: 3,
  },
  far: {
    fontSize: 15,
    paddingLeft: 10,
    color:"black"
  },

  year: {
    fontSize: 18,
    paddingLeft: 10,
    color: Colors.DEEP_GRAY,
    fontWeight: "bold",
  },
  beat: {
    fontSize: 15,
    paddingLeft: 10,
    color:"black"
  },
  box_sec: {
    backgroundColor: "#f9f9f9",
    //paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  recomned: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.DEEP_GRAY,
    paddingLeft: 20,
    marginVertical: 10,
  },
});
const mapStateToProps = (state) => ({
  token: state.auth.token,
  users: state.auth.users,
  isFetching: state.investmentplan.isFetching,
  investment: state.investmentplan.investment,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { InvestmentPlanActions } = require("../../store/InvestmentPlanRedux");
  return {
    ...stateProps,
    ...ownProps,
    investmentPlans: (params, token) => {
      InvestmentPlanActions.investmentPlans(dispatch, params, token);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(InvestmentDetailScreens);
