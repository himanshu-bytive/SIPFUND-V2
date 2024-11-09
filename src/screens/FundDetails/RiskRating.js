/** @format */

import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";
import { DataTable } from "react-native-paper";
import { Colors } from "../../common";
import { Tab, TabView } from "react-native-elements";
import  Feather from "react-native-vector-icons/Feather";

function RiskRating(props) {
  const { detailsInfo } = props;
  const [index, setIndex] = React.useState(0);
  const [index1, setIndex1] = React.useState(0);
  const [mptStats3Yr, setMptStats3Yr] = useState([]);
  const [mptStats5Yr, setMptStats5Yr] = useState([]);
  const [mptStats10Yr, setMptStats10Yr] = useState([]);
  const [volatility3Yr, setVolatility3Yr] = useState([]);
  const [volatility5Yr, setVolatility5Yr] = useState([]);
  const [volatility10Yr, setVolatility10Yr] = useState([]);
  const [upDownCaptureRatio, setUpDownCaptureRatio] = useState([]);

  useEffect(() => {
    let schemeDetail = detailsInfo ? detailsInfo[0].api : {};

    //MPT Statistics start
    // mptStats3Yr
    let mptStats3Yr = [];
    mptStats3Yr.push({
      name: schemeDetail["RMC-IndexName"] || "-",
      category: schemeDetail["DP-CategoryName"] || "-",
      RSquared: schemeDetail["RMC-₹quared3Yr"] || "-",
      beta: schemeDetail["RMC-Beta3Yr"] || "-",
      alpha: schemeDetail["RMC-Alpha3Yr"] || "-",
      treynor: schemeDetail["RMC-TreynorRatio3Yr"] || "-",
      currency: "INR",
    });
    mptStats3Yr.push({
      name: schemeDetail["RMC-CategoryIndexName"] || "-",
      RSquared: schemeDetail["RMC-Category₹quared3Yr"] || "-",
      beta: schemeDetail["RMC-CategoryBeta3Yr"] || "-",
      alpha: schemeDetail["RMC-CategoryAlpha3Yr"] || "-",
      treynor: schemeDetail["RMC-CategoryTreynorRatio3Yr"] || "-",
      currency: "INR",
    });
    setMptStats3Yr(mptStats3Yr);

    // mptStats5Yr
    let mptStats5Yr = [];
    mptStats5Yr.push({
      name: schemeDetail["RMC-IndexName"] || "-",
      category: schemeDetail["DP-CategoryName"] || "-",
      RSquared: schemeDetail["RMC-₹quared5Yr"] || "-",
      beta: schemeDetail["RMC-Beta5Yr"] || "-",
      alpha: schemeDetail["RMC-Alpha5Yr"] || "-",
      treynor: schemeDetail["RMC-TreynorRatio5Yr"] || "-",
      currency: "INR",
    });
    mptStats5Yr.push({
      name: schemeDetail["RMC-CategoryIndexName"] || "-",
      RSquared: schemeDetail["RMC-Category₹quared5Yr"] || "-",
      beta: schemeDetail["RMC-CategoryBeta5Yr"] || "-",
      alpha: schemeDetail["RMC-CategoryAlpha5Yr"] || "-",
      treynor: schemeDetail["RMC-CategoryTreynorRatio5Yr"] || "-",
      currency: "INR",
    });
    setMptStats5Yr(mptStats5Yr);

    // setMptStats10Yr
    let mptStats10Yr = [];
    mptStats10Yr.push({
      name: schemeDetail["RMC-IndexName"] || "-",
      category: schemeDetail["DP-CategoryName"] || "-",
      RSquared: schemeDetail["RMC-₹quared10Yr"] || "-",
      beta: schemeDetail["RMC-Beta10Yr"] || "-",
      alpha: schemeDetail["RMC-Alpha10Yr"] || "-",
      treynor: schemeDetail["RMC-TreynorRatio10Yr"] || "-",
      currency: "INR",
    });
    mptStats10Yr.push({
      name: schemeDetail["RMC-CategoryIndexName"] || "-",
      RSquared: schemeDetail["RMC-Category₹quared10Yr"] || "-",
      beta: schemeDetail["RMC-CategoryBeta10Yr"] || "-",
      alpha: schemeDetail["RMC-CategoryAlpha10Yr"] || "-",
      treynor: schemeDetail["RMC-CategoryTreynorRatio10Yr"] || "-",
      currency: "INR",
    });
    setMptStats10Yr(mptStats10Yr);

    // Volatility measure start
    // volatility3Yr
    let volatility3Yr = [];
    volatility3Yr.push({
      trailing: schemeDetail["FSCBI-FundName"] || "-",
      standard: schemeDetail["RM-StdDev3Yr"] || "-",
      sharpe: schemeDetail["RM-SharpeRatio3Yr"] || "-",
      sortino: schemeDetail["RM-SortinoRatio3Yr"] || "-",
    });
    volatility3Yr.push({
      trailing: schemeDetail["DP-CategoryName"] || "-",
      standard: schemeDetail["RM-CategoryStdDev3Yr"] || "-",
      sharpe: schemeDetail["RM-CategorySharpeRatio3Yr"] || "-",
      sortino: schemeDetail["RM-CategorySortinoRatio3Yr"] || "-",
    });
    setVolatility3Yr(volatility3Yr);

    // volatility5Yr
    let volatility5Yr = [];
    volatility5Yr.push({
      trailing: schemeDetail["FSCBI-FundName"] || "-",
      standard: schemeDetail["RM-StdDev5Yr"] || "-",
      sharpe: schemeDetail["RM-SharpeRatio5Yr"] || "-",
      sortino: schemeDetail["RM-SortinoRatio5Yr"] || "-",
    });
    volatility5Yr.push({
      trailing: schemeDetail["DP-CategoryName"] || "-",
      standard: schemeDetail["RM-CategoryStdDev5Yr"] || "-",
      sharpe: schemeDetail["RM-CategorySharpeRatio5Yr"] || "-",
      sortino: schemeDetail["RM-CategorySortinoRatio5Yr"] || "-",
    });
    setVolatility5Yr(volatility5Yr);

    // volatility10Yr
    let volatility10Yr = [];
    volatility10Yr.push({
      trailing: schemeDetail["FSCBI-FundName"] || "-",
      standard: schemeDetail["RM-StdDev10Yr"] || "-",
      sharpe: schemeDetail["RM-SharpeRatio10Yr"] || "-",
      sortino: schemeDetail["RM-SortinoRatio10Yr"] || "-",
    });
    volatility10Yr.push({
      trailing: schemeDetail["DP-CategoryName"] || "-",
      standard: schemeDetail["RM-CategoryStdDev10Yr"] || "-",
      sharpe: schemeDetail["RM-CategorySharpeRatio10Yr"] || "-",
      sortino: schemeDetail["RM-CategorySortinoRatio10Yr"] || "-",
    });
    setVolatility10Yr(volatility10Yr);

    // UPside Downside Capture Ratio start
    let upDownCaptureRatio = [];
    upDownCaptureRatio.push({
      name: schemeDetail["FSCBI-FundName"] || "-",
      year1: [
        schemeDetail["RMC-CaptureRatioUpside1Yr"] || "-",
        schemeDetail["RMC-CaptureRatioDownside1Yr"] || "-",
      ],
      year3: [
        schemeDetail["RMC-CaptureRatioUpside3Yr"] || "-",
        schemeDetail["RMC-CaptureRatioDownside3Yr"] || "-",
      ],
      year5: [
        schemeDetail["RMC-CaptureRatioUpside5Yr"] || "-",
        schemeDetail["RMC-CaptureRatioDownside5Yr"] || "-",
      ],
      year10: [
        schemeDetail["RMC-CaptureRatioUpside10Yr"] || "-",
        schemeDetail["RMC-CaptureRatioDownside10Yr"] || "-",
      ],
      year15: [
        schemeDetail["RMC-CaptureRatioUpside15Yr"] || "-",
        schemeDetail["RMC-CaptureRatioDownside15Yr"] || "-",
      ],
    });
    upDownCaptureRatio.push({
      name: schemeDetail["DP-CategoryName"] || "-",
      year1: [
        schemeDetail["RMC-CategoryCaptureRatioUpside1Yr"] || "-",
        schemeDetail["RMC-CategoryCaptureRatioDownside1Yr"] || "-",
      ],
      year3: [
        schemeDetail["RMC-CategoryCaptureRatioUpside3Yr"] || "-",
        schemeDetail["RMC-CategoryCaptureRatioDownside3Yr"] || "-",
      ],
      year5: [
        schemeDetail["RMC-CategoryCaptureRatioUpside5Yr"] || "-",
        schemeDetail["RMC-CategoryCaptureRatioDownside5Yr"] || "-",
      ],
      year10: [
        schemeDetail["RMC-CategoryCaptureRatioUpside10Yr"] || "-",
        schemeDetail["RMC-CategoryCaptureRatioDownside10Yr"] || "-",
      ],
      year15: [
        schemeDetail["RMC-CategoryCaptureRatioUpside15Yr"] || "-",
        schemeDetail["RMC-CategoryCaptureRatioDownside15Yr"] || "-",
      ],
    });
    setUpDownCaptureRatio(upDownCaptureRatio);
  }, [detailsInfo]);

  return (
    <View style={styles.mainbox}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 15,
        }}
      >
        {/*<Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "black",
          }}
        >
          Risk Category
        </Text>*/}
        <Text
          style={{
            fontSize: 20,
            color: "black",
            fontWeight: "bold",
          }}
        >
          {detailsInfo?.length > 0
            ? detailsInfo[0]?.api["FSCBI-IndianRiskLevel"]
            : ""}
        </Text>
      </View>
      <Text style={styles.Upside}>MPT Statistics</Text>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: Colors.RED,
          color: "#fff",
          height: 3,
        }}
      >
        <Tab.Item
          title="3 Years"
          titleStyle={{
            fontSize: 15,
            fontWeight: "bold",
            color: index === 0 ? Colors.RED : "#000",
          }}
          buttonStyle={{
            backgroundColor: "#fff",
          }}
        />
        <Tab.Item
          title="5 Years"
          titleStyle={{
            fontSize: 15,
            fontWeight: "bold",
            color: index === 1 ? Colors.RED : "#000",
          }}
          buttonStyle={{
            backgroundColor: "#fff",
          }}
        />
        <Tab.Item
          title="10 Years"
          titleStyle={{
            fontSize: 15,
            fontWeight: "bold",
            color: index === 2 ? Colors.RED : "#000",
          }}
          buttonStyle={{
            backgroundColor: "#fff",
          }}
        />
      </Tab>
      <View style={{ borderWidth: 0.5, borderColor: Colors.DEEP_GRAY }}></View>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ width: "90%" }}>
          <DataTable style={styles.dataTable}>
            <DataTable.Header style={styles.headerbg}>
              <Text numberOfLines={2} style={styles.headerCell}>
                {""}
              </Text>
              <Text numberOfLines={2} style={styles.headerCell}>
                {mptStats3Yr[0]?.name}
              </Text>
              <Text numberOfLines={2} style={styles.headerCell}>
                {mptStats3Yr[0]?.category}
              </Text>
            </DataTable.Header>
            <DataTable.Row style={styles.headersec}>
              <DataTable.Cell style={styles.bodyCell}>R-Squared</DataTable.Cell>
              {mptStats3Yr.map((item, key) => (
                <DataTable.Cell key={key} style={styles.bodyCell}>
                  {item?.RSquared}
                </DataTable.Cell>
              ))}
            </DataTable.Row>
            <DataTable.Row style={styles.headersec}>
              <DataTable.Cell style={styles.bodyCell}>Beta</DataTable.Cell>
              {mptStats3Yr.map((item, key) => (
                <DataTable.Cell key={key} style={styles.bodyCell}>
                  {item?.beta}
                </DataTable.Cell>
              ))}
            </DataTable.Row>
            <DataTable.Row style={styles.headersec}>
              <DataTable.Cell style={styles.bodyCell}>
                {"Alpha %"}
              </DataTable.Cell>
              {mptStats3Yr.map((item, key) => (
                <DataTable.Cell key={key} style={styles.bodyCell}>
                  {item?.alpha}
                </DataTable.Cell>
              ))}
            </DataTable.Row>
            <DataTable.Row style={styles.headersec}>
              <DataTable.Cell style={styles.bodyCell}>Treynor</DataTable.Cell>
              {mptStats3Yr.map((item, key) => (
                <DataTable.Cell key={key} style={styles.bodyCell}>
                  {item?.treynor}
                </DataTable.Cell>
              ))}
            </DataTable.Row>
          </DataTable>
        </TabView.Item>
        <TabView.Item style={{ width: "90%" }}>
          <DataTable style={styles.dataTable}>
            <DataTable.Header style={styles.headerbg}>
              <Text numberOfLines={2} style={styles.headerCell}>
                {""}
              </Text>
              <Text numberOfLines={2} style={styles.headerCell}>
                {mptStats5Yr[0]?.name}
              </Text>
              <Text numberOfLines={2} style={styles.headerCell}>
                {mptStats5Yr[0]?.category}
              </Text>
            </DataTable.Header>
            <DataTable.Row style={styles.headersec}>
              <DataTable.Cell style={styles.bodyCell}>R-Squared</DataTable.Cell>
              {mptStats5Yr.map((item, key) => (
                <DataTable.Cell key={key} style={styles.bodyCell}>
                  {item?.RSquared}
                </DataTable.Cell>
              ))}
            </DataTable.Row>
            <DataTable.Row style={styles.headersec}>
              <DataTable.Cell style={styles.bodyCell}>Beta</DataTable.Cell>
              {mptStats5Yr.map((item, key) => (
                <DataTable.Cell key={key} style={styles.bodyCell}>
                  {item?.beta}
                </DataTable.Cell>
              ))}
            </DataTable.Row>
            <DataTable.Row style={styles.headersec}>
              <DataTable.Cell style={styles.bodyCell}>
                {"Alpha %"}
              </DataTable.Cell>
              {mptStats5Yr.map((item, key) => (
                <DataTable.Cell key={key} style={styles.bodyCell}>
                  {item?.alpha}
                </DataTable.Cell>
              ))}
            </DataTable.Row>
            <DataTable.Row style={styles.headersec}>
              <DataTable.Cell style={styles.bodyCell}>Treynor</DataTable.Cell>
              {mptStats5Yr.map((item, key) => (
                <DataTable.Cell key={key} style={styles.bodyCell}>
                  {item?.treynor}
                </DataTable.Cell>
              ))}
            </DataTable.Row>
          </DataTable>
        </TabView.Item>
        <TabView.Item style={{ width: "90%" }}>
          <DataTable style={styles.dataTable}>
            <DataTable.Header style={styles.headerbg}>
              <Text numberOfLines={2} style={styles.headerCell}>
                {""}
              </Text>
              <Text numberOfLines={2} style={styles.headerCell}>
                {mptStats10Yr[0]?.name}
              </Text>
              <Text numberOfLines={2} style={styles.headerCell}>
                {mptStats10Yr[0]?.category}
              </Text>
            </DataTable.Header>
            <DataTable.Row style={styles.headersec}>
              <DataTable.Cell
                style={[styles.bodyCell, { justifyContent: "flex-start" }]}
              >
                R-Squared
              </DataTable.Cell>
              {mptStats10Yr.map((item, key) => (
                <DataTable.Cell key={key} style={styles.bodyCell}>
                  {item?.RSquared}
                </DataTable.Cell>
              ))}
            </DataTable.Row>
            <DataTable.Row style={styles.headersec}>
              <DataTable.Cell
                style={[styles.bodyCell, { justifyContent: "flex-start" }]}
              >
                Beta
              </DataTable.Cell>
              {mptStats10Yr.map((item, key) => (
                <DataTable.Cell key={key} style={styles.bodyCell}>
                  {item?.beta}
                </DataTable.Cell>
              ))}
            </DataTable.Row>
            <DataTable.Row style={styles.headersec}>
              <DataTable.Cell
                style={[styles.bodyCell, { justifyContent: "flex-start" }]}
              >
                {"Alpha %"}
              </DataTable.Cell>
              {mptStats10Yr.map((item, key) => (
                <DataTable.Cell key={key} style={styles.bodyCell}>
                  {item?.alpha}
                </DataTable.Cell>
              ))}
            </DataTable.Row>
            <DataTable.Row style={styles.headersec}>
              <DataTable.Cell
                style={[styles.bodyCell, { justifyContent: "flex-start" }]}
              >
                Treynor
              </DataTable.Cell>
              {mptStats10Yr.map((item, key) => (
                <DataTable.Cell key={key} style={styles.bodyCell}>
                  {item?.treynor}
                </DataTable.Cell>
              ))}
            </DataTable.Row>
          </DataTable>
        </TabView.Item>
      </TabView>

      <Text style={styles.Upside}>Volatility Measures</Text>
      <Tab
        value={index1}
        onChange={(e) => setIndex1(e)}
        indicatorStyle={{
          backgroundColor: Colors.RED,
          color: "#fff",
          height: 3,
        }}
      >
        <Tab.Item
          title="3 Years"
          titleStyle={{
            fontSize: 15,
            fontWeight: "bold",
            color: index1 === 0 ? Colors.RED : "#000",
          }}
          buttonStyle={{
            backgroundColor: "#fff",
          }}
        />
        <Tab.Item
          title="5 Years"
          titleStyle={{
            fontSize: 15,
            fontWeight: "bold",
            color: index1 === 1 ? Colors.RED : "#000",
          }}
          buttonStyle={{
            backgroundColor: "#fff",
          }}
        />
        <Tab.Item
          title="10 Years"
          titleStyle={{
            fontSize: 15,
            fontWeight: "bold",
            color: index1 === 2 ? Colors.RED : "#000",
          }}
          buttonStyle={{
            backgroundColor: "#fff",
          }}
        />
      </Tab>
      <View style={{ borderWidth: 0.5, borderColor: Colors.DEEP_GRAY }}></View>

      <TabView value={index1} onChange={setIndex1} animationType="spring">
        <TabView.Item style={{ width: "90%" }}>
          <DataTable style={styles.dataTable}>
            <DataTable.Header style={styles.headerbg}>
              <Text numberOfLines={2} style={styles.headerCell}>
                {""}
              </Text>
              {volatility3Yr.map((item) => (
                <Text numberOfLines={2} style={styles.headerCell}>
                  {item?.trailing}
                </Text>
              ))}
            </DataTable.Header>
            <DataTable.Row style={styles.headersec}>
              <DataTable.Cell
                style={[styles.bodyCell, { justifyContent: "flex-start" }]}
              >
                {"Std. Deviation"}
              </DataTable.Cell>
              {volatility3Yr.map((item, key) => (
                <DataTable.Cell key={key} style={styles.bodyCell}>
                  {item?.standard}
                </DataTable.Cell>
              ))}
            </DataTable.Row>
            <DataTable.Row style={styles.headersec}>
              <DataTable.Cell
                style={[styles.bodyCell, { justifyContent: "flex-start" }]}
              >
                Sharpe Ratio
              </DataTable.Cell>
              {volatility3Yr.map((item, key) => (
                <DataTable.Cell key={key} style={styles.bodyCell}>
                  {item?.sharpe}
                </DataTable.Cell>
              ))}
            </DataTable.Row>
            <DataTable.Row style={styles.headersec}>
              <DataTable.Cell
                style={[styles.bodyCell, { justifyContent: "flex-start" }]}
              >
                Sortino Ratio
              </DataTable.Cell>
              {volatility3Yr.map((item, key) => (
                <DataTable.Cell key={key} style={styles.bodyCell}>
                  {item?.sortino}
                </DataTable.Cell>
              ))}
            </DataTable.Row>
          </DataTable>
        </TabView.Item>
        <TabView.Item style={{ width: "90%" }}>
          <DataTable style={styles.dataTable}>
            <DataTable.Header style={styles.headerbg}>
              <Text numberOfLines={2} style={styles.headerCell}>
                {""}
              </Text>
              {volatility5Yr.map((item) => (
                <Text numberOfLines={2} style={styles.headerCell}>
                  {item?.trailing}
                </Text>
              ))}
            </DataTable.Header>
            <DataTable.Row style={styles.headersec}>
              <DataTable.Cell style={styles.bodyCell}>
                {"Std. Deviation"}
              </DataTable.Cell>
              {volatility5Yr.map((item, key) => (
                <DataTable.Cell key={key} style={styles.bodyCell}>
                  {item?.standard}
                </DataTable.Cell>
              ))}
            </DataTable.Row>
            <DataTable.Row style={styles.headersec}>
              <DataTable.Cell style={styles.bodyCell}>
                Sharpe Ratio
              </DataTable.Cell>
              {volatility5Yr.map((item, key) => (
                <DataTable.Cell key={key} style={styles.bodyCell}>
                  {item?.sharpe}
                </DataTable.Cell>
              ))}
            </DataTable.Row>
            <DataTable.Row style={styles.headersec}>
              <DataTable.Cell style={styles.bodyCell}>
                Sortino Ratio
              </DataTable.Cell>
              {volatility5Yr.map((item, key) => (
                <DataTable.Cell key={key} style={styles.bodyCell}>
                  {item?.sortino}
                </DataTable.Cell>
              ))}
            </DataTable.Row>
          </DataTable>
        </TabView.Item>
        <TabView.Item style={{ width: "90%" }}>
          <DataTable style={styles.dataTable}>
            <DataTable.Header style={styles.headerbg}>
              <Text numberOfLines={2} style={styles.headerCell}>
                {""}
              </Text>
              {volatility10Yr.map((item) => (
                <Text numberOfLines={2} style={styles.headerCell}>
                  {item?.trailing}
                </Text>
              ))}
            </DataTable.Header>
            <DataTable.Row style={styles.headersec}>
              <DataTable.Cell style={styles.bodyCell}>
                {"Std. Deviation"}
              </DataTable.Cell>
              {volatility10Yr.map((item, key) => (
                <DataTable.Cell key={key} style={styles.bodyCell}>
                  {item?.standard}
                </DataTable.Cell>
              ))}
            </DataTable.Row>
            <DataTable.Row style={styles.headersec}>
              <DataTable.Cell style={styles.bodyCell}>
                Sharpe Ratio
              </DataTable.Cell>
              {volatility10Yr.map((item, key) => (
                <DataTable.Cell key={key} style={styles.bodyCell}>
                  {item?.sharpe}
                </DataTable.Cell>
              ))}
            </DataTable.Row>
            <DataTable.Row style={styles.headersec}>
              <DataTable.Cell style={styles.bodyCell}>
                Sortino Ratio
              </DataTable.Cell>
              {volatility10Yr.map((item, key) => (
                <DataTable.Cell key={key} style={styles.bodyCell}>
                  {item?.sortino}
                </DataTable.Cell>
              ))}
            </DataTable.Row>
          </DataTable>
        </TabView.Item>
      </TabView>

      <Text style={styles.Upside}>Upside & Downside Capture Ratio</Text>
      <DataTable style={{ marginBottom: 20, borderBottomWidth: 0.5 }}>
        <DataTable.Header style={[styles.headerbg]}>
          <Text
            numberOfLines={4}
            style={[styles.headerCellUpDown, { width: "30%" }]}
          >
            Name
          </Text>
          <Text numberOfLines={4} style={styles.headerCellUpDown}>
            1 Yr
          </Text>
          <Text numberOfLines={4} style={styles.headerCellUpDown}>
            3 Yrs
          </Text>
          <Text numberOfLines={4} style={styles.headerCellUpDown}>
            5 Yrs
          </Text>
          <Text numberOfLines={4} style={styles.headerCellUpDown}>
            10 Yrs
          </Text>
        </DataTable.Header>

        {upDownCaptureRatio.map((item, key) => (
          <DataTable.Row
            key={key}
            style={[styles.headerbg, { borderWidth: 0.5 }]}
          >
            <Text
              numberOfLines={3}
              style={[styles.headerCell, { width: "30%" }]}
            >
              {item?.name}
            </Text>
            <View style={styles.bodyCellUpDown}>
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 0.5,
                  borderLeftWidth: 1,
                  borderColor: "#aaaa",
                }}
              >
                <Feather name={"arrow-up"} size={14} color="green" />
                <Text style={{ fontSize: 12 }}>{item.year1[0]}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flex: 1,
                  width: "100%",
                  borderWidth: 0.5,
                  borderLeftWidth: 1,
                  borderColor: "#aaaa",
                }}
              >
                <Feather name={"arrow-down"} size={14} color={Colors.RED} />
                <Text style={{ fontSize: 12 }}>{item.year1[1]}</Text>
              </View>
            </View>
            <View style={styles.bodyCellUpDown}>
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 0.5,
                  borderColor: "#aaaa",
                }}
              >
                <Feather name={"arrow-up"} size={14} color="green" />
                <Text style={{ fontSize: 12 }}>{item.year3[0]}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flex: 1,
                  width: "100%",
                  borderWidth: 0.5,
                  borderColor: "#aaaa",
                }}
              >
                <Feather name={"arrow-down"} size={14} color={Colors.RED} />
                <Text style={{ fontSize: 12 }}>{item.year3[1]}</Text>
              </View>
            </View>
            <View style={styles.bodyCellUpDown}>
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 0.5,
                  borderColor: "#aaaa",
                }}
              >
                <Feather name={"arrow-up"} size={14} color="green" />
                <Text style={{ fontSize: 12 }}>{item.year5[0]}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flex: 1,
                  width: "100%",
                  borderWidth: 0.5,
                  borderColor: "#aaaa",
                }}
              >
                <Feather name={"arrow-down"} size={14} color={Colors.RED} />
                <Text style={{ fontSize: 12 }}>{item.year5[1]}</Text>
              </View>
            </View>
            <View style={styles.bodyCellUpDown}>
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  //borderWidth: 0.5,
                  borderLeftWidth: 0.5,
                }}
              >
                <Feather name={"arrow-up"} size={14} color="green" />
                <Text style={{ fontSize: 12 }}>{item.year10[0]}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flex: 1,
                  width: "100%",
                  //borderWidth: 0.5,
                  borderLeftWidth: 0.5,
                }}
              >
                <Feather name={"arrow-down"} size={14} color={Colors.RED} />
                <Text style={{ fontSize: 12 }}>{item.year10[1]}</Text>
              </View>
            </View>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
}

