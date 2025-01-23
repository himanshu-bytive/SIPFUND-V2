import { View, Text } from 'react-native'
import React from 'react'
import { connect } from 'react-redux';

const Income = () => {
    const {
        nseDetails,
        fatcaDetails,
        userDetails,
        token,
        occupations,
        incomes,
        settings,
        updateRegister,
        isFetching,
    } = props;
    return (
        <View>
            <Text>Income</Text>
        </View>
    )
}
const mapStateToProps = (state) => ({
    token: state.auth.token,
    nseDetails: state.registration.nseDetails,
    fatcaDetails: state.registration.fatcaDetails,
    userDetails: state.registration.userDetails,
    isFetching: state.registration.isFetching,
    occupations: state.registration.occupations,
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
export default connect(mapStateToProps, mapDispatchToProps)(Income)