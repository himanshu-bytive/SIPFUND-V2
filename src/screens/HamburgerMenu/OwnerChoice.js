/** @format */

import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  TextInput,
  BackHandler,
  ToastAndroid,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import { Styles, Config, Colors } from "../../common";
import MySelectPicker from "../../components/MySelectPicker";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Image, Header, Overlay } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Cart from "../../components/Cart";
import RNPickerSelect from "react-native-picker-select";
import Toast from "react-native-simple-toast";

function OwnerChoice(props) {
  const pageActive = useRef(false);
  const {
    token,
    isFetching,
    mainCategory,
    mainCat,
    subCatagorys,
    subCat,
    fetchScheme,
    schemeCat,
    schemeGo,
    choices,
    addItomToSip,
    addItemSucces,
    setAddItemSucces,
    cart,
    getCartDetails,
    fundDetails,
    showInside,
  } = props;
  const [catList, setCatList] = useState([]);
  const [subcatList, setSubCatList] = useState([]);
  const [schemeList, setSchemeList] = useState([]);
  const [dataAvailable, setDataAvailable] = useState(false);
  const focusInput = React.createRef();

  useEffect(() => {
    if (addItemSucces) {
      Toast.show("Added to Cart Succesfully", Toast.LONG);
      setAddItemSucces();
    }
  }, [addItemSucces]);

  useEffect(() => {
    if (choices) console.log(JSON.stringify(choices, null, 2));
  }, [choices]);

  useEffect(() => {
    if (token) {
      mainCategory(token);
    }
  }, [token]);

  useEffect(() => {
    if (mainCat) {
      const stateList = mainCat.map((item) => ({
        value: item,
        label: String(item),
      }));
      setCatList(stateList);
    }
  }, [mainCat]);

  useEffect(() => {
    if (subCat) {
      const subcatList = subCat.map((item) => ({
        value: item,
        label: String(item),
      }));
      setSubCatList(subcatList);
    }
  }, [subCat]);

  useEffect(() => {
    if (schemeCat) {
      const schemeList = schemeCat.map((item) => ({
        value: item.productISIN,
        label: String(item.productName),
      }));
      setSchemeList(schemeList);
    }
  }, [schemeCat]);

  useEffect(() => {
    if (choices && pageActive.current) {
      pageActive.current = false;
      //props.navigation.navigate('TopRatedHome')
      setDataAvailable(true);
    }
  }, [choices]);

  const [state, setState] = useState({
    catagory: "",
    subcatagory: "",
    scheme: "",
  });

  const [errors, setErrors] = useState({
    catagory: null,
    subcatagory: null,
    scheme: null,
  });

  const catAction = async (catagory) => {
    if (catagory) {
      setState({ ...state, catagory });
      subCatagorys({ catagory }, token);
    }
  };

  const subcatAction = async (subcatagory) => {
    if (subcatagory) {
      setState({ ...state, subcatagory });
      fetchScheme({ subcatagory }, token);
    }
  };

  const schemeAction = async () => {
    if (state.scheme) {
      pageActive.current = true;
      schemeGo({ isin: state.scheme }, token);
    }
  };
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

  const selList = [
    {
      value: "01",
      label: "01",
    },
    {
      value: "02",
      label: "02",
    },
    {
      value: "03",
      label: "03",
    },
    {
      value: "04",
      label: "04",
    },
    {
      value: "05",
      label: "05",
    },
    {
      value: "06",
      label: "06",
    },
    {
      value: "07",
      label: "07",
    },
    {
      value: "08",
      label: "08",
    },
    {
      value: "09",
      label: "09",
    },
    {
      value: "10",
      label: "10",
    },
    {
      value: "11",
      label: "11",
    },
    {
      value: "12",
      label: "12",
    },
    {
      value: "13",
      label: "13",
    },
    {
      value: "14",
      label: "14",
    },
    {
      value: "15",
      label: "15",
    },
    {
      value: "16",
      label: "16",
    },
    {
      value: "17",
      label: "17",
    },
    {
      value: "18",
      label: "18",
    },
    {
      value: "19",
      label: "19",
    },
    {
      value: "20",
      label: "20",
    },
    {
      value: "21",
      label: "21",
    },
    {
      value: "22",
      label: "22",
    },
    {
      value: "23",
      label: "23",
    },
    {
      value: "24",
      label: "24",
    },
    {
      value: "25",
      label: "25",
    },
    {
      value: "26",
      label: "26",
    },
    {
      value: "27",
      label: "27",
    },
    {
      value: "28",
      label: "28",
    },
    {
      value: "29",
      label: "29",
    },
    {
      value: "30",
      label: "30",
    },
  ];

  const [visible, setVisible] = useState(false);
  const [selectTab, setSelectTab] = useState("SIP");
  const [states, setStates] = useState({
    amount: "5000",
    // date: 5,
    productName: "",
    productCode: "",
    amcCode: "",
    amcName: "",
    imagePath: "",
    date: "01",
  });

  const invest = (
    imagePath,
    amcCode,
    amcName,
    productCode,
    productName,
    sipDates
  ) => {
    let date = parseInt(sipDates.split(",")[0]);
    date = date.toString().length < 2 ? "0" + date : date;
    setStates({
      ...states,
      productCode,
      productName,
      amcCode,
      amcName,
      imagePath,
      date,
    });
    setVisible(!visible);
  };
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const addToCartLumpSum = () => {
    if (+states.amount < 1000) {
      alert("Amount is less than minimum amount");
      return;
    }
    let params = {
      cartDetails: {
        trxn_nature: "N",
        amc: states.amcCode,
        amc_name: states.amcName,
        folio: "",
        product_code: states.productCode,
        product_name: states.productName,
        reinvest: "Z",
        amount: states.amount,
        sip_amount: states.amount,
        image_path: states.imagePath,
      },
    };
    addItomToSip(params, token);
    setVisible(false);
    getCartDetails(token);
  };
  const addToCartSip = () => {
    if (+states.amount < 1000) {
      alert("Amount is less than minimum amount");
      return;
    }
    let fromDate = sipFromDate(states.date);
    let endDate = sipEndDate(states.date);
    let params = {
      cartDetails: {
        trxn_nature: "S",
        sip_period_day: states.date,
        sip_from_date: fromDate,
        sip_freq: "OM",
        sip_end_date: endDate,
        sip_amount: states.amount,
        reinvest: "Z",
        product_name: states.productName,
        product_code: states.productCode,
        folio: "",
        amount: states.amount,
        amc_name: states.amcName,
        amc: states.amcCode,
        image_path: states.imagePath,
      },
    };
    console.log(params);
    addItomToSip(params, token);
    setVisible(false);
    setTimeout(() => {
      getCartDetails(token);
    }, 1000);
  };
  const sipFromDate = (sipDay) => {
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
  const sipEndDate = (sipDay) => {
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
  const toggleTab = (value) => {
    setSelectTab(value);
  };

  const plusMinus = (type, value) => {
    if (type === "plus") {
      let date = parseInt(value) + 1;
      if (date > 30) {
        date = 30;
        alert("It cannot go above");
      }
      setStates({ ...states, date });
    } else {
      let date = parseInt(value) - 1;
      if (date < 1) {
        date = 1;
        alert("It cannot go below");
      }
      setStates({ ...states, date });
    }
  };

  const backAction = () => {
    props?.navigation?.navigate("dashboard");
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  function changeNumberFormat(number, decimals = 2, recursiveCall = false) {
    const noOfLakhs = number / 100000;
    let displayStr;
    let isPlural;
  
    // Helper function for rounding numbers with proper formatting
    function roundOf(value) {
      // Safely round using toFixed or Math.round to avoid NaN on large numbers
      if (isNaN(value)) {
        return 'Invalid number';
      }
      return parseFloat(value.toFixed(decimals));
    }
  
    console.log('Original number:', number);
    console.log('No of Lakhs:', noOfLakhs);
  
    // If the number is in the range of lakhs
    if (noOfLakhs >= 1 && noOfLakhs <= 99) {
      const lakhs = roundOf(noOfLakhs);
      isPlural = lakhs > 1 && !recursiveCall;
      displayStr = `${lakhs} Lakh${isPlural ? "s" : ""}`;
    }
    // If the number is in the range of crores
    else if (noOfLakhs >= 100) {
      let crores = roundOf(noOfLakhs / 100);
      console.log('Crores:', crores);
  
      // Check if crores are large enough to recurse
      if (crores >= 100000 && !recursiveCall) {
        console.log('Recursing with crores:', crores);
        crores = changeNumberFormat(crores, decimals, true); // Recursively format if crores are large
        console.log('Formatted Crore Prefix:', crores);
      }
  
      // Handle pluralization
      isPlural = crores > 1 && !recursiveCall;
      displayStr = `${crores} Cr`;
    }
    // If the number is less than a lakh, display the number with decimals
    else {
      displayStr = roundOf(number);
    }
  
    console.log('Final Display String:', displayStr);
    return displayStr;
  }
  
  function numberWithCommas(x) {
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != "") lastThree = "," + lastThree;
    var res =
      "₹" + otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
  }

  const removeSpecialChars = (val) => {
    let string = val.replace(/[&\/\\#,+()$~%.'":*?<>{}₹]/g, "");
    setStates({ ...states, amount: string });
  };

  return (
    <View style={styles.container}>
      {!showInside && (
        <Header
          leftComponent={
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
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
            cart && (
              <Cart
                nav={() => {
                  props.navigation.navigate("Dashboard",{screen : "TopRatedList"});
                }}
              />
            )
          }
        />
      )}
      {isFetching && (
        <View style={Styles.loading}>
          <ActivityIndicator color={Colors.BLACK} size="large" />
        </View>
      )}
      <ScrollView style={styles.containerScroll}>
        <View style={styles.report_sec}>
          <View>
            <MySelectPicker
              values={catList}
              defultValue={state.catagory}
              error={errors.catagory}
              onChange={(catagory) => {
                setErrors({ ...errors, catagory: null });
                catAction(catagory);
              }}
            />
          </View>

          <View
            pointerEvents={state.catagory ? "auto" : "none"}
            style={{
              opacity: state.catagory ? 1 : 0.5,
            }}
          >
            <MySelectPicker
              values={subcatList}
              defultValue={state.subcatagory}
              error={errors.subcatagory}
              onChange={(subcatagory) => {
                setErrors({ ...errors, subcatagory: null });
                subcatAction(subcatagory);
              }}
            />
          </View>

          <View
            pointerEvents={state.subcatagory ? "auto" : "none"}
            style={{
              opacity: state.catagory ? 1 : 0.5,
            }}
          >
            <MySelectPicker
              values={schemeList}
              defultValue={state.scheme}
              error={errors.scheme}
              onChange={(scheme) => {
                setErrors({ ...errors, scheme: null });
                setState({ ...state, scheme });
              }}
            />
            <View style={{ margin: 15, flexDirection: "row-reverse" }}>
              <TouchableOpacity
                onPress={() => schemeAction()}
                style={styles.botton_box}
              >
                <Text style={styles.get_otp}>GO</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {dataAvailable ? (
          <View style={styles.axis_asset}>
            <View style={styles.company}>
              <TouchableOpacity
                onPress={() => {
                  fundDetails({
                    name: choices[0]?.nseProductDetail.productName,
                    productCode: choices[0]?.nseProductDetail.productCode,
                    imagePath: `https://sipfund.sfo2.digitaloceanspaces.com/product-AMC-images/${choices[0]?.nseProductDetail.productAMCImage}`,
                    isin: choices[0]?._id,
                  });
                  props.navigation.navigate("Funds",{screen : "FundsDetails",params : {
                    fromScreen: "Owner",
                  }});
                }}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Image
                  source={{
                    uri: `https://sipfund.sfo2.digitaloceanspaces.com/product-AMC-images/${choices[0]?.nseProductDetail.productAMCImage}`,
                  }}
                  style={styles.axisimg}
                />
                <Text numberOfLines={1} style={styles.axis}>
                  {choices[0]?.nseProductDetail?.productName}
                </Text>
                <Text style={styles.axis2}>{choices[0]?.text2}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  invest(
                    `https://sipfund.sfo2.digitaloceanspaces.com/product-AMC-images/${choices[0]?.nseProductDetail.productAMCImage}`,
                    choices[0]?.nseProductDetail?.productAmcCode,
                    choices[0]?.nseProductDetail?.productAmcName,
                    choices[0]?.nseProductDetail?.productCode,
                    choices[0]?.nseProductDetail.productName,
                    choices[0]?.nseProductDetail.sipDates
                  );
                }}
                style={styles.botton_box}
              >
                <Text style={styles.get_otp}>INVEST</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.value_sec}>
              <View style={styles.mininvestment}>
                <Text style={styles.min}>Min. Investment</Text>
                <Text style={styles.min}>
                  {choices[0]?.nseProductDetail.minimumSIPAmount > 1000
                    ? "₹" + 1000
                    : "₹" + choices[0]?.nseProductDetail.minimumSIPAmount}
                </Text>
              </View>
              <View style={styles.mininvestment}>
                <Text style={styles.min}>AUM</Text>
                <Text style={styles.min}>
                  {"₹" +
                    changeNumberFormat(
                      choices[0]?.api["PSRP-TotalMarketValueNet"]
                    )}
                </Text>
              </View>
              <View style={styles.mininvestment}>
                <Text style={styles.min}>Returns</Text>
                <Text style={styles.min}>
                  {parseInt(choices[0]?.api["DP-Return3Yr"]).toFixed(2) + "%"}
                </Text>
              </View>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: Colors.GREY_1,
                marginTop: 10,
              }}
            ></View>
          </View>
        ) : (
          <View style={styles.category_sec}>
            <Text style={styles.category}>First select category.</Text>
            <Text style={styles.category}>Then select subcategory.</Text>
            <Text style={styles.category}>Then select scheme.</Text>
            <Text style={styles.category}>Press GO.</Text>
            <Text style={styles.category}>
              For changing scheme please press the scheme nameagain
            </Text>
          </View>
        )}
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <View style={styles.pop_top}>
            <View style={styles.click_sec}>
              <View
                style={
                  selectTab == "SIP"
                    ? styles.buttom_botton2
                    : styles.buttom_botton
                }
              >
                <TouchableOpacity onPress={() => toggleTab("SIP")}>
                  <Text
                    style={
                      selectTab == "SIP" ? styles.sip_text2 : styles.sip_text
                    }
                  >
                    SIP
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={
                  selectTab == "LUMPSUM"
                    ? styles.buttom_botton2
                    : styles.buttom_botton
                }
              >
                <TouchableOpacity onPress={() => toggleTab("LUMPSUM")}>
                  <Text
                    numberOfLines={1}
                    style={
                      selectTab == "LUMPSUM"
                        ? styles.sip_text2
                        : styles.sip_text
                    }
                  >
                    Lumpsum
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {selectTab == "SIP" && (
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    //paddingHorizontal: 50,
                  }}
                >
                  <View style={styles.amount_sec}>
                    <Text style={styles.amount_tex}>Amount</Text>
                    <View style={styles.bordersec}>
                      <TextInput
                        value={numberWithCommas(states.amount)}
                        keyboardType="numeric"
                        onChangeText={(amount) => {
                          removeSpecialChars(amount);
                        }}
                        placeholder={`₹5000`}
                        style={styles.amount_tex2}
                      />
                    </View>
                  </View>
                  <View style={styles.amount_sec}>
                    <Text style={styles.amount_tex}></Text>
                    {/* <View style={[styles.bordersec, { flexDirection: "row" }]}> */}
                    {/* <Text style={styles.new}>{states.date}</Text> */}
                    <View>
                      {/* <View style={{ marginTop: 10 }}> */}
                      <RNPickerSelect
                        ref={focusInput}
                        placeholder={{
                          label: "Select a Date",
                          value: null,
                        }}
                        style={{
                          inputIOS: [styles.dropDown, { marginTop: 15 }],
                          inputAndroid: styles.dropDown,
                          placeholder: styles.dropDown,
                          // height: 250,
                          // zIndex: 1,
                        }}
                        value={states?.date}
                        defultValue={"01"}
                        useNativeAndroidPickerStyle={false}
                        onValueChange={(value) => {
                          // setStates({ ...states, value });
                          setStates({ ...states, date: value });

                          // let data = myInvestlist;
                          // let date = data[category][index]?.date
                          //   ? data[category][index]?.date
                          //   : parseInt(
                          //       item?.sipDates.split(",")[0]
                          //     );
                          // data[category][index].date = value;
                          // setDates({
                          //   ...dates,
                          //   [`${category}${index}`]: value,
                          // });
                          // myInvestments(data);
                        }}
                        // value={"01"}
                        // value={
                        //   dates[`${category}${index}`]
                        //     ? dates[`${category}${index}`]
                        //     : parseInt(item?.sipDates.split(",")[0])
                        // }
                        items={selList}
                        Icon={() => {
                          // if (icon) return icon;
                          return (
                            <AntDesign
                              name="caretdown"
                              size={15}
                              style={{
                                marginTop: 5,
                                marginRight: -25,
                              }}
                              color="#C0392B"
                            />
                          );
                        }}
                        // Icon={() => {
                        //   return (

                        //   );
                        // }}
                      />
                      {/* </View> */}
                      {/* <TouchableOpacity
                          onPress={() => plusMinus("plus", states.date)}
                        >
                          <AntDesign name="caretup" size={15} color="#C0392B" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => plusMinus("minus", states.date)}
                        >
                          <AntDesign
                            name="caretdown"
                            size={15}
                            color="#C0392B"
                          />
                        </TouchableOpacity> */}
                      {/* </View> */}
                    </View>
                  </View>
                </View>

                <View style={{ alignItems: "center" }}>
                  <TouchableOpacity
                    onPress={addToCartSip}
                    style={styles.buttom_botton2box}
                  >
                    <Text style={styles.sip_text2}>Add To Cart</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {selectTab == "LUMPSUM" && (
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    //paddingHorizontal: 50,
                  }}
                >
                  <View style={styles.amount_sec}>
                    <Text style={styles.amount_tex}>Amount</Text>
                    <View style={styles.bordersec}>
                      <TextInput
                        value={numberWithCommas(states.amount)}
                        keyboardType="numeric"
                        onChangeText={(amount) => {
                          removeSpecialChars(amount);
                        }}
                        placeholder={`₹5000`}
                        style={styles.amount_tex2}
                      />
                    </View>
                  </View>
                </View>

                <View style={{ alignItems: "center" }}>
                  <TouchableOpacity
                    onPress={addToCartLumpSum}
                    style={styles.buttom_botton2box}
                  >
                    <Text style={styles.sip_text2}>Add To Cart</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </Overlay>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  container_sec: {
    margin: 10,
  },
  containerScroll: {
    width: "100%",
  },
  logimg: {
    height: 65,
    width: 203,
    marginTop: 10,
  },

  investment_summary: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: Colors.DEEP_GRAY,
  },

  schemetype1: {
    color: Colors.DEEP_GRAY,
    marginVertical: 20,
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 10,
  },
  botton_box: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: Colors.RED,
  },
  get_otp: {
    color: Colors.WHITE,
    fontSize: 13,
    //fontWeight: "bold",
    textAlign: "center",
  },
  category_sec: {
    alignItems: "center",
    marginTop: "30%",
  },
  category: {
    fontSize: 13,
    textAlign: "center",
    color:"black"
  },
  returnsbox: { flexDirection: "row" },

  axis_asset: {
    marginTop: 60,
    paddingTop: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
  company: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  axis: {
    marginHorizontal: 10,
    fontSize: 15,
    width: Dimensions.get("window").width * 0.5,
    color:"black"
  },
  axiswid: { width: "68%" },
  axis2: {
    marginLeft: 10,
    fontSize: 12,
    color: Colors.DEEP_GRAY,
    paddingTop: 3,
  },
  axisimg: {
    height: 50,
    width: 50,
    resizeMode: "contain",
  },
  value_sec: {
    flexDirection: "row",
    marginLeft: 50,
  },
  mininvestment: {
    width: "33%",
    alignItems: "center",
  },
  min: {
    fontSize: 12,
    color:"black",
  },
  footer_sec: {
    flexDirection: "row",
    marginHorizontal: 40,
    marginVertical: 30,
    justifyContent: "space-between",
  },
  rupees: {
    width: 40,
    height: 37,
  },
  rupees_sec: { alignItems: "center" },
  rupees_text: { fontSize: 12 },
  pop_top: { width: "85%" },
  click_sec: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 20,
  },
  buttom_botton: {
    width: "45%",
    borderWidth: 1,
    borderColor: Colors.RED,
    borderRadius: 5,
    marginHorizontal: 2,
    alignItems: "center",
  },
  buttom_botton2: {
    width: "45%",
    borderRadius: 5,
    backgroundColor: Colors.RED,
    marginHorizontal: 2,
    alignItems: "center",
  },
  sip_text: {
    fontSize: 17,
    color: Colors.RED,
    fontWeight: "bold",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  sip_text2: {
    fontSize: 17,
    color: Colors.WHITE,
    fontWeight: "bold",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  amount_sec: { alignItems: "center" },
  bordersec: {
    borderWidth: 1,
    borderColor: Colors.GRAY_DEEP_1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 3,
    height: 45,
    alignItems: "center",
  },
  new: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 5,
  },
  buttom_botton2box: {
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: Colors.RED,
    marginLeft: 2,
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  amount_tex2: {
    color: Colors.DEEP_GRAY,
    width: 100,
    textAlign: "center",
    //paddingVertical: 5,
    fontSize: 18,
    alignSelf: "center",
    flex: 1,
  },
  amount_tex: { fontSize: 18 },
  dropDown: {
    color: Colors.BLACK,
    fontSize: 16,
  },
});

