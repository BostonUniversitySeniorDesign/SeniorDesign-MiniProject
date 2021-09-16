import React from 'react';
import { View, Image , Text } from 'react-native';
import { globalStyles,globalTextStyle } from '../styles/global'
import { initDatabase } from '../utils/database'

class HomeScreen extends React.Component {
  
    componentDidMount(){
      this._isMounted = true;
      this.setState({
        isLoading: true
      });
    
    this.setState({
        isLoading: false
      });
    }
  
    componentWillUnmount() {
      this._isMounted = false;
    }
  
    render(){
      return (
        <View >
  
          <Text style={globalTextStyle.welcome}>Welcome to our Barcode Scanner App!</Text>
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 20
                }}
            >
            </View>
  
        </View>
      );
    }
  
  }
  
  export default HomeScreen;