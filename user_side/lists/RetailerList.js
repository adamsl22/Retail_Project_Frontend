import React from 'react';
import {View, Button} from 'react-native';

export default class RetailerList extends React.Component{
    state = {
        retailers: []
    }

    componentDidMount(){
        fetch('localhost:3001/retailers')
        .then(resp => resp.json())
        .then(retailers => this.setState({retailers: retailers}))
    }

    render(){
        return(
            <View>
                {this.state.retailers.map(retailer => {
                    return <Button title={retailer.name} onPress={() => this.props.navigation.navigate('Nearby Store', {selected: retailer})}  />
                })}
            </View>
        )
    }
}