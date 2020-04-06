import React from 'react';
import {View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {styles} from '../../styles';
import Home from '../pages/Home';
import CategoryNav from './CategoryNav.js';
import RetailerList from '../lists/RetailerList';
import Account from '../pages/Account';

const Drawer = createDrawerNavigator();

export default function UserNav(){
    return(
        <View style={styles.DrawerNav}>
            <NavigationContainer>
                <Drawer.Navigator>
                    <Drawer.Screen name='Home' component={Home}/>
                    <Drawer.Screen name='Browse Items' component={CategoryNav}/>
                    <Drawer.Screen name='Find a Store' component={RetailerList}/>
                    <Drawer.Screen name='My Account' component={Account}/>
                </Drawer.Navigator>
            </NavigationContainer>
        </View>
    )
}