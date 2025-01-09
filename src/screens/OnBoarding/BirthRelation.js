import React, { useState, useRef, useEffect, useContext } from "react";
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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Colors } from "../../common";
import { Image } from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { connect } from "react-redux";
import { getDateInHuman } from "../../utils/getDateInFormat";

const BirthRelations = (props) => {

  const {
    token,
    users,
    steps,
    fatcaDetails,
    nseDetails,
    userDetails,
    pan,
    updateRegister,
    settings,
    occupations,
    incomes,
    updateSuccess,
    isFetching,
    fetchTheNomineeRelationshipList,
    relationList,
    minor_gaurdian_relationship_list,
    fetchMinorGaurdianRelationshipList,
  } = props;

  const [currentStep, setCurrentStep] = useState(1);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const stateList = [
    { value: "AN", label: "Andaman and Nicobar Islands" },
    { value: "AP", label: "Andhra Pradesh" },
    { value: "AR", label: "Arunachal Pradesh" },
    { value: "AS", label: "Assam" },
    { value: "BH", label: "Bihar" },
    { value: "CH", label: "Chandigarh" },
    { value: "CG", label: "Chhattisgarh" },
    { value: "DD", label: "Daman and Diu" },
    { value: "DN", label: "Dadra and Nagar Haveli" },
    { value: "GO", label: "Goa" },
    { value: "GU", label: "Gujarat" },
    { value: "HA", label: "Haryana" },
    { value: "HP", label: "Himachal Pradesh" },
    { value: "JD", label: "Jharkhand" },
    { value: "KR", label: "Jammu and Kashmir" },
    { value: "KA", label: "Karnataka" },
    { value: "KE", label: "Kerala" },
    { value: "LD", label: "Ladakh" },
    { value: "LP", label: "Lakshadweep" },
    { value: "MA", label: "Maharashtra" },
    { value: "MN", label: "Manipur" },
    { value: "ME", label: "Meghalaya" },
    { value: "MI", label: "Mizoram" },
    { value: "NA", label: "Nagaland" },
    { value: "ND", label: "New Delhi" },
    { value: "OD", label: "ODISHA" },
    { value: "OT", label: "Others" },
    { value: "PU", label: "Punjab" },
    { value: "RA", label: "Rajasthan" },
    { value: "SI", label: "Sikkim" },
    { value: "TE", label: "Telangana" },
    { value: "TN", label: "Tamil Nadu" },
    { value: "TR", label: "Tripura" },
    { value: "UP", label: "Uttar Pradesh" },
    { value: "UR", label: "Uttarakhand" },
    { value: "WB", label: "West Bengal" }
  ];

  const mobileEmailRelation = [
    { value: "SE", label: "Self" },
    { value: "SP", label: "Spouse" },
    { value: "DC", label: "Dependent Children" },
    { value: "DS", label: "Dependent Siblings" },
    { value: "DP", label: "Dependent Parents" },
    { value: "GD", label: "Guardian" },
    { value: "PM", label: "PMS" },
    { value: "CD", label: "Custodian" },
    { value: "PO", label: "POA" },
  ];

  const [state, setState] = useState({
    place_birth: "",
    dob: null,
    mobile_relation: "",
    email_relation: "",
  });

  const [errors, setErrors] = useState({
    place_birth: null,
    dob: null,
    mobile_relation: null,
    email_relation: null,
  });

  const [placeOfBirth, setPlaceOfBirth] = useState({ STATE_CODE: "", STATE_NAME: "" });
  const [mobileNumberBelongsTo, setMobileNumberBelongsTo] = useState("");
  const [emailBelongsTo, setEmailBelongsTo] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);

  useEffect(() => {
    console.log("NSE from bbirth", nseDetails);
    console.log("FAtca", fatcaDetails);
    console.log("Users", userDetails);
  }, [])

  const onAction = () => {
    if (currentStep === 1) {
      if (!placeOfBirth.STATE_CODE) {
        setErrors((prevErrors) => ({ ...prevErrors, place_birth: "Please select a place of birth." }));
        return;
      }
      if (!dateOfBirth) {
        setErrors((prevErrors) => ({ ...prevErrors, dob: "Please select a date of birth." }));
        return;
      }

      setCurrentStep(2);
      setErrors({});
    } else if (currentStep === 2) {
      if (!mobileNumberBelongsTo) {
        setErrors((prevErrors) => ({ ...prevErrors, mobile_relation: "Please select the mobile number relation." }));
        return;
      }
      if (!emailBelongsTo) {
        setErrors((prevErrors) => ({ ...prevErrors, email_relation: "Please select the email ID relation." }));
        return;
      }

      const params = {
        nseDetails: {
          ...nseDetails,
          dob: state.dob,
          Mobile_relation: mobileNumberBelongsTo,
          Email_relation: emailBelongsTo,
        },
        fatcaDetails: {
          ...fatcaDetails,
          place_birth: placeOfBirth,
        },
        userDetails,
      };
      console.log("passing params", params);

      updateRegister(params, token);
      props.navigation.navigate("OnBoard", { screen: "AddNominee" });
    }
  };

  useEffect(() => {
    console.log("DOB", nseDetails.dob);
    console.log("DOB", nseDetails);
    if (fatcaDetails || nseDetails || userDetails) {
      setPlaceOfBirth({
        STATE_CODE: fatcaDetails?.place_birth?.STATE_CODE || "",
        STATE_NAME: fatcaDetails?.place_birth?.STATE_NAME || "",
      });
      setDateOfBirth(nseDetails?.dob ? getDateInHuman(nseDetails.dob) : null);
      setMobileNumberBelongsTo(
        nseDetails?.Mobile_relation
      );
      setEmailBelongsTo(
        nseDetails?.Email_relation
      );
    }
  }, [fatcaDetails, nseDetails, userDetails]);

  // useEffect(() => {
  //   if (fatcaDetails || nseDetails || userDetails) {
  //     setState({
  //       place_birth: fatcaDetails.place_birth,
  //       dob: nseDetails.dob,
  //       mobile_relation: nseDetails.mobile_relation,
  //       email_relation: nseDetails.email_relation,
  //     });
  //   }
  // }, [fatcaDetails, nseDetails, userDetails]);


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => {
            if (currentStep === 2) {
              setCurrentStep(1);
            } else {
              props.navigation.navigate("OnBoard", { screen: "OccupationAndIncome" });
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
      <ScrollView style={styles.containerScroll} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.containBox}>
          {currentStep === 1 ? (
            <>
              <View style={styles.text_box}>
                <Text style={styles.sub_slogan}>Place of Birth</Text>
                <View style={styles.inputsecWrapper}>
                  <Picker
                    selectedValue={placeOfBirth.STATE_CODE}
                    onValueChange={(itemValue) => {
                      const selectedState = stateList.find((state) => state.value === itemValue);
                      if (selectedState) {
                        setPlaceOfBirth({
                          STATE_CODE: selectedState.value,
                          STATE_NAME: selectedState.label,
                        });
                      }
                    }}
                    style={styles.inputsec}
                  >
                    <Picker.Item label="Select Place of Birth" value="" />
                    {stateList.map((state) => (
                      <Picker.Item key={state.value} label={state.label} value={state.value} />
                    ))}
                  </Picker>
                </View>
                {errors.place_birth && <Text style={styles.errorText}>{errors.place_birth}</Text>}
              </View>
              <View style={styles.inputsecWrapper}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity onPress={() => setIsDatePickerVisible(true)}>
                    <AntDesign
                      style={{ marginTop: 20 }}
                      name="calendar"
                      color={"#EE4248"}
                      size={25}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => setIsDatePickerVisible(true)}
                    style={{
                      flex: 1,
                    }}
                  >
                    <TextInput
                      keyboardType="numeric"
                      style={{
                        flex: 1,
                        marginLeft: 10,
                        marginTop: 5,
                        fontSize: 18,
                        borderBottomWidth: 1,
                        color: "black",
                      }}
                      editable={false}
                      selectTextOnFocus={false}
                      value={dateOfBirth ? getDateInHuman(dateOfBirth) : ""}
                      placeholder={"DD-MM-YYYY"}
                      placeholderTextColor={"grey"}
                      maxLength={10}
                    />
                    <Text style={{ ...styles.error, marginLeft: 5 }}>
                      {errors?.dob}
                    </Text>
                  </TouchableOpacity>
                </View>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  date={new Date()}
                  maximumDate={new Date()}
                  minimumDate={new Date(1900, 0, 1)}
                  onConfirm={(dob) => {
                    setIsDatePickerVisible(false);

                    // Format the date as DD-MM-YYYY
                    const formattedDate = `${String(dob.getDate()).padStart(2, '0')}${String(dob.getMonth() + 1).padStart(2, '0')}${dob.getFullYear()}`;
                    const dateAsNumber = parseInt(formattedDate, 10); // Convert to number
                    console.log("Date as Number:", dateAsNumber);

                    // Update the states
                    setDateOfBirth(dob); // Original Date object if needed
                    setErrors({ ...errors, dob: null });
                    setState({ ...state, dob: dateAsNumber }); // Save date as number
                  }}
                  onCancel={() => setIsDatePickerVisible(false)}
                />
              </View>
            </>
          ) : currentStep === 2 ? (
            <>
              <View style={styles.text_box}>
                <Text style={styles.sub_slogan}>Mobile Number belongs to</Text>
                <View style={styles.inputsecWrapper}>
                  <Picker
                    selectedValue={mobileNumberBelongsTo}
                    onValueChange={(itemValue) => setMobileNumberBelongsTo(itemValue)}
                    style={styles.inputsec}
                  >
                    <Picker.Item label="Select Relation" value="" />
                    {mobileEmailRelation.map((relation) => (
                      <Picker.Item key={relation.value} label={relation.label} value={relation.value} />
                    ))}
                  </Picker>
                </View>
                {errors.mobile_relation && <Text style={styles.errorText}>{errors.mobile_relation}</Text>}
              </View>

              <View style={styles.text_box2}>
                <Text style={styles.sub_slogan}>Email ID belongs to</Text>
                <View style={styles.inputsecWrapper}>
                  <Picker
                    selectedValue={emailBelongsTo}
                    onValueChange={(itemValue) => setEmailBelongsTo(itemValue)}
                    style={styles.inputsec}
                  >
                    <Picker.Item label="Select Relation" value="" />
                    {mobileEmailRelation.map((relation) => (
                      <Picker.Item key={relation.value} label={relation.label} value={relation.value} />
                    ))}
                  </Picker>
                </View>
                {errors.email_relation && <Text style={styles.errorText}>{errors.email_relation}</Text>}
              </View>
            </>
          ) : null}
        </View>
      </ScrollView>
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.bottomButton} onPress={onAction}>
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
  error: {
    color: "#ff0000",
    padding: 5,
  },
  containBox: {
    paddingHorizontal: responsiveWidth(7),
    width: "100%",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between", // Space between arrow and logo
    alignItems: "center",
    width: "100%",
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(2), // Add some spacing for better appearance
    backgroundColor: Colors.WHITE,       // Optional: Maintain consistency
    marginTop:25
  },
  arrowButton: {
    marginLeft: responsiveWidth(2),
  },
  logimg: {
    width: responsiveWidth(35),
    height: responsiveHeight(7),
    resizeMode: "contain",
  },
  sub_slogan: {
    fontSize: responsiveFontSize(2.5),
    color: Colors.BLACK,
    marginBottom: responsiveHeight(1),
  },
  errorText: {
    color: "red",
    fontSize: responsiveFontSize(1.5),
    marginTop: responsiveHeight(0.5),
  },
  containerScroll: {
    width: "100%",
    backgroundColor: Colors.WHITE,
  },
  inputsecWrapper: {
    borderWidth: 1,
    borderColor: "#FFB2AA",
    borderRadius: 8,
    marginTop: 10,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 10,
    overflow: 'hidden', // To ensure the border applies to the dropdown correctly
    paddingBottom:10,
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
  text_box2: {
    flexDirection: "column",
    width: "100%",
    height: "auto",
    marginTop: 20
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
  minor_gaurdian_relationship_list:
    state.registration.minorGaurdianRelationship,
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
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(BirthRelations);