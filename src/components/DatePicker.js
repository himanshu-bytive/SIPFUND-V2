/** @format */

import React from "react";
import { StyleSheet, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Colors } from "../common";

const DatePicker = ({ items, value, k, onChange }) => {
  const focusInput = React.createRef();
  return (
    <>
      <RNPickerSelect
        ref={focusInput}
        placeholderTextColor={"black"}
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
          color:"black"
        }}
        containerStyle={{ width: 150, height: 70 }}
        useNativeAndroidPickerStyle={true}
        onValueChange={(value) => {
          onChange(value);
          // alert(value);
          // onChange(k, value, "sip_period_day");
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
        value={value}
        // value={
        //   item?.sip_period_day
        //     ? item?.sip_period_day
        //     : parseInt(item?.sipDates?.split(",")[0])
        // }
        items={items}
        // Icon={() => {
        //   return (

        //   );
        // }}
      />
    </>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  dropDown: {
    color: Colors.BLACK,
    width: 100,
    height: 25,
    alignSelf: "center",
    textAlign: "center",
  },
});
