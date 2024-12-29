import React from "react";
import {
  StyleSheet,
  View,
  Platform,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
  TextInput,
} from "react-native";
import { Colors } from "../../common";
import { Image } from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const PersonalDetails = (props) => {
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
        {false?
        <View style={styles.containBox}>
          <Text style={styles.slogan}>Parents Name</Text>
          <View style={styles.text_box}>
            <Text style={styles.sub_slogan}>Father's Name</Text>
            <TextInput
              style={styles.inputsec}
              color="black"
              placeholderTextColor={"grey"}
              autoCapitalize={"characters"}
              placeholder={"Father's Name"}
            />
          </View>
          <View style={styles.text_box}>
            <Text style={styles.sub_slogan}>Mother's Name</Text>
            <TextInput
              style={styles.inputsec}
              color="black"
              placeholderTextColor={"grey"}
              autoCapitalize={"characters"}
              placeholder={"Mother's Name"}
            />
          </View>
        </View>
        : (false ?
        <View style={styles.containBox}>
          <Text style={styles.slogan}>Gender</Text>
          <View style={styles.text_box}>
            <Text style={styles.sub_slogan}>Select one of the options.</Text>
            <View style={styles.genderButtonsContainer}>
              <TouchableOpacity style={styles.genderButton}>
                <Text style={styles.genderButtonText}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.genderButton}>
                <Text style={styles.genderButtonText}>Female</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        :
        <View style={styles.containBox}>
          <Text style={styles.slogan}>Marital Status</Text>
          <View style={styles.text_box}>
            <Text style={styles.sub_slogan}>Select one of the options.</Text>
            <View style={styles.genderButtonsContainer}>
              <TouchableOpacity style={styles.genderButton}>
                <Text style={styles.genderButtonText}>Single</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.genderButton}>
                <Text style={styles.genderButtonText}>Married</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>)
        
        }
      </ScrollView>
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.bottomButton}>
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
  genderButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: responsiveHeight(1),
  },
  genderButton: {
    flex: 1,
    marginHorizontal: responsiveWidth(2),
    borderWidth: 1,
    borderColor: '#FFB2AA',
    borderRadius: 8,
    paddingVertical: responsiveHeight(1.2),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.WHITE,
  },
  genderButtonText: {
    color: Colors.BLACK,
    fontSize: responsiveFontSize(2),
  },  
  logimg: {
    width: responsiveWidth(35), // Adjusted width
    height: responsiveHeight(7), // Adjusted height
    resizeMode: "contain", // Ensure the image fits within the bounds
  },
  slogan: {
    fontSize: responsiveFontSize(3),
    color: Colors.BLACK,
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(1),
    fontFamily: "Jomolhari",
  },
  sub_slogan: {
    fontSize: responsiveFontSize(2.5),
    color: Colors.BLACK,
    marginBottom: responsiveHeight(1),
    fontFamily: "Jomolhari",
  },
  containerScroll: {
    width: "100%",
    backgroundColor: Colors.WHITE,
  },
  inputsec: {
    borderWidth: 1,
    borderColor: "#FFB2AA",
    fontSize: responsiveFontSize(2),
    paddingHorizontal: responsiveWidth(3),
    height: responsiveHeight(6),
    borderRadius: 8,
    backgroundColor: Colors.WHITE,
    color: "black",
    flex: 1,
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
