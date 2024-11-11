
import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  Text,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { connect } from "react-redux";
import { Styles, Config, Colors, FormValidate } from "../../common";
import MyImagePicker from "../../components/MyImagePicker";

import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Foundation from "react-native-vector-icons/Foundation";

import { Image, Header } from "react-native-elements";
import Cart from "../../components/Cart";
import Icon from "react-native-vector-icons/MaterialIcons";

const documentsMap = {
  PC: "Pan Card",
  AA1: "Aadhaar Card Front",
  AA2: "Aadhaar Card Back",
  CH: "Cancelled Cheque",
  PA: "Passport",
  PIC: "Passport Size Image",
  AVATAR: "Avatar",
  DL: "Driving License",
  IP: "IIN Physical Form",
  //KF: "Investor Form",
  AC: "Investor Form",
};

let documentsKyc = [
  {
    name: "PAN",
    fileType: "PC",
    info: "Upload PAN",
    type: "attachment",
    icon: <FontAwesome5 name="credit-card" size={18} color="#EE4248" />,
  },
  {
    name: "Aadhaar Card Front",
    multi: true,
    fileType: "AA1",
    info: "Upload Select Doc",
    type: "attachment",
    icon: <AntDesign name="idcard" size={20} color="#EE4248" />,
  },
  {
    name: "Cancelled Cheque",
    fileType: "CH",
    info: "Upload Cancelled Cheque",
    type: "attachment",
    icon: <MaterialIcons name="cancel" size={22} color="#EE4248" />,
  },
];

let documents = [
  {
    name: "PAN",
    fileType: "PC",
    info: "Upload PAN",
    type: "attachment",
    icon: <FontAwesome5 name="credit-card" size={18} color="#EE4248" />,
  },
  {
    name: "Aadhaar Card Front",
    multi: true,
    fileType: "AA1",
    info: "Upload Select Doc",
    type: "attachment",
    icon: <AntDesign name="idcard" size={20} color="#EE4248" />,
  },
  {
    name: "Cancelled Cheque",
    fileType: "CH",
    info: "Upload Cancelled Cheque",
    type: "attachment",
    icon: <MaterialIcons name="cancel" size={22} color="#EE4248" />,
  },
  {
    name: "Investor Form",
    fileType: "AC",
    info: "Upload Investor Form",
    type: "attachment",
    icon: <FontAwesome name="wpforms" size={22} color="#EE4248" />,
  },
  {
    name: "Passport Size Image",
    fileType: "PIC",
    info: "Upload Passport Size Image",
    type: "attachment",
    icon: <FontAwesome name="file-image-o" size={22} color="#EE4248" />,
  },
  //{ name: "Upload Video", fileType: "VID", info: "Upload Upload Video", type: "attachment", icon: <Foundation name="play-video" size={25} color="#EE4248" /> },
  {
    name: "Upload Signature",
    fileType: "SIGN",
    info: "Upload Upload Signature",
    type: "form",
    icon: <FontAwesome5 name="file-signature" size={20} color="#EE4248" />,
  },
];

