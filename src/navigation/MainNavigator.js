/** @format */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  SplashScreen,
  VerifyScreen,
  OtpScreen,
  CreateAccountScreen,
  LoginScreen,
  ForgotPasswordScreen,
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
import { SideMenu } from "../components";
import RedeemScreen from "../screens/HamburgerMenu/RedeemScreen";
import SchemeList from "../screens/HamburgerMenu/SchemeList";
import SwitchCheckout from "../screens/HamburgerMenu/SwitchCheckout";
import RedeemCheckout from "../screens/HamburgerMenu/RedeemCheckout";
import OwnChoiceHoldings from "../screens/Holdings/OwnChoiceHoldings";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export const LoginFlowStack = () => (
  <Stack.Navigator initialRouteName="splash" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="splash" component={SplashScreen} />
    <Stack.Screen name="verify" component={VerifyScreen} />
    <Stack.Screen name="otp" component={OtpScreen} />
    <Stack.Screen name="createAccount" component={CreateAccountScreen} />
    <Stack.Screen name="login" component={LoginScreen} />
    <Stack.Screen name="forgotpassword" component={ForgotPasswordScreen} />
  </Stack.Navigator>
);

export const HamburgMenuStack = () => (
  <Stack.Navigator initialRouteName="dashboard" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="dashboard" component={DashboardScreen} />
    <Stack.Screen name="Switch" component={SwitchScreen} />
    <Stack.Screen name="Redeem" component={RedeemScreen} />
    <Stack.Screen name="SchemeList" component={SchemeList} />
    <Stack.Screen name="SwitchCheckout" component={SwitchCheckout} />
    <Stack.Screen name="RedeemCheckout" component={RedeemCheckout} />
    <Stack.Screen name="TransactionHistory" component={TransactionHistoryScreen} />
    <Stack.Screen name="Holdings" component={HoldingsScreen} />
    <Stack.Screen name="ExternalHolding" component={ExternalHoldingScreen} />
    <Stack.Screen name="AddExternalHolding" component={AddExternalHoldingScreen} />
  </Stack.Navigator>
);

export const HomePageStack = () => (
  <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Pan" component={PanScreen} />
  </Stack.Navigator>
);

export const PlanYourGoalsStack = () => (
  <Stack.Navigator initialRouteName="PlanHome" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="PlanHome" component={PlanHomeScreen} />
    <Stack.Screen name="PlanSearch" component={PlanSearchScreen} />
    <Stack.Screen name="PlanList" component={PlanListScreen} />
    <Stack.Screen name="PlanSubmit" component={PlanSubmitScreen} />
  </Stack.Navigator>
);

export const InvestmentPlansStack = () => (
  <Stack.Navigator initialRouteName="InvestmentListAll" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="InvestmentListAll" component={InvestmentsScreens} />
    <Stack.Screen name="InvestmentDetail" component={InvestmentDetailScreens} />
    <Stack.Screen name="AddInvestment" component={AddInvestmentScreens} />
    <Stack.Screen name="InvestmentList" component={InvestmentListScreens} />
    <Stack.Screen name="InvestmentSearch" component={InvestmentSearchScreens} />
    <Stack.Screen name="InvestmentSubmit" component={InvestmentSubmitScreens} />
  </Stack.Navigator>
);

export const TopRatedFundsStack = () => (
  <Stack.Navigator initialRouteName="TopRatedHome" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="TopRatedHome" component={TopRatedHomeScreen} />
    <Stack.Screen name="TopRatedList" component={TopRatedListScreen} />
    <Stack.Screen name="TopRatedSearch" component={TopRatedSearchScreen} />
    <Stack.Screen name="TopRatedSubmit" component={TopRatedSubmitScreen} />
  </Stack.Navigator>
);

export const HoldingsSummaryStack = () => (
  <Stack.Navigator initialRouteName="Goals" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Goals" component={GoalsSummaryScreen} />
    <Stack.Screen name="NoGoals" component={NoGoalsScreen} />
    <Stack.Screen name="GoalsList" component={GoalsListScreen} />
    <Stack.Screen name="GoalDetail" component={GoalDetailScreen} />
    <Stack.Screen name="InvestmentList" component={InvestmentListScreen} />
    <Stack.Screen name="InvestDetail" component={InvestDetailScreen} />
    <Stack.Screen name="TopRatedFunds" component={TopRatedFundsScreen} />
    <Stack.Screen name="TopRatedFundDetails" component={TopRatedFundDetailsScreen} />
    <Stack.Screen name="Owner" component={OwnerChoice} />
    <Stack.Screen name="OwnChoiceHoldings" component={OwnChoiceHoldings} />
  </Stack.Navigator>
);

export const FundsDetailsStack = () => (
  <Stack.Navigator initialRouteName="FundsDetails" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="FundsDetails" component={FundsHomeScreen} />
  </Stack.Navigator>
);

export const RegisterStack = () => (
  <Stack.Navigator initialRouteName="RegisterDetails" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="RegisterDetails" component={CompleteDetailsScreen} />
    <Stack.Screen name="RegisterAddress" component={CompleteDetailsAddressScreen} />
    <Stack.Screen name="RegisterBankDetails" component={CompleteDetailsBankScreen} />
    <Stack.Screen name="UploadDocument" component={UploadDocumentScreen} />
    <Stack.Screen name="ZoomDocuments" component={ZoomDocuments} />
  </Stack.Navigator>
);

export const OthersStack = () => (
  <Stack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="BankAccount" component={CompleteDetailsBankScreen} />
    <Stack.Screen name="Upi" component={UpiScreen} />
    <Stack.Screen name="Existing" component={ExistingScreen} />
    <Stack.Screen name="ReferEarn" component={ReferEarnScreen} />
    <Stack.Screen name="Notifications" component={NotificationScreen} />
    <Stack.Screen name="NotificationView" component={NotificationViewScreen} />
    <Stack.Screen name="Relationship" component={RelationshipScreen} />
    <Stack.Screen name="RmNotFound" component={RmNotFoundScreen} />
    <Stack.Screen name="Reports" component={ReportsScreen} />
    <Stack.Screen name="CompleteDetail" component={CompleteDetailScreen} />
    <Stack.Screen name="AmountHistory" component={AmountHistoryScreen} />
    <Stack.Screen name="AboutUs" component={AboutUsScreen} />
  </Stack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Explore" component={HomePageStack} />
    <Tab.Screen name="Plans" component={InvestmentPlansStack} />
    <Tab.Screen name="Dashboard" component={HamburgMenuStack} />
    <Tab.Screen name="You" component={OthersStack} />
  </Tab.Navigator>
);

// Main navigator for user end
export const RootNavigator = () => (
  <Drawer.Navigator
    initialRouteName="HomeTab"
    drawerContent={props => <SideMenu {...props} />}
    screenOptions={{ headerShown: false }}
  >
    <Drawer.Screen name="HomeTab" component={TabNavigator} />
    <Drawer.Screen name="Investment" component={InvestmentPlansStack} />
    <Drawer.Screen name="Plan" component={PlanYourGoalsStack} />
    <Drawer.Screen name="Dashboard" component={TopRatedFundsStack} />
    <Drawer.Screen name="You" component={OthersStack} />
    <Drawer.Screen name="Hold" component={HoldingsSummaryStack} />
    <Drawer.Screen name="Funds" component={FundsDetailsStack} />
    <Drawer.Screen name="Reg" component={RegisterStack} />
    <Drawer.Screen name="Hamburg" component={HamburgMenuStack} />
    <Drawer.Screen name="HomeScreen" component={HomePageStack} />
  </Drawer.Navigator>
);

