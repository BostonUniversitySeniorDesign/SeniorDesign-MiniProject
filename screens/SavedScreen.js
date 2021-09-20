import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { firebase } from '../src/firebase/config';

function SavedScreen({ route }) {
    const { user } = route.params;
    const [entities, setEntities] = useState([]);
    const entityRef = firebase.firestore().collection('SavedFood');
    
    useEffect(() => {
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
    }, [])

    const renderEntity = ({item}) => {
        return (
            <View style={styles.entityContainer}>
                <Text style={styles.entityText}>
                    {item.Brand}
                </Text>
                <Text style={styles.entityText}>
                    {item.Food}
                </Text>
                <Text style={styles.entityText}>
                    {item.Calories} kCal
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            { entities && (
                <View style={styles.listContainer}>
                <FlatList
                    data={entities}
                    renderItem={renderEntity}
                    keyExtractor={(item) => item.id}
                    removeClippedSubviews={true}
                />
                </View>
            )}
                
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginTop: 40,
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#788eec',
        width: 80,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    listContainer: {
        marginTop: 20,
        padding: 20,
    },
    entityContainer: {
        marginTop: 16,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingBottom: 16
    },
    entityText: {
        fontSize: 20,
        color: '#333333'
    }
});

export default SavedScreen;