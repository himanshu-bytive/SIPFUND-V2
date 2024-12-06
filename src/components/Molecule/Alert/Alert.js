import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';
import { colorCode } from '../../../Utils/ColorValueAndCodeMapper';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const getTypeStyles = (type) => {
  switch (type) {
    case 'success':
      return {
        icon: require('../../../assets/Icons/SuccessIcon.png'),
        textColor: 'green',
        buttonBackground: 'green',
        buttonBorder: 'green',
      };
    case 'warning':
      return {
        icon: require('../../../assets/Icons/WarningIcon.png'),
        textColor: '#E4B456',
        buttonBackground: '#E4B456',
        buttonBorder: '#E4B456',
      };
    case 'error':
      return {
        icon: require('../../../assets/Icons/ErrorIcon.png'),
        textColor: colorCode.Red,
        buttonBackground: colorCode.Red,
        buttonBorder: colorCode.Red,
      };
    default:
      return {
        icon: null,
        textColor: 'black',
        buttonBackground: 'grey',
        buttonBorder: 'grey',
      };
  }
};

const Alert = ({ ButtonTextCancel, ButtonTextConfirm, isVisible, onClose, onConfirm, type, message }) => {
  const { icon, textColor, buttonBackground, buttonBorder } = getTypeStyles(type);

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          {icon && <Image source={icon} style={styles.icon} />}
          <Text style={[styles.alertText, { color: textColor }]}>Alert!</Text>
        </View>
        <Text style={[styles.message, { color: "black" }]}>{message}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: 'white', borderColor: buttonBorder, borderWidth: 1 },
            ]}
            onPress={onConfirm}
          >
            <Text style={[styles.buttonText, { color: buttonBackground }]}>{ButtonTextConfirm}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: buttonBackground, borderColor: buttonBorder, borderWidth: 1 },
            ]}
            onPress={onClose}
          >
            <Text style={[styles.buttonText, { color: 'white' }]}>{ButtonTextCancel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 20,
    paddingBottom: 18,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
    marginTop: 2,
  },
  alertText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    alignSelf: 'flex-start',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    width: responsiveWidth(40),
    borderRadius: 25,
    marginHorizontal: 5,
    alignItems: "center",
    height: responsiveHeight(6),
  },
  buttonText: {
    fontSize: 16,
  },
});

export default Alert;
