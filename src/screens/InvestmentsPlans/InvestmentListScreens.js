/** @format */

import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  Button,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  Alert,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import { Styles, Config, Colors, FormValidate } from "../../common";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { Image, Header, CheckBox } from "react-native-elements";
import { MyImage, InvestmentFundType } from "../../components";
import Cart from "../../components/Cart";
import RNPickerSelect from "react-native-picker-select";

function InvestmentListScreens(props) {
  const pageActive = useRef(false);
  const {
    phone,
    investment,
    newInvestment,
    token,
    configs,
    isFetching,
    myInvestlist,
    myInvestments,
    fundDetails,
  } = props;
  // const focusInput = useRef(null);
  const focusInput = React.createRef();

  const [categories, setCategories] = useState([]);
  const [dates, setDates] = useState({});
  const [sumTotal, setSumTotal] = useState([]);
  useEffect(() => {
    setCategories(Object.keys(myInvestlist));
  }, [props.route.params?.refresh, myInvestlist]);

  useEffect(() => {
    // categories.map((category, CatIndex) => {
    //   myInvestlist[category].map((item, index) => {
    //     let data = myInvestlist;
    //     data[category][index].sip = configs?.invest / categories?.length;
    //   });
    // });
  }, [categories]);

  const getSip = (value) => {
    if (!isNaN(value)) {
      return Number(value);
    }
    return 0;
  };

  const handleDelete = (productCode) => {
    let investments = myInvestlist;
    let keys = Object.keys(investments);
    for (let category in keys) {
      for (let item in investments[keys[category]]) {
        if (investments[keys[category]][item].isin === productCode) {
          if (investments[keys[category]].length === 1) {
            delete investments[keys[category]];
            myInvestments(investments);
            props.navigation.replace("InvestmentList");
            return;
          } else {
            //delete investments[keys[category]][item]
            investments[keys[category]].splice(item, 1);
            myInvestments(investments);
            props.navigation.replace("InvestmentList");
            return;
          }
        }
      }
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

  const getFundCategory = (isin) => {
    for (let category in categories) {
      for (let i in myInvestlist[categories[category]]) {
        if (myInvestlist[categories[category]][i].isin === isin)
          return categories[category];
      }
    }
    return "";
  };

  const getHoldings = (data) => {
    let formatted = [];
    let format = {};
    for (let item in data) {
      // const NewSipDates = data[item].sipDates;
      // var defaultDate = parseInt(NewSipDates.split(",")[0]);
      // defaultDate = ("0" + defaultDate).slice(-2);
      let day = data[item]?.date
        ? data[item]?.date
        : ("0" + parseInt(data[item]?.sipDates.split(",")[0])).slice(-2);
      // let day = dates[`${data[item].fund_type}${item}`]
      //   ? dates[`${data[item].fund_type}${item}`]
      //   : parseInt(data[item]?.sipDates.split(",")[0]);
      format = {
        category: getFundCategory(data[item]?.isin),
        amount: data[item].sip,
        schemeName: data[item].name,
        imagePath: data[item].imagePath,
        amc_code: data[item].amc_code,
        amc_name: data[item].amc_name,
        productCode: data[item].productCode,
        sipDates: data[item].sipDates,
        trxn_nature: props.route.params?.isLumpsum ? "N" : "S",
        folio: "",
        sip_amount: data[item].sip,
        sip_period_day: day,
        // sip_from_date: "01-Feb-2024",
        sip_from_date: sipFromDate(day),
        sip_end_date: sipEndDate(day),
      };
      //if (!props.navigation.state.params?.isLumpsum) {
      //format = {
      //...format,
      //sip_amount: data[item].sip,
      //sip_period_day: day,
      //sip_from_date: sipFromDate(day),
      //sip_end_date: sipEndDate(day),
      //};
      //}
      formatted.push(format);
    }
    return formatted;
  };

  const getParams = (data, sum) => {
    return {
      userPhoneNumber: phone,
      planName: investment?.investmentPlan,
      sip_date: "",
      userID: "",
      holdings: getHoldings(data),
      planCreatedAt: "",
      investmentPlanAmount: sum,
      paidAmount: sum,
    };
  };

  const plusMinus = (type, value, dates) => {
    let newValue = 0;
    if (type === "plus") {
      for (let i in dates.split(",")) {
        if (parseInt(dates.split(",")[i]) === parseInt(value)) {
          if (parseInt(i) === dates.split(",").length - 1) {
            newValue = parseInt(dates.split(",")[0]);
          } else {
            newValue = parseInt(dates.split(",")[parseInt(i) + 1]);
          }
        }
      }
    } else {
      for (let i in dates.split(",")) {
        if (parseInt(dates.split(",")[i]) === parseInt(value)) {
          if (parseInt(i) === 0) {
            newValue = parseInt(dates.split(",")[dates.split(",").length - 1]);
          } else {
            newValue = parseInt(dates.split(",")[parseInt(i) - 1]);
          }
        }
      }
    }
    if (newValue == 0) newValue = parseInt(dates.split(",")[0]);
    return newValue;
  };

  const [defaultValue, setDefaultValue] = useState("");
  const [newTotal, setNewTotal] = useState(configs?.invest);

  useEffect(() => {
    var totalArr = [];
    categories.map((category, CatIndex) => {
      myInvestlist[category].map((item, index) => {
        totalArr.push(item);
      });
    });

    if (categories?.length > 0) {
      var newDefaultValue =
        parseInt(configs?.invest) / parseInt(totalArr?.length);
      if (newDefaultValue % 500 != 0 && newDefaultValue != null) {
        newDefaultValue = Math.round(newDefaultValue / 500) * 500;

        if (Math.round(newDefaultValue / 500) * 500 <= 0) {
          newDefaultValue = parseInt(500);
        }

        var totalVal = newDefaultValue * totalArr?.length;
        var totalArr = [];
        var newArr = categories.map((category, CatIndex) => {
          var arr = myInvestlist[category].map((item, index) => {
            let data = myInvestlist;
            totalArr.push(item);
            data[category][index].sip = newDefaultValue;
            return item;
          });
          return arr;
        });

        setNewTotal(Math.round(newDefaultValue * totalArr.length));
        var totalReminder = newDefaultValue * totalArr.length - configs?.invest;
        Alert.alert(
          "Alert Title",
          `Your total investment amount will be ${
            totalReminder > 0 ? "increased" : "decreased"
          } by ₹${Math.abs(
            newDefaultValue * totalArr.length - configs?.invest
          )} in order to satisfy the scheme(s) minimum investment amount. Would you like to continue with this increased amount?`,
          [{ text: "OK", onPress: () => {} }]
        );

        
        // myInvestments(newArr);
        // categories.map((category, CatIndex) => {
        //   myInvestlist[category].map((item, index) => {
        //     let data = myInvestlist;
        //     
        //     data[category][index].sip = newDefaultValue;
        //   });
        // });
      } else {
        var newDefaultValue =
          parseInt(configs?.invest) / parseInt(totalArr?.length);
        var newArr = categories.map((category, CatIndex) => {
          return myInvestlist[category].map((item, index) => {
            let data = myInvestlist;
            data[category][index].sip = newDefaultValue;
            return data;
          });
        });
       
      }
      setDefaultValue(JSON.stringify(newDefaultValue));
    }
  }, [categories]);

  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => props.navigation.navigate("InvestmentDetail")}
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
          <Cart
            nav={() => {
              props.navigation.navigate("TopRatedList", {
                fromScreen: "InvestmentList",
              });
            }}
          />
        }
      />
      <ScrollView>
        <View style={styles.education}>
          <View style={styles.education_sec}>
            <Text style={styles.child}>{investment.investmentPlan}</Text>
            <Text style={styles.child_text}>Recommended Funds and Amounts</Text>
            <Text style={styles.amount}>My Investment Amount</Text>
          </View>
          <View style={styles.child_sec}>
            <MyImage
              width="112"
              height="118"
              svg={true}
              url={investment.planImagePath}
            />
            <Text style={styles.sip}>
              {configs.selectedOption === "SIP"
                ? "SIP Per Month"
                : "LumpSum Amount"}
            </Text>
            <Text style={styles.amount_text}>₹ {newTotal}</Text>
          </View>
        </View>
        {/* {console.log("CONFIGS=", configs)} */}
        {/*configs && configs.selectedOption && (
          <InvestmentFundType
            setSum={(value) => {
              setSumInvestment(Number(value));
            }}
            selectedOption={configs.selectedOption}
            myInvestments={updateInvestments}
            data={myInvestlist}
            handleDelete={handleDelete}
            onPress={(item) => {
              fundDetails(item);
              props.navigation.navigate("FundsDetails", {
                fromScreen: "InvestmentList",
              });
            }}
            handleClicked={() => {
              setClicked(true);
            }}
          />
        )*/}
        {categories.map((category, CatIndex) => {
          return (
            <>
              <Text
                style={[styles.hybrid, { paddingLeft: 20, marginLeft: -10 }]}
              >
                {category}
              </Text>
              {myInvestlist[category] &&
                myInvestlist[category].map((item, index) => {
                  var sipDates =
                    myInvestlist[category][index].sipDates.split(",");
                  var newDates = sipDates.map((object) => {
                    return {
                      label: ("0" + object).slice(-2),
                      value: ("0" + object).slice(-2)
                    };
                  });
                  var defaultDate = parseInt(item?.sipDates.split(",")[0]);
                  defaultDate = ("0" + defaultDate).slice(-2);
                  return (
                    <View key={item?.productCode} style={styles.axis_asset}>
                      <View
                        style={[
                          styles.company,
                          {
                            justifyContent:
                              item?.type === "new"
                                ? "space-between"
                                : "flex-start",
                          },
                        ]}
                      >
                        <Image
                          source={{ uri: item?.imagePath }}
                          style={styles.axisimg}
                        />
                        <View style={styles.management}>
                          <Text numberOfLines={1} style={styles.axis}>
                            {item?.name}
                          </Text>
                          {/*<Text style={styles.moderately}>
                            {item?.productCode}
                          </Text>*/}
                        </View>
                        <AntDesign
                          style={{
                            display: item?.type === "new" ? "flex" : "none",
                          }}
                          name="delete"
                          size={24}
                          color="#C0392B"
                          onPress={() => handleDelete(item?.isin)}
                        />
                      </View>

                      <View style={styles.border_sec}>
                        <View style={styles.border}>
                          <View
                            style={{
                              borderWidth: 1,
                              borderColor: Colors.DEEP_GRAY,
                            }}
                          ></View>
                        </View>
                        <View style={styles.icons}>
                          <TouchableOpacity
                            style={styles.circle}
                            onPress={() => {
                              fundDetails(item);
                              props.navigation.navigate("Funds",{screen : "FundsDetails", params : {
                                fromScreen: "InvestmentList",
                              }});
                            }}
                          >
                            <AntDesign name="right" size={30} color="#C0392B" />
                          </TouchableOpacity>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <View style={styles.select}>
                          <Text style={styles.no}>Min Investment</Text>
                          <Text style={{color:"black"}}>
                            ₹
                            {props.route.params?.isLumpsum
                              ? item?.lumpsum_min_amount
                              : item?.sip_min_amount}
                          </Text>
                        </View>
                        {configs?.selectedOption &&
                          configs?.selectedOption === "SIP" && (
                            <View style={styles.select}>
                              <Text style={styles.no}>SIP Date</Text>

                              {/* <Text style={styles.no}>
                                {myInvestlist[category][index].sipDates.split(
                                  ","
                                )}
                              </Text> */}
                              <View style={styles.returnsbox}>
                                <View
                                  style={
                                    {
                                      // width: "48%",
                                      // height: 120,
                                      // alignItems: "center",
                                      // borderWidth: 1,
                                    }
                                  }
                                >
                                  <RNPickerSelect
                                    ref={focusInput}
                                    placeholder={{
                                      label: "Select a Date",
                                      value: null,
                                    }}
                                    style={{
                                      inputIOS: styles.dropDown,
                                      inputAndroid: styles.dropDown,
                                      placeholder: styles.dropDown,
                                      height: 120,
                                    }}
                                    useNativeAndroidPickerStyle={false}
                                    onValueChange={(value) => {
                                      let data = myInvestlist;
                                      let date = data[category][index]?.date
                                        ? data[category][index]?.date
                                        : parseInt(
                                            item?.sipDates.split(",")[0]
                                          );
                                      data[category][index].date = value;
                                      setDates({
                                        ...dates,
                                        [`${category}${index}`]: value,
                                      });
                                      myInvestments(data);
                                    }}
                                    value={
                                      dates[`${category}${index}`]
                                        ? dates[`${category}${index}`]
                                        : defaultDate
                                    }
                                    // value={
                                    //   dates[`${category}${index}`]
                                    //     ? dates[`${category}${index}`]
                                    //     : parseInt(item?.sipDates.split(",")[0])
                                    // }
                                    items={newDates}
                                    Icon={() => {
                                      // if (icon) return icon;
                                      return (
                                        <AntDesign
                                          name="caretdown"
                                          size={15}
                                          style={{
                                            marginTop: 7,
                                            marginRight: -10,
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
                                </View>
                                {/* <TouchableOpacity
                                  style={{
                                    zIndex: 1,
                                    width: 20,
                                    borderWidth: 1,
                                  }}
                                >
                                  <AntDesign
                                    name="caretdown"
                                    size={15}
                                    style={{
                                      marginTop: 7,
                                      marginRight: -20,
                                    }}
                                    color="#C0392B"
                                  />
                                </TouchableOpacity> */}
                              </View>
                              {/* <View style={{ flexDirection: "row" }}>
                                <Text style={styles.new}>
                                  {dates[`${category}${index}`]
                                    ? dates[`${category}${index}`]
                                    : parseInt(item?.sipDates.split(",")[0])}
                                </Text>
                                <View style={{ flexDirection: "column" }}>
                                  <TouchableOpacity
                                    onPress={() => {
                                      let data = myInvestlist;
                                      let date = data[category][index]?.date
                                        ? data[category][index]?.date
                                        : parseInt(
                                            item?.sipDates.split(",")[0]
                                          );
                                      let modifiedDate = plusMinus(
                                        "plus",
                                        date,
                                        data[category][index].sipDates
                                      );
                                      data[category][index].date = modifiedDate;
                                      setDates({
                                        ...dates,
                                        [`${category}${index}`]: modifiedDate,
                                      });
                                      myInvestments(data);
                                    }}
                                  >
                                    <AntDesign
                                      name="caretup"
                                      size={15}
                                      color="#C0392B"
                                    />
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    onPress={() => {
                                      let data = myInvestlist;
                                      let date = data[category][index]?.date
                                        ? data[category][index]?.date
                                        : parseInt(
                                            item?.sipDates.split(",")[0]
                                          );
                                      let modifiedDate = plusMinus(
                                        "minus",
                                        date,
                                        data[category][index].sipDates
                                      );
                                      data[category][index].date = modifiedDate;
                                      setDates({
                                        ...dates,
                                        [`${category}${index}`]: modifiedDate,
                                      });
                                      myInvestments(data);
                                    }}
                                  >
                                    <AntDesign
                                      name="caretdown"
                                      size={15}
                                      color="#C0392B"
                                    />
                                  </TouchableOpacity>
                                </View>
                              </View> */}
                            </View>
                          )}

                        <View style={styles.select}>
                          <Text style={styles.no}>
                            {configs.selectedOption === "SIP"
                              ? "SIP Amount"
                              : "Amount"}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Text style={styles.new}>₹</Text>
                            <TextInput
                              style={[
                                styles.new,
                                {
                                  paddingHorizontal: 5,
                                  marginLeft: 5,
                                  borderRadius: 5,
                                  minWidth: 50,
                                  backgroundColor: "#ff000050",
                                },
                              ]}
                              keyboardType={"numeric"}
                              maxLength={8}
                              placeholder={"0"}
                              placeholderTextColor={"#000"}
                              onChangeText={(v) => {
                                let data = myInvestlist;
                                data[category][index].sip = v;
                                // alert(JSON.stringify(data));
                                myInvestments(data);
                              }}
                              defaultValue={defaultValue}
                              // defaultValue={JSON.stringify(
                              //   configs?.invest / categories?.length
                              // )}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })}
            </>
          );
        })}
      </ScrollView>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("InvestmentSearch")}
      >
        {/* <Text style={styles.more_funds}>I would like to add more funds</Text> */}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          /* Calculate sum of all the investments */
          // var total = sumTotal.reduce((a, b) => a + b);
          let sum = 0;
          for (let category in categories) {
            for (let item in myInvestlist[categories[category]]) {
              let amount = getSip(myInvestlist[categories[category]][item].sip);
              let minAmount = props.route.params?.isLumpsum
                ? myInvestlist[categories[category]][item]?.lumpsum_min_amount
                : myInvestlist[categories[category]][item]?.sip_min_amount;
              if (amount < minAmount && amount !== 0) {
                alert("Amount is less than minimum amount");
                return;
              }
              if (amount % 500 !== 0) {
                alert("Amount must be a multiple of 500");
                return;
              }
              sum = sum + amount;
            }
          }
          if (sum > Number(configs.invest)) {
            Alert.alert(
              "Amount exceeds total",
              "Total invested amount exceeds the amount specified. Proceed?",
              [
                {
                  text: "Don't",
                  onPress: () => console.log("Cancel Pressed"),
                },
                {
                  text: "Yes, please",
                  onPress: () => {
                    let data = [];
                    for (let category in categories) {
                      for (let item in myInvestlist[categories[category]]) {
                        if (
                          !isNaN(myInvestlist[categories[category]][item].sip)
                        ) {
                          data.push(myInvestlist[categories[category]][item]);
                        }
                      }
                    }
                    let params = getParams(data, sum);
                    //newInvestment(params, token);
                    props.navigation.navigate("InvestmentSubmit", {
                      isLumpsum: props.route.params.isLumpsum,
                      params,
                    });
                  },
                },
              ],
              { cancelable: false }
            );
          } else if (sum < Number(defaultValue)) {
            alert("Invested amount less than the total!");
          } else {
            let data = [];
            for (let category in categories) {
              for (let item in myInvestlist[categories[category]]) {
                if (!isNaN(myInvestlist[categories[category]][item].sip)) {
                  data.push(myInvestlist[categories[category]][item]);
                }
              }
            }
            let params = getParams(data, sum);
            // return;
            // alert(JSON.stringify(params));
            //newInvestment(params, token);
            // return;
            props.navigation.navigate("InvestmentSubmit", {
              isLumpsum: props.route.params.isLumpsum,
              params,
            });
          }
        }}
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
    backgroundColor: Colors.WHITE,
  },
  logimg: {
    height: 65,
    width: 203,
    marginTop: 10,
  },
  education: {
    flexDirection: "row",
    marginHorizontal: 10,
    padding: 20,
  },
  education_sec: {
    width: "70%",
    paddingTop: 20,
  },
  goals_2: {
    height: 112,
    width: 118,
  },
  child: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.RED,
  },
  child_text: {
    fontSize: 13,
    color: Colors.DEEP_GRAY,
    paddingVertical: 5,
    fontWeight: "bold",
  },
  botton_box: {
    backgroundColor: Colors.RED,
    marginHorizontal: 30,
    marginTop: 30,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.DEEP_GRAY,
    paddingVertical: 10,
    marginBottom: 20,
  },
  get_otp: {
    color: Colors.WHITE,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  //  new

  sip: {
    fontSize: 13,
    fontWeight: "bold",
    color: Colors.DEEP_GRAY,
  },
  amount: {
    paddingTop: 60,
    fontSize: 20,
    fontWeight: "bold",
    color:"black"
  },
  amount_text: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.RED,
    paddingTop: 5,
    textAlign: "center",
  },

  // hybride
  hybrid_sec: {
    marginHorizontal: 15,
    marginVertical: 20,
  },
  hybrid: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.RED,
    backgroundColor: "#dfdfdf",
    marginVertical: 10,
    marginLeft: 10,
  },
  axis_asset: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: Colors.WHITE,
    borderWidth: 0.5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    padding: 10,
  },
  company: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  management: {
    marginLeft: 10,
    width: "70%",
  },
  axis: {
    fontSize: 15,
    color:"black"
  },
  moderately: {
    fontSize: 12,
    color: Colors.DEEP_GRAY,
  },
  axisimg: {
    height: 39,
    width: 39,
    resizeMode: "contain",
  },
  checkbox: {
    position: "absolute",
    right: -20,
    top: -15,
  },
  border_sec: {
    flexDirection: "row",
    marginTop: 10,
  },
  border: {
    width: "85%",
    marginRight: 10,
  },
  icons: {
    width: "10%",
    marginTop: -15,
  },
  selectfolio_sec: {
    flexDirection: "row",
  },
  select: {
    alignItems: "center",
  },
  no: {
    fontSize: 15,
    color: Colors.BLACK,
  },
  new: {
    fontSize: 18,
    color: Colors.BLACK,
  },
  more_funds: {
    fontSize: 18,
    color: Colors.RED,
    textAlign: "center",
    marginTop: 20,
  },
  hybridimg: {
    width: 39,
    height: 43,
  },
  circle: {
    height: 35,
    width: 35,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.DEEP_GRAY,
    paddingLeft: 2,
  },
  dropDown: {
    color: Colors.BLACK,
    width: 100,
    height: 25,
    alignSelf: "center",
    textAlign: "center",
  },
  returnsbox: { flexDirection: "row" },
});
const mapStateToProps = (state) => ({
  token: state.auth.token,
  phone: state.auth.phone,
  isFetching: state.investmentplan.isFetching,
  investment: state.investmentplan.investment,
  configs: state.investmentplan.configs,
  myInvestlist: state.investmentplan.myInvestlist,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { InvestmentPlanActions } = require("../../store/InvestmentPlanRedux");
  const { FundDetailActions } = require("../../store/FundDetailRedux");
  return {
    ...stateProps,
    ...ownProps,
    investmentConfig: (data) => {
      InvestmentPlanActions.investmentConfig(dispatch, data);
    },
    myInvestments: (data) => {
      InvestmentPlanActions.myInvestments(dispatch, data);
    },
    newInvestment: (params, token) => {
      InvestmentPlanActions.newInvestment(dispatch, params, token);
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
)(InvestmentListScreens);
