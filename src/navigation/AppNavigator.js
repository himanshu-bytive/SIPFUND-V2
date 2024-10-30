import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppState, Linking } from "react-native";

import dynamicLinks from "@react-native-firebase/dynamic-links";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginFlowStack, RootNavigator } from "./MainNavigator";
// hello 
const Stack = createStackNavigator();

const handleDynamicLink = async (link) => {
  if (link) {
    const str = link?.url;
    const after_ = str.slice(str.indexOf("=") + 1);
    await AsyncStorage.setItem("referenceCode", JSON.stringify(after_));
  }
};

const MainApp = () => {
  React.useEffect(() => {
    const handleDeepLink = (event) => {
      // Handle deep link event here
    };

    const subscription = Linking.addEventListener("url", handleDeepLink);

    return () => {
      subscription.remove(); // Unsubscribe from linking events
    };
  }, []);

  React.useEffect(() => {
    const getInitialLink = async () => {
      const link = await dynamicLinks().getInitialLink();
      if (link?.url) {
        await handleDynamicLink(link);
      }
    };
    getInitialLink();
  }, []);

  React.useEffect(() => {
    const unsubscribeDynamicLinks = dynamicLinks().onLink(handleDynamicLink);
    return () => unsubscribeDynamicLinks(); // Unsubscribe from dynamic links
  }, []);

  React.useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      // Handle app state changes if needed
    };

    const appStateSubscription = AppState.addEventListener("change", handleAppStateChange);

    return () => {
      appStateSubscription.remove(); // Unsubscribe from app state changes
    };
  }, []);

  React.useEffect(() => {
    const getInitialURL = async () => {
      const url = await Linking.getInitialURL();
      if (url) {
        handleDeepLink({ url });
      }
    };
    getInitialURL();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={LoginFlowStack} />
        <Stack.Screen name="Root" component={RootNavigator} />
        {/* You can add more screens here if needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainApp;
