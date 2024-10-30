import React, { useState, useRef, useEffect, useContext } from "react";
import {
    StyleSheet,
    Button,
    ScrollView,
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
import { Ionicons, AntDesign, MaterialIcons, Feather, Entypo, FontAwesome, FontAwesome5, } from 'react-native-vector-icons';
import { Image, Header, ListItem, Overlay, Slider } from 'react-native-elements';

function Returns(props) {

    return (
    <View style={styles.mainbox}>
        <View style={styles.box_left}>
            <Text style={styles.box_lefttext}>Fund Returns</Text>
            <Text style={styles.box_lefttext2}>Category Average</Text>
            
            </View>
        <View style={styles.box_right}>

            <View style={styles.footer_sec}>
                <View style={styles.rupees_sec}>
                    <Image
                        source={require('../../../assets/layer_img.png')}
                        style={styles.rupees}
                    />
                    <Text style={styles.rupees_text}>1M</Text>
                    <Text style={styles.rupees_text}>3.8%</Text>
                    <Text style={styles.rupees_text2}>-11.2%</Text>
                    

                </View>

                <View style={styles.rupees_sec}>
                    <Image
                        source={require('../../../assets/layer_img.png')}
                        style={styles.rupees}
                    />
                    <Text style={styles.rupees_text}>1Y</Text>
                    <Text style={styles.rupees_text}>9.0%</Text>
                    <Text style={styles.rupees_text2}>-0.2%</Text>
                </View>

                <View style={styles.rupees_sec}>
                    <Image
                        source={require('../../../assets/layer_img.png')}
                        style={styles.rupees}
                    />
                    <Text style={styles.rupees_text}>3Y</Text>
                    <Text style={styles.rupees_text}>9.2%</Text>
                </View>

                <View style={styles.rupees_sec}>
                    <Image
                        source={require('../../../assets/layer_img.png')}
                        style={styles.rupees}
                    />
                    <Text style={styles.rupees_text}>5Y</Text>
                    <Text style={styles.rupees_text}>15.5%</Text>
                </View>


            </View>

        </View>

    </View>

    );
}

const styles = StyleSheet.create({
    mainbox: {
        flexDirection: "row",
        paddingTop: 5,
    },
    box_left: { width: '50%' },
    box_lefttext: {
        fontSize: 15,
        paddingTop: 20,
    },


    box_right: { width: '50%' },

    footer_sec: {
        flexDirection: "row",

        justifyContent: "space-between"
    },
    rupees: {
        width: 30,
        height: 27,
    },
    rupees_sec: {
        alignItems: "center",
    },
    rupees_text: { fontSize: 12, },
    rupees_text2:{paddingTop:15,},
    box_lefttext2:{paddingTop:30,},

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
export default connect(mapStateToProps, undefined, mapDispatchToProps)(Returns)