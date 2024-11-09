import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Styles, Config, Colors, FormValidate } from "../common";

const MyDatePicker = (props) => {
  const { defultValue, error, onChange, noMaxDate, noDefaultDate } = props;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState();
  //noDefaultDate ? undefined : defultValue ? new Date(defultValue) : new Date()

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    onChange(date);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showDatePicker}>
        <AntDesign
          style={{ position: "absolute", left: 10, top: 20 }}
          name="calendar"
          color={"#EE4248"}
          size={18}
        />
        <Text style={styles.custom}>
          {date ? moment(date).format("DD-MM-YYYY") : "Select a date"}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={date}
        maximumDate={noMaxDate ? undefined : new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  custom: {
    borderBottomWidth: 2,
    backgroundColor: Colors.TRANSPARENT,
    borderColor: Colors.GRAY_LIGHT,
    fontSize: 18,
    marginTop: 5,
    marginLeft: 30,
    padding: 10,
    textAlign: "left",
  },
  error: {
    color: "#ff0000",
    padding: 5,
  },
});
export default MyDatePicker;
