import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Button from '../../components/Atom/Button/Button';
import Colors from '../../common/Colors';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AntDesign from "react-native-vector-icons/AntDesign";
import { Image } from 'react-native-elements';

const Occupation = (props) => {
    const {
        nseDetails,
        fatcaDetails,
        userDetails,
        token,
        occupations,
        settings,
        updateRegister,
    } = props;

    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState(null);
    const [state, setState] = useState({
        occupation: "",
    });
    const [errors, setErrors] = useState({
        occupation: null,
    });

    // Check if data is loading (i.e., occupations is not yet available)
    const isLoading = !occupations || occupations.length === 0;

    // Memoized list of occupations
    const occupationsList = useMemo(
        () =>
            occupations
                ? occupations.map((item) => ({
                    value: item.OCCUPATION_CODE,
                    label: String(item.OCCUPATION_DESC),
                }))
                : [],
        [occupations]
    );

    useEffect(() => {
        settings(token); // Fetch settings using the token
    }, [token, settings]);

    // Preselect the occupation if nseDetails?.occupation has value
    useEffect(() => {
        if (nseDetails?.occupation) {
            const preSelectedOccupation = occupationsList.find(
                (occupation) => occupation.label === nseDetails.occupation.OCCUPATION_DESC// Matching by label
            );
            if (preSelectedOccupation) {
                setState((prevState) => ({
                    ...prevState,
                    occupation: preSelectedOccupation.value, // Set the value based on the selected label
                }));
                setSelected(preSelectedOccupation.value); // Preselect the occupation
            }
        }
    }, [nseDetails, occupationsList]); // Ensure occupationsList is ready before setting the selected value

    const handleSelect = (occupation) => {
        setSelected(occupation.value); // Set selected value
        setState((prevState) => ({ ...prevState, occupation: occupation.value })); // Store the occupation code
    };

    const validateStepOne = () => {
        const { occupation } = state;
        let isValid = true;

        if (!occupation) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                occupation: "Please Select Occupation",
            }));
            setShowModal(true);
            isValid = false;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                occupation: null,
            }));
            setShowModal(false);
        }
        return isValid;
    };

    const onAction = () => {
        console.log("OCC", occupations);

        if (validateStepOne()) {
            // Find the selected occupation by its code
            const selectedOccupation = occupations.find(
                (occupation) => occupation.OCCUPATION_CODE === state.occupation
            );

            // Create the params object with the occupation description
            const params = {
                nseDetails: {
                    ...nseDetails,
                    occupation: {
                        OCCUPATION_CODE : selectedOccupation?.OCCUPATION_CODE,
                        OCCUPATION_DESC : selectedOccupation?.OCCUPATION_DESC
                    }
                },
                fatcaDetails,
                userDetails,
            };

            console.log("GOT PARAMS", params);

            // Proceed with the registration update
            updateRegister(params, token);
            props.navigation.navigate("OnBoard", { screen: "Income" });
        }
    };

    return (
        <View style={styles.mainContainer}>
            {/* Loader */}
            {isLoading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={Colors.RED} />
                </View>
            ) : (
                <>
                    <View style={styles.headerRow}>
                        <TouchableOpacity
                            onPress={() => { props.navigation.navigate("OnBoard", { screen: "ProfileDetailsForm" }) }}
                            style={styles.arrowButton}
                        >
                            <AntDesign name={"arrowleft"} size={35} color="#000" />
                        </TouchableOpacity>
                        <Image
                            source={require("../../../assets/icon.png")}
                            style={styles.logimg}
                        />
                    </View>
                    {/* Occupation Grid */}
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <View>
                            <Text style={{ marginLeft: 20, color: "black", fontWeight: "bold",fontSize:20 }}>Occupation</Text>
                            <Text style={{marginLeft:20,color:"black"}}>Select one of the option</Text>
                        </View>
                        <View style={styles.container}>

                            {occupationsList.map((occupation, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.option,
                                        selected === occupation.value
                                            ? styles.selectedOption
                                            : styles.unselectedOption,
                                    ]}
                                    onPress={() => handleSelect(occupation)}
                                >
                                    <Text style={[styles.text, selected === occupation.value ? styles.buttonSelected : styles.buttonUnselected]}>
                                        {occupation.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <Modal
                            visible={showModal}
                            transparent={true}
                            animationType="none"
                            onRequestClose={() => setShowModal(false)}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <Text style={styles.modalText}>
                                        Please Select Occupation Before Proceeding.
                                    </Text>
                                    <Button
                                        text="OK"
                                        onPress={() => setShowModal(false)}
                                        backgroundColor={Colors.RED}
                                        textColor={Colors.WHITE}
                                        height={40}
                                        width={100}
                                    />
                                </View>
                            </View>
                        </Modal>
                    </ScrollView>

                    {/* Bottom Button Section */}
                    <View style={styles.bottomSection}>
                        <TouchableOpacity style={styles.nextButton} onPress={onAction}>
                            <Text style={styles.buttonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    buttonSelected: {
        color: "white"
    },
    buttonUnselected: {
        color: "black"
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white', // Ensures a solid white background
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: Colors.WHITE,
        marginTop: 30,
    },
    arrowButton: {
        marginLeft: 10,
    },
    logimg: {
        width: responsiveWidth(35),
        height: responsiveHeight(7),
        resizeMode: "contain",
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
    },
    option: {
        width: '45%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderRadius: 8,
        borderWidth: 1,
        padding: 5
    },
    unselectedOption: {
        borderColor: Colors.RED,
        backgroundColor: 'white',
    },
    selectedOption: {
        backgroundColor: Colors.RED,
        borderColor: 'white',
    },
    text: {
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    bottomSection: {
        backgroundColor: 'white',
        padding: 15,
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    nextButton: {
        backgroundColor: Colors.RED,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "80%",
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
    },
    modalText: {
        fontSize: 18,
        color: "black",
        marginBottom: 20,
        textAlign: "center",
    },
});

const mapStateToProps = (state) => ({
    token: state.auth.token,
    nseDetails: state.registration.nseDetails,
    fatcaDetails: state.registration.fatcaDetails,
    userDetails: state.registration.userDetails,
    occupations: state.registration.occupations,
});

const mapDispatchToProps = (dispatch) => {
    const { RegistrationActions } = require("../../store/RegistrationRedux");
    return {
        settings: (token) => {
            RegistrationActions.settings(dispatch, token);
        },
        updateRegister: (params, token) => {
            RegistrationActions.updateRegister(dispatch, params, token);
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Occupation);
