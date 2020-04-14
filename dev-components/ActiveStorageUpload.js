import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import {View, Button, Image} from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export default class ActiveStorageUpload extends React.Component{
    state = {
        image: null
    };

    componentDidMount() {
        this.getPermissionAsync();
    };

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            };
        };
    };

    pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
            });
            if (!result.cancelled) {
                this.setState({ image: result.uri });
            };
            console.log(result);
        } catch (E) {
            console.log(E);
        };
    };

    saveImage = () => {
        let formData = new FormData()
        formData.append('image', {
            uri: this.state.image,
            name: `${this.props.item.name}.PNG`,
            type: 'image/PNG'
        })
        console.log(formData)
        fetch(`http://localhost:3001/items/${this.props.item.id}`,{
            method: 'PATCH',
            // headers: {
            //     'content-type':'multipart/form-data',
            //     accept:'application/json'
            // },
            body: formData
        })
    }

    render() {
        let { image } = this.state;
        return (
            <View>
                <Button title="Pick an image from camera roll" onPress={this.pickImage} />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                {this.state.image && <Button title="Save" onPress={this.saveImage} />}
            </View>
        );
    };
}