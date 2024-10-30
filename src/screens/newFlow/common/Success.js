import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const Success = ({ children }) => {
  return (
    <View style={styles.content}>
      <View style={styles.iconWrapper}>
        <Image
          style={styles.icon}
          source={{
            uri: "",
          }} // Use your own URL or asset here
        />
      </View>
      {children}
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
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapper: {
    marginBottom: 20,
  },
  icon: {
    width: 80,
    height: 80,
    resizeMode: "contain",
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

export default Success;
