import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Platform,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
  ActivityIndicator,
  Alert,
  Modal,
} from "react-native";
import { Styles, Colors, FormValidate } from "../../common";
import { Image, Header, CheckBox } from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { connect } from "react-redux";
import Button from "../../components/Atom/Button/Button";

const pepList = [
  { value: "N", label: "No" },
  { value: "Y", label: "Yes" },
];

const OccupationAndIncome = (props) => {
  const {
    nseDetails,
    fatcaDetails,
    userDetails,
    users,
    updateRegister,
    token,
    occupations,
    incomes,
    settings,
    isFetching,
  } = props;

  const [currentStep, setCurrentStep] = useState(1);
  const [occupationsList, setOccupationsList] = useState([]);
  const [incomesList, setIncomesList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    settings(token);
  }, []);

  useEffect(() => {
    const occupationsList = occupations
      ? occupations.map((item) => ({
        value: item.OCCUPATION_CODE,
        label: String(item.OCCUPATION_DESC),
      }))
      : [];
    setOccupationsList(occupationsList);

    const incomesList = incomes
      ? incomes.map((item) => ({
        value: item.APP_INCOME_CODE,
        label: String(item.APP_INCOME_DESC),
      }))
      : [];
    setIncomesList(incomesList);
    console.log("INCOMELIST",incomesList);
    
  }, [occupations, incomes]);

  const [state, setState] = useState({
    occupation: "",
    income: "",
    pep: undefined,
  });

  const [errors, setErrors] = useState({
    occupation: null,
    income: null,
    pep: null,
  });

  const validateStepOne = () => {
    const { occupation } = state;
    let isValid = true;
  
    if (!occupation || !occupation.OCCUPATION_CODE) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        occupation: "Please Select Occupation",
      }));
      setShowModal(true); // Show the modal when there’s an error
      isValid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        occupation: null, // Clear the error if the validation passes
      }));
      setShowModal(false); // Hide the modal when validation passes
    }
  
    return isValid;
  };
  

  const validateStepTwo = () => {
    const { income } = state;
    let isValid = true;
  
    if (!income || !income.APP_INCOME_CODE) {  // Checking for the income's code
      setErrors((prevErrors) => ({
        ...prevErrors,
        income: "Please Select Annual Income",  // Displaying error message
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        income: null, // Clear the error message if income is selected
      }));
    }
  
    return isValid;
  };
  

  const validateStepThree = () => {
    const { pep } = state;
    let isValid = true;
  
    // Ensure that pep has a value before allowing progression
    if (!pep || !pep.code) {  // Check if pep is not selected or the code is not set
      setErrors((prevErrors) => ({
        ...prevErrors,
        pep: "Please Select if You are a PEP", // Set the error message if PEP is not selected
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        pep: null, // Clear any error message if PEP is selected
      }));
    }
  
    return isValid;
  };
  

  const onAction = () => {
    if (currentStep === 1) {
      if (validateStepOne()) {
        setCurrentStep(2);
        setErrors({});
      }
    } else if (currentStep === 2) {
      if (validateStepTwo()) {
        setCurrentStep(3);
        setErrors({});
      }
    } else if (currentStep === 3) {
      if (validateStepThree()) {
        const params = {
          nseDetails: {
            ...nseDetails,
            occupation: state.occupation,
          },
          fatcaDetails: {
            ...fatcaDetails,
            app_income: state.income,
            pep: state.pep,
          },
          userDetails,
        };
        console.log("paasing params", params);
        updateRegister(params, token);
        //Add navigation to next screen for DOB, mob-Email relation details.
        props.navigation.navigate("OnBoard", { screen: "BirthRelation" })
      }
    }
  };

  useEffect(() => {
    if (fatcaDetails || nseDetails || userDetails) {
      setState({
        occupation: nseDetails.occupation,
        income: fatcaDetails.app_income,
        pep: fatcaDetails.pep,
      });
    }
  }, [fatcaDetails, nseDetails, userDetails]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => {
            if (currentStep === 3) {
              setCurrentStep(2);
            } else if (currentStep === 2) {
              setCurrentStep(1);
            } else {
              props.navigation.navigate("OnBoard",{screen : "ProfileDetailsForm"});
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
      {isFetching ? (
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
          <ActivityIndicator size="large" color="#FFB2AA" />
        </View>
      ) : (
        <ScrollView
          style={styles.containerScroll}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={styles.containBox}>
            {currentStep === 1 ? (
              <>
                <Text style={styles.slogan}>Occupation</Text>
                <View style={styles.text_box}>
                  <Text style={styles.sub_slogan}>Select one of the options.</Text>
                  <View style={styles.optionsContainer}>
                    {occupationsList.map((option, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.optionButton,
                          state.occupation.OCCUPATION_CODE === option.value &&
                          styles.optionButtonSelected,
                        ]}
                        onPress={() =>
                          setState({
                            ...state,
                            occupation: { OCCUPATION_CODE: option.value, OCCUPATION_DESC: option.label },
                          })
                        }
                      >
                        <Text
                          style={[
                            styles.optionText,
                            state.occupation.OCCUPATION_CODE === option.value && styles.optionTextSelected,
                          ]}
                        >
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <Modal
                    visible={showModal}
                    transparent={true}
                    animationType="none"
                    onRequestClose={() => setShowModal(false)}
                  >
                    <View style={styles.modalContainer}>
                      <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Please Select Occupation Before Proceeding.</Text>
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
              </>
            ) : currentStep === 2 ? (
              <>
                <Text style={styles.slogan}>Annual Income</Text>
                <View style={styles.text_box}>
                  <Text style={styles.sub_slogan}>Select one of the options.</Text>
                  <View style={styles.optionsContainer}>
                    {incomesList.map((option, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.optionButton,
                          state.income.APP_INCOME_CODE === option.value &&
                          styles.optionButtonSelected,
                        ]}
                        onPress={() =>
                          setState({
                            ...state,
                            income: { APP_INCOME_CODE: option.value, APP_INCOME_DESC: option.label },
                          })
                        }
                      >
                        <Text
                          style={[
                            styles.optionText,
                            state.income.APP_INCOME_CODE === option.value && styles.optionTextSelected,
                          ]}
                        >
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  {errors.income && <Text style={styles.errorText}>{errors.income}</Text>}
                </View>
              </>
            ) : currentStep === 3 ? (
              <>
                <Text style={styles.slogan}>PEP</Text>
                <View style={styles.text_box}>
                  <Text style={styles.sub_slogan}>Politically exposed person.</Text>
                  <View style={styles.optionsContainer}>
                    {pepList.map((option, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.optionButton,
                          state.pep.code === option.value && styles.optionButtonSelected,
                        ]}
                        onPress={() => setState({ ...state, pep: { code: option.value, desc: option.label } })}
                      >
                        <Text
                          style={[
                            styles.optionText,
                            state.pep.code === option.value && styles.optionTextSelected,
                          ]}
                        >
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  {errors.pep && <Text style={styles.errorText}>{errors.pep}</Text>}
                </View>
              </>
            ) : null}
          </View>
        </ScrollView>
      )}
      {/* Update button container */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => {
            onAction(); // Call onAction to handle validation and step transition
          }}
        >
          <Text style={styles.buttonText}> Next </Text>
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
  errorText: {
    color: "red",
    fontSize: responsiveFontSize(1.5),
    marginTop: responsiveHeight(0.5),
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
  containBox: {
    paddingHorizontal: 12,
    width: "100%",
  },
  // headerRow: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   paddingHorizontal: responsiveWidth(4),
  //   marginTop: responsiveHeight(2),
  // },
  // arrowButton: {
  //   marginLeft: responsiveWidth(2),
  // },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between", // Distribute items (back arrow and logo) evenly
    alignItems: "center",            // Center items vertically
    width: "100%",                   // Ensure the row spans the full width
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(2),
    backgroundColor: Colors.WHITE,  // Maintain background consistency
    marginTop: 20
  },
  arrowButton: {
    marginLeft: responsiveWidth(2),
    //alignSelf: "flex-start",         // Ensure the back arrow aligns to the start
  },
  logimg: {
    width: responsiveWidth(35),      // Adjust the size of the logo as needed
    height: responsiveHeight(7),
    resizeMode: "contain",
    //alignSelf: "center",            // Keep the logo centered within its container
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "auto",
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
  // logimg: {
  //   width: responsiveWidth(35),
  //   height: responsiveHeight(7),
  //   resizeMode: "contain",
  // },
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
    flex: 1, // Ensures it takes up available space
    width: "100%",
    backgroundColor: Colors.WHITE,
  },

  text_box: {
    flexDirection: "column",
    width: "100%",
  },
  bottomButtonContainer: {
    padding: responsiveWidth(4),
    backgroundColor: Colors.WHITE,
    alignItems: "center",
    marginBottom: responsiveHeight(2), // Add a little margin for spacing
  },

  bottomButton: {
    width: responsiveWidth(90),
    borderWidth: 2,
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

const mapStateToProps = (state) => ({
  token: state.auth.token,
  users: state.auth.user,
  nseDetails: state.registration.nseDetails,
  fatcaDetails: state.registration.fatcaDetails,
  userDetails: state.registration.userDetails,
  pan: state.home.pan,
  isFetching: state.registration.isFetching,
  occupations: state.registration.occupations,
  incomes: state.registration.incomes,
  updateSuccess: state.registration.updateSuccess,
  relationList: state.registration.nomineeRelationship,
  minor_gaurdian_relationship_list: state.registration.minorGaurdianRelationship,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { RegistrationActions } = require("../../store/RegistrationRedux");
  return {
    ...stateProps,
    ...ownProps,
    settings: (token) => {
      RegistrationActions.settings(dispatch, token);
    },
    updateRegister: (params, token) => {
      RegistrationActions.updateRegister(dispatch, params, token);
    },
  };
};
export default connect(mapStateToProps, undefined, mapDispatchToProps)(OccupationAndIncome);
