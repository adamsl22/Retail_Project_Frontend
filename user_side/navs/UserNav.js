import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../pages/Home';
import CategoryNav from './CategoryNav.js';
import StoreNav from './StoreNav';
import Account from '../pages/Account';

const Drawer = createDrawerNavigator();

export default function UserNav(){
    return(
        <NavigationContainer>
            <Drawer.Navigator drawerStyle={styles.DrawerNav}>
                <Drawer.Screen name='Home' component={Home}/>
                <Drawer.Screen name='Browse Items' component={CategoryNav}/>
                <Drawer.Screen name='Find a Store' component={StoreNav}/>
                <Drawer.Screen name='My Account' component={Account}/>
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    DrawerNav: {
        backgroundColor: 'lavender'
    }
})