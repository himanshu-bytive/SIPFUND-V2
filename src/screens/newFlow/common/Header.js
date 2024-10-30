import React from "react";
import { TouchableOpacity } from "react-native";
import { View, StyleSheet, Image } from "react-native";

const Header = ({ backBtnProps, showBackBtn, containerStyle }) => {
  const { onPress, btnStyle } = backBtnProps || {
    onPress: () => {},
    btnStyle: {},
  };
  return (
    <View style={[styles.container, containerStyle]}>
      {showBackBtn && (
        <TouchableOpacity
          style={[styles.backArrowBtn, btnStyle]}
          onPress={onPress}
        >
          <Image
            source={require("../../../../assets/backBtn.png")}
            style={styles.backArrowImg}
          />
        </TouchableOpacity>
      )}
      <View style={styles.logoStyle}>
        <Image
          source={require("../../../../assets/icon.png")}
          style={styles.imgeWidht}
        />
      </View>
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
  logoStyle: {
    flex: 1,
  },
  backArrowBtn: {
    width: 40,
    justifyContent: "center",
  },
  backArrowImg: {
    resizeMode: "center",
    height: 30,
    aspectRatio: 1,
  },
  container: {
    backgroundColor: "#FFF",
    marginBottom: 20,
    flexDirection: "row",
  },
});

export default Header;
