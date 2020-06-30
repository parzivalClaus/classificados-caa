import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "../../../pages/Dashboard";
import Companies from "../../../pages/Dashboard/Companies";
import Company from "../../../pages/Dashboard/Company";

const Stack = createStackNavigator();

export default function CategoryNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Companies"
        component={Companies}
        options={{
          headerStyle: {
            backgroundColor: "#7D40E7",
            elevation: 0,
          },
          headerLeftContainerStyle: {},
          headerTitleContainerStyle: {},
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="Company"
        component={Company}
        options={{
          headerShown: true,
          headerTitle: "Informar um problema",
          headerStyle: {
            backgroundColor: "#7D40E7",
            elevation: 0,
            height: 150,
          },
          headerLeftContainerStyle: {
            paddingBottom: 70,
          },
          headerTitleContainerStyle: {
            paddingBottom: 70,
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
}
