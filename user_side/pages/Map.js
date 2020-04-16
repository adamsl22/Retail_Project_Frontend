import React from 'react';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class Map extends React.Component {
    state = {
        // location: null,
        zoom: 0.01,
        errorMessage: null,
    };

    // async componentDidMount(){
    //     let { status } = await Permissions.askAsync(Permissions.LOCATION);
    //     if (status !== 'granted') {
    //     this.setState({
    //         errorMessage: 'Permission to access location was denied',
    //     });
    //     }
    //     let location = await Location.getCurrentPositionAsync({});
    // }

    zoomIn = () => {
        if (this.state.zoom > 0.005){
            this.setState(prevState => ({zoom: prevState.zoom - 0.005}))
        }
    }

    zoomOut = () => {
        if (this.state.zoom < 0.05){
            this.setState(prevState => ({zoom: prevState.zoom + 0.005}))
        }
    }
  
    render(){
        // if (this.state.location){
        return (
            <View>
                <View style={styles.zoomRow}>
                <Button color='purple' title='Zoom In' onPress={this.zoomIn}/>
                <Button color='purple' title='Zoom Out' onPress={this.zoomOut}/>
                </View>
            <MapView
                style={styles.mapStyle}
                provider='google'
                region={{latitude: this.props.location.latitude,
                longitude: this.props.location.longitude,
                latitudeDelta: this.state.zoom,
                longitudeDelta: this.state.zoom
            }}
            />
            </View>
        );
    //     } else {
    //         return <View><Text>Loading...</Text></View>
    //     }
    }
}

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get('window').width / 1.4,
    height: Dimensions.get('window').height / 4,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  zoomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width / 1.4,
    alignSelf: 'center'
  }
});