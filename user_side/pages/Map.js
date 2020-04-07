import React from 'react';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class Map extends React.Component {
    state = {
        location: null,
        zoom: null,
        errorMessage: null,
    };

    async componentDidMount(){
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
        this.setState({
            errorMessage: 'Permission to access location was denied',
        });
        }
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location, zoom: 0.05 });
    }

    zoomIn = () => {
        if (this.state.zoom > 0.01){
            this.setState(prevState => ({zoom: prevState.zoom - 0.01}))
        }
    }

    zoomOut = () => {
        if (this.state.zoom < 0.1){
            this.setState(prevState => ({zoom: prevState.zoom + 0.01}))
        }
    }
  
    render(){
        if (this.state.location){
        return (
            <View>
                <View style={styles.zoomRow}>
                <Button title='Zoom In' onPress={this.zoomIn}/>
                <Button title='Zoom Out' onPress={this.zoomOut}/>
                </View>
            <MapView
                style={styles.mapStyle}
                provider='google'
                region={{latitude: this.state.location.coords.latitude,
                longitude: this.state.location.coords.longitude,
                latitudeDelta: this.state.zoom,
                longitudeDelta: this.state.zoom
            }}
            />
            </View>
        );
        } else {
            return <View><Text>Enable location to use this feature.</Text></View>
        }
    }
}

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 1.29,
    alignSelf: 'flex-end'
  },
  zoomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});