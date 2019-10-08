
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import * as Utill from '../../utill';
import Button from '../common/Button'
import Toast from 'react-native-simple-toast';


export default (props) => {
    const {title, text } = props;

    const getFileName =(url='')=> {
        const arr = url.split('/');
        return arr[arr.length-1];
    }

    return <View style={styles.container}>
        <View >
            <Text style = {styles.inputTitleText}>{title}</Text>
        </View>

        <View style = {styles.inputArea}>
            {text==='' && <Text style={styles.uri}>{'사본 파일을 등록하세요.'}</Text>}
            {text!=='' && <Text style={styles.uri}>{getFileName(text)}</Text>}

            <Button style={styles.button} onPress={props.onPress}>
                <View style={{flexDirection :'row'}}>
                <Image style ={styles.buttonIcon} source={{uri : 'iconpaperclip'}}/>
                <Text style={styles.buttonText}>{'파일추가'}</Text>
                </View>
            </Button>
        </View>
    </View>
}

const styles = StyleSheet.create({


    container : {
        paddingVertical : 15,
    },
    title : {
        color : Utill.color.itemTitle,
    },
    inputTitleText : {
        margin : 0,
        padding : 0,
        fontSize : 14,
        color : Utill.color.itemTitle,
    },
    inputArea : {
        flex : 1,
        flexDirection : 'row',
        alignItems : 'center',
    },
    uri : {
        flex : 1,
    },
    inputPlaceholder : {
        margin : 0,
        padding : 0,
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
    }
})