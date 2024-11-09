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
  ToastAndroid,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import { Styles, Config, Colors, FormValidate } from "../../common";
import MySelectPicker from "../../components/MyImagePicker";
import MyTextInput from "../../components/MyTextInput";
import TopRatedFundType from "../../components/TopRatedFundType";

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { Image, Header, CheckBox, Overlay } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import appsFlyer from "react-native-appsflyer";
import Toast from "react-native-simple-toast";

function TopRatedListScreen(props) {
  const {
    token,
    cartDetails,
    getCartDetails,
    deleteItemFromCart,
    fundDetails,
    nseDetails,
    fatcaDetails,
    userDetails,
    updateRegister,
    updateNseRegistration,
    users,
    isFetching,
    route
  } = props;

  const [cartEmpty, setCartEmpty] = useState();
  const [cart, setCart] = useState([]);
  const [selectTab, setSelectTab] = useState(
    route.params?.currentTab ? route.params.currentTab : "SIP"
  );

  const toggleTab = (value) => {
    setSelectTab(value);
  };
  const [sipTotal, setSipTotal] = useState(0);
  const [lumpsumTotal, setLumpsumTotal] = useState(0);
  const [paymentCart, setPaymentCart] = useState();
  const [showNseInputs, setShowNseInputs] = useState(false);
  const [extraNseDetails, setExtraNseDetails] = useState();

  const mobileEmailRelation = [
    { value: "SE", label: "Self" },
    { value: "SP", label: "Spouse" },
    { value: "DC", label: "Dependent Children" },
    { value: "DS", label: "Dependent Siblings" },
    { value: "DP", label: "Dependent Parents" },
    { value: "GD", label: "Guardian" },
    { value: "PM", label: "PMS" },
    { value: "CD", label: "Custodian" },
    { value: "PO", label: "POA" },
  ];

  useEffect(() => {}, []);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("didFocus", () => {
      getCartDetails(token);

      // The screen is focused
      // Call any action
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  const monthsArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const sipFromDate = (sipDay, ifFullDate = true) => {
    if (ifFullDate) {
      const NDate = new Date(sipDay);
      sipDay = NDate.getDate();
    }
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    if (month === 11) {
      month = 0;
      year = year + 1;
    } else {
      month += 1;
    }

    if (day > sipDay) {
      if (month === 11) {
        month = 0;
        year = year + 1;
      } else {
        month += 1;
      }
    }

    return (
      ("00" + sipDay).match(/\d{2}$/) + "-" + monthsArr[month] + "-" + year
    );
  };
  const sipEndDate = (sipDay, ifFullDate = true) => {
    if (ifFullDate) {
      const NDate = new Date(sipDay);
      sipDay = NDate.getDate();
    }
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    if (month === 11) {
      month = 0;
      year = year + 1;
    } else {
      month += 1;
    }

    if (day > sipDay) {
      if (month === 11) {
        month = 0;
        year = year + 1;
      } else {
        month += 1;
      }
    }

    return (
      ("00" + sipDay).match(/\d{2}$/) +
      "-" +
      monthsArr[month] +
      "-" +
      `${parseInt(year) + 30}`
    );
  };

  const [tempCartState, setTempCartState] = useState([]);

  const onChangeDate = (e, index) => {
    if (
      index != null &&
      index != "null" &&
      e != null &&
      e != "null" &&
      cart[index]?.trxn_nature == "S"
    ) {
      if (cart[index] && ("0" + cart[index].sip_period_day).slice(-2) != e) {
        cart[index].sip_from_date = sipFromDate(e, false);
        cart[index].sip_end_date = sipEndDate(e, false);
        cart[index].sip_period_day = ("0" + e).slice(-2);
        setCart(cart);
        setTempCartState(cart);
        setSelectTab("LUMPSUMS");
        setTimeout(() => {
          setSelectTab("SIP");
        }, 100);
      }
      return;
    }
  };

  const onChangeFolio = (e, index, type) => {
    if (type == "SIP") {
      cart[index].folio = e ? e : "";
    } else {
      lumSumCart[index].folio = e ? e : "";
      console.log(
        "🚀 ~ onChangeFolio ~ lumSumCart:",
        JSON.stringify(lumSumCart)
      );
    }
  };

  const [lumSumCart, setLumSumCart] = useState([]);

  useEffect(() => {
    if (cartDetails) {
      var newArr = [];
      var LumSumArr = [];
      cartDetails.cartDetails?.map((item, index) => {
        if (item?.trxn_nature == "S") {
          newArr.push(item);
        } else {
          LumSumArr.push(item);
        }
      });
      setCart(newArr);
      // setLoading(false);
      setLumSumCart(LumSumArr);
      // setCart(cartDetails.cartDetails);
      // setLumSumCart(cartDetails.cartDetails);
      var newCart = newArr?.map((item, index) => {
        item.sip_from_date = sipFromDate(item?.sip_from_date);
        item.sip_end_date = sipEndDate(item?.sip_end_date);
        return item;
      });

      let sip = 0;
      let lump = 0;
      for (var item in cartDetails.cartDetails) {
        if (cartDetails.cartDetails[item].trxn_nature === "S") {
          sip = sip + Number(cartDetails.cartDetails[item].amount);
        } else if (cartDetails.cartDetails[item].trxn_nature === "N") {
          lump = lump + Number(cartDetails.cartDetails[item].amount);
        }
      }
      setSipTotal(sip);
      setLumpsumTotal(lump);
    }
  }, [cartDetails]);

  // const [loading, setLoading] = useState(false);

  const deleteItem = (key) => {
    // setLoading(true);
    let data = cart;
    for (let item in data) {
      if (data[item].product_name === key) {
        let find = data.findIndex((item, index) => {
          return item?.product_name == key;
        });

        console.log(data[item]);
        let params = [data[item]._id];
        deleteItemFromCart(params, token);
        delete data[item];
        setTimeout(() => {
          getCartDetails(token);
        }, 10);

        // getCartDetails(token);
        data.splice(find, 1);
        setCart(data);
        console.log("🚀 ~ deleteItem ~ data[item]:", JSON.stringify(find));
        break;
      }
    }
    Toast.show("Item deleted succesfully!", Toast.LONG);
    props.navigation.replace("TopRatedList", { currentTab: selectTab });
  };

  const deleteLumSumItem = (key) => {
    let data = lumSumCart;
    for (let item in data) {
      if (data[item].product_name === key) {
        console.log(data[item]);
        let params = [data[item]._id];
        deleteItemFromCart(params, token);
        delete data[item];
        setTimeout(() => {
          getCartDetails(token);
        }, 10);
        // getCartDetails(token);
        break;
      }
    }
    Toast.show("Item deleted succesfully!", Toast.LONG);
    props.navigation.replace("TopRatedList", { currentTab: selectTab });
  };

  const getFundType = () => {
    return selectTab === "SIP" ? "S" : "N";
  };

  useEffect(() => {
    let type = getFundType();
    if (selectTab === "SIP") {
      if (
        !cart ||
        cart.filter((item) => item.trxn_nature === type).length === 0
      ) {
        setCartEmpty(true);
      } else setCartEmpty(false);
    } else {
      if (
        !lumSumCart ||
        lumSumCart.filter((item) => item.trxn_nature === type).length === 0
      ) {
        setCartEmpty(true);
      } else setCartEmpty(false);
    }
  }, [selectTab, cart]);

  const [folio, setFolio] = useState("");

  useEffect(() => {
    if (folio?.folio && cart) {
      let tmp = cart;
      for (let i in tmp) {
        if (folio?.id === tmp[i]?._id) {
          let fund = tmp[i];
          fund.folio = folio?.folio;
          tmp.splice(i, 1);
          tmp = [...tmp, fund];
          setPaymentCart(tmp);
          return;
        }
      }
    }
  }, [folio]);

  const handleNseDetailsUnavailability = (data) => {
    setExtraNseDetails(data);
    setShowNseInputs(true);
  };

  const handleSubmitExtraNseDetails = () => {
    let updatedData = {
      nseDetails: {
        ...nseDetails,
        ...extraNseDetails,
      },
      userDetails,
      fatcaDetails,
    };
    updateRegister(updatedData, token);
    const nseData = {
      Iin: users?.IIN,
      inv_name: users?.name,
      Dob: nseDetails?.dob,
      ["addr1"]: nseDetails?.addr1,
      City: nseDetails?.city?.CITY,
      State: nseDetails?.state?.STATE_CODE,
      Pincode: nseDetails?.pincode,
      Country: nseDetails?.country?.COUNTRY_CODE,
      mobile_no: users?.mobileNo,
      Email: users?.email,
      bank_name: nseDetails?.bank_name?.BANK_NAME,
      acc_no: nseDetails?.acc_no,
      acc_type: nseDetails?.acc_type?.ACC_TYPE,
      ifsc_code: nseDetails?.ifsc_code,
      branch_name: nseDetails?.branch_name,
      branch_addr1: nseDetails?.branch_addr1,
      mobile_relation: extraNseDetails?.Mobile_relation,
      email_relation: extraNseDetails?.Email_relation,
      NOMINEE_OPTED: extraNseDetails?.NOMINEE_OPTED,
      NOM1_PAN: extraNseDetails?.NOM1_PAN,
    };
    updateNseRegistration(nseData, token);
    setShowNseInputs(false);
  };

  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <TouchableOpacity
          onPress={() =>
            route.params?.fromScreen
              ? props.navigation.navigate(route.params.fromScreen)
              : props.navigation.goBack()
          }
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

      {/* SIP_sec */}

      <View style={styles.sip_sec}>
        <TouchableOpacity
          onPress={() => toggleTab("SIP")}
          style={selectTab == "SIP" ? styles.sip_left : styles.lumpsum}
        >
          <Text style={selectTab == "SIP" ? styles.sip : styles.lump}>SIP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleTab("LUMPSUM")}
          style={selectTab == "LUMPSUM" ? styles.sip_left : styles.lumpsum}
        >
          <Text style={selectTab == "LUMPSUM" ? styles.sip : styles.lump}>
            LUMPSUM
          </Text>
        </TouchableOpacity>
      </View>

      {/* My Selected Funds_sec */}
      <ScrollView style={styles.containerScroll}>
        <View style={styles.fund_sec}>
          <Text style={styles.selected}>My Selected Funds</Text>
          <Text style={styles.month}>
            {selectTab === "SIP" ? "SIP Per Month" : "Lumpsum"}
          </Text>
        </View>

        {/* Monthly Investment_sec */}

        <View style={styles.fund_sec}>
          <Text style={styles.investment}>
            {selectTab === "SIP" ? "Monthly Investment" : "One Time Investment"}
            {/* {isFetching ? 1 : 2} */}
          </Text>
          <Text style={styles.price}>
            ₹ {selectTab === "SIP" ? sipTotal : lumpsumTotal}
          </Text>
        </View>
        {/* isFetching */}
        {isFetching ? (
          <View
            style={{
              height: Dimensions.get("window").width,

              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size={30} color={Colors.RED} />
          </View>
        ) : (
          <>
            {selectTab === "SIP" &&
              cart?.length > 0 &&
              cart
                .filter((item) => item.trxn_nature === "S")
                .map((item, key) => {
                  return (
                    <View key={item?._id}>
                      {/* <Text>{JSON.stringify(item)}</Text> */}
                      <TopRatedFundType
                        deleteItem={deleteItem}
                        fromSIP={true}
                        onChangeDate={onChangeDate}
                        item={item}
                        index={key}
                        sip_from_date={cart[key]?.sip_from_date}
                        onPress={() => {
                          const eventName = "top_rated_fund_clicked";

                          appsFlyer.logEvent(
                            eventName,
                            item,
                            (res) => {
                              console.log("######## AppsFlyer #######", res);
                            },
                            (err) => {
                              console.error("######## AppsFlyer #######", err);
                            }
                          );

                          item.amcName = item?.amc_name;
                          fundDetails(item);
                          props.navigation.navigate("FundsDetails", {
                            fromScreen: "TopRatedList",
                          });
                        }}
                        folio={folio}
                        setFolio={setFolio}
                        newFolio={"Test"}
                        onChangeFolio={onChangeFolio}
                        type={selectTab}
                      />
                    </View>
                  );
                })}
          </>
        )}

        {selectTab === "LUMPSUM" &&
          lumSumCart &&
          lumSumCart
            .filter((item) => item.trxn_nature === "N")
            .map((item, key) => (
              <TopRatedFundType
                key={item?._id}
                deleteItem={deleteLumSumItem}
                item={item}
                index={key}
                onPress={() => {
                  const eventName = "top_rated_fund_clicked";

                  appsFlyer.logEvent(
                    eventName,
                    item,
                    (res) => {
                      console.log("######## AppsFlyer #######", res);
                    },
                    (err) => {
                      console.error("######## AppsFlyer #######", err);
                    }
                  );
                  fundDetails(item);
                  props.navigation.navigate("FundsDetails", {
                    fromScreen: "TopRatedList",
                  });
                }}
                folio={folio}
                setFolio={(val) => setFolio(val)}
                onChangeFolio={onChangeFolio}
                type={selectTab}
              />
            ))}
      </ScrollView>
      {!cart ||
      (selectTab === "SIP" &&
        cart.filter((item) => item.trxn_nature === "S").length === 0) ||
      (selectTab === "LUMPSUM" &&
        lumSumCart.filter((item) => item.trxn_nature === "N").length === 0) ? (
        <View style={{ flexGrow: 1, alignSelf: "center" }}>
          <Text style={{ fontSize: 20 }}>{"No items in the cart"}</Text>
        </View>
      ) : (
        <></>
      )}

      <TouchableOpacity
        onPress={() => props.navigation.navigate("TopRatedHome", { users })}
      >
        <Text style={styles.more_funds}>I would like to add more funds</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          /* Check if details are enough for nse */
          //if (
          //!nseDetails["Email_relation"] ||
          //!nseDetails["Mobile_relation"] ||
          //!nseDetails["NOMINEE_OPTED"]
          //) {
          //handleNseDetailsUnavailability({
          //["Email_relation"]: nseDetails["Email_relation"],
          //["Mobile_relation"]: nseDetails["Mobile_relation"],
          //["NOM1_PAN"]: nseDetails["NOM1_PAN"],
          //["NOMINEE_OPTED"]: nseDetails["NOMINEE_OPTED"] || "N",
          //});
          //return;
          //}

          let type = getFundType();

          let tmpCart;
          if (paymentCart?.cartDetails) {
            tmpCart = paymentCart?.cartDetails;
          } else if (tempCartState?.length > 0) {
            tmpCart = tempCartState;
          } else {
            tmpCart = cart;
          }

          if (selectTab === "SIP") {
            cart?.map((item, index) => {
              if (!cart[index].hasOwnProperty("folio")) {
                cart[index].folio = "";
              }
            });
            // if (tmpCart.length > 0) {
            //   tmpCart?.map((item, index) => {
            //     if (folio) {
            //       item.folio = folio;
            //     } else {
            //       item.folio = "";
            //     }
            //   });
            // }
            if (
              !tmpCart ||
              tmpCart.filter((item) => item.trxn_nature === type).length === 0
            ) {
              Alert.alert("Cart Empty", "There are no funds to check-out!");
            } else {
              props.navigation.navigate("TopRatedSubmit", {
                cart: tmpCart.filter((item) => item.trxn_nature === type),
                isLumpsum: type === "N" ? true : false,
                planName: props.route.params?.planName,
                // folio: folio,
              });
            }
          } else {
            // if (lumSumCart.length > 0) {
            //   lumSumCart?.map((item, index) => {
            //     if (folio) {
            //       item.folio = folio;
            //     } else {
            //       item.folio = "";
            //     }
            //   });
            // }
            lumSumCart?.map((item, index) => {
              if (!lumSumCart[index].hasOwnProperty("folio")) {
                lumSumCart[index].folio = "";
              }
            });
            if (
              !lumSumCart ||
              lumSumCart.filter((item) => item.trxn_nature === type).length ===
                0
            ) {
              Alert.alert("Cart Empty", "There are no funds to check-out!");
            } else {
              props.navigation.navigate("TopRatedSubmit", {
                cart: lumSumCart,
                isLumpsum: type === "N" ? true : false,
                planName: props.route.params?.planName,
              });
            }
          }
        }}
        style={[
          styles.botton_box,
          {
            backgroundColor: cartEmpty ? "darkgray" : Colors.RED,
          },
        ]}
      >
        <Text style={styles.get_otp}>NEXT</Text>
      </TouchableOpacity>
      <Overlay visible={showNseInputs}>
        <Icon
          name="close"
          style={styles.overlayCloseIcon}
          size={25}
          onPress={() => setShowNseInputs(false)}
        />
        <Text style={styles.nseInfoText}>
          As per the regulatory requirement, the following information is
          mandatory before processing payment.
        </Text>
        <View style={styles.overlayContainer}>
          <Text style={styles.occupation}>
            {"Mobile Relation"}
            <Text style={styles.error}>*</Text>
          </Text>
          <MySelectPicker
            values={mobileEmailRelation}
            placeholder={"Select Mobile Relation"}
            defultValue={extraNseDetails?.Mobile_relation}
            onChange={(phone) => {
              setExtraNseDetails({
                ...extraNseDetails,
                ["Mobile_relation"]: phone,
              });
            }}
          />

          <Text style={styles.occupation}>
            {"Email Relation"}
            <Text style={styles.error}>*</Text>
          </Text>
          <MySelectPicker
            values={mobileEmailRelation}
            placeholder={"Select email Relation"}
            defultValue={extraNseDetails?.Email_relation}
            onChange={(mailRelation) => {
              setExtraNseDetails({
                ...extraNseDetails,
                ["Email_relation"]: mailRelation,
              });
            }}
          />

          <CheckBox
            title="I Want to Add Nominee"
            containerStyle={styles.checkbox_style}
            textStyle={{ color: Colors.BLACK, fontSize: 12, marginLeft: 5 }}
            checked={extraNseDetails?.NOMINEE_OPTED === "Y"}
            checkedColor={Colors.BLACK}
            uncheckedColor={Colors.BLACK}
            onPress={() => {
              setExtraNseDetails({
                ...extraNseDetails,
                NOMINEE_OPTED:
                  extraNseDetails?.NOMINEE_OPTED === "Y" ? "N" : "Y",
              });
            }}
          />

          {extraNseDetails?.NOMINEE_OPTED === "Y" ? (
            <>
              <Text style={styles.occupation}>
                {"Nominee PAN"}
                <Text style={styles.error}>*</Text>
              </Text>
              <MyTextInput
                placeholder={"Nominee PAN"}
                value={extraNseDetails?.NOM1_PAN}
                maxLength={10}
                onChangeText={(nominate1pan) => {
                  setExtraNseDetails({
                    ...extraNseDetails,
                    NOM1_PAN: nominate1pan,
                  });
                }}
              />
            </>
          ) : null}

          <TouchableOpacity
            onPress={handleSubmitExtraNseDetails}
            style={styles.botton_box}
          >
            <Text style={styles.get_otp}>Next</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
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
  containerScroll: {
    width: "100%",
  },
  sip_sec: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 30,
  },
  sip_left: {
    width: "50%",
    borderBottomWidth: 2,
    borderBottomColor: Colors.RED,
  },
  lumpsum: {
    width: "50%",
    borderBottomWidth: 1,
    borderBottomColor: Colors.DEEP_GRAY,
  },
  sip: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: Colors.RED,
  },
  lump: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
    color: Colors.BLACK,
  },
  fund_sec: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 10,
  },
  selected: {
    fontSize: 15,
    fontWeight: "bold",
    color: Colors.DEEP_GRAY,
  },
  month: {
    fontSize: 13,
    fontWeight: "bold",
    color: Colors.DEEP_GRAY,
    position: "absolute",
    right: 0,
  },
  investment: {
    fontSize: 15,
    fontWeight: "bold",
    color: Colors.RED,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.RED,
    position: "absolute",
    right: 0,
  },
  hybrid_sec: {
    marginHorizontal: 15,
    marginVertical: 20,
  },
  hybrid: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.RED,
    marginVertical: 10,
    marginLeft: 10,
  },
  more_funds: {
    fontSize: 18,
    color: Colors.RED,
    textAlign: "center",
    marginTop: 10,
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
  overlayCloseIcon: {
    alignSelf: "flex-end",
    marginRight: 5,
    marginVertical: 5,
  },
  nseInfoText: {
    maxWidth: "90%",
    fontSize: 16,
    paddingVertical: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  overlayContainer: {
    //width: "85%",
  },
  error: {
    color: "#ff0000",
    padding: 5,
  },
  occupation: {
    fontSize: 15,
    color: Colors.DEEP_GRAY,
    fontWeight: "bold",
    marginTop: 10,
  },
  checkbox_style: {
    marginVertical: 10,
  },
});
const mapStateToProps = (state) => ({
  token: state.auth.token,
  users: state.auth.user,
  nseDetails: state.registration.nseDetails,
  fatcaDetails: state.registration.fatcaDetails,
  userDetails: state.registration.userDetails,
  cartDetails: state.cartActions.cart,
  isFetching: state.cartActions.isFetching,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { AuthActions } = require("../../store/AuthRedux");
  const { CartActions } = require("../../store/CartActionsRedux");
  const { FundDetailActions } = require("../../store/FundDetailRedux");
  const { RegistrationActions } = require("../../store/RegistrationRedux");
  return {
    ...stateProps,
    ...ownProps,
    logOut: () => {
      AuthActions.logOut(dispatch);
    },
    getCartDetails: (token) => {
      CartActions.cartDetails(dispatch, token);
    },
    deleteItemFromCart: (params, token) => {
      CartActions.deletCart(dispatch, params, token);
    },
    fundDetails: (data) => {
      FundDetailActions.fundDetails(dispatch, data);
    },
    updateNseRegistration: (params, token) => {
      RegistrationActions.updateNseRegistration(dispatch, params, token);
    },
    updateRegister: (params, token) => {
      RegistrationActions.updateRegister(dispatch, params, token);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(TopRatedListScreen);
