// In App.js in a new project

import * as React from 'react';
import App from './App';
import firebase from '@react-native-firebase/app';
import Auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import OneSignal from 'react-native-onesignal';
import functions from '@react-native-firebase/functions';
import messaging from '@react-native-firebase/messaging';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import inAppMessaging from '@react-native-firebase/in-app-messaging';
import analytics from '@react-native-firebase/analytics';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcQiWTTdDL7iPhy9jnQtPzIwylIev4-Ag",
  authDomain: "stefantalhaproject.firebaseapp.com",
  projectId: "stefantalhaproject",
  storageBucket: "stefantalhaproject.appspot.com",
  messagingSenderId: "134592397563",
  appId: "1:134592397563:web:9b069bae3e1893d272305e",
  measurementId: "G-T84CC5VLB4"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export {
  firebase,
  Auth,
  database,
  firestore,
  storage,
  functions,
  messaging,
  dynamicLinks,
  inAppMessaging,
  analytics,
};

const Setup = () => {
  const onReceived = notification => {
    console.log('Notification received: ', notification);
  };

  const onOpened = openResult => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  };

  const onIds = device => {
    console.log('Device info: ', device);
  };

  const setupCloudMessaging = async () => {
    const token = await messaging().getToken();
    //  alert(token);
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  const handleDynamicLink = link => {
    // alert(link.url);
  };
  React.useEffect(async () => {
    await inAppMessaging().setMessagesDisplaySuppressed(true);
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        alert(link.url);
      });
    setupCloudMessaging();
    OneSignal.init('37c392d3-3799-46bc-ac37-e38da7fc740f', {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });
    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);

    // It will trigger when app was in background
    messaging().onNotificationOpenedApp(remoteMessage => {
      //alert(JSON.stringify(remoteMessage));
    });

    // It will trigger when app was in quit mode
    messaging().getInitialNotification(remoteMessage => {
      // alert(JSON.stringify(remoteMessage));
    });

    // If App is in foreground mode
    messaging().onMessage(remoteMessage => {
      // alert(JSON.stringify(remoteMessage));
    });

    return () => {
      OneSignal.removeEventListener('received', onReceived);
      OneSignal.removeEventListener('opened', onOpened);
      OneSignal.removeEventListener('ids', onIds);
      unsubscribe();
    };
  }, []);
  return <App />;
};

export default Setup;
