import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Header from "../common/Header";
import CustomButton from "../common/Button";
import OutLinedButton from "../common/OutlinedButton";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId: process.env.WEBCLIENT_ID.toString(),
});

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const { user } = await GoogleSignin.signIn();
      console.log("🚀 ~ onGoogleButtonPress ~ user:", user);
      if (user) {
        alert("Success");
      } else {
        alert("Failed to login");
      }
    } catch (err) {
      console.log("the error is ==>", err);
    }
  }

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.label}>Enter your Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Mail"
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholderTextColor="#D3D3D3"
      />

      <Text style={styles.orText}>Or</Text>

      <OutLinedButton
        onPress={() => {
          onGoogleButtonPress()
            .then((success) => {
              console.log("successfully logged in !!!!!!!!!!", success);
            })
            .catch((error) => {
              console.log("failed to login !!!!!", error);
            });
        }}
      >
        <View style={styles.googleContent}>
          <Image
            source={require("../../../../assets/pngwing.com.png")}
            style={styles.googleIcon}
          />
          <Text style={styles.googleText}>Continue with Google</Text>
        </View>
      </OutLinedButton>

      <TouchableOpacity style={styles.helpButton}>
        <View style={styles.helpContent}>
          <Image
            source={require("../../../../assets/youtube.png")}
            style={styles.helpIcon}
          />
          <Text style={styles.helpText}>Get help to login.</Text>
        </View>
      </TouchableOpacity>

      <CustomButton>
        <Text style={styles.continueText}>Continue</Text>
      </CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  imgeWidht: {
    height: 50,
    aspectRatio: 3.5,
    resizeMode: "contain",
    alignSelf: "flex-end",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: "contain",
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    fontWeight: "700",
  },
  input: {
    borderWidth: 1,
    borderColor: "#FFB2AA",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: "#000",
  },
  orText: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
    color: "#333",
  },
  googleButton: {
    borderWidth: 1,
    borderColor: "#FFB2AA",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  googleContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  googleIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
    resizeMode: "contain",
  },
  googleText: {
    fontSize: 16,
    color: "#333",
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

  continueText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default LoginScreen;
