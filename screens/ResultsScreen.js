import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Container } from 'react-native';
//import { withNavigation } from 'react-navigation';

function ResultsScreen({ route }) {
  var data = route.params.data;
  data = data.substring(1);
  //const serving = props.navigation.getParam("number2","1");
  const [data2, setData] = useState('');

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

  if(data2){
    console.log(data2.foods[0]);
    var data3 = data2.foods[0].ingredients;
    var data4 = data2.foods[0].foodNutrients[3].value /** serving*/;
    var data5 = data2.foods[0].description;
  }
  
  return (
    <View style={styles.container}>
    <Text>Food: {data5}</Text>
    <Text>Ingredients: {data3}</Text>
    <Text>Calories: {data4} kCal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  }
});

export default ResultsScreen;