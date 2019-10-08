import React, {memo, useState, useEffect} from 'react';
import {
    Modal,
    View,
    Text,
    ImageBackground,
    FlatList,
    CameraRoll,
    TouchableOpacity,
    PermissionsAndroid,
    
    Dimensions,
    Platform,
    

} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import * as Utill from '../../utill';
import { Button } from '.';

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const pickPhoto = (onPickPhoto) => {
  ImagePicker.showImagePicker(options, (response) => {
    console.log('Response = ', response);
  
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
  
      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };
  
      // onPickPhoto(response.uri);
    }
    // onPickPhoto('');

  });
}


export default pickPhoto;