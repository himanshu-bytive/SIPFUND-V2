import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import { Colors } from "../../common";

function SplashScreen(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      props.navigation.navigate("verify");
    }, 5000); // 5 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [props.navigation]);

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 30 }}>
        <Text style={styles.slogan}>
          Achieve Your <Text style={styles.sloganRed}>Dreams</Text>
        </Text>
      </View>
      <View>
        <Image
          source={require("../../../assets/icon.png")}
          style={styles.imgeWidht}
        />
        {loading && <ActivityIndicator size={30} color={Colors.RED} />}
      </View>
      <View style={styles.mainbox}>
        <Text style={styles.most_trusted}>Most trusted for</Text>
        <Text style={styles.most_trusted}>Mutual Fund Investment</Text>
        <Image
          source={require("../../../assets/nse.png")}
          style={styles.nseimg}
        />
        <Image
          source={require("../../../assets/powerby.png")}
          style={styles.powerbyimg}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 70,
    alignItems: "center",
    justifyContent: "space-between",
  },
  mainbox: {
    alignItems: "center",
  },
  slogan: {
    fontSize: 30,
    marginBottom: 15,
    color: Colors.BLACK,
  },
  sloganRed: {
    color: Colors.RED,
  },
  most_trusted: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 20,
  },
  nseimg: {
    marginVertical: 20,
  },
  updateText: {
    color: "red",
    textAlign: "center",
    fontSize: 20,
    paddingTop: 10,
    fontWeight: "bold",
  },
});

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { AuthActions } = require("../../store/AuthRedux");
  const { HomeActions } = require("../../store/HomeRedux");
  return {
    ...stateProps,
    ...ownProps,
    logout: () => dispatch(AuthActions.logout()),
    resetData: () => dispatch(HomeActions.resetData()),
  };
};

export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(SplashScreen);
