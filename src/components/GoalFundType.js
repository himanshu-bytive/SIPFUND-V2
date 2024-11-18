/** @format */

import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";
import { Image, CheckBox } from "react-native-elements";
import { Styles, Config, Colors, FormValidate } from "../common";
import DatePicker from "./DatePicker";

const randerData = (
  data,
  k,
  onPress,
  onChange,
  handleDelete,
  selectedOption,
  showModified,
  focusInput
) => {
  const plusMinus = (type, value, dates) => {
    alert("1");
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
    newValue = ("0" + newValue).slice(-2);
    onChange(k, newValue, "sip_period_day");
  };

  if (data?.schemeInfo && data.schemeInfo != "NA") {
    let schemeInfo = Array.isArray(data.schemeInfo)
      ? data.schemeInfo
      : [data.schemeInfo];
    return (
      <View>
        <View style={styles.hybrid_sec}>
          <View style={{ backgroundColor: "#eee" }}>
            <Text style={styles.hybrid}>{data.schems}</Text>
          </View>
        </View>
        <View>
          {schemeInfo.map((item, key) => {
            var newDates = item?.sipDates.split(",");
            var newDates = newDates.map((object) => {
              return {
                label: object,
                value: object,
              };
            });
            var defaultDate = parseInt(item?.sipDates.split(",")[0]);
            defaultDate = ("0" + defaultDate).slice(-2);
            return (
              <View key={key} style={styles.axis_asset}>
                <View style={styles.company}>
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={{ uri: item?.imagePath }}
                      style={styles.axisimg}
                    />
                    <View style={styles.management}>
                      <Text style={styles.axis}>{item?.name}</Text>
                      {/*<Text style={styles.moderately}>{item.productCode}</Text>*/}
                    </View>
                  </View>
                  <AntDesign
                    style={{
                      display: item?.type === "new" ? "flex" : "none",
                    }}
                    name="delete"
                    size={24}
                    color="#C0392B"
                    onPress={() => handleDelete(item?.productCode)}
                  />
                </View>

                <View style={styles.border_sec}>
                  <View style={styles.border}>
                    <View
                      style={{ borderWidth: 1, borderColor: Colors.DEEP_GRAY }}
                    ></View>
                  </View>
                  <View style={styles.icons}>
                    <TouchableOpacity
                      style={styles.circle}
                      onPress={() => onPress(item)}
                    >
                      <AntDesign name="right" size={30} color="#C0392B" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.selectfolio_sec}>
                  <View style={styles.select}>
                    <Text style={styles.no}>Min Investment</Text>
                    <Text style={{color:"black"}}>
                      ₹
                      {item?.default_min_amount
                        ? item?.default_min_amount
                        : "1000"}
                    </Text>
                  </View>
                  {selectedOption && selectedOption === "SIP" && (
                    <View style={styles.select}>
                      <Text style={styles.no}>SIP Date</Text>
                        <View>
                          <DatePicker
                            items={newDates}
                            value={
                              item?.sip_period_day
                                ? item?.sip_period_day
                                : defaultDate
                            }
                            onChange={(e) => {
                             
                            }}
                            
                            k={k}
                          />
                      </View>
                    </View>
                  )}

                  <View style={styles.select}>
                    <Text style={styles.no}>
                      {selectedOption === "SIP" ? "SIP Amount" : "Amount"}
                    </Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
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
                            fontSize: 14,
                          },
                        ]}
                        keyboardType={"numeric"}
                        // maxLength={6}
                        onChangeText={(value) => onChange(k, value, "sip")}
                        value={
                          item?.sip
                            ? item?.sip
                            : `${
                                showModified
                                  ? item?.allocationAmountModifiled
                                    ? item?.allocationAmountModifiled.toFixed(0)
                                    : 0
                                  : item?.allocationAmount
                                  ? item?.allocationAmount.toFixed(0)
                                  : 0
                              }`
                        }
                        maxLength={8}
                      />
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
  return null;
};

const RenderData1 = ({
  data,
  k,
  onPress,
  onChange,
  handleDelete,
  selectedOption,
  showModified,
  focusInput,
  setNewDates,
  DatePickerFun,
}) => {
  let schemeInfo = Array.isArray(data.schemeInfo)
    ? data.schemeInfo
    : [data.schemeInfo];

  const plusMinus = (type, value, dates) => {
    let newValue = 0;
    if (type === "plus") {
      for (let i in dates.split(",")) {
        if (parseInt(dates.split(",")[i]) === parseInt(value)) {
          newValue = parseInt(dates.split(",")[parseInt(i)]);
          // if (parseInt(i) === dates.split(",").length - 1) {
          //   newValue = parseInt(dates.split(",")[0]);
          //   alert("22");
          // } else {
          //   newValue = parseInt(dates.split(",")[parseInt(i)]);
          //   alert("11");
          // }
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
    onChange(k, newValue, "sip_period_day");
  };
  return (
    <View>
      {data?.schemeInfo && data.schemeInfo != "NA" ? (
        <View>
          <View style={styles.hybrid_sec}>
            <View style={{ backgroundColor: "#eee" }}>
              <Text style={styles.hybrid}>{data.schems}</Text>
            </View>
          </View>
          <View>
            {schemeInfo.map((item, key) => {
              var newDates = [];
              var defaultDate = "01";
              if (item?.sipDates) {
                var newDates = item?.sipDates ? item?.sipDates?.split(",") : [];
                var newDates =
                  newDates?.length > 0 &&
                  newDates.map((object) => {
                    return {
                      label: ("0" + object.replace(/\s/g, "")).slice(-2),
                      value: ("0" + object.replace(/\s/g, "")).slice(-2),
                    };
                  });
                var defaultDate = parseInt(item?.sipDates.split(",")[0]);
                defaultDate = ("0" + defaultDate).slice(-2);
              }
              return (
                <View key={key} style={styles.axis_asset}>
                  <View style={styles.company}>
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        source={{ uri: item?.imagePath }}
                        style={styles.axisimg}
                      />
                      <View style={styles.management}>
                        <Text style={styles.axis}>{item?.name}</Text>
                        {/*<Text style={styles.moderately}>{item.productCode}</Text>*/}
                      </View>
                    </View>
                    <AntDesign
                      style={{
                        display: item?.type === "new" ? "flex" : "none",
                      }}
                      name="delete"
                      size={24}
                      color="#C0392B"
                      onPress={() => handleDelete(item?.productCode)}
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
                        onPress={() => onPress(item)}
                      >
                        <AntDesign name="right" size={30} color="#C0392B" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.selectfolio_sec}>
                    <View style={styles.select}>
                      <Text style={styles.no}>Min Investment</Text>
                      <Text style={{color:"black"}}>
                        ₹
                        {item?.default_min_amount
                          ? item?.default_min_amount
                          : "1000"}
                      </Text>
                    </View>
                    {selectedOption && selectedOption === "SIP" && (
                      <View style={styles.select}>
                        <Text style={styles.no}>SIP Date</Text>

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
                            {/* <Text>{JSON.stringify(item?.sip_period_day)}</Text> */}

                            {/* <RNPickerSelect
                            ref={focusInput}
                            placeholder={{
                              label: "Select date",
                              value: null,
                            }}
                            style={{
                              inputIOS: styles.dropDown,
                              inputAndroid: styles.dropDown,
                              placeholder: styles.dropDown,
                              height: 12,
                              minHeight: 30,
                            }}
                            containerStyle={{ width: 150, height: 70 }}
                            useNativeAndroidPickerStyle={false}
                            onValueChange={(value) => {
                              // alert(value);
                              onChange(k, value, "sip_period_day");
                              // let data = myInvestlist;
                              // let date = data[category][index]?.date
                              //   ? data[category][index]?.date
                              //   : parseInt(item?.sipDates.split(",")[0]);
                              // data[category][index].date = value;
                              // setDates({
                              //   ...dates,
                              //   [`${category}${index}`]: value,
                              // });
                              // myInvestments(data);
                            }}
                            value={
                              item?.sip_period_day
                                ? item?.sip_period_day
                                : defaultDate
                            }
                            items={newDates}
                            // Icon={() => {
                            //   return (

                            //   );
                            // }}
                          /> */}
                          </View>
                          <DatePickerFun
                            item={item}
                            k={k}
                            newDates={newDates}
                            plusMinus={plusMinus}
                            defaultDate={defaultDate}
                          />
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
                            {item?.sip_period_day
                              ? item?.sip_period_day
                              : parseInt(item?.sipDates?.split(",")[0])}
                          </Text>
                          <View style={{ flexDirection: "column" }}>
                            <TouchableOpacity
                              onPress={() =>
                                plusMinus(
                                  "plus",
                                  item?.sip_period_day
                                    ? item?.sip_period_day
                                    : item?.sipDates?.split(",")[0],
                                  item?.sipDates
                                )
                              }
                            >
                              <AntDesign
                                name="caretup"
                                size={15}
                                color="#C0392B"
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() =>
                                plusMinus(
                                  "minus",
                                  item.sip_period_day
                                    ? item.sip_period_day
                                    : item.sipDates.split(",")[0],
                                  item.sipDates
                                )
                              }
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
                        {selectedOption === "SIP" ? "SIP Amount" : "Amount"}
                      </Text>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
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
                              fontSize: 14,
                            },
                          ]}
                          keyboardType={"numeric"}
                          // maxLength={6}
                          onChangeText={(value) => onChange(k, value, "sip")}
                          value={
                            item?.sip
                              ? item?.sip
                              : `${
                                  showModified
                                    ? item?.allocationAmountModifiled
                                      ? item?.allocationAmountModifiled.toFixed(
                                          0
                                        )
                                      : 0
                                    : item?.allocationAmount
                                    ? item?.allocationAmount.toFixed(0)
                                    : 0
                                }`
                          }
                          maxLength={8}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default function GoalFundType(props) {
  const { data, onPress, myGoles, handleDelete, selectedOption, showModified } =
    props;
  const focusInput = React.createRef();
  const [selectedDates, setSelectedDates] = useState();

  const [newData, setNewData] = useState(data ? data : []);
  const [newDates, setNewDates] = useState([]);

  useEffect(() => {
    if (data) {
      setNewData(data);
    }
  }, [data]);

  // useEffect(() => {
  // var newDate = data?.map((item, index) => {
  //   item.schemeInfo.sip_period_day = 1;
  //   return item;
  // });
  // setNewData(newDate);
  // }, []);

  const onChange = async (key, value, name) => {
    let data = JSON.parse(JSON.stringify(newData));
    data[key].schemeInfo[name] =
      isNaN(value) || value === "" ? "0" : parseInt(value, 10).toString();
    myGoles(data);
    setNewData(data);
  };

  const DatePickerFun = ({ item, k, newDates, plusMinus, defaultDate }) => {
    return (
      <>
        <DatePicker
          items={newDates}
          // value={("0" + item?.sip_period_day).slice(-2)}
          value={
            item?.sip_period_day
              ? ("0" + item?.sip_period_day).slice(-2)
              : defaultDate
          }
          onChange={(e) => {
            plusMinus("plus", e, item?.sipDates);
          }}
          k={k}
        />
      </>
    );
  };

  return (
    <>
      {newData?.map((item, key) => (
        <View key={key}>
          {/* <Text>{JSON.stringify(item)}</Text> */}
          {/* {randerData(
            item,
            key,
            onPress,
            onChange,
            handleDelete,
            selectedOption,
            showModified,
            focusInput
          )} */}
          <RenderData1
            data={item}
            k={key}
            onPress={onPress}
            onChange={onChange}
            handleDelete={handleDelete}
            selectedOption={selectedOption}
            showModified={showModified}
            focusInput={focusInput}
            setNewDates={setNewDates}
            DatePickerFun={DatePickerFun}
          />
        </View>
      ))}
    </>
  );
  return newData.map((item, key) => (
    <View key={key}>
      {/* {randerData(
        item,
        key,
        onPress,
        onChange,
        handleDelete,
        selectedOption,
        showModified,
        focusInput
      )} */}
    </View>
  ));
}

const styles = StyleSheet.create({
  hybrid_sec: {
    marginVertical: 10,
    backgroundColor: "#fff",
  },
  hybrid: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.RED,
    marginVertical: 10,
    marginLeft: 10,
    //backgroundColor: "#fff",
  },
  axis_asset: {
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: "#fff",
    borderWidth: 0.5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    padding: 5,
  },
  company: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  management: {
    marginLeft: 10,
    flexShrink: 1,
  },
  axis: {
    fontSize: 15,
    maxWidth: "90%",
    color:"black"
  },
  moderately: {
    fontSize: 12,
    color: Colors.DEEP_GRAY,
  },
  axisimg: {
    height: 40,
    width: 40,
    resizeMode: "contain",
  },
  checkbox: {
    position: "absolute",
    right: 5,
    top: -25,
  },
  border_sec: {
    flexDirection: "row",
    marginTop: 10,
  },
  border: {
    width: "85%",
    marginRight: 5,
  },
  icons: {
    width: "10%",
    marginTop: -15,
  },
  selectfolio_sec: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 0,
    paddingHorizontal:20
  },
  select: {
    alignItems: "center",
    width: "auto",
  },
  no: {
    fontSize: 15,
    color: Colors.DEEP_GRAY,
  },
  new: {
    fontSize: 18,
    color:"black"
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
});
