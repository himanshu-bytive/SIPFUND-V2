import { StyleSheet, TouchableOpacity } from "react-native";

const CustomButton = ({
  children,
  mainContainerStyle,
  onPress,
  ...extraProps
}) => (
  <TouchableOpacity
    style={[styles.continueButton, mainContainerStyle]}
    onPress={onPress}
    {...extraProps}
  >
    {children}
  </TouchableOpacity>
);

export default CustomButton;

const styles = StyleSheet.create({
  continueButton: {
    backgroundColor: "#D9534F",
    borderRadius: 5,
    padding: 10,
    marginTop: 40,
    alignItems: "center",
  },
});
