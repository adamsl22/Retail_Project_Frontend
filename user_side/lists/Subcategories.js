import React from 'react';
import {View, Button, StyleSheet, Dimensions} from 'react-native';

export default class Subcategories extends React.Component{
    state = {
        category: null,
        subcats: []
    };

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
                const catSubcats = subcategories.filter(subcat => subcat.category_id == this.state.category.id)
                this.setState({subcats: catSubcats})
            });
        });
    };

    render(){
        return(
            <View style={styles.list}>
                {this.state.subcats.map(subcat => {
                    return <Button color='purple' title={subcat.name} key={subcat.id} onPress={
                        () => this.props.navigation.navigate('Item', {selected: subcat, user: this.props.route.params.user})
                    }/>
                })}
            </View>
        );
    };
};

const styles = StyleSheet.create({
    list: {
        backgroundColor: 'lavender',
        height: Dimensions.get('window').height,
        padding: 10
    }
});