import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  StyleSheet,
} from "react-native";

const MobileScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.inner}>
        <Text style={styles.title}>
          Achieve Your <Text style={styles.highlight}>Dreams</Text>
        </Text>
        <Image
          source={require("../../../../assets/LoginPageImage.png")}
          style={styles.image}
        />

        <Text style={styles.subTitle}>Enter your mobile number</Text>

        <View style={styles.phoneInput}>
          <TextInput
            style={styles.input}
            placeholder="Mobile number"
            placeholderTextColor={"black"}
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Enter</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Image
          source={require("../../../../assets/nse.png")}
          style={styles.footerImage}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
  highlight: {
    color: "#D9534F",
  },
  image: {
    height: 200,
    aspectRatio: 1.5,
    alignSelf: "center",
    marginVertical: 20,
    resizeMode: "contain",
  },
  subTitle: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 18,
    fontWeight: "700",
  },
  phoneInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFB2AA",
    borderRadius: 5,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: "#D9534F",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginHorizontal: 10,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
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

export default MobileScreen;
