import React from 'react';
import {View, Text, Button, StyleSheet, Dimensions} from 'react-native';
import Map from './Map';
import Header from '../../drawer_nav_indicator/Header';

export default class FavStores extends React.Component{
    state = {
        favStoreIndex: 0,
        favStores: [],
        favStore: null
    }

    componentDidMount(){
        fetch('http://localhost:3001/favorite_stores')
        .then(resp => resp.json())
        .then(favStores => {
            const userFavStores = favStores.filter(store => store.user_id == this.props.route.params.user.id)
            this.setState({
                favStores: userFavStores,
                favStore: userFavStores[0]
            })
        })
    }

    prevStore = () => {
        const finalIndex = this.state.favStores.length - 1
        if (this.state.favStoreIndex === 0){
            this.setState({
                favStoreIndex: finalIndex,
                favStore: this.state.favStores[finalIndex]
            })
        } else {
            const newIndex = this.state.favStoreIndex - 1
            this.setState({
                favStoreIndex: newIndex,
                favStore: this.state.favStores[newIndex]
            })
        }
    }

    nextStore = () => {
        const finalIndex = this.state.favStores.length - 1
        if (this.state.itemIndex === finalIndex){
            this.setState({
                itemIndex: 0,
                favStore: this.state.favStores[0]
            })
        } else {
            const newIndex = this.state.favStoreIndex + 1
            this.setState({
                itemIndex: newIndex,
                favStore: this.state.favStores[newIndex]
            })
        }
    }

    unfavorite = () => {
        fetch(`http://localhost:3001/favorite_stores/${this.state.favStore.id}`,{method: 'DELETE'})
        const newFavs = this.state.favStores.filter(favStore => favStore.id !== this.state.favStore.id)
        this.setState({
            favStoreIndex: 0,
            favStores: newFavs,
            favStore: this.state.favStores[0]
        })
    }

    render(){
        if (this.state.favStore){
            return(
                <View>
                    <Header />
                    <View style={styles.row}>
                        <Button title='Previous Store' onPress={this.prevStore}/>
                        <Button title='Next Store' onPress={this.nextStore}/>
                    </View>
                    <Text style={styles.nameText}>{this.state.favStore.location.retailer.name}</Text>
                    <Text style={styles.nameText}>{this.state.favStore.location.address}</Text>
                    <View style={styles.mapArea}>
                        <Map style={styles.mapWindow} location={this.state.favStore.location}/>
                    </View>
                    <View style={styles.buttonArea}>
                        <Button title='View Store Catalogue' onPress={
                            () => this.props.navigation.navigate('Store Catalogue', {
                                selected: this.state.favStore.location.retailer,
                                user: this.props.route.params.user
                            })
                        }/>
                        <Button title='Remove from Favorites' onPress={this.unfavorite}/>
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
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 30
    },
    buttonArea: {
        padding: 60
    },
    mapArea: {
        padding: 20
    }
});