import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Categories from '../lists/Categories';
import Subcategories from '../lists/Subcategories';
import Item from '../pages/Item';
import NearbyLocation from '../pages/NearbyLocation';

const Stack = createStackNavigator();

export default function CategoryNav(props){
    return(
        <Stack.Navigator>
            <Stack.Screen name='Categories' component={Categories} initialParams={{user: props.route.params.user}}/>
            <Stack.Screen name='Subcategories' component={Subcategories}/>
            <Stack.Screen name='Item' component={Item}/>
            <Stack.Screen name='Nearby Store' component={NearbyLocation}/>
        </Stack.Navigator>
    )
}