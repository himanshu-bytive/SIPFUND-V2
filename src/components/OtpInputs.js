import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Colors } from "../common";

class OtpInputs extends React.Component {
  state = { otp: [] };
  otpTextInput = [];

  componentDidMount() {
    this.otpTextInput[0].focus();
  }

  renderInputs() {
    const inputs = Array(4).fill(0);
    const txt = inputs.map((i, j) => (
      <View key={j} style={styles.txtMargin}>
        <TextInput
          style={styles.inputRadius}
          keyboardType="numeric"
          onChangeText={(v) => this.focusNext(j, v)}
          onKeyPress={(e) => this.focusPrevious(e.nativeEvent.key, j)}
          ref={(ref) => (this.otpTextInput[j] = ref)}
        />
      </View>
    ));
    return txt;
  }

  focusPrevious(key, index) {
    if (key === "Backspace" && index !== 0)
      this.otpTextInput[index - 1].focus();
  }

  focusNext(index, value) {
    if (index < this.otpTextInput.length - 1 && value) {
      this.otpTextInput[index + 1].focus();
    }
    if (index === this.otpTextInput.length - 1) {
      this.otpTextInput[index].blur();
    }
    const otp = this.state.otp;
    otp[index] = value;
    this.setState({ otp });
    this.props.getOtp(otp.join(""));
  }

  render() {
    return <View style={styles.gridPad}>{this.renderInputs()}</View>;
  }
}

const styles = StyleSheet.create({
  gridPad: {
    //padding: 5,
    margin: 20,
    flexDirection: "row",
  },
  txtMargin: { margin: 3, width: "15%" },
  inputRadius: {
    textAlign: "center",
    //padding: 10,
    borderBottomWidth: 3,
    borderColor: Colors.GREY.border,
  },
});

export default OtpInputs;