function UploadDocumentScreen(props) {
  const {
    token,
    user,
    steps,
    docs,
    getDocuments,
    uploadSuccess,
    isFetching,
    setUri,
    userDetails
  } = props;
  const [document, setDocument] = useState(
    docs?.responseString?.ekycIsDone ? documentsKyc :documents 
  );
  const [showLoader, setShowLoader] = useState(false);
  useEffect(()=>{
    console.log("Documents",docs);
    
  })
  const carosuelref = useRef();
  const [reUploadInd, setReUploadInd] = useState([]);
  
  useEffect(() => {
    setShowLoader(true); // Show loader immediately on mount
  
    const hideTimer = setTimeout(() => {
      setShowLoader(false); // Hide loader after 5 seconds
    }, 3000); // 5 seconds for hiding the loader
  
    // Cleanup for the hide timer
    return () => clearTimeout(hideTimer);
  }, []); // Only runs on mount
  
  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    
    if (token) {
      getDocuments(token);
    }
  }, [token, uploadSuccess]);

  useEffect(() => {
    if (docs) props.navigation.navigate("UploadDocument");
  }, [docs]);

  const zoomDocuments = (uri) => {
    setUri(uri);
    props.navigation.navigate("ZoomDocuments");
  };

  const renderitem = ({ item, index }) => {
    return (
      <View
        key={index}
        style={{
          marginHorizontal: 10,
          marginBottom: 20,
          alignItems: "center",
          width: Styles.width - 50,
        }}
      >
        <Text style={{ marginBottom: 5 }}>
          {documentsMap[item.docType]
            ? documentsMap[item.docType]
            : item.docType}
        </Text>

        <TouchableOpacity
          onPress={() => zoomDocuments(`${docs?.baseUrl}${item.fileName}`)}
        >
          <Image
            source={{ uri: `${docs?.baseUrl}${item.fileName}` }}
            style={{
              width: Styles.width - 50,
              height: 300,
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => carosuelref.current.snapToPrev()}
          style={{
            backgroundColor: "white",
            position: "absolute",
            top: "50%",
            left: 20,
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
          }}
        >
          <View>
            <Icon name="arrow-back-ios" size={20} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => carosuelref.current.snapToNext()}
          style={{
            position: "absolute",
            top: "50%",
            right: 20,
            backgroundColor: "white",
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
          }}
        >
          <View>
            <Icon name="arrow-forward-ios" size={20} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Home", { refresh: true })}
            style={{ marginTop: 20 }}
          >
            <AntDesign name={"arrowleft"} size={40} color={Colors.RED} />
          </TouchableOpacity>
        }
        containerStyle={styles.header}
        backgroundColor={Colors.LIGHT_WHITE}
        centerComponent={
          <Image
            source={require("../../../assets/icon.png")}
            style={styles.logimg}
          />
        }
        rightComponent={
          <Cart
            nav={() => {
              props.navigation.navigate("TopRatedList");
            }}
          />
        }
      />
      {showLoader && (
        <View style={Styles.loading}>
          <ActivityIndicator color={Colors.BLACK} size="large" />
        </View>
      )}
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.heading}>
            Please Upload your documents for easy and quick Activation of your
            transactional account.
          </Text>
        </View>

        <View style={styles.document_status}>
          <Text style={styles.document}>Document Status:</Text>
          <Text style={styles.pending}>
            {docs ? docs?.responseString?.documentUploadStatus : "PENDING"}
          </Text>
        </View>

        {/* container_sec */}
        <View style={styles.container_sec}>
          <Text style={styles.we_need}>We need the Required Documents</Text>
          {document.map((item, key) => (
            <View key={key} style={styles.pan_sec}>
              {/* {
                userDetails?.ekycIsDone?
                :
              } */}
              {docs && (
                <MyImagePicker
                  items={item}
                  docs={docs}
                  setReUploadInd={setReUploadInd}
                  reUploadInd={reUploadInd}
                  navigation={props.navigation}
                />
              )}
            </View>
          ))}
        </View>

        <View style={styles.review_documents}>
          <Text style={styles.review}>Review Your Documents</Text>
        </View>

        <View
          style={{ flexDirection: "row", marginHorizontal: 10, marginTop: 20 }}
        >
          {/* <ScrollView horizontal={true} ref={scrollViewRef} > */}
          {docs?.responseString.documents ? (
            <Carousel
              ref={carosuelref}
              data={docs.responseString.documents}
              renderItem={renderitem}
              sliderWidth={Styles.width}
              itemWidth={Styles.width}
            />
          ) : null}
          {/* </ScrollView> */}
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
  heading: {
    textAlign: "center",
    fontSize: 12,
    width: "80%",
    marginTop: 10,
    color:"black"
  },
  document_status: {
    flexDirection: "row",
    paddingLeft: "45%",
    marginTop: 20,
  },
  document: {
    fontSize: 14,
    fontWeight: "bold",
    color:'black'
  },
  pending: {
    fontSize: 14,
    paddingLeft: 20,
    color: Colors.LIGHT_YELLOW,
    fontWeight: "bold",
  },
  container_sec: {
    margin: 15,
  },
  we_need: {
    fontSize: 14,
    color:'black'
  },
  pan_sec: {
    flexDirection: "row",
    marginTop: 20,
  },
  pan: {
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  review_documents: {
    backgroundColor: "#EAE9EE",
  },
  review: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.RED,
    marginVertical: 20,
    paddingLeft: 20,
  },
});
const mapStateToProps = (state) => ({
  token: state.auth.token,
  docs: state.registration.documents,
  isFetching: state.registration.isFetching,
  uploadSuccess: state.registration.uploadSuccess,
  steps: state.home.steps,
  user: state.home.user,
  userDetails: state.registration.userDetails,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { RegistrationActions } = require("../../store/RegistrationRedux");
  const { AuthActions } = require("../../store/AuthRedux");
  return {
    ...stateProps,
    ...ownProps,
    getDocuments: (token) => {
      RegistrationActions.getDocuments(dispatch, token);
    },
    logOut: () => {
      AuthActions.logOut(dispatch);
    },
    setUri: (params) => {
      RegistrationActions.setUri(dispatch, params);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(UploadDocumentScreen);
