
import React ,{useState}from 'react';
import {View, StyleSheet, Image} from 'react-native';

import * as Utill from '../../utill';
import {SmallButton, Text, TextInput} from '../common'
import Toast from 'react-native-simple-toast';


export default (props) => {
    const {title, placeholder, value, onChangeText, onPress, } = props;


    const [isValid, setIsValid] = useState(false);





    const _onChangeText = (text) => {
        const res = /^\d{11}$/.test(text);

        setIsValid(res);
        onChangeText(text);
    }

    return (
        <View style={styles.container}>
            <View >
                <Text style = {styles.inputTitleText}>{title}</Text>
            </View>

            <View style = {styles.inputArea}>

                <TextInput 
                    value ={value}
                    keyboardType={'number-pad'}
                    style={styles.input}
                    placeholder={placeholder}
                    onChangeText={(text)=>_onChangeText(text)}
                />

                <SmallButton disabled={!isValid} title={'인증번호 전송'} onPress={onPress}/>

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
    inputTitleText : {
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
    input : {
        flex : 1,
        borderBottomColor : Utill.color.defaultColor,
        borderBottomWidth : 1,
    },
    inputPlaceholder : {
        margin : 0,
        padding : 0,
        marginTop : 12,
        fontSize : 16,
        color : Utill.color.defaultColor,
    },
    validText : {
        fontSize : 12,
        lineHeight : 13,
        height : 30,
        position : 'absolute',
        textAlignVertical : 'bottom',
        bottom : -3,
        color : Utill.color.primary1,
    }
})