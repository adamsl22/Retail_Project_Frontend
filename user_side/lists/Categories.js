import React from 'react';
import {View, Button, StyleSheet, Dimensions} from 'react-native';

export default class Categories extends React.Component{
    state = {
        cats: []
    };

    componentDidMount(){
        fetch('http://localhost:3001/categories')
        .then(resp => resp.json())
        .then(categories => this.setState({cats: categories}))
    };

    render(){
        return(
            <View style={styles.list}>
                {this.state.cats.map(cat => {
                    return <Button title={cat.name} key={cat.id} onPress={() => this.props.navigation.navigate(
                        'Subcategories', {selected: cat, user: this.props.route.params.user}
                    )}  />
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