const mapStateToProps = (state) => ({
  token: state.auth.token,
  users: state.auth.users,
  isFetching: state.ownerChoice.isFetching,
  mainCat: state.ownerChoice.mainCat,
  subCat: state.ownerChoice.subCat,
  schemeCat: state.ownerChoice.schemeCat,
  choices: state.ownerChoice.choices,
  addItemSucces: state.cartActions.addItemSucces,
  cart: state.cartActions.cart,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { OwnerChoiceActions } = require("../../store/OwnerChoiceRedux");
  const { CartActions } = require("../../store/CartActionsRedux");
  const { FundDetailActions } = require("../../store/FundDetailRedux");
  return {
    ...stateProps,
    ...ownProps,
    mainCategory: (token) => {
      OwnerChoiceActions.mainCategory(dispatch, token);
    },
    subCatagorys: (params, token) => {
      OwnerChoiceActions.subCatagorys(dispatch, params, token);
    },
    fetchScheme: (params, token) => {
      OwnerChoiceActions.fetchScheme(dispatch, params, token);
    },
    schemeGo: (params, token) => {
      OwnerChoiceActions.schemeGo(dispatch, params, token);
    },
    addItomToSip: (params, token) => {
      CartActions.addItomToSip(dispatch, params, token);
    },
    setAddItemSucces: () => {
      CartActions.setAddItemSucces(dispatch);
    },
    getCartDetails: (token) => {
      CartActions.cartDetails(dispatch, token);
    },
    fundDetails: (data) => {
      FundDetailActions.fundDetails(dispatch, data);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(OwnerChoice);
