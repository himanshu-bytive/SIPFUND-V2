import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MySelectPicker } from "../../../components";
import Header from "../common/Header";
import CustomButton from "../common/Button";

const MOBandEmailInfo = () => {
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
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
        }}
      >
        <Header showBackBtn={true} />
        <View
          style={{
            marginBottom: 10,
          }}
        >
          <View>
            <Text style={styles.dropDownlabel}>Mobile Numbers belongs to</Text>
            <MySelectPicker
              values={mobileEmailRelation}
              placeholder={"Select Mobile Relation"}
              defultValue={"Self"}
              error={"dskj"}
              onChange={(mobile_relation) => {
                //   setErrors({ ...errors, phone: null });
                //   setState({ ...state, mobile_relation });
              }}
              mainWrapperContainerStyle={{
                ...styles.input,
                marginBottom: 0,
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

          <View
            style={{
              marginTop: 10,
            }}
          >
            <Text style={styles.dropDownlabel}>Email Id belongs to</Text>
            <MySelectPicker
              values={mobileEmailRelation}
              placeholder={"Select Mobile Relation"}
              defultValue={"Self"}
              error={"dskj"}
              onChange={(mobile_relation) => {
                //   setErrors({ ...errors, phone: null });
                //   setState({ ...state, mobile_relation });
              }}
              mainWrapperContainerStyle={{
                ...styles.input,
                marginBottom: 0,
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
        </View>
      </View>

      <CustomButton onPress={() => {}} mainContainerStyle={{ marginTop: 0 }}>
        <Text style={styles.nextButtonText}>Next</Text>
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
    fontWeight: "700",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
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
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default MOBandEmailInfo;
