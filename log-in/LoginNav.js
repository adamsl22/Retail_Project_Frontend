import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Start from './Start';
import UserLogin from './UserLogin';
import UserSignup from './UserSignup';
import RetailerLogin from './RetailerLogin';

const Stack = createStackNavigator();

export default function LoginNav(props){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Welcome!' component={Start}/>
                <Stack.Screen name='User Login' component={UserLogin} initialParams={{setUser: props.setUser}}/>
                <Stack.Screen name='User Signup' component={UserSignup} initialParams={{setUser: props.setUser}}/>
                <Stack.Screen name='Retailer Login' component={RetailerLogin} initialParams={{setRetailer: props.setRetailer}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};