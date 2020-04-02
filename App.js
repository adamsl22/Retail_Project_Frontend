import React from 'react';
import { StyleSheet, View } from 'react-native';
import UserNav from './user_side/UserNav';
import RetailerNav from './retailer_side/RetailerNav';

export default function App() {
  return (
    <View style={styles.container}>
      <UserNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
