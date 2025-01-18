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
import Button from "../../components/Atom/Button/Button";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { TextInput } from "react-native-gesture-handler";

function CeaseSIP(props) {
  const { token, user, getSipDetail, ceaseSip, isFetching, ceaseMaster, ceaseMasterLists, ceaseSipEntry } = props;
  const [camsList, setCamsList] = useState([]);
  const [karvyList, setKarvyList] = useState([]);
  const [reasons, setReasons] = useState({});
  const [reasonsText, setReasonsText] = useState('');

  useEffect(() => {
    getSipDetail(user.pan, token);
    ceaseMaster(token);
  }, []);

  useEffect(() => {
    processCeaseMasterData(ceaseMasterLists);
  }, [ceaseMasterLists]);

  const processCeaseMasterData = (data) => {
    const cams = [];
    const karvy = [];

    data.forEach((item) => {
      if (item.REGISTRAR_ID === "CAMS") {
        cams.push(item);
      } else if (item.REGISTRAR_ID === "KARVY") {
        karvy.push(item);
      }
    });

    setCamsList(cams);
    setKarvyList(karvy);
  };

  const handleReasonChange = (schemeId, reasonCode) => {
    setReasons((prev) => ({
      ...prev,
      [schemeId]: reasonCode,
    }));
  };

  const handleReasonInput = (schemeId, reasonText) => {
    setReasonsText((prev) => ({
      ...prev,
      [schemeId]: reasonText,
    }));
  };

  const CeaseSipCheckout = (item) => {
    const reasonCode = reasons[item._id];
    const reasonsTextVal = reasonsText[item._id];
    if (!reasonCode) {
      Alert.alert("Error", "Please select a reason before proceeding.");
      return;
    }

    if((reasonCode === "SC13" || reasonCode === "13")) {
      if (!reasonsTextVal) {
        Alert.alert("Error", "Please Enter reason before proceeding.");
        return;
      }
    }

    const formatDate = (date) => {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const day = String(date.getDate()).padStart(2, '0');
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };
  
    const todayDate = formatDate(new Date());
  
    const params = {
      service_request: {
        appln_id: "",
        password: "",
        broker_code: "",
        iin: item.iin,
        trxn_no: item.sipReports.AUTO_TRXN_NO,
        cease_req_date: todayDate,
        initiated_by: "I",
        nigo_remarks: (reasonCode === "SC13" || reasonCode === "13") ? reasonsTextVal : "",
        ceasetrxn_type: item.sipReports.AUTO_TRXN_TYPE,
        trxn_initiator: "O",
        application_no: item.sipReports.APPLICATION_NO ? item.sipReports.APPLICATION_NO : "",
        cancellation_reason_code: reasonCode,
      },
    };
  
    //console.log("params=", params);
    ceaseSipEntry(params, token, setReasons, setReasonsText);
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
        <View>
          {ceaseSip.data.map((item) => 
            <View style={styles.listStyle} key={item._id}>
              <Text style={{ color: 'red' }}>{item.sipReports.LONG_NAME}</Text>
              <Text>{item.sipReports.FROMSCHEME}</Text>
              <Text>FOLIONO: {item.sipReports.FOLIONO}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
              <Picker
                selectedValue={reasons[item._id] || ""}
                style={{ flex: 1, height: 20, marginRight: 30 }}
                onValueChange={(value) => handleReasonChange(item._id, value)} 
              >
                <Picker.Item label="Select Reason" value="" disabled />
                {(item.sipReports.source === "CAMS" ? camsList : karvyList).map((source) => (
                  <Picker.Item key={source.REASON_CODE} value={source.REASON_CODE} label={source.REASON_DETAIL} />
                ))}
              </Picker>
              </View>
              {(reasons[item._id] === "SC13" || reasons[item._id] === "13") ?
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                  <TextInput
                    style={{
                      flex: 1,
                      height: 40,
                      borderColor: 'gray',
                      borderWidth: 1,
                      paddingHorizontal: 10,
                      borderRadius: 5,
                    }}
                    maxLength={1000}
                    minLength={20}
                    multiline={true}
                    placeholder="Enter your Reason"
                    placeholderTextColor="gray"
                    value={reasonsText[item._id] || ""}
                    onChange={(event) => handleReasonInput(item._id, event.nativeEvent.text)} // Access text here
                  />
                </View>
                : null }
              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                <Button
                  isLoading={isFetching}
                  fontSize={responsiveFontSize(2.1)}
                  textColor={"#FFF"}
                  onPress={() => CeaseSipCheckout(item)}
                  backgroundColor={Colors.RED}
                  text="Cease SIP"
                  borderRadius={1}
                  borderColor={Colors.RED}
                  borderWidth={1}
                  height={responsiveHeight(5)}
                  width={responsiveWidth(90)}
                  loaderColor="white"
                />
              </View>
            </View>
          )}
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
  isFetching: state.pauseSip.isFetching,
  ceaseSip: state.ceaseSip.sipList,
  ceaseMasterLists: state.ceaseSip.ceaseMasterLists,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => {
  const { CeaseSipRedux } = require("../../store/CeaseSipRedux");
  return {
    getSipDetail: (params, token) => {
      CeaseSipRedux.getSipDetail(dispatch, params, token);
    },
    ceaseMaster: (token) => {
      CeaseSipRedux.ceaseMaster(dispatch, token);
    },
    ceaseSipEntry: (params, token, setReasons, setReasonsText) => {
      CeaseSipRedux.ceaseSipEntry(dispatch, params, token, setReasons, setReasonsText);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CeaseSIP);