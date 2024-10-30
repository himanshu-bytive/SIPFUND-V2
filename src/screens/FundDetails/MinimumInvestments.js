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
import {
  Image,
  Header,
  ListItem,
  Overlay,
  Slider,
} from "react-native-elements";

function MinimumInvestments(props) {
  const { detailsInfo } = props;
  const [assets, setAssets] = useState(0);
  const [invest, setInvest] = useState(0);
  const [category, setCategory] = useState(0);

  useEffect(() => {
    let detailedPortFolio = detailsInfo ? detailsInfo[0].api : {};
    let assets = detailedPortFolio["PSRP-TotalMarketValueNet"]
      ? Number(detailedPortFolio["PSRP-TotalMarketValueNet"]).toFixed(2)
      : 0;
    let invest = detailedPortFolio["PI-MinimumInitial"]
      ? Number(detailedPortFolio["PI-MinimumInitial"]).toFixed(2)
      : 0;
    let category = detailedPortFolio["DP-CategoryName"]
      ? detailedPortFolio["DP-CategoryName"]
      : "";
    setAssets(assets);
    setInvest(invest);
    setCategory(category);
  }, [detailsInfo]);

  return (
    <View style={styles.minimum}>
      <View style={styles.detailsSection}>
        <Text numberOfLines={2} style={styles.mini_tex}>
          ₹{`${(parseInt(assets) / 10000000).toFixed(2)} Cr`}
        </Text>
        <Text style={styles.minimum_tex}>Total Assets</Text>
      </View>
      <View>
        <Text numberOfLines={1} style={styles.mini_tex}>
          ₹{parseInt(invest).toFixed(0)}
        </Text>
        <Text style={styles.minimum_tex}>Min. Invest</Text>
      </View>
      <View>
        <Text numberOfLines={2} style={styles.mini_tex}>
          {category}
        </Text>
        <Text style={styles.minimum_tex}>Category</Text>
      </View>
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

  bottom_sec: { paddingVertical: 20 },
  holding: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: Colors.RED,
    paddingVertical: 5,
  },
  holding_text: {
    fontSize: 20,
    color: Colors.RED,
  },
  holding_icon: {
    position: "absolute",
    right: 0,
    marginTop: 5,
  },
  submit: {
    backgroundColor: Colors.LIGHT_RED,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 120,
  },
  submit_text: {
    fontSize: 25,
    color: Colors.WHITE,
    paddingVertical: 10,
  },
  name_sec: {
    flexDirection: "row",
    paddingVertical: 5,
  },
  name: { fontSize: 15 },
  name_text: {
    color: Colors.RED,
    fontSize: 15,
  },
  name_right: {
    alignItems: "flex-end",
    width: "50%",
  },
  name_left: {
    width: "50%",
  },
  nametop: { paddingVertical: 5 },
  minimum: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  mini_tex: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
  },
  minimum_tex: {
    fontSize: 12,
    textAlign: "center",
    paddingVertical: 5,
  },
  detailsSection: {
    maxWidth: "30%",
  },
});

const mapStateToProps = (state) => ({
  token: state.auth.token,
  users: state.auth.user,
  detailsInfo: state.fundDetail.detailsInfo,
});
export default connect(mapStateToProps)(MinimumInvestments);
