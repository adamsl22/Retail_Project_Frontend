import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export default function Home({navigation}){
    return(
        <View>
            <View style={styles.welcome}>
            <Text style={styles.welcomeText}>Welcome!</Text>
            </View>
            <Button title="Browse Items" onPress={() => navigation.navigate('Browse Items')} />
            <Button title="Find a Store" onPress={() => navigation.navigate('Find a Store')} />
            <Button title="My Account" onPress={() => navigation.navigate('My Account')} />
        </View>
    )
}

const styles = StyleSheet.create({
    welcome: {
        height: 60,
        padding: 15,
        marginTop: 50
    },
    welcomeText: {
        fontSize: 23,
        textAlign: 'center',
        fontWeight: 'bold'
    }
});