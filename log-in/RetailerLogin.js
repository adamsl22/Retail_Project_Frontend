import React from 'react';
import {View, Button, TextInput, Alert, StyleSheet, Dimensions} from 'react-native';

export default class RetailerLogin extends React.Component{
    state = {
        retailerName: '',
        password: ''
    };

    login = () => {
        fetch('http://localhost:3001/retailers')
        .then(resp => resp.json())
        .then(retailers => {
            const retailer = retailers.filter(retailer => retailer.name === this.state.retailerName)[0]
            this.props.route.params.setRetailer(retailer)
        })
    }

    render(){
        return(
            <View style={styles.form}>
                <TextInput
                    value={this.state.retailerName}
                    onChangeText={(retailerName) => this.setState({retailerName})}
                    placeholder={'Retailer Name'}
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
                    title={'Login'}
                    style={styles.input}
                    onPress={this.login}
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