/** @format */

import React, { useState, useRef, useEffect } from "react";
import * as ImagePicker from "react-native-image-picker";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import SignatureScreen from "react-native-signature-canvas";
import {
  Modal,
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import { AntDesign, Entypo, FontAwesome } from "react-native-vector-icons";
import { Button } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import DocumentInstructions from "./DocumentInstructions";
import Colors from "../common/Colors";
import Toast from "react-native-simple-toast";
import { check, request, PERMISSIONS } from 'react-native-permissions';

const MyImagePicker = (props) => {
  const {
    items,
    docs,
    token,
    fileUpload,
    fileUploadSign,
    reUploadInd,
    setReUploadInd,
    navigation,
  } = props;

  const selList = [
    { value: "Aadhaar Card Front", label: "Aadhaar Card Front", fileType: "AA1" },
    { value: "Aadhaar Card Back", label: "Aadhaar Card Back", fileType: "AA2" },
    { value: "Passport", label: "Passport", fileType: "PA" },
    { value: "Driving Licence", label: "Driving Licence", fileType: "DL" },
  ];

  const [img, setImg] = useState(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [recording, setRecording] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);
  const [sign, setSign] = useState(false);
  const [item, setItem] = useState(selList[0]);
  const signBox = useRef(null);
  
  const devices = useCameraDevices();
  const device = devices.back; // Choose back camera

  const addressVerificationDocs = ["AA1", "AA2", "DL"];

  useEffect(() => {
    const checkCameraPermissions = async () => {
      const status = await check(PERMISSIONS.ANDROID.CAMERA);
      if (status !== "granted") {
        const newStatus = await request(PERMISSIONS.ANDROID.CAMERA);
        setHasPermission(newStatus === "granted");
      } else {
        setHasPermission(true);
      }
    };
    checkCameraPermissions();
  }, []);

  useEffect(() => {
    if (items) {
      setItem(items);
    }
  }, [items]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibrary({
      mediaTypes: "photo",
      allowsEditing: true,
      aspect: [4, 3],
    });

    let fileType = item?.fileType || (item?.name === "Aadhaar Card Front" ? "AA1" : "AA2");

    if (!result.didCancel) {
      let params = { file: result, fileType };
      console.log(params);
      fileUpload(params, token);
      setImg(result.uri);
    }
  };

  const cameraImage = async (image) => {
    let fileType = item?.fileType || (item?.name === "Aadhaar Card Front" ? "AA1" : "AA2");
    let params = { file: image, fileType };
    fileUpload(params, token);
    setImg(image.uri);
  };

  const signImage = (signature) => {
    let params = { signature: signature };
    fileUploadSign(params, token);
    setImg(signature);
    setSign(false);
  };

  const setSelectDoc = (val) => {
    const selected = selList.find((x) => x.value === val);
    if (selected) {
      setItem({
        ...item,
        name: val,
        fileType: selected.fileType,
        info: selected.label,
      });
    } else {
      setItem({ ...item, name: val });
    }
  };

  const FileIcons = ({ item }) => (
    <>
      <TouchableOpacity
        style={{ marginRight: 10 }}
        onPress={() => {
          if (item?.name !== null) {
            setCameraVisible(true);
          } else {
            Toast.show("You need to select a document first!", Toast.LONG);
          }
        }}
      >
        <Entypo name={"camera"} size={22} color="#000000" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (item?.name !== null) {
            pickImage();
          } else {
            Toast.show("You need to select a document first!", Toast.LONG);
          }
        }}
      >
        <Entypo name={item?.type} size={22} color="#000000" />
      </TouchableOpacity>
    </>
  );

  const ShowReupload = (item) => {
    return reUploadInd?.includes(item?.fileType);
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      <View style={{ flexDirection: "row", alignItems: "center", width: "66%" }}>
        {item?.icon}
        {item?.multi ? (
          <View style={{ borderBottomWidth: 2, backgroundColor: Colors.TRANSPARENT, borderColor: Colors.GRAY_LIGHT, marginTop: 5 }}>
            <RNPickerSelect
              placeholder={{ label: "Select an Item", value: null }}
              style={{ inputIOS: styles.custom, inputAndroid: styles.custom, placeholder: styles.custom }}
              useNativeAndroidPickerStyle={false}
              onValueChange={setSelectDoc}
              value={item?.name}
              items={selList}
              Icon={() => <AntDesign style={{ left: 10, top: 5 }} name="down" color={"#444"} size={18} />}
            />
          </View>
        ) : (
          <Text style={styles.pan}>{item?.name}</Text>
        )}
        <TouchableOpacity onPress={() => Alert.alert("Instructions", DocumentInstructions[item?.fileType] || DocumentInstructions.AADHAAR)}>
          <AntDesign name="exclamationcircleo" size={18} color="#EE4248" />
        </TouchableOpacity>
        {docVerificationCompleted(item?.fileType) !== undefined &&
          (docVerificationCompleted(item?.fileType) ? (
            <TouchableOpacity onPress={() => Toast.show("Verification Pending!", Toast.SHORT)}>
              <FontAwesome name="exclamation-circle" size={18} style={{ marginLeft: 10 }} color="#D4A340" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => Toast.show("Document Verified", Toast.SHORT)}>
              <FontAwesome name="check" size={18} style={{ marginLeft: 5 }} color="#00CC00" />
            </TouchableOpacity>
          ))}
      </View>
      <View style={{ width: "15%" }}>
        {img && <Image source={{ uri: img }} style={styles.image} />}
      </View>
      <View>
        {item?.type === "attachment" ? (
          <View style={{ flexDirection: "row" }}>
            {docVerificationCompleted(item?.fileType) === undefined ? (
              <FileIcons item={item} />
            ) : (
              <>
                {ShowReupload(item) === undefined ? (
                  <TouchableOpacity style={{ marginRight: 10 }} activeOpacity={0.5} onPress={() => setReUploadInd((current) => [...current, item?.fileType])}>
                    <Text>Re-upload</Text>
                  </TouchableOpacity>
                ) : (
                  <FileIcons item={item} />
                )}
              </>
            )}
          </View>
        ) : (
          <TouchableOpacity onPress={() => { setSign(true); }}>
            <AntDesign name="form" size={22} color="#000000" />
          </TouchableOpacity>
        )}
      </View>
      <Modal animationType="slide" transparent={true} visible={cameraVisible} onRequestClose={() => setCameraVisible(false)}>
        {device && hasPermission ? (
          <Camera
            ref={setCameraRef}
            style={{ flex: 1 }}
            device={device}
            isActive={cameraVisible}
          >
            <View style={{ flex: 1, backgroundColor: "transparent", justifyContent: "flex-end" }}>
              <View style={{ backgroundColor: "black", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Button icon="close" style={{ marginLeft: 12 }} mode="outlined" color="white" onPress={() => setCameraVisible(false)}>
                  Close
                </Button>
                <TouchableOpacity onPress={async () => {
                  if (cameraRef) {
                    const photo = await cameraRef.takePhoto();
                    cameraImage(photo);
                    setCameraVisible(false);
                  }
                }}>
                  <View style={{ borderWidth: 2, borderRadius: 50, borderColor: "white", height: 50, width: 50, justifyContent: "center", alignItems: "center", marginBottom: 16, marginTop: 16 }}>
                    <View style={{ borderWidth: 2, borderRadius: 50, borderColor: "white", height: 40, width: 40, backgroundColor: "white" }} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Camera>
        ) : (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "white" }}>No access to camera</Text>
          </View>
        )}
      </Modal>
      <Modal animationType="slide" transparent={true} visible={sign} onRequestClose={() => setSign(false)}>
        <View style={{ flex: 1 }}>
          <SignatureScreen
            ref={signBox}
            imageType="image/png"
            onOK={signImage}
            saveImageFileInExtStorage={false}
            onEmpty={() => setSign(false)}
            backgroundColor="transparent"
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  pan: {
    marginHorizontal: 10,
    fontSize: 18,
    flex: 0,
    fontWeight: "bold",
  },
  image: {
    borderRadius: 10,
    width: 50,
    height: 50,
  },
  error: {
    color: "#ff0000",
    padding: 5,
  },
  custom: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    paddingHorizontal: 10,
  },
});

// Redux connection and export remains the same
const mapStateToProps = (state) => ({
  token: state.auth.token,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { RegistrationActions } = require("../store/RegistrationRedux");
  return {
    ...stateProps,
    ...ownProps,
    fileUpload: (params, token) => {
      RegistrationActions.fileUpload(dispatch, params, token);
    },
    fileUploadSign: (params, token) => {
      RegistrationActions.fileUploadSign(dispatch, params, token);
    },
  };
};

export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(MyImagePicker);
