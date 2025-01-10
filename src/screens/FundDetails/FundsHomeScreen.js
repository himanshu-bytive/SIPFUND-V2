/** @format */

import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  Button,
  ScrollView,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
  BackHandler,
} from "react-native";
import moment from "moment";
import { connect } from "react-redux";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { Styles, Config, Colors, FormValidate, Utility } from "../../common";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';

import { Image, Header, CheckBox } from "react-native-elements";
import { VictoryChartCode } from "../../components";
import FundDetailScreen from "./FundDetailScreen";
import Cart from "../../components/Cart";

const rupees = [
  { text: "1M", value: null },
  { text: "1Y", value: 1 },
  { text: "2Y", value: 2 },
  { text: "3Y", value: 3 },
  { text: "4Y", value: 4 },
  { text: "5Y", value: 5 },
  { text: "6Y", value: 6 },
  { text: "ALL", value: 10 },
];

function FundsHomeScreen(props) {
  const {
    token,
    users,
    fetchFunds,
    funds,
    fundChartList,
    fundDetail,
    fundDetailsList,
    detailsMap,
    detailsInfo,
  } = props;
  const [selectTab, setSelectTab] = useState("3Y");
  const [assets, setAssets] = useState(0);
  const [invest, setInvest] = useState(0);
  const [category, setCategory] = useState(0);
  const [navPercentage, setNavPercentage] = useState(0);
  const [labels, setLabels] = useState(["", "", "", ""]);
  const [datasets, setDatasets] = useState([0, 0, 0, 0]);
  console.log(
    "🚀 ~ file: FundsHomeScreen.js:68 ~ FundsHomeScreen ~ datasets:",
    datasets
  );
  const [inception, setInception] = useState(0);

  const refreshFunds = (value) => {
    let date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth(),
      d = date.getDate();
    //let firstDay = new Date(y, m, 1);
    //let lastDay = new Date(y, m, 0);
    let firstDay;
    let lastDay;
    if (value === "1M") {
      (date = new Date()), (y = date.getFullYear()), (m = date.getMonth());
      firstDay = new Date(y, m - 1, d);
      lastDay = new Date(y, m, d);
    } else {
      let year = rupees.find((x) => x.text == value);
      //(date = new Date()), (y = date.getFullYear());
      firstDay = new Date(y - year?.value, m, d);
      lastDay = new Date(y, m, d);
    }
    //setLabels(Utility.getDatesBetweenDates(firstDay, lastDay));
    fundChartList(
      {
        ISIN:
          props.route.params?.fromScreen == "TopRatedList"
            ? fundDetail?.productISIN
            : fundDetail?.isin,
        from: moment(firstDay).format("YYYY-MM-DD"),
        to: moment(lastDay).format("YYYY-MM-DD"),
      },
      token
    );
  };

  const toggleTab = (value) => {
    refreshFunds(value);
    setSelectTab(value);
  };

  useEffect(() => {
    if (users) {
      let date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth(),
        d = date.getDate();
      let firstDay = new Date(y, m - 1, d);
      let lastDay = new Date(y, m, d);
      //setLabels(Utility.getDatesBetweenDates(firstDay, lastDay));
      fundChartList(
        {
          ISIN:
            props.route.params?.fromScreen == "TopRatedList"
              ? fundDetail?.productISIN
              : fundDetail?.isin,
          from: moment(firstDay).format("YYYY-MM-DD"),
          to: moment(lastDay).format("YYYY-MM-DD"),
        },
        token
      );
    }
  }, [users]);

  useEffect(() => {
    if (token) {
      fundDetailsList(
        {
          ISIN:
            props.route.params?.fromScreen == "TopRatedList"
              ? fundDetail?.productISIN
              : fundDetail?.isin,
        },
        token
      );
      refreshFunds(selectTab);
    }
  }, [token, fundDetail]);

  useEffect(() => {
    if (detailsInfo) {
      let detailedPortFolio = detailsInfo ? detailsInfo[0].api : {};
      let navPercentage = detailedPortFolio["DP-NAVChangePercentage"]
        ? Number(detailedPortFolio["DP-NAVChangePercentage"]).toFixed(2)
        : 0;
      let assets = detailedPortFolio["PSRP-TotalMarketValueNet"]
        ? Number(detailedPortFolio["PSRP-TotalMarketValueNet"]).toFixed(2)
        : 0;
      let invest = detailedPortFolio["PI-MinimumInitial"]
        ? Number(detailedPortFolio["PI-MinimumInitial"]).toFixed(2)
        : 0;
      let category = detailedPortFolio["DP-CategoryName"]
        ? detailedPortFolio["DP-CategoryName"]
        : "";
      setInception(
        Number(detailsInfo[0].api["DP-ReturnSinceInception"]).toFixed(2)
      );
      setNavPercentage(navPercentage);
      setAssets(assets);
      setInvest(invest);
      setCategory(category);
    }
  }, [detailsInfo]);

  // if(detailsInfo){
  //   console.log(detailsInfo[0]);
  // }

  useEffect(() => {
    calculateMap();
  }, [detailsMap]);

  useEffect(() => {
    calculateMap();
    if (selectTab && detailsInfo) {
      switch (selectTab) {
        case "1M":
          setInception(Number(detailsInfo[0].api["DP-Return1Mth"]).toFixed(2));
          break;
        case "1Y":
          setInception(Number(detailsInfo[0].api["DP-Return1Yr"]).toFixed(2));
          break;
        case "2Y":
          setInception(Number(detailsInfo[0].api["DP-Return2Yr"]).toFixed(2));
          break;
        case "3Y":
          setInception(Number(detailsInfo[0].api["DP-Return3Yr"]).toFixed(2));
          break;
        case "4Y":
          setInception(Number(detailsInfo[0].api["DP-Return4Yr"]).toFixed(2));
          break;
        case "5Y":
          setInception(Number(detailsInfo[0].api["DP-Return5Yr"]).toFixed(2));
          break;
        case "6Y":
          setInception(Number(detailsInfo[0].api["DP-Return6Yr"]).toFixed(2));
          break;
        default:
          setInception(
            Number(detailsInfo[0].api["DP-ReturnSinceInception"]).toFixed(2)
          );
      }
    }
  }, [selectTab]);

  useEffect(() => {
    const backAction = () => {
      props.navigation.navigate(props.route.params?.fromScreen);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const calculateMap = () => {
    //let labs = {};
    //for (let item of labels) {
    //labs[item] = 0;
    //}
    //let data = {};
    //if (detailsMap) {
    //for (let lab in labs) {
    //for (let item of detailsMap) {
    //if (new Date(lab).getTime() > new Date(item.d).getTime()) {
    //data[lab] = item.v;
    //}
    //}
    //}
    //}
    //let datasets = [];
    //for (let key of labels) {
    //datasets.push(data[key] ? Number(data[key]) : 0);
    //}
    if (detailsMap) {
      let label = [];
      let data = [];
      let day;

      for (
        let index = 0;
        index < detailsMap.length;
        index = index + parseInt(detailsMap.length / 4)
      ) {
        day = detailsMap[index].d;
        label = [
          ...label,
          `${day.split("-")[1]}/${day.split("-")[0].slice(2)}`,
        ];
        data = [...data, parseFloat(detailsMap[index]?.v)];
      }
      //if (data[data.length - 1] !== parseFloat(detailsMap[detailsMap.length - 1].v)) {
      //data.pop()
      //data = [...data, parseFloat(detailsMap[detailsMap.length - 1].v)]
      //}
      console.log(
        " label[label.length - 1] =>",
        label?.[label.length - 1],
        data
      );
      if (
        label?.[label.length - 1] &&
        detailsMap.length &&
        label?.[label.length - 1] !==
        `${detailsMap?.[detailsMap.length - 1]?.d.split("-")[1]
        }/${detailsMap?.[detailsMap.length - 1]?.d.split("-")[0].slice(2)}`
      ) {
        label.push(
          `${detailsMap[detailsMap.length - 1].d.split("-")[1]}/${detailsMap[
            detailsMap.length - 1
          ].d
            .split("-")[0]
            .slice(2)}`
        );
        data.push(
          detailsMap?.[detailsMap.length - 1]?.v
            ? parseFloat(detailsMap?.[detailsMap.length - 1]?.v)
            : 0
        );
      }
      setLabels(label);
      console.log(
        "🚀 ~ file: FundsHomeScreen.js:295 ~ calculateMap ~ data:",
        data
      );
      setDatasets(() => {
        if (data.length) {
          return data;
        } else {
          return [0, 0, 0, 0];
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate(
                props.route.params?.fromScreen
              )
            }
            style={{ marginTop: 20 }}
          >
            <AntDesign name={"arrowleft"} size={30} color={Colors.RED} />
          </TouchableOpacity>
        }
        containerStyle={styles.header}
        backgroundColor={Colors.LIGHT_WHITE}
        centerComponent={
          <Image
            source={require("../../../assets/icon.png")}
            style={styles.logimg}
          />
        }
        rightComponent={
          <View style={{ marginTop: 0 }}>
            <Cart
              nav={() => {
                props.navigation.navigate("TopRatedFunds", { screen: "TopRatedList" });
              }}
            />
          </View>
        }
      />
      <ScrollView style={styles.containerScroll}>
        <View style={styles.management_company}>
          <View style={styles.axis}>
            <Image
              source={{
                uri: fundDetail?.imagePath
                  ? fundDetail?.imagePath
                  : fundDetail?.image_path,
              }}
              style={styles.axis_img}
            />
            <View style={{ marginHorizontal: 10, flex: 1 }}>
              <Text numberOfLines={2} style={styles.axis_asset}>
                {fundDetail?.name ? fundDetail?.name : fundDetail?.product_name}
              </Text>
              {/*<Text style={styles.midcap}>{fundDetail?.productCode}</Text>*/}
            </View>
          </View>
        </View>

        <View style={{ padding: 20 }}>
          <View style={styles.fund_returns}>
            <Text style={styles.fund}>Fund Returns</Text>
            <View style={styles.since_inception}>
              <Text style={styles.number}>{inception}%</Text>
              <Text style={styles.since}>
                {selectTab
                  .replace("Y", " Years")
                  .replace("M", " Month")
                  .replace("ALL", "Since Inception")}
              </Text>
            </View>
          </View>
          <LineChart
            data={{
              labels: labels,
              datasets: [{ data: datasets }],
            }}
            width={Dimensions.get("window").width - 40} // from react-native
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: "transparent",
              backgroundGradientFrom: "#F9F9F9",
              backgroundGradientTo: "#F9F9F9",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `#000`,
              labelColor: (opacity = 1) => `#000`,
              style: {
                borderRadius: 0,
                backgroundColor: "transparent",
              },
              propsForDots: {
                r: "4",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
          {/* <VictoryChartCode data={mapData} /> */}
          <View
            style={{ borderWidth: 1, borderColor: Colors.DEEP_GRAY }}
          ></View>
          {/* imges_sec */}
          <View style={styles.footer_sec}>
            {rupees.map((item, key) => (
              <TouchableOpacity
                onPress={() => toggleTab(item.text)}
                key={key}
                style={styles.rupees_sec}
              >
                <Image
                  source={
                    selectTab == item.text
                      ? require("../../../assets/layer_img2.png")
                      : require("../../../assets/layer_img.png")
                  }
                  style={styles.rupees}
                />
                <Text style={styles.rupees_text}>{item.text}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Min Investment_sec */}
          <View style={styles.investment_sec}>
            <View style={styles.investment}>
              <Text numberOfLines={1} style={styles.price}>
                ₹{(parseInt(assets) / 10000000).toFixed(0)} Cr
              </Text>
              <Text style={styles.min}>Total Assets</Text>
            </View>
            <View style={styles.investment}>
              <Text numberOfLines={1} style={styles.price}>
                ₹{parseInt(invest).toFixed(0)}
              </Text>
              <Text style={styles.min}>Min. Invest</Text>
            </View>
            <View style={styles.investment}>
              <Text numberOfLines={2} style={styles.price}>
                {category}
              </Text>
              <Text style={styles.min}>Category</Text>
            </View>
          </View>
        </View>
        <FundDetailScreen
          fromScreen={props.route.params?.fromScreen}
          goBack={() =>
            props.navigation.navigate(props.route.params?.fromScreen)
          }
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerScroll: {
    width: "100%",
  },
  logimg: {
    height: 65,
    width: 203,
    marginTop: 10,
  },
  header: {
    borderBottomColor: Colors.BLACK,
    borderBottomWidth: 1,
  },
  axis_img: {
    height: 53,
    width: 53,
    resizeMode: "contain",
  },
  management_company: {
    flexDirection: "row",
    backgroundColor: Colors.WHITE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    paddingTop: 20,
    paddingBottom: 20,
  },
  axis: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },

  axis_asset: {
    fontSize: 16,
    color: "black"
  },
  midcap: {
    fontSize: 13,
    color: Colors.DEEP_GRAY,
  },

  fund_returns: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  fund: {
    fontSize: 15,
    color: "black"
  },
  number: {
    fontSize: 15,
    textAlign: "right",
    color: Colors.RED,
    fontWeight: "bold",
  },
  since: {
    fontSize: 12,
    color: "black"
  },
  linechartimg: {
    height: 179,
    width: 378,
    marginTop: 20,
    marginBottom: 20,
  },
  img_sec: {
    flexDirection: "row",
  },

  layer_img: {
    height: 36,
    width: 40,
    marginHorizontal: 18,
    marginVertical: 15,
  },
  time_sec: {
    flexDirection: "row",
  },
  year: {
    fontSize: 12,
    marginHorizontal: 30,
  },
  year1: {
    color: Colors.RED,
    marginLeft: 33,
    fontSize: 12,
  },

  investment_sec: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  investment: {
    maxWidth: "33%",
    alignItems: "center",
  },
  price: {
    color: Colors.RED,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  min: {
    fontSize: 15,
    color: "black"
  },
  private_sector: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 5,
  },
  private: {
    fontSize: 25,
    width: "87%",
    marginBottom: 2,
    marginLeft: 10,
    fontWeight: "bold",
    color: Colors.RED,
  },
  footer_sec: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 30,
    justifyContent: "space-between",
  },
  rupees: {
    width: 30,
    height: 30,
  },
  rupees_sec: { alignItems: "center" },
  rupees_text: { fontSize: 12, color: "black" },
});

const mapStateToProps = (state) => ({
  token: state.auth.token,
  users: state.auth.user,
  funds: state.addmorefunds.funds,
  fundDetail: state.fundDetail.details,
  detailsMap: state.fundDetail.detailsMap,
  detailsInfo: state.fundDetail.detailsInfo,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { AddMoreFundsActions } = require("../../store/AddMoreFundsRedux");
  const { FundDetailActions } = require("../../store/FundDetailRedux");
  return {
    ...stateProps,
    ...ownProps,
    fetchFunds: (params, token) => {
      AddMoreFundsActions.fetchFunds(dispatch, params, token);
    },
    fundChartList: (params, token) => {
      FundDetailActions.fundChartList(dispatch, params, token);
    },
    fundDetailsList: (params, token) => {
      FundDetailActions.fundDetailsList(dispatch, params, token);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(FundsHomeScreen);
