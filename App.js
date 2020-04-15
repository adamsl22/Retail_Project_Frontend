import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UserNav from './user_side/navs/UserNav';
import RetailerNav from './retailer_side/RetailerNav';
import LoginNav from './log-in/LoginNav';

export default class App extends React.Component {
  state = {
    loggedIn: false,
    user: null
  };

  setUser = (user) => {
    this.setState({user, loggedIn: true})
  }

  logOut = () => {
    this.setState({
      loggedIn: false,
      user: null
    })
  }

  render(){
    return (
      <View style={styles.container}>
        {this.state.loggedIn ?
          <UserNav user={this.state.user} logOut={this.logOut}/> :
          <LoginNav setUser={this.setUser} setRetailer={this.setRetailer}/>
        }
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});