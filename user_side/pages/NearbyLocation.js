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

    favoriteItem = () => {
        fetch('http://localhost:3001/favorite_stores',{
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                accept: 'application/json'
            },
            body: JSON.stringify({
                user_id: this.props.route.params.user.id,
                location_id: this.state.location.id
            })
        })
        .then(resp => resp.json())
        .then(Alert.alert('Store added to favorites.'))
    }

    render(){
        if (this.state.location){
            return(
                <View>
                    <Text style={styles.nameText}>{this.state.location.retailer.name}</Text>
                    <Text style={styles.nameText}>{this.state.location.address}</Text>
                    <View style={styles.mapArea}>
                        <Map style={styles.mapWindow} location={this.state.location}/>
                    </View>
                    <View style={styles.buttonArea}>
                        <Button  title='View Store Catalogue' onPress={
                            () => this.props.navigation.navigate('Store Catalogue', {
                                selected: this.state.location.retailer,
                                user: this.props.route.params.user
                            })
                        }/>
                        <Button title='Favorite Store' onPress={this.favoriteStore}/>
                    </View>
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
    },
    buttonArea: {
        padding: 60
    },
    mapArea: {
        padding: 20
    }
});