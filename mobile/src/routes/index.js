import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../pages/Login";
import Signin from "../pages/Signin";
import SignInSuccess from "../pages/SignInSuccess";

import Dashboard from "./Dashboard";

const AppStack = createStackNavigator();

export default function Routes() {
  const logged = false;

  return (
    <NavigationContainer>
      {!logged ? (
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
          <AppStack.Screen name="Login" component={Login} />
          <AppStack.Screen name="Signin" component={Signin} />
          <AppStack.Screen name="SignInSuccess" component={SignInSuccess} />
        </AppStack.Navigator>
      ) : (
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
          <AppStack.Screen name="Dashboard" component={Dashboard} />
        </AppStack.Navigator>
      )}
    </NavigationContainer>
  );
}
