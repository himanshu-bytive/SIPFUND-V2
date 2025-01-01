import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Platform,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
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

const pepList = [
  { value: "N", label: "No" },
  { value: "Y", label: "Yes" },
  { value: "R", label: "Related to PEP" },
];

const OccupationAnnualIncomePEP = (props) => {
  const {
    nseDetails,
    fatcaDetails,
    userDetails,
    users,
    updateRegister,
    token,
    occupations,
    incomes,
  } = props;

  const [currentStep, setCurrentStep] = useState(1);
  const [occupationsList, setOccupationsList] = useState([]);
  const [incomesList, setIncomesList] = useState([]);

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
  }, [occupations, incomes]);

  const [state, setState] = useState({
    occupation: "",
    income: "",
    isPep: undefined,
  });

  const [errors, setErrors] = useState({
    occupation: null,
    income: null,
    pep: null,
  });

  const validateStepOne = () => {
    const { occupation } = state;
    let isValid = true;

    if (!occupation) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        occupation: "Please Select Occupation",
      }));
      isValid = false;
    }

    return isValid;
  };

  const validateStepTwo = () => {
    const { income } = state;
    let isValid = true;

    if (!income) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        income: "Please Select Annual Income",
      }));
      isValid = false;
    }

    return isValid;
  };

  const validateStepThree = () => {
    const { isPep } = state;
    let isValid = true;
  
    if (isPep === undefined) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        pep: "Please Select if You are a PEP",
      }));
      isValid = false;
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
            income: state.income,
            isPep: state.isPep,
          },
          userDetails,
        };
        console.log("params", params);
        updateRegister(params, token);
      }
    }
  };

  useEffect(() => {
    if (fatcaDetails || nseDetails || userDetails) {
      setState({
        occupation: nseDetails.occupation.OCCUPATION_CODE,
        income: fatcaDetails.app_income.APP_INCOME_CODE,
        pep: fatcaDetails.pep.code,
      });
    }
  }, [fatcaDetails, nseDetails, userDetails]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
        {/* Header Section */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => {
              if (currentStep === 3) {
                setCurrentStep(2);
              } else if (currentStep === 2) {
                setCurrentStep(1);
              } else {
                //props.navigation.navigate("newScreens",{screen : "PersonalDetails"})
                props.navigation.goBack()
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
      <ScrollView
        style={styles.containerScroll}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Conditional Content Based on currentStep */}
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
                        state.occupation === option.value &&
                          styles.optionButtonSelected,
                      ]}
                      onPress={() => setState({ ...state, occupation: option.value })}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          state.occupation === option.value &&
                            styles.optionTextSelected,
                        ]}
                      >
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {errors.occupation && (
                  <Text style={styles.errorText}>{errors.occupation}</Text>
                )}
              </View>
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
                        state.income === option.value &&
                          styles.optionButtonSelected,
                      ]}
                      onPress={() => setState({ ...state, income: option.value })}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          state.income === option.value &&
                            styles.optionTextSelected,
                        ]}
                      >
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {errors.income && (
                  <Text style={styles.errorText}>{errors.income}</Text>
                )}
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
                        state.isPep === option.value && styles.optionButtonSelected,
                      ]}
                      onPress={() => setState({ ...state, isPep: option.value })}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          state.isPep === option.value && styles.optionTextSelected,
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

      {/* Footer Section */}
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
  containBox: {
    paddingHorizontal: responsiveWidth(7),
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

    fetchTheNomineeRelationshipList: () => {
      RegistrationActions.fetchNomineeRelationship(dispatch);
    },
    fetchMinorGaurdianRelationshipList: () => {
      RegistrationActions.fetchMinorGaurdianRelationship(dispatch);
    },
  };
};
export default connect( mapStateToProps, undefined, mapDispatchToProps )(OccupationAnnualIncomePEP);
