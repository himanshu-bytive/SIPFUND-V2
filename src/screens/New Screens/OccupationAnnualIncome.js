import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Platform,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
} from "react-native";
import { Colors } from "../../common";
import { Image } from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import CheckboxCircle from "../../components/Atom/CheckBox/CheckBox";

const PersonalDetails = (props) => {
  // Local JSON data
  const data = {
    occupations: [
      "Private sector service",
      "Public sector service",
      "Government Service",
      "Business",
      "Professional",
      "Self employed",
      "Housewife",
      "Student",
      "Retired",
      "Farmer",
      "Service",
      "Agriculturalist",
    ],
    incomes: [
      "Upto 1 Lakh",
      "1 Lakh - 5 Lakh",
      "5 Lakh - 10 Lakh",
      "10 Lakh - 25 Lakh",
      "25 Lakh - 50 Lakh",
      "50 Lakh - 1 Crore",
      "1 Crore - 5 Crore",
      "More than 5 Crore",
    ],
  };

  const [section, setSection] = useState("occupation"); // Tracks the current section
  const [selectedOption, setSelectedOption] = useState(null); // Tracks the selected option

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        style={styles.containerScroll}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Header Section */}
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

        {/* Dynamic Section */}
        <View style={styles.containBox}>
          <Text style={styles.slogan}>
            {section === "occupation" ? "Occupation" : "Annual Income"}
          </Text>
          <View style={styles.text_box}>
            <Text style={styles.sub_slogan}>Select one of the options.</Text>
            <View style={styles.optionsContainer}>
              {(section === "occupation" ? data.occupations : data.incomes).map(
                (option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionButton,
                      selectedOption === option && styles.optionButtonSelected,
                    ]}
                    onPress={() => setSelectedOption(option)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        selectedOption === option && styles.optionTextSelected,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>

            {/* PEP Checkbox for Annual Income Section */}
            {section === "income" && (
              <View style={{display:'flex', flexDirection:'row', gap:15}}>
                <CheckboxCircle/>
                <Text style={styles.checkboxText}>
                  I am not politically-exposed (PEP) or related to a PEP
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Footer Section */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() =>
            section === "occupation"
              ? setSection("income")
              : alert("Next Section Triggered")
          }
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PersonalDetails;

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
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  optionButton: {
    width: "48%",
    marginVertical: responsiveHeight(1),
    paddingVertical: responsiveHeight(1.5),
    borderWidth: 1,
    borderColor: "#FFB2AA",
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: Colors.WHITE,
  },
  optionButtonSelected: {
    backgroundColor: "#FFB2AA",
  },
  optionText: {
    fontSize: responsiveFontSize(2),
    color: Colors.BLACK,
  },
  optionTextSelected: {
    color: Colors.WHITE,
    fontWeight: "bold",
  },
  logimg: {
    width: responsiveWidth(35),
    height: responsiveHeight(7),
    resizeMode: "contain",
  },
  slogan: {
    fontSize: responsiveFontSize(3),
    color: Colors.BLACK,
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(1),
    fontFamily: "Jomolhari",
  },
  sub_slogan: {
    fontSize: responsiveFontSize(1.5),
    color: Colors.BLACK,
    marginBottom: responsiveHeight(1),
    fontFamily: "Jomolhari",
  },
  containerScroll: {
    width: "100%",
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
  checkboxContainer: {
    marginTop: responsiveHeight(2),
  },
  checkboxText: {
    fontSize: responsiveFontSize(1.5),
    color: Colors.BLACK,
  },
});
