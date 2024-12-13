import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
// import CheckMark from "../../../assets/Icons/checkmark.svg";

const CheckboxCircle = ({ value, onValueChange }) => {
  return (
    <TouchableOpacity onPress={onValueChange} style={styles.container}>
      <View style={[styles.checkbox, value ? styles.selected : styles.unselected]}>
        {/* {value && <CheckMark width={16} height={16} />} */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  selected: {
    borderColor: '#0743a1',
    backgroundColor: '#0743a1',
  },
  unselected: {
    borderColor: '#757780',
    backgroundColor: '#fff',
  },
});

export default CheckboxCircle;
