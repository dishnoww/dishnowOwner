import React from 'react';
import {Alert} from 'react-native';

const _initOptions = {
    title:'경고', 
    msg:'문제가 발생했습니다.', 
    button : [
        { text:'확인', onPress:() => console.log('Alert : ok pressed')},
        { text:'취소', onPress:() => console.log('Alert : cancel pressed')},
    ],
    cancelable : true,
}

export default (options = _initOptions)=> {
    option = {..._initOptions, ...options};
    
    return Alert.alert(
        option.title,
        option.msg,
        option.button,
        option.cancelable,
  );
}