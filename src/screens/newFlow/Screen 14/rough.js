import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";

const PanEntryScreen = () => {
  const [panNumber, setPanNumber] = useState("");

  const handleNext = () => {
    if (panNumber.trim().length === 10) {
      Alert.alert("Valid PAN", "Proceeding to the next step");
    } else {
      Alert.alert("Invalid PAN", "Please Enter a valid 10-digit PAN");
    }
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>

      {/* Logo and title */}
      <Image
        source={{ uri: "https://example.com/pan-card.png" }}
        style={styles.panImage}
      />
      <Text style={styles.title}>Enter Your PAN</Text>
      <Text style={styles.subtitle}>
        PAN is compulsory for investing in India.
      </Text>

      {/* PAN input field */}
      <TextInput
        style={styles.input}
        placeholder="PAN Number"
        value={panNumber}
        onChangeText={setPanNumber}
        maxLength={10}
        keyboardType="default"
        placeholderTextColor="#999"
      />

      {/* Info icon (You can replace this with an actual icon) */}
      <TouchableOpacity style={styles.infoIcon}>
        <Text style={styles.infoIconText}>i</Text>
      </TouchableOpacity>

      {/* Security note */}
      <Text style={styles.securityNote}>
        Your PAN details are completely safe and secure with us.
      </Text>

      {/* Next button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  backButtonText: {
    fontSize: 24,
    color: "#000",
  },
  panImage: {
    width: 200,
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#999",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  infoIcon: {
    position: "absolute",
    right: 30,
    top: "45%",
  },
  infoIconText: {
    fontSize: 16,
    color: "#999",
  },
  securityNote: {
    fontSize: 12,
    color: "#666",
    marginTop: 10,
    textAlign: "center",
    marginBottom: 20,
  },
  nextButton: {
    width: "100%",
    backgroundColor: "#ff0000",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default PanEntryScreen;
