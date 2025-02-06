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
    const [selectedCode, setSelectedCode] = useState(null);
    const [incomesList, setIncomesList] = useState([]);

    const [state, setState] = useState({
        incomeCode: "",
        incomeDesc: "",
    });

    const isLoading = !incomes || incomes.length === 0;

    const incomesListMemo = useMemo(() => {
        return incomes
            ? incomes.map((item) => ({
                value: item.APP_INCOME_CODE,
                label: item.APP_INCOME_DESC,
            }))
            : [];
    }, [incomes]);

    useEffect(() => {
        setIncomesList(incomesListMemo);
    }, [incomesListMemo]);

    useEffect(() => {
        settings(token);
    }, [token, settings]);

    // Preselect from userDetails
    useEffect(() => {
        if (fatcaDetails?.app_income) {
            setSelectedCode(fatcaDetails.app_income.APP_INCOME_CODE);
            setState({
                incomeCode: fatcaDetails.app_income.APP_INCOME_CODE,
                incomeDesc: fatcaDetails.app_income.APP_INCOME_DESC,
            });
        }
    }, [fatcaDetails]);

    const handleSelect = (income) => {
        setSelectedCode(income.value);
        setState({
            incomeCode: income.value,
            incomeDesc: income.label,
        });
    };

    const onAction = () => {
        if (!state.incomeCode) {
            setShowModal(true);
            return;
        }

        const params = {
            nseDetails,
            fatcaDetails: {
                ...fatcaDetails,
                app_income: {
                    APP_INCOME_CODE: state.incomeCode,
                    APP_INCOME_DESC: state.incomeDesc,
                },
            },
            userDetails,
        };

        updateRegister(params, token);
        props.navigation.navigate("OnBoard", { screen: "PEP" });
    };

    return (
        <View style={styles.mainContainer}>
            {isLoading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={Colors.RED} />
                </View>
            ) : (
                <>
                    <View style={styles.headerRow}>
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate("OnBoard", { screen: "Occupation" })}
                            style={styles.arrowButton}
                        >
                            <AntDesign name="arrowleft" size={35} color="#000" />
                        </TouchableOpacity>
                        <Image
                            source={require("../../../assets/icon.png")}
                            style={styles.logimg}
                        />
                    </View>

                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <View>
                            <Text style={styles.title}>Annual Income</Text>
                            <Text style={styles.subtitle}>Select one of the options</Text>
                        </View>
                        
                        <View style={styles.gridContainer}>
                            {incomesList.map((income, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.optionButton,
                                        selectedCode === income.value && styles.selectedButton
                                    ]}
                                    onPress={() => handleSelect(income)}
                                >
                                    <Text style={[
                                        styles.buttonText,
                                        selectedCode === income.value && styles.selectedText
                                    ]}>
                                        {income.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Modal
                            visible={showModal}
                            transparent
                            animationType="fade"
                            onRequestClose={() => setShowModal(false)}
                        >
                            <View style={styles.modalOverlay}>
                                <View style={styles.modalContent}>
                                    <Text style={styles.modalText}>
                                        Please select an income before proceeding.
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

                    <View style={styles.footer}>
                        <TouchableOpacity 
                            style={styles.nextButton} 
                            onPress={onAction}
                        >
                            <Text style={styles.nextButtonText}>Next</Text>
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
        backgroundColor: Colors.WHITE,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: Colors.WHITE,
        marginTop:20
    },
    logimg: {
        width: responsiveWidth(35),
        height: responsiveHeight(7),
        resizeMode: 'contain',
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.BLACK,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.BLACK,
        marginBottom: 20,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    optionButton: {
        width: '48%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.RED,
        backgroundColor: Colors.WHITE,
        marginVertical: 8,
    },
    selectedButton: {
        backgroundColor: Colors.RED,
        borderColor: Colors.RED,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.BLACK,
    },
    selectedText: {
        color: Colors.WHITE,
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderColor: Colors.LIGHT_GRAY,
    },
    nextButton: {
        backgroundColor: Colors.RED,
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: 'center',
    },
    nextButtonText: {
        color: Colors.WHITE,
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: Colors.WHITE,
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        color: Colors.BLACK,
        marginBottom: 20,
        textAlign: 'center',
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
        settings: (token) => RegistrationActions.settings(dispatch, token),
        updateRegister: (params, token) => RegistrationActions.updateRegister(dispatch, params, token),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Income);