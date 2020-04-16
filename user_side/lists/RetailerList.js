import React from 'react';
import {View, Button, StyleSheet, Dimensions} from 'react-native';

export default class RetailerList extends React.Component{
    state = {
        retailers: []
    };

    componentDidMount(){
        fetch('http://localhost:3001/retailers')
        .then(resp => resp.json())
        .then(retailers => this.setState({retailers: retailers}))
    };

    render(){
        return(
            <View style={styles.list}>
                {this.state.retailers.map(retailer => {
                    return <Button color='purple' key={retailer.id} title={retailer.name} onPress={() => this.props.navigation.navigate('Nearby Store', {selected: retailer, user: this.props.route.params.user})}  />
                })}
            </View>
        );
    };
};

const styles = StyleSheet.create({
    list: {
        backgroundColor: 'lavender',
        height: Dimensions.get('window').height,
        padding: 10
    }
});