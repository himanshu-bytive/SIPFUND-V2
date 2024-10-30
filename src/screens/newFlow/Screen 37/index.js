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
import OutLinedButton from "../common/OutlinedButton";

const NomineeForm = () => {
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

  const [docType, setDocType] = useState("");
  const [docError, setDocError] = useState();
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
      />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* <Text style={styles.label}>Nominee name*</Text>
        <TextInput
          style={styles.input}
          placeholder="Nominee name"
          value={nomineeName}
          onChangeText={setNomineeName}
        /> */}

        <InputBox
          label={"Nominee name"}
          required={true}
          placeHolderName={"Nominee name"}
        />

        <View
          style={{
            marginBottom: 10,
          }}
        >
          <Text style={styles.dropDownlabel}>Nominee is your*</Text>
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
        <Text style={styles.dropDownlabel}>Nominee’s date of birth*</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setIsDatePickerVisible(true)}
          style={{
            flex: 1,
          }}
        >
          <TextInput
            keyboardType="numeric"
            style={[
              styles.input,
              {
                fontSize: 14,
                color: "black",
              },
            ]}
            editable={false}
            selectTextOnFocus={false}
            value={dob ? getDateInHuman(dob) : ""}
            onChangeText={(dob) => {
              if (dob.length === 0) {
                // setErrors({ ...errors, dob: null })
              }
              //   setErrors({ ...errors, dob: null });
              //   setState({ ...state, dob });
            }}
            placeholder={"DD-MM-YYYY"}
            maxLength={10}
          />
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={new Date()}
          maximumDate={new Date()}
          onConfirm={(dob) => {
            setIsDatePickerVisible(false);
            setDob(dob);
            //   setErrors({ ...errors, dob: null });
            //   setState({ ...state, dob: dob.getTime() });
          }}
          onCancel={() => setIsDatePickerVisible(false)}
        />

        <Text style={styles.label}>Nominee’s identity proof (optional)</Text>

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
            marginBottom: !docError ? 10 : 0,
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

        {docType ? (
          <OutLinedButton>
            <Text>Click to upload the {docType}</Text>
          </OutLinedButton>
        ) : null}

        <CustomCheckBox
          label={"Nominee address is same as my address"}
          value={sameAddress}
          onValueChange={setSameAddress}
        />

        {!sameAddress ? (
          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <InputBox
                containerStyle={{
                  flex: 0.48,
                }}
                placeHolderName={"PINCODE"}
              />
              <InputBox
                containerStyle={{
                  flex: 0.48,
                }}
                placeHolderName={"STATE"}
              />
            </View>
            <InputBox placeHolderName={"ADDRESS"} />
          </View>
        ) : null}

        <TouchableOpacity style={styles.addNomineeContainer}>
          <Text style={styles.addNomineeText}>+ Add another nominee</Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add Nominee</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
  },
  dropDownlabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
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

export default NomineeForm;
