/** @format */

import React from "react";
import { Image, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  CompleteDetailsScreen,
  CompleteDetailsAddressScreen,
  CompleteDetailsBankScreen,
  UploadDocumentScreen,
  AboutUsScreen,
  TopRatedListScreen,
  TopRatedHomeScreen,
  TopRatedSearchScreen,
  TopRatedSubmitScreen,
  FundsHomeScreen,
  HomeScreen,
  UpiScreen,
  PanScreen,
  GoalsListScreen,
  GoalDetailScreen,
  InvestmentListScreen,
  InvestDetailScreen,
  TopRatedFundsScreen,
  TopRatedFundDetailsScreen,
  OwnerChoice,
  GoalsSummaryScreen,
  NoGoalsScreen,
  ProfileScreen,
  ExistingScreen,
  ReferEarnScreen,
  AmountHistoryScreen,
  NotificationScreen,
  NotificationViewScreen,
  RelationshipScreen,
  RmNotFoundScreen,
  ReportsScreen,
  CompleteDetailScreen,
  InvestmentsScreens,
  InvestmentDetailScreens,
  AddInvestmentScreens,
  InvestmentSubmitScreens,
  InvestmentListScreens,
  InvestmentSearchScreens,
  PlanHomeScreen,
  PlanSearchScreen,
  PlanListScreen,
  PlanSubmitScreen,
  DashboardScreen,
  SwitchScreen,
  TransactionHistoryScreen,
  HoldingsScreen,
  ExternalHoldingScreen,
  AddExternalHoldingScreen,
  ZoomDocuments,
} from "../screens";
import SplashScreen from "../screens/Auth/SplashScreen";
import VerifyScreen from "../screens/Auth/VerifyScreen";
import OtpScreen from "../screens/Auth/OtpScreen";
import CreateAccountScreen from "../screens/Auth/CreateAccountScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import ForgotPasswordScreen from "../screens/Auth/ForgotPasswordScreen";
import RedeemScreen from "../screens/HamburgerMenu/RedeemScreen";
import SchemeList from "../screens/HamburgerMenu/SchemeList";
import SwitchCheckout from "../screens/HamburgerMenu/SwitchCheckout";
import RedeemCheckout from "../screens/HamburgerMenu/RedeemCheckout";
import OwnChoiceHoldings from "../screens/Holdings/OwnChoiceHoldings";
import SideMenu  from "../components/SideMenu";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export const LoginFlowStack = () => (
  <Stack.Navigator initialRouteName="splash">
    <Stack.Screen
      name="splash"
      component={SplashScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="verify"
      component={VerifyScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="otp"
      component={OtpScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="createAccount"
      component={CreateAccountScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="forgotpassword"
      component={ForgotPasswordScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export const Hamburgmenu = () => (
  <Stack.Navigator initialRouteName="dashboard">
    <Stack.Screen
      name="dashboard"
      component={DashboardScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Switch"
      component={SwitchScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Redeem"
      component={RedeemScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="SchemeList"
      component={SchemeList}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="SwitchCheckout"
      component={SwitchCheckout}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="RedeemCheckout"
      component={RedeemCheckout}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="TransactionHistory"
      component={TransactionHistoryScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Holdings"
      component={HoldingsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ExternalHolding"
      component={ExternalHoldingScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="AddExternalHolding"
      component={AddExternalHoldingScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export const HomePageStack = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Pan"
      component={PanScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export const PlanYourGoalsStack = () => (
  <Stack.Navigator initialRouteName="PlanHome">
    <Stack.Screen
      name="PlanHome"
      component={PlanHomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="PlanSearch"
      component={PlanSearchScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="PlanList"
      component={PlanListScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="PlanSubmit"
      component={PlanSubmitScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export const InvestmentPlansStack = () => (
  <Stack.Navigator initialRouteName="InvestmentListAll">
    <Stack.Screen
      name="InvestmentListAll"
      component={InvestmentsScreens}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="InvestmentDetail"
      component={InvestmentDetailScreens}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="AddInvestment"
      component={AddInvestmentScreens}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="InvestmentList"
      component={InvestmentListScreens}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="InvestmentSearch"
      component={InvestmentSearchScreens}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="InvestmentSubmit"
      component={InvestmentSubmitScreens}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export const TopRatedFundsStack = () => (
  <Stack.Navigator initialRouteName="TopRatedHome">
    <Stack.Screen
      name="TopRatedHome"
      component={TopRatedHomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="TopRatedList"
      component={TopRatedListScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="TopRatedSearch"
      component={TopRatedSearchScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="TopRatedSubmit"
      component={TopRatedSubmitScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export const HoldingsSummaryStack = () => (
  <Stack.Navigator initialRouteName="Goals">
    <Stack.Screen
      name="Goals"
      component={GoalsSummaryScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="NoGoals"
      component={NoGoalsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="GoalsList"
      component={GoalsListScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="GoalDetail"
      component={GoalDetailScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="InvestmentList"
      component={InvestmentListScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="InvestDetail"
      component={InvestDetailScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="TopRatedFunds"
      component={TopRatedFundsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="TopRatedFundDetails"
      component={TopRatedFundDetailsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Owner"
      component={OwnerChoice}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="OwnChoiceHoldings"
      component={OwnChoiceHoldings}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export const FundsDetailsStack = () => (
  <Stack.Navigator initialRouteName="FundsDetails">
    <Stack.Screen
      name="FundsDetails"
      component={FundsHomeScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export const RegisterStack = () => (
  <Stack.Navigator initialRouteName="RegisterDetails">
    <Stack.Screen
      name="RegisterDetails"
      component={CompleteDetailsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="RegisterAddress"
      component={CompleteDetailsAddressScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="RegisterBankDetails"
      component={CompleteDetailsBankScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="UploadDocument"
      component={UploadDocumentScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ZoomDocuments"
      component={ZoomDocuments}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export const OthersStack = () => (
  <Stack.Navigator initialRouteName="Profile">
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="BankAccount"
      component={CompleteDetailsBankScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Upi"
      component={UpiScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Existing"
      component={ExistingScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ReferEarn"
      component={ReferEarnScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Notifications"
      component={NotificationScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="NotificationView"
      component={NotificationViewScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Relationship"
      component={RelationshipScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="RmNotFound"
      component={RmNotFoundScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Reports"
      component={ReportsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="CompleteDetail"
      component={CompleteDetailScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="AmountHistory"
      component={AmountHistoryScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="AboutUs"
      component={AboutUsScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: "#ff0000",
      inactiveTintColor: "#000",
    }}
  >
    <Tab.Screen
      name="Explore"
      component={HomePageStack}
      options={{
        tabBarIcon: ({ focused }) => {
          const imgSource = focused
            ? require("../../assets/exploreAct.png")
            : require("../../assets/explore.png");
          return (
            <View style={{ padding: 5 }}>
              <Image
                style={{
                  width: 28,
                  height: 28,
                  aspectRatio: 1,
                  resizeMode: "contain",
                  marginTop: 5,
                }}
                source={imgSource}
              />
            </View>
          );
        },
      }}
    />
    <Tab.Screen
      name="Plans"
      component={InvestmentPlansStack}
      options={{
        tabBarIcon: ({ focused }) => {
          const imgSource = focused
            ? require("../../assets/planAct.png")
            : require("../../assets/plan.png");
          return (
            <View style={{ padding: 5 }}>
              <Image
                style={{
                  width: 28,
                  height: 28,
                  aspectRatio: 1,
                  resizeMode: "contain",
                  marginTop: 5,
                }}
                source={imgSource}
              />
            </View>
          );
        },
      }}
    />
    <Tab.Screen
      name="DashBoard"
      component={Hamburgmenu}
      options={{
        tabBarIcon: ({ focused }) => {
          const imgSource = focused
            ? require("../../assets/dashboardAct.png")
            : require("../../assets/dashboard.png");
          return (
            <View style={{ padding: 5 }}>
              <Image
                style={{
                  width: 28,
                  height: 28,
                  aspectRatio: 1,
                  resizeMode: "contain",
                  marginTop: 5,
                }}
                source={imgSource}
              />
            </View>
          );
        },
      }}
    />
    <Tab.Screen
      name="YOU"
      component={OthersStack}
      options={{
        tabBarIcon: ({ focused }) => {
          const imgSource = focused
            ? require("../../assets/userAct.png")
            : require("../../assets/user.png");
          return (
            <View style={{ padding: 5 }}>
              <Image
                style={{
                  width: 28,
                  height: 28,
                  aspectRatio: 1,
                  resizeMode: "contain",
                  marginTop: 5,
                }}
                source={imgSource}
              />
            </View>
          );
        },
      }}
    />
  </Tab.Navigator>
);

// Main navigator for user end
export const RootNavigator = () => {
  // Log components before using them
  console.log("TabNavigator:", TabNavigator);
  console.log("InvestmentPlansStack:", InvestmentPlansStack);
  console.log("PlanYourGoalsStack:", PlanYourGoalsStack);
  console.log("TopRatedFundsStack:", TopRatedFundsStack);
  console.log("OthersStack:", OthersStack);
  console.log("HoldingsSummaryStack:", HoldingsSummaryStack);
  console.log("FundsDetailsStack:", FundsDetailsStack);
  console.log("RegisterStack:", RegisterStack);
  console.log("Hamburgmenu:", Hamburgmenu);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={SideMenu}
        initialRouteName="HomeTab"
        drawerStyle={{ width: 330 }}
      >
        <Drawer.Screen
          name="HomeTab"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="Investment"
          component={InvestmentPlansStack}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="Plan"
          component={PlanYourGoalsStack}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="Dashboard"
          component={TopRatedFundsStack}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="You"
          component={OthersStack}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="Hold"
          component={HoldingsSummaryStack}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="Funds"
          component={FundsDetailsStack}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="Reg"
          component={RegisterStack}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="Hamburg"
          component={Hamburgmenu}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
