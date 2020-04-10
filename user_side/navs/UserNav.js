import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../pages/Home';
import CategoryNav from './CategoryNav.js';
import StoreNav from './StoreNav';
import Account from '../pages/Account';
import FavItems from '../pages/FavItems';
import FavStores from '../pages/FavStores';

const Drawer = createDrawerNavigator();

export default function UserNav(props){
    return(
        <NavigationContainer>
            <Drawer.Navigator drawerStyle={styles.DrawerNav}>
                <Drawer.Screen name='Home' component={Home} initialParams={{user: props.user}}/>
                <Drawer.Screen name='Browse Items' component={CategoryNav} initialParams={{user: props.user}}/>
                <Drawer.Screen name='Favorite Items' component={FavItems} initialParams={{user: props.user}}/>
                <Drawer.Screen name='Find a Store' component={StoreNav} initialParams={{user: props.user}}/>
                {/* <Drawer.Screen name='Favorite Stores' component={FavStores} initialParams={{user: props.user}}/> */}
                <Drawer.Screen name='My Account' component={Account} initialParams={{user: props.user}}/>
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    DrawerNav: {
        backgroundColor: 'lavender'
    }
})