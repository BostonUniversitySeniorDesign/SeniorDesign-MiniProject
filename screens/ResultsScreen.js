import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Container } from 'react-native';
import { firebase } from '../src/firebase/config';
//import { withNavigation } from 'react-navigation';

function ResultsScreen({ route, navigation }) {
  var { data } = route.params;
  const { user } = route.params;
  data = data.substring(1);
  //const serving = props.navigation.getParam("number2","1");
  const [data2, setData] = useState('');
  const [entities, setEntities] = useState([]);
  const entityRef = firebase.firestore().collection('SavedFood');
  var fdakey = config.FDA_API;

  useEffect(() => {
    (async () => {
        const response = await fetch(
          'https://api.nal.usda.gov/fdc/v1/foods/search?query=' + data + '&pageSize=2&api_key=' + fdakey
           );
           const dataGrabbed = await response.json();
          //  console.log(dataGrabbed);
           setData(dataGrabbed);
    })();
    entityRef
        .where("authorID", "==", user.id)
        .orderBy('createdAt', 'desc')
        .onSnapshot(
            querySnapshot => {
                const newEntities = []
                querySnapshot.forEach(doc => {
                    const entity = doc.data()
                    entity.id = doc.id
                    newEntities.push(entity)
                });
                setEntities(newEntities)
            },
            error => {
                console.log(error)
            }
        )
  }, []);

  if(data2){
    console.log(data2.foods[0]);
    var data3 = data2.foods[0].ingredients;
    var data4 = data2.foods[0].foodNutrients[3].value /** serving*/;
    var data5 = data2.foods[0].description;
    var data6 = data2.foods[0].brandName;
  }

  const onAddButtonPress = () => {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const updata = {
          Brand: data6,
          Food: data5,
          Ingredients: data3,
          Calories: data4,
          authorID: user.id,
          createdAt: timestamp,
      };
      entityRef
          .add(updata)
          .catch((error) => {
              alert(error)
          });
      navigation.navigate('Saved', { screen: 'Saved Items', params: { user:user }, });
  }
  
  return (
    <View style={styles.container}>
    <Text>Brand: {data6}</Text>
    <Text>Food: {data5}</Text>
    <Text>Ingredients: {data3}</Text>
    <Text>Calories: {data4} kCal</Text>
    <Button
      title="Save Food"
      onPress={onAddButtonPress}
    />
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