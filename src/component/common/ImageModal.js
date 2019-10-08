import React , {useEffect, useState}from 'react';
import {View, Modal, StyleSheet } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import * as Utill from '../../utill';
import Button from './Button';
import Text from './Text';


 
const ImageModal = (props) => {
    const { index, urls, visible, onDismiss} = props;
    const [images, setImages] = useState([]);
    const [imageLoaded, setImageLoaded] = useState(false);


    useEffect(()=> {
        let newImage = [];
        for(let i=0; i<urls.length; i++) {
            newImage.push({url : urls[i]});
        }
        setImages(newImage);
    }, [urls])

    useEffect(()=> {
        if (images.length > 0) setImageLoaded(true);
    }, [images])

    const _onDismiss =()=> {
        setImageLoaded(false);
        setImages([]);
        onDismiss();
    }

    return (
        <Modal
            style
            visible = {visible}
            onRequestClose = {_onDismiss}
            onDismiss = {onDismiss}
            transparent={false}
        >
            <View style={styles.container}>
            
            {!!images.length && 
            <ImageViewer 
                imageUrls={images}
                index = {index}
                saveToLocalByLongPress={false}
            />}
            </View>
            <Button 
                style={styles.button}
                onPress={_onDismiss}> 
                <Text style={styles.buttonText}>{`뒤로`}</Text>
            </Button>
        </Modal>
    )

}

export default ImageModal;


const styles = StyleSheet.create({
    container : {
        paddingTop : Utill.screen.topSafe,
        width : Utill.screen.screenWidth,
        height : Utill.screen.screenHeight,
        backgroundColor : Utill.color.black,
    },
    button : {
        position : 'absolute',
        right : 0, 
        top :  Utill.screen.topSafe,
        paddingVertical : 20,
        paddingHorizontal : 25,
    },
    buttonText : {
        fontSize : 16,
        color : Utill.color.onColorBackground,
    }

})