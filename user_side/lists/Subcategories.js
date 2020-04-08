import React from 'react';
import {View, Button} from 'react-native';

export default class Subcategories extends React.Component{
    state = {
        category: null,
        subcats: []
    }

    componentDidMount(){
        fetch('http://localhost:3001/categories')
        .then(resp => resp.json())
        .then(categories => {
            this.setState({category: categories.filter(
                cat => cat.name === this.props.route.params.selected.name
            )[0]})
            fetch('http://localhost:3001/subcategories')
            .then(resp => resp.json())
            .then(subcategories => {
                catSubcats = subcategories.filter(subcat => subcat.category_id == this.state.category.id)
                this.setState({subcats: catSubcats})
            })
        })
    }

    render(){
        return(
            <View>
                {this.state.subcats.map(subcat => {
                    return <Button title={subcat.name} key={subcat.id} onPress={() => this.props.navigation.navigate('Item', {selected: subcat})}  />
                })}
            </View>
        )
    }
}