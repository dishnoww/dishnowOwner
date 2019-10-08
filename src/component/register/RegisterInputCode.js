
import React ,{useState, useEffect, useRef}from 'react';
import {View, StyleSheet, Image} from 'react-native';

import * as Utill from '../../utill';
import {SmallButton, Text, TextInput} from '../common'
import Toast from 'react-native-simple-toast';

export default (props) => {
    const {title, time, placeholder, value, onChangeText, onPress, isValid} = props;



    const [iconStyle, setIconStyle] = useState(styles.iconDefault);
    const [iconSrc, setIconSrc] = useState('iconxred');
    const [inputStyle, setInputStyle] = useState(styles.inputDefault);
    
    const [verifyable, setVerifyable] = useState(false);

    useEffect(()=> {
        
    },[verifyable])
    
    useEffect (()=> {
        
        if (isValid === null ) {
            setIconStyle(styles.iconDefault);
            setInputStyle(styles.inputDefault);
        }

        if (isValid === true) {
            setIconStyle(styles.iconValid);
            setIconSrc('iconcheck');
            setInputStyle(styles.inputValid);
        }
        
        if (isValid === false) {
            setIconStyle(styles.iconInvalid);
            setIconSrc('iconxred');
            setInputStyle(styles.inputInvalid);
        } 
        
    }, [isValid])



    

    const _onChangeText = (text) => {
        setVerifyable(/^\d{5}$/.test(text));
        onChangeText(text);
    }
    const _onPress = () => {
        onPress();
    }

    
    const ValidIcon =(props)=> <View><Image style={iconStyle} source={{uri : iconSrc}}/></View>;

    const getm = (time) => {
        if (time>0) return Math.floor(time/60);
        return '0';
    }
    const gets = (time) => {
        const s = time%60;
        return s < 10 ? '0'+s : s;
    }

    return (
        <View style={styles.container}>
            <View >
                <Text style = {styles.inputTitleText}>{title}</Text>
            </View>

            <View style = {{flex : 1, flexDirection : 'row', alignItems : 'center'}}>

                <View style = {[inputStyle, {flexDirection : 'row', alignItems : 'center', flex : 1, borderBottomWidth : 1,}]}>
                    <TextInput 
                        value ={value}
                        keyboardType={'number-pad'}
                        style={styles.inputText}
                        placeholder={placeholder}
                        onChangeText={_onChangeText}
                    />
                    {isValid !== null && <ValidIcon/ >}
                </View>
                
                <SmallButton disabled={!verifyable} title={'인증'} onPress={_onPress}/>
                
            </View>
            {time > 0 && <Text style={styles.validText}>{`${getm(time)}:${gets(time)}`}</Text>}
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
        flex : 1,
        flexDirection : 'row',
        alignItems : 'center',
    },
    inputTitleText : {
        fontSize : 14,
        color : Utill.color.itemTitle,
    },
    inputText : {
        flex : 1,
        margin : 0, 
        padding : 0,
    },
    inputValid : {
        borderBottomColor : Utill.color.primary1,
    },
    inputDefault : {
        flex : 1,
        borderBottomColor : Utill.color.defaultColor,

    },
     inputInvalid : {
        borderBottomColor : Utill.color.vaildRed,
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
        position : 'absolute',
        textAlignVertical : 'bottom',
        bottom : -20, 
        color : Utill.color.primary1,
    }
})