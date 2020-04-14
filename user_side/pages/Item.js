import React from 'react';
import {View, Text, Button, Image, Picker, StyleSheet, Alert} from 'react-native';
import ActiveStorageUpload from '../../dev-components/ActiveStorageUpload';

export default class Item extends React.Component{
    state = {
        items: [],
        itemIndex: 0,
        showItem: null,
        showSizeSelection: false,
        selectedSize: 'Select Size:'
    }

    componentDidMount(){
        fetch('http://localhost:3001/items')
        .then(resp => resp.json())
        .then(items => {
            const subcatItems = items.filter(item => item.subcategory_id == this.props.route.params.selected.id)
            this.setState({
                items: subcatItems,
                showItem: subcatItems[0]
            })
        })
    }

    selectSize = (size) => {
        this.setState({selectedSize: `Selected Size: ${size}`})
        this.toggleSizeSelector()
    }

    toggleSizeSelector = () => {
        this.setState(prevState => ({showSizeSelection: !prevState.showSizeSelection}))
    }

    prevItem = () => {
        const finalIndex = this.state.items.length - 1
        if (this.state.itemIndex === 0){
            this.setState({
                itemIndex: finalIndex,
                showItem: this.state.items[finalIndex]
            })
        } else {
            const newIndex = this.state.itemIndex - 1
            this.setState({
                itemIndex: newIndex,
                showItem: this.state.items[newIndex]
            })
        }
    }

    nextItem = () => {
        const finalIndex = this.state.items.length - 1
        if (this.state.itemIndex === finalIndex){
            this.setState({
                itemIndex: 0,
                showItem: this.state.items[0]
            })
        } else {
            const newIndex = this.state.itemIndex + 1
            this.setState({
                itemIndex: newIndex,
                showItem: this.state.items[newIndex]
            })
        }
    }

    favoriteItem = () => {
        let data
        if (this.state.selectedSize.split(" ")[2]) {
            data = {
                selected_size: this.state.selectedSize,
                user_id: this.props.route.params.user,
                item_id: this.state.showItem.id
            }
        } else {
            data = {
                user_id: this.props.route.params.user,
                item_id: this.state.showItem.id
            }
        }
        fetch('http://localhost:3001/favorite_items',{
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                accept: 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(Alert.alert('Item added to favorites.'))
    }

    render(){
        if(this.state.showItem){
            console.log(this.state.showItem.image_url)
            return(
                <View>
                    <View style={styles.row}>
                        <Button title='Previous Item' onPress={this.prevItem}/>
                        <Button title='Next Item' onPress={this.nextItem}/>
                    </View>
                    <Text style={styles.nameText}>{this.state.showItem.retailer.name}</Text>
                    <Text style={styles.nameText}>{this.state.showItem.name}</Text>
                    {/* {this.state.showItem.image_url && <Image source={require(this.state.showItem.image_url)} style={styles.image}/>} */}
                    <ActiveStorageUpload item={this.state.showItem}/>
                    <View style={styles.productInfo}>
                        <Text style={styles.infoText}>{this.state.showItem.price}</Text>
                        <Button title={this.state.selectedSize} onPress={this.toggleSizeSelector}/>
                        {this.state.showSizeSelection && <Picker
                            selectedValue={this.state.selectedSize}
                            onValueChange={(itemValue, itemIndex) => this.selectSize(itemValue)}
                        >{this.state.showItem.sizes.split(",").map(
                            size => <Picker.Item key={size} label={size} value={size} />
                        )}</Picker>}
                        <Button title='Favorite Item' onPress={this.favoriteItem}/>
                        <Button title='Find a Nearby Store' onPress={() => this.props.navigation.navigate('Nearby Store', {selected: this.state.showItem.retailer})}/>
                    </View>
                </View>
            )
        } else {
            return <View><Text>Loading...</Text></View>
        }
    }
}

const styles = StyleSheet.create({
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
      justifyContent: 'space-between'
    }
})