import { Pressable, View, StyleSheet, Text } from "react-native";

const CustomCheckBox = ({
  checkboxContainerStyle,
  label,
  value,
  onValueChange,
  customCheckboxCheckedStyle,
  customCheckboxTickStyle,
  customcheckboxBaseStyle,
  customCheckboxLabelStyle,
}) => (
  <View style={[styles.checkboxContainer, checkboxContainerStyle]}>
    <Pressable
      style={[
        styles.checkboxBase,
        customcheckboxBaseStyle,
        value && { ...styles.checkboxChecked, ...customCheckboxCheckedStyle },
      ]}
      onPress={() => onValueChange(!value)}
    >
      {value && (
        <Text style={[styles.checkboxTick, customCheckboxTickStyle]}>✔</Text>
      )}
    </Pressable>
    <Text style={[styles.checkboxLabel, customCheckboxLabelStyle]}>
      {label}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkboxBase: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: "#27AE60",
    borderColor: "#27AE60",
  },
  checkboxTick: {
    color: "#fff",
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    flexWrap: "wrap",
  },
});

export default CustomCheckBox;
