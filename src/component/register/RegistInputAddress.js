
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import * as Utill from '../../utill';
import {Button, TextInput} from '../common'
import Toast from 'react-native-simple-toast';

export default (props) => {
    
    const {title, placeholder=[''], onChangeText, onPress, address} = props;

    return (
        <View style={styles.container}>
            <View >
                <Text style = {styles.inputTitleText}>{title}</Text>
            </View>

            
            <View style = {styles.inputArea}>
                <TextInput
                    style = {styles.input}
                    placeholderStyle = {styles.inputPlaceholder}
                    placeholder={placeholder[0]}
                    value={address.zipcode}
                />
                <Button style={styles.button} onPress={onPress} >
                    <Text style={styles.buttonText}>{'주소검색'}</Text>
                </Button>
            </View>
            <View style = {styles.inputArea}>
                <TextInput
                    style = {styles.input}
                    placeholderStyle = {styles.inputPlaceholder}
                    placeholder={placeholder[1]}
                    value={address.address}/>
            </View>
            <View style = {styles.inputArea}>
                <TextInput
                    style = {styles.input}
                    placeholderStyle = {styles.inputPlaceholder}
                    placeholder={placeholder[2]}
                    onChangeText={onChangeText}
                    value={address.subAddress}/>
            </View>

        </View>
    )
}



const styles = StyleSheet.create({


    container : {
        paddingVertical : 15,
    },
    title : {
        color : Utill.color.itemTitle,
    },
    inputArea : {
        flexDirection : 'row',
        alignItems : 'center',
    },
    input : {
        flex : 1,
        paddingTop : 12, 
        paddingBottom : 10,
        borderBottomColor : Utill.color.defaultColor,
        borderBottomWidth : 1,
    },
    inputTitleText : {
        
        fontSize : 14,
        flex : 1,
        color : Utill.color.itemTitle,
    },
    
    inputPlaceholder : {
        // margin : 0,
        // padding : 0,
        marginTop : 12,
        fontSize : 16,
        color : Utill.color.defaultColor,
    },  
    button : {
        borderWidth : 1,
        borderRadius : 15,
        borderColor : Utill.color.primary1,
        width : 84,
        height : 26,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center'
    },
    buttonText : {
        margin : 0,
        padding : 0,    
        includeFontPadding : false,
        fontSize : 14,
        color : Utill.color.primary1,
    },
    buttonIcon : {
        width : 9.1,
        height : 15,
        marginRight : 4.9,
    },
})