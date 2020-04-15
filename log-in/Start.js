import React from 'react';
import {View, Text, Button, StyleSheet, Dimensions} from 'react-native';

export default function Start({navigation}){
    return(
        <View style={styles.startPage}>
            <Text style={styles.welcomeText}>Welcome to</Text>
            <Text style={styles.titleText}>Retail Rush!</Text>
            <Button title="User Login" onPress={() => navigation.navigate('User Login')}/>
            <View style={styles.buttonSpace}>
            <Button title="User Signup" onPress={() => navigation.navigate('User Signup')}/>
            </View>
            <Button title="Retailer Login" onPress={() => navigation.navigate('Retailer Login')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    startPage: {
        backgroundColor: 'lavender',
        height: Dimensions.get('window').height
    },
    welcomeText: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'purple',
        padding: 10,
        paddingTop: 50
    },
    titleText: {
        fontSize: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'purple',
        padding: 10,
        paddingBottom: 50
    },
    buttonSpace: {
        padding: 20
    }
});