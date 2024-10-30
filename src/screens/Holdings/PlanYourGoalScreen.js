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
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { Styles, Config, Colors, FormValidate } from "../../common";
import { Entypo, AntDesign } from "react-native-vector-icons";
import { Image, Header, CheckBox } from "react-native-elements";

function PlanYourGoalScreen(props) {
  const { users } = props;
  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => props.navigation.toggleDrawer()}
            style={{ marginTop: 20 }}
          >
            <Entypo name={"menu"} size={30} color={Colors.RED} />
          </TouchableOpacity>
        }
        backgroundColor={Colors.LIGHT_WHITE}
        containerStyle={styles.header}
        centerComponent={
          <Image
            source={require("../../../assets/icon.png")}
            style={styles.logimg}
          />
        }
        rightComponent={
          <View
            style={{
              marginTop: 25,
              borderWidth: 1,
              backgroundColor: Colors.WHITE,
              borderColor: Colors.RED,
              padding: 5,
              borderRadius: 7,
              marginRight: 10,
            }}
          >
            <Text style={{ color: Colors.RED }}>
              {users?.name
                ? `${users?.name[0]}${users?.name.split(" ").pop()[0]}`
                : ""}
            </Text>
          </View>
        }
      />
      <ScrollView style={{ width: "100%" }}>
        {/* plan your goals section */}
        <Text style={styles.Plan}>Plan Your GOALS</Text>

        <ScrollView horizontal={true}>
          <View style={styles.education}>
            <View style={styles.child_sec}>
              <Image
                source={require("../../../assets/childimg.png")}
                style={styles.goals_2}
              />
            </View>
            <View style={styles.education_sec}>
              <Text style={styles.child}>Car Purchase</Text>
              <Text style={styles.child_text}>
                Plan for that dream car you always wanted
              </Text>
            </View>
          </View>

          <View style={styles.education}>
            <View style={styles.child_sec}>
              <Image
                source={require("../../../assets/childimg.png")}
                style={styles.goals_2}
              />
            </View>
            <View style={styles.education_sec}>
              <Text style={styles.child}>Car Purchase</Text>
              <Text style={styles.child_text}>
                Plan for that dream car you always wanted
              </Text>
            </View>
          </View>

          <View style={styles.education}>
            <View style={styles.child_sec}>
              <Image
                source={require("../../../assets/childimg.png")}
                style={styles.goals_2}
              />
            </View>
            <View style={styles.education_sec}>
              <Text style={styles.child}>Car Purchase</Text>
              <Text style={styles.child_text}>
                Plan for that dream car you always wanted
              </Text>
            </View>
          </View>

          <View style={styles.education}>
            <View style={styles.child_sec}>
              <Image
                source={require("../../../assets/childimg.png")}
                style={styles.goals_2}
              />
            </View>
            <View style={styles.education_sec}>
              <Text style={styles.child}>Car Purchase</Text>
              <Text style={styles.child_text}>
                Plan for that dream car you always wanted
              </Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.border}></View>

        {/* investment section */}

        <Text style={styles.Plan}>Investment Plans</Text>

        <View style={styles.investment_sec}>
          <View style={styles.investment}>
            <Image
              source={require("../../../assets/term1.png")}
              style={styles.term}
            />
            <Text style={styles.long}>Long Term</Text>
          </View>

          <View style={styles.investment}>
            <Image
              source={require("../../../assets/term2.png")}
              style={styles.term}
            />
            <Text style={styles.long}>Tax Saving Funds</Text>
          </View>

          <View style={styles.investment}>
            <Image
              source={require("../../../assets/term3.png")}
              style={styles.term}
            />
            <Text style={styles.long}>Better Than FD</Text>
          </View>
        </View>

        <View style={styles.investment_sec}>
          <View style={styles.investment}>
            <Image
              source={require("../../../assets/term4.png")}
              style={styles.term}
            />
            <Text style={styles.long}>Aggressive Funds</Text>
          </View>
          <View style={styles.investment}>
            <Image
              source={require("../../../assets/term5.png")}
              style={styles.term}
            />
            <Text style={styles.long}>Funds For SIP</Text>
          </View>
          <View style={styles.investment}>
            <Image
              source={require("../../../assets/term6.png")}
              style={styles.term}
            />
            <Text style={styles.long}>Emergency Funds</Text>
          </View>
        </View>

        <View style={{ alignItems: "center" }}>
          <View style={styles.all_plan}>
            <Text style={styles.all_plan_text}>See All Investment Plan</Text>
            <AntDesign name="down" size={20} color="#C0392B" />
          </View>
        </View>

        <View style={styles.border}></View>

        {/* Top roted fund section */}

        <Text style={styles.roted_text}>Top Rated Funds</Text>

        <View style={[styles.education, styles.education_roted]}>
          <View style={styles.child_sec}>
            <Image
              source={require("../../../assets/term7.png")}
              style={styles.fund_img}
            />
          </View>
          <View style={styles.education_sec}>
            <Text style={styles.child}>Get Top Rated Funds</Text>
            <Text style={styles.child_text}>
              At SIPFund.com we help you in choosing the best for you!
            </Text>
          </View>
        </View>
        <View style={styles.roted_border}></View>
        <View style={styles.border}></View>

        {/* quick access section */}

        <View style={styles.quick_sec}>
          <Text style={styles.quick_text}>Quick Access</Text>
          <ScrollView horizontal={true}>
            <View style={styles.education_top}>
              <View style={[styles.education, styles.quick_access]}>
                <View style={styles.child_sec}>
                  <Image
                    source={require("../../../assets/term8.png")}
                    style={styles.quick_img}
                  />
                </View>
                <View style={styles.education_sec}>
                  <Text style={styles.earn}>Refer & Earn</Text>
                  <Text style={styles.child_text}>Now earn upto ₹ 5,000/-</Text>
                </View>
              </View>

              <View style={[styles.education, styles.quick_access]}>
                <View style={styles.child_sec}>
                  <Image
                    source={require("../../../assets/term8.png")}
                    style={styles.quick_img}
                  />
                </View>
                <View style={styles.education_sec}>
                  <Text style={styles.earn}>Refer & Earn</Text>
                  <Text style={styles.child_text}>Now earn upto ₹ 5,000/-</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* top roted fund */}
        <View style={styles.border}></View>
        <Text style={styles.roted_text}>Top Rated Funds</Text>
        <Text style={styles.child_text}>
          We would love to have your questions!
        </Text>
        <Text style={[styles.child_text, styles.ship_text]}>
          SIPFund.com brings 5 things you must know before investing.
        </Text>

        {/* top roted fund sec2 */}
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

        <View style={styles.border}></View>

        {/* Faq screen */}
        <View style={styles.mainbox}>
          <View>
            <Text style={styles.faqs}>FAQ’s</Text>
          </View>
          <View style={styles.imgbox}>
            <Image
              source={require("../../../assets/FAQimg.png")}
              style={styles.FAQimg}
            />
          </View>
          <View style={styles.singletext}>
            <Entypo name="dot-single" size={40} color="#FFCE00" />
            <Text style={styles.Mutualfund}>What is a Mutual Fund?</Text>
          </View>
          <View style={styles.singletext}>
            <Entypo name="dot-single" size={40} color="#FFCE00" />
            <Text style={styles.Mutualfund}>What is Open Ended Fund?</Text>
          </View>

          <TouchableOpacity
            onPress={() => props.navigation.navigate("Upi")}
            style={styles.botton_box}
          >
            <Text style={styles.get_otp}>MORE FAQ’s</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.border}></View>
        <Text style={styles.knowledge}>Knowledge Centre</Text>

        {/* gallary */}

        <View style={styles.gallary}>
          {/* <View style={styles.qip_sec}> */}
          <Image
            source={require("../../../assets/qip_img.png")}
            style={styles.qipimg}
          />
          {/* </View> */}
          <Image
            source={require("../../../assets/fundimg.png")}
            style={styles.qipimg}
          />
          <Image
            source={require("../../../assets/ratingimg.png")}
            style={styles.qipimg}
          />
        </View>
        <Text style={styles.view}>View All</Text>
        <View style={styles.border}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 200 },
  // header: {
  //     borderBottomColor: Colors.BLACK,
  //     borderBottomWidth: 1
  // },
  // home_top: {
  //     alignItems: 'center',
  // },
  // logimg: {
  //     height: 65,
  //     width: 203,
  //     marginTop: 10,
  // },
  // Helloimg: {
  //     height: 300,
  //     width: 210,
  // },

  // HelloIinvestor: {
  //     fontSize: 16,
  //     fontWeight: "bold",

  // },
  // HelloIinvestor1: {
  //     fontSize: 16,
  //     color: Colors.GRAY_DEEP,
  //     fontWeight: "bold",
  //     marginVertical: 30,
  // },
  // botton_box: {
  //     backgroundColor: Colors.RED,
  //     paddingHorizontal: 50,
  //     paddingVertical: 20,
  //     marginTop: 20,
  //     borderRadius: 10,
  //     borderWidth: 1,
  //     borderColor: Colors.GRAY_DEEP,
  //     width: '85%',
  //     fontWeight: "bold",

  // },
  // get_otp: {
  //     color: Colors.WHITE,
  //     fontSize: 17,
  //     fontWeight: 'bold',
  //     marginRight: 5,
  //     textAlign: "center"
  // },
  Plan: {
    fontSize: 20,
    color: Colors.DEEP_GRAY,
    fontWeight: "bold",
    marginTop: 30,
    paddingHorizontal: 10,
  },
  education_top: {
    paddingLeft: 50,
    flexDirection: "row",
  },
  education: {
    flexDirection: "row",
    width: 370,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: Colors.GRAY_LIGHT,
    borderRadius: 15,
    marginVertical: 20,
    marginHorizontal: 5,
    padding: 20,
    backgroundColor: Colors.WHITE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  education_roted: {
    width: "90%",
    marginHorizontal: 20,
    marginVertical: 30,
  },
  quick_access: {
    borderRadius: 0,
    borderColor: Colors.BLACK,
    borderWidth: 1,
    width: 340,
  },

  child_sec: { width: "40%" },
  goals_2: {
    height: 145,
    width: 145,
  },
  education_sec: {
    width: "60%",
    marginTop: 10,
  },
  child: {
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 20,
  },
  child_text: {
    fontSize: 18,
    color: Colors.GRAY_LIGHT_1,
    paddingTop: 15,
    paddingLeft: 20,
  },
  border: {
    marginTop: 10,
    height: 4,
    marginHorizontal: 20,
    backgroundColor: Colors.GRAY_LIGHT,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  investment_sec: {
    flexDirection: "row",
  },
  investment: {
    backgroundColor: Colors.WHITE,
    width: "30%",
    alignItems: "center",
    margin: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  term: {
    width: 112,
    height: 113,
  },
  long: {
    textAlign: "center",
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  all_plan: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  all_plan_text: {
    fontSize: 16,
    color: Colors.RED,
    fontWeight: "bold",
  },
  roted_text: {
    fontSize: 20,
    color: Colors.DEEP_GRAY,
    fontWeight: "bold",
    paddingLeft: 20,
    marginTop: 20,
  },
  fund_img: {
    height: 122,
    width: 126,
  },
  quick_sec: {
    backgroundColor: Colors.PINK,
    paddingBottom: 20,
    marginVertical: 30,
  },

  quick_text: {
    fontSize: 20,
    color: Colors.RED,
    fontWeight: "bold",
    paddingLeft: 20,
    marginVertical: 20,
  },
  quick_img: {
    height: 94,
    width: 82,
  },
  earn: {
    color: Colors.RED,
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 20,
  },
  ship_text: {
    color: Colors.BLACK,
    textAlign: "center",
    paddingTop: 10,
  },
  /* top roted fund sec2 */
  roted_bottom: {
    flexDirection: "row",
    paddingLeft: 40,
    marginVertical: 30,
  },
  amount_sec: {
    width: 150,
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: Colors.YELLOW_LIGHT,
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
  /* Faq screen */
  mainbox: {
    padding: 40,
  },
  logimg: {
    height: 65,
    width: 203,
    marginTop: 10,
  },
  imgbox: {
    alignItems: "center",
    marginBottom: 20,
  },
  FAQimg: {
    height: 205,
    width: 243,
    marginVertical: 30,
  },
  faqs: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#716D6E",
  },
  singletext: {
    flexDirection: "row",
    marginTop: 10,
  },
  Mutualfund: {
    fontSize: 20,
    marginTop: 9,
    color: Colors.GREY_1,
  },
  botton_box: {
    alignItems: "center",
    backgroundColor: Colors.RED,
    paddingHorizontal: 70,
    paddingVertical: 20,
    marginTop: 80,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.DEEP_GRAY,
  },
  get_otp: {
    color: Colors.WHITE,
    fontSize: 20,
    fontWeight: "bold",
  },
  // gallary
  gallary: {
    width: "100%",
    alignItems: "center",
    textAlign: "center",
  },
  qipimg: {
    width: 368,
    height: 207,
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  knowledge: {
    fontSize: 22,
    color: Colors.DEEP_GRAY,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingBottom: 40,
    marginTop: 20,
  },
  view: {
    fontSize: 15,
    textAlign: "center",
    color: Colors.RED,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  // // qip_sec:{
  // //     backgroundColor:Colors.WHITE,
  // //     shadowColor: "#000",
  // //     shadowOffset: {
  // //         width: 5,
  // //         height: 5,
  // //     },
  // //     shadowOpacity: 0.23,
  // //     shadowRadius: 2.62,
  // //     elevation: 4,
  // },
});
const mapStateToProps = (state) => ({
  token: state.auth.token,
  users: state.auth.user,
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
)(PlanYourGoalScreen);
