import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CheckboxSquare = ({ value, onValueChange }) => {
  // Use local state if no external state is passed
  const [internalValue, setInternalValue] = useState(false);
  const isChecked = value !== undefined ? value : internalValue;

  const handlePress = () => {
    if (onValueChange) {
      onValueChange(!isChecked);
    } else {
      setInternalValue(!isChecked);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View style={[styles.checkbox, isChecked ? styles.selected : styles.unselected]}>
        {isChecked && <Icon name="check" size={16} color="#fff" />}
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
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  selected: {
    borderColor: '#4dff88',
    backgroundColor: '#4dff88',
  },
  unselected: {
    borderColor: '#757780',
    backgroundColor: '#fff',
  },
});

export default CheckboxSquare;