import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import OutLinedButton from "../common/OutlinedButton";
import Header from "../common/Header";
import CustomButton from "../common/Button";
import CustomCheckBox from "../common/CheckBox";

const INCOMES = [
  "Upto 1 lakh",
  "1 Lakh - 5 Lakh",
  "5 Lakh - 10 Lakh",
  "10 Lakh - 25 Lakh",
  "25 Lakh - 50 Lakh",
  "50 Lakh - 1 Crore",
  "1 Crore - 5 Crore",
  "More than 5 Crore",
];

const OccupationSelectionScreen = () => {
  const [selectedOccupation, setSelectedOccupation] = useState(null);

  const selectOccupation = (occupation) => {
    setSelectedOccupation(occupation);
  };

  const [isChecked, setIsChecked] = useState(false);

  const renderOccupationItem = ({ item }) => {
    return (
      <OutLinedButton
        mainContainerStyle={
          selectedOccupation === item
            ? {
                ...styles.btn,
                ...styles.selected,
              }
            : {
                ...styles.btn,
              }
        }
        onPress={() => selectOccupation(item)}
      >
        <Text style={styles.optionTextStyle}>{item}</Text>
      </OutLinedButton>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
        }}
      >
        <Header
          showBackBtn={true}
          mainContainerStyle={{
            marginBottom: 10,
          }}
        />
        <Text style={styles.title}>Annual Income</Text>
        <Text style={styles.subtitle}>Select one of the options.</Text>

        <View>
          <FlatList
            data={INCOMES}
            renderItem={renderOccupationItem}
            keyExtractor={(item) => item}
            numColumns={2}
            columnWrapperStyle={styles.row}
          />
          <CustomCheckBox
            label={" I am not politically-exposed (PEP) or related to a PEP"}
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
      </View>

      <CustomButton>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    marginBottom: 20,
  },

  row: {
    justifyContent: "space-between",
  },
  btn: {
    width: "48%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#f08080",
    alignItems: "center",
    padding: 15,
  },
  optionTextStyle: {
    fontSize: 14,
  },
  selected: {
    backgroundColor: "#f08080",
    color: "#fff",
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
});

export default OccupationSelectionScreen;
