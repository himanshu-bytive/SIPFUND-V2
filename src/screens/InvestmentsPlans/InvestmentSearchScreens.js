/** @format */

import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  Button,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  Dimensions,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import { Styles, Config, Colors, FormValidate } from "../../common";
import { MyImage } from "../../components";
import {
  Ionicons,
  AntDesign,
  EvilIcons,
  Entypo,
  FontAwesome5,
} from "react-native-vector-icons";
import { Image, Header, CheckBox } from "react-native-elements";

function InvestmentSearchScreens(props) {
  const {
    token,
    investment,
    isFetching,
    resetFunds,
    fetchFunds,
    funds,
    myInvestlist,
    myInvestments,
    fundDetails,
  } = props;
  const searchInput = useRef(null);
  let timer = useRef(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    searchInput.current.focus();
    resetFunds();
  }, [token]);

  const searchResults = (value) => {
    clearTimeout(timer.current);
    setSearch(value);
    timer.current = setTimeout(() => {
      if (value) {
        let params = { name: value };
        fetchFunds(params, token);
      }
    }, 1000);
  };

  const getFormattedItem = (value) => {
    return {
      type: "new",
      amc_code: "101",
      imagePath: `https://sipfund.sfo2.digitaloceanspaces.com/product-AMC-images/${value.productAMCImage}`,
      name: value.productName,
      isin: value.productISIN,
      productCode: value.productISIN,
      default_date: value.sipDates.split(",")[0],
      sipDates: value?.sipDates,
      sip_min_amount: value?.minimumSIPAmount,
      lumpsum_min_amount: value?.minimumLumpsumAmount,
    };
  };

  const addRemove = (value) => {
    let list = myInvestlist ? myInvestlist : {};

    let data = getFormattedItem(value);

    let dataKey = value.Category;

    if (list[dataKey]) {
      list = {
        ...list,
        [dataKey]: [...list[dataKey], data],
      };
    } else {
      list[dataKey] = [data];
    }

    myInvestments(list);
    props.navigation.navigate("InvestmentList", { refresh: true });
  };

  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => props.navigation.navigate("InvestmentDetail")}
            style={{ marginTop: 20 }}
          >
            <AntDesign name={"arrowleft"} size={40} color={Colors.RED} />
          </TouchableOpacity>
        }
        containerStyle={Styles.header}
        backgroundColor={Colors.LIGHT_WHITE}
        centerComponent={
          <Image
            source={require("../../../assets/icon.png")}
            style={Styles.headerImg}
          />
        }
        rightComponent={
          <View style={{ marginTop: 20, marginRight: 10 }}>
            <AntDesign name={"shoppingcart"} size={40} color={Colors.RED} />
          </View>
        }
      />
      {isFetching && (
        <View style={Styles.loading}>
          <ActivityIndicator color={Colors.BLACK} size="large" />
        </View>
      )}
      <ScrollView>
        <View style={styles.education}>
          <View style={styles.education_sec}>
            <Text style={styles.child_text}>{investment.investmentPlan}</Text>
          </View>

          <View style={styles.child_sec}>
            <MyImage
              width="112"
              height="118"
              svg={true}
              url={investment.planImagePath}
            />
          </View>
        </View>

        <View style={styles.formsec}>
          <EvilIcons name="search" size={30} color="#CD2700" />
          <TextInput
            ref={searchInput}
            style={[styles.Midcap, { width: "90%" }]}
            placeholder={""}
            onChangeText={(value) => searchResults(value)}
            value={search}
          />
        </View>

        <Text style={styles.results}>{funds.length} results</Text>

        {/* Axis Asset Management Company Ltd */}
        {funds.map((item, key) => (
          <View key={key} style={styles.axis_asset}>
            <TouchableOpacity
              onPress={() => addRemove(item)}
              style={styles.company}
            >
              <Image
                source={{
                  uri: `https://sipfund.sfo2.digitaloceanspaces.com/product-AMC-images/${item.productAMCImage}`,
                }}
                style={styles.axisimg}
              />
              <View style={styles.management}>
                <Text style={styles.axis}>{item.productName}</Text>
                <View>
                  <Text numberOfLines={1} style={styles.moderately}>
                    {item.Category}
                  </Text>
                  <Text style={styles.moderately}>{item.productISIN}</Text>
                </View>
              </View>
              <View style={styles.icon}>
                <TouchableOpacity
                  onPress={() => {
                    fundDetails(getFormattedItem(item));
                    props.navigation.navigate("FundsDetails", {
                      fromScreen: "InvestmentSearch",
                    });
                  }}
                >
                  <AntDesign name="right" size={30} color="#838280" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  axis_asset: {
    marginHorizontal: 20,
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
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.GREY_1,
  },
  company: {
    flexDirection: "row",
  },
  management: {
    marginLeft: 15,
    width: "75%",
  },
  axis: {
    fontSize: 15,
  },
  moderately: {
    fontSize: 12,
    color: Colors.DEEP_GRAY,
    marginHorizontal: 5,
  },
  axisimg: {
    height: 39,
    width: 39,
    resizeMode: "contain",
  },
  adityabirla_img: {
    height: 24,
    width: 47,
  },
  icon: {
    position: "absolute",
    right: 0,
    marginTop: 10,
  },
  education: {
    flexDirection: "row",
    borderColor: Colors.GRAY_LIGHT,
    marginBottom: 20,
    padding: 20,
    backgroundColor: Colors.WHITE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  child_sec: { width: "30%" },
  education_sec: {
    width: "70%",
  },
  goals_2: {
    height: 112,
    width: 118,
  },
  child: {
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 20,
    color: Colors.DEEP_GRAY,
  },
  child_text: {
    fontSize: 22,
    color: Colors.RED,
    paddingTop: 10,
    fontWeight: "bold",
  },
  formsec: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 50,
    borderColor: Colors.DEEP_GRAY,
    marginHorizontal: 20,
    padding: 10,
  },
  Midcap: {
    fontSize: 18,
    paddingLeft: 10,
  },
  results: {
    fontSize: 12,
    marginLeft: 50,
    marginTop: 5,
    color: Colors.DEEP_GRAY,
  },
});
const mapStateToProps = (state) => ({
  token: state.auth.token,
  users: state.auth.users,
  investment: state.investmentplan.investment,
  isFetching: state.addmorefunds.isFetching,
  myInvestlist: state.investmentplan.myInvestlist,
  funds: state.addmorefunds.funds,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { AddMoreFundsActions } = require("../../store/AddMoreFundsRedux");
  const { InvestmentPlanActions } = require("../../store/InvestmentPlanRedux");
  const { FundDetailActions } = require("../../store/FundDetailRedux");
  return {
    ...stateProps,
    ...ownProps,
    resetFunds: () => {
      AddMoreFundsActions.resetFunds(dispatch);
    },
    fetchFunds: (params, token) => {
      AddMoreFundsActions.fetchFunds(dispatch, params, token);
    },
    myInvestments: (data) => {
      InvestmentPlanActions.myInvestments(dispatch, data);
    },
    fundDetails: (data) => {
      FundDetailActions.fundDetails(dispatch, data);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(InvestmentSearchScreens);
