import React, { useState, useRef, useEffect, useContext } from "react";
import { DataTable } from 'react-native-paper';
import {
    StyleSheet,
    Button,
    View,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    Text,
    Dimensions,
    KeyboardAvoidingView,
    TextInput,
    ActivityIndicator
} from "react-native";
import { connect } from 'react-redux'
import { Styles, Config, Colors, FormValidate } from '../../common'

function GoalsTable(props) {
    return (
        // <ScrollView horizontal>
        <DataTable style={styles.dataTable}>
            <DataTable.Header style={styles.headerbg}>
                <DataTable.Title style={styles.headerCell}>Fund House</DataTable.Title>
                <DataTable.Title style={styles.headerCell}>Inv Cost</DataTable.Title>
                <DataTable.Title style={styles.headerCell} >Cur Value</DataTable.Title>
                <DataTable.Title style={[styles.headerCell, { borderRightWidth: 0 }]} >Dividends/Bonus</DataTable.Title>
            </DataTable.Header>

            <DataTable.Row style={styles.headersec}>
                <DataTable.Cell style={styles.bodyCell}>Axis Mutual Fund</DataTable.Cell>
                <DataTable.Cell style={styles.bodyCell} >6.500.00</DataTable.Cell>
                <DataTable.Cell style={styles.bodyCell} >5.672.97.00</DataTable.Cell>
                <DataTable.Cell style={[styles.bodyCell, { borderRightWidth: 0 }]} >0.00</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row style={styles.headersec}>
                <DataTable.Cell style={styles.bodyCell}>ICICI Prudential Mutual Fund</DataTable.Cell>
                <DataTable.Cell style={styles.bodyCell} >22.062.00</DataTable.Cell>
                <DataTable.Cell style={styles.bodyCell} >20.580.87</DataTable.Cell>
                <DataTable.Cell style={[styles.bodyCell, { borderRightWidth: 0 }]} >0.00</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row style={styles.headersec}>
                <DataTable.Cell style={styles.bodyCell}>ICICI Prudential Mutual Fund</DataTable.Cell>
                <DataTable.Cell style={styles.bodyCell} >22.062.00</DataTable.Cell>
                <DataTable.Cell style={styles.bodyCell} >20.580.87</DataTable.Cell>
                <DataTable.Cell style={[styles.bodyCell, { borderRightWidth: 0 }]} >0.00</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
                <DataTable.Cell style={styles.bodyCell}>ICICI Prudential Mutual Fund</DataTable.Cell>
                <DataTable.Cell style={styles.bodyCell} >22.062.00</DataTable.Cell>
                <DataTable.Cell style={styles.bodyCell} >20.580.87</DataTable.Cell>
                <DataTable.Cell style={[styles.bodyCell, { borderRightWidth: 0 }]} >0.00</DataTable.Cell>
            </DataTable.Row>
        </DataTable>
        //  </ScrollView>
    );
}

const styles = StyleSheet.create({
    dataTable: {
        borderWidth: 1,
        borderColor: '#B88C7D',
        borderRadius: 10,

    },
    headerCell: {
        width: 100,
        borderRightWidth: 1,
        borderRightColor: '#B88C7D',
        paddingLeft: 15,
    },
    bodyCell: {
        width: 100,
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
export default connect(mapStateToProps, undefined, mapDispatchToProps)(GoalsTable)