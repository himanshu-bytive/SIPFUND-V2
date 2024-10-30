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
    ActivityIndicator,

} from "react-native";
import { connect } from 'react-redux'
import { Styles, Config, Colors, FormValidate } from '../../common'

import { Ionicons, AntDesign, FontAwesome, FontAwesome5, } from 'react-native-vector-icons';
import { Image, Header, CheckBox } from 'react-native-elements';
import { ScrollView } from "react-native-gesture-handler";
import { HoldingFundType } from "../../components";

function GoalsLongTermScreen(props) {
  const {user} = props;
    return (
        <View style={styles.container}>
            <View style={Styles.Header_top}>
                <Header
                    leftComponent={<TouchableOpacity onPress={() => props.navigation.goBack()} style={{ marginTop: 20 }}><AntDesign name={"arrowleft"} size={30} color={Colors.RED} /></TouchableOpacity>} backgroundColor={Colors.PEACH}
                    backgroundColor={Colors.PEACH}
                    centerComponent={<Image
                        source={require('../../../assets/icon.png')}
                        style={styles.logimg}
                    />}
                    rightComponent={<View style={Styles.headerkn}><Text style={Styles.textkn}>{`${user?.name[0]}${user?.name.split(" ").pop()[0]}`}</Text></View>}
                />
                <Image
                    source={require('../../../assets/term1.png')}
                    style={styles.Goalsimg}
                />
                <Text style={styles.text_goals}>Long Term</Text>
                
            </View>


            <ScrollView style={styles.containerScroll}>

                <HoldingFundType onPress={() => props.navigation.navigate('Goals4')} />


            </ScrollView>

            <TouchableOpacity style={styles.botton_box}>
                    <Text style={styles.get_otp}>SET OTHER GOALS</Text>
                </TouchableOpacity>

        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    containerScroll: {
        width: '100%'
    },
 
    logimg: {
        height: 65,
        width: 203,
        marginTop: 10,
    },
      Goalsimg: {
        height: 87,
        width: 94,
        borderRadius:10,
    },
    Goalsimg: {
        height: 87,
        width: 94,
        borderRadius:10,
    },
    text_goals: {
        fontSize: 20,
        marginVertical: 15,
        fontWeight:"bold",

    },
  
    botton_box: {
        marginHorizontal: 10,
        backgroundColor: Colors.RED,
        paddingVertical: 20,
        marginTop: 20,
        borderRadius: 10,
        borderColor: Colors.DEEP_GRAY,
        borderWidth: 1,
        marginBottom:20
    },
    get_otp: {
        color: Colors.WHITE,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center",
        paddingHorizontal:70,
        
    },
});
const mapStateToProps = (state) => ({
    token: state.auth.token,
    user: state.auth.user,
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
export default connect(mapStateToProps, undefined, mapDispatchToProps)(GoalsLongTermScreen)
