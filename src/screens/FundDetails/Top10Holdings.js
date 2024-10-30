/** @format */

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
import { DataTable } from "react-native-paper";
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

function Top10Holdings(props) {
  const { detailsInfo } = props;
  const [topHoldings, setTopHoldings] = useState([]);
  const [totalWeight, setTotalWeight] = useState(0);

  useEffect(() => {
    let detailedPortFolio = detailsInfo
      ? detailsInfo[0].api["FHV2-HoldingDetail"]
      : [];
    let topHoldings = [];
    let totalWeight = 0;
    for (let i = 0; i < 5; i++) {
      totalWeight += parseFloat(
        detailedPortFolio?.length > 0 ? detailedPortFolio[i].Weighting : 0
      );
      topHoldings.push(detailedPortFolio[i]);
    }
    setTopHoldings(topHoldings);
    setTotalWeight(totalWeight);
  }, [detailsInfo]);

  return (
    <View style={styles.contain_box}>
      <DataTable>
        <View style={{ marginVertical: 8 }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.bodyCell}>Name</Text>
            <Text style={[styles.bodyCellRight]}>Assets%</Text>
          </View>
        </View>

        {topHoldings.map((item, key) => (
          <View style={{ marginVertical: 8 }} key={key}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.bodyCell}>{item?.Name}</Text>
              <Text style={[styles.bodyCellRight]}>
                {Number(item?.Weighting).toFixed(2)}%
              </Text>
            </View>
          </View>
        ))}
      </DataTable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dataTable: {
    //borderWidth: 1,
    borderColor: Colors.DEEP_GRAY,
  },
  dataTablebottom: {
    //borderRightWidth: 1,
    borderColor: Colors.DEEP_GRAY,
  },
  headerbg: {
    //borderBottomWidth: 1,
    borderBottomColor: Colors.DEEP_GRAY,
  },
  headerCell: {
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: Colors.DEEP_GRAY,
    justifyContent: "center",
  },
  bodyCell: {
    //padding: 5,
    //borderRightWidth: 1,
    borderRightColor: Colors.DEEP_GRAY,
    //justifyContent: "center",
  },
  bodyCellRight: {
    color: Colors.RED,
  },
});

const mapStateToProps = (state) => ({
  token: state.auth.token,
  users: state.auth.user,
  detailsInfo: state.fundDetail.detailsInfo,
});

export default connect(mapStateToProps)(Top10Holdings);
