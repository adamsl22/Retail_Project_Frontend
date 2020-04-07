import React, { useImperativeHandle } from 'react';
import {View, Text, Button, Image, Picker, StyleSheet} from 'react-native';
// import images from '../../assets/test_data_images/images';

export default class Item extends React.Component{
    state = {
        items: [],
        showItem: null,
        retailers: [],
        showItemRetailer: null,
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
    }

    selectSize = (size) => {
        this.setState({selectedSize: `Selected Size: ${size}`})
        this.toggleSizeSelector()
    }

    toggleSizeSelector = () => {
        this.setState(prevState => ({showSizeSelection: !prevState.showSizeSelection}))
    }

    render(){
        if(this.state.showItemRetailer){
            // console.log(images[this.state.showItem.name])
            return(
                <View>
                    <Text style={styles.nameText}>{this.state.showItemRetailer.name}</Text>
                    <Text style={styles.nameText}>{this.state.showItem.name}</Text>
                    {/* <Image source={images[this.state.showItem.name]} style={styles.image}/> */}
                    <View style={styles.productInfo}>
                        <Text style={styles.infoText}>{this.state.showItem.price}</Text>
                        <Button title={this.state.selectedSize} onPress={this.toggleSizeSelector}/>
                        {this.state.showSizeSelection && <Picker
                            selectedValue={this.state.selectedSize}
                            onValueChange={(itemValue, itemIndex) => this.selectSize(itemValue)}
                        >{this.state.showItem.sizes.split(",").map(
                            size => <Picker.Item key={size} label={size} value={size} />
                        )}</Picker>}
                        <Button title='Favorite Item'/>
                        <Button title='Find a Nearby Store'/>
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
    }
})