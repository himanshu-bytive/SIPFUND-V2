import React, {useEffect, useRef, useState} from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Text,
  Linking,
} from 'react-native';
import {Header, Image} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../common/Colors';
import {useNavigation} from '@react-navigation/native';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Button from '../../components/Atom/Button/Button';
import {connect} from 'react-redux';
import Typography from '../../components/Atom/Typography/Typography';
import {ScrollView} from 'react-native';

const E_KYC = props => {
  const {
    token,
    getList,
    users,
    kycLists,
    userDetails,
    isFetchingEkyc,
    kycDetails,
    postRequest,
    nseDetails
  } = props;
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const pageActiveKyc = useRef(false);
  // Call getList when the component mounts
  useEffect(() => {
    if (token) {
      getList(token);
    }
  }, [token, getList]);

  const handleKyc = value => {
    setShowModal(false);
    pageActiveKyc.current = true;
    let params = {
      service_request: {
        amc_code: value.amc_code,
        client_callback_url: 'sipfund.com',
        investor_email: userDetails.email,
        investor_mobile_no: userDetails.mobileNo,
        pan: nseDetails.pan,
        return_flag: 'Y',
      },
    };
    console.log('Params', params);

    postRequest(params, token);
  };

  useEffect(() => {
    if (kycDetails && pageActiveKyc.current) {
      pageActiveKyc.current = false;
      props.navigation.navigate('Reset', {
        screen: 'KycScreen',
        params: {url: kycDetails},
      });
    }
  }, [kycDetails]);

  // Display ActivityIndicator until kycLists is loaded
  if (isFetchingEkyc || !kycLists) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.RED} />
        <Typography
          fontSize={responsiveFontSize(2)}
          color={'black'}
          style={{marginTop: 10}}>
          Loading Please Wait...
        </Typography>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Explore",{screen : 'Home'});
            }}
            style={{marginTop: 30}}>
            <AntDesign name={'arrowleft'} size={30} color={Colors.RED} />
          </TouchableOpacity>
        }
        rightComponent={
          users?.name ? (
            <View
              style={{
                marginTop: 25,
                borderWidth: 1,
                backgroundColor: Colors.WHITE,
                borderColor: Colors.RED,
                padding: 5,
                borderRadius: 7,
              }}
            >
              <Text style={styles.textkn}>
                {users?.name
                  ? `${users.name.charAt(0)}${users.name.split(' ').pop()?.charAt(0) || ''}`
                  : ''}
              </Text>
            </View>
          ) : null
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
      <ScrollView style={{flex: 1}}>
        <View style={{alignItems: 'center', marginTop: 20, paddingHorizontal: 20}}>
          <Text
            style={{
              fontSize: responsiveFontSize(2.5),
              color: 'black',
              lineHeight: 22,
              fontSize: 14,
            }}>
            Dear Investor,{'\n'}
            Your Mutual Fund{' '}
            <Text style={{fontWeight: 'bold', fontSize: 16}}>
              KYC is not registered
            </Text>
            , please click on the <Text style={{fontWeight: 'bold'}}>E-KYC</Text>{' '}
            button to complete your KYC online.{'\n\n'}
            You will be redirected to the NSE website for eKYC. Please keep the
            following documents ready:{'\n'}
            {'\u2022'} PAN Card{'\n'}
            {'\u2022'} Aadhaar Card{'\n'}
            {'\u2022'} Cancelled Cheque
          </Text>
        </View>
        <View style={{paddingHorizontal: 20, gap: 30, marginTop: 50}}>
          <Button
            text={'E-KYC'}
            backgroundColor={Colors.RED}
            textColor={'white'}
            height={responsiveHeight(6)}
            width={'auto'}
            onPress={() => {
              setShowModal(true);
            }}
          />
          <Text
            style={{
              fontWeight: 'bold',
              color: 'black',
              alignSelf: 'center',
              fontSize: 20,
            }}>
            OR
          </Text>
          <Text
            style={{
              fontSize: responsiveFontSize(2.5),
              color: 'black',
              lineHeight: 22,
              fontSize: 14,
            }}>
            Please upload the required documents in the below documents section so
            that we shall complete your KYC at our end and activate your
            Investment Account.
          </Text>
          <Button
            text={'Upload Document'}
            backgroundColor={Colors.RED}
            textColor={'white'}
            height={responsiveHeight(6)}
            width={'auto'}
            onPress={() => {
              navigation.navigate('Reg', {screen: 'UploadDocument'});
            }}
            style={{marginBottom: 100}}
          />
        </View>
        {showModal && (
          <Modal
            transparent={true}
            animationType="fade"
            visible={showModal}
            onRequestClose={() => setShowModal(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.popup}>
                <View style={styles.emaMainbox}>
                  <Text style={styles.emaAmc}>Choose AMC Option:</Text>
                  {kycLists.map((item, key) => (
                    <TouchableOpacity key={key} onPress={() => handleKyc(item)}>
                      <Text style={styles.emaMutual_fund}>{item.amc_name}</Text>
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity onPress={() => setShowModal(false)}>
                    <Text style={styles.emaCancel}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
    </View>
  );  
};

const styles = StyleSheet.create({
  header: {
    borderBottomColor: Colors.GRAY_LIGHT,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
  },
  logimg: {
    height: 65,
    width: 203,
    marginTop: 10,
  },
  textkn: {
    fontSize: 22,
    color: Colors.RED,
    fontWeight: 'bold',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    width: responsiveWidth(80),
    height: 'auto',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  emaMainbox: {
    margin: 5,
    padding: 5,
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
});

const mapStateToProps = state => ({
  token: state.auth.token,
  steps: state.home.steps,
  users: state.auth.user,
  docs: state.registration.documents,
  nseDetails: state.registration.nseDetails,
  userDetails: state.auth.user,
  isFetchingEkyc: state.ekyc.isFetching,
  kycLists: state.ekyc.kycLists,
  kycDetails: state.ekyc.kycDetails,
});

const mapDispatchToProps = dispatch => {
  const {EkycActions} = require('../../store/EkycRedux');

  return {
    getList: token => {
      EkycActions.getList(dispatch, token);
    },
    postRequest: (params, token) => {
      EkycActions.postRequest(dispatch, params, token);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(E_KYC);
