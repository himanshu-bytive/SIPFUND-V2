import React, { useState } from 'react';
import WebView from 'react-native-webview';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { Header, Image } from 'react-native-elements';
import { connect } from 'react-redux';
import Colors from '../../common/Colors';
import Button from '../../components/Atom/Button/Button';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const KycScreen = props => {
  const { users,profile } = props;
  const { url } = props.route.params;
  console.log('haapy', profile);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [errorDesc, SetErrorDesc] = useState('');

  function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  const handleWebviewStateChange = webViewState => {
    if (webViewState.url && webViewState.url.includes('/estatus')) {
      setLoading(false);
      console.log('Got Response Link', webViewState.url);
      setStatus(getParameterByName('Status', webViewState.url));
      SetErrorDesc(getParameterByName('ErrorDesc', webViewState.url));
    }
  };

  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => {
              setStatus('');
              SetErrorDesc('');
              props.navigation.navigate('Home');
            }}
            style={{ marginTop: 20 }}
          >
            <AntDesign name={'arrowleft'} size={30} color={Colors.RED} />
          </TouchableOpacity>
        }
        rightComponent={
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
              {profile?.INVESTOR_NAME
                ? `${profile?.INVESTOR_NAME[0]}${profile?.INVESTOR_NAME.split(' ').pop()[0]}`
                : ''}
            </Text>
          </View>
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
      
      {status && errorDesc && (
        <View style={styles.infoView}>
          <View style={{alignSelf:"flex-start",marginLeft:20}}>
          <Text style={{marginTop: 20, color: "black",fontSize:18}}>Status: {status.toUpperCase() === "Y" ? "Success" : "Failed"}</Text>
          <Text style={{marginTop:20,color:"black",fontSize:18}}>Description: {errorDesc}</Text>
          </View>
          <View style={{marginTop:50,justifyContent:"center",alignItems:"center"}}> 
          <Button 
            backgroundColor={Colors.RED}
            text={"Go To Home"}
            fontSize={responsiveFontSize(2)}
            height={responsiveHeight(5)}
            width={responsiveWidth(40)}
            textColor={"white"}
            onPress={()=>{
              props.navigation.navigate("Home");
            }}
          />
          </View>
        </View>
      )}

      {/* Only show WebView if status and errorDesc do not have values */}
      {!status && !errorDesc && (
        <WebView
          source={{ uri: url }}
          onNavigationStateChange={handleWebviewStateChange}
          onLoadStart={() => {
            setLoading(true);
          }}
          onLoadEnd={() => {
            setLoading(false); // Stop loader when the page finishes loading
          }}
        />
      )}

      {loading && (
        <View
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: [{ translateX: -50 }, { translateY: -50 }], // Center the square
            height: 100, // Square dimensions
            width: 120,
            backgroundColor: 'white',
            zIndex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 10,
            borderRadius: 10,
          }}
        >
          <ActivityIndicator size={30} color={Colors.RED} />
          <Text style={{ color: 'black' }}>Loading...</Text>
          <Text style={{ color: 'black' }}>Please Wait</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10, // Adjust this value as needed
  },
  logimg: {
    height: 65,
    width: 203,
    marginTop: 10,
  },
  header: {
    borderBottomColor: Colors.BLACK,
    borderBottomWidth: 1,
  },
  textkn: {
    fontSize: 22,
    color: Colors.RED,
    fontWeight: 'bold',
  },
  infoView: {
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    justifyContent:"center",
    alignItems:"center"
  },
});

const mapStateToProps = state => ({
  token: state.auth.token,
  users: state.auth.user,
  profile: state.auth.profile,
  user: state.auth.user,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { AuthActions } = require('../../../src/store/AuthRedux');
  return {
    ...stateProps,
    ...ownProps,
    getProfile: (params, token) => {
      AuthActions.getProfile(dispatch, params, token);
    },
  };
};

export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(KycScreen);
