/** @format */

import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Alert,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Linking,
  Image,
  TextInput,
  ActivityIndicator,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import {Styles, Config, Colors, FormValidate} from '../common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AuthActions} from '../store/AuthRedux';
import {Overlay, Header, CheckBox} from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeActions } from '../store/HomeRedux';

function SideMenu(props) {
  const pageActiveKyc = useRef(false);
  const pageActiveEmandate = useRef(false);
  const {
    token,
    isFetchingEkyc,
    isFetchingEmandate,
    nseDetails,
    userDetails,
    steps,
    docs,
    getList,
    postRequest,
    kycLists,
    emandateOptions,
    emandateRegistration,
    emandateLists,
    kycDetails,
    profile,
    getProfile,
    isInn,
    popupVisible,
    toggleEmandatePopup,
    clearSummery,
    rmDetails,
    getrm,
    users,
    resetApp,
    logout,
    resetData,
  } = props;
  const [img, setImg] = useState(null);
  const [visibleKyc, setVisibleKyc] = useState(false);
  const [visibleEmandate, setVisibleEmandate] = useState(false);
  const [visibleEmandateValue, setVisibleEmandateValue] = useState(null);
  const [emandateValue, setEmandateValue] = useState('');
  const [enableMandate, setEnableMandate] = useState(false);
  const [enableKyc, setEnableKyc] = useState(false);

  //useEffect(() => {
  //if (userDetails?.signUpSteps >= 6) {
  //setEnableMandate(true);
  //} else if (userDetails?.signUpSteps >= 4) {
  //setEnableKyc(true);
  //}
  //}, [userDetails]);

  useEffect(() => {
    getrm(token);
    // pageActive.current = true;
  }, []);

  useEffect(() => {
    if (popupVisible) {
      toggleEmandatePopup(false);
      setVisibleEmandate(true);
    }
  }, [popupVisible]);

  useEffect(() => {
    getProfile({service_request: {iin: userDetails?.IIN}}, token);
  }, [userDetails]);

  useEffect(() => {
    if (docs) {
      let selectedData = docs?.responseString?.documents
        ? docs.responseString.documents.find(x => x.docType == 'AVATAR')
        : null;
      if (selectedData?.fileName) {
        setImg(docs.baseUrl + selectedData?.fileName);
      }
    }
  }, [docs]);

  useEffect(() => {
    if (kycLists && pageActiveKyc.current) {
      pageActiveKyc.current = false;
      setVisibleKyc(true);
      props.navigation.toggleDrawer();
    }
  }, [kycLists]);

  const handleKyc = value => {
    setVisibleKyc(false);
    pageActiveKyc.current = true;
    let params = {
      service_request: {
        amc_code: value.amc_code,
        client_callback_url: 'sipfund.com',
        investor_email: userDetails.email,
        investor_mobile_no: userDetails.mobileNo,
        pan: userDetails.pan,
        return_flag: 'Y',
      },
    };
    postRequest(params, token);
  };

  useEffect(() => {
    if (kycDetails && pageActiveKyc.current) {
      pageActiveKyc.current = false;
      Linking.openURL(kycDetails);
    }
  }, [kycDetails]);

  const handlEemandate = value => {
    setVisibleEmandate(false);
    setVisibleEmandateValue(value);
    props.navigation.navigate('Explore');
  };

  const handlEemandateValue = () => {
    setVisibleEmandateValue(null);
    var date = new Date();
    date = date.toDateString().split(' ');
    if (emandateValue) {
      let params = {
        service_request: {
          acc_no: profile?.AC_NO,
          acc_type: profile?.AC_TYPE,
          ach_amount: emandateValue,
          ach_fromdate: `${date[2]}-${date[1]}-${date[3]}`,
          ach_todate: '31-Dec-2099',
          Bank_holder_name: userDetails?.name,
          bank_name: profile?.BANK_NAME,
          branch_name: profile?.BRANCH_NAME,
          channel_type: visibleEmandateValue.channel_type,
          ifsc_code: profile?.IFSC_CODE,
          iin: userDetails.IIN,
          micr_no: '',
          return_flag: 'Y',
          //return_flag: visibleEmandateValue.return_flag,
          uc: 'Y',
        },
      };
      emandateRegistration(params, token);
      setVisibleEmandateValue(null);
      setEmandateValue(null);
    }
  };

  useEffect(() => {
    if (emandateLists && pageActiveEmandate.current) {
      pageActiveEmandate.current = false;
      setVisibleEmandate(true);
      props.navigation.toggleDrawer();
    }
  }, [emandateLists]);
  const clearAllData = async () => {
    const keys = await AsyncStorage.getAllKeys();
    console.log('fetching all data before clearing');

    if (keys.length > 0) {
      const data = await AsyncStorage.multiGet(keys);
      data.forEach(([key, value]) => {
        console.log(`Key: ${key}, Value: ${value}`);
      });
    } else {
      console.log('No data found in AsyncStorage');
    }
    try {
      await AsyncStorage.clear();
      console.log('All data has been cleared from AsyncStorage.');
    } catch (error) {
      console.error('Error clearing AsyncStorage: ', error);
    }

    console.log('fetching all data after clearing');
    const ke = await AsyncStorage.getAllKeys();

    if (ke.length > 0) {
      const data = await AsyncStorage.multiGet(ke);
      data.forEach(([key, value]) => {
        console.log(`Key: ${key}, Value: ${value}`);
      });
    } else {
      console.log('No data found in AsyncStorage');
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: Colors.RED,
          flexDirection: 'row',
          paddingVertical: 10,
          alignItems: 'center',
        }}>
        {img ? (
          <Image
            source={{uri: img}}
            style={{margin: 7, width: 50, height: 50, borderRadius: 100}}
          />
        ) : (
          <View
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              backgroundColor: 'grey',
              //marginVertical: 15,
              marginHorizontal: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 25,
                color: '#fff',
              }}>
              {userDetails?.name
                ? userDetails?.name.split(' ').length > 1
                  ? `${userDetails?.name[0]}${
                      userDetails?.name.split(' ').pop()[0]
                    }`
                  : `${userDetails?.name[0]}`
                : ''}
            </Text>
          </View>
        )}
        <View style={{width: '80%'}}>
          <Text style={styles.profileNameText}>{profile?.INVESTOR_NAME}</Text>
          {profile && profile.ACTIVATION_STATUS === 'YES' ? (
            <Text style={styles.account_active}>Account Active</Text>
          ) : (
            <Text style={styles.account_inactive}>Account Inactive</Text>
          )}
        </View>
        <Feather
          style={{
            position: 'absolute',
            right: 10,
            top: 20,
          }}
          name={'chevron-left'}
          size={35}
          color={Colors.LIGHT_WHITE}
          onPress={() => {
            props.navigation.toggleDrawer();
          }}
        />
      </View>
      <Overlay
        isVisible={visibleKyc}
        overlayStyle={{margin: 10, borderRadius: 10, backgroundColor: '#fff'}}>
        <View style={styles.emaMainbox}>
          <Text style={styles.emaAmc}>Choose AMC Option:</Text>
          {kycLists.map((item, key) => (
            <TouchableOpacity key={key} onPress={() => handleKyc(item)}>
              <Text style={styles.emaMutual_fund}>{item.amc_name}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => setVisibleKyc(false)}>
            <Text style={styles.emaCancel}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Overlay>

      <Overlay
        isVisible={visibleEmandate}
        overlayStyle={{margin: 10, borderRadius: 10, backgroundColor: '#fff'}}>
        <View style={styles.emaMainbox}>
          <Text style={styles.emaAmc}>Choose E-Mandate Option:</Text>
          {emandateLists.map((item, key) => (
            <TouchableOpacity
              style={{
                marginVertical: 8,
              }}
              key={key}
              onPress={() => handlEemandate(item)}>
              <Text style={{color: 'black'}}>{item?.description}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => setVisibleEmandate(false)}>
            <Text style={styles.emaCancel}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Overlay>

      <Overlay
        isVisible={visibleEmandateValue ? true : false}
        overlayStyle={{margin: 10, borderRadius: 10, backgroundColor: '#fff'}}>
        <View style={styles.mainbox}>
          <Text style={styles.amc}>ENTER ACH-MANDATE AMOUNT</Text>
          <TextInput
            value={emandateValue}
            placeholderTextColor={'grey'}
            color="black"
            onChangeText={val => setEmandateValue(val)}
            style={styles.inputsec}
            placeholder="Amount"
          />
          <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
            <TouchableOpacity onPress={() => setVisibleEmandateValue(null)}>
              <Text style={styles.refreshcode}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                onPress={() => handlEemandateValue()}
                style={styles.refreshcode}>
                SUBMIT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Overlay>

      <ScrollView>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('Dashboard', {screen: 'dashboard'})
          }
          style={styles.profile_sec}>
          <View style={styles.sideIcon}>
            <AntDesign name={'appstore1'} size={30} color={Colors.RED} />
          </View>
          <View>
            <Text style={styles.know_text}>Dashboard</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('You', {screen: 'Profile'})}
          style={[styles.profile_sec, styles.profile]}>
          <View style={styles.sideIcon}>
            <FontAwesome
              name={'user-o'}
              size={30}
              color={Colors.GRAY_LIGHT_4}
            />
          </View>
          <View>
            <Text style={[styles.know_text, styles.know]}>Profile</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => props.navigation.navigate("BankAccount")}
          style={[styles.profile_sec, styles.profile]}
        >
          <View style={styles.sideIcon}>
            <FontAwesome name={"bank"} size={28} color={Colors.GRAY_LIGHT_4} />
          </View>
          <View>
            <Text style={[styles.know_text, styles.know]}>Add New Bank</Text>
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('You', {screen: 'ReferEarn'})
          }
          style={[styles.profile_sec, styles.profile]}>
          <View style={styles.sideIcon}>
            <MaterialCommunityIcons
              name={'wallet-giftcard'}
              size={30}
              color={Colors.GRAY_LIGHT_4}
            />
          </View>
          <View>
            <Text style={[styles.know_text, styles.know]}>Refer & Earn</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (users?.pan) {
              if (steps === 3) {
                props.navigation.navigate('Reg', {screen: 'RegisterDetails'});
              } else if (steps < 6) {
                props.navigation.navigate('Reg', {screen: 'UploadDocument'});
              } else {
                Toast.show(
                  'Your registration is already completed!',
                  Toast.LONG,
                );
              }
              // props.navigation.navigate(
              //   steps === 3
              //     ? "RegisterDetails"
              //     : "UploadDocument"
              // )
            } else {
              props.navigation.navigate('Pan');
            }
          }}
          style={[styles.profile_sec, styles.profile]}>
          <View style={styles.sideIcon}>
            <FontAwesome
              name={'user-o'}
              size={30}
              color={Colors.GRAY_LIGHT_4}
            />
          </View>
          <View>
            <Text style={[styles.know_text, styles.know]}>Register</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            // props.navigation.navigate("Existing");
            if (profile?.ACTIVATION_STATUS == 'YES') {
              Toast.show('Your account is already active', Toast.LONG);
              return;
            }
            if (steps >= 4 && steps < 6) {
              alert('Your IIN is inactive. Please wait for activation!');
            } else {
              props.navigation.navigate('You', {screen: 'Existing'});
            }
          }}
          style={[styles.profile_sec, styles.profile]}>
          <View style={styles.sideIcon}>
            <AntDesign
              name={'filetext1'}
              size={30}
              color={Colors.GRAY_LIGHT_4}
            />
          </View>
          <View>
            <Text style={[styles.know_text, styles.know]}>Existing IIN</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('You', {screen: 'Relationship'})
          }
          style={[styles.profile_sec, styles.profile]}>
          <View style={styles.sideIcon}>
            <FontAwesome
              name={'stack-exchange'}
              size={30}
              color={Colors.GRAY_LIGHT_4}
            />
          </View>
          <View>
            <Text style={[styles.know_text, styles.know]}>
              Relationship Manager
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (profile?.ACTIVATION_STATUS == 'YES') {
              Toast.show('Your account is already active.', Toast.LONG);
              return;
            }
            if (steps < 4) {
              Toast.show(
                "We didn't find any investment account for your PAN",
                Toast.LONG,
              );
            } else {
              props.navigation.navigate('Reg', {screen: 'UploadDocument'});
            }
          }}
          style={[styles.profile_sec, styles.profile]}>
          <View style={styles.sideIcon}>
            <MaterialCommunityIcons
              name={'file-upload'}
              size={30}
              color={Colors.GRAY_LIGHT_4}
            />
          </View>
          <View>
            <Text style={[styles.know_text, styles.know]}>
              Upload Documents
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (userDetails?.signUpSteps < 4) {
              Alert.alert('Your IIN is not created. Please click on register.');
              return;
            }

            if (userDetails?.IIN && profile?.KYC_STATUS === 'Y') {
              if (profile?.ACTIVATION_STATUS === 'YES') {
                Toast.show(
                  'Your KYC is already registered and your account is active. You can start your investment journey now',
                  Toast.LONG,
                );
              } else {
                Toast.show(
                  'Your KYC is already registered. Please upload the documents in the documents section to proceed with your account activation',
                  Toast.LONG,
                );
              }
            } else if (userDetails?.IIN) {
              getList(token);
              pageActiveKyc.current = true;
            } else {
              Alert.alert('Your IIN is not created. Please click on register.');
            }
          }}
          style={[styles.profile_sec, styles.profile]}>
          <View style={styles.sideIcon}>
            <MaterialCommunityIcons
              name={'account-search'}
              size={30}
              color={Colors.GRAY_LIGHT_4}
            />
          </View>
          <View>
            <Text style={[styles.know_text, styles.know]}>E-KYC</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (userDetails && userDetails?.signUpSteps >= 6) {
              emandateOptions(token);
              pageActiveEmandate.current = true;
            } else {
              Alert.alert('Your IIN is inactive. Please wait for activation.');
            }
          }}
          style={[styles.profile_sec, styles.profile]}>
          <View style={styles.sideIcon}>
            <Entypo name={'hair-cross'} size={30} color={Colors.GRAY_LIGHT_4} />
          </View>
          <View>
            <Text style={[styles.know_text, styles.know]}>E-Mandate</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('OtherStackYou', {screen: 'Notifications'})
          }
          style={[styles.profile_sec, styles.profile]}>
          <View style={styles.sideIcon}>
            <FontAwesome name={'bell'} size={30} color={Colors.GRAY_LIGHT_4} />
          </View>
          <View>
            <Text style={[styles.know_text, styles.know]}>Notification</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('You', {screen: 'Reports'})}
          style={[styles.profile_sec, styles.profile]}>
          <View style={styles.sideIcon}>
            <AntDesign name={'profile'} size={30} color={Colors.GRAY_LIGHT_4} />
          </View>
          <View>
            <Text style={[styles.know_text, styles.know]}>Reports</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.border}></View>
        <Text style={[styles.know_text, styles.know]}>Communicate</Text>

        <TouchableOpacity
          onPress={() => Linking.openURL('mailto:info@sipfund.com')}
          style={[styles.profile_sec, styles.profile]}>
          <View style={styles.sideIcon}>
            <Entypo name={'mail'} size={30} color={Colors.GRAY_LIGHT_4} />
          </View>
          <View>
            <Text style={[styles.know_text, styles.know]}>Mail Us</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          // onPress={() => Linking.openURL(`tel:+919513355663`)}
          onPress={() => {
            // alert(rmDetails?.data.mobileNo);
            Linking.openURL(
              rmDetails?.data.mobileNo
                ? 'tel:' + rmDetails?.data.mobileNo
                : `tel:+919513355663`,
            );
          }}
          style={[styles.profile_sec, styles.profile]}>
          <View style={styles.sideIcon}>
            <FontAwesome name={'phone'} size={30} color={Colors.GRAY_LIGHT_4} />
          </View>
          <View>
            <Text style={[styles.know_text, styles.know]}>Call Us</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('You', {screen: 'AboutUs'})}
          style={[styles.profile_sec, styles.profile]}>
          <View style={styles.sideIcon}>
            <FontAwesome
              name={'address-book'}
              size={30}
              color={Colors.GRAY_LIGHT_4}
            />
          </View>
          <View>
            <Text style={[styles.know_text, styles.know]}>About Us</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Logout', 'Do you want to log out?', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                  clearSummery({}, token);
                  resetApp();
                  resetData();
                  logout();
                  props.navigation.navigate("Auth",{screen :'verify'});
                },
              },
            ]);
          }}
          style={[styles.profile_sec, styles.profile]}>
          <View style={styles.sideIcon}>
            <Feather name={'log-out'} size={30} color={Colors.GRAY_LIGHT_4} />
          </View>
          <View>
            <Text style={[styles.know_text, styles.know]}>Logout</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    marginTop:40
  },
  profileNameText:{
  flexWrap: 'wrap', 
  fontSize: 16,
  },
  profile_sec: {
    flexDirection: 'row',

    backgroundColor: Colors.GRAY_LIGHT_3,
    paddingHorizontal: 20,
    paddingVertical: 7,
    marginVertical: 5,
  },
  profile: {backgroundColor: Colors.WHITE, color: 'black'},
  mutual1: {
    width: 100,
    height: 100,
  },
  account_active: {
    color: '#32CD32',
    fontSize: 15,
    marginVertical: 3,
  },
  account_inactive: {
    color: '#FF6347',
    fontSize: 15,
    marginVertical: 3,
  },
  know_text: {
    paddingLeft: 20,
    paddingTop: 3,
    fontSize: 18,
    color: Colors.RED,
  },
  profileText: {
    color: Colors.WHITE,
    fontSize: 16,
    marginVertical: 3,
    //width: "60%",
  },
  know: {color: Colors.BLACK},
  border: {
    marginTop: 10,
    marginBottom: 10,
    height: 4,
    marginHorizontal: 20,
    backgroundColor: Colors.GRAY_LIGHT,
  },
  emaMainbox: {
    margin: 10,
    padding: 10,
  },
  emaAmc: {
    fontSize: 18,
    //marginLeft: 15,
    marginVertical: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  emaMutual_fund: {
    fontSize: 15,
    marginVertical: 10,
    color: 'black',
  },
  emaCancel: {
    fontSize: 15,
    marginTop: 15,
    color: Colors.RED,
  },
  mainbox: {
    padding: 10,
  },
  amc: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  inputsec: {
    borderBottomWidth: 1,
    borderColor: Colors.GRAY_LIGHT,
    width: '95%',
    marginTop: 5,
  },
  refreshcode: {
    textAlign: 'right',
    color: Colors.RED,
    fontSize: 15,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  sideIcon: {
    width: 30,
  },
});

