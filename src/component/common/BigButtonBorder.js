import React, {useState, useEffect} from 'react';
import {TouchableHighlight, StyleSheet, View} from 'react-native';
import Text from '../common/Text';
import * as Utill from '../../utill';


const BigButton = (props) => {

    const {onPress, disabled=false} = props;
    const [pressed, setPressed] = useState(false);
 


    const _onHide = () => {
        setPressed(true);
    }
    const _onShow = () => {
        setPressed(false);
    }
    
    if (disabled)  
        return (
            <View style = {[styles.button, {borderColor : Utill.color.defaultColor}]} >
                <Text style={[styles.title, {color : Utill.color.defaultColor}]}>
                    {props.title}
                </Text>
            </View>
        )
    return (
        <TouchableHighlight
            activeOpacity={1}
            style = {styles.button}
            underlayColor = {Utill.color.secondary2}
            onPress = {onPress}
            onHideUnderlay = {_onHide}
            onShowUnderlay = {_onShow}
        >
            <Text style={[styles.title, {color : Utill.color.primary1}]}>
                {props.title}
            </Text>
        </TouchableHighlight>
    )
}
export default BigButton;

const styles = StyleSheet.create({

    button : {
        borderRadius : 25,
        width : 260.5,
        height : 50,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : Utill.color.onColorBackground,
        borderWidth : 1,
        borderColor : Utill.color.primary1,

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