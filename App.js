import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { Icon } from 'react-native-elements';

import HomeScreen from './screens/HomeScreen';
import Scan from './components/camera';
import ResultsScreen from './screens/ResultsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Barcode Scanner App" component={HomeScreen} />
      <Stack.Screen name="Product Information" component={ResultsScreen} />
    </Stack.Navigator>
  )
}

export default function App(){
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
        name="Main"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => <Icon name="home" type="ionicons" />
        }} />
        <Tab.Screen
        name="Scan"
        component={Scan}
        options={{
          tabBarLabel: "Scanner",
          tabBarIcon: () => <Icon name="barcode" type="antdesign" />
        }}/>
    </Tab.Navigator>
  </NavigationContainer>
  );
}