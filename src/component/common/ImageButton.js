import React from 'react';
import { TouchableOpacity, Image } from 'react-native';


const ImageButton = (props) => {
    return (
        <TouchableOpacity 
            onPress = {props.onPress}
            background = {props.background}
            hitSlop = {props.hitSlop ? props.hitSlop : {top : 7, bottom : 7, right : 7, left : 7}}
        >
            <Image
                style={props.style} source={props.source} resizeMode={props.resizeMode}
            />
        </TouchableOpacity>
    );
}

export default ImageButton;