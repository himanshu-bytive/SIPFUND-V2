import React, { useState, useEffect, useMemo } from "react";
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
  ActivityIndicator,
  Modal,
  FlatList,
} from "react-native";
import { Image } from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { connect } from "react-redux";
import Button from "../../components/Atom/Button/Button";
import { Colors } from "../../common";

const OccupationAndIncome = (props) => {
  const {
    nseDetails,
    fatcaDetails,
    userDetails,
    token,
    occupations,
    settings,
    updateRegister,
  } = props;

  const [currentStep, setCurrentStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [state, setState] = useState({
    occupation: "",
  });

  const [errors, setErrors] = useState({
    occupation: null,
  });

  // Memoize occupations list to prevent re-renders
  const occupationsList = useMemo(
    () =>
      occupations
        ? occupations.map((item) => ({
            value: item.OCCUPATION_CODE,
            label: String(item.OCCUPATION_DESC),
          }))
        : [],
    [occupations]
  );

  useEffect(() => {
    settings(token); // Fetch settings using the token
  }, [token, settings]);

  useEffect(() => {
    if (fatcaDetails || nseDetails || userDetails) {
      setState({
        occupation: nseDetails?.occupation || "",
      });
    }
  }, [fatcaDetails, nseDetails, userDetails]);

  const validateStepOne = () => {
    const { occupation } = state;
    let isValid = true;

    if (!occupation?.OCCUPATION_CODE) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        occupation: "Please Select Occupation",
      }));
      setShowModal(true);
      isValid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        occupation: null,
      }));
      setShowModal(false);
    }
    return isValid;
  };

  const onAction = () => {
    if (validateStepOne()) {
      const params = {
        nseDetails: {
          ...nseDetails,
          occupation: state.occupation,
        },
        fatcaDetails,
        userDetails,
      };
      updateRegister(params, token);
      props.navigation.navigate("OnBoard", { screen: "Income" });
    }
  };

  const renderContent = () => {
    if (!occupations || occupations.length === 0) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.RED} />
        </View>
      );
    } else {
      return (
        <>
        <FlatList
          data={occupationsList}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.optionsContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.optionButton,
                state.occupation?.OCCUPATION_CODE === item.value &&
                  styles.optionButtonSelected,
              ]}
              onPress={() =>
                setState({
                  ...state,
                  occupation: {
                    OCCUPATION_CODE: item.value,
                    OCCUPATION_DESC: item.label,
                  },
                })
              }
            >
              <Text
                style={[
                  styles.optionText,
                  state.occupation?.OCCUPATION_CODE === item.value &&
                    styles.optionTextSelected,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
        <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.bottomButton} onPress={onAction}>
          <Text style={styles.buttonText}> Next </Text>
        </TouchableOpacity>
      </View>
      </>
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => {
            if (currentStep > 1) {
              setCurrentStep((prevStep) => prevStep - 1);
            } else {
              props.navigation.navigate("OnBoard", {
                screen: "ProfileDetailsForm",
              });
            }
          }}
          style={styles.arrowButton}
        >
          <AntDesign name={"arrowleft"} size={35} color="#000" />
        </TouchableOpacity>
        <Image
          source={require("../../../assets/icon.png")}
          style={styles.logimg}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.slogan}>Occupation</Text>
        <View style={styles.text_box}>
          <Text style={styles.sub_slogan}>Select one of the options.</Text>
        </View>
        {renderContent()}
      </View>
      <Modal
          visible={showModal}
          transparent={true}
          animationType="none"
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Please Select Occupation Before Proceeding.
              </Text>
              <Button
                text="OK"
                onPress={() => setShowModal(false)}
                backgroundColor={Colors.RED}
                textColor={Colors.WHITE}
                height={40}
                width={100}
              />
            </View>
          </View>
        </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.WHITE,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    color: "black",
    marginBottom: 20,
    textAlign: "center",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: Colors.WHITE,
    marginTop: 20,
  },
  arrowButton: {
    marginLeft: 10,
  },
  logimg: {
    width: responsiveWidth(35),
    height: responsiveHeight(7),
    resizeMode: "contain",
  },
  optionsContainer: {
    justifyContent: "center",
    width: "auto",
    height: "auto",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  optionButton: {
    width: "48%",
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: Colors.RED,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: Colors.WHITE,
  },
  optionButtonSelected: {
    backgroundColor: Colors.RED,
  },
  optionText: {
    fontSize: responsiveFontSize(2),
    color: Colors.BLACK,
  },
  optionTextSelected: {
    color: Colors.WHITE,
    fontWeight: "bold",
  },
  slogan: {
    fontSize: responsiveFontSize(3),
    color: Colors.BLACK,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: "Jomolhari",
    marginLeft: 10,
  },
  sub_slogan: {
    fontSize: responsiveFontSize(1.5),
    color: Colors.BLACK,
    marginBottom: 10,
    fontFamily: "Jomolhari",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text_box: {
    flexDirection: "column",
    width: "auto",
    marginLeft: 10,
  },
  bottomButtonContainer: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    alignItems: "center",
    marginBottom: 10,
  },
  bottomButton: {
    width: responsiveWidth(90),
    borderWidth: 2,
    borderColor: Colors.RED,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.WHITE,
  },
  buttonText: {
    color: Colors.BLACK,
    fontSize: responsiveFontSize(2),
  },
});

const mapStateToProps = (state) => ({
  token: state.auth.token,
  nseDetails: state.registration.nseDetails,
  fatcaDetails: state.registration.fatcaDetails,
  userDetails: state.registration.userDetails,
  occupations: state.registration.occupations,
});

const mapDispatchToProps = (dispatch) => {
  const { RegistrationActions } = require("../../store/RegistrationRedux");
  return {
    settings: (token) => {
      RegistrationActions.settings(dispatch, token);
    },
    updateRegister: (params, token) => {
      RegistrationActions.updateRegister(dispatch, params, token);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OccupationAndIncome);
