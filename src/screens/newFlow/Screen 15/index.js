import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Header from "../common/Header";
import InputBox from "../common/InputBox";
import CustomButton from "../common/Button";

const Step1 = ({ username }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Header
          showBackBtn={true}
          containerStyle={{
            marginTop: 0,
          }}
        />
        <Text style={styles.welcomeText}>Welcome {username}</Text>

        <InputBox label={"Father's name"} placeHolderName={"Father name"} />
        <InputBox label={"Mother's name"} placeHolderName={"Mother name"} />
        <TouchableOpacity style={styles.helpButton}>
          <View style={styles.helpContent}>
            <Image
              source={require("../../../../assets/youtube.png")}
              style={styles.helpIcon}
            />
            <Text style={styles.helpText}>Get help to login.</Text>
          </View>
        </TouchableOpacity>
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
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },

  label: {
    fontSize: 16,
    color: "#000",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#f08080",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
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
  helpButton: {
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  helpContent: {
    flexDirection: "row",
  },
  helpIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  helpText: {
    fontSize: 16,
    color: "#FF0000",
  },

  inputContainer: {
    flex: 1,
  },
});

export default Step1;
