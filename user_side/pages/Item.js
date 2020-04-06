import React from 'react';
import {View, Text, Button} from 'react-native';

export default class Item extends React.Component{
    state = {
        items: [],
        showItem: null,
        retailers: [],
        showItemRetailer: null
    }

    componentDidMount(){
        fetch('localhost:3001/items')
        .then(resp => resp.json())
        .then(items => {
            subcatItems = items.filter(item => item.subcategory_id == this.props.route.params.selected.id)
            this.setState({
                items: subcatItems,
                showItem: subcatItems[0]
            })
            fetch('localhost:3001/retailers')
            .then(resp => resp.json())
            .then(retailers => {
                itemRetailer = retailers.filter(retailer => retailer.id == this.state.showItem.retailer_id)
                this.setState({
                    retailers: retailers,
                    showItemRetailer: itemRetailer
                })
            })
        })
    }

    render(){
        return(
            <View>
                <Text>{this.state.showItemRetailer.name}</Text>
                <Text>{this.state.showItem.name}</Text>
            </View>
        )
    }
}