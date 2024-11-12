/** @format */

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
  BackHandler,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {Header} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import Cart from '../../components/Cart';
import moment from 'moment';
import {Colors} from '../../common';
import SiteApis from '../../services/SiteApis';

const width = Dimensions.get('window').width;

function DashboardScreen(props) {
  const {
    steps,
    summaryRetrieve,
    goalSummary,
    goalSummaryRetrieve,
    token,
    users,
  } = props;

  const [currentValue, setCurrentValue] = useState(0);
  const [InvestedValue, setInvestedValue] = useState(0);
  const [ProfitLoss, setProfitLoss] = useState(0);
  const [DashboardData, setDashboardData] = useState(null);
  useEffect(() => {
    // Check if token exists before making API calls
    if (token) {
      // Define the phoneNumber based on the user's mobile number
      const data = {phoneNumber: users?.mobileNo};

      // Asynchronous function to call APIs
      const fetchData = async () => {
        try {
          // Call goalSummary and goalSummaryRetrieve (assuming these are async functions)
          await goalSummary(data, token);
          await goalSummaryRetrieve(data, token);

          // Log the current steps (assuming steps is updated correctly in your state)
          console.log('Current steps', steps);

          // Make the API call to /investments/dashboard
          const apiData = await SiteApis.apiGetCall(
            '/investments/dashboard',
            data,
            token,
          );
          // Log the data received from the API call
          setDashboardData(apiData?.data);

          console.log('API data:', apiData);

          // If needed, update the state or handle the response here
          // setSomeState(apiData);  // Example, if you want to set the response to state
        } catch (error) {
          console.error('Error during API calls:', error);
        }
      };

      // Call the fetchData function to make the requests
      fetchData();
    }
  }, [token]); // Re-run when token or users?.mobileNo changes

  useEffect(() => {
    if (DashboardData) {
      console.log('Updated DashboardData', DashboardData);
      setProfitLoss(
        (
          parseFloat(DashboardData.currentValue.toFixed(2)) -
          parseFloat(DashboardData.totalInvestment.toFixed(2))
        ).toFixed(2),
      );
    }
  }, [DashboardData]);

  useEffect(() => {
    const backAction = () => {
      props.navigation.navigate('Home');
      return true;
    };

    const backHandlerSubscription = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandlerSubscription.remove(); // Cleanup the event listener
    };
  }, []);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', getData);
    return unsubscribe;
  }, [summaryRetrieve]);

  const getData = () => {
    if (summaryRetrieve?.currentValue && summaryRetrieve?.totalInvestment) {
      setCurrentValue(parseFloat(summaryRetrieve.currentValue.toFixed(2)));
      setInvestedValue(parseFloat(summaryRetrieve.totalInvestment.toFixed(2)));
    } else {
      setCurrentValue(0);
      setInvestedValue(0);
      setProfitLoss(0);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => props.navigation.toggleDrawer()}
            style={{marginTop: 20}}>
            <Entypo name={'menu'} size={30} color={Colors.RED} />
          </TouchableOpacity>
        }
        rightComponent={
          <Cart
            nav={() => {
              props.navigation.navigate("TopRatedFunds",{screen : 'TopRatedList',params : {
                fromScreen: 'dashboard',
              }});
            }}
          />
        }
        backgroundColor={Colors.LIGHT_WHITE}
        containerStyle={styles.header}
        centerComponent={
          <Image
            source={require('../../../assets/icon.png')}
            style={styles.logimg}
          />
        }
      />
      <ScrollView style={styles.containerScroll}>
        <View style={styles.education1}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.child5}>Summary</Text>
            <Text style={styles.value}>
              Value as of {moment(new Date()).format('DD-MM-YYYY')}
            </Text>
            {DashboardData ? (
              <Text style={styles.rupees}>
                ₹ {DashboardData.currentValue.toFixed(2)}
              </Text>
            ) : (
              <ActivityIndicator size="large" color={Colors.RED} />
            )}
            <Text style={styles.value}>Current Value</Text>
          </View>

          <View style={styles.value_sec}>
            <View style={styles.Profit}>
              {DashboardData ? (
                <Text style={styles.rupees}>
                  ₹ {DashboardData.netTotalInvestment.toFixed(2)}
                </Text>
              ) : (
                <ActivityIndicator size="large" color={Colors.RED} />
              )}
              <Text style={styles.investment2}>Investment</Text>
            </View>
            <View style={styles.Profit}>
              {DashboardData ? (
                <Text style={styles.rupees}>
                  ₹ {ProfitLoss}
                </Text>
              ) : (
                <ActivityIndicator size="large" color={Colors.RED} />
              )}
              <Text style={styles.investment2}>Profit/Loss</Text>
            </View>
          </View>
        </View>

        {/* Holdings Section */}
        <View style={styles.transaction_sec}>
          <Text style={styles.transaction}>Holdings</Text>
        </View>

        <View style={styles.holdings_sec}>
          <TouchableOpacity
            onPress={() => {
              if (steps > 5) {
                // If steps are greater than 5, navigate to Goals
                props.navigation.navigate('Hold', {screen: 'Goals'});
              } else {
                // If steps are 4 or less
                if (steps < 4) {
                  // If steps are less than 4, navigate to RegisterDetails
                  Alert.alert(
                    'Not Allowed!',
                    'You have no holdings. Please complete the account opening process and upload the required documents. Do you want to continue?',
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {
                        text: 'YES',
                        onPress: () =>
                          props.navigation.navigate('Reg', {
                            screen: 'RegisterDetails',
                          }),
                      },
                    ],
                  );
                } else {
                  // If steps are 4 or greater but less than or equal to 5, navigate to UploadDocument
                  Alert.alert(
                    'Not Allowed!',
                    "You haven't completed the necessary document uploads. Do you want to continue?",
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {
                        text: 'YES',
                        onPress: () =>
                          props.navigation.navigate('Reg', {
                            screen: 'UploadDocument',
                          }),
                      },
                    ],
                  );
                }
              }
            }}>
            <View style={styles.Switch_sec}>
              <View style={styles.box}>
                <Image
                  source={require('../../../assets/mutual_7.png')}
                  style={styles.fundsmg}
                />
              </View>
              <Text style={styles.transaction}>Holdings</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.navigation.navigate('ExternalHolding')}>
            <View style={styles.Switch_sec}>
              <View style={styles.box}>
                <Image
                  source={require('../../../assets/mutual_8.png')}
                  style={styles.fundsmg}
                />
              </View>
              <Text style={styles.transaction}>External</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Transaction Section */}
        <View style={styles.transaction_sec}>
          <Text style={styles.transaction}>Transaction</Text>
        </View>

        <View style={styles.history_sec}>
          <TouchableOpacity
            onPress={() => {
              if (steps > 5) {
                // If steps are greater than 5, navigate to the Switch screen
                props.navigation.navigate('Switch');
              } else {
                // If steps are 4 or less
                if (steps < 4) {
                  // If steps are less than 4, navigate to RegisterDetails
                  Alert.alert(
                    'Not Allowed!',
                    'You have no holdings to switch. Please complete the account opening process. Do you want to continue?',
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {
                        text: 'YES',
                        onPress: () =>
                          props.navigation.navigate('Reg', {
                            screen: 'RegisterDetails',
                          }),
                      },
                    ],
                  );
                } else {
                  // If steps are between 4 and 5 (inclusive), navigate to UploadDocument
                  Alert.alert(
                    'Not Allowed!',
                    'You haven’t completed the document upload process. Do you want to continue?',
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {
                        text: 'YES',
                        onPress: () =>
                          props.navigation.navigate('Reg', {
                            screen: 'UploadDocument',
                          }),
                      },
                    ],
                  );
                }
              }
            }}>
            <View style={styles.Switch_sec}>
              <View style={styles.box}>
                <Image
                  source={require('../../../assets/mutual_10.png')}
                  style={styles.fundsmg}
                />
              </View>
              <Text style={styles.transaction}>Switch</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (steps > 5) {
                // If steps are greater than 5, navigate to the Redeem screen
                props.navigation.navigate('Redeem');
              } else {
                // If steps are 4 or less
                if (steps < 4) {
                  // If steps are less than 4, navigate to RegisterDetails
                  Alert.alert(
                    'Not Allowed!',
                    'You have no holdings to redeem. Please complete the account opening process. Do you want to continue?',
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {
                        text: 'YES',
                        onPress: () =>
                          props.navigation.navigate('Reg', {
                            screen: 'RegisterDetails',
                          }),
                      },
                    ],
                  );
                } else {
                  // If steps are between 4 and 5 (inclusive), navigate to UploadDocument
                  Alert.alert(
                    'Not Allowed!',
                    'You haven’t completed the document upload process. Do you want to continue?',
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {
                        text: 'YES',
                        onPress: () =>
                          props.navigation.navigate('Reg', {
                            screen: 'UploadDocument',
                          }),
                      },
                    ],
                  );
                }
              }
            }}>
            <View style={styles.Switch_sec}>
              <View style={styles.box}>
                <Image
                  source={require('../../../assets/mutual_6.png')}
                  style={styles.fundsmg}
                />
              </View>
              <Text style={styles.transaction}>Redeem</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (steps > 5) {
                // If steps are greater than 5, navigate to TransactionHistory
                props.navigation.navigate('Hamburg', {
                  screen: 'TransactionHistory',
                });
              } else {
                // If steps are 4 or less
                if (steps < 4) {
                  // If steps are less than 4, navigate to RegisterDetails
                  Alert.alert(
                    'Not Allowed!',
                    'You have no holdings. Please complete the account opening process. Do you want to continue?',
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {
                        text: 'YES',
                        onPress: () =>
                          props.navigation.navigate('Reg', {
                            screen: 'RegisterDetails',
                          }),
                      },
                    ],
                  );
                } else {
                  // If steps are between 4 and 5 (inclusive), navigate to UploadDocument
                  Alert.alert(
                    'Not Allowed!',
                    'You haven’t completed the document upload process. Do you want to continue?',
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {
                        text: 'YES',
                        onPress: () =>
                          props.navigation.navigate('Reg', {
                            screen: 'UploadDocument',
                          }),
                      },
                    ],
                  );
                }
              }
            }}>
            <View style={styles.Switch_sec}>
              <View style={styles.box}>
                <Image
                  source={require('../../../assets/mutual_9.png')}
                  style={styles.fundsmg}
                />
              </View>
              <Text style={styles.transaction}>Transaction {'\n'}History</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.history_sec2}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('Hold', {screen: 'Owner'})
            }>
            <View style={styles.Switch_sec}>
              <View style={styles.box}>
                <Image
                  source={require('../../../assets/choice.png')}
                  style={styles.fundsmg}
                />
              </View>
              <Text style={styles.transaction}>Own{'\n'} Choice</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  logimg: {
    height: 65,
    width: 203,
    marginTop: 10,
  },
  investment: {
    color: 'black',
  },
  transaction_sec: {
    backgroundColor: '#C3CFD9',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  transaction: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: 'black',
  },
  history_sec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    marginHorizontal: 10,
  },
  history_sec2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 7,
    marginHorizontal: 10,
  },
  Switch_sec: {
    alignItems: 'center',
  },
  box: {
    backgroundColor: Colors.WHITE,
    marginHorizontal: 10,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.62,
    elevation: 4,
  },
  fundsmg: {
    height: 32,
    width: 36,
  },
  holdings_sec: {
    flexDirection: 'row',
    marginHorizontal: 70,
    marginVertical: 40,
    justifyContent: 'space-between',
  },
  value_sec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  child5: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  value: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.DEEP_GRAY,
  },
  rupees: {
    fontSize: 20,
    color: Colors.RED,
    fontWeight: 'bold',
  },
  Profit: {
    alignItems: 'center',
  },
  investment2: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.DEEP_GRAY,
    marginVertical: 10,
  },
  education1: {
    marginHorizontal: 20,
    borderWidth: 2,
    borderColor: Colors.GRAY_LIGHT,
    marginVertical: 10,
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
  },
});

const mapStateToProps = state => ({
  token: state.auth.token,
  users: state.auth.users,
  steps: state.home.steps,
  summaryRetrieve: state.goals.summaryRetrieve,
});

const mapDispatchToProps = dispatch => {
  const {AuthActions} = require('../../store/AuthRedux');
  const {GoalsActions} = require('../../store/GoalsRedux');

  return {
    logOut: () => {
      AuthActions.logout(dispatch);
    },
    goalSummary: (params, token) => {
      GoalsActions.goalSummary(dispatch, params, token);
    },
    goalSummaryRetrieve: (params, token) => {
      GoalsActions.goalSummaryRetrieve(dispatch, params, token);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);
