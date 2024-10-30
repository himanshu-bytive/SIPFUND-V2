import { StyleSheet } from "react-native";
import { Colors } from '../../common'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        borderBottomColor: Colors.BLACK,
        borderBottomWidth: 1
    },
    mainbox: {
        padding: 60,
    },
    logimg: {
        height: 65,
        width: 203,
        marginTop: 10,
    },
    imgbox: {
        alignItems: "center",
        marginBottom: 20,
    },
    Panimg: {
        height: 130,
        width: 225,
        marginVertical: 15,
    },
    inputsec: {
        borderBottomWidth: 1,
        borderColor: '#828282',
        fontSize: 15,
        marginLeft: 10,
        width: "100%"
    },
    pan: {
        fontSize: 20,
        color: "#84898E",
        fontWeight: "bold",
        paddingLeft: 50,
    },
    text_box: {
        marginTop: 10,
        flexDirection: 'row'
    },
    button: {
        alignItems: "center",
        marginVertical: 40,
    },
    botton_box: {
        alignItems: "center",
        backgroundColor: Colors.RED,
        width: "80%",
        paddingVertical: 10,
        marginTop: 20,
        borderRadius: 5,

    },
    get_otp: {
        color: Colors.WHITE,
        fontSize: 20,
        fontWeight: 'bold',

    },
});