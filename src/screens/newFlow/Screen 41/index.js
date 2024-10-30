import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import OutLinedButton from "../common/OutlinedButton";
import Header from "../common/Header";
import CustomButton from "../common/Button";
import CustomCheckBox from "../common/CheckBox";
import InputBox from "../common/InputBox";
import { MySelectPicker } from "../../../components";

const INCOMES = [
  "Upto 1 lakh",
  "1 Lakh - 5 Lakh",
  "5 Lakh - 10 Lakh",
  "10 Lakh - 25 Lakh",
  "25 Lakh - 50 Lakh",
  "50 Lakh - 1 Crore",
  "1 Crore - 5 Crore",
  "More than 5 Crore",
];

const GaurdianDetails = () => {
  const [selectedOccupation, setSelectedOccupation] = useState(null);

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

  const [docType, setDocType] = useState();
  const [docError, setDocError] = useState();
  const selectOccupation = (occupation) => {
    setSelectedOccupation(occupation);
  };

  const [isChecked, setIsChecked] = useState(false);

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
        }}
      >
        <Header
          showBackBtn={true}
          mainContainerStyle={{
            marginBottom: 10,
          }}
        />
        <Text style={styles.title}>Add Gaurdian for you nominee</Text>
        <Text style={styles.subtitle}>
          As your nominee's age is below 18 kindly add nominee's gaurdian
        </Text>

        <InputBox
          label={"Gaurdian Name"}
          required={true}
          placeHolderName={"Gaurdian name"}
        />

        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Text style={styles.label}>
            Gaurdian's relation
            <Text
              style={{
                color: "red",
              }}
            >
              *
            </Text>
          </Text>

          <MySelectPicker
            values={mobileEmailRelation}
            placeholder={"Select Mobile Relation"}
            defultValue={docType}
            // error={"dsmd"}
            onChange={(identity_doc) => {
              setDocType(identity_doc);
              //   setErrors({ ...errors, phone: null });
              //   setState({ ...state, mobile_relation });
            }}
            mainWrapperContainerStyle={{
              ...styles.input,
              marginBottom: 0,
              borderColor: "#FFB2AA",
            }}
            iconStyle={{
              top: 5,
            }}
            containerStyle={{
              fontSize: 14,
              color: "black",
            }}
            style={{
              fontSize: 14,
              color: "#000",
            }}
          />
        </View>

        <InputBox
          label={"Gaurdian Name"}
          required={true}
          placeHolderName={"Gaurdian name"}
        />
      </View>

      <CustomButton>
        <Text style={styles.nextButtonText}>Add Gaurdian</Text>
      </CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    left: 10,
    top: 40,
    padding: 10,
  },
  backText: {
    fontSize: 18,
    color: "#000",
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  header: {
    alignItems: "flex-end",
    marginTop: 50,
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    marginBottom: 20,
  },

  row: {
    justifyContent: "space-between",
  },
  btn: {
    width: "48%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#f08080",
    alignItems: "center",
    padding: 15,
  },
  optionTextStyle: {
    fontSize: 14,
  },
  selected: {
    backgroundColor: "#f08080",
    color: "#fff",
  },
  helpButton: {
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#f08080",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  helpText: {
    color: "#f08080",
  },
  nextButton: {
    backgroundColor: "#f08080",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: "#FFB2AA",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
});

export default GaurdianDetails;