const styles = StyleSheet.create({
  mainbox: {
    backgroundColor: "#fff",
  },
  header: {
    borderBottomColor: Colors.BLACK,
    borderBottomWidth: 1,
  },
  private_sector: {
    flexDirection: "row",

    marginBottom: 5,
  },
  private: {
    fontSize: 20,
    width: "87%",
    marginBottom: 2,
    marginLeft: 10,
    fontWeight: "bold",
    color: Colors.RED,
  },

  Upside: {
    fontSize: 20,
    color: Colors.RED,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  back_sec: {
    flexDirection: "row",
  },
  back1: {
    width: "30%",
    alignItems: "center",
  },
  back_year: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.RED,
  },
  back_year2: {
    fontSize: 20,
    fontWeight: "bold",
  },
  invesco_india: {
    flexDirection: "row",
    width: "60%",
    marginLeft: "27%",
    marginTop: 10,
  },
  Invesco: {
    fontSize: 18,
    fontWeight: "bold",
    width: "50%",
    color: Colors.RED,
    marginLeft: 30,
  },

  mainbox_2: {
    flexDirection: "row",
    margin: 10,
  },
  bse: {
    width: "33%",
  },
  index1: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.DEEP_GRAY,
    marginBottom: 15,
  },
  index: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.DEEP_GRAY,
    marginVertical: 5,
  },

  upside: {
    width: 322,
    height: 135,
  },
  headerbg: {
    justifyContent: "space-between",
  },
  headerCell: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    paddingHorizontal: 5,
    width: "30%",
    textAlign: "center",
    color: Colors.RED,
    fontSize: 12,
    fontWeight: "bold",
  },
  headerCellUpDown: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    paddingHorizontal: 5,
    width: "15%",
    textAlign: "center",
    color: Colors.DEEP_GRAY,
    fontSize: 12,
    fontWeight: "bold",
  },
  bodyCell: {
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    width: "30%",
  },
  bodyCellUpDown: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    //minWidth: "15%",
    minWidth: "19.5%",
    flex: 1,
    //borderRightWidth: 0.5,
    //borderBottomWidth: 0.5,
  },
});

const mapStateToProps = (state) => ({
  token: state.auth.token,
  users: state.auth.user,
  detailsInfo: state.fundDetail.detailsInfo,
});
export default connect(mapStateToProps)(RiskRating);
