import { StyleSheet, TouchableOpacity } from "react-native";

const OutLinedButton = ({
  children,
  mainContainerStyle,
  onPress,
  ...extraProps
}) => (
  <TouchableOpacity
    style={[styles.buttonstyle, mainContainerStyle && mainContainerStyle]}
    onPress={onPress}
    {...extraProps}
  >
    {children}
  </TouchableOpacity>
);

export default OutLinedButton;

const styles = StyleSheet.create({
  buttonstyle: {
    borderWidth: 1,
    borderColor: "#FFB2AA",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    alignItems: "center",
  },
});
