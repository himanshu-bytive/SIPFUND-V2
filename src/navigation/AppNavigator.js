/** @format */
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginFlowStack, RootNavigator } from "./MainNavigator";
import { Linking } from "react-native";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={LoginFlowStack} />
        <Stack.Screen name="Root" component={RootNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const handleDeepLink = (event) => {
  const route = event.url.replace(/.*?:\/\//g, '');
  const routeName = route.split('/')[0];
  
  if (routeName === 'details') {
    const itemId = route.split('/')[1];
    // Assuming you have access to a navigation reference
    navigation.navigate('Details', { itemId });
  }
};

const handleDynamicLink = async (link) => {
  if (link) {
    const str = link?.url;
    const after_ = str.slice(str.indexOf("=") + 1);
    await AsyncStorage.setItem("referenceCode", JSON.stringify(after_));
  }
};

const MainApp = () => {
  React.useEffect(() => {
    const linking = {
      prefixes: ["eks24.app.goo.gl"],
      config: {
        screens: {
          Auth: "auth",
          Root: "root",
          Details: "details/:itemId", // Define your routes
        },
      },
    };

    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    
    // Handle initial dynamic link
    dynamicLinks().getInitialLink().then(handleDynamicLink);
    
    // Handle deep links
    const urlListener = Linking.addEventListener("url", handleDeepLink);
    
    return () => {
      urlListener.remove();
      unsubscribe();
    };
  }, []);

  return <AppNavigator />;
};

export default MainApp;
