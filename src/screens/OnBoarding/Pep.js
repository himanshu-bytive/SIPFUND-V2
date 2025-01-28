import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Button from '../../components/Atom/Button/Button';
import Colors from '../../common/Colors';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AntDesign from "react-native-vector-icons/AntDesign";
import { Image } from 'react-native-elements';

const pepList = [
    { value: "N", label: "No" },
    { value: "Y", label: "Yes" },
];

const Pep = (props) => {
    const {
        nseDetails,
        fatcaDetails,
        userDetails,
        token,
        settings,
        updateRegister
    } = props;

    const [showModal, setShowModal] = useState(false);
    const [pep, setPep] = useState(undefined);
    const [errors, setErrors] = useState({
        pep: null,
    });

    const isLoading = !nseDetails || !fatcaDetails || !userDetails;

    useEffect(() => {
        settings(token); // Fetch settings using the token
    }, [token, settings]);

    useEffect(() => {
        if (fatcaDetails || nseDetails || userDetails) {
            // Preselect PEP if available in fatcaDetails
            const pepFromFatca = fatcaDetails?.pep?.code;

            if (pepFromFatca) {
                setPep(pepFromFatca); // Set the PEP value (Y or N) if it's available
            } else {
                setPep(undefined); // If no PEP value, reset to undefined
            }
        }
    }, [fatcaDetails, nseDetails, userDetails]);

    const handleSelectPep = (value) => {
        setPep(value); // Set selected PEP value (Yes/No)
    };

    const onAction = () => {
        console.log("Selected PEP", pep);

        // Check if a PEP value is selected
        if (pep === undefined) {
            // If no PEP is selected, show the modal
            setShowModal(true);
            return;
        }

        // Get selected PEP object from pepList
        const selectedPep = pepList.find(item => item.value === pep);

        // Proceed with the action and include pep, code, and desc in fatcaDetails
        const params = {
            nseDetails,
            fatcaDetails: {
                ...fatcaDetails,
                pep: {
                    code: selectedPep?.value || "", // PEP code (Y/N)
                    desc: selectedPep?.label || "", // PEP description (Yes/No)
                },
            },
            userDetails,
        };

        console.log("GOT PARAMS", params);

        // Proceed with the registration update
        updateRegister(params, token);
        props.navigation.navigate("OnBoard", { screen: "BirthRelation" });
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
                            onPress={() => {
                                props.navigation.navigate("OnBoard", { screen: "Income" });
                            }}
                            style={styles.arrowButton}
                        >
                            <AntDesign name={"arrowleft"} size={35} color="#000" />
                        </TouchableOpacity>
                        <Image
                            source={require("../../../assets/icon.png")}
                            style={styles.logimg}
                        />
                    </View>

                    {/* PEP Selection */}
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <View>
                            <Text style={{ marginLeft: 20, color: "black", fontWeight: "bold", fontSize: 20 }}>PEP</Text>
                            <Text style={{ marginLeft: 20, color: "black" }}>(Politically exposed person)</Text>
                        </View>
                        <View style={styles.container}>
                            {pepList.map((item) => (
                                <TouchableOpacity
                                    key={item.value}
                                    style={[styles.option, pep === item.value ? styles.selectedOption : styles.unselectedOption]}
                                    onPress={() => handleSelectPep(item.value)}
                                >
                                    <Text style={[styles.text, pep === item.value ? styles.buttonSelected : styles.buttonUnselected]}>
                                        {item.label}
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
                                        Please Select PEP Before Proceeding.
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
        color: "white",
    },
    buttonUnselected: {
        color: "black",
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
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
        padding: 5,
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

export default connect(mapStateToProps, mapDispatchToProps)(Pep);
