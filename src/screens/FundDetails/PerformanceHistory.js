import React, { useState, useRef, useEffect, useContext } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { connect } from "react-redux";
import { DataTable } from "react-native-paper";
import { Styles, Config, Colors, FormValidate } from "../../common";

function PerformanceHistory(props) {
  const { detailsInfo } = props;
  const [historyRow, setHistoryRow] = useState([]);
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    let detailedPortFolio = detailsInfo ? detailsInfo[0].api : {};
    let currentYear = new Date(detailedPortFolio["FHV2-PortfolioDate"]);
    let year = currentYear.getFullYear();
    let data = [];
    for (var i = 0; i < 4; i++) {
      var tempObj = [];
      if (i == 0) {
        for (var j = 10; j >= 1; j--) {
          tempObj.push(year - j);
        }
      } else if (i == 1) {
        for (var j = 10; j >= 1; j--) {
          if (detailedPortFolio["CYR-Year" + j]) {
            tempObj.push(
              parseFloat(detailedPortFolio["CYR-Year" + j]).toFixed(2)
            );
          } else {
            tempObj.push("-");
          }
        }
      } else if (i == 2) {
        for (var j = 10; j >= 1; j--) {
          if (detailedPortFolio["CYR-CategoryYear" + j]) {
            tempObj.push(
              parseFloat(detailedPortFolio["CYR-CategoryYear" + j]).toFixed(2)
            );
          } else {
            tempObj.push("-");
          }
        }
      } else if (i == 3) {
        for (var j = 10; j >= 1; j--) {
          if (
            detailedPortFolio["CYR-CategoryYear" + j] &&
            detailedPortFolio["CYR-Year" + j]
          ) {
            tempObj.push(
              parseFloat(
                detailedPortFolio["CYR-Year" + j] -
                  detailedPortFolio["CYR-CategoryYear" + j]
              ).toFixed(2)
            );
          } else {
            tempObj.push("-");
          }
        }
      }
      data.push(tempObj);
    }
    let historyRow = [];
    let historyTable = [];
    for (var i = 0; i < data.length; i++) {
      if (i == 0) {
        for (var j = 0; j < 10; j++) {
          if (j == 9) {
            historyRow.push(data[i][j]);
          } else {
            historyRow.push(data[i][j]);
          }
        }
      } else if (i == 1) {
        let dataArray = [];
        for (var j = 0; j < 10; j++) {
          if (j == 0) {
            dataArray.push(`${detailedPortFolio["FSCBI-FundName"]}`);
            dataArray.push(data[i][j]);
          } else if (j == 9) {
            dataArray.push(data[i][j]);
          } else {
            dataArray.push(data[i][j]);
          }
        }
        historyTable.push(dataArray);
      } else if (i == 2) {
        let dataArray = [];
        for (var j = 0; j < 10; j++) {
          if (j == 0) {
            dataArray.push(`Category ${detailedPortFolio["DP-CategoryName"]}`);
            dataArray.push(data[i][j]);
          } else if (j == 9) {
            dataArray.push(data[i][j]);
          } else {
            dataArray.push(data[i][j]);
          }
        }
        historyTable.push(dataArray);
      } else if (i == 3) {
        let dataArray = [];
        for (var j = 0; j < 10; j++) {
          if (j == 0) {
            dataArray.push(
              `+/- Category  ${detailedPortFolio["DP-CategoryName"]}`
            );
            dataArray.push(data[i][j]);
          } else if (j == 9) {
            dataArray.push(data[i][j]);
          } else {
            dataArray.push(data[i][j]);
          }
        }
        historyTable.push(dataArray);
      }
    }
    historyRow = [
      `History (${detailedPortFolio["FHV2-PortfolioDate"]})`,
      ...historyRow,
    ];
    setHistoryRow(historyRow);
    setHistoryData(historyTable);
  }, [detailsInfo]);

  return (
    <View style={styles.history}>
      <ScrollView
        horizontal={true}
        style={{
          width: "100%",
          borderColor: "#D3D3D3",
        }}
      >
        <DataTable style={styles.dataTable}>
          <DataTable.Header style={styles.headerbg}>
            {historyRow.map((item, key) => (
              <DataTable.Title key={key} style={styles.headerCell}>
                {item}
              </DataTable.Title>
            ))}
          </DataTable.Header>

          {historyData.map((item, key) => (
            <DataTable.Row key={key} style={styles.headersec}>
              {item.map((sub, k) => (
                <DataTable.Cell key={k} style={styles.bodyCell}>
                  {sub}
                </DataTable.Cell>
              ))}
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dataTable: {
    borderWidth: 1,
    borderColor: Colors.DEEP_GRAY,
  },
  headerCell: {
    padding: 5,
    width: 120,
    justifyContent: "center",
  },
  bodyCell: {
    padding: 5,
    width: 120,
    justifyContent: "center",
    //paddingLeft: 20,
  },
});

const mapStateToProps = (state) => ({
  token: state.auth.token,
  users: state.auth.user,
  detailsInfo: state.fundDetail.detailsInfo,
});

export default connect(mapStateToProps)(PerformanceHistory);
