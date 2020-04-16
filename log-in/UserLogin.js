import React from 'react';
import {View, Button, TextInput, Alert, StyleSheet, Dimensions} from 'react-native';

export default class UserLogin extends React.Component{
    state = {
        username: '',
        password: ''
    };

    login = () => {
        fetch('http://localhost:3001/users')
        .then(resp => resp.json())
        .then(users => {
            const user = users.filter(user => user.username === this.state.username)[0]
            this.props.route.params.setUser(user)
        })
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
                    style={styles.input}
                    secureTextEntry={true}
                />
                <Button
                    title={'Login'}
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