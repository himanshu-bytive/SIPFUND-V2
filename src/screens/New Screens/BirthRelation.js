import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Platform,
  StyleSheet
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker"; // Import DateTimePickerModal
import { Colors } from "../../common";
import { Image } from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const PersonalDetails = (props) => {
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [mobileNumberBelongsTo, setMobileNumberBelongsTo] = useState("");
  const [emailBelongsTo, setEmailBelongsTo] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [show, setShow] = useState(false);

  const showDatePicker = () => {
    setShow(true);
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  const handleDateConfirm = (date) => {
    setDateOfBirth(date);
    hideDatePicker();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView style={styles.containerScroll} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={styles.arrowButton}
          >
            <AntDesign name={"arrowleft"} size={35} color={Colors.BLACK} />
          </TouchableOpacity>
          <Image
            source={require("../../../assets/icon.png")}
            style={styles.logimg}
          />
        </View>

        <View style={styles.containBox}>
          {false ? (
            <>
              <View style={styles.text_box}>
                <Text style={styles.sub_slogan}>Place of Birth</Text>
                <View style={styles.inputsecWrapper}>
                  <Picker
                    selectedValue={placeOfBirth}
                    onValueChange={(itemValue) => setPlaceOfBirth(itemValue)}
                    style={styles.inputsec}
                  >
                    <Picker.Item label="Select Place of Birth" value="" />
                    <Picker.Item label="Father" value="Father" />
                    <Picker.Item label="Mother" value="Mother" />
                  </Picker>
                </View>
              </View>

              <View style={styles.text_box}>
                <Text style={styles.sub_slogan}>Date of Birth</Text>
                <View style={styles.inputsecWrapper}>
                  <TouchableOpacity onPress={showDatePicker}>
                    <TextInput
                      style={styles.inputsec}
                      editable={false}
                      placeholder="Select Date of Birth"
                      value={dateOfBirth ? dateOfBirth.toLocaleDateString() : ""}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {show && (
                <DateTimePickerModal
                  isVisible={show}
                  mode="date"
                  onConfirm={handleDateConfirm}
                  onCancel={hideDatePicker}
                />
              )}
            </>
          ) : (
            <>
              <View style={styles.text_box}>
                <Text style={styles.sub_slogan}>Mobile Number belongs to</Text>
                <View style={styles.inputsecWrapper}>
                  <Picker
                    selectedValue={mobileNumberBelongsTo}
                    onValueChange={(itemValue) => setMobileNumberBelongsTo(itemValue)}
                    style={styles.inputsec}
                  >
                    <Picker.Item label="Select Mobile Owner" value="" />
                    <Picker.Item label="Father" value="Father" />
                    <Picker.Item label="Mother" value="Mother" />
                  </Picker>
                </View>
              </View>

              <View style={styles.text_box}>
                <Text style={styles.sub_slogan}>Email ID belongs to</Text>
                <View style={styles.inputsecWrapper}>
                  <Picker
                    selectedValue={emailBelongsTo}
                    onValueChange={(itemValue) => setEmailBelongsTo(itemValue)}
                    style={styles.inputsec}
                  >
                    <Picker.Item label="Select Email Owner" value="" />
                    <Picker.Item label="Father" value="Father" />
                    <Picker.Item label="Mother" value="Mother" />
                  </Picker>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.WHITE,
  },
  containBox: {
    paddingHorizontal: responsiveWidth(7),
    width: "100%",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: responsiveWidth(4),
    marginTop: responsiveHeight(2),
  },
  arrowButton: {
    marginLeft: responsiveWidth(2),
  },
  logimg: {
    width: responsiveWidth(35), // Adjusted width
    height: responsiveHeight(7), // Adjusted height
    resizeMode: "contain", // Ensure the image fits within the bounds
  },
  sub_slogan: {
    fontSize: responsiveFontSize(2.5),
    color: Colors.BLACK,
    marginBottom: responsiveHeight(1),
  },
  containerScroll: {
    width: "100%",
    backgroundColor: Colors.WHITE,
  },
  inputsecWrapper: {
    borderWidth: 1,
    borderColor: "#FFB2AA",
    borderRadius: 8,
    backgroundColor: Colors.WHITE,
    overflow: 'hidden', // To ensure the border applies to the dropdown correctly
  },
  inputsec: {
    height: responsiveHeight(6),
    fontSize: responsiveFontSize(2),
    paddingHorizontal: responsiveWidth(3),
    color: "black",
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  text_box: {
    flexDirection: "column",
    width: "100%",
  },
  bottomButtonContainer: {
    position: "absolute",
    bottom: responsiveHeight(1),
    width: "100%",
    padding: responsiveWidth(4),
    backgroundColor: Colors.WHITE,
    alignItems: "center",
  },
  bottomButton: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#FFB2AA",
    borderRadius: 8,
    paddingVertical: responsiveHeight(1),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.WHITE,
  },
  buttonText: {
    color: Colors.BLACK,
    fontSize: responsiveFontSize(2),
  },
});

export default PersonalDetails;
