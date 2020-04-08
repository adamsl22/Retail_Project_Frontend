import React from 'react';
import {View, Text, Button, StyleSheet, Dimensions} from 'react-native';
import Map from './Map';

export default class NearbyLocation extends React.Component{
    state = {
        location: null,
    }

    componentDidMount(){
        fetch('http://localhost:3001/locations')
        .then(resp => resp.json())
        .then(locations => {
            const location = locations.filter(location => location.retailer_id == this.props.route.params.selected.id)[0]
            this.setState({location})
        })
    }

    render(){
        if (this.state.location){
            console.log(this.state.location)
            return(
                <View>
                    <Text style={styles.nameText}>{this.props.route.params.selected.name}</Text>
                    <Text style={styles.nameText}>{this.state.location.address}</Text>
                    <Map style={styles.mapWindow} location={this.state.location}/>
                </View>
            )
        } else {
            return <View><Text>Loading...</Text></View>
        }
    }
}

const styles = StyleSheet.create({
    mapWindow: {
      width: Dimensions.get('window').width / 1.4,
      height: Dimensions.get('window').height / 4,
      alignSelf: 'center',
      justifyContent: 'center'
    },
    nameText: {
        padding: 20,
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 20
    }
});