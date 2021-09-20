import React from 'react';
import { View, Image , Text, Button } from 'react-native';
import { globalStyles,globalTextStyle } from '../styles/global'
import Scan from './camera';

function HomeScreen({ route, navigation }) {
  
    const { user } = route.params;

    return (
        <View >
  
          <Text style={globalTextStyle.welcome}>Welcome {user.fullName} to our Barcode Scanner App!</Text>
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 20
                }}
            >
            </View>
        
          <Button
          title="Scan Food"
          onPress={() => navigation.navigate('Scan', { screen: 'Scanner', params: {user},})}
          />
        </View>
      );  
}
export default HomeScreen;