/** @format */

import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Linking,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {Styles, Config, Colors, FormValidate} from '../../common';
import {InvestmentLists, MyImage} from '../../components';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Header, Overlay, CheckBox, Input} from 'react-native-elements';
import Cart from '../../components/Cart';
import WebView from 'react-native-webview';
import appsFlyer from 'react-native-appsflyer';
import FastImage from 'react-native-fast-image';
import SuggestionInput from '../../components/Search';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RegistrationActions} from '../../store/RegistrationRedux';
import {useNavigation} from '@react-navigation/native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function HomeScreen(props) {
  const pageActiveGoles = useRef(false);
  const pageActiveInvest = useRef(false);
  const {
    token,
    logOut,
    users,
    profile,
    userDetails,
    pan,
    isFetching,
    error,
    steps,
    home,
    cart,
    getsteps,
    getHomeData,
    cartDetails,
    goalDetails,
    goals,
    singleDetails,
    goalDetail,
    allPlans,
    investments,
    investmentPlans,
    investment,
    emandateLink,
    emandateFetching,
    getProfile,
    clearEmandateLink,
    investmentFetching,
    planFetching,
    summary,
    summaryRetrieve,
    goalSummary,
    goalSummaryRetrieve,
    getUserData,
    fundDetails,
    setdocumentStatus,
    isInn
  } = props;
  // console.log("🚀 ~ HomeScreen ~ investments:", JSON.stringify(investments));

  const [loading, toggleLoading] = useState(false);
  const [webUrl, setWebUrl] = useState('');
  const [webViewActive, setWebViewActive] = useState(false);
  const [showMorePlans, setShowMorePlans] = useState(false);
  const [username, setUsername] = useState('');
  const [isUsernameFetched, setIsUsernameFetched] = useState(false);
  useEffect(() => {
    setWebViewActive(false);
    console.log('STEPS COUNT', steps);
    console.log('MY USER', userDetails);
    setdocumentStatus(); 
    logCurrentStack();
  }, []); 

  // useEffect(()=>{
  //   console.log('USERDATA99', userDetails?.ekycIsDone);
  // },[userDetails]);

  const navigation = useNavigation();

  const logCurrentStack = () => {
    const state = navigation.getState();
    console.log('Current stack', state); // This will log the navigation state, including the routes in the stack
  };

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('USERNAME');
        if (storedUsername) {
          setUsername(storedUsername);
          setIsUsernameFetched(true);
          console.log('Hi', storedUsername);
        }
      } catch (error) {
        console.error('Error retrieving username:', error);
      }
    };

    fetchUsername(); // Initial fetch

    const intervalId = setInterval(() => {
      if (!isUsernameFetched) {
        fetchUsername(); // Only fetch if not fetched yet
      } else {
        clearInterval(intervalId); // Clear the interval if username is fetched
      }
    }, 500); // Poll every 2 seconds

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, [isUsernameFetched]); // Add isUsernameFetched to the dependency array

  const loadUrl = url => {
    setWebViewActive(true);
    setWebUrl(url);
    clearEmandateLink();
  };

  useEffect(() => {
    if (emandateLink && !emandateFetching) {
      setWebViewActive(true);
      loadUrl(emandateLink);
    }
  }, [emandateLink]);

  useEffect(() => {
    const fetchProfileAndNavigate = async () => {
      try {
         await getProfile({ service_request: { iin: users?.IIN } }, token);
      } catch (error) {
        console.error("Error fetching profile:", error);
        // Handle error if needed
      }
    };
  
    if (users?.IIN) {
      fetchProfileAndNavigate();
    }
  }, [users]);
  

  useEffect(() => {
    if (token) {
      getsteps({}, token);
      getHomeData({}, token);
      cartDetails(token);
      allPlans(token);
      goalDetails(token);
      // goalSummary({ phoneNumber: users?.mobileNo }, token);
      // goalSummaryRetrieve({ phoneNumber: users?.mobileNo }, token);
    }
  }, [token]);

  useEffect(() => {
    if (goalDetail && pageActiveGoles.current) {
      pageActiveGoles.current = false;
      props.navigation.navigate('Plan', {
        screen: 'PlanHome',
        params: {toggleLoading},
      });
    }
  }, [goalDetail]);

  useEffect(() => {
    if (investment && pageActiveInvest.current) {
      pageActiveInvest.current = false;
      props.navigation.navigate('Investment', {
        screen: 'InvestmentDetail',
        params: {toggleLoading},
      });
    }
  }, [investment]);

  const [visible, setVisible] = useState(false);
  const [overlay, setOverlay] = useState('');
  const toggleOverlay = value => {
    setOverlay(value);
    setVisible(!visible);
  };

  // useEffect(() => {
  //   console.log("routeName=", props.route.routeName);
  // }, []);

  // const backAction = () => {
  //   if (props.route.routeName === "Home") {
  //     Alert.alert(
  //       "Exit from Sipfund!",
  //       "Do you want to close this application?",
  //       [
  //         {
  //           text: "Cancel",
  //           onPress: () => null,
  //           style: "cancel",
  //         },
  //         { text: "YES", onPress: () => BackHandler.exitApp() },
  //       ]
  //     );
  //     return true;
  //   } else {
  //     props.navigation.navigate("Home");
  //   }
  // };

  // useEffect(() => {
  //   BackHandler.addEventListener("hardwareBackPress", backAction);

  //   return () =>
  //     BackHandler.removeEventListener("hardwareBackPress", backAction);
  // }, []);

  const [currentValue, setCurrentValue] = useState(0);
  const [InvestedValue, setInvestedValue] = useState(0);
  const [ProfitLoss, setProfitLoss] = useState(0);

  useEffect(() => {
    if (summaryRetrieve?.length > 0) {
      var investment = 0;
      var currentVal = 0;
      var proLoss = 0;
      summaryRetrieve?.map((item, index) => {
        investment =
          parseFloat(investment) + parseFloat(item?.investedAmt?.toFixed(2));
        currentVal =
          parseFloat(currentVal) + parseFloat(item?.currentValue?.toFixed(2));
      });
      proLoss = parseFloat(currentVal) - parseFloat(investment);
      setCurrentValue(currentVal?.toFixed(2));
      setInvestedValue(investment?.toFixed(2));
      setProfitLoss(proLoss?.toFixed(2));
    }
  }, [summaryRetrieve]);

  function JustNavigate(){
    console.log("UER",userDetails);  
    if(!isInn){
      props.navigation.navigate("OnBoard",{screen : "ProfileDetailsForm"});
    }else if(userDetails?.ekycIsDone === false && username){
      props.navigation.navigate("Reset", { screen: "EKYC" });
    }else if(userDetails?.ekycIsDone === true && username){
      props.navigation.navigate("Reg",{screen : "UploadDocument"});
    }
  }

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
              props.navigation.navigate('TopRatedFunds', {
                screen: 'TopRatedList',
                params: {fromScreen: 'Home'},
              });
            }}
          />
        }
        backgroundColor={Colors.LIGHT_WHITE}
        containerStyle={Styles.header}
        centerComponent={
          <FastImage
            source={require('../../../assets/icon.png')}
            style={styles.logimg}
          />
        }
      />
      {planFetching ||
        (investmentFetching && (
          <View style={Styles.loading}>
            <ActivityIndicator color={Colors.BLACK} size="large" />
          </View>
        ))}
      <SuggestionInput
        navigate={props.navigation.navigate}
        fundDetails={fundDetails}
      />
      <ScrollView style={styles.containerScroll}>
        {/* <Text>
          {users?.hasOwnProperty("users") ? 1 : 0}
          {props.route.params?.refresh ? "refresh" : "Not"}
          Steps:- {steps}
          IIN:- {users?.IIN}
        </Text> */}
        <>
          {/* <Text>{JSON.stringify(users)}</Text> */}
          {steps && steps < 5 && steps >= 0 && (
            <>
              {(users?.hasOwnProperty('users') && !users?.IIN) ||
                (steps < 5 && (
                  <>
                    <View
                      style={
                        users?.IIN && steps > 5
                          ? styles.home_top_completed
                          : styles.home_top
                      }>
                      <View
                        style={{
                          alignItems: 'center',
                          marginBottom: 20,
                          //alignItems: users?.IIN && steps > 3 ? "flex-start" : "center",
                          flexDirection:
                            users?.IIN && steps > 5 ? 'row' : 'column',
                        }}>
                        <Image
                          source={require('../../../assets/Hello.png')}
                          style={
                            users?.IIN && steps > 5
                              ? styles.Helloimgsmall
                              : styles.Helloimg
                          }
                        />
                        <View
                          style={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                          }}>
                          {users?.pan || props.route.params?.refresh ? (
                            <View
                              style={{
                                alignItems:
                                  users?.IIN && steps > 5
                                    ? 'flex-start'
                                    : 'center',
                                marginTop: 12,
                              }}>
                              <Text
                                style={[
                                  styles.HelloIinvestor,
                                  {
                                    opacity: users?.IIN && steps > 3 ? 0.5 : 1,
                                  },
                                ]}>
                                {username && steps > 5
                                  ? 'Congratulations'
                                  : username
                                  ? `Hello, ${username}`
                                  : `Hello, Investor`}
                              </Text>
                              <Text
                                style={[
                                  styles.HelloIinvestor1,
                                  {
                                    marginTop: users?.IIN && steps > 3 ? 5 : 15,
                                    marginBottom:
                                      users?.IIN && steps > 3 ? 15 : 0,
                                  },
                                ]}>
                                {console.log('YOUR STEPS', steps)}
                                {users?.IIN && steps > 5
                                  ? 'Your Account is Active'
                                  : "You're almost ready to Invest"}
                              </Text>
                            </View>
                          ) : (
                            <></>
                          )}
                          {users?.IIN && steps > 5 ? (
                            <Text
                              onPress={() =>
                                props.navigation.navigate('Hold', {
                                  screen: 'Owner',
                                })
                              }
                              style={styles.startInvestmentText}>
                              + Start Investing
                            </Text>
                          ) : (
                            <TouchableOpacity
                              onPress={() => {
                                if (users?.pan || pan || username) {
                                  JustNavigate();
                                }else {
                                  props.navigation.navigate('HomeScreen', {
                                    screen: 'Pan',
                                  });
                                }
                              }}
                              style={styles.botton_box}>
                              <Text style={styles.get_otp}>
                                {users?.pan || pan || username
                                  ? 'COMPLETE ACCOUNT SETUP'
                                  : 'Create Account'}
                              </Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    </View>
                  </>
                ))}
            </>
          )}
        </>

        {/* plan your goals section */}
        {/* 
        {steps > 5 && (
          <>
            <Text style={styles.Plan}>Holdings</Text>
            <View style={styles.education1}>
              <View style={{ alignItems: "center" }}>
                <Text style={styles.child5}>Summary</Text>
                <Text style={styles.value}>
                  Value as of {moment(new Date()).format("DD-MM-YYYY")}
                </Text>
                <Text style={styles.rupees}>
                  ₹ {currentValue}
                  
                </Text>
                <Text style={styles.value}>Current Value</Text>
              </View>

              <View style={styles.value_sec}>
                <View style={styles.Profit}>
                  <Text style={styles.investment}>{`₹ ${
                    InvestedValue
                    // summary?.summary?.totalinvestment
                    //   ? summary?.summary?.totalinvestment
                    //   : 0
                  }`}</Text>
                  <Text style={styles.investment2}>Investment</Text>
                </View>
                <View style={styles.Profit}>
                  <Text style={styles.investment}>
                    ₹ {ProfitLoss}
                   
                  </Text>
                  <Text style={styles.investment2}>Profit/Loss</Text>
                </View>
              </View>
            </View>
          </>
        )}
        */}

        <Text style={[styles.Plan, {marginTop: 15, marginBottom: -15}]}>
          Top Rated Funds
        </Text>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('TopRatedFunds', {screen: 'TopRatedHome'})
          }>
          <View
            style={[
              styles.education,
              styles.education_roted,
              {marginBottom: 0},
            ]}>
            <View style={styles.child_sec}>
              <FastImage
                source={require('../../../assets/term7.png')}
                style={styles.fund_img}
              />
            </View>
            <View style={styles.education_sec}>
              <Text style={styles.child}>Get Top Rated Funds</Text>
              <Text style={styles.child_text}>
                At SIPFund.com we help you in choosing the best for you!
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.border}></View>

        {/* investment section */}
        <Text style={styles.Plan}>Investment Plans</Text>
        <View>
        <InvestmentLists
          data={showMorePlans ? investments : investments.slice(0, 4)}
          onPress={item => {
            toggleLoading(true);
            investmentPlans(item, token);
            pageActiveInvest.current = true;
          }}
        />
        </View>
        <TouchableOpacity
          style={styles.showMorePlansContainer}
          onPress={() => setShowMorePlans(!showMorePlans)}>
          <Text style={styles.showMorePlansText}>
            {showMorePlans ? 'Show less' : 'Show more'}
          </Text>
        </TouchableOpacity>
        {/*<View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("InvestmentListAll")}
          >
            <View style={styles.all_plan}>
              <Text style={styles.all_plan_text}>See All Investment Plan</Text>
              <AntDesign name="down" size={20} color="#C0392B" />
            </View>
          </TouchableOpacity>
        </View>*/}

        <View style={styles.border}></View>

        {/* Top roted fund section */}
        <Text style={styles.Plan}>Plan Your Goals</Text>
        <ScrollView horizontal={true} style={{marginHorizontal: 16}}>
          {goals.map((item, key) => (
            <TouchableOpacity
              key={key}
              onPress={() => {
                const eventName = 'goals_clicked';

                appsFlyer.logEvent(
                  eventName,
                  item,
                  res => {
                    console.log('######## AppsFlyer #######', res);
                  },
                  err => {
                    console.error('######## AppsFlyer #######', err);
                  },
                );
                toggleLoading(true);
                singleDetails(item, token);
                pageActiveGoles.current = true;
              }}>
              {/* <Text>{JSON.stringify(item.iosgoalImagePath)}</Text> */}
              <View style={styles.education}>
                <View style={styles.child_sec}>
                  <MyImage
                    width="100%"
                    height="130"
                    // svg={Platform.OS == "android" ? false : true}
                    svg={true}
                    url={
                      Platform.OS == 'ios'
                        ? item.iosgoalImagePath
                        : item.goalImagePath
                    }
                  />
                </View>
                <View style={styles.education_sec}>
                  <Text style={styles.child}>{item.goal}</Text>
                  <Text style={styles.child_text}>{item.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.roted_border}></View>
        <View style={styles.border}></View>

        {/* quick access section */}

        <View style={styles.quick_sec}>
          <Text style={styles.quick_text}>Quick Access</Text>
          <ScrollView horizontal={true}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('OtherStackYou', {
                  screen: 'ReferEarn',
                })
              }
              style={[styles.education, styles.quick_access]}>
              <View style={styles.child_sec}>
                <FastImage
                  source={require('../../../assets/term8.png')}
                  style={styles.quick_img}
                />
              </View>
              <View style={styles.education_sec}>
                <Text style={styles.earn}>Refer & Earn</Text>
                <Text style={styles.child_text}>Now earn upto Rs. 5,000/-</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate('Relationship')}
              style={[styles.education, styles.quick_access]}>
              <View style={styles.child_sec}>
                <FastImage
                  source={require('../../../assets/quick_img3.png')}
                  style={styles.quick_img3}
                />
              </View>
              <View style={styles.education_sec}>
                <Text style={styles.earn}>Talk To Experts</Text>
                <Text style={styles.child_text}>
                  Get best advice while investing money
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('Hold', {screen: 'Owner'})
              }
              style={[styles.education, styles.quick_access]}>
              <View style={styles.child_sec}>
                <AntDesign name={'search1'} size={80} color={Colors.RED} />

                {/* <Image
                    source={require("../../../assets/quick_img3.png")}
                    style={styles.quick_img3}
                  /> */}
              </View>
              <View style={styles.education_sec}>
                <Text style={styles.earn}>Own Choice</Text>
                <Text style={styles.child_text}>Make your plan</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* top roted fund */}
        <View style={styles.border}></View>
        <TouchableOpacity onPress={() => props.navigation.navigate('Goals')}>
          <Text style={styles.roted_text}>Any questions?</Text>
        </TouchableOpacity>
        <Text style={{marginLeft: 20, color: 'grey'}}>
          We would love to have your questions!
        </Text>
        <Text
          style={{
            marginHorizontal: 50,
            textAlign: 'center',
            marginTop: 20,
            color: 'black',
          }}>
          SIPFund.com brings 5 things you must know before investing.
        </Text>

        {/* top roted fund sec2 */}
        <ScrollView horizontal={true}>
          <View style={styles.roted_bottom}>
            <View style={styles.amount_sec}>
              <TouchableOpacity
                onPress={() => toggleOverlay('MINIMUM_AMOUNT')}
                style={{alignItems: 'center'}}>
                <FastImage
                  source={require('../../../assets/term9.png')}
                  style={styles.term9}
                />
                <Text style={styles.minimum}>Minimum Amount</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.amount_sec}>
              <TouchableOpacity
                onPress={() => toggleOverlay('LOCK_INS')}
                style={{alignItems: 'center'}}>
                <FastImage
                  source={require('../../../assets/term10.png')}
                  style={styles.term9}
                />
                <Text style={styles.minimum}>Lock-ins</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.amount_sec}>
              <TouchableOpacity
                onPress={() => toggleOverlay('FLEXIBILITY')}
                style={{alignItems: 'center'}}>
                <FastImage
                  source={require('../../../assets/term11.png')}
                  style={styles.Flexibility}
                />
                <Text style={styles.minimum}>Flexibility</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.amount_sec}>
              <TouchableOpacity
                onPress={() => toggleOverlay('PAYMENT_METHODS')}
                style={{alignItems: 'center'}}>
                <FastImage
                  source={require('../../../assets/term12.png')}
                  style={styles.Flexibility}
                />
                <Text style={styles.minimum}>Payment Methods</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.amount_sec}>
              <TouchableOpacity
                onPress={() => toggleOverlay('EASY_WITHDRAWAL')}
                style={{alignItems: 'center'}}>
                <FastImage
                  source={require('../../../assets/term13.png')}
                  style={styles.Flexibility}
                />
                <Text style={styles.minimum}>Easy Withdrawal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <View style={styles.border}></View>

        {/* Faq screen */}
        <View style={styles.mainbox}>
          <Text style={styles.faqs}>FAQ’s</Text>
          <View style={styles.imgbox}>
            <FastImage
              source={require('../../../assets/FAQimg.png')}
              style={styles.FAQimg}
            />
          </View>
          <View style={{alignItems: 'flex-start'}}>
            <View style={styles.singletext}>
              <Entypo name="dot-single" size={40} color="#FFCE00" />
              <Text
                onPress={() =>
                  loadUrl(
                    'https://sipfund.com/SIP-Login/build/app/index.html#/SIPFund_FAQ',
                  )
                }
                style={styles.Mutualfund}>
                What is a Mutual Fund?
              </Text>
            </View>
            <View style={styles.singletext}>
              <Entypo name="dot-single" size={40} color="#FFCE00" />
              <Text
                onPress={() =>
                  loadUrl(
                    'https://sipfund.com/SIP-Login/build/app/index.html#/SIPFund_FAQ',
                  )
                }
                style={styles.Mutualfund}>
                What is Open Ended Fund?
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() =>
              loadUrl(
                'https://sipfund.com/SIP-Login/build/app/index.html#/SIPFund_FAQ',
              )
            }
            style={styles.botton_box}>
            <Text style={styles.get_otp}>MORE FAQ’s</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.border}></View>
        <Text style={styles.knowledge}>Knowledge Centre</Text>

        {/* gallary */}

        <View style={styles.gallary}>
          {/* <View style={styles.qip_sec}> */}
          <TouchableOpacity
            onPress={() =>
              loadUrl(
                'https://sipfund.com/blog/What-Is-a-Qualified-Institutional-Placement.html',
              )
            }
            style={{
              backgroundColor: '#fff',
              elevation: 4,
              borderRadius: 3,
              width: 310,
            }}>
            <FastImage
              source={require('../../../assets/qip_img.png')}
              style={{
                width: '100%',
                height: 200, // Set explicit height
              }}
              resizeMode="contain" // Ensure the entire image is visible
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              loadUrl(
                'https://sipfund.com/blog/What-is-Benchmark-in-mutual-funds.html',
              )
            }
            style={styles.qipimg}>
            <FastImage
              source={require('../../../assets/fundimg.png')}
              style={{
                width: 310,
                aspectRatio: 3.1 / 2,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              loadUrl('https://sipfund.com/blog/What-is-Credit-Rating.html')
            }
            style={styles.qipimg}>
            <FastImage
              source={require('../../../assets/ratingimg.png')}
              style={{
                width: 310,
                aspectRatio: 3.1 / 2,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => loadUrl('https://sipfund.com/SIPFund_Blog.html')}>
          <Text style={styles.view}>View All</Text>
        </TouchableOpacity>
        <View style={styles.border}></View>
      </ScrollView>

      <Overlay
        isVisible={visible && overlay === 'MINIMUM_AMOUNT'}
        overlayStyle={{margin: 10, padding: 0, backgroundColor: '#fff'}}>
        <View
          style={{
            backgroundColor: '#11370a',
            alignItems: 'center',
            paddingVertical: 5,
          }}>
          <FastImage
            source={require('../../../assets/term9.png')}
            style={{width: 56, paddingVertical: 3}}
          />
        </View>
        <View style={{padding: 20}}>
          <Text style={styles.mutual}>
            What is the <Text style={styles.view}>minimal amount</Text> for
            investing in Mutual Funds?
          </Text>
          <Text style={{paddingTop: 10, fontSize: 15, color: 'black'}}>
            The minimum amount required to invest in mutual funds is very low.
            You can start investing in Systematic Investment Plan(SIP) with an
            amount of ₹500 only.
          </Text>
          <TouchableOpacity onPress={() => toggleOverlay('')}>
            <Text
              style={{
                color: '#ff0000',
                paddingTop: 10,
                fontSize: 15,
                textAlign: 'right',
              }}>
              CLOSE
            </Text>
          </TouchableOpacity>
        </View>
      </Overlay>

      <Overlay
        isVisible={visible && overlay === 'LOCK_INS'}
        overlayStyle={{margin: 10, padding: 0, backgroundColor: '#fff'}}>
        <View
          style={{
            backgroundColor: '#12478D',
            alignItems: 'center',
            paddingVertical: 5,
          }}>
          <FastImage
            source={require('../../../assets/term10.png')}
            style={{width: 56, height: 51}}
          />
        </View>
        <View style={{padding: 20}}>
          <Text style={styles.mutual}>
            What is <Text style={styles.view}>lock-in</Text> period in Mutual
            Funds?
          </Text>
          <Text style={{paddingTop: 10, fontSize: 15, color: 'black'}}>
            A lock-in period is a specific period during which an investor is
            not allowed to redeem the units of the mutual fund either partially
            or fully. In an ELSS fund, the lock-in period is 3 years
          </Text>
          <TouchableOpacity onPress={() => toggleOverlay('')}>
            <Text
              style={{
                color: '#ff0000',
                paddingTop: 10,
                fontSize: 15,
                textAlign: 'right',
              }}>
              CLOSE
            </Text>
          </TouchableOpacity>
        </View>
      </Overlay>

      <Overlay
        isVisible={visible && overlay === 'FLEXIBILITY'}
        overlayStyle={{margin: 10, padding: 0, backgroundColor: '#fff'}}>
        <View
          style={{
            backgroundColor: '#12478D',
            alignItems: 'center',
            paddingVertical: 5,
          }}>
          <FastImage
            source={require('../../../assets/choice.png')}
            style={{width: 56, height: 51}}
          />
        </View>
        <View style={{padding: 20}}>
          <Text style={styles.mutual}>
            What is the <Text style={styles.view}>flexibility</Text> that Mutual
            Funds offer?
          </Text>
          <Text style={{paddingTop: 10, fontSize: 15, color: 'black'}}>
            Mutual Funds offer flexibility to investors by means of Systematic
            Investment Plan(SIP), Systematic Withdrawal Plan (SWP), Systematic
            Transfer Plan(STP), Growth Plan,Dividend Payout or Reinvestment
            Plans.They are also affordable as they allow investors to start
            investing with a little amount as low as ₹500.
          </Text>
          <TouchableOpacity onPress={() => toggleOverlay('')}>
            <Text
              style={{
                color: '#ff0000',
                paddingTop: 10,
                fontSize: 15,
                textAlign: 'right',
              }}>
              CLOSE
            </Text>
          </TouchableOpacity>
        </View>
      </Overlay>

      <Overlay
        isVisible={visible && overlay === 'PAYMENT_METHODS'}
        overlayStyle={{margin: 10, padding: 0, backgroundColor: '#fff'}}>
        <View
          style={{
            backgroundColor: '#12478D',
            alignItems: 'center',
            paddingVertical: 5,
          }}>
          <FastImage
            source={require('../../../assets/term12.png')}
            style={{width: 56, height: 51}}
          />
        </View>
        <View style={{padding: 20}}>
          <Text style={styles.mutual}>
            what are the various{' '}
            <Text style={styles.view}>payment methods</Text>
            available for an investorfor making investments?
          </Text>
          <Text style={{paddingTop: 10, fontSize: 15, color: 'black'}}>
            Using SIPfund.com app/portal,an investor can make purchases under
            the following methods
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text>{'\u2022'}</Text>
            <Text style={{flex: 1, paddingLeft: 5, color: 'black'}}>
              NET Banking
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text>{'\u2022'}</Text>
            <Text style={{flex: 1, paddingLeft: 5, color: 'black'}}>
              NEFT/RTGS
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text>{'\u2022'}</Text>
            <Text style={{flex: 1, paddingLeft: 5, color: 'black'}}>UPI</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text>{'\u2022'}</Text>
            <Text style={{flex: 1, paddingLeft: 5, color: 'black'}}>
              Debit Mandate
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text>{'\u2022'}</Text>
            <Text style={{flex: 1, paddingLeft: 5, color: 'black'}}>
              Cheque
            </Text>
          </View>
          <TouchableOpacity onPress={() => toggleOverlay('')}>
            <Text
              style={{
                color: '#ff0000',
                paddingTop: 10,
                fontSize: 15,
                textAlign: 'right',
              }}>
              CLOSE
            </Text>
          </TouchableOpacity>
        </View>
      </Overlay>

      <Overlay
        isVisible={visible && overlay === 'EASY_WITHDRAWAL'}
        overlayStyle={{margin: 10, padding: 0, backgroundColor: '#fff'}}>
        <View
          style={{
            backgroundColor: '#12478D',
            alignItems: 'center',
            paddingVertical: 5,
          }}>
          <FastImage
            so4rce={require('../../../assets/overlay_img.png')}
            style={{width: 56, height: 51}}
          />
        </View>
        <View style={{padding: 20}}>
          <Text style={styles.mutual}>
            Do Mutual Funds allow{' '}
            <Text style={styles.view}>easy withdrawal of amount?</Text>
          </Text>
          <Text style={{paddingTop: 10, fontSize: 15, color: 'black'}}>
            Both Equity and Debt Mutual Funds can be technically withdrawn as
            soon as fund is available for daily sale and repurchase. Of course
            liquidity is one of the biggest advantages of investing in Mutual
            Funds which is not available in many other asset classes. Amount
            redeemed or withdrawn will be credited to investor's bank account
            within 1-4 working days depending on the type of mutual funds.
          </Text>
          <TouchableOpacity onPress={() => toggleOverlay('')}>
            <Text
              style={{
                color: '#ff0000',
                paddingTop: 10,
                fontSize: 15,
                textAlign: 'right',
              }}>
              CLOSE
            </Text>
          </TouchableOpacity>
        </View>
      </Overlay>
      {webViewActive && (
        <View
          style={{
            position: 'absolute',
            backgroundColor: 'white',
            zIndex: 100,
            width,
            height,
          }}>
          <Header
            leftComponent={
              <TouchableOpacity
                onPress={() => {
                  setWebViewActive(false);
                  // clearEmandateLink();
                }}
                style={{marginTop: 20}}>
                <AntDesign name={'arrowleft'} size={30} color={Colors.RED} />
              </TouchableOpacity>
            }
            rightComponent={
              <Cart
                nav={() => {
                  props.navigation.navigate('TopRatedFunds', {
                    screen: 'TopRatedList',
                  });
                }}
              />
            }
            backgroundColor={Colors.LIGHT_WHITE}
            containerStyle={Styles.header}
            centerComponent={
              <FastImage
                source={require('../../../assets/icon.png')}
                style={styles.logimg}
              />
            }
          />
          <WebView source={{uri: webUrl}} javaScriptEnabled={true} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  containerScroll: {
    width: '100%',
  },
  home_top: {
    alignItems: 'center',
  },
  home_top_completed: {
    flexDirection: 'row',
    margin: 10,
  },
  startInvestmentText: {
    color: Colors.LIGHT_RED,
    fontWeight: 'bold',
    fontSize: 14,
  },
  logimg: {
    height: 65,
    width: 203,
    marginTop: 10,
  },
  Helloimg: {
    marginTop: 10,
    height: 120,
    resizeMode: 'contain',
  },
  Helloimgsmall: {
    maxWidth: '30%',
    height: 100,
    // resizeMode: "contain",
  },
  HelloIinvestor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  HelloIinvestor1: {
    fontSize: 14,
    color: 'black',
    opacity: 0.5,
    fontWeight: 'bold',
  },
  Plan: {
    fontSize: 16,
    color: Colors.DEEP_GRAY,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    //paddingVertical: 15,
    marginTop: 15,
  },
  education_top: {
    paddingLeft: 20,
    flexDirection: 'row',
  },
  education: {
    flexDirection: 'row',
    width: Styles.width - 60,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: Colors.GRAY_LIGHT,
    borderRadius: 15,
    marginVertical: 20,
    marginHorizontal: 5,
    //padding: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  education_roted: {
    width: '90%',
    marginHorizontal: 20,
    marginVertical: 30,
  },
  quick_access: {
    borderRadius: 0,
    borderColor: Colors.BLACK,
    borderWidth: 1,
    //maxWidth: 300,
    //maxWidth: "70%",
  },

  child_sec: {width: '30%', marginHorizontal: 10},
  goals_2: {
    height: 145,
    width: 145,
  },
  education_sec: {
    width: '65%',
    marginTop: 10,
  },
  child: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 10,
    color: 'black',
  },
  child_text: {
    fontSize: 16,
    color: Colors.GRAY_LIGHT_1,
    paddingTop: 10,
    paddingLeft: 10,
  },
  border: {
    marginTop: 10,
    height: 4,
    marginHorizontal: 20,
    backgroundColor: Colors.GRAY_LIGHT,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  investment_sec: {
    flexDirection: 'row',
  },
  investment: {
    borderRadius: 20,
    // backgroundColor: Colors.WHITE,
    // width: "30%",
    alignItems: 'center',
    margin: 7,
    shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.23,
    // shadowRadius: 2.62,
    // elevation: 4,
  },
  term: {
    width: '100%',
    height: 113,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  long: {
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  all_plan: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  all_plan_text: {
    fontSize: 16,
    color: Colors.RED,
    fontWeight: 'bold',
  },
  roted_text: {
    fontSize: 20,
    color: Colors.DEEP_GRAY,
    fontWeight: 'bold',
    paddingLeft: 20,
    marginTop: 20,
  },
  fund_img: {
    height: 100,
    aspectRatio: 1,
  },
  quick_sec: {
    backgroundColor: Colors.PINK,
    paddingBottom: 20,
  },

  quick_text: {
    fontSize: 20,
    color: Colors.RED,
    fontWeight: 'bold',
    paddingLeft: 20,
    marginVertical: 20,
  },
  quick_img: {
    height: 94,
    width: 82,
  },
  quick_img2: {
    height: 96,
    width: 96,
  },
  quick_img3: {
    height: 95,
    width: 86,
  },
  earn: {
    color: Colors.RED,
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  ship_text: {
    color: Colors.BLACK,
    textAlign: 'center',
    paddingTop: 10,
  },
  roted_bottom: {
    flexDirection: 'row',
    paddingLeft: 20,
    marginVertical: 30,
  },
  amount_sec: {
    width: 150,
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: Colors.YELLOW_LIGHT,
    marginVertical: 20,
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    alignItems: 'center',
  },
  minimum: {
    fontSize: 13,
    color: Colors.BLACK,
  },
  term9: {
    width: 50,
    height: 66,
    marginVertical: 10,
  },
  Flexibility: {
    width: 75,
    height: 75,
    marginVertical: 10,
  },
  /* Faq screen */
  mainbox: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  logimg: {
    height: 65,
    width: 203,
    marginTop: 10,
  },
  imgbox: {
    alignItems: 'center',
    marginBottom: 20,
  },
  FAQimg: {
    height: 205,
    width: 243,
    marginVertical: 30,
  },
  faqs: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#716D6E',
  },
  singletext: {
    flexDirection: 'row',
    marginTop: 10,
  },
  Mutualfund: {
    fontSize: 20,
    marginTop: 9,
    color: Colors.GREY_1,
  },
  botton_box: {
    alignItems: 'center',
    backgroundColor: Colors.RED,
    width: width - 50,
    paddingVertical: 20,
    marginTop: 20,
    marginBottom: 12,
    borderRadius: 10,
    // borderWidth: 2,
    // borderColor: Colors.DEEP_GRAY,
    marginHorizontal: 10,
  },
  get_otp: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  // gallary
  gallary: {
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
  },
  qipimg: {
    //width: 368,
    //height: 207,
    //marginVertical: 20,
    //margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  knowledge: {
    fontSize: 22,
    color: Colors.DEEP_GRAY,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingBottom: 10,
    marginTop: 20,
  },
  view: {
    fontSize: 15,
    textAlign: 'center',
    color: Colors.RED,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  mutual: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  emaMainbox: {
    margin: 10,
    padding: 10,
  },
  emaAmc: {
    fontSize: 18,
    marginLeft: 15,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  emaMutual_fund: {
    fontSize: 15,
    marginVertical: 10,
  },
  emaAmcCheck: {
    backgroundColor: Colors.TRANSPARENT,
    fontSize: 15,
    borderWidth: 0,
    margin: 0,
    marginLeft: -10,
    padding: 0,
    paddingVertical: 5,
  },
  emaAmcCheckFont: {
    fontSize: 17,
  },
  emaCancel: {
    fontSize: 15,
    marginTop: 15,
    marginLeft: 15,
    color: Colors.RED,
  },
  education1: {
    // marginTop: -140,
    marginHorizontal: 20,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: Colors.GRAY_LIGHT,
    marginVertical: 10,
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
  },
  value_sec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  child5: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 12,
    fontWeight: 'bold',
    // paddingVertical: 5,
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
  showMorePlansContainer: {
    marginHorizontal: 20,
    alignSelf: 'flex-end',
  },
  showMorePlansText: {
    color: Colors.RED,
    fontSize: 14,
  },
});

const mapStateToProps = state => ({
  token: state.auth.token,
  users: state.auth.user,
  userDetails: state.registration.userDetails,
  profile: state.auth.profile,
  isFetching: state.home.isFetching,
  pan: state.home.pan,
  error: state.home.error,
  steps: state.home.steps,
  isInn: state.registration.isInn,
  home: state.home.home,
  cart: state.cartActions.cart,
  goals: state.goals.goals,
  goalDetail: state.goals.goalDetail,
  investments: state.investmentplan.investments,
  investment: state.investmentplan.investment,
  emandateLink: state.emandate.emandateLink,
  emandateFetching: state.emandate.isFetching,
  investmentFetching: state.investmentplan.isFetching,
  planFetching: state.goals.isFetching,
  summary: state.goals.summary,
  summaryRetrieve: state.goals.summaryRetrieve,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const {dispatch} = dispatchProps;
  const {AuthActions} = require('../../store/AuthRedux');
  const {HomeActions} = require('../../store/HomeRedux');
  const {CartActions} = require('../../store/CartActionsRedux');
  const {GoalsActions} = require('../../store/GoalsRedux');
  const {InvestmentPlanActions} = require('../../store/InvestmentPlanRedux');
  const {EmandateActions} = require('../../store/EmandateRedux');
  const {FundDetailActions} = require('../../store/FundDetailRedux');
  return {
    ...stateProps,
    ...ownProps,
    logOut: () => dispatch(AuthActions.logout()),
    getsteps: (params, token) => {
      HomeActions.getsteps(dispatch, params, token);
    },
    getHomeData: (params, token) => {
      HomeActions.getHomeData(dispatch, params, token);
    },
    getProfile: (params, token) => {
      AuthActions.getProfile(dispatch, params, token);
    },
    cartDetails: token => {
      CartActions.cartDetails(dispatch, token);
    },
    goalDetails: token => {
      GoalsActions.goalDetails(dispatch, token);
    },
    singleDetails: (params, token) => {
      GoalsActions.singleDetails(dispatch, params, token);
    },
    allPlans: token => {
      InvestmentPlanActions.allPlans(dispatch, token);
    },
    investmentPlans: (params, token) => {
      InvestmentPlanActions.investmentPlans(dispatch, params, token);
    },
    clearEmandateLink: () => {
      EmandateActions.clearEmandateLink(dispatch);
    },
    goalSummary: (params, token) => {
      GoalsActions.goalSummary(dispatch, params, token);
    },
    goalSummaryRetrieve: (params, token) => {
      GoalsActions.goalSummaryRetrieve(dispatch, params, token);
    },
    fundDetails: data => {
      FundDetailActions.fundDetails(dispatch, data);
    },
    setdocumentStatus: () => dispatch(RegistrationActions.setdocumentStatus()),
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps,
)(HomeScreen);
