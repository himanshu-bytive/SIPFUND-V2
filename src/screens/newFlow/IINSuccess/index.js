import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Success from "../common/Success";

const InvestorAccountScreen = ({
  handleBtnClick,
  status = {
    IIN_Number: 123234242243,
    IIN_Sync_Status: "Validated",
  },
}) => {
  return (
    <View style={styles.container}>
      <Success>
        <Text style={styles.title}>
          Your investor account is ready for activation now!
        </Text>
        <Text style={styles.iinText}>
          Your IIN Number – {status.IIN_Number}
        </Text>
        <Text style={styles.kycStatus}>
          KYC Status = {status.IIN_Sync_Status}
        </Text>
        <Text style={styles.instructionText}>
          Please check your email and approve the link sent by NSE for your
          account activation.
        </Text>
        <Text style={styles.instructionText}>
          In case if there is more validation required please upload your
          documents.
        </Text>
      </Success>
      <TouchableOpacity style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>Upload documents</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 10,
  },
  iinText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 5,
  },
  kycStatus: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 20,
    color: "green",
  },
  instructionText: {
    fontSize: 18,
    textAlign: "center",
    color: "gray",
    marginBottom: 10,
    lineHeight: 25,
    fontWeight: "bold",
  },
  uploadButton: {
    backgroundColor: "#D32F2F",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  uploadButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default InvestorAccountScreen;
