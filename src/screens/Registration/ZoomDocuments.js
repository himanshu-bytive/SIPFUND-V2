import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  Button,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { Styles, Config, Colors, FormValidate } from "../../common";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { Header, Overlay, CheckBox, SearchBar } from "react-native-elements";

const zoomDocuments = (props) => {
  const { documentUri } = props;
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("UploadDocument")}
        >
          <AntDesign
            name={"arrowleft"}
            size={28}
            color={Colors.WHITE}
            style={styles.arrow}
          />
        </TouchableOpacity>
        <Text style={styles.transaction}>Sip Fund</Text>
      </View>
      <View>
        {documentUri && (
          <View style={styles.img}>
            <Image
              source={{ uri: documentUri }}
              style={{
                width: "85%",
                height: "95%",
                resizeMode: "contain",
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D3D6DB",
  },
  img: {
    justifyContent: "center",
    alignItems: "center",
  },

  search: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: Colors.RED,
    marginTop: 20,
  },

  arrow: {
    marginLeft: 10,
    marginVertical: 20,
    marginRight: 20,
  },
  transaction: {
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "left",
    marginVertical: 20,
    marginLeft: 10,
    color: Colors.WHITE,
  },
});

const mapStateToProps = (state) => ({
  token: state.auth.token,
  documentUri: state.registration.documentUri,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { AuthActions } = require("../../store/AuthRedux");

  return {
    ...stateProps,
    ...ownProps,
    logOut: () => {
      AuthActions.logOut(dispatch);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(zoomDocuments);
