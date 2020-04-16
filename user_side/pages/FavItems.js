import React from 'react';
import {View, Text, Button, Image, Picker, StyleSheet, Alert, Dimensions} from 'react-native';
// import images from '../../assets/test_data_images/images';
import Header from '../../drawer_nav_indicator/Header';

export default class FavItems extends React.Component{
    state = {
        favItemIndex: 0,
        favItems: [],
        favItem: null,
        showSizeSelection: false,
        selectedSize: null
    }

    componentDidMount(){
        console.log(this.props.route.params)
        fetch('http://localhost:3001/favorite_items')
        .then(resp => resp.json())
        .then(favItems => {
            const userFavItems = favItems.filter(item => item.user_id == this.props.route.params.user.id)
            this.setState({
                favItems: userFavItems,
                favItem: userFavItems[0]
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
        .then(this.toggleSizeSelector())
    }

    toggleSizeSelector = () => {
        this.setState(prevState => ({showSizeSelection: !prevState.showSizeSelection}))
    }

    prevItem = () => {
        const finalIndex = this.state.favItems.length - 1
        if (this.state.favItemIndex === 0){
            this.setState({
                favItemIndex: finalIndex,
                favItem: this.state.favItems[finalIndex]
            })
        } else {
            const newIndex = this.state.favItemIndex - 1
            this.setState({
                favItemIndex: newIndex,
                favItem: this.state.favItems[newIndex]
            })
        }
    }

    nextItem = () => {
        const finalIndex = this.state.favItems.length - 1
        if (this.state.itemIndex === finalIndex){
            this.setState({
                itemIndex: 0,
                favItem: this.state.favItems[0]
            })
        } else {
            const newIndex = this.state.favItemIndex + 1
            this.setState({
                itemIndex: newIndex,
                favItem: this.state.favItems[newIndex]
            })
        }
    }

    unfavorite = () => {
        fetch(`http://localhost:3001/favorite_items/${this.state.favItem.id}`,{method: 'DELETE'})
        const newFavs = this.state.favItems.filter(favItem => favItem.id !== this.state.favItem.id)
        this.setState({
            favItemIndex: 0,
            favItems: newFavs,
            favItem: this.state.favItems[0]
        })
    }

    render(){
        if(this.state.favItem){
            return(
                <View style={styles.itemPage}>
                    <Header />
                    <View style={styles.row}>
                        <Button color='purple' title='Previous Item' onPress={this.prevItem}/>
                        <Button color='purple' color='purple' title='Next Item' onPress={this.nextItem}/>
                    </View>
                    <Text style={styles.nameText}>{this.state.favItem.item.retailer.name}</Text>
                    <Text style={styles.nameText}>{this.state.favItem.item.name}</Text>
                    <View style={styles.imageArea}>
                        {this.state.favItem.item.image_url && <Image source={{uri: this.state.favItem.item.image_url}} style={styles.image}/>}
                    </View>
                    <View style={styles.productInfo}>
                        <Text style={styles.infoText}>{this.state.favItem.item.price}</Text>
                        <Text style={styles.infoText}>{this.state.favItem.selected_size}</Text>
                        <Button color='purple' title='Change Size?' onPress={this.toggleSizeSelector}/>
                        {this.state.showSizeSelection && <Picker
                            selectedValue={this.state.selectedSize}
                            onValueChange={(itemValue, itemIndex) => this.selectSize(itemValue)}
                        >{this.state.favItem.item.sizes.split(",").map(
                            size => <Picker.Item key={size} label={size} value={size} />
                        )}</Picker>}
                        <Button color='purple' title='Find a Nearby Store' onPress={() => this.props.navigation.navigate('Nearby Store', {selected: this.state.favItem.item.retailer})}/>
                        <Button color='purple' title='Remove from Favorites' onPress={this.unfavorite}/>
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
    },
    imageArea: {
        alignSelf: 'center',
        padding: 30
    },
    itemPage: {
        backgroundColor: 'lavender',
        height: Dimensions.get('window').height
    }
})