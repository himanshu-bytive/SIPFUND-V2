import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Success from "../common/Success";

const SuccessPageWithImageFooter = ({ children }) => {
  return (
    <View style={styles.container}>
      <Success>{children}</Success>

      <View style={styles.footer}>
        <Image
          source={require("../../../../assets/nse.png")}
          style={styles.footerImage}
        />
      </View>
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
  footer: {
    alignItems: "center",
    marginBottom: "10%",
  },
  footerImage: {
    width: "100%",
    resizeMode: "contain",
    aspectRatio: 4.5,
  },
});

export default SuccessPageWithImageFooter;
