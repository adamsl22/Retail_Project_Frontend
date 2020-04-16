import React from 'react';
import {View, Button, TextInput, Alert, StyleSheet, Dimensions} from 'react-native';

export default class UserSignup extends React.Component{
    state = {
        username: '',
        password: ''
    };

    login = () => {
        fetch('http://localhost:3001/users',{
            method: 'POST',
            headers: {
                'content-type':'application/json',
                accept:'application/json'
            },
            body: JSON.stringify({username: this.state.username, password: this.state.password})
        })
        .then(resp => resp.json())
        .then(user => this.props.route.params.setUser(user))
    }

    render(){
        return(
            <View style={styles.form}>
                <TextInput
                    value={this.state.username}
                    onChangeText={(username) => this.setState({username})}
                    placeholder={'Username'}
                    style={styles.input}
                />
                <TextInput
                    value={this.state.password}
                    onChangeText={(password) => this.setState({password})}
                    placeholder={'Password'}
                    secureTextEntry={true}
                    style={styles.input}
                />
                <Button
                    title={'Start!'}
                    style={styles.input}
                    onPress={this.login}
                    color='purple'
                />
            </View>
        )
    }
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 20,
        alignSelf: 'center'
    },
    form: {
        backgroundColor: 'lavender',
        height: Dimensions.get('window').height,
        paddingTop: 200
    }
  });