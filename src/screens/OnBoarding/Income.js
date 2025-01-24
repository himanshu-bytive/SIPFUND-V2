import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Button from '../../components/Atom/Button/Button';
import Colors from '../../common/Colors';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AntDesign from "react-native-vector-icons/AntDesign";
import { Image } from 'react-native-elements';

const Income = (props) => {
    const {
        nseDetails,
        fatcaDetails,
        userDetails,
        token,
        incomes,
        settings,
        updateRegister,
    } = props;

    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState(null);
    const [incomesList, setIncomesList] = useState([]);

    const [state, setState] = useState({
        income: "",
        pep: undefined,
    });
    const [errors, setErrors] = useState({
        income: null,
        pep: null,
    });

    // Check if data is loading (i.e., incomes is not yet available)
    const isLoading = !incomes || incomes.length === 0;

    // Memoized list of incomes
    const incomesListMemo = useMemo(() => {
        return incomes
            ? incomes.map((item) => ({
                value: item.APP_INCOME_CODE,
                label: String(item.APP_INCOME_DESC),
            }))
            : [];
    }, [incomes]);

    useEffect(() => {
        // Update incomesList state when incomesListMemo changes
        setIncomesList(incomesListMemo);
    }, [incomesListMemo]);

    useEffect(() => {
        settings(token); // Fetch settings using the token
    }, [token, settings]);

    useEffect(() => {
        // Check if fatcaDetails and app_income are available and if the APP_INCOME_CODE is not empty
        if (fatcaDetails && fatcaDetails.app_income && fatcaDetails.app_income.APP_INCOME_CODE !== "") {
            setState((prevState) => ({
                ...prevState,
                income: fatcaDetails.app_income.APP_INCOME_CODE || "",
            }));
            setSelected(fatcaDetails.app_income.APP_INCOME_CODE); // Set selected income if available
        } else {
            setState((prevState) => ({
                ...prevState,
                income: "", // If not available, ensure income is empty
            }));
            setSelected(null); // Reset selected income if not available
        }
    }, [fatcaDetails]);

    const handleSelect = (income) => {
        setSelected(income.value); // Set selected value
        setState((prevState) => ({ ...prevState, income: income.value })); // Store the income code
    };


    const onAction = () => {
        console.log("INCOMES", incomes);

        // Check if an income value is selected
        if (!state.income) {
            // If no income is selected, show the modal
            setShowModal(true);
            return;
        }

        // Proceed with the action if an income is selected
        const selectedIncome = incomes.find(
            (income) => income.APP_INCOME_CODE === state.income
        );

        const params = {
            nseDetails,
            fatcaDetails: {
                ...fatcaDetails,
                app_income: {
                    APP_INCOME_CODE: selectedIncome ? selectedIncome.APP_INCOME_CODE : "",
                    APP_INCOME_DESC: selectedIncome ? selectedIncome.APP_INCOME_DESC : "",
                },
            },
            userDetails,
        };

        console.log("GOT PARAMS", params);

        // Proceed with the registration update
        updateRegister(params, token);
        props.navigation.navigate("OnBoard", { screen: "PEP" });
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
                                props.navigation.navigate("OnBoard", { screen: "Occupation" });
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
                    {/* Income Grid */}
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <View>
                            <Text style={{ marginLeft: 20, color: "black", fontWeight: "bold", fontSize: 20 }}>Annual Income</Text>
                            <Text style={{ marginLeft: 20, color: "black" }}>Select one of the option</Text>
                        </View>
                        <View style={styles.container}>
                            {incomesList.map((income, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.option, selected === income.value ? styles.selectedOption : styles.unselectedOption]}
                                    onPress={() => handleSelect(income)}
                                >
                                    <Text style={[styles.text, selected === income.value ? styles.buttonSelected : styles.buttonUnselected]}>
                                        {income.label}
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
                                        Please Select Income Before Proceeding.
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
    incomes: state.registration.incomes,
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

export default connect(mapStateToProps, mapDispatchToProps)(Income);
