import React from "react";
import { StatusBar } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PropTypes from "prop-types";

import { Ionicons } from "@expo/vector-icons";
import Category from "./Category";
import NewCompany from "../../pages/NewCompany";

const Tab = createBottomTabNavigator();

export default function Dashboard() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "#7d40e7",
          style: {
            height: 70,
            paddingTop: 15,
            paddingBottom: 15,
          },
        }}
      >
        <Tab.Screen
          name="Inicio"
          component={Category}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="reorder"
                color={focused ? "#7D40E7" : "#ddd"}
                size={32}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Cadastrar"
          component={NewCompany}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="account-circle"
                color={focused ? "#7D40E7" : "#ddd"}
                size={32}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

Dashboard.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  focused: PropTypes.bool,
};

Dashboard.defaultProps = {
  focused: false,
};
