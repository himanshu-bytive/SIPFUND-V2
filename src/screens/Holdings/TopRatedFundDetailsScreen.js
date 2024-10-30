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

import { Ionicons, AntDesign, Entypo, FontAwesome5 } from 'react-native-vector-icons';
import { Image, Header, CheckBox, Overlay } from 'react-native-elements';
import { ScrollView } from "react-native-gesture-handler";
import GoalsTable from './GoalsTable'

function TopRatedFundDetailsScreen(props) {

    // overlay start
    const [visible, setVisible] = useState(null);
    const toggleOverlay = (val) => {
        if (visible === val) {
            setVisible(null);
        } else {
            setVisible(val);
        }
    };
    // overlay end
    return (

        <View style={styles.container}>

            <Header
                leftComponent={<TouchableOpacity onPress={() => props.navigation.goBack()} style={{ marginTop: 20 }}><AntDesign name={"arrowleft"} size={40} color={Colors.RED} /></TouchableOpacity>}
                containerStyle={Styles.header}
                backgroundColor={Colors.LIGHT_WHITE}
                centerComponent={<Image
                    source={require('../../../assets/icon.png')}
                    style={styles.logimg}
                />}
                rightComponent={<View style={Styles.carticon}><AntDesign name={"shoppingcart"} size={40} color={Colors.RED} /></View>}
            />
            {/* container_sec */}
            <ScrollView style={styles.containerScroll}>
                <View style={styles.container_sec}>
                    <TouchableOpacity>
                        <View style={styles.container_box}>

                            <Image
                                source={require('../../../assets/MidCap_img2.png')}
                                style={styles.mid_capimg}
                            />

                            <Text style={styles.Longterm}>BNP Paribas Mid Cap Fund</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.valua_sec}>
                        <View style={styles.price}>

                            <Text style={styles.rate_2}>₹ 10,00,000</Text>
                            <Text style={styles.Current_Value}>Current Value</Text>
                        </View>


                        <View style={styles.Investment}>
                            <View style={styles.Investment_value}>
                                <Text style={styles.rate_2}>₹ 9,50,000</Text>
                                <Text style={styles.Current_Value}>Investment</Text>
                            </View>


                            <View style={styles.Investment_value}>
                                <Text style={styles.rate_2}>₹ 50,000</Text>
                                <Text style={styles.Current_Value}>Profit/Loss</Text>
                            </View>

                            <View style={styles.Investment_value}>

                                <Text style={styles.rate_2}>17.01%</Text>
                                <Text style={styles.Current_Value}>CAGR</Text>

                            </View>
                        </View>
                    </View>
                </View>

                {/* Report_sec */}

                <View style={styles.report_sec}>
                    <Text style={styles.Report}>Report</Text>
                </View>


                <View style={styles.report_sec}>

                    <View>
                        <View style={styles.investment_summary}>
                            <Text style={(visible === 'investment') ? styles.schemetype : styles.schemetype1}>Scheme Type Wise Investment Summary</Text>
                            <TouchableOpacity onPress={() => toggleOverlay('investment')}><AntDesign name={(visible === 'investment') ? "up" : "down"} size={30} color="#C0392B" /></TouchableOpacity>
                        </View>
                        <View style={{ borderWidth: 1, borderColor: Colors.GREY_1, marginTop: 10, marginBottom: 10, }}></View>
                        {visible === 'investment' && (<GoalsTable />)}
                    </View>

                    <View>
                        <View style={styles.investment_summary}>
                            <Text style={(visible === 'performance') ? styles.schemetype : styles.schemetype1}>Scheme of Past Performance</Text>
                            <TouchableOpacity onPress={() => toggleOverlay('performance')}><AntDesign name={(visible === 'performance') ? "up" : "down"} size={30} color="#C0392B" /></TouchableOpacity>
                        </View>
                        <View style={{ borderWidth: 1, borderColor: Colors.GREY_1, marginTop: 10, marginBottom: 10, }}></View>
                        {visible === 'performance' && (<GoalsTable />)}
                    </View>

                    <View>
                        <View style={styles.investment_summary}>
                            <Text style={(visible === 'wiseInvestment') ? styles.schemetype : styles.schemetype1}>Goal Wise Investment Summary</Text>
                            <TouchableOpacity onPress={() => toggleOverlay('wiseInvestment')}><AntDesign name={(visible === 'wiseInvestment') ? "up" : "down"} size={30} color="#C0392B" /></TouchableOpacity>
                        </View>
                        <View style={{ borderWidth: 1, borderColor: Colors.GREY_1, marginTop: 10, marginBottom: 10, }}></View>
                        {visible === 'wiseInvestment' && (<GoalsTable />)}
                    </View>

                    <View>
                        <View style={styles.investment_summary}>
                            <Text style={(visible === 'equity') ? styles.schemetype : styles.schemetype1}>Top 10 Equity Holding</Text>
                            <TouchableOpacity onPress={() => toggleOverlay('equity')}><AntDesign name={(visible === 'equity') ? "up" : "down"} size={30} color="#C0392B" /></TouchableOpacity>
                        </View>
                        <View style={{ borderWidth: 1, borderColor: Colors.GREY_1, marginTop: 10, marginBottom: 10, }}></View>
                        {visible === 'equity' && (<GoalsTable />)}
                    </View>

                    <View>
                        <View style={styles.investment_summary}>
                            <Text style={(visible === 'exposure') ? styles.schemetype : styles.schemetype1}>Top 10 Sector Exposure</Text>
                            <TouchableOpacity onPress={() => toggleOverlay('exposure')}><AntDesign name={(visible === 'exposure') ? "up" : "down"} size={30} color="#C0392B" /></TouchableOpacity>
                        </View>
                        <View style={{ borderWidth: 1, borderColor: Colors.GREY_1, marginTop: 10, marginBottom: 10, }}></View>
                        {visible === 'exposure' && (<GoalsTable />)}
                    </View>

                </View>
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        borderBottomColor: Colors.BLACK,
        borderBottomWidth: 1
    },
    container_sec: {
        margin: 10,

    },
    containerScroll: {
        width: '100%'
    },
    logimg: {
        height: 65,
        width: 203,
        marginTop: 10,
    },
    container_box: {

        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginTop: 10,
        backgroundColor: Colors.WHITE,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,

        borderWidth: 1,
        borderColor: Colors.GREY_1,


    },
    Longterm: {
        marginLeft: 10,
        fontSize: 20,
        color: Colors.BLACK,
    },

    mid_capimg: {
        height: 66,
        width: 73,
    },
    valua_sec: {
        alignItems: "center",
        borderRadius: 30,
        borderWidth: 1,
        marginTop: 10,

    },
    price: {
        alignItems: "center",
    },
    rate_2: {

        fontWeight: "bold",
        fontSize: 17,
        marginTop: 10,
    },
    Current_Value: {

        fontSize: 12,
    },
    Investment: {
        marginTop: 20,
        flexDirection: "row",
    },
    Investment_value: {
        width: "33%",
        alignItems: "center",
        marginBottom: 20,

    },
    report_sec: {
        marginHorizontal: 30,
        marginVertical: 10,
    },
    Report: {
        fontSize: 22,

    },
    investment_summary: {
        flexDirection: "row",
        marginTop: 15,

    },
    schemetype: {
        fontSize: 15,
        width: "90%",
        color: Colors.RED,
        paddingTop: 3,


    },
    fundsimg_sec: { alignItems: "center", },
    fundsmg: {
        height: 133,
        width: 373,
    },
    schemetype1: {
        color: Colors.BLACK,
        width: "90%",
        marginTop: 10,
        fontSize: 15,
    },

    // fundsec

    fund_sec: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: '#E0BAAF',
        borderRadius: 10,
        width: '95%',


    },
    fund_house: {
        width: "40%",
        borderRightWidth: 1,
        borderRightColor: '#E0BAAF',
    },
    house: {

        alignItems: "center",
        backgroundColor: "#F4C6AF",
    },
    house1: {
        borderTopLeftRadius: 10,
    },
    house2: { borderTopRightRadius: 10, },
    fund: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#C44935",
        marginVertical: 10,
    },
    axis: {
        fontSize: 9,
        fontWeight: "bold",
        color: Colors.DEEP_GRAY,
        marginVertical: 10,

    },
    axis_sec: {
        borderBottomWidth: 1,
        borderBottomColor: "#E0BAAF",
        width: "100%",
        paddingLeft: 10,

    },
    axis_sec2: {
        borderBottomWidth: 1,
        borderBottomColor: "#E0BAAF",
        width: "100%",
        alignItems: "center",
    },
    inv_cost: {
        width: "20%",
        borderRightWidth: 1,
        borderRightColor: '#E0BAAF',
    },
    dividends: {
        width: "20%",
    },
    bonus: {
        marginVertical: 2,
    },

    dataTable: {
        borderWidth: 1,
        borderColor: '#B88C7D',
        // borderBottomWidth: 1,
        // borderBottomColor: '#B88C7D',
        marginHorizontal: 20,
        borderRadius: 10,

    },
    headerCell: {
        // width: 90,
        borderRightWidth: 1,
        borderRightColor: '#B88C7D',
        paddingLeft: 15,
    },
    bodyCell: {
        // width: 100,
        borderRightWidth: 1,
        borderRightColor: '#B88C7D',
        paddingLeft: 15,
    },
    headerbg: {
        backgroundColor: '#F8D9CC',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#B88C7D',
    },
    headersec: {
        borderBottomWidth: 1,
        borderBottomColor: '#B88C7D',
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
export default connect(mapStateToProps, undefined, mapDispatchToProps)(TopRatedFundDetailsScreen)