import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../../../pages/Dashboard';
import Companies from '../../../pages/Dashboard/Companies';
import Company from '../../../pages/Dashboard/Company';

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
            height: 70,
            backgroundColor: '#d02a2a',
            elevation: 0,
          },
          headerLeftContainerStyle: {},
          headerTitleContainerStyle: {},
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="Company"
        component={Company}
        options={{
          headerShown: true,
          headerStyle: {
            height: 70,
            backgroundColor: '#d02a2a',
            elevation: 0,
          },
          headerLeftContainerStyle: {},
          headerTitleContainerStyle: {},
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}
