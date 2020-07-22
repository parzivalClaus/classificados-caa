import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NewCompany from '../../../pages/NewCompany';
import EditCompany from '../../../pages/NewCompany/EditCompany';

const Stack = createStackNavigator();

export default function CategoryNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NewCompany"
        component={NewCompany}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditCompany"
        component={EditCompany}
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
    </Stack.Navigator>
  );
}
