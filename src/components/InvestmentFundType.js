/** @format */

import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Keyboard,
  Dimensions,
} from "react-native";

import { AntDesign } from "react-native-vector-icons";
import { Image } from "react-native-elements";
import { Colors } from "../common";

const randerData = (
  data,
  k,
  onPress,
  onChange,
  handleDelete,
  selectedOption
) => {
  const plusMinus = (type, value) => {
    if (type === "plus") {
      let newValue = parseInt(value) + 1;
      if (newValue > 30) {
        newValue = 30;
      }
      onChange(k, newValue, "date");
    } else {
      let newValue = parseInt(value) - 1;
      if (newValue < 1) {
        newValue = 1;
      }
      onChange(k, newValue, "date");
    }
  };

  const [value, setValue] = useState();
  const [productCode, setProductCode] = useState();

  useEffect(() => {
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      onChange(productCode, value, "sip");
    });

    return () => {
      hideSubscription.remove();
    };
  }, []);

  if (data?.schemes != "NA") {
    let schemes = Array.isArray(data?.schemes)
      ? data?.schemes
      : [data?.schemes];
    return (
      <View>
        <View>
          {schemes.map((item, key) => (
            <View key={key} style={styles.axis_asset}>
              <View style={styles.company}>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={{ uri: item?.imagePath }}
                    style={styles.axisimg}
                  />
                  <View style={styles.management}>
                    <Text style={styles.axis}>{item?.name}</Text>
                    <Text style={styles.moderately}>{item?.productCode}</Text>
                  </View>
                </View>
                <AntDesign
                  style={{
                    display: item?.type === "new" ? "flex" : "none",
                  }}
                  name="delete"
                  size={24}
                  color="#C0392B"
                  onPress={() => handleDelete(item?.productCode)}
                />
              </View>

              <View style={styles.border_sec}>
                <View style={styles.border}>
                  <View
                    style={{ borderWidth: 1, borderColor: Colors.DEEP_GRAY }}
                  ></View>
                </View>
                <View style={styles.icons}>
                  <TouchableOpacity
                    style={styles.circle}
                    onPress={() => onPress(item)}
                  >
                    <AntDesign name="right" size={30} color="#C0392B" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.selectfolio_sec}>
                <View style={styles.select}>
                  <Text style={styles.no}>Min Investment</Text>
                  <Text>₹{item?.investment ? item?.investment : "1000"}</Text>
                </View>
                {selectedOption && selectedOption === "SIP" && (
                  <View style={styles.select}>
                    <Text style={styles.no}>SIP Date</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.new}>
                        {item?.date ? item?.date : "5"}
                      </Text>
                      <View style={{ flexDirection: "column" }}>
                        <TouchableOpacity
                          onPress={() =>
                            plusMinus("plus", item?.date ? item?.date : "5")
                          }
                        >
                          <AntDesign name="caretup" size={15} color="#C0392B" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            plusMinus("minus", item?.date ? item?.date : "5")
                          }
                        >
                          <AntDesign
                            name="caretdown"
                            size={15}
                            color="#C0392B"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}

                <View style={styles.select}>
                  <Text style={styles.no}>
                    {selectedOption === "SIP" ? "SIP Amount" : "Amount"}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.new}>₹</Text>
                    <TextInput
                      style={styles.new}
                      keyboardType={"numeric"}
                      maxLength={8}
                      placeholder={"sip"}
                      onChangeText={(v) => {
                        setValue(
                          isNaN(parseInt(v, 10))
                            ? "0"
                            : parseInt(v, 10).toString()
                        );
                        setProductCode(item?.productCode);
                      }}
                      onBlur={() => onChange(item?.productCode, value, "sip")}
                      onSubmitEditing={() =>
                        onChange(item?.productCode, value, "sip")
                      }
                      value={value ? value : item?.sip ? item?.sip : "0"}
                    />
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  }
  return null;
};

export default function InvestmentFundType(props) {
  const {
    data,
    onPress,
    myInvestments,
    handleDelete,
    selectedOption,
    handleClicked,
  } = props;
  const [newData, setNewData] = useState(data ? data : []);
  const [keys, setKeys] = useState([]);
  useEffect(() => {
    if (data) {
      setNewData(data);
      let keyList = Object.keys(groupByKey(data, "fund_type"));
      if (data.length !== keys.length) setKeys(keyList);
    }
  }, [data]);

  const onChange = async (productCode, value, name) => {
    let data = JSON.parse(JSON.stringify(newData));
    let key;

    for (key in data) {
      if (data[key].schemes.productCode === productCode) {
        break;
      }
    }

    data[key].schemes[name] =
      isNaN(value) || value === "" ? "0" : parseInt(value, 10).toString();
    myInvestments(data);
    setNewData(data);
    handleClicked();
  };

  function groupByKey(array, key) {
    return array.reduce((hash, obj) => {
      if (obj[key] === undefined) return hash;
      return Object.assign(hash, {
        [obj[key]]: (hash[obj[key]] || []).concat(obj),
      });
    }, {});
  }

  const FundList = ({ filterKey }) => (
    <>
      {newData
        .filter((item) => item.fund_type === filterKey)
        .map((item, key) => (
          <View key={key}>
            {randerData(
              item,
              key,
              onPress,
              onChange,
              handleDelete,
              selectedOption
            )}
          </View>
        ))}
    </>
  );

  return (
    <>
      {keys.map((item) => (
        <>
          <View style={styles.hybrid_sec}>
            <View style={{ backgroundColor: "#EFEFEF" }}>
              <Text style={styles.hybrid}>{item}</Text>
            </View>
          </View>
          <FundList filterKey={item} />
        </>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  hybrid_sec: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
  hybrid: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.RED,
    marginVertical: 10,
    marginLeft: 10,
  },
  axis_asset: {
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: Colors.WHITE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    padding: 5,
  },
  company: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  management: {
    marginLeft: 10,
    flexShrink: 1,
  },
  axis: {
    fontSize: 15,
    width: Dimensions.get("window").width * 0.75,
  },
  moderately: {
    fontSize: 12,
    color: Colors.DEEP_GRAY,
  },
  axisimg: {
    height: 50,
    width: 50,
    resizeMode: "contain",
  },
  checkbox: {
    position: "absolute",
    right: 5,
    top: -25,
  },
  border_sec: {
    flexDirection: "row",
    marginTop: 10,
  },
  border: {
    width: "85%",
    marginRight: 5,
  },
  icons: {
    width: "10%",
    marginTop: -15,
  },
  selectfolio_sec: {
    flexDirection: "row",
  },
  select: {
    alignItems: "center",
    width: "32%",
  },
  no: {
    fontSize: 15,
    color: Colors.DEEP_GRAY,
  },
  new: {
    fontSize: 18,
  },
  circle: {
    height: 35,
    width: 35,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.DEEP_GRAY,
    paddingLeft: 2,
  },
});
