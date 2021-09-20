import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Vibration} from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { withNavigation } from "react-navigation";
//import nodejs from 'nodejs-mobile-react-native';

function camera({ route, navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { user } = route.params;

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  //const [data2, setData] = useState('');

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Vibration.vibrate()
    console.log('Type: ' + type + '\nData: ' + data)
	  //Reads the data into result screen
      navigation.navigate('Main', { screen: 'Product Information', params: { data:data, user:user },
      });
/*
    data = data.substring(1);

    useEffect(() => {
      (async () => {
          const response = await fetch(
            'https://api.nal.usda.gov/fdc/v1/foods/search?query=' + data + '&pageSize=2&api_key=rF0UJLafWZHGG91JRLNLIUXbjExmPH9hnyAU98qe'
             );
             const dataGrabbed = await response.json();
            //  console.log(dataGrabbed);
             setData(dataGrabbed);
      })();
    }, []);
    /*const response = fetch(
      'https://api.nal.usda.gov/fdc/v1/foods/search?query=' + data + '&pageSize=2&api_key=rF0UJLafWZHGG91JRLNLIUXbjExmPH9hnyAU98qe'
     );
    const dataGrabbed = response.json();
    setData(dataGrabbed);

    this.props.navigation.navigate('ResultsScreen', {
      data2: data2
    });*/
  };

  if (hasPermission === null) {
    return <Text>Requesting access to camera</Text>;
  }
  if (hasPermission === false) {
    return <Text>Access to camera denied</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && <Button title={'Scan Barcode'} onPress={() => setScanned(false)} />}
    </View>
  );
}

export default camera;