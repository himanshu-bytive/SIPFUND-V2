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
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

const UnderAgeNomineeSecond = (props) => {
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
        nominee2_guard_name: "",
        nominee2_guard_pan: "",
        nominee2_relation: "",
    });

    const [errors, setErrors] = useState({
        nominee2_guard_name: null,
        nominee2_guard_pan: null,
        nominee2_relation: null,
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
                nominee2_guard_name: state.nominee2_guard_name,
                nominee2_guard_pan: state?.nominee2_guard_pan,
                nominee2_guard_relation: NomineeIsYours,
            });
        }
    }, [fatcaDetails, nseDetails, userDetails]);
    const onAction = () => {
        // Initialize a flag to track errors
        let hasErrors = false;

        // Validate Guardian Name
        if (!state.nominee2_guard_name.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                nominee1_guard_name: "Please Enter the guardian's name.",
            }));
            hasErrors = true;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                nominee1_guard_name: null,
            }));
        }

        // Validate Guardian Relation
        if (!NomineeIsYours) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                nominee2_relation: "Please select the guardian's relation.",
            }));
            hasErrors = true;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                nominee2_relation: null,
            }));
        }

        // Validate Guardian PAN
        if (!state.nominee2_guard_pan.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                nominee2_guard_pan: "Please Enter the guardian's PAN.",
            }));
            hasErrors = true;
        } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(state.nominee2_guard_pan.trim())) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                nominee2_guard_pan: "Please Enter a valid PAN (e.g., ABCDE1234F).",
            }));
            hasErrors = true;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                nominee2_guard_pan: null,
            }));
        }

        // Prevent navigation if there are errors
        if (hasErrors) return;

        // Proceed with valid data
        const params = {
            nseDetails: {
                ...nseDetails,
                nominee2_guard_name: state.nominee2_guard_name.trim(),
                nominee2_guard_pan: state.nominee2_guard_pan.trim(),
                nominee2_relation: NomineeIsYours,
            },
            fatcaDetails,
            userDetails,
        };
        console.log("passing params", params);
        updateRegister(params, token);
        navigation.navigate("Reg", { screen: "RegisterAddress" });
    };

    const mobileEmailRelation = [
        { value: "M", label: "Mother" },
        { value: "F", label: "Father" },
        { value: "C", label: "Court Appointed Legal Guardian" },
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
                        <View style={{ marginBottom: 20 }}>
                            <Typography fontSize={responsiveFontSize(2.5)} lineHeight={25} fontWeight={"700"}>
                                Add guardian for your 2nd nominee
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
                            value={state.nominee2_guard_name || ""}
                            onChangeText={(text) => {
                                setState((prevState) => ({ ...prevState, nominee2_guard_name: text }));
                                setErrors((prevErrors) => ({ ...prevErrors, nominee2_guard_name: null })); // Clear error on input
                            }}
                        />
                        {errors.nominee2_guard_name && (
                            <Text style={styles.error}>{errors.nominee2_guard_name}</Text>
                        )}

                        <Typography style={styles.title}>Guardian Relation*</Typography>
                        <View style={[styles.inputsec]}>
                            <Picker
                                selectedValue={NomineeIsYours || ""}
                                onValueChange={(itemValue) => {
                                    setNomineeIsYours(itemValue);
                                    setErrors((prevErrors) => ({ ...prevErrors, nominee2_relation: null })); // Clear error on selection
                                }}
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
                        {errors.nominee2_relation && (
                            <Text style={styles.error}>{errors.nominee2_relation}</Text>
                        )}

                        <Typography style={styles.title}>Guardian PAN*</Typography>
                        <TextInput
                            style={styles.inputsec}
                            editable={true}
                            placeholder="Enter PAN"
                            placeholderTextColor={"grey"}
                            value={state.nominee2_guard_pan || ""}
                            onChangeText={(text) => {
                                setState((prevState) => ({ ...prevState, nominee2_guard_pan: text }));
                                setErrors((prevErrors) => ({ ...prevErrors, nominee2_guard_pan: null })); // Clear error on input
                            }}
                        />
                        {errors.nominee2_guard_pan && (
                            <Text style={styles.error}>{errors.nominee2_guard_pan}</Text>
                        )}

                        <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
                            <Button
                                borderColor={Colors.RED}
                                borderWidth={2}
                                fontSize={responsiveFontSize(2)}
                                height={responsiveHeight(5)}
                                width={responsiveWidth(90)}
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
    error: {
        color: "#FF0000",
        fontSize: responsiveFontSize(1.5),
        marginBottom: 10,
    },
    
    picker: {
        height: 50,
        width: "auto",
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
        borderColor: Colors.RED,
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
        borderColor: Colors.RED,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 10,
        marginBottom: 10,
        justifyContent: "center"
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
)(UnderAgeNomineeSecond);
