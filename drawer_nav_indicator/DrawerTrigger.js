import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {DrawerActions} from '@react-navigation/drawer';

export default function DrawerTrigger(props){
    return(
        <View style={styles.trigger}
        onPress={() => {props.navigation.dispatch(DrawerActions.openDrawer())}}>
            <Ionicons name={'md-arrow-round-forward'} size={30} color='purple' />
        </View>
    )
}

const styles = StyleSheet.create({
    trigger: {
        marginLeft: 10,
        borderRadius: 30,
        width: 60,
        height: 60
    }
});