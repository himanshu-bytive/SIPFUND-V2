import {
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Header from "../common/Header";
import InputBox from "../common/InputBox";
import CustomCheckBox from "../common/CheckBox";
import { useState } from "react";
import CustomButton from "../common/Button";

const SetPasswordScreen = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View>
        <Header showBackBtn={true} />
        <InputBox
          label={"Set Password for SIPFund account"}
          placeHolderName={"Password"}
          labelStyle={{
            fontSize: 18,
            fontWeight: "600",
          }}
        />

        <InputBox
          label={"Confirm Password "}
          placeHolderName={"Confirm Password"}
          labelStyle={{
            fontSize: 18,
            fontWeight: "600",
          }}
        />
        <InputBox
          placeHolderName={"Have a referral code ? (optional)"}
          labelStyle={{
            fontSize: 18,
            fontWeight: "600",
          }}
        />
        <View>
          <CustomCheckBox
            label={"Accept terms and conditions"}
            customcheckboxBaseStyle={{
              borderColor: "#FFB2AA",
            }}
            customCheckboxCheckedStyle={{
              backgroundColor: "#f00",
              borderColor: "#f00",
            }}
            value={isChecked}
            onValueChange={() => setIsChecked(!isChecked)}
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

      <View>
        <CustomButton>
          <Text style={styles.continueText}>Create</Text>
        </CustomButton>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingBottom: 30,
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    fontWeight: "700",
  },

  continueText: {
    fontSize: 16,
    color: "#fff",
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
});

export default SetPasswordScreen;
