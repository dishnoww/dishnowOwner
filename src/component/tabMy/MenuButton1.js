import React, {Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';

import * as Utill from '../../utill'
import {Button, Text} from '../common';


const MenuButton = (props) => {
    const {title, source, style, buttonText} = props;

    return (
        <View style={[style, styles.container]}>
            <View style = {styles.iconArea}>
                <Image
                    resizeMode={'contain'}
                    style = {styles.icon}
                    source={source}
                />
            </View>

            <View style={{flexDirection : 'row', flex : 1,}}>
                <Text style = {styles.text}>
                    {title}
                </Text>
            </View>

            <Button  style={styles.button} onPress={props.onPress}>
                <Text style={styles.buttonText}>
                    {buttonText}
                </Text>
            </Button>

        </View>
    )

}

export default MenuButton; 

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        alignItems : 'center',
    },
    iconArea : {

    },
    icon : {
        width : 16,
        height : 17,
        margin : 15,
        
    },
    text : {
        fontSize : 16,
        color : Utill.color.textBlack,
    },
    button : {
        flexDirection : 'row',
        alignItems : 'center',
        padding : 15,
    },
    buttonText: {
        color : Utill.color.primary1,
        fontSize : 14,
    }
})