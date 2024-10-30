/** @format */

import React, { useState, useRef, useEffect, useContext } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

import { AntDesign } from "react-native-vector-icons";
import { Image, CheckBox } from "react-native-elements";
import { Styles, Config, Colors, FormValidate } from "../common";
import moment from "moment";

export default function HoldingFundType(props) {
  const { data, holdings } = props;
  const [viewTransactions, setViewTransactions] = useState(false);

  return (
    <View>
      <View style={styles.valua_sec}>
        <View style={styles.price}>
          <Text style={styles.rate_2}>₹ {data?.currentValue.toFixed(2)}</Text>
          <Text style={styles.Current_Value}>Current Value</Text>
        </View>
        <View style={styles.Investment}>
          <View style={styles.Investment_value}>
            <Text style={styles.rate_2}>
              ₹ {data?.investmentValue.toFixed(2)}
            </Text>
            <Text style={styles.Current_Value}>Investment</Text>
          </View>

          <View style={styles.Investment_value}>
            <Text style={styles.rate_2}>
              ₹{" "}
              {(
                Number(data?.currentValue) - Number(data?.investmentValue)
              ).toFixed(2)}
            </Text>
            <Text style={styles.Current_Value}>Profit/Loss</Text>
          </View>

          <View style={styles.Investment_value}>
            <Text style={styles.rate_2}>{data?.cagr}%</Text>
            <Text style={styles.Current_Value}>CAGR</Text>
          </View>
        </View>
      </View>

      {holdings.map((item, key) => (
        <View key={key}>
          <View style={styles.small_box}>
            <Text style={styles.Hybrid}>{item.category}</Text>
          </View>

          <TouchableOpacity
            onPress={() => setViewTransactions(!viewTransactions)}
          >
            <View style={styles.fund}>
              <Image
                source={{ uri: item.imagePath }}
                style={styles.Hybrid_img}
              />
              <View
                style={{
                  flex: 1,
                  //marginHorizontal: 20,
                  paddingHorizontal: 20,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text numberOfLines={2} style={styles.SBIEquity}>
                    {item.productName}
                  </Text>
                  <Text style={styles.SBIEquity_rate}>
                    ₹{item.amount.toFixed(2)}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                    }}
                  >
                    {"Cur.NAV/Value"}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                    }}
                  >
                    {`₹ ${item?.navValue.toFixed(
                      2
                    )} / ₹ ${item?.currentValue.toFixed(2)}`}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          {viewTransactions && (
            <View style={styles.transactionContainer}>
              <Text style={styles.transHeader}>Transactions</Text>
              {item?.trxnDetails.map((trxn, key) => (
                <View
                  style={[
                    styles.fund,
                    {
                      marginHorizontal: 10,
                      padding: 10,
                    },
                  ]}
                  key={key}
                >
                  <View style={{ justifyContent: "space-between" }}>
                    <Text>
                      {moment(new Date(trxn?.navDate)).format("DD-MM-YYYY")} (
                      {trxn?.type})
                    </Text>
                    <Text>₹{trxn?.amount}</Text>
                  </View>
                  <View style={{ justifyContent: "space-between" }}>
                    <Text>Nav: ₹{trxn?.purPrice}</Text>
                    <Text>Units: {trxn?.units}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  education_plan: {
    flexDirection: "row",
    width: "100%",
    paddingBottom: 10,
  },
  plan_1: {
    width: "50%",
    alignItems: "center",
  },
  plan_img: {
    height: 64,
    width: 69,
  },
  price: {
    alignItems: "center",
  },
  rate: {
    fontSize: 14,
    fontWeight: "bold",
    paddingLeft: 5,
  },
  plan_2: {
    alignItems: "center",
    width: "50%",
    paddingLeft: 40,
  },
  plan2_img: {
    height: 60,
    width: 60,
  },
  year: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  Target_Set: {
    fontSize: 12,
  },
  valua_sec: {
    marginHorizontal: 10,
    backgroundColor: Colors.RED,
    alignItems: "center",
    borderRadius: 30,
    marginTop: 30,
  },
  rate_2: {
    color: Colors.WHITE,
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 10,
  },
  Current_Value: {
    color: Colors.WHITE,
    fontWeight: "bold",
    fontSize: 12,
  },
  Investment: {
    width: "90%",
    marginTop: 20,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  Investment_value: {
    alignItems: "center",
    paddingHorizontal: 5,
    marginBottom: 20,
  },
  small_box: {
    backgroundColor: "#EFEFEF",
    width: "100%",
    marginTop: 10,
  },
  Hybrid: {
    fontSize: 20,
    color: Colors.RED,
    marginLeft: 20,
    paddingVertical: 10,
  },
  fund: {
    flex: 1,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
    //marginTop: 10,
    backgroundColor: Colors.WHITE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2.5,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  SBI: {
    flexDirection: "row",
  },
  Hybrid_img: {
    height: 44,
    width: 39,
    marginLeft: 10,
    resizeMode: "contain",
  },
  SBIEquity: {
    maxWidth: "70%",
    //marginLeft: 10,
    paddingTop: 10,
    fontSize: 14,
  },
  SBIEquity_rate: {
    paddingTop: 10,
    paddingRight: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
  transHeader: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 5,
  },
  transactionContainer: {
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 5,
  },
});
