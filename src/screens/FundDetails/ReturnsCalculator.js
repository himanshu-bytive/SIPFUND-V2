import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  Button,
  ScrollView,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import { Styles, Config, Colors, FormValidate, Utility } from "../../common";
import { MySlider } from "../../components";
import {
  Ionicons,
  AntDesign,
  MaterialIcons,
  Feather,
  Entypo,
  FontAwesome,
  FontAwesome5,
} from "react-native-vector-icons";
import {
  Image,
  Header,
  ListItem,
  Overlay,
  Slider,
} from "react-native-elements";

function ReturnsCalculator(props) {
  const [selectTab, setSelectTab] = useState("SIP");
  const toggleTab = (value) => {
    setSelectTab(value);
  };
  const { detailsInfo } = props;
  const [amount, setAmount] = useState(4000);
  const [annum, setAnnum] = useState(0);
  const [year, setYear] = useState(1);
  const [values, setValues] = useState(0);

  useEffect(() => {
    let detailedPortFolio = detailsInfo ? detailsInfo[0].api : {};
    let years1 = detailedPortFolio["DP-Return1Yr"]
      ? Number(detailedPortFolio["DP-Return1Yr"]).toFixed(2)
      : "NA";
    setAnnum(years1);
  }, [detailsInfo]);

  useEffect(() => {
    let detailedPortFolio = detailsInfo ? detailsInfo[0].api : {};
    let years1 = detailedPortFolio["DP-Return1Yr"]
      ? Number(detailedPortFolio["DP-Return1Yr"]).toFixed(2)
      : "NA";
    let years3 = detailedPortFolio["DP-Return3Yr"]
      ? Number(detailedPortFolio["DP-Return3Yr"]).toFixed(2)
      : "NA";
    let years5 = detailedPortFolio["DP-Return5Yr"]
      ? Number(detailedPortFolio["DP-Return5Yr"]).toFixed(2)
      : "NA";
    if (year === 1) {
      setAnnum(years1);
    }
    if (year === 3) {
      setAnnum(years3);
    }
    if (year === 5) {
      setAnnum(years5);
    }
  }, [year]);

  useEffect(() => {
    if (selectTab && amount && year && annum) {
      let data = Utility.calculateReturnAmount(selectTab, amount, year, annum);
      setValues(data.toFixed(0));
    }
  }, [selectTab]);

  useEffect(() => {
    if (selectTab && amount && year && annum) {
      let data = Utility.calculateReturnAmount(selectTab, amount, year, annum);
      setValues(data.toFixed(0));
    }
  }, [amount]);

  useEffect(() => {
    if (selectTab && amount && year && annum) {
      let data = Utility.calculateReturnAmount(selectTab, amount, year, annum);
      setValues(data.toFixed(0));
    }
  }, [annum]);

  return (
    <View style={styles.mainbox}>
      <Text style={styles.check}>
        Check if you would have invested in the past.
      </Text>
      <View style={styles.click_sec}>
        <TouchableOpacity
          onPress={() => toggleTab("SIP")}
          style={
            selectTab == "SIP" ? styles.buttom_botton2 : styles.buttom_botton
          }
        >
          <Text style={selectTab == "SIP" ? styles.sip_text2 : styles.sip_text}>
            SIP
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleTab("LUMPSUM")}
          style={
            selectTab == "LUMPSUM"
              ? styles.buttom_botton2
              : styles.buttom_botton
          }
        >
          <Text
            style={selectTab == "LUMPSUM" ? styles.sip_text2 : styles.sip_text}
          >
            Lumpsum
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <MySlider
          value={Number(amount)}
          change={(amount) => setAmount(amount.toFixed(0))}
          min={"1000"}
          max={"100000"}
        />
      </View>
      <View style={styles.amount_box}>
        <Text style={styles.amount}>
          {selectTab == "SIP" ? "Amount Per Month" : "Amount"}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            position: "absolute",
            right: 0,
          }}
        >
          <Text style={styles.childtext2}>₹</Text>
          <TextInput
            style={[
              styles.childtext2,
              {
                borderWidth: 1,
                marginLeft: 3,
                height: 31,
                padding: 5,
                borderRadius: 5,
                textAlign: "center",
              },
            ]}
            onChangeText={(val) => setAmount(val)}
            value={amount.toString()}
            keyboardType={"numeric"}
          />
        </View>
      </View>
      <View style={styles.back_sec}>
        <TouchableOpacity onPress={() => setYear(1)} style={styles.back1}>
          <Text style={year === 1 ? styles.back_year : styles.back_year2}>
            1Y Back
          </Text>
          <View
            style={year === 1 ? styles.back_year_text : styles.back_year_text2}
          ></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setYear(3)} style={styles.back1}>
          <Text style={year === 3 ? styles.back_year : styles.back_year2}>
            3Y Back
          </Text>
          <View
            style={year === 3 ? styles.back_year_text : styles.back_year_text2}
          ></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setYear(5)} style={styles.back1}>
          <Text style={year === 5 ? styles.back_year : styles.back_year2}>
            5Y Back
          </Text>
          <View
            style={year === 5 ? styles.back_year_text : styles.back_year_text2}
          ></View>
        </TouchableOpacity>
      </View>
      <Text style={styles.rs}> ₹ {isNaN(values) ? "?" : values}</Text>
      <Text style={styles.with}>With {annum}% returns per annum</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainbox: {
    borderWidth: 1,
    borderColor: Colors.GRAY_LIGHT,
    borderRadius: 20,
    padding: 10,
  },
  check: {
    fontSize: 15,
    marginTop: 10,
  },
  click_box: {
    flexDirection: "row",
  },
  amount_box: {
    flexDirection: "row",
    marginVertical: 10,
  },
  amount: {
    fontSize: 18,
  },
  price: {
    fontSize: 18,
    color: Colors.RED,
    position: "absolute",
    right: 0,
  },
  back_sec: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  back_year: {
    fontSize: 18,
    color: Colors.RED,
  },
  back_year2: {
    fontSize: 18,
    color: Colors.BLACK,
  },
  back_year_text: {
    borderWidth: 1,
    borderColor: Colors.RED,
    marginTop: 5,
  },
  back_year_text2: {
    borderWidth: 1,
    borderColor: Colors.DEEP_GRAY,
    marginTop: 5,
  },
  rs: {
    fontSize: 20,
    color: Colors.RED,
    marginTop: 10,
  },

  with: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 20,
  },

  click_sec: {
    flexDirection: "row",
    padding: 20,
  },
  buttom_botton: {
    width: "50%",
    borderWidth: 1,
    borderColor: Colors.RED,
    borderRadius: 5,
    marginHorizontal: 2,
    alignItems: "center",
  },
  buttom_botton2: {
    width: "50%",
    borderRadius: 5,
    backgroundColor: Colors.RED,
    marginHorizontal: 2,
    alignItems: "center",
  },
  sip_text: {
    fontSize: 20,
    color: Colors.RED,
    fontWeight: "bold",
    paddingVertical: 7,
  },
  sip_text2: {
    fontSize: 20,
    color: Colors.WHITE,
    fontWeight: "bold",
    paddingVertical: 7,
  },
});

const mapStateToProps = (state) => ({
  token: state.auth.token,
  users: state.auth.user,
  detailsInfo: state.fundDetail.detailsInfo,
});
export default connect(mapStateToProps)(ReturnsCalculator);
