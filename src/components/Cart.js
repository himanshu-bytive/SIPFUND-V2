/** @format */

import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { AntDesign } from "react-native-vector-icons";
import { Colors } from "../common";

const Cart = (props) => {
  const { cart, nav, token, getCartDetails } = props;
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    if (cart?.cartDetails) {
      //console.log(cart?.cartDetails);
      setCartItemCount(cart?.cartDetails.length);
    } else {
      setCartItemCount(0);
    }
  }, [cart]);

  return (
    <TouchableOpacity onPress={() => nav()} style={{ marginTop: 20 }}>
      <View style={styles.container}>
        <AntDesign name={"shoppingcart"} size={35} color={Colors.RED} />
        <View>
          <View style={styles.cartNum}>
            <Text
              style={{
                color: Colors.WHITE,
                fontSize: 10,
              }}
            >
              {cartItemCount}
            </Text>
          </View>
          <View style={{ flex: 1 }} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  cartNum: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.GRAY_2,
    padding: 2.5,
    marginLeft: -10,
    marginTop: -5,
    height: 25,
    width: 25,
    borderRadius: 12.5,
  },
});

const mapStateToProps = (state) => ({
  cart: state.cartActions.cart,
  token: state.auth.token,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { CartActions } = require("../store/CartActionsRedux");
  return {
    ...stateProps,
    ...ownProps,
    getCartDetails: (token) => {
      CartActions.cartDetails(dispatch, token);
    },
  };
};

export default connect(mapStateToProps, undefined, mapDispatchToProps)(Cart);
