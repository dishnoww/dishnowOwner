import React, {useState, useEffect} from 'react';
import {TouchableHighlight, StyleSheet, View} from 'react-native';
import Text from '../common/Text';
import * as Utill from '../../utill';


const SmallButton = (props) => {

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
            underlayColor = {Utill.color.secondary1}
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
export default SmallButton;

const styles = StyleSheet.create({


    button : {
        borderWidth : 1,
        borderRadius : 25,
        height : 26,
        paddingHorizontal : 12.5,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : Utill.color.onColorBackground,
        borderColor : Utill.color.primary1,
        marginLeft : 8.3,
        
    },
    title : {
        margin : 0,
        padding : 0,    
        includeFontPadding : false,
        fontSize : 14,
    },

})