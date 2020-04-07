import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import RetailerList from '../lists/RetailerList';
import NearbyLocation from '../pages/NearbyLocation';

const Stack = createStackNavigator();

export default function StoreNav(){
    return(
        // <View style={styles.StackNav}>
        //     <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name='Retailers' component={RetailerList}/>
                    <Stack.Screen name='Nearby Store' component={NearbyLocation}/>
                </Stack.Navigator>
        //     </NavigationContainer>
        // </View>
    )
}