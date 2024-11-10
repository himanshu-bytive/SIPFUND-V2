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
import AntDesign  from "react-native-vector-icons/AntDesign";
import { Header, Overlay, CheckBox, SearchBar } from "react-native-elements";

function SchemeList(props) {
  const {
    getSchemeList,
    amcCode,
    schemeDetails,
    token,
    selectedAmcScheme,
    schemeListKey,
  } = props;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [filteredSchemes, setFilteredSchemes] = useState([]);

  useEffect(() => {
    if (schemeDetails && schemeDetails !== null) {
      setFilteredSchemes(
        schemeDetails.filter((scheme) => {
          return scheme.PRODUCT_LONG_NAME.toLowerCase().includes(
            search.toLowerCase()
          );
        })
      );
    }
  }, [search, schemeDetails]);

  const toggleSearch = () => {
    setShowSearch((prevState) => !prevState);
    setSearch("");
  };

  const selectedScheme = (itemName, targetCode, targetReinvest) => {
    let params = {
      key: schemeListKey,
      amcScheme: itemName,
      targetCode: targetCode,
      targetReinvest: targetReinvest,
    };
    selectedAmcScheme(params);
    props.navigation.navigate("Switch");
  };

  return (
    <View style={styles.container}>
      {showSearch === false && (
        <View style={styles.switch_sec}>
          <Text style={styles.transaction}>AMC Scheme List</Text>
          <TouchableOpacity onPress={toggleSearch}>
            <AntDesign
              name={"search1"}
              size={30}
              color={Colors.WHITE}
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        </View>
      )}
      {showSearch === true && (
        <View style={styles.search}>
          <TouchableOpacity onPress={toggleSearch}>
            <AntDesign
              name={"arrowleft"}
              size={28}
              color={Colors.WHITE}
              style={styles.arrow}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Search here"
            onChangeText={(text) => setSearch(text)}
            style={styles.searchBar}
          />
        </View>
      )}

      <ScrollView style={styles.containerScroll}>
        {filteredSchemes !== null &&
          filteredSchemes.map((item) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  selectedScheme(
                    item.PRODUCT_LONG_NAME,
                    item.PRODUCT_CODE,
                    item.REINVEST_TAG
                  )
                }
              >
                <Text style={styles.fund_sec}>{item.PRODUCT_LONG_NAME}</Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D3D6DB",
  },
  switch_sec: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.RED,
    marginTop: 20,
  },
  searchIcon: {
    marginRight: 10,
    marginVertical: 20,
    textAlign: "right",
  },
  search: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: Colors.RED,
    marginTop: 20,
  },
  searchBar: {
    marginVertical: 20,
    fontSize: 18,
    color: Colors.WHITE,
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
  fund_sec: {
    fontSize: 14,
    backgroundColor: Colors.WHITE,
    color: Colors.DEEP_GRAY,
    padding: 10,
    marginTop: 1,
  },
});

const mapStateToProps = (state) => ({
  token: state.auth.token,
  schemeDetails: state.switch.schemeDetails,
  amcCode: state.switch.amcCode,
  schemeListKey: state.switch.schemeListKey,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { AuthActions } = require("../../store/AuthRedux");
  const { SwitchActions } = require("../../store/SwitchRedux");
  return {
    ...stateProps,
    ...ownProps,
    logOut: () => {
      AuthActions.logOut(dispatch);
    },

    getSchemeList: (params, token) => {
      SwitchActions.getSchemeList(dispatch, params, token);
    },
    selectedAmcScheme: (params) => {
      SwitchActions.selectedAmcScheme(dispatch, params);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(SchemeList);
