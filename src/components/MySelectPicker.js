import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Styles, Config, Colors, FormValidate } from "../common";

const MySelectPicker = (props) => {
  const focusInput = useRef(null);
  const {
    values,
    defultValue,
    error,
    placeholder,
    onChange,
    style,
    containerStyle,
    icon,
    mainWrapperContainerStyle,
    iconStyle,
  } = props;

  const extraProps =
    Platform.OS === "android"
      ? {
          fixAndroidTouchableBug: true,
          useNativeAndroidPickerStyle: false,
        }
      : {};

  useEffect(() => {
    if (error) {
      focusInput.current.togglePicker();
    }
  }, [error]);

  return (
    <View>
      <View
        style={
          mainWrapperContainerStyle
            ? mainWrapperContainerStyle
            : styles.container
        }
      >
        <RNPickerSelect
          ref={focusInput}
          placeholder={{
            label: placeholder ? placeholder : "Select a Item",
            value: null,
          }}
          style={{
            inputIOS: containerStyle ? containerStyle : styles.custom,
            inputAndroid: containerStyle ? containerStyle : styles.custom,
            placeholder: style ? style : styles.custom,
          }}
          onValueChange={(value) => onChange(value)}
          value={defultValue}
          items={values}
          Icon={() => {
            if (icon) return icon;
            return (
              <AntDesign
                style={iconStyle ? iconStyle : { right: 10 }}
                name="down"
                color={"#444"}
                size={18}
              />
            );
          }}
          {...extraProps}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.TRANSPARENT,
    marginTop: 5,
    textAlign: "left",
  },
  custom: {
    fontSize: 18,
    //fontWeight: "bold",
    color: "#000",
    paddingHorizontal: 10,
    maxWidth: "85%",
  },
  error: {
    color: "#ff0000",
    padding: 5,
  },
});
export default MySelectPicker;
