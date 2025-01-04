import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Platform,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import { Styles, Colors, FormValidate } from "../../common";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Image, Header, CheckBox } from "react-native-elements";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const titleList = [
  { value: "Mr", label: "Mr." },
  { value: "Mrs", label: "Mrs." },
  { value: "Ms", label: "Ms." },
  { value: "M/s", label: "M/s." },
];

const PersonalDetails = (props) => {
  const {
    nseDetails,
    fatcaDetails,
    userDetails,
    users,
    updateRegister,
    token
  } = props;

  const [currentStep, setCurrentStep] = useState(1); 

  const [state, setState] = useState({
    title: "",
    investor: "",
    fatherName: "",
    motherName: "",
  });

  const [errors, setErrors] = useState({
    title: null,
    investor: null,
    fatherName: null,
    motherName: null,
  });

  const validateStepOne = () => {
    const { title, investor } = state;
    let isValid = true;

    if (!title) {
      setErrors((prevErrors) => ({ ...prevErrors, title: "Please Select Title" }));
      isValid = false;
    }
    if (!FormValidate.isString(investor)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        investor: "Please Enter Investor Name",
      }));
      isValid = false;
    } else if (!FormValidate.validateName(investor)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        investor: "Please Add a Valid Name",
      }));
      isValid = false;
    }

    return isValid;
  };

  const validateStepTwo = () => {
    const { fatherName, motherName } = state;
    let isValid = true;

    if (!FormValidate.isString(fatherName)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        fatherName: "Please Add Father's Name",
      }));
      isValid = false;
    } else if (!FormValidate.validateName(fatherName)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        fatherName: "Please Add a Valid Father's Name",
      }));
      isValid = false;
    }
    if (!FormValidate.isString(motherName)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        motherName: "Please Add Mother's Name",
      }));
      isValid = false;
    } else if (!FormValidate.validateName(motherName)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        motherName: "Please Add a Valid Mother's Name",
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
        const params = {
          nseDetails: {
            ...nseDetails,
            title: state.title,
            inv_name: state.investor,
            father_name: state.fatherName,
            mother_name: state.motherName,
          },
          fatcaDetails,
          userDetails,
        };
        updateRegister(params, token);
        props.navigation.navigate("OnBoard",{screen : "OccupationAndIncome"});
      }
    }
  };
  

  useEffect(() => {
    if (fatcaDetails || nseDetails || userDetails) {
      setState({
        title: nseDetails.title,
        investor: nseDetails?.inv_name ? nseDetails.inv_name : users.name,
        fatherName: nseDetails.father_name,
        motherName: nseDetails.mother_name,
      });
    }
  }, [fatcaDetails, nseDetails, userDetails]);

  useEffect(()=>{
    console.log("ENTERED");
    
  },[]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {/* HeaderRow outside the ScrollView */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => {
            if (currentStep === 2) {
              setCurrentStep(1);
            } else {
              props.navigation.goBack();
            }
          }}
          style={styles.arrowButton}
        >
          <AntDesign name={"arrowleft"} size={35} color={Colors.BLACK} />
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
        {currentStep === 1 && (
          <View style={styles.containBox}>
            <Text style={styles.slogan}>Title</Text>
            <View style={styles.titleButtonsContainer}>
              {titleList.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.titleButton,
                    state.title === item.value && styles.titleButtonSelected,
                  ]}
                  onPress={() => {
                    setErrors({ ...errors, title: null });
                    setState({ ...state, title: item.value });
                  }}
                >
                  <Text
                    style={[
                      styles.titleButtonText,
                      state.title === item.value && styles.titleButtonTextSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.text_box}>
              <Text style={styles.sub_slogan}>Name</Text>
              <TextInput
                style={styles.inputsec}
                color="black"
                placeholderTextColor={"grey"}
                autoCapitalize={"characters"}
                placeholder={"Enter Your Name"}
                value={state.investor}
                maxLength={30}
                onChangeText={(investor) => {
                  setErrors({ ...errors, investor: null });
                  setState({ ...state, investor });
                }}
              />
            </View>
          </View>
        )}
  
        {currentStep === 2 && (
          <View style={styles.containBox}>
            <Text style={styles.slogan}>Parents' Names</Text>
            <View style={styles.text_box}>
              <Text style={styles.sub_slogan}>Father's Name</Text>
              <TextInput
                style={styles.inputsec}
                color="black"
                placeholderTextColor={"grey"}
                autoCapitalize={"characters"}
                placeholder={"Father's Name"}
                value={state.fatherName}
                maxLength={30}
                onChangeText={(fatherName) => {
                  setErrors({ ...errors, fatherName: null });
                  setState({ ...state, fatherName });
                }}
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
                value={state.motherName}
                maxLength={30}
                onChangeText={(motherName) => {
                  setErrors({ ...errors, motherName: null });
                  setState({ ...state, motherName });
                }}
              />
            </View>
          </View>
        )}
      </ScrollView>
  
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity onPress={onAction} style={styles.bottomButton}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
};  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.WHITE,
  },
  containBox: {
    paddingHorizontal: 20,
    width: "100%"
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between", // Space between arrow and logo
    alignItems: "center",
    width: "100%",
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(2), // Add some spacing for better appearance
    backgroundColor: Colors.WHITE,       // Optional: Maintain consistency
    marginTop:20
  },
  arrowButton: {
    marginLeft: responsiveWidth(2),
  },
  logimg: {
    width: responsiveWidth(35),
    height: responsiveHeight(7),
    resizeMode: "contain",
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
    marginTop: 20,
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
  titleButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: responsiveHeight(1),
  },
  
  titleButton: {
    flex: 1,
    marginHorizontal: responsiveWidth(2),
    borderWidth: 1,
    borderColor: "#FFB2AA",
    borderRadius: 8,
    paddingVertical: responsiveHeight(1.2),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.WHITE,
  },
  
  titleButtonSelected: {
    backgroundColor: "#FFB2AA",
    borderColor: Colors.BLACK,
  },
  
  titleButtonText: {
    color: Colors.BLACK,
    fontSize: responsiveFontSize(2),
  },
  
  titleButtonTextSelected: {
    color: Colors.WHITE,
    fontWeight: "bold",
  },
  
});

const mapStateToProps = (state) => ({
  token: state.auth.token,
  users: state.auth.user,
  nseDetails: state.registration.nseDetails,
  fatcaDetails: state.registration.fatcaDetails,
  userDetails: state.registration.userDetails,
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
export default connect( mapStateToProps, undefined, mapDispatchToProps )(PersonalDetails);
