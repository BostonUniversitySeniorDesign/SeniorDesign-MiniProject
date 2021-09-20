import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

import { Icon } from 'react-native-elements';

import HomeScreen from './screens/HomeScreen';
import Scan from './screens/camera';
import ResultsScreen from './screens/ResultsScreen';
import SavedScreen from './screens/SavedScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Product Information" component={ResultsScreen} />
    </Stack.Navigator>
  );
}

function AccountStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login Page" component={LoginScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
    </Stack.Navigator>
  )
}

function ScanStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Scanner" component={Scan} />
    </Stack.Navigator>
  )
}

function SavedStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Saved Items" component={SavedScreen} />
    </Stack.Navigator>
  )
}

export default function App(){

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  return (
    <NavigationContainer>
          <Tab.Navigator>
          <Tab.Screen name="Login" component={AccountStack} options={{tabBarLabel: "Login", tabBarIcon: () => <Icon name="login" type="SimpleLineIcons" /> }} />
          <Tab.Screen
            name="Main"
            component={HomeStack}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: () => <Icon name="home" type="ionicons" />
          }} />
          <Tab.Screen
            name="Scan"
            component={ScanStack}
            options={{
              tabBarLabel: "Scanner",
              tabBarIcon: () => <Icon name="barcode" type="antdesign" />
          }}/>
          <Tab.Screen
            name="Saved"
            component={SavedStack}
            options={{
              tabBarLabel: "Saved",
              tabBarIcon: () => <Icon name="star" type="antdesign" />
          }}/>
          </Tab.Navigator>
    </NavigationContainer>
  );

  /*return (
    <NavigationContainer>
      <Stack.Navigator>
        { user ? (
          <Tab.Navigator>
          <Tab.Screen
            name="Home"
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
          <Tab.Screen
            name="Saved"
            component={SavedStack}
            options={{
              tabBarLabel: "Saved",
              tabBarIcon: () => <Icon name="star" type="antdesign" />
          }}/>
          </Tab.Navigator>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );*/
}