const mapStateToProps = state => ({
  token: state.auth.token,
  steps: state.home.steps,
  docs: state.registration.documents,
  nseDetails: state.registration.nseDetails,
  userDetails: state.auth.user,
  isFetchingEkyc: state.ekyc.isFetching,
  kycLists: state.ekyc.kycLists,
  kycDetails: state.ekyc.kycDetails,
  isFetchingEmandate: state.emandate.isFetching,
  emandateLists: state.emandate.emandateLists,
  emandateDetails: state.emandate.emandateDetails,
  popupVisible: state.emandate.popupVisible,
  profile: state.auth.profile,
  isInn: state.registration.isInn,
  rmDetails: state.sideMenu.rmDetails,
  users: state.auth.user,
});
const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const {dispatch} = dispatchProps;
  const {EkycActions} = require('../store/EkycRedux');
  const {EmandateActions} = require('../store/EmandateRedux');
  const {AuthActions} = require('../store/AuthRedux');
  const {GoalsActions} = require('../store/GoalsRedux');
  const {SideMenuActions} = require('../store/SideMenuRedux');

  return {
    ...stateProps,
    ...ownProps,
    getList: token => {
      EkycActions.getList(dispatch, token);
    },
    postRequest: (params, token) => {
      EkycActions.postRequest(dispatch, params, token);
    },
    getProfile: (params, token) => {
      AuthActions.getProfile(dispatch, params, token);
    },
    emandateOptions: token => {
      EmandateActions.emandateOptions(dispatch, token);
    },
    emandateRegistration: (params, token) => {
      EmandateActions.emandateRegistration(dispatch, params, token);
    },
    toggleEmandatePopup: state => {
      EmandateActions.toggleEmandatePopup(dispatch, state);
    },
    clearSummery: (params, token) => {
      GoalsActions.clearSummery(dispatch, params, token);
    },
    getrm: token => {
      SideMenuActions.getrm(dispatch, token);
    },
    resetApp : () => dispatch(AuthActions.resetApp()),
    resetData: () => dispatch(HomeActions.resetData()),
    logout : () => {
      AuthActions.logout();
    }
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps,
)(SideMenu);
