import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { VictoryPie, VictoryTooltip } from "victory-native";
import Cart from "../../components/Cart";
import Svg, { G } from "react-native-svg";
import { connect } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Header } from "react-native-elements";
import { Colors } from "../../common";

const screenWidth = Dimensions.get("window").width;

const Portfolio = (props) => {
  const { token, user, getPortfolioDetail, portfolioList, isFetching } = props;
  const [activeIndex1, setActiveIndex1] = useState(null);
  const [activeIndex2, setActiveIndex2] = useState(null);
  const [activeIndex3, setActiveIndex3] = useState(null);
  const [selectedCategory1, setSelectedCategory1] = useState(null);
  const [selectedCategory2, setSelectedCategory2] = useState(null);
  const [selectedCategory3, setSelectedCategory3] = useState(null);
  const [showAllStocks, setShowAllStocks] = useState(false);

  useEffect(() => {
    const postData = { pan: user.pan };
    getPortfolioDetail(postData, token);
  }, []);

  // Color palette for segments
  const getColorForIndex = (index) => {
    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD"];
    return colors[index % colors.length];
  };

  // Format data for VictoryPie - Broad Categories
  const chartData1 = portfolioList?.broadCategoryPercentages
    ? Object.entries(portfolioList.broadCategoryPercentages).map(
        ([name, value], index) => ({
          x: name,
          y: value,
          color: getColorForIndex(index),
        })
      )
    : [];

  // Format data for VictoryPie - Category Name Percentages
  const chartData2 = portfolioList?.categoryNamePercentages
    ? Object.entries(portfolioList.categoryNamePercentages).map(
        ([name, value], index) => ({
          x: name,
          y: value,
          color: getColorForIndex(index),
        })
      )
    : [];

  // Format data for VictoryPie - Sector List
  const chartData3 = portfolioList?.sectorList
    ? Object.entries(portfolioList.sectorList).map(([name, data], index) => ({
        x: name,
        y: data.percentage,
        color: getColorForIndex(index),
      }))
    : [];

  // Handle segment press for Chart 1
  const handleSegmentPress1 = (event, props) => {
    setActiveIndex1(props.index);
    setSelectedCategory1(props.datum.x);
  };

  // Handle segment press for Chart 2
  const handleSegmentPress2 = (event, props) => {
    setActiveIndex2(props.index);
    setSelectedCategory2(props.datum.x);
  };

  // Handle segment press for Chart 3
  const handleSegmentPress3 = (event, props) => {
    setActiveIndex3(props.index);
    setSelectedCategory3(props.datum.x);
  };

  // Handle list item press for Chart 1
  const handleListItemPress1 = (index, category) => {
    setActiveIndex1(index);
    setSelectedCategory1(category);
  };

  // Handle list item press for Chart 2
  const handleListItemPress2 = (index, category) => {
    setActiveIndex2(index);
    setSelectedCategory2(category);
  };

  // Handle list item press for Chart 3
  const handleListItemPress3 = (index, category) => {
    setActiveIndex3(index);
    setSelectedCategory3(category);
  };

  // Handle "More..." button press
  const handleShowMore = () => {
    setShowAllStocks(!showAllStocks);
  };

  // Get the number of stocks to display
  const stocksToShow = showAllStocks
    ? portfolioList?.groupedStocks || []
    : portfolioList?.groupedStocks?.slice(0, 20) || [];

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
      <ScrollView>
        <View style={styles.switch_sec}>
          <Text style={styles.transaction}>Portfolio summary</Text>
        </View>
        <View style={styles.scrollContainer}>
          {isFetching ? (
              // Show loader while data is being fetched
              <View style={styles.loaderContainer}>
                <ActivityIndicator color={Colors.RED} size="large" />
                <Text>Generating your portfolio report. Please wait a moment.</Text>
              </View>
            ) : (
              <>
                {/* Chart 1 - Category Distribution */}
                <View style={styles.transaction_sec}>
                  <Text style={styles.title}>Category Distribution</Text>
                </View>
                <View style={styles.chartContainer}>
                  <Svg width={screenWidth} height={300}>
                    <G translateX={screenWidth / 2} translateY={150}>
                      <VictoryPie
                        data={chartData1}
                        width={screenWidth}
                        height={300}
                        innerRadius={80}
                        padAngle={2}
                        animate={{ duration: 500 }}
                        colorScale={chartData1.map((item) => item.color)}
                        events={[
                          {
                            target: "data",
                            eventHandlers: {
                              onPressIn: handleSegmentPress1,
                            },
                          },
                        ]}
                        style={{
                          data: {
                            fillOpacity: ({ index }) =>
                              activeIndex1 === null || index === activeIndex1 ? 1 : 0.5,
                          },
                        }}
                        labelComponent={
                          <VictoryTooltip
                            renderInPortal={false}
                            flyoutStyle={{ fill: "white" }}
                          />
                        }
                      />
                    </G>
                  </Svg>
                  <View style={styles.centerTextContainer}>
                    <Text style={styles.centerValue}>
                      {selectedCategory1
                        ? `${chartData1.find((d) => d.x === selectedCategory1)?.y.toFixed(1)}%`
                        : `${chartData1.reduce((sum, item) => sum + item.y, 0).toFixed(1)}%`}
                    </Text>
                    <Text style={styles.centerLabel}>
                      {selectedCategory1 || "Category"}
                    </Text>
                  </View>
                </View>

                {/* Clickable List for Chart 1 */}
                <View style={styles.listContainer}>
                  {chartData1.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.listItem,
                        activeIndex1 === index && styles.activeListItem,
                      ]}
                      onPress={() => handleListItemPress1(index, item.x)}
                    >
                      <View
                        style={[styles.listColor, { backgroundColor: item.color }]}
                      />
                      <Text style={styles.listText}>
                        {item.x}: {item.y.toFixed(1)}%
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Chart 2 - Market Cap Distribution */}
                <View style={styles.transaction_sec}>
                  <Text style={styles.title}>Market Cap Distribution</Text>
                </View>
                <View style={styles.chartContainer}>
                  <Svg width={screenWidth} height={300}>
                    <G translateX={screenWidth / 2} translateY={150}>
                      <VictoryPie
                        data={chartData2}
                        width={screenWidth}
                        height={300}
                        innerRadius={80}
                        padAngle={2}
                        animate={{ duration: 500 }}
                        colorScale={chartData2.map((item) => item.color)}
                        events={[
                          {
                            target: "data",
                            eventHandlers: {
                              onPressIn: handleSegmentPress2,
                            },
                          },
                        ]}
                        style={{
                          data: {
                            fillOpacity: ({ index }) =>
                              activeIndex2 === null || index === activeIndex2 ? 1 : 0.5,
                          },
                        }}
                        labelComponent={
                          <VictoryTooltip
                            renderInPortal={false}
                            flyoutStyle={{ fill: "white" }}
                          />
                        }
                      />
                    </G>
                  </Svg>
                  <View style={styles.centerTextContainer}>
                    <Text style={styles.centerValue}>
                      {selectedCategory2
                        ? `${chartData2.find((d) => d.x === selectedCategory2)?.y.toFixed(1)}%`
                        : `${chartData2.reduce((sum, item) => sum + item.y, 0).toFixed(1)}%`}
                    </Text>
                    <Text style={styles.centerLabel}>
                      {selectedCategory2 || "Market Cap"}
                    </Text>
                  </View>
                </View>

                {/* Clickable List for Chart 2 */}
                <View style={styles.listContainer}>
                  {chartData2.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.listItem,
                        activeIndex2 === index && styles.activeListItem,
                      ]}
                      onPress={() => handleListItemPress2(index, item.x)}
                    >
                      <View
                        style={[styles.listColor, { backgroundColor: item.color }]}
                      />
                      <Text style={styles.listText}>
                        {item.x}: {item.y.toFixed(1)}%
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Chart 3 - Sectors Distribution */}
                <View style={styles.transaction_sec}>
                  <Text style={styles.title}>Sectors Distribution</Text>
                </View>
                <View style={styles.chartContainer}>
                  <Svg width={screenWidth} height={300}>
                    <G translateX={screenWidth / 2} translateY={150}>
                      <VictoryPie
                        data={chartData3}
                        width={screenWidth}
                        height={300}
                        innerRadius={80}
                        padAngle={2}
                        animate={{ duration: 500 }}
                        colorScale={chartData3.map((item) => item.color)}
                        events={[
                          {
                            target: "data",
                            eventHandlers: {
                              onPressIn: handleSegmentPress3,
                            },
                          },
                        ]}
                        style={{
                          data: {
                            fillOpacity: ({ index }) =>
                              activeIndex3 === null || index === activeIndex3 ? 1 : 0.5,
                          },
                        }}
                        labelComponent={
                          <VictoryTooltip
                            renderInPortal={false}
                            flyoutStyle={{ fill: "white" }}
                          />
                        }
                      />
                    </G>
                  </Svg>
                  <View style={styles.centerTextContainer}>
                    <Text style={styles.centerValue}>
                      {selectedCategory3
                        ? `${chartData3.find((d) => d.x === selectedCategory3)?.y.toFixed(1)}%`
                        : `${chartData3.reduce((sum, item) => sum + item.y, 0).toFixed(1)}%`}
                    </Text>
                    <Text style={styles.centerLabel}>
                      {selectedCategory3 || "Sectors"}
                    </Text>
                  </View>
                </View>

                {/* Clickable List for Chart 3 */}
                <View style={styles.listContainer}>
                  {chartData3.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.listItem,
                        activeIndex3 === index && styles.activeListItem,
                      ]}
                      onPress={() => handleListItemPress3(index, item.x)}
                    >
                      <View
                        style={[styles.listColor, { backgroundColor: item.color }]}
                      />
                      <Text style={styles.listText}>
                        {item.x}: {item.y.toFixed(1)}%
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              
                {/* Table-Style List for Grouped Stocks */}
                
                <View style={styles.transaction_sec}>
                  <Text style={styles.title}>Stock Holdings</Text>
                </View>
                <View style={styles.tableContainer}>
                  <View style={styles.tableHeader}>
                    <Text style={styles.headerText}>Name</Text>
                    <Text style={styles.headerText}>Percentage</Text>
                  </View>
                  {/* Render the list using map */}
                  {stocksToShow.map((item, index) => (
                    <View key={index} style={styles.tableRow}>
                      <Text style={styles.rowText}>{item.Name}</Text>
                      <Text style={styles.rowText}>
                        {item.PercentageOfTotal.toFixed(2)}%
                      </Text>
                    </View>
                  ))}
                  {portfolioList?.groupedStocks?.length > 20 && (
                    <TouchableOpacity
                      style={styles.moreButton}
                      onPress={handleShowMore}
                    >
                      <Text style={styles.moreButtonText}>
                        {showAllStocks ? "Show Less" : "Show More..."}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </>
            )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  switch_sec: {
    backgroundColor: Colors.RED,
  },
  logimg: {
    height: 65,
    width: 203,
    marginTop: 10,
  },
  transaction_sec: {
    backgroundColor: '#C3CFD9',
  },
  transaction: {
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: Colors.WHITE,
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
  scrollContainer: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
    padding: 5,
    color: Colors.BLACK,
  },
  chartContainer: {
    position: "relative",
    height: 300,
    width: "100%",
    marginBottom: 24,
  },
  centerTextContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -30 }],
    alignItems: "center",
  },
  centerValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.DEEP_GRAY,
  },
  centerLabel: {
    fontSize: 16,
    color: Colors.GRAY_LIGHT,
  },
  listContainer: {
    width: "100%",
    marginBottom: 24,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginVertical: 4,
    borderRadius: 8,
    backgroundColor: "#f8f8f8",
  },
  activeListItem: {
    backgroundColor: "#e0e0e0",
  },
  listColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  listText: {
    fontSize: 16,
    color: Colors.DEEP_GRAY,
  },
  tableContainer: {
    width: "100%",
    marginBottom: 24,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: Colors.LIGHT_WHITE,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY_LIGHT,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.DEEP_GRAY,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY_LIGHT,
  },
  rowText: {
    fontSize: 14,
    color: Colors.DEEP_GRAY,
  },
  moreButton: {
    padding: 12,
    alignItems: "center",
    backgroundColor: Colors.RED,
    borderRadius: 8,
    marginTop: 12,
  },
  moreButtonText: {
    fontSize: 16,
    color: Colors.WHITE,
    fontWeight: "bold",
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