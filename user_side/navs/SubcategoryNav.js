import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Subcategories from '../lists/Subcategories';
import Item from '../pages/Item';

const Stack = createStackNavigator();

export default function SubcategoryNav(props){
    return(
        // <View style={styles.StackNav}>
        //     <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name={props.route.params.params.selected.name} component={Subcategories}/>
                    <Stack.Screen name='Item' component={Item}/>
                </Stack.Navigator>
        //     </NavigationContainer>
        // </View>
    )
}