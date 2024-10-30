import { StyleSheet, View, Text, TextInput } from "react-native";
const InputBox = ({
  label,
  placeHolderName,
  value,
  onChangeText,
  labelStyle,
  inputStyle,
  error,
  containerStyle,
  required,
  ...extraProps
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label ? (
        <Text style={[styles.label, labelStyle]}>
          {label}
          {required && <Text style={{ color: "red" }}>*</Text>}
        </Text>
      ) : null}
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeHolderName}
        value={value ?? ""}
        onChangeText={onChangeText}
        {...extraProps}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
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
    color: "#000",
  },

  container: {
    marginBottom: 20,
  },

  error: {
    fontSize: 12,
    paddingVertical: 5,
    color: "red",
  },
});
