import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RetailerList from '../lists/RetailerList';
import NearbyLocation from '../pages/NearbyLocation';
import StoreCatalogue from '../pages/StoreCatalogue';

const Stack = createStackNavigator();

export default function StoreNav(props){
    return(
        <Stack.Navigator>
            <Stack.Screen name='Retailers' component={RetailerList} initialParams={{user: props.route.params.user}}/>
            <Stack.Screen name='Nearby Store' component={NearbyLocation}/>
            <Stack.Screen name='Store Catalogue' component={StoreCatalogue}/>
        </Stack.Navigator>
    )
}