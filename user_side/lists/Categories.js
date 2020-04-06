import React from 'react';
import {View, Button} from 'react-native';

export default class Categories extends React.Component{
    state = {
        cats: []
    }

    componentDidMount(){
        fetch('localhost:3001/categories')
        .then(resp => resp.json())
        .then(categories => this.setState({cats: categories}))
    }

    render(){
        return(
            <View>
                {this.state.cats.map(cat => {
                    return <Button title={cat.name} onPress={() => this.props.navigation.navigate(
                        'SubcategoryNav', {screen: 'Subcategories', params: {selected: cat}}
                    )}  />
                })}
            </View>
        )
    }
}