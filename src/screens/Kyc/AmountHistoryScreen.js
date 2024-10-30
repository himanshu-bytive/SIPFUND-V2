/** @format */

import React, { useState, useRef, useEffect, useContext } from "react";
import { DataTable } from "react-native-paper";
import {
  StyleSheet,
  Button,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import moment from "moment";
import { connect } from "react-redux";
import { Styles, Config, Colors, FormValidate } from "../../common";
import {
  Ionicons,
  AntDesign,
  MaterialIcons,
  Feather,
  Entypo,
  FontAwesome,
  FontAwesome5,
} from "react-native-vector-icons";
import { Image, Header, ListItem, Overlay } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Toast from "react-native-simple-toast";

function AmountHistoryScreen(props) {
  const { refers, token, passRefer } = props;
  return (
    <View style={styles.container}>
      {/* header  */}
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{ marginTop: 20 }}
          >
            <AntDesign name={"arrowleft"} size={30} color={Colors.RED} />
          </TouchableOpacity>
        }
        backgroundColor={Colors.PEACH}
        // backgroundColor={Colors.WHITE}
        centerComponent={
          <Image
            source={require("../../../assets/icon.png")}
            style={styles.logimg}
          />
        }
        rightComponent={
          <View style={{ marginTop: 20, marginRight: 10 }}>
            <AntDesign name={"shoppingcart"} size={40} color={Colors.RED} />
          </View>
        }
      />
      <ScrollView>
        {/* Amount History section */}
        <View style={styles.amount_sec}>
          <Text style={styles.amount}>Amount History</Text>
        </View>

        {/* invest_sec */}
        <View style={styles.invest_sec}>
          <View style={styles.transfer_sec}>
            <Text style={styles.zero_text}>
              <Text style={styles.rupees_text}>₹</Text>
              {refers.creditAmount}
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (refers?.creditAmount === 0) {
                  Toast.show("Insufficient funds!", Toast.LONG);
                } else {
                  passRefer(token);
                }
              }}
              style={styles.botton_box}
            >
              <Text style={styles.get_otp}>Transfer To My Amazon Account</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: Colors.GREY_1,
              marginVertical: 20,
              marginHorizontal: 10,
            }}
          ></View>
          <ScrollView horizontal>
            <DataTable style={styles.dataTable}>
              <DataTable.Header>
                <DataTable.Title style={styles.headerCell}>
                  Date
                </DataTable.Title>
                <DataTable.Title style={styles.headerCell}>
                  Type
                </DataTable.Title>
                <DataTable.Title style={styles.headerCell}>
                  Amount
                </DataTable.Title>
                <DataTable.Title style={styles.headerCell}>
                  Status
                </DataTable.Title>
              </DataTable.Header>
              {refers.transactions
                ? refers.transactions.map((item, key) => (
                    <DataTable.Row key={key}>
                      <DataTable.Cell style={styles.bodyCell}>
                        {moment(item.date).format("MMM-DD-YYYY")}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.bodyCell}>
                        {item.type}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.bodyCell}>
                        ₹{item.amount}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.bodyCell}>
                        {item.status}
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))
                : null}
            </DataTable>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logimg: {
    height: 65,
    width: 203,
    marginTop: 10,
  },
  amount_sec: {
    backgroundColor: Colors.RED,
  },
  amount: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.WHITE,
    textAlign: "center",
    marginVertical: 10,
  },

  invest_sec: {
    marginTop: 20,
    backgroundColor: Colors.WHITE,
    marginHorizontal: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.62,
    elevation: 4,
    padding: 10,
  },
  transfer_sec: {
    flexDirection: "row",
  },
  zero_text: {
    fontSize: 27,
    fontWeight: "bold",
  },
  rupees_text: { color: Colors.GREEN_2 },
  botton_box: {
    width: "70%",
    backgroundColor: Colors.RED,
    position: "absolute",
    right: 0,
  },
  dataTable: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerCell: {
    width: 100,
    borderRightWidth: 1,
    borderRightColor: "#ccc",
    paddingLeft: 15,
  },
  bodyCell: {
    width: 100,
    borderRightWidth: 1,
    borderRightColor: "#ccc",
    paddingLeft: 15,
  },
  get_otp: {
    color: Colors.WHITE,
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  mainbox: {
    borderTopWidth: 1,
    borderColor: Colors.GREY_1,
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  date_sec: {
    borderRightWidth: 1,
    borderColor: Colors.GREY_1,
  },
});
const mapStateToProps = (state) => ({
  token: state.auth.token,
  refers: state.sideMenu.refers,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { SideMenuActions } = require("../../store/SideMenuRedux");
  return {
    ...stateProps,
    ...ownProps,
    passRefer: (token) => {
      SideMenuActions.passRefer(dispatch, token);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(AmountHistoryScreen);
