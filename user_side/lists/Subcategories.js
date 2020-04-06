import React from 'react';
import {View, Button} from 'react-native';

export default class Subcategories extends React.Component{
    state = {
        subcats: []
    }

    componentDidMount(){
        fetch('localhost:3001/subcategories')
        .then(resp => resp.json())
        .then(subcategories => {
            catSubcats = subcategories.filter(subcat => subcat.category_id == this.props.route.params.selected.id)
            this.setState({subcats: catSubcats})
        })
    }

    render(){
        return(
            <View>
                {this.state.subcats.map(subcat => {
                    return <Button title={subcat.name} onPress={() => this.props.navigation.navigate('Item', {selected: subcat})}  />
                })}
            </View>
        )
    }
}