import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UserNav from './user_side/navs/UserNav';
import RetailerNav from './retailer_side/RetailerNav';

export default function App() {
  

  return (
    <View style={styles.container}>
      {/* <Text>Hello</Text> */}
      <UserNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});