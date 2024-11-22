/** @format */

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../common';
import {Picker} from '@react-native-picker/picker';
import AntDesign from "react-native-vector-icons/AntDesign";
const DatePicker = ({items, value, k, onChange,sip_period_day,showIcon}) => {
  const focusInput = React.createRef();
  return (
    <>
      <Picker
        ref={focusInput}
        selectedValue={value}
        dropdownIconColor="white" 
        onValueChange={(val, itemIndex) => onChange(val)}>
        {items?.map(item => (
          <Picker.Item label={item?.label} value={item?.value} />
        ))}
        {/* <Picker.Item label="JavaScript" value="js" /> */}
      </Picker>
      <View style={{flexDirection: 'row',marginTop:-30}}>
        <Text style={styles.new}>
          {sip_period_day ? sip_period_day : 5}
        </Text>
        <AntDesign name="caretdown" size={20} color="#C0392B" />
      </View>
    </>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  dropDown: {
    color: Colors.BLACK,
    width: 100,
    height: 25,
    alignSelf: 'center',
    textAlign: 'center',
  },
  new: {
    fontSize: 16,
    color: 'black',
    marginRight:5
  },
});
