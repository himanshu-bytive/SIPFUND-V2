import React, { useState, useRef, useEffect, useContext } from "react";
import {
    StyleSheet,
    View,
    ImageBackground,
    Text,
    Dimensions,
    KeyboardAvoidingView,
    TextInput,
    Image,
    ActivityIndicator
} from "react-native";
import { connect } from 'react-redux'
import { Styles, Config, Colors, FormValidate } from '../../common'

function SignupScreen(props) {


    return (

        <View style={styles.overView}>
            <Text>sign up sadfdsf ...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 40
    },
    overView: {
        flex: 1,
        backgroundColor: 'rgba(70, 70, 70, 0.4)'
    },
    container: {
        flex: 1
    },
    imagebg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    topBar: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 30
    },
    welcome: {
        fontSize: 27,
        fontFamily: "Roboto-Regular",
        textAlign: "center",
        paddingBottom: 10,
        color: Colors.WHITE
    },
    login: {
        fontSize: 22,
        fontFamily: "Roboto-Regular",
        paddingBottom: 10,
        textAlign: "center",
        color: Colors.WHITE
    },
    error: {
        fontSize: 15,
        fontFamily: "Roboto-Regular",
        padding: 10,
        textAlign: "center",
        color: Colors.WHITE
    },
    errorBorder: {
        borderWidth: 1,
        borderColor: Colors.RED
    },
    box1: {
        backgroundColor: Colors.WHITE,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        padding: 10,
        paddingTop: 7,
        paddingBottom: 13,
        paddingLeft: 45,
        borderWidth: 1,
        borderColor: Colors.GREY.border,
        borderRadius: 25,
        justifyContent: 'center'
    },
    iconContainer: {
        position: 'absolute',
        left: 15,
        top: 10
    },
    textInput: {
        color: Colors.GREY.background,
        fontSize: 20,
        fontFamily: "Roboto-Regular",
        textAlign: "left",
        marginTop: 8,
        marginLeft: 5
    },
    forgotLink: {
        color: Colors.GREY.background,
        fontSize: 18,
        fontFamily: "Roboto-Regular",
        textAlign: "left",
        marginTop: 8,
        marginLeft: 30
    },
    barLinks: {
        marginTop: 20,
        alignSelf: "center",
        fontSize: 18,
        fontWeight: 'bold'
    },
    linkText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.WHITE,
        fontFamily: "Roboto-Bold",
    },
    materialButtonDark: {
        marginTop: 22,
        marginLeft: 35,
        marginRight: 35,
        backgroundColor: Colors.GREEN.bright,
        borderWidth: 1,
        borderColor: Colors.WHITE,
        borderRadius: 25,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonTitle: {
        fontSize: 22
    }
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
export default connect(mapStateToProps, undefined, mapDispatchToProps)(SignupScreen)