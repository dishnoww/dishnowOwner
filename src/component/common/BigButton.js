import React, {useState, useEffect} from 'react';
import {TouchableHighlight, StyleSheet, View} from 'react-native';
import Text from '../common/Text';
import * as Utill from '../../utill';


// TouchableHighlight 로 변경 / TouchableOpacity 로 가리기

const BigButton = (props) => {

    const {disable=false} = props;
    const [pressed, setPressed] = useState(false);
 


    const _onHide = () => {
        setPressed(true);
    }
    const _onShow = () => {
        setPressed(false);
    }
    
    return (
        <TouchableHighlight
            activeOpacity={1}
            disabled = {props.disabled}
            style = {[
                props.style,
                disable ? styles.buttonNormal : styles.buttonNormal,
            ]}
            underlayColor = {
                disable ? 
                Utill.color.onColorBackground
                : (
                    pressed ? 
                    Utill.color.secondary2
                    : Utill.color.onColorBackground
                    )
            }
            onPress = {props.onPress}
            onHideUnderlay = {_onHide}
            onShowUnderlay = {_onShow}
        >
            <Text style={styles.title}>
                {props.title}
            </Text>
        </TouchableHighlight>
    )
}
export default BigButton;

const styles = StyleSheet.create({

    buttonNormal : {
        borderRadius : 25,
        width : 260.5,
        height : 50,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : Utill.color.onColorBackground,
    },
    buttonPressed : {
        borderRadius : 25,
        width : 260.5,
        height : 50,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : Utill.color.onColorBackground,
    },
    buttonDisable : {
        borderRadius : 25,
        width : 260.5,
        height : 50,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : Utill.color.onColorBackground,
    },
    title : {
        fontSize : 18,
        color : Utill.color.primary1,
    },
    titleDisable : {
        fontSize : 18,
        color : Utill.color.defaultColor,
    }
})