import React from 'react';
import {View, Text, Button, Image, Picker, StyleSheet, Alert} from 'react-native';
// import images from '../../assets/test_data_images/images';
import Header from '../../drawer_nav_indicator/Header';

export default class FavItems extends React.Component{
    state = {
        favItems: [],
        favItem: null,
        items: [],
        itemIndex: 0,
        showItem: null,
        retailers: [],
        showItemRetailer: null,
        showSizeSelection: false,
        selectedSizes: [],
        selectedSize: null
    }

    componentDidMount(){
        fetch('http://localhost:3001/favorite_items')
        .then(resp => resp.json())
        .then(favItems => {
            const userFavItems = favItems.filter(item => item.user_id == this.props.route.params.user)
            const selectedSizes = userFavItems.map(item => item.selected_size)
            this.setState({
                favItems: userFavItems,
                favItem: userFavItems[0],
                selectedSizes,
                selectedSize: selectedSizes[0]
            })
            fetch('http://localhost:3001/items')
            .then(resp => resp.json())
            .then(items => {
                const userItems = items.filter(item => userFavItems.map(favItem => favItem.item_id).includes(item.id))
                this.setState({
                    items: userItems,
                    showItem: userItems[0]
                })
                fetch('http://localhost:3001/retailers')
                .then(resp => resp.json())
                .then(retailers => {
                    const itemRetailer = retailers.filter(retailer => retailer.id == this.state.showItem.retailer_id)[0]
                    this.setState({
                        retailers: retailers,
                        showItemRetailer: itemRetailer
                    })
                })
            })
        })
    }

    selectSize = (size) => {
        const selectedSize = `Selected Size: ${size}`
        fetch(`http://localhost:3001/favorite_items/${this.state.favItem.id}`,{
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                accept: 'application/json'
            },
            body: JSON.stringify({selected_size: selectedSize})
        })
        .then(resp => resp.json())
        .then(
            fetch('http://localhost:3001/favorite_items')
            .then(resp => resp.json())
            .then(favItems => {
                const userFavItems = favItems.filter(item => item.user_id == this.props.route.params.user)
                const selectedSizes = userFavItems.map(item => item.selected_size)
                this.setState({
                    selectedSizes,
                    selectedSize
                })
                this.toggleSizeSelector()
            })
        )
    }

    toggleSizeSelector = () => {
        this.setState(prevState => ({showSizeSelection: !prevState.showSizeSelection}))
    }

    prevItem = () => {
        const finalIndex = this.state.items.length - 1
        if (this.state.itemIndex === 0){
            const newItem = this.state.items[finalIndex]
            const itemRetailer = this.state.retailers.filter(
                retailer => retailer.id == newItem.retailer_id
            )[0]
            this.setState({
                itemIndex: finalIndex,
                showItem: newItem,
                favItem: this.state.favItems[finalIndex],
                selectedSize: this.state.selectedSizes[finalIndex],
                showItemRetailer: itemRetailer
            })
        } else {
            const newIndex = this.state.itemIndex - 1
            const newItem = this.state.items[newIndex]
            const itemRetailer = this.state.retailers.filter(
                retailer => retailer.id == newItem.retailer_id
            )[0]
            this.setState({
                itemIndex: newIndex,
                showItem: newItem,
                favItem: this.state.favItems[newIndex],
                selectedSize: this.state.selectedSizes[newIndex],
                showItemRetailer: itemRetailer
            })
        }
    }

    nextItem = () => {
        const finalIndex = this.state.items.length - 1
        if (this.state.itemIndex === finalIndex){
            const newItem = this.state.items[0]
            const itemRetailer = this.state.retailers.filter(
                retailer => retailer.id == newItem.retailer_id
            )[0]
            this.setState({
                itemIndex: 0,
                showItem: newItem,
                favItem: this.state.favItems[0],
                selectedSize: this.state.selectedSizes[0],
                showItemRetailer: itemRetailer
            })
        } else {
            const newIndex = this.state.itemIndex + 1
            const newItem = this.state.items[newIndex]
            const itemRetailer = this.state.retailers.filter(
                retailer => retailer.id == newItem.retailer_id
            )[0]
            this.setState({
                itemIndex: newIndex,
                showItem: newItem,
                favItem: this.state.favItems[newIndex],
                selectedSize: this.state.selectedSizes[newIndex],
                showItemRetailer: itemRetailer
            })
        }
    }

    unfavorite = () => {
        fetch(`http://localhost:3001/favorite_items/${this.state.favItem.id}`,{method: 'DELETE'})
        const newFavs = this.state.favItems.filter(favItem => favItem.id !== this.state.favItem.id)
        const newItem = this.state.items[0]
        const itemRetailer = this.state.retailers.filter(
            retailer => retailer.id == newItem.retailer_id
        )[0]
        this.setState({
            favItems: newFavs,
            itemIndex: 0,
            showItem: newItem,
            favItem: this.state.favItems[0],
            selectedSize: this.state.selectedSizes[0],
            showItemRetailer: itemRetailer
        })
    }

    render(){
        if(this.state.showItemRetailer){
            // console.log(images[this.state.showItem.name])
            return(
                <View>
                    <Header />
                    <View style={styles.row}>
                        <Button title='Previous Item' onPress={this.prevItem}/>
                        <Button title='Next Item' onPress={this.nextItem}/>
                    </View>
                    <Text style={styles.nameText}>{this.state.showItemRetailer.name}</Text>
                    <Text style={styles.nameText}>{this.state.showItem.name}</Text>
                    {/* <Image source={images[this.state.showItem.name]} style={styles.image}/> */}
                    <View style={styles.productInfo}>
                        <Text style={styles.infoText}>{this.state.showItem.price}</Text>
                        <Text style={styles.infoText}>{this.state.selectedSize}</Text>
                        <Button title='Change Size?' onPress={this.toggleSizeSelector}/>
                        {this.state.showSizeSelection && <Picker
                            selectedValue={this.state.selectedSize}
                            onValueChange={(itemValue, itemIndex) => this.selectSize(itemValue)}
                        >{this.state.showItem.sizes.split(",").map(
                            size => <Picker.Item key={size} label={size} value={size} />
                        )}</Picker>}
                        <Button title='Find a Nearby Store' onPress={() => this.props.navigation.navigate('Nearby Store', {selected: this.state.showItemRetailer})}/>
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
    favItems: {
        paddingTop: 20
    },
    image: {
        height: 200,
        width: 200
    },
    nameText: {
        padding: 20,
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 20
    },
    productInfo: {
        marginLeft: 80,
        marginRight: 80
    },
    infoText: {
        fontSize: 20,
        alignSelf: 'center'
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 30
    }
})