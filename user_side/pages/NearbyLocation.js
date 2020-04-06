import React from 'react';
import {View, Text, Button, StyleSheet, Dimensions} from 'react-native';
import Map from './Map';

export default class NearbyLocation extends React.Component{
    // state = {
    //     items: [],
    //     showItem: null,
    //     retailers: [],
    //     showItemRetailer: null
    // }

    // componentDidMount(){
    //     fetch('localhost:3001/items')
    //     .then(resp => resp.json())
    //     .then(items => {
    //         subcatItems = items.filter(item => item.subcategory_id == this.props.route.params.selected.id)
    //         this.setState({
    //             items: subcatItems,
    //             showItem: subcatItems[0]
    //         })
    //         fetch('localhost:3001/retailers')
    //         .then(resp => resp.json())
    //         .then(retailers => {
    //             itemRetailer = retailers.filter(retailer => retailer.id == this.state.showItem.retailer_id)
    //             this.setState({
    //                 retailers: retailers,
    //                 showItemRetailer: itemRetailer
    //             })
    //         })
    //     })
    // }

    render(){
        return(
            <View>
                <Text>{this.props.route.params.selected.name}</Text>
                <Map style={styles.mapWindow}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mapWindow: {
      width: Dimensions.get('window').width / 1.4,
      height: Dimensions.get('window').height / 4,
      alignSelf: 'center',
      justifyContent: 'center'
    }
});