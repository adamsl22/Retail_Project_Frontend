import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UserNav from './user_side/navs/UserNav';
import RetailerNav from './retailer_side/RetailerNav';

export default class App extends React.Component {
  state = {
    user_id: 1
  }

  render(){
    return (
      <View style={styles.container}>
        {/* <Text>Hello</Text> */}
        <UserNav user={this.state.user_id}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});