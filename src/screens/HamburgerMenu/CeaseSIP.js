import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import Typography from '../../components/Atom/Typography/Typography'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import AntDesign from "react-native-vector-icons/AntDesign";
import Colors from '../../common/Colors';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from '@react-native-picker/picker';
import Button from '../../components/Atom/Button/Button';
import { Header } from 'react-native-elements';
import SIPLOGO from '../../../assets/SVG-ICONS/SipLogo.svg';
import { useNavigation } from '@react-navigation/native';
const CeaseSIP = () => {
    const navigation = useNavigation();
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [NomineeId, setNomineeId] = useState("");
    const [InitiatedBy, setInitiatedBy] = useState("");
    const [errors, setErrors] = useState({
        nominee1_name: null,
        nominee1_relation: null,
        nominee1_dob: null,
        nominee1_addr1: null,
        nominee1_city: null,
        nominee1_state: null,
        nominee1_pincode: null,
    });

    const [state, setState] = useState({
        nominee1_name: "",
        nominee1_relation: "",
        nominee1_dob: null,
        nominee1_addr1: "",
        nominee1_city: "",
        nominee1_state: "",
        nominee1_pincode: "",
    });
    const NomineeIdList = [
        { value: "Ad", label: "Aadhaar Card" },
        { value: "Pan", label: "Pan Card" },
        { value: "DL", label: "Driving License" },
    ]

    const InitiatedByList = [
        { value: "br", label: "Broker" },
        { value: "In", label: "Investor" }
    ]

    const onAction = () => {

    }
    const onCancel = () => {

    }
    return (
        <View style={{ flex: 1, backgroundColor: "#FFB2AA", justifyContent: "flex-start", alignItems: "center" }}>
            <Header
                leftComponent={
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 5,
                            marginLeft: 5
                        }}>
                        <AntDesign
                            name="arrowleft"
                            size={25}
                            color={Colors.BLACK}
                            onPress={() => { navigation.navigate("Dashboard",{screen : "Dashboard"}) }}
                        />
                    </View>
                }
                rightComponent={
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 5,
                            gap: 15,
                            marginRight: 12,
                        }}>
                        <SIPLOGO width={95} height={25} />
                    </View>
                }
                backgroundColor={"white"}
            />
            <View style={{ height: "auto", width: 350, backgroundColor: "white", borderRadius: 12, marginTop: 120, padding: 20, alignItems: "center", paddingVertical: 30 }}>
                <Typography color={"black"} fontSize={responsiveFontSize(2.5)} fontWeight={"bold"}>Cease Your SIP</Typography>
                <Text style={{ alignSelf: "flex-start", marginTop: 25 }}>Cease Requested Date<Text style={{ color: "red" }}>*</Text></Text>
                <View style={styles.inputsecWrapper}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: 300
                        }}
                    >
                        <TouchableOpacity onPress={() => setIsDatePickerVisible(true)}>
                            <AntDesign
                                style={{ marginTop: 20 }}
                                name="calendar"
                                color={"#EE4248"}
                                size={25}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => setIsDatePickerVisible(true)}
                            style={{
                                flex: 1,
                            }}
                        >
                            <TextInput
                                keyboardType="numeric"
                                style={{
                                    flex: 1,
                                    marginLeft: 10,
                                    marginTop: 0,
                                    fontSize: 18,
                                    borderBottomWidth: 1,
                                    color: "black",
                                    
                                }}
                                editable={false}
                                selectTextOnFocus={false}
                                value={dateOfBirth ? getDateInHuman(dateOfBirth) : ""}
                                placeholder={"DD-MM-YYYY"}
                                placeholderTextColor={"grey"}
                                maxLength={10}
                            />
                        </TouchableOpacity>
                        {errors.nominee1_dob && <Text style={styles.errorText}>{errors.nominee1_dob}</Text>}
                    </View>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        date={new Date()}
                        maximumDate={new Date()}
                        minimumDate={new Date(1900, 0, 1)}
                        onConfirm={(dob) => {
                            setIsDatePickerVisible(false);

                            // Format the date as DD-MM-YYYY
                            const formattedDate = `${String(dob.getDate()).padStart(2, '0')}${String(dob.getMonth() + 1).padStart(2, '0')}${dob.getFullYear()}`;
                            const dateAsNumber = parseInt(formattedDate, 10); // Convert to number
                            console.log("Date as Number:", dateAsNumber);

                            // Update the states
                            setDateOfBirth(dob); // Original Date object if needed
                            setErrors({ ...errors, nominee1_dob: null });
                            setState({ ...state, nominee1_dob: dateAsNumber }); // Save date as number
                        }}
                        onCancel={() => setIsDatePickerVisible(false)}
                    />
                </View>
                <View style={styles.inputsec}>
                    <Picker
                        selectedValue={NomineeId ? NomineeId : ""}
                        onValueChange={(itemValue) => setNomineeId(itemValue)}
                        style={[
                            styles.picker,
                            NomineeId === "" && { color: "grey" }, // Placeholder color
                        ]}
                    >
                        <Picker.Item label="Reason" value="" />
                        {NomineeIdList.map((state) => (
                            <Picker.Item key={state.value} label={state.label} value={state.value} />
                        ))}
                    </Picker>
                </View>
                {NomineeId === "Pan" && (
                    <View>
                        <TextInput
                            style={{
                                height: 40,
                                width: 320,
                                borderColor: "#FFB2AA",
                                borderWidth: 2,
                                borderRadius: 8,
                                paddingHorizontal: 10,
                                fontSize: 16,
                                color: "black",
                            }}
                            placeholder="Remarks"
                            onChangeText={(text) => {
                                // Handle the input text
                            }}
                        />
                    </View>
                )}
                <View style={styles.inputsec}>
                    <Picker
                        selectedValue={InitiatedBy ? InitiatedBy : ""}
                        onValueChange={(itemValue) => setInitiatedBy(itemValue)}
                        style={[
                            styles.picker,
                            InitiatedBy === "" && { color: "grey" }, // Placeholder color
                        ]}
                    >
                        <Picker.Item label="Initiated By" value="" />
                        {InitiatedByList.map((state) => (
                            <Picker.Item key={state.value} label={state.label} value={state.value} />
                        ))}
                    </Picker>
                </View>
                <View style={{ flexDirection: "row", gap: 10, marginTop: 10, justifyContent: "center", alignSelf: "flex-end" }}>
                    <Button backgroundColor={"black"} text={"CEASE SIP"} textColor={"white"} height={40} width={100} style={{ paddingHorizontal: 5 }} onPress={() => { onAction }} />
                    <Button borderColor={"black"} borderWidth={2} text={"CEASE SIP"} textColor={"black"} height={40} width={100} style={{ paddingHorizontal: 5 }} onPress={onCancel} />
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
    },
    errorText: {
        color: "red",
        fontSize: responsiveFontSize(1.5),
        marginTop: responsiveHeight(0.5),
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
        borderWidth: 2,
        borderColor: "#FFB2AA",
        borderRadius: 8,
        marginTop: 10,
        backgroundColor: Colors.WHITE,
        paddingHorizontal: 10,
        overflow: 'hidden', // To ensure the border applies to the dropdown correctly
        paddingBottom: 10,
    },
    inputsec: {
        height: responsiveHeight(6),
        fontSize: responsiveFontSize(2),
        color: "black",
        backgroundColor: Colors.WHITE,
        borderColor: "#FFB2AA",
        borderWidth: 2,
        borderRadius: 12,
        paddingHorizontal: 10,
        marginBottom: 10,
        width: 322,
        marginTop: 20
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
        marginTop: responsiveHeight(5),
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
export default CeaseSIP