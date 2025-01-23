import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Header } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import Cart from "../../components/Cart";
import { Colors } from "../../common";
import Button from "../../components/Atom/Button/Button";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { BarChart, PieChart } from "react-native-chart-kit";

const Portfolio = (props) => {
  
  const { token, user, getPortfolioDetail, isFetching, portfolioList } = props;

  useEffect(() => {
    const postData = {"pan":user.pan};
    getPortfolioDetail(postData, token);
  }, []);

  useEffect(() => {
    console.log('portfolioList::', portfolioList);
  }, [portfolioList]);

  // Function to generate random colors
  const generateRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
      colors.push(randomColor);
    }
    return colors;
  };

  // Generate random colors based on the number of keys in the data
  const randomColors1 = generateRandomColors(Object.keys(portfolioList.broadCategoryPercentages).length);
  const randomColors2 = generateRandomColors(Object.keys(portfolioList.categoryNamePercentages).length);

  const pieData1 = portfolioList?.broadCategoryPercentages
  ? Object.keys(portfolioList.broadCategoryPercentages).map((key, index) => ({
      name: key,
      value: portfolioList.broadCategoryPercentages[key],
      color: randomColors1[index],
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    }))
  : [];

const pieData2 = portfolioList?.categoryNamePercentages
  ? Object.keys(portfolioList.categoryNamePercentages).map((key, index) => ({
      name: key,
      value: portfolioList.categoryNamePercentages[key],
      color: randomColors2[index],
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    }))
  : [];

  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => props.navigation.navigate("dashboard")}
            style={{ marginTop: 20 }}
          >
            <AntDesign name={"arrowleft"} size={30} color={Colors.RED} />
          </TouchableOpacity>
        }
        rightComponent={
          <View style={{ marginTop: 0 }}>
            <Cart
              nav={() => {
                props.navigation.navigate("TopRatedList", {
                  fromScreen: "Switch",
                });
              }}
            />
          </View>
        }
        backgroundColor={Colors.LIGHT_WHITE}
        containerStyle={styles.header}
        centerComponent={
          <Image
            source={require("../../../assets/icon.png")}
            style={styles.logimg}
          />
        }
      />
      <ScrollView style={styles.containerScroll}>
        <View style={styles.switch_sec}>
          <Text style={styles.transaction}>Portfolio</Text>
        </View>
        <View>
          <Text>chat1</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <PieChart
            donut={true}
            isThreeD
            showText
            data={pieData1}
            width={responsiveWidth(90)}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="value"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            innerRadius={60}  
          />
        </View>
        <View>
          <Text>chat2</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <PieChart
            donut
            isThreeD
            showText
            data={pieData2}
            width={responsiveWidth(90)}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="value"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            innerRadius={60}  
          />
          {/* <Text style={styles.noDataText}>No SIPs to show Summary.</Text> */}
        </View>
      </ScrollView>
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
  switch_sec: {
    backgroundColor: Colors.RED,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    fontSize: 18,
    color: Colors.GRAY_LIGHT,
  },
  noDataText: {
    textAlign: 'center',
    color: Colors.GRAY_LIGHT,
    marginVertical: 20,
    fontSize: 16,
  },
  transaction: {
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: Colors.WHITE,
  },
  tab_sec: {
    flexDirection: "row",
  },
  tab1: {
    width: "50%",
    alignItems: "center",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.WHITE,
  },
  tab2: {
    width: "50%",
    alignItems: "center",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.RED,
  },
  switch: {
    color: Colors.WHITE,
    fontSize: 13,
  },
  switchAct: {
    color: Colors.GREY_1,
    fontSize: 13,
  },
  fund_sec: {
    backgroundColor: Colors.WHITE,
    marginHorizontal: 15,
    marginTop: 10,
  },
  axis_sec: {
    backgroundColor: "#838793",
  },
  axis: {
    fontSize: 16,
    color: Colors.WHITE,
    marginLeft: 10,
    marginVertical: 10,
  },
  growth_sec: {
    padding: 10,
  },
  axis_treasury: {
    fontSize: 13,
    marginBottom: 10,
  },
  value_sec: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  folio: {
    fontSize: 15,
    color: Colors.DEEP_GRAY,
  },
  scheme_sec: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  select: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.DEEP_GRAY,
  },
  units_sec: {
    flexDirection: "row",
    width: "50%",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  amount: {
    fontSize: 12,
    color: Colors.DEEP_GRAY,
  },
  input_box: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  inputsec: {
    borderBottomWidth: 1,
    borderColor: Colors.DEEP_GRAY,
    width: "60%",
    fontSize: 16,
  },
  botton_box: {
    width: "30%",
    backgroundColor: Colors.RED,
    paddingVertical: 10,
  },
  get_otp: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  disabledBox: {
    width: "30%",
    backgroundColor: Colors.LIGHT_RED1,
    paddingVertical: 10,
  },
  disabled: {
    color: Colors.GRAY_LIGHT,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  botton_box1: {
    backgroundColor: Colors.RED,
    paddingVertical: 10,
    marginVertical: 20,
    marginHorizontal: 15,
  },
  botton_box2: {
    backgroundColor: Colors.RED,
    paddingVertical: 10,
    marginVertical: 20,
    marginHorizontal: 15,
  },
  add: {
    color: Colors.WHITE,
    fontSize: 16,
    textAlign: "center",
    width: 100
  },
  proceed: {
    color: Colors.WHITE,
    fontSize: 16,
    textAlign: "center",
  },
  listStyle: {
    backgroundColor: Colors.WHITE, // Background color of the list
    marginVertical: 5,             // Space between list items vertically
    marginHorizontal: 10,          // Space between list items horizontally
    padding: 10,                   // Inner padding for better spacing
    borderWidth: 1,                // Border thickness
    borderColor: 'black',          // Border color
    borderRadius: 5,               // Rounded corners
    shadowColor: '#000',           // Shadow color for a 3D effect
    shadowOffset: { width: 0, height: 2 }, // Shadow direction
    shadowOpacity: 0.2,            // Shadow transparency
    shadowRadius: 3,               // Shadow spread
    elevation: 2,                  // For shadow on Android
  },

});

const mapStateToProps = (state) => ({
  portfolioList: state.portfolio.portfolioList,
  isFetching: state.portfolio.isFetching,
  token: state.auth.token,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => {
  const { PortfolioRedux } = require("../../store/PortfolioRedux");
  return {
    getPortfolioDetail: (params, token) => {
      PortfolioRedux.getPortfolioDetail(dispatch, params, token);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);