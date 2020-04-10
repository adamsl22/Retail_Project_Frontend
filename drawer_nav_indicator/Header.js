import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DrawerTrigger from './DrawerTrigger';

export default function Header(){
    return(
        <View style={styles.header}>
            <DrawerTrigger />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 60,
        height: 20
    }
})