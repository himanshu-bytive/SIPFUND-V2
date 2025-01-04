import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Typography from '../../components/Atom/Typography/Typography';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Button from '../../components/Atom/Button/Button';
import { Header } from 'react-native-elements';
import AntDesign from "react-native-vector-icons/AntDesign";
import Colors from '../../common/Colors';
import SIPLOGO from '../../../assets/SVG-ICONS/SipLogo.svg';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CheckboxCircle from '../../components/Atom/CheckBox/CheckBox';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckboxSquare from '../../components/Atom/CheckBox/CheckBox';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { getDateInHuman } from '../../utils/getDateInFormat';
const UnderAgeNominee = (props) => {
    const {
        nseDetails,
        fatcaDetails,
        token,
        userDetails,
        updateRegister
    } = props
    const [stepCount, setStepCount] = useState(1);
    const [NomineeIsYours, setNomineeIsYours] = useState("");
    const navigation = useNavigation();
    const [state, setState] = useState({
        nominee1_guard_name : "",
        nominee1_guard_pan: "",
        nominee1_guard_relation: "",
    });

    const [errors, setErrors] = useState({
        nominee1_guard_name : null,
        nominee1_guard_pan: null,
        nominee1_guard_relation: null,
    });

    useEffect(() => {
        console.log("NSE_details", nseDetails);

    }, []);

    const handleBackPress = () => {
        if (stepCount === 2) {
            setStepCount(stepCount - 1);
        } else {
            navigation.navigate("Home");
        }
    };

    useEffect(() => {
        console.log("NomineeDetails", nseDetails);
        if (fatcaDetails || nseDetails || userDetails) {
            setState({
                nominee1_guard_name : state.nominee1_guard_name,
                nominee1_guard_pan: state?.nominee1_guard_pan,
                nominee1_guard_relation: NomineeIsYours,
            });
        }
    }, [fatcaDetails, nseDetails, userDetails]);
    const onAction = () => {
        console.log("hgf");

        const params = {
            nseDetails: {
                ...nseDetails,
                nominee1_guard_name : state?.nominee1_guard_name,
                nominee1_guard_pan: state?.nominee1_guard_pan,
                nominee1_guard_relation: NomineeIsYours,
            },
            fatcaDetails,
            userDetails,
        };
        console.log("passing paramss", params);
        updateRegister(params, token);
        navigation.navigate("Reg", { screen: "RegisterAddress" }); 
    }

    const mobileEmailRelation = [
        { value: "SE", label: "Self" },
        { value: "SP", label: "Spouse" },
        { value: "DC", label: "Dependent Children" },
        { value: "DS", label: "Dependent Siblings" },
        { value: "DP", label: "Dependent Parents" },
        { value: "GD", label: "Guardian" },
        { value: "PM", label: "PMS" },
        { value: "CD", label: "Custodian" },
        { value: "PO", label: "POA" },
    ];
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {/* Header */}
            <Header
                containerStyle={[styles.headerContainer, { backgroundColor: 'white' }]}
                statusBarProps={{ backgroundColor: 'white', barStyle: 'dark-content' }}
                leftComponent={
                    <AntDesign
                        name="arrowleft"
                        size={25}
                        color={Colors.BLACK}
                        onPress={handleBackPress}
                    />
                }
                rightComponent={<SIPLOGO width={95} height={25} />}
            />

            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.stepContainer}>
                        <View style={{marginBottom:20}}>
                        <Typography fontSize={responsiveFontSize(2.5)} lineHeight={25} fontWeight={"700"}>
                            Add guardian for your nominee
                        </Typography>
                        <Typography fontSize={responsiveFontSize(2)} lineHeight={25}>
                            As your nominees age is below 18 years, kindly add nominee’s guardian.
                        </Typography>
                        </View>
                        <Typography style={styles.title}>Guardian name*</Typography>
                        <TextInput
                            style={styles.inputsec}
                            editable={true}
                            placeholder="Enter Name"
                            placeholderTextColor={"grey"}
                            value={state.nominee1_guard_name ? state.nominee1_guard_name : ""}
                            onChangeText={(text) => setState((prevState) => ({ ...prevState, nominee1_guard_name: text }))}
                        />
                        <Typography style={styles.title}>Guardian Relation*</Typography>
                        <View style={[styles.inputsec]}>
                            <Picker
                                selectedValue={NomineeIsYours ? NomineeIsYours : ""}
                                onValueChange={(itemValue) => setNomineeIsYours(itemValue)}
                                style={[
                                    styles.picker,
                                    NomineeIsYours === "" && { color: "grey" }, // Placeholder color
                                  ]}
                            >
                                <Picker.Item label="Select" value="" />
                                {mobileEmailRelation.map((state) => (
                                    <Picker.Item key={state.value} label={state.label} value={state.value} />
                                ))}
                            </Picker>
                        </View>
                        <Typography style={styles.title}>Guardian PAN*</Typography>
                        <TextInput
                            style={styles.inputsec}
                            editable={true}
                            placeholder="Enter Name"
                            placeholderTextColor={"grey"}
                            value={state.nominee1_guard_pan ? state.nominee1_guard_pan : ""}
                            onChangeText={(text) => setState((prevState) => ({ ...prevState, nominee1_guard_pan: text }))}
                        />
                        <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
                            <Button
                                borderColor={"red"}
                                borderWidth={1}
                                fontSize={responsiveFontSize(2)}
                                height={responsiveHeight(5)}
                                width={responsiveWidth(80)}
                                text={"Next"}
                                textColor={"black"}
                                onPress={onAction}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
    },
    picker: {
        height: 50,
        width: 200,
        color: "black", // Default color for selected values
      },
    error: {
        color: "#ff0000",
        padding: 5,
    },
    circleIcon: {
        width: 24, // Circle diameter
        height: 24,
        borderRadius: 12, // Makes the shape circular
        backgroundColor: '#8BE28B', // Light green background
        justifyContent: 'center', // Centers the icon horizontally
        alignItems: 'center', // Centers the icon vertically

    },
    checkboxText: {
        fontSize: responsiveFontSize(1.5),
        color: Colors.BLACK,
        // Adjust margin to fit properly
        marginTop: 0, // or fine-tune as needed
    },

    text_box: {
        flexDirection: "column",
        width: "100%",
        marginTop: 20
    },
    sub_slogan: {
        fontSize: responsiveFontSize(2.5),
        color: Colors.BLACK,
        marginBottom: responsiveHeight(1),
    },
    inputsecWrapper: {
        borderWidth: 1,
        borderColor: "#FFB2AA",
        borderRadius: 12,
        alignItems: "flex-end",
        height: responsiveHeight(10),
        paddingHorizontal: 10,
        backgroundColor: Colors.WHITE,
        overflow: 'hidden', // To ensure the border applies to the dropdown correctly
    },
    inputsec: {
        height: responsiveHeight(6),
        fontSize: responsiveFontSize(2),
        color: "black",
        backgroundColor: Colors.WHITE,
        borderColor: "#FFB2AA",
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 10,
        marginBottom: 10,
        justifyContent:"center"
    },
    headerContainer: {
        backgroundColor: 'white',
        height: responsiveHeight(8),
        marginTop: 20
    },
    headerTitle: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
        color: Colors.BLACK,
    },
    logo: {
        width: 40,
        height: 40,
    },
    stepContainer: {
        flex: 1,
        width: '100%',
        marginTop: 20,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'left',
        marginTop: 10
    },
    subText: {
        fontSize: 14,
        color: '#777',
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        position: 'absolute',
        bottom: 30,
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        gap: 10,
        marginLeft: 20
    },
});

const mapStateToProps = (state) => ({
    token: state.auth.token,
    nseDetails: state.registration.nseDetails,
    fatcaDetails: state.registration.fatcaDetails,
    userDetails: state.registration.userDetails,
    isFetching: state.registration.isFetching,
    relationList: state.registration.nomineeRelationship,
    minor_gaurdian_relationship_list: state.registration.minorGaurdianRelationship,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
    const { dispatch } = dispatchProps;
    const { RegistrationActions } = require("../../store/RegistrationRedux");
    return {
        ...stateProps,
        ...ownProps,
        updateRegister: (params, token) => {
            RegistrationActions.updateRegister(dispatch, params, token);
        },
    };
};

export default connect(
    mapStateToProps,
    undefined,
    mapDispatchToProps
)(UnderAgeNominee);
