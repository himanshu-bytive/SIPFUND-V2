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
import { ProfileImagePicker } from "../../components";
import { Styles, Config, Colors, FormValidate } from "../../common";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Image, Header, CheckBox, colors } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Cart from "../../components/Cart";

function ProfileScreen(props) {
  const {
    steps,
    token,
    uploadSuccess,
    getDocuments,
    docs,
    isFetching,
    getProfile,
    profile,
    user,
    error,
    navigation,
    iinBank,
  } = props;

  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    setShowLoader(true); // Show loader immediately on mount

    const hideTimer = setTimeout(() => {
      setShowLoader(false); // Hide loader after 5 seconds
    }, 1000); // 5 seconds for hiding the loader

    // Cleanup for the hide timer
    return () => clearTimeout(hideTimer);
  }, []); // Only runs on mount
  const showDetails = iinBank?.length > 0;
  console.log(showDetails);

  useEffect(() => {
    getProfile({ service_request: { iin: user.IIN } }, token);
  }, []);

  useEffect(() => {
    if (error === "Error occurred while processing RetriveXelement") {
      setProfileCreated(false);
    }
  }, [error]);

  useEffect(() => {
    if (token || uploadSuccess) {
      getDocuments(token);
    }
  }, [token, uploadSuccess]);

  return (
    <View style={styles.container}>
      {/* header  */}
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Explore", { screen: 'Home' });
            }}
            style={{ marginTop: 30 }}>
            <AntDesign name={'arrowleft'} size={30} color={Colors.RED} />
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
              props.navigation.navigate("TopRatedFunds", { screen: "TopRatedList" });
            }}
          />
         </View>
        }
      />
      {showLoader && (
        <View style={Styles.loading}>
          <ActivityIndicator color={Colors.BLACK} size="large" />
        </View>
      )}
      <ScrollView style={styles.containerScroll}>
        <View style={styles.banner}>
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
              backgroundColor: "grey",
              marginVertical: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 50,
                color: "#fff",
              }}
            >
              {profile?.INVESTOR_NAME
                ? profile?.INVESTOR_NAME.split(" ").length > 1
                  ? `${profile?.INVESTOR_NAME[0]}${profile?.INVESTOR_NAME.split(" ").pop()[0]}`
                  : `${profile?.INVESTOR_NAME[0]}`
                : ""}
            </Text>
          </View>
          {/*<ProfileImagePicker
            docType="AVATAR"
            url={docs?.baseUrl}
            data={
              docs?.responseString?.documents
                ? docs.responseString.documents
                : []
            }
          />*/}
          <Text style={styles.profile_text}>{profile?.INVESTOR_NAME}</Text>
          <Text
            style={[
              styles.profile_text2,
              {
                color:
                  profile?.ACTIVATION_STATUS === "YES" ? "#6FF43A" : Colors.RED,
              },
            ]}
          >
            {profile?.ACTIVATION_STATUS === "YES"
              ? "ACCOUNT ACTIVE"
              : "ACCOUNT INACTIVE"}
          </Text>
        </View>
        <View style={styles.icon_sec}>
          <View
            style={steps && steps > 0 ? styles.icon_bg_act : styles.icon_bg}
          >
            <FontAwesome name={"phone"} size={25} color={Colors.WHITE} />
          </View>
          <View style={styles.border}></View>
          <View
            style={steps && steps > 1 ? styles.icon_bg_act : styles.icon_bg}
          >
            <FontAwesome name={"user"} size={24} color={Colors.WHITE} />
          </View>
          <View style={styles.border}></View>
          <View
            style={steps && steps > 2 ? styles.icon_bg_act : styles.icon_bg}
          >
            <Entypo name={"squared-minus"} size={25} color={Colors.WHITE} />
          </View>
          <View style={styles.border}></View>
          <View
            style={iinBank?.length > 0 ? styles.icon_bg_act : styles.icon_bg}
          >
            <FontAwesome5 name="dot-circle" size={25} color={Colors.WHITE} />
          </View>
        </View>

        <View style={styles.text_sec}>
          <Text style={styles.icon_text}>MOBILE VERIFIED</Text>
          <Text style={styles.icon_text}>ACCOUNT CREATED</Text>
          <Text style={styles.icon_text}>Pan Updated</Text>
          <Text style={styles.icon_text}>IIN Created</Text>
        </View>

        <View style={[styles.icon_sec, styles.bottomicon_sec]}>
          <View
            style={steps && steps > 4 ? styles.icon_bg_act : styles.icon_bg}
          >
            <AntDesign name={"filetext1"} size={25} color={Colors.WHITE} />
          </View>
          <View style={[styles.border, styles.border1]}></View>
          <View
            style={steps && steps > 5 ? styles.icon_bg_act : styles.icon_bg}
          >
            <Feather name={"check-circle"} size={25} color={Colors.WHITE} />
          </View>
          <View style={[styles.border, styles.border1]}></View>
          <View
            style={steps && steps === 6 ? styles.icon_bg_act : styles.icon_bg}
          >
            <FontAwesome name="rupee-sign" size={25} color={Colors.WHITE} />
          </View>
        </View>

        <View style={styles.text_sec}>
          <Text style={styles.bottom_text}>Document Uploaded</Text>
          <Text style={styles.bottom_text}>IIN Activated</Text>
          <Text style={styles.bottom_text}>Investment</Text>
        </View>
        {showDetails ? (
          <>
            <View style={styles.mutual_sec}>
              <Text style={styles.mutual_text}>Mutual Funds</Text>
            </View>
            <View style={styles.mutual_bottomsec}>
              <View style={styles.mutual_left}>
                <Text style={styles.customer}>Customer Id :</Text>
                <Text style={styles.id_text}>{profile?.CUSTOMER_ID}</Text>
                <Text style={styles.customer}>Holding Nature :</Text>
                <Text style={styles.id_text}>{profile?.HOLD_N_CODE}</Text>
                <Text style={styles.customer}>Email :</Text>
                <Text style={styles.id_text}>{profile?.EMAIL}</Text>
              </View>
              <View style={styles.mutual_right}>
                <Text style={styles.customer}>PAN :</Text>
                <Text style={styles.id_text}>{profile?.FH_PAN_NO}</Text>
                <Text style={styles.customer}>Tax Status :</Text>
                <Text style={styles.id_text}>{profile?.TAX_STATUS_DESC}</Text>
                <Text style={styles.customer}>Mobile :</Text>
                <Text style={styles.id_text}>{profile?.MOBILE_NO}</Text>
              </View>
            </View>
            <View style={styles.address}>
              <Text style={styles.customer}>Address :</Text>
              <Text
                style={styles.id_text}
              >{`${profile?.ADDRESS1} ${profile?.CITY} ${profile?.STATE_NAME} ${profile?.PINCODE}`}</Text>
            </View>

            <View style={styles.mutual_sec}>
              <Text style={styles.mutual_text}>BANK DETAILS</Text>
            </View>
            {iinBank?.length > 0 ? (
              <>
                {iinBank?.map((item, index) => (
                  <View key={item?.BANK_NAME + index}>
                    {item?.DEFAULT_BANK == "Y" && (
                      <View
                        style={{
                          width: 50,
                          height: 20,
                          borderWidth: 1,
                          borderRadius: 5,
                          // position: "absolute",
                          left: "80%",
                          top: 10,
                          borderColor: "red",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ color: "red", fontSize: 12 }}>
                          Default
                        </Text>
                      </View>
                    )}

                    <View style={styles.mutual_bottomsec}>
                      <View style={styles.mutual_left}>
                        <Text style={styles.customer}>Bank Name :</Text>
                        <Text style={styles.id_text}>{item?.BANK_NAME}</Text>
                        <Text style={styles.customer}>IFSC Code :</Text>
                        <Text style={styles.id_text}>{item?.IFSC_CODE}</Text>
                        <Text style={styles.customer}>Branch Name :</Text>
                        <Text style={styles.id_text}>{item?.BRANCH_NAME}</Text>
                      </View>
                      <View style={styles.mutual_right}>
                        <Text style={styles.customer}>Account Type :</Text>
                        <Text style={styles.id_text}>{item?.AC_TYPE}</Text>
                        <Text style={styles.customer}>Account No :</Text>
                        <Text style={styles.id_text}>{item?.AC_NO}</Text>
                        <Text style={styles.customer}>Branch Pincode :</Text>
                        <Text style={styles.id_text}>
                          {typeof item?.BRANCH_PINCODE != "object"
                            ? item?.BRANCH_PINCODE
                            : "-"}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.address}>
                      <Text style={styles.customer}>Bank Address :</Text>
                      <Text style={styles.id_text}>
                        {item?.BRANCH_ADDRESS1}
                      </Text>
                    </View>
                    {index != iinBank?.length - 1 && iinBank?.length > 1 && (
                      <View
                        style={{
                          borderWidth: 0.3,
                          width: "80%",
                          alignSelf: "center",
                          marginVertical: 5,
                        }}
                      />
                    )}
                  </View>
                ))}
              </>
            ) : (
              <>
                <View style={styles.mutual_bottomsec}>
                  <View style={styles.mutual_left}>
                    <Text style={styles.customer}>Bank Name :</Text>
                    <Text style={styles.id_text}>{profile?.BANK_NAME}</Text>
                    <Text style={styles.customer}>IFSC Code :</Text>
                    <Text style={styles.id_text}>{profile?.IFSC_CODE}</Text>
                    <Text style={styles.customer}>Branch Name :</Text>
                    <Text style={styles.id_text}>{profile?.BRANCH_NAME}</Text>
                  </View>
                  <View style={styles.mutual_right}>
                    <Text style={styles.customer}>Account Type :</Text>
                    <Text style={styles.id_text}>{profile?.AC_TYPE}</Text>
                    <Text style={styles.customer}>Account No :</Text>
                    <Text style={styles.id_text}>{profile?.AC_NO}</Text>
                    <Text style={styles.customer}>Branch Pincode :</Text>
                    <Text style={styles.id_text}>
                      {profile?.BRANCH_PINCODE}
                    </Text>
                  </View>
                </View>
                <View style={styles.address}>
                  <Text style={styles.customer}>Bank Address :</Text>
                  <Text style={styles.id_text}>{profile?.BRANCH_ADDRESS1}</Text>
                </View>
              </>
            )}
            {steps > 4 && iinBank?.length < 2 && (
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.AddBankButton}
                onPress={() => {
                  navigation.navigate("BankAccount", { newBankAccount: true });
                }}
              >
                <Text style={styles.AddAnotherBankText}>
                  Add Another Bank Account
                </Text>
              </TouchableOpacity>
            )}

            <View style={styles.mutual_sec}>
              <Text style={styles.mutual_text}>BROKER</Text>
            </View>
            <View style={styles.mutual_bottomsec}>
              <View style={styles.mutual_left}>
                <Text style={styles.customer}>Broker Name :</Text>
                <Text style={styles.id_text}>{"Sipfund Pvt.Ltd."}</Text>
              </View>
              <View style={styles.mutual_right}>
                <Text style={styles.customer}>Code</Text>
                <Text style={styles.id_text}>{profile?.BROK_DLR_CODE}</Text>
              </View>
            </View>
          </>
        ) : (
          <View style={styles.noDetailsContainer}>
            <Image
              source={require("../../../assets/rm_not_found.png")}
              style={{
                height: 225,
                width: 225,
              }}
            />
            <Text style={styles.noDetailsText}>No details to display</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  containerScroll: {
    width: "100%",
  },
  logimg: {
    height: 65,
    width: 203,
    marginTop: 10,
  },
  banner: {
    backgroundColor: Colors.GRAY_LIGHT_5,
    alignItems: "center",
  },
  bannerimg: {
    height: 78,
    width: 92,
    marginTop: 10,
    marginBottom: 20,
  },
  profile_text: {
    color: Colors.WHITE,
    fontSize: 20,
    fontWeight: "bold",
  },
  profile_text2: {
    fontSize: 18,
    paddingVertical: 10,
    fontWeight: "bold",
  },

  icon_sec: {
    marginHorizontal: 60,
    marginTop: 30,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  icon_bg: {
    height: 40,
    width: 40,
    backgroundColor: Colors.GRAY_2,
    borderRadius: 100,
    alignItems: "center",
    paddingTop: 7,
  },
  icon_bg_act: {
    height: 40,
    width: 40,
    backgroundColor: Colors.DEEPGREEN,
    borderRadius: 100,
    alignItems: "center",
    paddingTop: 7,
  },
  border: {
    marginTop: 20,
    height: 4,
    width: "20%",
    backgroundColor: Colors.LIGHTYELLOW,
  },
  text_sec: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  icon_text: {
    width: "23%",
    textAlign: "center",
    fontSize: 8,
    color: "black"
  },
  bottom_text: {
    width: "20%",
    textAlign: "center",
    fontSize: 8,
    color: 'black'
  },
  border1: {
    width: "75%",
  },
  bottomicon_sec: {
    marginTop: 50,
    marginHorizontal: 125,
  },
  mutual_sec: {
    backgroundColor: Colors.LIGHT_WHITE,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 30,
  },
  mutual_text: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.RED,
  },
  // mutual_bottomsec
  mutual_bottomsec: {
    padding: 20,
    flexDirection: "row",
  },

  mutual_left: { width: "50%" },
  mutual_right: { width: "50%" },
  id_text: {
    color: Colors.DEEP_GRAY,
    fontSize: 15,
    paddingBottom: 10,
    height: 60,
  },
  customer: {
    fontSize: 15,
    height: 20,
    color: "black"
  },
  AddBankButton: {
    width: "90%",
    height: 50,
    backgroundColor: "#EE414A",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  AddAnotherBankText: {
    color: "#fff",
  },

  address: { paddingLeft: 20 },
  noDetailsContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
    backgroundColor: Colors.WHITE,
  },
  noDetailsText: {
    fontSize: 18,
    marginTop: 15,
  },
});
const mapStateToProps = (state) => ({
  token: state.auth.token,
  user: state.auth.user,
  profile: state.auth.profile,
  iinBank: state.auth.iinBank,
  docs: state.registration.documents,
  steps: state.home.steps,
  isFetching: state.registration.isFetching,
  uploadSuccess: state.registration.uploadSuccess,
  error: state.auth.error,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { RegistrationActions } = require("../../store/RegistrationRedux");
  const { AuthActions } = require("../../store/AuthRedux");
  return {
    ...stateProps,
    ...ownProps,
    getDocuments: (token) => {
      RegistrationActions.getDocuments(dispatch, token);
    },
    getProfile: (params, token) => {
      AuthActions.getProfile(dispatch, params, token);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(ProfileScreen);
