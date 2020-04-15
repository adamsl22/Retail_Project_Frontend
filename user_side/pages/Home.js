import React from 'react';
import {View, Text, Button, StyleSheet, Dimensions} from 'react-native';
import Header from '../../drawer_nav_indicator/Header';

export default function Home(props){
    return(
        <View style={styles.home}>
            <Header />
            <View style={styles.welcome}>
                <Text style={styles.titleText}>Retail Rush!</Text>
            </View>
            <View style={styles.buttonSpace}>
            <Button color='gold' title="Favorite Items" onPress={() => props.navigation.navigate('Favorite Items')}/>
            </View>
            <Button color='gold' title="Favorite Stores" onPress={() => props.navigation.navigate('Favorite Stores')}/>
            <View style={styles.buttonSpace}>
            <Button color='gold' title="My Account" onPress={() => props.navigation.navigate('My Account')}/>
            </View>
            <Button color='gold' title="Log Out" onPress={props.route.params.logOut}/>
        </View>
    )
}

const styles = StyleSheet.create({
    home: {
        backgroundColor: 'purple',
        height: Dimensions.get('window').height
    },
    titleText: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'gold',
        padding: 30,
        paddingTop: 100
    },
    buttonSpace: {
        padding: 20
    }
});