import React from 'react';
import { StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PropTypes from 'prop-types';

import { Ionicons } from '@expo/vector-icons';
import Category from './Category';
import NewCompany from './NewCompany';
import Profile from '../../pages/Profile';

const Tab = createBottomTabNavigator();

export default function Dashboard() {
  return (
    <>
      <StatusBar />
      <Tab.Navigator
        tabBarOptions={{
          inactiveBackgroundColor: '#333',
          activeTintColor: '#d02a2a',
          inactiveTintColor: '#fff',
          activeBackgroundColor: '#333',
          style: {
            backgroundColor: '#333',
            height: 70,
            paddingBottom: 10,
            paddingTop: 10,
          },
        }}
      >
        <Tab.Screen
          name="Inicio"
          component={Category}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="md-home"
                color={focused ? '#d02a2a' : '#fff'}
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
                name="md-add-circle"
                color={focused ? '#d02a2a' : '#ddd'}
                size={32}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="md-person"
                color={focused ? '#d02a2a' : '#ddd'}
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
