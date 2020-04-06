import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/Stack';
import {NavigationContainer} from '@react-navigation/native';
import {styles} from '../../styles';
import Subcategories from '../lists/Subcategories';
import Item from '../pages/Item';

const Stack = createStackNavigator();

export default function SubcategoryNav(){
    return(
        <View style={styles.StackNav}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name={this.props.route.params.selected.name} component={Subcategories}/>
                    <Stack.Screen name='Item' component={Item}/>
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    )
}