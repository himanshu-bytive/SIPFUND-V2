import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Typography from '../../components/Atom/Typography/Typography';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Button from '../../components/Atom/Button/Button';
import { Header } from 'react-native-elements';
import AntDesign from "react-native-vector-icons/AntDesign";
import Colors from '../../common/Colors';
import SIPLOGO from '../../../assets/SVG-ICONS/SipLogo.svg';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CheckboxCircle from '../../components/Atom/CheckBox/CheckBox';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckboxSquare from '../../components/Atom/CheckBox/CheckBox';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { getDateInHuman } from '../../utils/getDateInFormat';
const AddNominee = (props) => {
  const {
    nseDetails,
    fatcaDetails,
    token,
    userDetails,
    updateRegister
  } = props
  const [stepCount, setStepCount] = useState(1);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [NomineeIsYours, setNomineeIsYours] = useState("");
  const navigation = useNavigation();
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [state, setState] = useState({
    nominee1_name: "",
    nominee1_relation: "",
    nominee1_dob: null,
  });

  const [errors, setErrors] = useState({
    nominee1_name: null,
    nominee1_relation: null,
    nominee1_dob: null,
  });

  useEffect(() => {
    console.log("NSE_details", nseDetails);

  }, []);
  const handleNextStep = () => {
    setStepCount(stepCount + 1);
  };

  const handleBackPress = () => {
    if (stepCount === 2) {
      setStepCount(stepCount - 1);
    } else {
      navigation.navigate("BirthRelation");
    }
  };

  useEffect(() => {
    console.log("NomineeDetails", nseDetails);
    if (fatcaDetails || nseDetails || userDetails) {
      setState({
        nominee1_name: nseDetails?.nominee1_name,
        nominee1_relation: nseDetails?.nominee1_relation,
        nominee1_dob: nseDetails?.nominee1_dob,
        nominee1_percent: 100
      });
      setDateOfBirth(nseDetails?.nominee1_dob ? getDateInHuman(nseDetails.nominee1_dob) : null);
      setNomineeIsYours(nseDetails?.nominee1_relation);
    }
  }, [fatcaDetails, nseDetails, userDetails]);

  const isLessThan18 = (date) => {
    let dateStr = date.toString();

    // Add leading zero if the input is a 7-digit number (e.g., 3122009 -> 03122009)
    if (dateStr.length === 7) {
      dateStr = `0${dateStr}`; // Add leading zero
    }

    // Ensure the dateStr now has 8 digits
    if (dateStr.length !== 8) {
      throw new Error("Invalid date format.");
    }

    // Extract day, month, and year from the 8-digit date string
    const day = dateStr.slice(0, 2);
    const month = dateStr.slice(2, 4);
    const year = dateStr.slice(4, 8);

    // Get the current year
    const currentYear = new Date().getFullYear();

    // Calculate the age
    const age = currentYear - parseInt(year, 10);

    // Check if age is less than 18
    return age < 18;
  };


  const onAction = () => {
    // Validate fields
    let hasErrors = false;

    console.log("Mystate", state);


    // Check each required field and update errors state if empty
    if (!state.nominee1_name) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        nominee1_name: "Please enter Nominee Name.",
      }));
      hasErrors = true;
    }

    if (!NomineeIsYours) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        nominee1_relation: "Please select Nominee Relation.",
      }));
      hasErrors = true;
    }

    if (!state.nominee1_dob) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        nominee1_dob: "Please select Nominee's Date of Birth.",
      }));
      hasErrors = true;
    }

    // If there are errors, do not proceed
    if (hasErrors) return;

    // Proceed if no errors
    const params = {
      nseDetails: {
        ...nseDetails,
        nominee1_name: state?.nominee1_name,
        nominee1_relation: NomineeIsYours,
        nominee1_dob: state?.nominee1_dob,
        no_of_nominee: "1",
        nominee1_percent: 100,
        nominee2_percent: "",
        nominee2_name: "",
        nominee2_relation: "",
        nominee2_dob: "",
      },
      fatcaDetails,
      userDetails,
    };

    if (isLessThan18(state.nominee1_dob)) {
      updateRegister(params, token);
      navigation.navigate("UnderAgeNominee",{ SecondNominee: false });
    } else {
      updateRegister(params, token);
      navigation.navigate("Reg", { screen: "RegisterAddress" });
    }
  };
  
  const onActionSecondNominee = () => {
    // Validate fields
    let hasErrors = false;

    console.log("Mystate", state);


    // Check each required field and update errors state if empty
    if (!state.nominee1_name) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        nominee1_name: "Please enter Nominee Name.",
      }));
      hasErrors = true;
    }

    if (!NomineeIsYours) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        nominee1_relation: "Please select Nominee Relation.",
      }));
      hasErrors = true;
    }

    if (!state.nominee1_dob) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        nominee1_dob: "Please select Nominee's Date of Birth.",
      }));
      hasErrors = true;
    }

    // If there are errors, do not proceed
    if (hasErrors) return;

    // Proceed if no errors
    const params = {
      nseDetails: {
        ...nseDetails,
        nominee1_name: state?.nominee1_name,
        nominee1_relation: NomineeIsYours,
        nominee1_dob: state?.nominee1_dob,
        no_of_nominee: "1",
        nominee1_percent: 100,
        nominee2_percent: "",
        nominee2_name: "",
        nominee2_relation: "",
        nominee2_dob: "",
      },
      fatcaDetails,
      userDetails,
    };

    if (isLessThan18(state.nominee1_dob)) {
      updateRegister(params, token);
      navigation.navigate("UnderAgeNominee",{ SecondNominee: true });
    } else {
      updateRegister(params, token);
      navigation.navigate("OnBoard", { screen: "AddSecondNominee" });
    }
  };

  const AddSecondNominee = () => {
    onActionSecondNominee();
  }

  const mobileEmailRelation = [
    { value: "BROTHER-IN-LAW", label: "BROTHER-IN-LAW" },
    { value: "FATHER-IN-LAW", label: "FATHER-IN-LAW" },
    { value: "GRAND DAUGHTER", label: "GRAND DAUGHTER" },
    { value: "SPOUSE", label: "SPOUSE" },
    { value: "BROTHER", label: "BROTHER" },
    { value: "DAUGHTER", label: "DAUGHTER" },
    { value: "DAUGHTER-IN-LAW", label: "DAUGHTER-IN-LAW" },
    { value: "GRAND FATHER", label: "GRAND FATHER" },
    { value: "GRAND SON", label: "GRAND SON" },
    { value: "NIECE", label: "NIECE" },
    { value: "AUNT", label: "AUNT" },
    { value: "FATHER", label: "FATHER" },
    { value: "MOTHER-IN-LAW", label: "MOTHER-IN-LAW" },
    { value: "MOTHER", label: "MOTHER" },
    { value: "NEPHEW", label: "NEPHEW" },
    { value: "SISTER", label: "SISTER" },
    { value: "UNCLE", label: "UNCLE" },
    { value: "OTHERS", label: "OTHERS" },
    { value: "GRAND MOTHER", label: "GRAND MOTHER" },
    { value: "SISTER-IN-LAW", label: "SISTER-IN-LAW" },
    { value: "SON", label: "SON" },
    { value: "SON-IN-LAW", label: "SON-IN-LAW" }
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <Header
        containerStyle={[styles.headerContainer, { backgroundColor: 'white' }]}
        statusBarProps={{ backgroundColor: 'white', barStyle: 'dark-content' }}
        leftComponent={
          <AntDesign
            name="arrowleft"
            size={25}
            color={Colors.BLACK}
            onPress={handleBackPress}
          />
        }
        rightComponent={<SIPLOGO width={95} height={25} />}
      />

      <View style={styles.container}>
        {/* Content */}
        {stepCount === 1 ? (
          <View style={styles.stepContainer}>
            <Typography fontSize={responsiveFontSize(2.5)} lineHeight={25} fontWeight={"700"}>
              Would you like to add a Nominee?
            </Typography>
            <Typography fontSize={responsiveFontSize(2)} lineHeight={25}>
              Nominee gets your investment in the event of any unforeseen circumstances. You can add them now or later in the profile section.
            </Typography>
            <View style={styles.button}>
              <Button
                borderColor={Colors.RED}
                borderWidth={2}
                text={"No, Skip for now"}
                height={responsiveHeight(5)}
                width={responsiveWidth(70)}
                textColor={"black"}
                onPress={() => { navigation.navigate("Reg", { screen: "RegisterAddress" }); }}
              />
              <Button
                onPress={handleNextStep}
                textColor={"white"}
                text={"Yes, Proceed"}
                backgroundColor={"red"}
                height={responsiveHeight(5)}
                width={responsiveWidth(70)}
              />
            </View>
          </View>
        ) : (
          <ScrollView>
            <View style={styles.stepContainer}>
              <Typography style={styles.title}>Nominee name*</Typography>
              <TextInput
                style={styles.inputsec}
                editable={true}
                placeholderTextColor={"grey"}
                placeholder="Enter Name"
                value={state.nominee1_name ? state.nominee1_name : ""}
                onChangeText={(text) => setState((prevState) => ({ ...prevState, nominee1_name: text }))}
              />
              {errors.nominee1_name && <Text style={styles.errorText}>{errors.nominee1_name}</Text>}
              <Typography style={styles.title}>Nominee is your*</Typography>
              <View style={[styles.inputsec]}>
                <Picker
                  selectedValue={NomineeIsYours ? NomineeIsYours : ""}
                  onValueChange={(itemValue) => setNomineeIsYours(itemValue)}
                  style={[
                    styles.picker,
                    NomineeIsYours === "" && { color: "grey" }, // Placeholder color
                  ]}
                >
                  <Picker.Item label="Select" value="" />
                  {mobileEmailRelation.map((state) => (
                    <Picker.Item key={state.value} label={state.label} value={state.value} />
                  ))}
                </Picker>
              </View>
              {errors.nominee1_relation && <Text style={styles.errorText}>{errors.nominee1_relation}</Text>}
              <Typography style={styles.title}>Nominee’s date of birth*</Typography>
              <View style={styles.inputsecWrapper}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 10,
                    width: "auto"
                  }}
                >
                  <TouchableOpacity onPress={() => setIsDatePickerVisible(true)}>
                    <AntDesign
                      style={{ marginTop: 0 }}
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
                        marginLeft: 10,
                        marginTop: -2,
                        fontSize: 18,
                        width: "auto",
                        color: "black",
                      }}
                      editable={false}
                      selectTextOnFocus={false}
                      value={dateOfBirth ? dateOfBirth : ""}
                      placeholder={"DD-MM-YYYY"}
                      placeholderTextColor={"grey"}
                      maxLength={11}
                    />
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
                    console.log("hgh", dob);

                    const formattedDate = dob.toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }).replace(",", ""); // Remove the comma (e.g., "10-Jan-2025")

                    console.log("Formatted Date:", formattedDate); // For verification

                    const dateAsNumber = parseInt(
                      `${String(dob.getDate()).padStart(2, '0')}${String(dob.getMonth() + 1).padStart(2, '0')}${dob.getFullYear()}`,
                      10
                    ); // Convert to number if needed

                    const datevalue = getDateInHuman(dateAsNumber);
                    setDateOfBirth(datevalue); // Save original Date object
                    setErrors({ ...errors, nominee1_dob: null });
                    setState({ ...state, nominee1_dob: dateAsNumber }); // Save formatted date
                  }}
                  onCancel={() => setIsDatePickerVisible(false)}
                />
              </View>
              {errors.nominee1_dob && <Text style={styles.errorText2}>{errors.nominee1_dob}</Text>}
              {/* <View style={{ marginTop: 10 }}>
                <Typography style={styles.title}>Nominee’s identity proof (optional)</Typography>
                <View style={styles.inputsec}>
                  <Picker
                    selectedValue={NomineeId ? NomineeId : ""}
                    onValueChange={(itemValue) => setNomineeId(itemValue)}
                    style={[
                      styles.picker,
                      NomineeId === "" && { color: "grey" }, // Placeholder color
                    ]}
                  >
                    <Picker.Item label="Select" value="" />
                    {NomineeIdList.map((state) => (
                      <Picker.Item key={state.value} label={state.label} value={state.value} />
                    ))}
                  </Picker>
                </View>
              </View> */}
              {/* <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 15, marginTop: 10, marginLeft: 5 }}>
                <CheckboxSquare
                  value={isChecked}
                  onValueChange={(newValue) => setIsChecked(newValue)}
                />
                <Text style={[styles.checkboxText]}>
                  Nominee address is same as my address
                </Text>
              </View> */}
              {/* {!isChecked && (
                <>
                  <View style={{ flexDirection: "row", width: "100%", marginTop: 20 }}>
                    <View style={{ flexDirection: "column", width: "50%" }}>
                      <TextInput
                        style={[styles.inputsec, { flex: 1, marginRight: 10 }]}  // Use flex: 1 for 50% width
                        editable={true}
                        placeholder="PINCODE"
                        placeholderTextColor={"grey"}
                        inputMode='numeric'
                        value={state.nominee1_pincode ? state.nominee1_pincode : ""}
                        onChangeText={(text) => setState((prevState) => ({ ...prevState, nominee1_pincode: text }))}
                      />
                      {errors.nominee1_pincode && <Text style={styles.errorText}>{errors.nominee1_pincode}</Text>}
                    </View>
                    <View style={{ flexDirection: "column", width: "50%" }}>
                      <TextInput
                        style={[styles.inputsec, { flex: 1 }]}  // Use flex: 1 for 50% width
                        editable={true}
                        placeholder="STATE"

                        placeholderTextColor={"grey"}
                        value={state.nominee1_state ? state.nominee1_state : ""}
                        onChangeText={(text) => setState((prevState) => ({ ...prevState, nominee1_state: text }))}
                      />
                      {errors.nominee1_state && <Text style={styles.errorText}>{errors.nominee1_state}</Text>}
                    </View>
                  </View>
                  <View style={{ flexDirection: "column", width: "100%", marginTop: 10 }}>
                    <TextInput
                      style={[styles.inputsec, { flex: 1 }]}  // Use flex: 1 for 50% width
                      editable={true}
                      placeholder="ADDRESS"
                      placeholderTextColor={"grey"}
                      value={state.nominee1_addr1 ? state.nominee1_addr1 : ""}
                      onChangeText={(text) => setState((prevState) => ({ ...prevState, nominee1_addr1: text }))}
                    />
                    {errors.nominee1_addr1 && <Text style={styles.errorText}>{errors.nominee1_addr1}</Text>}
                  </View>
                </>
              )} */}
              <TouchableOpacity onPress={AddSecondNominee} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 15, marginTop: 20, marginLeft: 5 }}>
                <View style={styles.circleIcon}>
                  <Icon name="plus" size={14} color="white" />
                </View>
                <Text style={{
                  fontSize: responsiveFontSize(1.5),
                  color: Colors.BLACK,
                }}>Add another nominee</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
                <Button
                  borderColor={Colors.RED}
                  borderWidth={2}
                  fontSize={responsiveFontSize(2)}
                  height={responsiveHeight(5)}
                  width={responsiveWidth(80)}
                  text={"Next"}
                  textColor={"black"}
                  onPress={onAction}
                />
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  errorText: {
    color: "red",
    fontSize: responsiveFontSize(1.5),
    marginTop: -5,
  },
  errorText2: {
    color: "red",
    fontSize: responsiveFontSize(1.5),
    marginTop: -10,
  },
  picker: {
    height: 50,
    width: "auto",
    color: "black", // Default color for selected values
  },
  error: {
    color: "#ff0000",
    padding: 5,
  },
  circleIcon: {
    width: 24, // Circle diameter
    height: 24,
    borderRadius: 12, // Makes the shape circular
    backgroundColor: '#8BE28B', // Light green background
    justifyContent: 'center', // Centers the icon horizontally
    alignItems: 'center', // Centers the icon vertically

  },
  checkboxText: {
    fontSize: responsiveFontSize(1.5),
    color: Colors.BLACK,
    // Adjust margin to fit properly
    marginTop: 0, // or fine-tune as needed
  },

  text_box: {
    flexDirection: "column",
    width: "100%",
    marginTop: 20
  },
  sub_slogan: {
    fontSize: responsiveFontSize(2.5),
    color: Colors.BLACK,
    marginBottom: responsiveHeight(1),
  },
  inputsecWrapper: {
    borderWidth: 1,
    borderColor: Colors.RED,
    borderRadius: 8,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 10,
    overflow: 'hidden', // To ensure the border applies to the dropdown correctly
    height: 50,
    justifyContent: "center",
    marginBottom: 20,
    width: "auto"
  },
  inputsec: {
    height: responsiveHeight(6),
    fontSize: responsiveFontSize(2),
    color: "black",
    backgroundColor: Colors.WHITE,
    borderColor: Colors.RED,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 10,
    justifyContent: "center"
  },

  headerContainer: {
    backgroundColor: 'white',
    height: responsiveHeight(8),
    marginTop: 20
  },
  headerTitle: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  logo: {
    width: 40,
    height: 40,
  },
  stepContainer: {
    flex: 1,
    width: '100%',
    marginTop: responsiveHeight(5),
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'left',
    marginTop: 10
  },
  subText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    gap: 10,
    marginLeft: 20
  },
});

const mapStateToProps = (state) => ({
  token: state.auth.token,
  nseDetails: state.registration.nseDetails,
  fatcaDetails: state.registration.fatcaDetails,
  userDetails: state.registration.userDetails,
  isFetching: state.registration.isFetching,
  relationList: state.registration.nomineeRelationship,
  minor_gaurdian_relationship_list: state.registration.minorGaurdianRelationship,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { RegistrationActions } = require("../../store/RegistrationRedux");
  return {
    ...stateProps,
    ...ownProps,
    updateRegister: (params, token) => {
      RegistrationActions.updateRegister(dispatch, params, token);
    },
  };
};

export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(AddNominee);
