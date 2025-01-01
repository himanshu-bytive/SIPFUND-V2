/** @format */

import React, { useState, useRef, useEffect, useContext } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import { Colors } from "../common";
import MyImage from "./MyImage";
export default function InvestmentLists(props) {
  const optimizeImages = [
    "https://res.cloudinary.com/dfwm0qaiv/image/upload/v1706781443/i3lhjgrxrew1w30lyosc.svg",
    "https://res.cloudinary.com/dfwm0qaiv/image/upload/v1706781443/i3lhjgrxrew1w30lyosc.svg",
    "https://res.cloudinary.com/dfwm0qaiv/image/upload/v1706781443/i3lhjgrxrew1w30lyosc.svg",
    "https://res.cloudinary.com/dfwm0qaiv/image/upload/v1706781443/i3lhjgrxrew1w30lyosc.svg",
    "https://res.cloudinary.com/dfwm0qaiv/image/upload/v1706775290/jkeo2n67lz9lscerbjyt.svg",
    "https://res.cloudinary.com/dfwm0qaiv/image/upload/v1706781443/i3lhjgrxrew1w30lyosc.svg",
    "https://res.cloudinary.com/dfwm0qaiv/image/upload/v1706781443/i3lhjgrxrew1w30lyosc.svg",
    "https://res.cloudinary.com/dfwm0qaiv/image/upload/v1706781443/i3lhjgrxrew1w30lyosc.svg",
    "https://res.cloudinary.com/dfwm0qaiv/image/upload/v1706781443/i3lhjgrxrew1w30lyosc.svg",
    "https://res.cloudinary.com/dfwm0qaiv/image/upload/v1706781443/i3lhjgrxrew1w30lyosc.svg",
    "https://res.cloudinary.com/dfwm0qaiv/image/upload/v1706781443/i3lhjgrxrew1w30lyosc.svg",
    "https://res.cloudinary.com/dfwm0qaiv/image/upload/v1706781443/i3lhjgrxrew1w30lyosc.svg",
  ];
  const { data, counts, onPress } = props;
  const { width } = Dimensions.get('window');
const boxSize = width * 0.30; // 23% of the screen width
  if (counts) {
    return (
      <View style={styles.investment_sec}>
        {data.map((item, key) => (
          <View key={key} style={styles.investment}>
            {key < counts && (
              <TouchableOpacity
                onPress={() => onPress(item)}
                style={{ width: "100%" }}
              >
                {item.plan === "Sectoral Mutual Funds" ? (
                  <Image
                    source={require("../../assets/sector.png")}
                    style={{
                      resizeMode: "contain",
                      alignSelf: "center",
                      aspectRatio: 1,
                    }}
                    width={"100%"}
                  />
                ) : (
                  <MyImage width="100%" svg={true} url={item?.planImagePath} />
                )}
                <Text style={styles.long}>{item.plan}</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    );
  } else {
    return (
      <View style={styles.investment_sec}>
        {data.map((item, key) => (
          <View key={key} style={styles.investment}>
            <TouchableOpacity
              onPress={() => onPress(item)}
              style={{ width: "100%" }}
            >
              {/* <Text>{item.plan}</Text> */}
              {item.plan === "Sectoral Mutual Funds" ? (
                <Image
                  source={require("../../assets/sector.png")}
                  style={{
                    resizeMode: "contain",
                    alignSelf: "center",
                    //aspectRatio: 1,
                    width: 100,
                    height: 90,
                  }}
                />
              ) : (
                <>
                  {/* <Text>
                    {optimizeImages[key]} {data?.length}
                  </Text> */}
                  <MyImage
                    width={100}
                    height={90}
                    svg={true}
                    // url={
                    //   // optimizeImages[key]
                    //   //   ? optimizeImages[key]
                    //   //   :
                    //   optimizeImages[key]
                    // }
                    style={{ height: 100, width: 90, marginLeft: 10 }}
                    url={
                      Platform.OS == "ios"
                        ? item?.iosplanImagePath
                        : item?.planImagePath
                    }
                  />
                </>
              )}
              <Text style={styles.long}>{item.plan}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  investment_sec: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 10,
  },
  investment: {
    //borderRadius: 10,
    backgroundColor: Colors.WHITE,
    width: "30%",
    alignItems: "center",
    margin: "1%",
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  term: {
    width: "100%",
    height: 113,
    borderRadius: 10,
  },
  long: {
    textAlign: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontSize: 13,
    color:"black"
    //fontWeight: "bold",
  },
});
