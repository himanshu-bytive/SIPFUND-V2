import moment from "moment";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Pressable,
  ScrollView,
} from "react-native";
// import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getDateInHuman } from "../../../utils/getDateInFormat";
import { MySelectPicker } from "../../../components";
import CustomCheckBox from "../common/CheckBox";
import Header from "../common/Header";
import InputBox from "../common/InputBox";

const UserBankDetails = ({ userName }) => {
  const [nomineeName, setNomineeName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [dob, setDob] = useState("");
  const [idProof, setIdProof] = useState("");
  const [sameAddress, setSameAddress] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
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

  // Custom checkbox component
  // const CustomCheckBox = ({ value, onValueChange }) => (
  //   <Pressable
  //     style={[styles.checkboxBase, value && styles.checkboxChecked]}
  //     onPress={() => onValueChange(!value)}
  //   >
  //     {value && <Text style={styles.checkboxTick}>✔</Text>}
  //   </Pressable>
  // );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        containerStyle={{
          marginTop: 20,
        }}
        showBackBtn={true}
      />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Verify Bank Details of {userName}</Text>

        {/* <Text style={styles.label}>Account Number*</Text>
        <TextInput
          style={styles.input}
          placeholder="Nominee name"
          value={nomineeName}
          onChangeText={setNomineeName}
        /> */}

        <InputBox
          label={"Account Number"}
          required={true}
          placeHolderName={"Account Number"}
          keyboardType="numeric"
        />

        <View
          style={{
            marginBottom: 10,
          }}
        >
          <Text style={styles.dropDownlabel}>
            Account type <Text style={{ color: "red" }}>*</Text>
          </Text>
          <MySelectPicker
            values={mobileEmailRelation}
            placeholder={"Select Mobile Relation"}
            defultValue={"djksjdk"}
            error={"dskj"}
            onChange={(mobile_relation) => {
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
            }}
            style={{
              fontSize: 14,
              color: "#000",
            }}
          />
        </View>

        <InputBox
          label={"Ifsc Code"}
          required={true}
          placeHolderName={"Ifsc Code"}
          keyboardType="numeric"
        />

        <InputBox
          label={"Branch"}
          required={true}
          placeHolderName={"Branch"}
          editable={false}
          inputStyle={{
            backgroundColor: "#00000010",
          }}
          placeholderTextColor="#00000060"
        />

        <InputBox
          label={"Branch Address"}
          required={true}
          placeHolderName={"Branch Address"}
          editable={false}
          inputStyle={{
            backgroundColor: "#00000010",
          }}
          placeholderTextColor="#00000060"
        />
      </ScrollView>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Confirm and Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  dropDownlabel: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 5,
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "black",
    paddingBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#FFB2AA",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  datePicker: {
    width: "100%",
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkboxBase: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: "#27AE60",
    borderColor: "#27AE60",
  },
  checkboxTick: {
    color: "#fff",
  },
  checkboxLabel: {
    fontSize: 16,
  },
  addNomineeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  addNomineeText: {
    color: "#27AE60",
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#E74C3C",
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default UserBankDetails;
