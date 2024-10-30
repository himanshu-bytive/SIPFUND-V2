import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Header from "../common/Header";
import CustomButton from "../common/Button";
import OutLinedButton from "../common/OutlinedButton";

const Step2 = () => {
  const [selectedGender, setSelectedGender] = useState(null);

  const selectGender = (gender) => {
    setSelectedGender(gender);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
        }}
      >
        <Header showBackBtn={true} />

        <Text style={styles.title}>Gender</Text>
        <Text style={styles.subtitle}>Select one of the options.</Text>

        <View style={styles.buttonContainer}>
          <OutLinedButton
            mainContainerStyle={[
              styles.genderButton,
              selectedGender === "Male" ? styles.selected : null,
            ]}
            onPress={() => selectGender("Male")}
          >
            <Text style={styles.genderText}>Male</Text>
          </OutLinedButton>

          <OutLinedButton
            onPress={() => selectGender("Female")}
            mainContainerStyle={[
              styles.genderButton,
              selectedGender === "Female" ? styles.selected : null,
            ]}
          >
            <Text style={styles.genderText}>Female</Text>
          </OutLinedButton>
        </View>
      </View>

      <CustomButton>
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
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  genderButton: {
    width: "48%",
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#f08080",
    alignItems: "center",
  },
  genderText: {
    fontSize: 16,
  },
  selected: {
    backgroundColor: "#f08080",
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
});

export default Step2;
