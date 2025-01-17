import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Header } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import Cart from "../../components/Cart";
import { Colors } from "../../common";

function CeaseSIP(props) {
  const { token, user, getSipDetail, ceaseSip, ceaseSipEntry } = props;
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState({});

  useEffect(() => {
    getSipDetail(user.pan, token);
  }, []);

  useEffect(() => {
    console.log('ceaseSip', ceaseSip);
  }, [ceaseSip]);

  const monthList = [
    { value: "01", label: "01" },
    { value: "02", label: "02" },
    { value: "03", label: "03" },
  ];
  
  // Handle month selection per item
  const handleMonthChange = (value, id) => {
    setSelectedMonths((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSelectItem = (item) => {
    console.log('items', item);
    const month = selectedMonths[item._id];

    if (!month) {
      Alert.alert("Error", "Please select a month before proceeding.");
      return;
    }

    if (selectedItems.some((selected) => selected._id === item._id)) {
      Alert.alert("Error", "Duplicate selection is not allowed.");
      return;
    }

    if (selectedItems.length >= 10) {
      Alert.alert("Limit Reached", "You can select a maximum of 10 items.");
      return;
    }

    setSelectedItems([...selectedItems, { ...item, cease_sip_months: month, auto_trxn_no: item.sipReports.AUTO_TRXN_NO }]);
  };

  // Check if an item is selected
  const isItemSelected = (id) => selectedItems.some((item) => item._id === id);

  const handleRemoveItem = (id) => {
    console.log('remove', id);
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.filter((item) => item._id !== id)
    );
  
    setSelectedMonths((prevSelectedMonths) => {
      const updatedMonths = { ...prevSelectedMonths };
      delete updatedMonths[id]; // Remove the month selection for the given ID
      return updatedMonths;
    });
  };
  
  const CeaseSipCheckout = () => {
    console.log("Selected Items:", selectedItems);
    console.log("User", user);
    let params = {
      "service_request": {
          "appln_id": "",
          "password": "",
          "broker_code": "",
          "iin": "",
          "trxn_no": "",
          "cease_req_date": "",
          "initiated_by": "",
          "nigo_remarks": "",
          "ceasetrxn_type": "",
          "trxn_initiator": "",
          "application_no": "", 
          "cancellation_reason_code": ""
      }
    };
    console.log("params=", params);
    ceaseSipEntry(params, token);
  };

  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => props.navigation.navigate("dashboard")}
            style={{ marginTop: 20 }}
          >
            <AntDesign name={"arrowleft"} size={30} color={Colors.RED} />
          </TouchableOpacity>
        }
        rightComponent={
          <View style={{ marginTop: 0 }}>
            <Cart
              nav={() => {
                props.navigation.navigate("TopRatedList", {
                  fromScreen: "Switch",
                });
              }}
            />
          </View>
        }
        backgroundColor={Colors.LIGHT_WHITE}
        containerStyle={styles.header}
        centerComponent={
          <Image
            source={require("../../../assets/icon.png")}
            style={styles.logimg}
          />
        }
      />
      <ScrollView style={styles.containerScroll}>
        <View style={styles.switch_sec}>
          <Text style={styles.transaction}>Cease Sip</Text>
        </View>
        {/* <View>
          {ceaseSip.data.map((item) => 
            <View style={styles.listStyle} key={item._id}>
              <Text style={{ color: 'red' }}>{item.sipReports.LONG_NAME}</Text>
              <Text>{item.sipReports.FROMSCHEME}</Text>
              <Text>FOLIONO: {item.sipReports.FOLIONO}</Text>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                <Picker
                  selectedValue={selectedMonths[item._id] || ""}
                  onValueChange={(value) => handleMonthChange(value, item._id)}
                  style={{ flex: 1, height: 20, marginRight: 30 }}
                >
                  <Picker.Item label="Select Month" value="" />
                  {monthList.map((month) => (
                    <Picker.Item key={month.value} label={month.label} value={month.value} />
                  ))}
                </Picker>

                {isItemSelected(item._id) ? (
                  <TouchableOpacity
                    onPress={() => handleRemoveItem(item._id)}
                    style={styles.botton_box2}
                  >
                    <Text style={styles.add}>Remove</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => handleSelectItem(item)}
                    style={styles.botton_box2}
                  >
                    <Text style={styles.add}>Add</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        </View> */}
      </ScrollView>
      <TouchableOpacity
        onPress={() => CeaseSipCheckout()}
        style={styles.botton_box2}
      >
        <Text style={styles.proceed}>PROCEED</Text>
      </TouchableOpacity>
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
  switch_sec: {
    backgroundColor: Colors.RED,
  },
  transaction: {
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: Colors.WHITE,
  },
  tab_sec: {
    flexDirection: "row",
  },
  tab1: {
    width: "50%",
    alignItems: "center",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.WHITE,
  },
  tab2: {
    width: "50%",
    alignItems: "center",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.RED,
  },
  switch: {
    color: Colors.WHITE,
    fontSize: 13,
  },
  switchAct: {
    color: Colors.GREY_1,
    fontSize: 13,
  },
  fund_sec: {
    backgroundColor: Colors.WHITE,
    marginHorizontal: 15,
    marginTop: 10,
  },
  axis_sec: {
    backgroundColor: "#838793",
  },
  axis: {
    fontSize: 16,
    color: Colors.WHITE,
    marginLeft: 10,
    marginVertical: 10,
  },
  growth_sec: {
    padding: 10,
  },
  axis_treasury: {
    fontSize: 13,
    marginBottom: 10,
  },
  value_sec: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  folio: {
    fontSize: 15,
    color: Colors.DEEP_GRAY,
  },
  scheme_sec: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  select: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.DEEP_GRAY,
  },
  units_sec: {
    flexDirection: "row",
    width: "50%",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  amount: {
    fontSize: 12,
    color: Colors.DEEP_GRAY,
  },
  input_box: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  inputsec: {
    borderBottomWidth: 1,
    borderColor: Colors.DEEP_GRAY,
    width: "60%",
    fontSize: 16,
  },
  botton_box: {
    width: "30%",
    backgroundColor: Colors.RED,
    paddingVertical: 10,
  },
  get_otp: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  disabledBox: {
    width: "30%",
    backgroundColor: Colors.LIGHT_RED1,
    paddingVertical: 10,
  },
  disabled: {
    color: Colors.GRAY_LIGHT,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  botton_box1: {
    backgroundColor: Colors.RED,
    paddingVertical: 10,
    marginVertical: 20,
    marginHorizontal: 15,
  },
  botton_box2: {
    backgroundColor: Colors.RED,
    paddingVertical: 10,
    marginVertical: 20,
    marginHorizontal: 15,
  },
  add: {
    color: Colors.WHITE,
    fontSize: 16,
    textAlign: "center",
    width: 100
  },
  proceed: {
    color: Colors.WHITE,
    fontSize: 16,
    textAlign: "center",
  },
  listStyle: {
    backgroundColor: Colors.WHITE, // Background color of the list
    marginVertical: 5,             // Space between list items vertically
    marginHorizontal: 10,          // Space between list items horizontally
    padding: 10,                   // Inner padding for better spacing
    borderWidth: 1,                // Border thickness
    borderColor: 'black',          // Border color
    borderRadius: 5,               // Rounded corners
    shadowColor: '#000',           // Shadow color for a 3D effect
    shadowOffset: { width: 0, height: 2 }, // Shadow direction
    shadowOpacity: 0.2,            // Shadow transparency
    shadowRadius: 3,               // Shadow spread
    elevation: 2,                  // For shadow on Android
  },
  
});

const mapStateToProps = (state) => ({
  token: state.auth.token,
  ceaseSip: state.ceaseSip.sipList,
  user: state.auth.user,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { CeaseSipRedux } = require("../../store/CeaseSipRedux");
  return {
    ...stateProps,
    ...ownProps,
    getSipDetail: (params, token) => {
      CeaseSipRedux.getSipDetail(dispatch, params, token);
    },
    ceaseSipEntry:(params, token) => {
      CeaseSipRedux.ceaseSipEntry(dispatch, params, token);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CeaseSIP);