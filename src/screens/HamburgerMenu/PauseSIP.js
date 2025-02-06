import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import { connect } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Header } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import Cart from "../../components/Cart";
import { Colors } from "../../common";
import Button from "../../components/Atom/Button/Button";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

function PauseSIP(props) {
  const { token, user, getSipDetail, pauseSip, pauseSipEntry, isFetching } = props;
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    getSipDetail(user.pan, token);
  }, []);

  useEffect(() => {
    console.log("MODAL", showModal);
    console.log("Mes", message);


  }, [showModal, message]);

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

    setSelectedItems([...selectedItems, { ...item, pause_sip_months: month, auto_trxn_no: item.sipReports.AUTO_TRXN_NO }]);
  };

  // Check if an item is selected
  const isItemSelected = (id) => selectedItems.some((item) => item._id === id);

  const handleRemoveItem = (id) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.filter((item) => item._id !== id)
    );

    setSelectedMonths((prevSelectedMonths) => {
      const updatedMonths = { ...prevSelectedMonths };
      delete updatedMonths[id]; // Remove the month selection for the given ID
      return updatedMonths;
    });
  };

  const PauseSipCheckout = () => {
    let params = {
      "service_request": {
        "appln_id": "",
        "password": "",
        "broker_code": "",
        "iin": user.IIN,
        "trans_count": selectedItems.length
      },
      "childtrans": selectedItems
    };
    pauseSipEntry(params, token, setSelectedMonths, setSelectedItems, setMessage, setShowModal);

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
          <Text style={styles.transaction}>Pause Sip</Text>
        </View>
        <View>
          {isFetching ? (
            // Show loader while data is being fetched
            <View style={styles.loaderContainer}>
              <ActivityIndicator color={Colors.RED} size="large" />
            </View>
          ) : pauseSip?.data?.length > 0 ? (
            // Render list when data is available
            pauseSip.data.map((item) => (
              <View style={styles.listStyle} key={item._id}>
                <Text style={{ color: 'red' }}>{item.sipReports.LONG_NAME}</Text>
                <Text style={{ color: "black" }}>{item.sipReports.FROMSCHEME}</Text>
                <Text style={{ color: "black" }}>FOLIONO: {item.sipReports.FOLIONO}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '60%' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 5,
                    borderWidth: 1,
                    borderColor: "black"
                  }}
                >
                  <Picker
                    selectedValue={selectedMonths[item._id] || ""}
                    onValueChange={(value) => handleMonthChange(value, item._id)}
                    style={{
                      flex: 1,
                      height: 20,
                      marginRight: 30,
                      color: "black",
                      borderWidth: 1,
                      borderColor: "black"
                    }}
                    dropdownIconColor="black"
                  >
                    <Picker.Item label="Select Month" value="" />
                    {monthList.map((month) => (
                      <Picker.Item
                        key={month.value}
                        label={month.label}
                        value={month.value}
                      />
                    ))}
                  </Picker>
                </View>

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
            ))
          ) : (
            // Show message if no data is available
            <Text style={styles.noDataText}>No SIPs available to pause.</Text>
          )}
        </View>
      </ScrollView>
      <Modal
        visible={showModal}
        transparent={true}
        animationType="none"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{message}</Text>
            <Button
              text="OK"
              onPress={() => setShowModal(false)}
              backgroundColor={Colors.RED}
              textColor={Colors.WHITE}
              height={40}
              width={100}
            />
          </View>
        </View>
      </Modal>

      {pauseSip?.data?.length > 0 && <View style={{ marginBottom: 20, alignItems: 'center' }}>
        <Button isLoading={false}
          fontSize={responsiveFontSize(2.3)}
          textColor={"#FFF"}
          onPress={PauseSipCheckout}
          backgroundColor={Colors.RED}
          text="PROCEED"
          borderRadius={5}
          borderColor={Colors.RED}
          borderWidth={1}
          height={responsiveHeight(5)}
          width={responsiveWidth(90)}
          loaderColor="white"
        />
      </View>}
      {/* <TouchableOpacity
        onPress={() => PauseSipCheckout()}
        style={styles.botton_box2}
      >
        <Text style={styles.proceed}>PROCEED</Text>
      </TouchableOpacity> */}
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    fontSize: 18,
    color: Colors.GRAY_LIGHT,
  },
  noDataText: {
    textAlign: 'center',
    color: Colors.BLACK,
    marginVertical: 20,
    fontSize: 16,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    color: "black",
    marginBottom: 20,
    textAlign: "center",
  },

});

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isFetching: state.pauseSip.isFetching,
  pauseSip: state.pauseSip.sipList,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => {
  const { PauseSipRedux } = require("../../store/PauseSipRedux");
  return {
    getSipDetail: (params, token) => {
      PauseSipRedux.getSipDetail(dispatch, params, token);
    },
    pauseSipEntry: (params, token, setSelectedMonths, setSelectedItems, setMessage, setShowModal) => {
      PauseSipRedux.pauseSipEntry(dispatch, params, token, setSelectedMonths, setSelectedItems, setMessage, setShowModal);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PauseSIP);