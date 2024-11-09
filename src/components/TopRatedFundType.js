/** @format */

import React, { useState, useRef, useEffect, useContext } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";
import { Image, CheckBox } from "react-native-elements";
import { Styles, Config, Colors, FormValidate } from "../common";
import { MySelectPicker } from ".";
import { connect } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import DatePicker from "../components/DatePicker";

const TopRatedFundType = (props) => {
  const {
    onPress,
    item,
    deleteItem,
    fromSIP,
    onChangeDate,
    index,
    sip_from_date,
    folio,
    setFolio,
    onChangeFolio,
    type,
    key,
  } = props;

  const [values, setValues] = useState([]);

  const [folio1, setFolio1] = useState();

  const focusInput = React.createRef();

  const [dates, setDates] = useState([]);

  useEffect(() => {
    if (item?.sipDates) {
      if (item?.sipDates.length > 0) {
        var sipDates = item?.sipDates.split(",");
        var newDates = sipDates.map((object) => {
          return {
            label: ("0" + object.replace(/\s/g, "")).slice(-2),
            value: ("0" + object.replace(/\s/g, "")).slice(-2),
          };
        });
        setDates(newDates);
      } else {
      }
    } else {
      setDates([]);
    }
  }, []);

  useEffect(() => {
    if (item?.existingFolio) {
      setValues(
        item?.existingFolio.map((items) => {
          return {
            value: items.folio,
            label: items.folio,
          };
        })
      );
    }
  }, [item]);

  return (
    <>
      {/* {item?.amount > 0 && ( */}
      <View style={styles.axis_asset}>
        <View style={styles.company}>
          <Image
            source={{
              uri: `https://sipfund.sfo2.digitaloceanspaces.com/product-AMC-images/${item?.image_path}`,
            }}
            style={styles.axisimg}
          />
          <View style={styles.management}>
            <Text style={styles.axis}>{item?.product_name}</Text>
            <Text style={styles.moderately}>Moderately High Risk</Text>
          </View>

          <AntDesign
            onPress={() => deleteItem(item?.product_name)}
            name={"delete"}
            size={25}
            color={Colors.RED}
          />
        </View>

        {/* border_sec */}
        <View style={styles.border_sec}>
          <View style={styles.border}>
            <View
              style={{ borderWidth: 1, borderColor: Colors.DEEP_GRAY }}
            ></View>
          </View>
          <View style={styles.icons}>
            <TouchableOpacity style={styles.circle} onPress={onPress}>
              <AntDesign name="right" size={30} color="#C0392B" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Select Folio No._sec */}

        <View style={styles.selectfolio_sec}>
          <MySelectPicker
            defultValue={folio1}
            values={values}
            placeholder={
              values
                ? values.length > 0
                  ? "Select Folio"
                  : "New Folio"
                : "New Folio"
            }
            onChange={(val) => {
              setFolio1(val);
              onChangeFolio(val, index, type);
            }}
            style={{
              fontSize: 12,
              color: "#888",
            }}
            containerStyle={{
              paddingRight: 17,
              color: "#000",
            }}
            icon={
              <AntDesign
                style={{ top: 7 }}
                name="down"
                color={"#888"}
                size={18}
              />
            }
          />
          {fromSIP && (
            <View style={styles.select}>
              <Text style={styles.no}>SIP Date</Text>
              <View style={styles.returnsbox}>
                <View style={{}}>
                  <DatePicker
                    items={dates}
                    value={
                      item?.sip_period_day
                        ? ("0" + item?.sip_period_day).slice(-2)
                        : ("0" + parseInt(item?.sipDates?.split(",")[0])).slice(
                            -2
                          ) // '04'
                    }
                    // value={
                    //   item?.sip_period_day
                    //     ? item?.sip_period_day
                    //     : (
                    //         "0" + parseInt(item?.sipDates?.split(",")[0])
                    //       ).slice(-2) // '04'
                    // }
                    onChange={(e) => {
                      if (onChangeDate && e) {
                        onChangeDate(e, index);
                      }
                    }}
                    k={() => {}}
                  />
                  {/* item?.sip_period_day
                          ? item?.sip_period_day
                          : parseInt(item?.sipDates?.split(",")[0]) */}

                  {/* <RNPickerSelect
                      ref={focusInput}
                      placeholder={{
                        label: "Select a Date",
                        value: null,
                      }}
                      style={{
                        inputIOS: styles.dropDown,
                        inputAndroid: styles.dropDown,
                        placeholder: styles.dropDown,
                      }}
                      useNativeAndroidPickerStyle={false}
                      onValueChange={(value) => {
                        // setDates({
                        //   ...dates,
                        //   [`${category}${index}`]: value,
                        // });
                      }}
                      value={item?.sip_period_day}
                      selectedValue={item?.sip_period_day}
                      // value={
                      //   dates[`${category}${index}`]
                      //     ? dates[`${category}${index}`]
                      //     : parseInt(item?.sipDates.split(",")[0])
                      // }
                      items={dates}
                      Icon={() => {
                        // if (icon) return icon;
                        return (
                          <AntDesign
                            name="caretdown"
                            size={15}
                            style={{
                              marginTop: 7,
                              marginRight: -25,
                            }}
                            color="#C0392B"
                          />
                        );
                      }}
                    /> */}
                </View>
              </View>
              {/* <View style={{ flexDirection: "row" }}>
                  <Text style={styles.new}>
                    {item?.sip_period_day ? item?.sip_period_day : 5}
                  </Text>
                  <AntDesign name="caretdown" size={20} color="#C0392B" />
                </View> */}
            </View>
          )}
          <View style={styles.select}>
            <Text style={styles.no}>{fromSIP ? "SIP" : "Amount"}</Text>
            <Text style={styles.new}>₹{item?.amount}</Text>
          </View>
        </View>
        {fromSIP && (
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 13 }}>
              Your SIP will start from{" "}
              <Text style={{ color: "#BD3A29" }}>
                {item?.sip_from_date + " "}
              </Text>
              To <Text style={{ color: "#BD3A29" }}>{item?.sip_end_date}</Text>
            </Text>
          </View>
        )}
      </View>
      {/* )} */}
    </>
  );
};

const styles = StyleSheet.create({
  axis_asset: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: Colors.WHITE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.GREY_1,
  },
  company: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  management: {
    marginLeft: 10,
    width: "70%",
  },
  axis: {
    fontSize: 15,
  },
  moderately: {
    fontSize: 12,
    color: Colors.DEEP_GRAY,
  },
  axisimg: {
    height: 50,
    width: 50,
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
    width: "80%",
  },
  icons: {
    width: "10%",
    marginTop: -15,
    marginLeft: 10,
  },
  selectfolio_sec: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  select: {
    alignItems: "center",
    //width: "31%",
  },
  no: {
    fontSize: 14,
    color: Colors.DEEP_GRAY,
  },
  new: {
    fontSize: 16,
  },
  circle: {
    borderWidth: 2,
    borderColor: Colors.GRAY_LIGHT_1,
    borderRadius: 100,
    height: 35,
    width: 35,
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

const mapStateToProps = (state) => ({
  cart: state.cartActions.cart,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { CartActions } = require("../store/CartActionsRedux");
  return {
    ...stateProps,
    ...ownProps,
    updateCart: (cart) => {
      CartActions.updateCart(dispatch, cart);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(TopRatedFundType);
