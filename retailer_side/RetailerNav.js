import React from 'react';
import {View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {styles} from '../styles';
import GenStats from './pages/GenStats';
import StatsByRegion from './lists/StatsByRegion';
import StatsByLocation from './lists/StatsByLocation';
import RetailerAccount from './pages/RetailerAccount';

const Drawer = createDrawerNavigator();

export default function UserNav(){
    return(
        <View style={styles.DrawerNav}>
            <NavigationContainer>
                <Drawer.Navigator>
                    <Drawer.Screen name='General Statistics' component={GenStats}/>
                    <Drawer.Screen name='Statistics by Region' component={StatsByRegion}/>
                    <Drawer.Screen name='Statistics by Location' component={StatsByLocation}/>
                    <Drawer.Screen name='Retailer Account' component={RetailerAccount}/>
                </Drawer.Navigator>
            </NavigationContainer>
        </View>
    )
}