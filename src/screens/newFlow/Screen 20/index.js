import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Header from "../common/Header";
import InputBox from "../common/InputBox";
import CustomButton from "../common/Button";

const AddressPage = () => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <View style={styles.inputContainer}>
          <Header
            showBackBtn={true}
            containerStyle={{
              marginTop: 0,
            }}
          />
          <Text style={styles.welcomeText}>Add Address</Text>

          <InputBox label={"Pincode"} placeHolderName={"pincode"} />
          <InputBox
            label={"Address line #1"}
            placeHolderName={"Address line #1"}
            required={true}
          />
          <InputBox
            label={"Address line #2"}
            placeHolderName={"Address line #2"}
            required={true}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <InputBox
              containerStyle={{ flex: 0.48 }}
              label={"State"}
              placeHolderName={"State"}
              required={true}
            />
            <InputBox
              containerStyle={{ flex: 0.48 }}
              label={"City"}
              placeHolderName={"CIty"}
              required={true}
            />
          </View>
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
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

export default AddressPage;
