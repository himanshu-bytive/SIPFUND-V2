/** @format */

import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
  ActivityIndicator,
  Alert,
  Modal,
  SafeAreaView,
  PermissionsAndroid,
} from "react-native";
import moment from "moment";
import { connect } from "react-redux";
import { Styles, Colors } from "../../common";
import { MySelectPicker, MyTextInput } from "../../components";
import { AntDesign } from "react-native-vector-icons";
import { Image, Header, Overlay } from "react-native-elements";
import Cart from "../../components/Cart";
import * as ImagePicker from "react-native-image-picker";
import RNPickerSelect from "react-native-picker-select";
import { Camera } from 'react-native-vision-camera';
import { Button } from "react-native-paper";
import RNFetchBlob from "rn-fetch-blob";

function CompleteDetailsBankScreen(props, route) {
  const pageActive = useRef(false);
  const [visible, setVisible] = useState(false);
  const [img, setImg] = useState(null);

  const {
    token,
    isFetching,
    updateRegister,
    createRegister,
    user,
    fatcaDetails,
    nseDetails,
    userDetails,
    accountTypes,
    settings,
    banks,
    getBankDetails,
    bankDetails,
    isInn,
    isExit,
    FatcaKYC,
    getAccountType,
    bankTypeDetails,
    getProofOfAccount,
    proofOfAccount,
  } = props;
  console.log(
    "🚀 ~ CompleteDetailsBankScreen ~ proofOfAccount:",
    proofOfAccount
  );
  const [accountTypeList, setAccountTypeList] = useState([]);
  const [proof_of_account, setProof_of_account] = useState([]);
  const [bankList, setBankList] = useState([]);
  const [camera, setCamera] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [cameraRef, setCameraRef] = useState(null);

  const [state, setState] = useState({
    showBank: false,
    accountType: "",
    accountNumber: "",
    ifsc: "",
    bank: "",
    branchName: "",
    branchAddress: "",
    proofOfAccountSelected: "",
  });

  const [errors, setErrors] = useState({
    accountType: null,
    accountNumber: null,
    ifsc: null,
    showBank: null,
    bank: null,
    branchName: null,
    branchAddress: null,
  });

  useEffect(() => {
    if (isInn && pageActive.current) {
      pageActive.current = false;
      setVisible(true);
    }
  }, [isInn]);

  useEffect(() => {
    getAccountType();
    getProofOfAccount();
    if (banks.length <= 0) {
      settings(token);
    }
    requestCameraPermission();
  }, []);

  async function requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "This app needs access to your camera to take photos.",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission granted");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibrary({
      mediaTypes: "photo",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.didCancel) {
      const base64 = await imageToBase64(result?.assets[0]?.uri);
      setImg(base64);
    }
  };

  const cameraImage = async (image) => {
    let fileType;

    let params = {
      file: image,
      fileType,
    };
    // fileUpload(params, token);
    const base64 = await imageToBase64(image?.uri);
    setImg(base64);
  };

  async function imageToBase64(imageUri) {
    try {
      const base64Data = await RNFetchBlob.fs.readFile(imageUri, "base64");
      return `data:image/jpeg;base64,${base64Data}`;
    } catch (error) {
      console.error("Error converting image to base64:", error);
      return null;
    }
  }

  useEffect(() => {
    if (fatcaDetails || nseDetails || userDetails) {
      // console.log(fatcaDetails, nseDetails, userDetails)
      setTimeout(() => {
        setState({
          accountType:
            !props?.navigation?.state?.params?.newBankAccount &&
            nseDetails.acc_type.ACC_TYPE,
          accountNumber:
            !props?.navigation?.state?.params?.newBankAccount &&
            nseDetails.acc_no,
          ifsc:
            !props?.navigation?.state?.params?.newBankAccount &&
            nseDetails.ifsc_code,
          bank: nseDetails.bank_name.BANK_CODE,
          branchName: nseDetails.branch_name,
          branchAddress: nseDetails.branch_addr1,
        });
      }, 1000);
    }
  }, [fatcaDetails, nseDetails, userDetails]);

  useEffect(() => {
    if (bankTypeDetails) {
      const accountTypeList = bankTypeDetails
        ? bankTypeDetails.map((item) => ({
            value: item.code,
            label: String(item.description),
          }))
        : [];
      setAccountTypeList(accountTypeList);
    }
    if (proofOfAccount) {
      const proofOfAccountLocal = proofOfAccount
        ? proofOfAccount.map((item) => ({
            value: item.code,
            label: String(item.description),
          }))
        : [];
      setProof_of_account(proofOfAccountLocal);
    }
    if (banks) {
      const bankList = banks
        ? banks.map((item) => ({
            value: item.BANK_CODE,
            label: String(item.BANK_NAME),
          }))
        : [];
      setBankList(bankList);
    }
    if ((bankDetails && bankDetails.nseBankName) || bankDetails?.bankName) {
      let selectedBank = bankList.find(
        (x) => x.label == bankDetails.nseBankName
      );
      setState({
        ...state,
        showBank: true,
        bank: selectedBank ? selectedBank.value : "",
        branchName: bankDetails.branch,
        branchAddress: bankDetails.address,
      });
    }
  }, [accountTypes, banks, bankDetails, bankTypeDetails]);

  const onAction = async () => {
    const {
      accountType,
      accountNumber,
      ifsc,
      bank,
      branchName,
      branchAddress,
      showBank,
    } = state;
    if (!accountType) {
      setErrors({ ...errors, accountType: "Please Select a Value" });
      return;
    }
    if (!accountNumber) {
      setErrors({ ...errors, accountNumber: "Please Add a Value" });
      return;
    }
    if (accountNumber.length < 9 || accountNumber.length > 21) {
      setErrors({ ...errors, accountNumber: "Please Add a Valid Value" });
      return;
    }
    if (!ifsc) {
      setErrors({ ...errors, ifsc: "Please Add a Value" });
      return;
    }
    if (ifsc.length < 9 || ifsc.length > 20) {
      setErrors({ ...errors, ifsc: "Please Add a Valid Value" });
      return;
    }
    if (!showBank) {
      setErrors({ ...errors, showBank: "Please Fetch Bank Details" });
      return;
    }
    if (!bank) {
      setErrors({ ...errors, bank: "Please Select a Value" });
      return;
    }
    if (!branchName) {
      setErrors({ ...errors, branchName: "Please Add a Value" });
      return;
    }
    if (!branchAddress) {
      setErrors({ ...errors, branchAddress: "Please Add a Value" });
      return;
    }
    let params = { ...{ nseDetails }, ...{ fatcaDetails }, ...{ userDetails } };
    let selAccountType = accountTypes.find((x) => x.ACC_TYPE === accountType);
    let selBank = banks.find((x) => x.BANK_CODE === bank);
    params.nseDetails.acc_type = {
      ACC_TYPE: selAccountType.ACC_TYPE,
      DESCRIPTION: selAccountType.DESCRIPTION,
    };
    params.nseDetails.acc_no = accountNumber;
    params.nseDetails.ifsc_code = ifsc;
    params.nseDetails.bank_name = {
      BANK_CODE: selBank.BANK_CODE,
      BANK_NAME: selBank.BANK_NAME,
    };
    params.nseDetails.branch_name = branchName;
    params.nseDetails.branch_addr1 = branchAddress;
    updateRegister(params, token);
    let paramsNew = {
      service_request: {
        acc_no: params.nseDetails.acc_no,
        acc_type: params.nseDetails.acc_type.ACC_TYPE,
        addr1: params.nseDetails.addr1,
        addr2: params.nseDetails.addr2,
        addr3: params.nseDetails.addr3,
        bank_name: params.nseDetails.bank_name.BANK_NAME,
        branch_addr1: params.nseDetails.branch_addr1,
        branch_addr2: params.nseDetails.branch_addr2,
        branch_addr3: params.nseDetails.branch_addr3,
        branch_city: params.nseDetails.branch_city,
        branch_country: params.nseDetails.branch_country,
        branch_name: params.nseDetails.branch_name,
        branch_pincode: params.nseDetails.branch_pincode,
        city: params.nseDetails.city.CITY,
        country: params.nseDetails.country.COUNTRY_CODE,
        dob: params.nseDetails.dob
          ? moment(params.nseDetails.dob).format("DD-MMM-YYYY")
          : "",
        dp_id: params.nseDetails.dp_id,
        email: params.nseDetails.email,
        exempt_category: params.nseDetails.exempt_category,
        exempt_ref_no: params.nseDetails.exempt_ref_no,
        exemption: params.nseDetails.exemption,
        father_name: params.nseDetails.father_name,
        guard_dob: params.nseDetails.guard_dob
          ? moment(params.nseDetails.guard_dob).format("DD-MMM-YYYY")
          : "",
        guard_exempt_category: "",
        guard_exemption: "",
        guard_kyc: params.nseDetails.guard_kyc,
        guard_name: params.nseDetails.guard_name,
        guard_pan: params.nseDetails.guard_pan,
        guard_pan_ref_no: "",
        guard_valid_pan: "",
        hold_nature: params.nseDetails.hold_nature.HOLD_NATURE_CODE,
        ifsc_code: params.nseDetails.ifsc_code,
        inv_name: params.nseDetails.inv_name,
        jh1_dob: params.nseDetails.jh1_dob
          ? moment(params.nseDetails.jh1_dob).format("DD-MMM-YYYY")
          : "",
        jh1_email: params.nseDetails.jh1_email,
        jh1_exempt_category: params.nseDetails.jh1_exempt_category,
        jh1_exempt_ref_no: params.nseDetails.jh1_exempt_ref_no,
        jh1_exemption: params.nseDetails.jh1_exemption,
        jh1_kyc: params.nseDetails.jh1_kyc,
        jh1_mobile_no: params.nseDetails.jh1_mobile_no,
        jh1_name: params.nseDetails.jh1_name,
        jh1_pan: params.nseDetails.jh1_pan,
        jh1_valid_pan: params.nseDetails.jh1_valid_pan,
        jh2_dob: params.nseDetails.jh2_dob
          ? moment(params.nseDetails.jh2_dob).format("DD-MMM-YYYY")
          : "",
        jh2_email: params.nseDetails.jh2_email,
        jh2_exempt_category: params.nseDetails.jh2_exempt_category,
        jh2_exempt_ref_no: params.nseDetails.jh2_exempt_ref_no,
        jh2_exemption: params.nseDetails.jh2_exemption,
        jh2_kyc: params.nseDetails.jh2_kyc,
        jh2_mobile_no: params.nseDetails.jh2_mobile_no,
        jh2_name: params.nseDetails.jh2_name,
        jh2_pan: params.nseDetails.jh2_pan,
        jh2_valid_pan: params.nseDetails.jh2_valid_pan,
        kyc: params.nseDetails.kyc,
        mfu_can: params.nseDetails.mfu_can,
        mobile_no: user.mobileNo,
        mother_name: params.nseDetails.mother_name,
        no_of_nominee: params.nseDetails.no_of_nominee,
        nominee1_addr1: params.nseDetails.nominee1_addr1,
        nominee1_addr2: params.nseDetails.nominee1_addr2,
        nominee1_addr3: params.nseDetails.nominee1_addr3,
        nominee1_city: params.nseDetails.nominee1_city,
        nominee1_dob: params.nseDetails.nominee1_dob
          ? moment(params.nseDetails.nominee1_dob).format("DD-MMM-YYYY")
          : "",
        nominee1_guard_name: params.nseDetails.nominee1_guard_name,
        nominee1_guard_pan: params.nseDetails.nominee1_guard_pan,
        nominee1_name: params.nseDetails.nominee1_name,
        nominee1_percent: 100.0,
        nominee1_pincode: params.nseDetails.nominee1_pincode,
        nominee1_relation: params.nseDetails.nominee1_relation,
        nominee1_state: params.nseDetails.nominee1_state,
        nominee1_type: params.nseDetails.nominee1_type,
        nominee2_dob: params.nseDetails.nominee2_dob
          ? moment(params.nseDetails.nominee2_dob).format("DD-MMM-YYYY")
          : "",
        nominee2_guard_name: params.nseDetails.nominee2_guard_name,
        nominee2_guard_pan: params.nseDetails.nominee2_guard_pan,
        nominee2_name: params.nseDetails.nominee2_name,
        nominee2_percent: params.nseDetails.nominee2_percent,
        nominee2_relation: params.nseDetails.nominee2_relation,
        nominee2_type: params.nseDetails.nominee2_type,
        nominee3_dob: params.nseDetails.nominee3_dob
          ? moment(params.nseDetails.nominee3_dob).format("DD-MMM-YYYY")
          : "",
        nominee3_guard_name: params.nseDetails.nominee3_guard_name,
        nominee3_guard_pan: params.nseDetails.nominee3_guard_pan,
        nominee3_name: params.nseDetails.nominee3_name,
        nominee3_percent: params.nseDetails.nominee3_percent,
        nominee3_relation: params.nseDetails.nominee3_relation,
        nominee3_type: params.nseDetails.nominee3_type,
        nri_addr1: params.nseDetails.nri_addr1,
        nri_addr2: params.nseDetails.nri_addr2,
        nri_addr3: params.nseDetails.nri_addr3,
        nri_city: params.nseDetails.nri_city,
        nri_country: "",
        nri_pincode: params.nseDetails.nri_pincode,
        nri_state: params.nseDetails.nri_state,
        occupation: params.nseDetails.occupation.OCCUPATION_CODE,
        off_fax: params.nseDetails.off_fax,
        off_phone: params.nseDetails.off_phone,
        pan: params.nseDetails.pan,
        pincode: params.nseDetails.pincode,
        res_fax: params.nseDetails.res_fax,
        res_phone: "",
        state: params.nseDetails.state.STATE_CODE,
        tax_status: params.nseDetails.tax_status.TAX_STATUS_CODE,
        title: params.nseDetails.title,
        trxn_acceptance: params.nseDetails.trxn_acceptance,
        valid_pan: params.nseDetails.valid_pan,
        Email_relation:
          params.nseDetails?.email_relation ||
          params.nseDetails?.Email_relation,
        Mobile_relation:
          params.nseDetails?.mobile_relation ||
          params.nseDetails?.Mobile_relation,
      },
    };
    const FatcaObj = {
      service_request: {
        pan: params.nseDetails.pan,
        tax_status: "",
        investor_name: params.nseDetails.inv_name,
        chkExempIndValid: "Y",
        editor_id: "",
        KYC_availability: "Y",
        FATCA_availability: "Y",
        UBO_availability: "N",
        ubo_applicable_count: "0",
        KYC: {
          app_income_code: fatcaDetails?.app_income?.APP_INCOME_CODE,
          net_worth_sign: "",
          net_worth: "",
          net_worth_date: "",
          pep: fatcaDetails?.pep?.code,
          occ_code: params?.nseDetails?.occupation?.OCCUPATION_CODE,
          source_wealth: fatcaDetails?.source_wealth?.CODE,
          corp_servs: "",
          aadhaar_rp: "",
        },
        Fatca: {
          dob: params.nseDetails.dob
            ? moment(params.nseDetails.dob).format("DD-MMM-YYYY")
            : "",
          addr_type: params?.fatcaDetails?.addr_type?.code,
          data_src: "E",
          log_name: params.nseDetails.email,
          country_of_birth: "IND",
          place_birth: params?.fatcaDetails?.place_birth?.STATE_NAME,
          tax_residency: "",
          country_tax_residency1: "",
          tax_payer_identityno1: "",
          id1_type: "",
          country_tax_residency2: "",
          tax_payer_identityno2: "",
          id2_type: "",
          country_tax_residency3: "",
          tax_payer_identityno3: "",
          id3_type: "",
          country_tax_residency4: "",
          tax_payer_identityno4: "",
          id4_type: "",
          ffi_drnfe: "N",
          nffe_catg: "N",
          nature_bus: " ",
          act_nfe_subcat: " ",
          stock_exchange: " ",
          listed_company: " ",
          us_person: "N",
          exemp_code: " ",
          giin_applicable: "N",
          giin: " ",
          giin_exem_cat: " ",
          sponcer_entity: " ",
          giin_not_app: "N",
          fatca_dec_received: "Y",
        },
        occupation: params?.nseDetails?.occupation?.OCCUPATION_CODE,
        city: params.nseDetails.city.CITY,
      },
    };

    // setTimeout(() => createRegister(paramsNew, token), 3000);
    setTimeout(() => {
      if (!props?.navigation?.state?.params?.newBankAccount) {
        createRegister(paramsNew, token);
        setTimeout(() => {
          FatcaKYC(FatcaObj, token);
        }, 5000);
      } else {
      }
    }, 3000);
    pageActive.current = true;
    return;
  };

  const onComplete = () => {
    setVisible(false);
    if (isInn && isExit) {
      props.navigation.navigate("Existing");
    } else {
      props.navigation.navigate("UploadDocument");
    }
  };

  const onActionNewBank = async () => {
    console.log(
      "🚀 ~ onActionNewBank ~ bankDetails:",
      JSON.stringify(bankDetails)
    );

    const {
      accountType,
      accountNumber,
      ifsc,
      bank,
      branchName,
      branchAddress,
      showBank,
    } = state;
    if (!accountType) {
      setErrors({ ...errors, accountType: "Please Select a Value" });
      return;
    }
    if (!accountNumber) {
      setErrors({ ...errors, accountNumber: "Please Add a Value" });
      return;
    }
    if (accountNumber.length < 9 || accountNumber.length > 21) {
      setErrors({ ...errors, accountNumber: "Please Add a Valid Value" });
      return;
    }
    if (!ifsc) {
      setErrors({ ...errors, ifsc: "Please Add a Value" });
      return;
    }
    if (ifsc.length < 9 || ifsc.length > 20) {
      setErrors({ ...errors, ifsc: "Please Add a Valid Value" });
      return;
    }
    if (!showBank) {
      setErrors({ ...errors, showBank: "Please Fetch Bank Details" });
      return;
    }
    if (!bank) {
      setErrors({ ...errors, bank: "Please Select a Value" });
      return;
    }
    if (!branchName) {
      setErrors({ ...errors, branchName: "Please Add a Value" });
      return;
    }
    if (!branchAddress) {
      setErrors({ ...errors, branchAddress: "Please Add a Value" });
      return;
    }

    let params = { ...{ nseDetails }, ...{ fatcaDetails }, ...{ userDetails } };

    var obj = {
      process_flag: "I",
      iin: user?.IIN,
      acc_no: accountNumber,
      acc_type: accountType,
      ifsc_code: ifsc,
      micr_no: bankDetails?.micrCode,
      bank_name: bank,
      branch_name: branchName,
      branch_address1: branchAddress,
      branch_city: bankDetails?.city,
      branch_country: "IND",
      branch_pincode: bankDetails?.pincode ? bankDetails?.pincode : "",
      proof_of_account: state?.proofOfAccountSelected,
      acc_rel: "G",
      default_bank: "Y",
      image: img,
    };
    console.log("🚀 ~ onActionNewBank ~ obj:", obj);
    createRegister(obj, token);
  };

  return (
    <>
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
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
      {isFetching && (
        <View style={Styles.loading}>
          <ActivityIndicator color={Colors.BLACK} size="large" />
        </View>
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        // behavior="position"
        enabled
      >
        <ScrollView>
          <View style={styles.heading_sec}>
            <Text style={styles.heading}>
              Your bank account details are required as they need to be linked
              to your mutual fund account so that you can do the transactions.
              Your bank account details are safe and stored in encrypted format
              in NSE.
            </Text>
          </View>

          {/* state_sec */}
          <View style={styles.container_sec}>
            <Text style={styles.occupation}>
              Account Type <Text style={styles.error}>*</Text>
            </Text>
            <MySelectPicker
              values={accountTypeList}
              defultValue={state.accountType}
              error={errors.accountType}
              placeholder={"Select A/C type"}
              onChange={(accountType) => {
                setErrors({ ...errors, accountType: null });
                setState({ ...state, accountType });
              }}
            />

            <Text style={styles.occupation}>
              Account No. <Text style={styles.error}>*</Text>
            </Text>
            <MyTextInput
              keyboardType="numeric"
              maxLength={16}
              value={state.accountNumber}
              error={errors.accountNumber}
              onChangeText={(accountNumber) => {
                setErrors({ ...errors, accountNumber: null });
                setState({ ...state, accountNumber });
              }}
            />

            <Text style={styles.occupation}>
              IFSC Code <Text style={styles.error}>*</Text>
            </Text>
            <MyTextInput
              value={state.ifsc}
              error={errors.ifsc}
              autoCapitalize={"characters"}
              maxLength={11}
              onChangeText={(ifsc) => {
                setErrors({ ...errors, ifsc: null });
                setState({ ...state, ifsc });
              }}
            />

            <View style={{ alignItems: "center" }}>
              {isFetching ? (
                <View style={styles.botton_box}>
                  <ActivityIndicator size={30} color={Colors.WHITE} />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    if (
                      state.accountNumber.length < 9 ||
                      state.accountNumber.length > 21
                    ) {
                      setErrors({
                        ...errors,
                        accountNumber: "Please Add a Valid Value",
                      });
                    } else {
                      getBankDetails(state.ifsc, token);
                      setErrors({ ...errors, showBank: null });
                    }
                  }}
                  style={[styles.botton_box, { marginTop: 10 }]}
                >
                  <Text style={styles.get_otp}>Fetch Bank Details</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          {/* <View style={styles.container_sec}>
            <Text style={styles.occupation}>
              Account Type <Text style={styles.error}>*</Text>
            </Text>
            <MySelectPicker
              values={accountTypeList}
              defultValue={state.accountType}
              error={errors.accountType}
              placeholder={"Select A/C type"}
              onChange={(accountType) => {
                setErrors({ ...errors, accountType: null });
                setState({ ...state, accountType });
              }}
            />

            <Text style={styles.occupation}>
              Account No. <Text style={styles.error}>*</Text>
            </Text>
            <MyTextInput
              keyboardType="numeric"
              maxLength={16}
              value={state.accountNumber}
              error={errors.accountNumber}
              onChangeText={(accountNumber) => {
                setErrors({ ...errors, accountNumber: null });
                setState({ ...state, accountNumber });
              }}
            />

            <Text style={styles.occupation}>
              IFSC Code <Text style={styles.error}>*</Text>
            </Text>
            <MyTextInput
              value={state.ifsc}
              error={errors.ifsc}
              autoCapitalize={"characters"}
              maxLength={20}
              onChangeText={(ifsc) => {
                setErrors({ ...errors, ifsc: null });
                setState({ ...state, ifsc });
              }}
            />

            <View style={{ alignItems: "center" }}>
              {isFetching ? (
                <View style={styles.botton_box}>
                  <ActivityIndicator size={30} color={Colors.WHITE} />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    if (
                      state.accountNumber.length < 9 ||
                      state.accountNumber.length > 21
                    ) {
                      setErrors({
                        ...errors,
                        accountNumber: "Please Add a Valid Value",
                      });
                    } else {
                      getBankDetails(state.ifsc, token);
                      setErrors({ ...errors, showBank: null });
                    }
                  }}
                  style={[styles.botton_box, { marginTop: 10 }]}
                >
                  <Text style={styles.get_otp}>Fetch Bank Details</Text>
                </TouchableOpacity>
              )}
            </View>
          </View> */}

          {/* botton_box_sec */}
          <View
            style={{
              borderWidth: 6,
              borderColor: "#fff",
              marginVertical: 10,
            }}
          ></View>
          {errors.showBank && !state.showBank && (
            <Text style={[styles.error, { textAlign: "center" }]}>
              {errors.showBank}
            </Text>
          )}

          {/* container_2_sec */}
          {state.showBank && state.ifsc != "" && state.ifsc.length > 5 && (
            <View style={styles.container_sec}>
              <Text style={styles.occupation}>
                Bank Name <Text style={styles.error}>*</Text>
              </Text>
              <MySelectPicker
                values={bankList}
                defultValue={state.bank}
                error={errors.bank}
                onChange={(bank) => {
                  setErrors({ ...errors, bank: null });
                  setState({ ...state, bank });
                }}
              />

              <Text style={styles.occupation}>
                Branch Name <Text style={styles.error}>*</Text>
              </Text>
              <MyTextInput
                value={state.branchName}
                error={errors.branchName}
                onChangeText={(branchName) => {
                  setErrors({ ...errors, branchName: null });
                  setState({ ...state, branchName });
                }}
              />

              <Text style={styles.occupation}>
                Branch Address <Text style={styles.error}>*</Text>
              </Text>
              <MyTextInput
                value={state.branchAddress}
                error={errors.branchAddress}
                onChangeText={(branchAddress) => {
                  setErrors({ ...errors, branchAddress: null });
                  setState({ ...state, branchAddress });
                }}
              />
            </View>
          )}

          {/* click_box */}
          {!props?.navigation?.state?.params?.newBankAccount ? (
            <View style={styles.footer}>
              <View style={styles.click_box}>
                <TouchableOpacity
                  onPress={() => props.navigation.goBack()}
                  style={styles.botton_box}
                >
                  <Text style={styles.get_otp}>Previous</Text>
                </TouchableOpacity>
                {isFetching ? (
                  <View style={styles.botton_box}>
                    <ActivityIndicator size={30} color={Colors.WHITE} />
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={onAction}
                    style={styles.botton_box}
                  >
                    <Text style={styles.get_otp}>Next</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ) : (
            <>
              {/* <TouchableOpacity
                
                style={{ marginVertical: 10 }}
              > */}
              {props?.navigation?.state?.params?.newBankAccount && (
                <View style={{ marginBottom: 10, marginHorizontal: 10 }}>
                  <Text style={styles.occupation}>
                    Proof Of Account <Text style={styles.error}>*</Text>
                  </Text>
                  <MySelectPicker
                    values={proof_of_account}
                    defultValue={state?.proofOfAccountSelected}
                    error={errors.accountType}
                    placeholder={"Select Proof of Account"}
                    onChange={(proofOfAccountSelected) => {
                      console.log(
                        "🚀 ~ CompleteDetailsBankScreen ~ proofOfAccountSelected:",
                        proofOfAccountSelected
                      );
                      setErrors({ ...errors, accountType: null });
                      setState({ ...state, proofOfAccountSelected });
                    }}
                  />
                </View>
              )}
              <TouchableOpacity
                // onPress={onActionNewBank}
                onPress={() =>
                  Alert.alert("SIP Fund", "Document", [
                    {
                      text: "Cancel",
                      onPress: () => {},
                    },
                    {
                      text: "Camera",
                      onPress: () => {
                        setCamera(true);
                      },
                    },
                    {
                      text: "Document",
                      onPress: () => {
                        pickImage();
                      },
                    },
                  ])
                }
                style={[
                  styles.botton_box,
                  { width: "87%", alignSelf: "center", marginVertical: 20 },
                ]}
              >
                <Text style={styles.get_otp}>Attach Document</Text>
              </TouchableOpacity>
              {img && (
                <>
                  <Image
                    source={{ uri: img }}
                    style={{ height: 80, width: 80, marginLeft: 30 }}
                  />
                  <Text style={[styles.error, { textAlign: "center" }]}>
                    Document attached*
                  </Text>
                </>
              )}
              <Modal
                animationType="slide"
                transparent={true}
                visible={camera}
                onRequestClose={() => {
                  setCamera(false);
                }}
              >
                <SafeAreaView style={StyleSheet.absoluteFill}>
                  <Camera
                    style={{ flex: 1 }}
                    ratio="16:9"
                    // flashMode={Camera.Constants.FlashMode.on}
                    type={type}
                    ref={(ref) => {
                      setCameraRef(ref);
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: "transparent",
                        justifyContent: "flex-end",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "black",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          icon="close"
                          style={{ marginLeft: 12 }}
                          mode="outlined"
                          color="white"
                          onPress={() => {
                            setCamera(false);
                          }}
                        >
                          Close
                        </Button>
                        <TouchableOpacity
                          onPress={async () => {
                            if (cameraRef) {
                              let photo = await cameraRef.takePictureAsync();
                              // alert(JSON.stringify(photo));
                              cameraImage(photo);
                              // setImg(photo);
                              setCamera(false);
                            }
                          }}
                        >
                          <View
                            style={{
                              borderWidth: 2,
                              borderRadius: 50,
                              borderColor: "white",
                              height: 50,
                              width: 50,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginBottom: 16,
                              marginTop: 16,
                            }}
                          >
                            <View
                              style={{
                                borderWidth: 2,
                                borderRadius: 50,
                                borderColor: "white",
                                height: 40,
                                width: 40,
                                backgroundColor: "white",
                              }}
                            ></View>
                          </View>
                        </TouchableOpacity>
                        <Button
                          icon="axis-z-rotate-clockwise"
                          style={{ marginRight: 12 }}
                          mode="outlined"
                          color="white"
                          onPress={() => {
                            setType(
                              type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                            );
                          }}
                        >
                          {type === Camera.Constants.Type.back
                            ? "Front"
                            : "Back "}
                        </Button>
                      </View>
                    </View>
                  </Camera>
                </SafeAreaView>
              </Modal>
              {/* <Image
                  source={
                    // img
                    //   ? { uri: img }
                    // :
                    require("../../../assets/profile_img.png")
                  }
                  style={{ height: 120, width: 120 }}
                /> */}
              {/* </TouchableOpacity> */}
              <View style={styles.footer}>
                <View style={styles.click_box}>
                  {/* <TouchableOpacity
                  onPress={() => props.navigation.goBack()}
                  style={styles.botton_box}
                >
                  <Text style={styles.get_otp}>Previous</Text>
                </TouchableOpacity> */}
                  {isFetching ? (
                    <View style={[styles.botton_box, { width: "100%" }]}>
                      <ActivityIndicator size={30} color={Colors.WHITE} />
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={onActionNewBank}
                      style={[styles.botton_box, { width: "100%" }]}
                    >
                      <Text style={styles.get_otp}>Submit</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
      <Overlay
        isVisible={visible}
        overlayStyle={{ margin: 10, backgroundColor: "#fff" }}
      >
        <View style={{ padding: 10 }}>
          <Text
            style={{ paddingVertical: 5, fontSize: 18, fontWeight: "bold" }}
          >
            Thank you for creating your investor account!
          </Text>
          <Text
            style={{
              paddingVertical: 5,
              fontSize: 15,
              fontWeight: "bold",
              color: "#7E7E7E",
            }}
          >
            Please check your email and approve the link sent by NSE for your
            account activation.
          </Text>
          <TouchableOpacity onPress={() => onComplete()}>
            <Text style={{ color: "#ff0000", paddingTop: 20 }}>OK</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  header: {
    borderBottomColor: Colors.BLACK,
    borderBottomWidth: 1,
    backgroundColor: "#fff",
    zIndex: 100,
  },
  container_sec: {
    padding: 10,
  },
  error: {
    color: "#ff0000",
    padding: 5,
  },
  logimg: {
    height: 65,
    width: 203,
    marginTop: 10,
  },
  heading_sec: {
    padding: 12,
  },
  heading: {
    fontSize: 12,
  },
  occupation: {
    fontSize: 15,
    color: Colors.DEEP_GRAY,
    fontWeight: "bold",
    marginTop: 10,
  },
  example: {
    fontSize: 15,
    marginTop: 10,
    marginLeft: 10,
  },
  private_sector: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 5,
  },
  private: {
    fontSize: 15,
    width: "92%",
    marginBottom: 2,
    marginLeft: 10,
  },
  Pincode: {
    color: Colors.RED,
    fontSize: 15,
    marginTop: 10,
  },
  footer: {
    alignItems: "center",
  },
  click_box: {
    flexDirection: "row",
    marginHorizontal: 25,
  },
  botton_box: {
    width: "50%",
    backgroundColor: Colors.RED,
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  get_otp: {
    color: Colors.WHITE,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
const mapStateToProps = (state) => ({
  isFetching: state.registration.isFetching,
  token: state.auth.token,
  user: state.auth.user,
  nseDetails: state.registration.nseDetails,
  fatcaDetails: state.registration.fatcaDetails,
  userDetails: state.registration.userDetails,
  accountTypes: state.registration.accountTypes,
  banks: state.registration.banks,
  bankDetails: state.registration.bankDetails,
  isExit: state.registration.isExit,
  isInn: state.registration.isInn,
  bankTypeDetails: state.registration.bankTypeDetails,
  proofOfAccount: state.registration.proofOfAccount,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { RegistrationActions } = require("../../store/RegistrationRedux");
  const { HomeActions } = require("../../store/HomeRedux");
  return {
    ...stateProps,
    ...ownProps,
    getBankDetails: (code, token) => {
      RegistrationActions.getBankDetails(dispatch, code, token);
    },
    getAccountType: (code, token) => {
      RegistrationActions.getAccountType(dispatch, code, token);
    },
    getProofOfAccount: (code, token) => {
      RegistrationActions.getProofOfAccount(dispatch, code, token);
    },
    createRegister: (params, token) => {
      RegistrationActions.createRegister(dispatch, params, token);
    },
    FatcaKYC: (params, token) => {
      RegistrationActions.FatcaKYC(dispatch, params, token);
    },
    updateRegister: (params, token) => {
      RegistrationActions.updateRegister(dispatch, params, token);
    },
    settings: (token) => {
      RegistrationActions.settings(dispatch, token);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(CompleteDetailsBankScreen);
