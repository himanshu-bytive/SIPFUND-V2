import React, { useState, useEffect } from "react";
import * as ImagePicker from "react-native-image-picker";
import { View, TouchableOpacity, Image, Alert, Modal, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-paper";
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { request, PERMISSIONS } from 'react-native-permissions';

const ProfileImagePicker = (props) => {
  const { docType, token, fileUpload, url, data } = props;
  const [img, setImg] = useState(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const devices = useCameraDevices();
  const device = devices.back; // Change to 'front' for front camera

  // Check Camera Permissions
  useEffect(() => {
    const checkPermissions = async () => {
      const cameraStatus = await request(PERMISSIONS.ANDROID.CAMERA);
      const microphoneStatus = await request(PERMISSIONS.ANDROID.RECORD_AUDIO); // Needed for video
      if (cameraStatus === 'granted' && microphoneStatus === 'granted') {
        setHasPermission(true);
      } else {
        Alert.alert("Sorry, we need camera permissions to make this work!");
      }
    };
    checkPermissions();
  }, []);

  useEffect(() => {
    if (data) {
      const selectedData = data.find((x) => x.docType === docType);
      if (selectedData?.fileName) {
        setImg(url + selectedData.fileName);
      }
    }
  }, [data]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaTypes: "photo",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.didCancel) {
      const params = {
        file: result,
        fileType: docType,
      };
      fileUpload(params, token);
      setImg(result.uri);
    }
  };

  const takePicture = async (cameraRef) => {
    if (cameraRef) {
      const photo = await cameraRef.takePhoto();
      const params = {
        file: photo,
        fileType: docType,
      };
      
      fileUpload(params, token);
      setImg(photo.uri);
    }
    setCameraVisible(false);
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      <TouchableOpacity
        onPress={() =>
          Alert.alert("SIP Fund", "Profile Image", [
            { text: "Cancel", onPress: () => {} },
            { text: "Camera", onPress: () => setCameraVisible(true) },
            { text: "Document", onPress: pickImage },
          ])
        }
        style={{ marginVertical: 10 }}
      >
        <Image
          source={img ? { uri: img } : require("../../assets/profile_img.png")}
          style={styles.bannerimg}
        />
      </TouchableOpacity>

      {cameraVisible && hasPermission && device && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={cameraVisible}
          onRequestClose={() => setCameraVisible(false)}
        >
          <Camera
            style={{ flex: 1 }}
            device={device}
            isActive={cameraVisible}
          >
            <View style={styles.cameraControls}>
              <Button
                icon="close"
                mode="outlined"
                color="white"
                onPress={() => setCameraVisible(false)}
              >
                Close
              </Button>
              <Button
                mode="contained"
                onPress={() => takePicture(cameraRef)}
              >
                Capture
              </Button>
            </View>
          </Camera>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bannerimg: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  cameraControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

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
  };
};

export default connect(mapStateToProps, undefined, mapDispatchToProps)(ProfileImagePicker);
