import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Header from "../common/Header";
import OutLinedButton from "../common/OutlinedButton";
import CustomButton from "../common/Button";

const WantAddNominee = () => {
  return (
    <View style={styles.container}>
      <View>
        <Header showBackBtn={true} />

        <View
          style={{
            marginTop: 20,
          }}
        >
          <Text style={styles.title}>Whold you like to add Nominee? </Text>
          <Text style={styles.subtitle}>
            Nominee gets your investment in the event of any unforeseen
            circumstances. You can add them now or later in the profile section.
          </Text>
        </View>
      </View>

      <View>
        <OutLinedButton
          mainContainerStyle={{
            marginBottom: 0,
          }}
        >
          <Text style={{ fontSize: 16 }}> No, Skip for now</Text>
        </OutLinedButton>
        <CustomButton
          mainContainerStyle={{
            marginTop: 10,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>Yes, Proceed</Text>
        </CustomButton>
      </View>
    </View>
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

export default WantAddNominee;
