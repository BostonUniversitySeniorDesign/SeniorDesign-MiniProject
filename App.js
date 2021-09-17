import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import HomeScreen from './screens/HomeScreen';
import {AuthScreen} from './screens/auth';
import {RealtimeDBScreen} from './screens/realtimeDatabase';
import {CloudFirestoreScreen} from './screens/cloudFirestore';
import {CloudStorageScreen} from './screens/cloudStorage';
import {AdmobScreen} from './screens/admob';
import {FunctionsScreen} from './screens/functions';
import {AnalyticsScreen} from './screens/analytics';
import {analytics} from './Setup';
import Scan from './components/camera';
import ResultsScreen from './screens/ResultsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() =>
        (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
      }
      onStateChange={() => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          // The line below uses the expo-firebase-analytics tracker
          // https://docs.expo.io/versions/latest/sdk/firebase-analytics/
          // Change this line to use another Mobile analytics SDK

          analytics().setCurrentScreen(currentRouteName);
        }

        // Save the current route name for later comparision
        routeNameRef.current = currentRouteName;
      }}>
      <Stack.Navigator headerMode="none" initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="RealtimeDB" component={RealtimeDBScreen} />
        <Stack.Screen
          name="CloudFirestoreDB"
          component={CloudFirestoreScreen}
        />
        <Stack.Screen name="CloudStorage" component={CloudStorageScreen} />
        <Stack.Screen name="Admob" component={AdmobScreen} />
        <Stack.Screen name="Functions" component={FunctionsScreen} />
        <Stack.Screen name="Analytics" component={AnalyticsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
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


}}