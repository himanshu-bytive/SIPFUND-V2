import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Header from "../common/Header";
import OutLinedButton from "../common/OutlinedButton";
import { Entypo } from "react-native-vector-icons";
import CustomButton from "../common/Button";

const documentsMap = ["Pan Card", "Bank Proof", "Photo", "Original Aadhaar"];

const UploadDoc = () => {
  const renderOccupationItem = ({ item }) => {
    return (
      <OutLinedButton
        mainContainerStyle={{
          ...styles.btn,
          justifyContent: "space-between",
          flexDirection: "row",
        }}
        onPress={() => selectOccupation(item)}
      >
        <Text>{item}</Text>
        <Entypo name={"attachment"} size={22} color="#000000" />
      </OutLinedButton>
    );
  };
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
            paddingHorizontal: 10,
          }}
        >
          <Text style={styles.title}>Upload Documents for Offline KYC</Text>
          <Text style={styles.subtitle}>
            Please upload your documents for easy and quick activation of your
            transactional account.
          </Text>

          <View>
            <FlatList
              data={documentsMap}
              renderItem={renderOccupationItem}
              keyExtractor={(item) => item}
            />
          </View>
        </View>
      </View>

      <CustomButton>
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "700",
          }}
        >
          Next
        </Text>
      </CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  btn: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#f08080",
    alignItems: "center",
    padding: 15,
  },
  row: {
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    marginBottom: 20,
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

export default UploadDoc;
