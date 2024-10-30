import React, { useState, useRef, useEffect, useContext } from "react";
import { DataTable } from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";
import { Colors } from "../../common";
//import { VictoryPieCode } from "../../components";
import { VictoryContainer, VictoryPie } from "victory-native";

function PortfolioSummary(props) {
  const { detailsInfo } = props;
  const [totalmarktValue, setTotalmarktValue] = useState(0);
  const [holdings, setHoldings] = useState([]);
  const [holdingType, setHoldingType] = useState([]);

  const colorScale = [
    "#3B75AF",
    "#EF8636",
    "#519E3E",
    "#C53A32",
    "#8D69B8",
    "#ffbf00",
    "#9966cc",
    "#cd9575",
    "#915c83",
    "#008000",
    "#fbceb1",
    "#00ffff",
    "#7fffd4",
    "#4b5320",
    "#e9d66b",
    "#b2beb5",
    "#ff9966",
    "#a52a2a",
  ];

  useEffect(() => {
    let detailedPortFolio = detailsInfo ? detailsInfo[0].api : {};
    let totalmarktValue = detailedPortFolio["PSRP-TotalMarketValueNet"]
      ? Number(detailedPortFolio["PSRP-TotalMarketValueNet"]).toFixed(2)
      : 0;
    setTotalmarktValue(totalmarktValue);

    // Holdings
    let holdings = [
      {
        holding: detailedPortFolio["PSRP-NumberOfHoldingsLong"]
          ? detailedPortFolio["PSRP-NumberOfHoldingsLong"]
          : "",
        stock: detailedPortFolio["PSRP-NumberOfStockHoldingsLong"]
          ? detailedPortFolio["PSRP-NumberOfStockHoldingsLong"]
          : "",
        bond: detailedPortFolio["PSRP-NumberOfBondHoldingsLong"]
          ? detailedPortFolio["PSRP-NumberOfBondHoldingsLong"]
          : "",
      },
    ];
    setHoldings(holdings);

    // Holding Type
    let holdingType = [];
    let portFolio = detailedPortFolio["FHV2-HoldingDetail"]
      ? detailedPortFolio["FHV2-HoldingDetail"]
      : [];
    let portFolioObj = {};
    for (let item of portFolio) {
      if (item.HoldingType in portFolioObj === false) {
        portFolioObj[item.HoldingType] = {
          x: item.HoldingType,
          y: Number(item.Weighting) ? Number(item.Weighting) : 0,
        };
      } else {
        portFolioObj[item.HoldingType].y =
          portFolioObj[item.HoldingType].y +
          (Number(item.Weighting) ? Number(item.Weighting) : 0);
      }
    }
    for (let key in portFolioObj) {
      holdingType.push({ x: portFolioObj[key].x, y: portFolioObj[key].y });
    }
    setHoldingType(holdingType);
  }, [detailsInfo]);

  return (
    <View style={{ marginHorizontal: 5 }}>
      <Text style={styles.value}>
        Total Market Value - ₹ {(Number(totalmarktValue) / 10000000).toFixed(2)}{" "}
        cr
      </Text>

      <DataTable style={styles.dataTable}>
        <DataTable.Header style={styles.headerbg}>
          <DataTable.Title numberOfLines={4} style={styles.headerCell}>
            No. Of Holdings
          </DataTable.Title>
          <DataTable.Title numberOfLines={4} style={styles.headerCell}>
            No. Of Stock Holdings
          </DataTable.Title>
          <DataTable.Title
            numberOfLines={4}
            style={[styles.headerCell, { borderRightWidth: 0 }]}
          >
            No. Of Bond Holdings
          </DataTable.Title>
        </DataTable.Header>

        {holdings.map((item, key) => (
          <DataTable.Row key={key} style={styles.headersec}>
            <DataTable.Cell style={styles.bodyCell}>
              {item.holding}
            </DataTable.Cell>
            <DataTable.Cell style={styles.bodyCell}>
              {item.stock}
            </DataTable.Cell>
            <DataTable.Cell style={[styles.bodyCell, { borderRightWidth: 0 }]}>
              {item.bond}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>

      <View style={styles.graph_sec}>
        <View style={styles.holding_sec}>
          <DataTable style={styles.dataTablebottom}>
            <DataTable.Header style={styles.headerbg}>
              <DataTable.Title numberOfLines={4} style={styles.headerCell}>
                <Text style={styles.type}>Holding Type</Text>
              </DataTable.Title>
              <DataTable.Title
                numberOfLines={4}
                style={[styles.headerCell, { borderRightWidth: 0 }]}
              >
                <Text style={styles.type}>%Net</Text>
              </DataTable.Title>
            </DataTable.Header>

            {holdingType.map((item, key) => (
              <DataTable.Row key={key} style={styles.headerbg}>
                <DataTable.Cell
                  style={[
                    styles.bodyCell,
                    {
                      width: "100%",
                      justifyContent: "space-between",
                    },
                  ]}
                >
                  <View
                    style={{
                      backgroundColor: colorScale[key],
                      height: 10,
                      width: 10,
                      marginRight: 10,
                    }}
                  />
                  <Text>{item.x}</Text>
                </DataTable.Cell>
                <DataTable.Cell
                  style={[styles.bodyCell, { borderRightWidth: 0 }]}
                >
                  {item.y}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </View>

        <View style={styles.allocation}>
          <Text style={styles.asset}>Asset Allocation</Text>
          <VictoryPie
            data={holdingType}
            colorScale={colorScale}
            labels={() => ""}
            innerRadius={50}
            width={100}
            height={100}
          />
        </View>
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
  contain_box: { margin: 20 },

  bottom_sec: {
    paddingVertical: 20,
    marginHorizontal: 10,
  },
  holding: {
    flexDirection: "row",
    borderBottomWidth: 2,
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
  history: {
    borderWidth: 1,
    borderColor: Colors.DEEP_GRAY_5,
  },

  name_sec: {
    flexDirection: "row",

    borderBottomWidth: 1,
    borderColor: Colors.DEEP_GRAY_5,
  },
  name_left: {
    width: "70%",
    borderRightWidth: 1,
    borderColor: Colors.DEEP_GRAY_5,
    paddingVertical: 5,
    paddingLeft: 20,
  },
  name_right: {
    alignItems: "center",
    width: "30%",
    paddingVertical: 5,
  },
  name_text: {
    fontSize: 15,
  },
  name: { fontSize: 15 },
  current: { fontSize: 10 },
  value: {
    fontSize: 11,
    marginHorizontal: 10,
    marginBottom: 20,
  },

  minimum: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Colors.DEEP_GRAY_5,
  },
  minimum_sec: {
    borderRightWidth: 1,
    width: "33.3333333%",
    paddingVertical: 5,
    borderColor: Colors.DEEP_GRAY_5,
  },
  mini_tex: {
    fontSize: 11,
    textAlign: "center",
    borderBottomWidth: 1,
    borderColor: Colors.DEEP_GRAY_5,
    paddingVertical: 5,
  },
  mini_tex2: { textAlign: "center" },
  bottom_holding: {
    borderWidth: 1,
    marginVertical: 20,
    borderColor: Colors.DEEP_GRAY_5,
  },
  bottom_holdingleft: { width: "40%" },
  bottom_holdingright: { width: "60%" },

  port: { marginTop: 20 },
  goals_2: {
    width: 400,
    height: 170,
  },

  graph_sec: {
    flexDirection: "row",
    borderColor: Colors.DEEP_GRAY_5,
    borderWidth: 1,
    marginHorizontal: 5,
    marginTop: 30,
  },
  holding_sec: {
    width: "50%",
    alignItems: "center",
  },
  type_sec: {
    borderRightWidth: 1,
    borderRightColor: Colors.DEEP_GRAY,
    width: "100%",
    alignItems: "center",
  },
  type: {
    color: Colors.RED,
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 10,
  },
  cr_sec: {
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderRightColor: Colors.DEEP_GRAY,
    borderTopColor: Colors.DEEP_GRAY,
    width: "100%",
    alignItems: "center",
    paddingVertical: 5,
  },
  cr: {
    fontSize: 11,
  },
  red: {
    marginBottom: 23,
  },
  allocation: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  asset: {
    color: Colors.RED,
    fontSize: 12,
    fontWeight: "bold",
    marginVertical: 10,
  },
  graph_img: {
    height: 113,
    width: 125,
  },
  dataTable: {
    borderWidth: 1,
    borderColor: Colors.DEEP_GRAY,
  },
  dataTablebottom: {
    borderRightWidth: 1,
    borderColor: Colors.DEEP_GRAY,
  },
  headerbg: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.DEEP_GRAY,
  },
  headerCell: {
    // padding: 10,
    borderRightWidth: 1,
    borderRightColor: Colors.DEEP_GRAY,
    justifyContent: "center",
  },
  bodyCell: {
    // padding: 10,
    borderRightWidth: 1,
    borderRightColor: Colors.DEEP_GRAY,
    justifyContent: "center",
  },
});

const mapStateToProps = (state) => ({
  token: state.auth.token,
  users: state.auth.user,
  detailsInfo: state.fundDetail.detailsInfo,
});
export default connect(mapStateToProps)(PortfolioSummary);
