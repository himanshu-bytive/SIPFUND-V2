import React, { useState, useRef, useEffect, useContext } from "react";
import {
    StyleSheet,
    Button,
    View,
    ImageBackground,
    TouchableOpacity,
    Text,
    Dimensions,
    KeyboardAvoidingView,
    TextInput,
    ActivityIndicator
} from "react-native";
import { connect } from 'react-redux'
import { Styles, Config, Colors, FormValidate } from '../../common'
import { Ionicons, AntDesign } from 'react-native-vector-icons';
import { Image, Header, CheckBox } from 'react-native-elements';

function EnterScreen(props) {
    return (
        <View style={styles.container}>

            <View style={styles.mainbox}>
                <Text style={styles.amc}>ENTER ACH-MANDATE AMOUNT</Text>
                <TextInput style={styles.inputsec}
                    placeholder="3000"
                />

                <View style={{ flexDirection: "row", alignSelf: 'flex-end' }}>

                    <TouchableOpacity>
                        <Text style={styles.refreshcode}>CANCEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.refreshcode}>SUBMIT</Text>

                    </TouchableOpacity>
                </View>

            </View>





            {/* Fund details graph _sec..... */}

            <View style={styles.graph_sec}>
                <View style={styles.holding_sec}>
                    <View style={styles.type_sec}>
                        <Text style={styles.type}>Holding Type</Text>
                    </View>
                    <View style={styles.cr_sec}>
                        <Text style={styles.cr}>E</Text>
                    </View>
                    <View style={styles.cr_sec}>
                        <Text style={styles.cr}>CR</Text>
                    </View>
                    <View style={styles.cr_sec}>
                        <Text style={styles.cr}>EW</Text>
                    </View>
                    <View style={styles.cr_sec}>
                        <Text style={styles.cr}>C</Text>
                    </View>

                </View>

                <View style={styles.holding_sec}>
                    <View style={styles.type_sec}>
                        <Text style={[styles.type, styles.red]}>%Net</Text>
                    </View>
                    <View style={styles.cr_sec}>
                        <Text style={styles.cr}>85.14</Text>
                    </View>
                    <View style={styles.cr_sec}>
                        <Text style={styles.cr}>11.85</Text>
                    </View>
                    <View style={styles.cr_sec}>
                        <Text style={styles.cr}>2.01</Text>
                    </View>
                    <View style={styles.cr_sec}>
                        <Text style={styles.cr}>1.00</Text>
                    </View>

                </View>
                <View style={styles.allocation}>
                    <Text style={styles.asset}>Asset Allocation</Text>

                    <Image
                        source={require('../../../assets/graph_img.png')}
                        style={styles.graph_img}
                    />

                </View>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    mainbox: {
        marginHorizontal: 45,
        borderRadius: 20,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: Colors.GRAY_LIGHT,
        marginVertical: 30,
        padding: 10,
    },
    amc: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
    },
    inputsec: {
        borderBottomWidth: 1,
        borderColor: Colors.GRAY_LIGHT,
        width: '95%',
        marginTop: 5,
    },

    refreshcode: {
        textAlign: "right",
        color: Colors.RED,
        fontSize: 15,
        marginHorizontal: 10,
        marginVertical: 20,
    },




    /* Fund details graph _sec..... */

    graph_sec: {
        flexDirection: "row",
        borderColor: Colors.GREY_1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        marginHorizontal: 10,
    },
    holding_sec: {
        width: "18%",
        alignItems: "center",
    },
    type_sec: {
        borderRightWidth: 1, borderRightColor: Colors.DEEP_GRAY, width: "100%",
        alignItems: "center",
    },
    type: {
        color: Colors.RED,
        fontSize: 11,
        fontWeight: "bold",
        marginTop: 5,
        marginBottom: 10,

    },
    cr_sec: {
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderRightColor: Colors.DEEP_GRAY,
        borderTopColor: Colors.DEEP_GRAY,
        width: "100%",
        alignItems: "center",
        paddingVertical: 5,
    },
    cr: {
        fontSize: 11,
    }, red: {
        marginBottom: 23,
    },
    allocation: {
        width: "60%",
        alignItems: "center",
    },
    asset: {
        color: Colors.RED,
        fontSize: 12,
        fontWeight: "bold",
        marginTop: 10,
    },
    graph_img: {
        height: 113,
        width: 125,
    },




});
const mapStateToProps = (state) => ({
    token: state.auth.token,
    users: state.auth.users,
})

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
    const { dispatch } = dispatchProps;
    const { AuthActions } = require('../../store/AuthRedux')
    return {
        ...stateProps,
        ...ownProps,
        logOut: () => { AuthActions.logOut(dispatch) },
    }
}
export default connect(mapStateToProps, undefined, mapDispatchToProps)(EnterScreen)