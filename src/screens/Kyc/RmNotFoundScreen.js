import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Header } from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { connect } from "react-redux";
import Cart from "../../components/Cart";

import { Colors } from "../../common";

const RmNotFoundScreen = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => props.navigation.toggleDrawer()}
            style={{ marginTop: 20 }}
          >
            <Entypo name={"menu"} size={30} color={Colors.RED} />
          </TouchableOpacity>
        }
        backgroundColor={Colors.LIGHT_WHITE}
        centerComponent={
          <Image
            source={require("../../../assets/icon.png")}
            style={styles.logimg}
          />
        }
        rightComponent={
          <View style={{marginTop:30}}>
           <Cart
            nav={() => {
              props.navigation.navigate("TopRatedFunds", { screen: "TopRatedList" });
            }}
          />
         </View>
        }
      />
      <View style={styles.container}>
        <Image source={require("../../../assets/rm_not_found.png")} />
        <Text style={styles.text}>
          Soon a Relationship Manager will be assigned for you
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.WHITE,
  },
  logimg: {
    height: 65,
    width: 203,
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    marginTop: 15,
    marginHorizontal: 10,
    textAlign: "center",
    color:"black"
  },
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...stateProps,
    ...ownProps,
  };
};
export default connect(
  () => {
    return {};
  },
  undefined,
  mapDispatchToProps
)(RmNotFoundScreen);
