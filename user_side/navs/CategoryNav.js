import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {styles} from '../../styles';
import Categories from '../lists/Categories';
import SubcategoryNav from './SubcategoryNav';

const Stack = createStackNavigator();

export default function CategoryNav(){
    return(
        <View style={styles.StackNav}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name='Categories' component={Categories}/>
                    <Stack.Screen name='SubcategoryNav' component={SubcategoryNav}/>
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    )
}