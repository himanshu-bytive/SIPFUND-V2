/** @format */

import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  Text,
  Keyboard,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import moment from "moment";
import { Styles, Colors, FormValidate } from "../../common";
import { MySelectPicker, MyDatePicker, MyTextInput } from "../../components";
import { AntDesign } from "react-native-vector-icons";
import { Image, Header, CheckBox } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Cart from "../../components/Cart";
import { getDateInHuman } from "../../utils/getDateInFormat";

const titleList = [
  { value: "Mr", label: "Mr." },
  { value: "Mrs", label: "Mrs." },
  { value: "Ms", label: "Ms." },
  { value: "M/s", label: "M/s." },
];
const pepList = [
  { value: "N", label: "No" },
  { value: "Y", label: "Yes" },
  { value: "R", label: "Related to PEP " },
];

function CompleteDetailsScreen(props) {
  const pageActive = useRef(false);
  const {
    token,
    users,
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

  const [occupationsList, setOccupationsList] = useState([]);
  const [incomesList, setIncomesList] = useState([]);

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

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const [state, setState] = useState({
    occupation: "",
    dob: null,
    title: "",
    investor: "",
    investorPan: "",
    email: "",
    fatherName: "",
    motherName: "",
    income: "",
    pep: "",
    nominate: true,
    nominateMinor: false,
    nominate1name: "",
    nominate1relation: "",
    nominate1dob: null,
    nominate1pan: "",
    nominate1guard_name: "",
    nominate1guard_pan: "",
    mobile_relation: "SE",
    email_relation: "SE",
    minor_gaurdian_relationship: "",
  });

  const [errors, setErrors] = useState({
    occupation: null,
    dob: null,
    title: null,
    investor: null,
    investorPan: null,
    email: null,
    fatherName: null,
    motherName: null,
    income: null,
    pep: null,
    nominate: null,
    nominate1pan: null,
  });

  useEffect(() => {
    if (updateSuccess && pageActive.current) {
      pageActive.current = false;
      props.navigation.navigate("RegisterAddress");
    }
  }, [updateSuccess]);

  useEffect(() => {
    settings(token);
    fetchTheNomineeRelationshipList();
    fetchMinorGaurdianRelationshipList();
  }, []);

  useEffect(() => {
    if (fatcaDetails || nseDetails || userDetails) {
      setState({
        occupation: nseDetails.occupation.OCCUPATION_CODE,
        dob: nseDetails.dob != 0 ? nseDetails.dob : null,
        title: nseDetails.title,
        investor: nseDetails?.inv_name ? nseDetails.inv_name : users.name,
        investorPan: nseDetails?.pan
          ? nseDetails.pan
          : users.pan
          ? users.pan
          : pan,
        email: users.email,
        fatherName: nseDetails.father_name,
        motherName: nseDetails.mother_name,
        income: fatcaDetails.app_income.APP_INCOME_CODE,
        pep: fatcaDetails.pep.code,
        nominate: true,
        nominateMinor:
          nseDetails.nominee1_type && nseDetails.nominee1_type == "Y"
            ? true
            : false,
        nominate1name: nseDetails.nominee1_name,
        nominate1relation: nseDetails.nominee1_relation,
        nominate1dob: new Date(nseDetails.nominee1_dob),
        nominate1guard_name: nseDetails.nominee1_guard_name,
        nominate1guard_pan: nseDetails.nominee1_guard_pan,
        mobile_relation:
          nseDetails?.Mobile_relation || nseDetails?.mobile_relation
            ? nseDetails?.Mobile_relation || nseDetails?.mobile_relation
            : "SE",
        email_relation:
          nseDetails?.Email_relation || nseDetails?.email_relation
            ? nseDetails?.Email_relation || nseDetails?.email_relation
            : "SE",
        minor_gaurdian_relationship: nseDetails.nominee1_guard_relation,
      });
    }
  }, [fatcaDetails, nseDetails, userDetails]);

  useEffect(() => {
    if (occupations) {
      const occupationsList = occupations
        ? occupations.map((item) => ({
            value: item.OCCUPATION_CODE,
            label: String(item.OCCUPATION_DESC),
          }))
        : [];
      setOccupationsList(occupationsList);
    }
    if (incomes) {
      const incomesList = incomes
        ? incomes.map((item) => ({
            value: item.APP_INCOME_CODE,
            label: String(item.APP_INCOME_DESC),
          }))
        : [];
      setIncomesList(incomesList);
    }
  }, [occupations, incomes]);

  const onAction = async () => {
    const {
      occupation,
      dob,
      title,
      investor,
      investorPan,
      mobile_relation,
      email_relation,
      email,
      fatherName,
      motherName,
      income,
      pep,
      nominate,
      nominateMinor,
      nominate1name,
      nominate1pan,
      nominate1relation,
      minor_gaurdian_relationship,
      nominate1dob,
      nominate1guard_name,
      nominate1guard_pan,
    } = state;
    if (!occupation) {
      alert("Please select Occupation");
      setErrors({ ...errors, occupation: "Please select Occupation" });
      return;
    }
    //if (!dob || dob == null || dob == "") {
    let d;
    if (isNaN(dob)) {
      d = dob;
    } else {
      d = new Date(dob);
      d = moment(d).format("DD-MM-YYYY");
    }
    if (!dob || dob == null || dob == "" || !FormValidate.isValidDate(d)) {
      alert("Please Enter a valid Date");
      setErrors({ ...errors, dob: "Please Enter a valid Date" });
      return;
    }
    if (!title) {
      alert("Please Select Title");
      setErrors({ ...errors, title: "Please Select Title" });
      return;
    }
    if (!FormValidate.isString(investor)) {
      alert("Please Enter Investor Name");
      setErrors({ ...errors, investor: "Please Enter Investor Name" });
      return;
    }
    if (!FormValidate.validateName(investor)) {
      alert("Please Add a Valid Name");
      setErrors({ ...errors, investor: "Please Add a Valid Name" });
      return;
    }
    if (!investorPan) {
      alert("Please Add PAN Number");
      setErrors({ ...errors, investorPan: "Please Add PAN Number" });
      return;
    }
    if (!FormValidate.validatePan(investorPan)) {
      alert("Please Add Valid PAN");

      setErrors({ ...errors, investorPan: "Please Add Valid PAN" });
      return;
    }
    //} else {
    //const reg = /[A-Z][A-Z][A-Z][A-Z][A-Z][0-9][0-9][0-9][0-9][A-Z]/;
    //if (!investorPan.match(reg)) {
    //console.log("heyyyy");
    //setErrors({
    //...errors,
    //nominate1guard_pan: "Please enter a valid PAN",
    //});
    //return;
    //}
    //}
    if (!mobile_relation) {
      alert("Please specify Mobile Relation");
      setErrors({ ...errors, phone: "Please specify Mobile Relation" });
      return;
    }
    if (!email_relation) {
      alert("Please specify Email Relation");
      setErrors({ ...errors, mailRelation: "Please specify Email Relation" });
      return;
    }
    if (!FormValidate.isEmail(email)) {
      alert("Please Add a Email");
      setErrors({ ...errors, email: "Please Add a Email" });
      return;
    }
    if (!FormValidate.isString(fatherName)) {
      alert("Please Add Fathers Name");
      setErrors({ ...errors, fatherName: "Please Add Fathers Name" });
      return;
    }
    if (!FormValidate.validateName(fatherName)) {
      alert("Please Add a Valid Fathers Name");
      setErrors({ ...errors, fatherName: "Please Add a Valid Fathers Name" });
      return;
    }
    if (!FormValidate.isString(motherName)) {
      alert("Please Add Mothers Name");
      setErrors({ ...errors, motherName: "Please Add Mothers Name" });
      return;
    }
    if (!FormValidate.validateName(motherName)) {
      alert("Please Add a Valid Mothers Name");
      setErrors({ ...errors, motherName: "Please Add a Valid Mothers Name" });
      return;
    }
    if (!income) {
      alert("Please Select a Annual Income");
      setErrors({ ...errors, income: "Please Select a Annual Income" });
      return;
    }
    if (!pep) {
      alert("Please Select PEP");
      setErrors({ ...errors, pep: "Please Select PEP" });
      return;
    }
    if (nominate) {
      if (!FormValidate.isString(nominate1name)) {
        alert("Please Add Nominee Name");
        setErrors({ ...errors, nominate1name: "Please Add Nominee Name" });
        return;
      }
      if (!FormValidate.validateName(nominate1name)) {
        alert("Please Add Validate Nominee Name");
        setErrors({
          ...errors,
          nominate1name: "Please Add Validate Nominee Name",
        });
        return;
      }
      if (!nominate1relation) {
        alert("Please Select Nominee Relationship");
        setErrors({
          ...errors,
          nominate1relation: "Please Select Nominee Relationship",
        });
        return;
      }

      if (!minor_gaurdian_relationship && state.nominateMinor) {
        alert("Please Select Nominee Gaurdian Relationship");
        setErrors({
          ...errors,
          minor_gaurdian_relationship:
            "Please Select Nominee Gaurdian Relationship ",
        });
        return;
      }
      // if (!nominate1pan) {
      //   alert("Please Select Nominee Pan");
      //   setErrors({ ...errors, nominate1relation: "Please Select a Value" });
      //   return;
      // }
      // alert(!FormValidate.validatePan(nominate1pan) ? 1 : 2);
      // return;
      if (!nominateMinor && !nominate1pan) {
        alert("Please Add Nominee PAN");

        setErrors({
          ...errors,
          nominate1pan: "Please Add Valid Nominee PAN",
        });
        return;
      }
      if (!nominateMinor && !FormValidate.validatePan(nominate1pan)) {
        alert("Please Enter Valid Nominee PAN");

        setErrors({
          ...errors,
          nominate1pan: "Please Enter Valid Nominee PAN",
        });
        return;
      }
    }
    if (nominate && nominateMinor) {
      const difference = new Date(Date.now() - state.nominate1dob);
      const age = difference.getUTCFullYear() - 1970;
      if (age >= 18) {
        alert("Nominee is not a minor");
        setErrors({ ...errors, nominate1dob: "Nominee is not a minor" });
        return;
      }
      if (!nominate1dob || nominate1dob == null) {
        alert("Please Select a Date");
        setErrors({ ...errors, nominate1dob: "Please Select a Date" });
        return;
      }
      if (!nominate1guard_name) {
        alert("Please Add Nominate Guardian Name");
        setErrors({
          ...errors,
          nominate1guard_name: "Please Add Nominate Guardian Name",
        });
        return;
      }
      if (!FormValidate.validateName(nominate1guard_name)) {
        alert("Please Add Validate Nominate Guardian NAME");

        setErrors({
          ...errors,
          nominate1guard_name: "Please Add Validate Nominate Guard NAME",
        });
        return;
      }
      // if (!nominate1guard_pan) {
      //   setErrors({
      //     ...errors,
      //     nominate1guard_pan: "Please Add Nominate Guard PAN",
      //   });
      //   return;
      // }
      if (!FormValidate.validatePan(nominate1guard_pan)) {
        alert("Please Add Validate Nominate Guard PAN");

        setErrors({
          ...errors,
          nominate1guard_pan: "Please Add Validate Nominate Guard PAN",
        });
        return;
      }
    }
    let params = { ...{ nseDetails }, ...{ fatcaDetails }, ...{ userDetails } };
    let selOccupation = occupations.find(
      (x) => x.OCCUPATION_CODE === occupation
    );
    let selTitle = titleList.find((x) => x.value === title);
    let selIncome = incomes.find((x) => x.APP_INCOME_CODE === income);
    let selPep = pepList.find((x) => x.value === pep);
    params.nseDetails.occupation = {
      OCCUPATION_CODE: selOccupation.OCCUPATION_CODE,
      OCCUPATION_DESC: selOccupation.OCCUPATION_DESC,
    };
    (params.nseDetails.dob = dob ? new Date(dob).getTime() : ""),
      (params.nseDetails.title = selTitle.value);
    params.nseDetails.inv_name = investor;
    params.nseDetails.pan = investorPan;
    params.nseDetails.email = email;
    params.nseDetails["email_relation"] = email_relation;
    params.nseDetails["mobile_relation"] = mobile_relation;
    params.nseDetails["NOM1_PAN"] = nominate1pan;
    params.nseDetails["NOMINEE_OPTED"] = nominate ? "Y" : "N";
    params.nseDetails.father_name = fatherName;
    params.nseDetails.mother_name = motherName;
    params.fatcaDetails.app_income = {
      APP_INCOME_CODE: selIncome.APP_INCOME_CODE,
      APP_INCOME_DESC: selIncome.APP_INCOME_DESC,
    };
    params.fatcaDetails.pep = {
      code: selPep.value,
      desc: selPep.label,
    };
    params.nseDetails.no_of_nominee = nominate ? "1" : "";
    params.nseDetails.nominee1_name = nominate1name;
    params.nseDetails.nominee1_relation = nominate1relation;
    (params.nseDetails.nominee1_dob = nominate1dob
      ? new Date(nominate1dob).getTime()
      : ""),
      (params.nseDetails.nominee1_guard_name = nominate1guard_name);
    params.nseDetails.nominee1_guard_pan = nominate1guard_pan.toUpperCase();
    params.nseDetails.nominee1_type = nominateMinor ? "Y" : "N";
    params.nseDetails.nominee1_guard_relation = minor_gaurdian_relationship;
    updateRegister(params, token);
    pageActive.current = true;
  };

  // const validateNomineePan = (pan) => {
  //   console.log("STATE=", state.nominate1guard_pan);
  //   console.log("PAN=", pan);
  //   // let modifiedPan = pan.toUpperCase();
  //   // console.log("MODIFIED PAN=", modifiedPan);
  //   setErrors({ ...errors, nominate1guard_pan: null });
  //   setState({ ...state, nominate1guard_pan: pan });
  // };

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardHeight(parseFloat(e.endCoordinates.height));
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[
        styles.container,
        {
          height: Dimensions.get("window").height - keyboardHeight,
        },
      ]}
    >
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Home")}
            style={{ marginTop: 20 }}
          >
            <AntDesign name={"arrowleft"} size={40} color={Colors.RED} />
          </TouchableOpacity>
        }
        containerStyle={styles.header}
        backgroundColor={Colors.LIGHT_WHITE}
        centerComponent={
          <Image
            source={require("../../../assets/icon.png")}
            style={styles.logimg}
          />
        }
        rightComponent={
          <Cart
            nav={() => {
              props.navigation.navigate("TopRatedList");
            }}
          />
        }
      />
      {isFetching && (
        <View style={Styles.loading}>
          <ActivityIndicator color={Colors.BLACK} size="large" />
        </View>
      )}
      <ScrollView>
        {/* container_sec */}
        <View style={styles.container_sec}>
          <Text style={styles.occupation}>
            Occupation <Text style={styles.error}>*</Text>
          </Text>
          <MySelectPicker
            values={occupationsList}
            placeholder={"Select Occupation"}
            defultValue={state.occupation}
            error={errors.occupation}
            onChange={(occupation) => {
              setErrors({ ...errors, occupation: null });
              setState({ ...state, occupation });
            }}
          />

          {/* DOB/DOI_sec */}
          <Text style={styles.occupation}>
            DOB/DOI <Text style={styles.error}>*</Text>
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              //alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity onPress={() => setIsDatePickerVisible(true)}>
              <AntDesign
                style={{ marginTop: 10 }}
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
                value={state.dob ? getDateInHuman(state.dob) : ""}
                onChangeText={(dob) => {
                  // console.log("DOB=", dob.length);
                  if (dob.length === 0) setErrors({ ...errors, dob: null });
                  setErrors({ ...errors, dob: null });
                  setState({ ...state, dob });
                }}
                placeholder={"DD-MM-YYYY"}
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
            onConfirm={(dob) => {
              setIsDatePickerVisible(false);
              setErrors({ ...errors, dob: null });
              setState({ ...state, dob: dob.getTime() });
            }}
            onCancel={() => setIsDatePickerVisible(false)}
          />

          {/* TITLE_sec */}
          <Text style={styles.occupation}>
            TITLE <Text style={styles.error}>*</Text>
          </Text>
          <MySelectPicker
            values={titleList}
            placeholder={"Select Title"}
            defultValue={state.title}
            error={errors.title}
            onChange={(title) => {
              setErrors({ ...errors, title: null });
              setState({ ...state, title });
            }}
          />

          {/* Investor Name_sec */}
          <Text style={styles.occupation}>
            Investor Name <Text style={styles.error}>*</Text>
          </Text>
          <MyTextInput
            value={state.investor}
            placeholder={"Investor Name"}
            error={errors.investor}
            maxLength={30}
            onChangeText={(investor) => {
              setErrors({ ...errors, investor: null });
              setState({ ...state, investor });
            }}
          />

          {/* Individual PAN_sec */}
          <Text style={styles.occupation}>
            Individual PAN <Text style={styles.error}>*</Text>
          </Text>
          <MyTextInput
            placeholder={"Investor Pan"}
            autoCapitalize={"characters"}
            value={state.investorPan}
            error={errors.investorPan}
            //editable={
            //state?.investorPan && state.investorPan.length > 9 ? false : true
            //}
            selectTextOnFocus={false}
            onChangeText={(investorPan) => {
              setErrors({ ...errors, investorPan: null });
              setState({ ...state, investorPan });
            }}
            maxLength={10}
          />

          {/* Email Id_sec */}
          <Text style={styles.occupation}>
            Email Id <Text style={styles.error}>*</Text>
          </Text>
          <MyTextInput
            placeholder={"Email"}
            value={state.email}
            error={errors.email}
            onChangeText={(email) => {
              setErrors({ ...errors, email: null });
              setState({ ...state, email });
            }}
          />

          <Text style={styles.occupation}>
            {"Mobile Relation"}
            <Text style={styles.error}>*</Text>
          </Text>
          <MySelectPicker
            values={mobileEmailRelation}
            placeholder={"Select Mobile Relation"}
            defultValue={state?.mobile_relation}
            error={errors?.phone}
            onChange={(mobile_relation) => {
              setErrors({ ...errors, phone: null });
              setState({ ...state, mobile_relation });
            }}
          />

          <Text style={styles.occupation}>
            {"Email Relation"}
            <Text style={styles.error}>*</Text>
          </Text>
          <MySelectPicker
            values={mobileEmailRelation}
            placeholder={"Select email Relation"}
            defultValue={state?.email_relation}
            error={errors?.mailRelation}
            onChange={(email_relation) => {
              setErrors({ ...errors, mailRelation: null });
              setState({ ...state, email_relation });
            }}
          />

          <Text style={styles.occupation}>
            {"Father's Name"} <Text style={styles.error}>*</Text>
          </Text>
          <MyTextInput
            placeholder={"Father's Name"}
            value={state.fatherName}
            error={errors.fatherName}
            maxLength={30}
            onChangeText={(fatherName) => {
              setErrors({ ...errors, fatherName: null });
              setState({ ...state, fatherName });
            }}
          />

          <Text style={styles.occupation}>
            {"Mother's Name"} <Text style={styles.error}>*</Text>
          </Text>
          <MyTextInput
            placeholder={"Mother's Name"}
            value={state.motherName}
            error={errors.motherName}
            maxLength={30}
            onChangeText={(motherName) => {
              setErrors({ ...errors, motherName: null });
              setState({ ...state, motherName });
            }}
          />
        </View>

        <View
          style={{ borderWidth: 5, borderColor: "#EAE9EE", marginTop: 5 }}
        ></View>

        {/* KYC_sec */}
        <View style={styles.container_sec}>
          <Text style={styles.kyc}>KYC</Text>
          <Text style={styles.occupation}>
            Annual Income <Text style={styles.error}>*</Text>
          </Text>
          <MySelectPicker
            values={incomesList}
            placeholder={"Select Income"}
            defultValue={state.income}
            error={errors.income}
            onChange={(income) => {
              setErrors({ ...errors, income: null });
              setState({ ...state, income });
            }}
          />

          <Text style={styles.occupation}>
            PEP (Politically Exposed Person) <Text style={styles.error}>*</Text>
          </Text>
          <MySelectPicker
            values={pepList}
            placeholder={"Select PEP"}
            defultValue={state.pep}
            error={errors.pep}
            onChange={(pep) => {
              setErrors({ ...errors, pep: null });
              setState({ ...state, pep });
            }}
          />
        </View>
        <View
          style={{ borderWidth: 5, borderColor: "#EAE9EE", marginTop: 5 }}
        ></View>

        {/* Nominee Details_sec */}
        <Text style={styles.Nominee}>Nominee Details</Text>

        {/* check_box */}
        <CheckBox
          title="I Want to Add Nominee"
          containerStyle={styles.checkbox_style}
          textStyle={{ color: Colors.BLACK, fontSize: 12, marginLeft: 5 }}
          checked={state.nominate}
          checkedColor={Colors.BLACK}
          uncheckedColor={Colors.BLACK}
          onPress={() => {
            setErrors({ ...errors, nominate: null });
            setState({ ...state, nominate: !state.nominate });
          }}
        />

        {state.nominate && (
          <View style={styles.container_sec}>
            <Text style={styles.occupation}>
              Name <Text style={styles.error}>*</Text>
            </Text>
            <MyTextInput
              placeholder={"Nominee Name"}
              value={state.nominate1name}
              maxLength={30}
              error={errors.nominate1name}
              onChangeText={(nominate1name) => {
                setErrors({ ...errors, nominate1name: null });
                setState({ ...state, nominate1name });
              }}
            />

            <Text style={styles.occupation}>
              Relationship <Text style={styles.error}>*</Text>
            </Text>
            <MySelectPicker
              values={relationList}
              placeholder={"Select Relationship"}
              defultValue={state.nominate1relation}
              error={errors.nominate1relation}
              onChange={(nominate1relation) => {
                setErrors({ ...errors, nominate1relation: null });
                setState({ ...state, nominate1relation });
              }}
            />

            <Text style={styles.occupation}>
              {"Nominee PAN"}
              {!state.nominateMinor && <Text style={styles.error}>*</Text>}
            </Text>
            <MyTextInput
              placeholder={"Nominee PAN"}
              value={state.nominate1pan}
              maxLength={10}
              error={errors.nominate1pan}
              onChangeText={(nominate1pan) => {
                setErrors({ ...errors, nominate1pan: null });
                setState({
                  ...state,
                  nominate1pan: nominate1pan.toUpperCase(),
                });
              }}
              autoCapitalize={true}
            />
          </View>
        )}
        {state.nominate && state.nominateMinor && (
          <View style={styles.container_sec}>
            <Text style={styles.occupation}>
              DOB/DOI <Text style={styles.error}>*</Text>
            </Text>
            <MyDatePicker
              defultValue={state.nominate1dob}
              error={errors.nominate1dob}
              onChange={(nominate1dob) => {
                setErrors({ ...errors, nominate1dob: null });
                setState({ ...state, nominate1dob });
              }}
            />

            <Text style={styles.occupation}>
              Nominee Guardian Name <Text style={styles.error}>*</Text>
            </Text>
            <MyTextInput
              placeholder={"Nominee Guardian Name"}
              value={state.nominate1guard_name}
              error={errors.nominate1guard_name}
              maxLength={30}
              onChangeText={(nominate1guard_name) => {
                setErrors({ ...errors, nominate1guard_name: null });
                setState({ ...state, nominate1guard_name });
              }}
            />

            <Text style={styles.occupation}>
              Nominee Gaurdian Relationship <Text style={styles.error}>*</Text>
            </Text>
            <View style={styles.padTheContainer}>
              <MySelectPicker
                values={minor_gaurdian_relationship_list}
                placeholder={"Select Gaudian Relationship"}
                defultValue={state.minor_gaurdian_relationship}
                error={errors.minor_gaurdian_relationship}
                onChange={(minor_gaurdian_relationship) => {
                  setState({ ...state, minor_gaurdian_relationship });
                  setErrors({
                    ...errors,
                    minor_gaurdian_relationship: null,
                  });
                }}
              />
            </View>

            <Text style={styles.occupation}>
              Nominee Guardian PAN
              <Text style={styles.error}>*</Text>
            </Text>
            <MyTextInput
              placeholder={"Nominee Guardian PAN"}
              autoCapitalize={"characters"}
              value={state.nominate1guard_pan}
              maxLength={10}
              error={errors.nominate1guard_pan}
              onChangeText={(nominate1guard_pan) => {
                setErrors({ ...errors, nominate1guard_pan: null });
                setState({ ...state, nominate1guard_pan });
              }}
            />
          </View>
        )}

        {state.nominate && (
          <View style={styles.container_sec}>
            <CheckBox
              title="Is Nominee Minor?"
              containerStyle={styles.checkbox_style}
              textStyle={{ color: Colors.BLACK, fontSize: 12, marginLeft: 5 }}
              checked={state.nominateMinor}
              checkedColor={Colors.BLACK}
              uncheckedColor={Colors.BLACK}
              onPress={() => {
                setErrors({ ...errors, nominateMinor: null });
                setState({ ...state, nominateMinor: !state.nominateMinor });
              }}
            />
          </View>
        )}
      </ScrollView>
      {/* click_box */}
      <View style={styles.footer}>
        <View style={styles.click_box}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Home")}
            style={styles.botton_box}
          >
            <Text style={styles.get_otp}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onAction} style={styles.botton_box}>
            <Text style={styles.get_otp}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomColor: Colors.BLACK,
    borderBottomWidth: 1,
  },
  container_sec: {
    margin: 10,
  },
  error: {
    color: "#ff0000",
    padding: 5,
  },
  logimg: {
    height: 65,
    width: 203,
    marginTop: 10,
  },
  occupation: {
    fontSize: 15,
    color: Colors.DEEP_GRAY,
    fontWeight: "bold",
    marginTop: 10,
  },
  private_sector: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 5,
  },
  private: {
    fontSize: 15,
    width: "92%",
  },
  date: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 5,
  },
  padTheContainer: {
    paddingHorizontal: 5,
  },
  dd: { marginLeft: 8 },
  AVVPJ6708P: {
    marginTop: 10,
    fontSize: 15,
  },
  kyc: {
    fontSize: 15,
    fontWeight: "bold",
  },
  Nominee: {
    fontSize: 15,
    marginLeft: 10,
    fontWeight: "bold",
    marginVertical: 10,
  },
  checkbox_style: {
    backgroundColor: Colors.TRANSPARENT,
    borderColor: Colors.TRANSPARENT,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#EAE9EE",
  },
  click_box: {
    flexDirection: "row",
    marginHorizontal: 25,
  },
  botton_box: {
    width: "50%",
    backgroundColor: Colors.RED,
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  get_otp: {
    color: Colors.WHITE,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
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
)(CompleteDetailsScreen);
