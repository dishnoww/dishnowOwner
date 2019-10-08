

import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text, TextInput} from '../../component/common'


import * as Utill from '../../utill';

export default (props) => {
    const { title, placeholder, keyboardType = 'default', onChangeText, value, validateFunc=null, errorMsg = '',secureTextEntry = false} = props;

    
    const preValid = usePrevious(isValid);
    
    const [isValid, setIsValid] = useState('empty');
    const [iconStyle, setIconStyle] = useState(styles.iconDefault);
    const [iconSrc, setIconSrc] = useState('iconxred');
    const [inputStyle, setInputStyle] = useState(styles.inputDefault);

    useEffect (()=> {
        
        if (preValid != isValid) {
            switch (isValid) {
                case 'empty' :
                    setIconStyle(styles.iconDefault);
                    setInputStyle(styles.inputDefault);
                break;
                case 'vaild' : 
                    setIconStyle(styles.iconValid);
                    setIconSrc('iconcheck');
                    setInputStyle(styles.inputValid);
                break;
                case 'invalid' : 
                    setIconStyle(styles.iconInvalid);
                    setIconSrc('iconxred');
                    setInputStyle(styles.inputInvalid);
                break;
            }
        }
    }, [isValid])

    const _onChangeText = (text) => {
        if (!text) setIsValid('empty');
        else if (validateFunc!==null) {setIsValid(validateFunc(text) ? 'vaild' : 'invalid' )}
        onChangeText(text);
    }

    const ValidIcon =(props)=> <View><Image style={iconStyle} source={{uri : iconSrc}}/></View>;

    function usePrevious (value) {
        const ref = useRef();

        useEffect(() => {
          ref.current = value;
        }, [value]);

        return ref.current;
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style = {styles.inputTitleText}>{title}</Text>
            </View>
            <View style = {inputStyle}>
                <TextInput
                    secureTextEntry = {secureTextEntry}
                    value={value}
                    keyboardType={keyboardType}
                    style={{flex:1, paddingTop : 12, paddingBottom : 10}}
                    placeholderStyle = {styles.inputPlaceholder}
                    placeholder={placeholder}
                    onChangeText={text=> _onChangeText(text)}
                />
                {isValid !== null && <ValidIcon/>}
            </View>
                {isValid === 'invalid' && <Text style={styles.validText}>{errorMsg}</Text>}
                
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
    inputValid : {
        flexDirection : 'row',
        alignItems : 'center',
        borderBottomColor : Utill.color.primary1,
        borderBottomWidth : 1,
        
    },
    inputDefault : {
        borderBottomColor : Utill.color.defaultColor,
        borderBottomWidth : 1,

    },
     inputInvalid : {
        flexDirection : 'row',
        alignItems : 'center',
        borderBottomColor : Utill.color.vaildRed,
        borderBottomWidth : 1,
    },
    iconValid : {
        width : 19.2,
        height : 14,
    },
    iconInvalid : {
        width : 15,
        height : 15,
    },
    inputPlaceholder : {
        marginTop : 12,
        fontSize : 16,
        color : Utill.color.defaultColor,
    },  
    validTextArea : {
        
    },
    validText : {
        fontSize : 12,
        lineHeight : 13,
        height : 30,
        bottom : -20, 
        position : 'absolute',
        textAlignVertical : 'bottom',
        color : Utill.color.vaildRed,
    }
})

