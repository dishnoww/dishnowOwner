import React, {useState, useEffect, memo} from 'react';
import {View, StyleSheet, Image, ImageBackground} from 'react-native';
import {Text, Button} from '../component/common';

import {useSelector, useDispatch} from 'react-redux'
import {callSet} from '../store/modules/reservationCall'
import * as Utill from '../utill'

import Toast from 'react-native-simple-toast';



        
const MainCallButton = memo((props) => {
    const {isCall, status} = useSelector(state=>state.ReservationCall.toJS());

    const dispatch = useDispatch();


    const _onPress = () => {
        if (status !== 'callSet') {
            if (isCall) {
                dispatch(callSet({isCall : 'false'}));
                // Toast.show('콜을 받지 않습니다.'); 리퀘스트 텝에서 관리
            } else {
                dispatch(callSet({isCall : 'true'}));
                // Toast.show('콜을 받습니다.');
            }
        }
    }


    
    return (
        <Button style={styles.container} onPress ={()=>_onPress()}>
            <ImageBackground style={styles.button} source={{uri:'buttoncall'}}>
                <Image style={styles.icon} source={{uri: isCall ? 'iconmediapause' : 'iconmediaplay'}}/>
                <Text style={styles.text}>{isCall ? '콜 중지' : '콜 받기'}</Text>
            </ImageBackground>
        </Button>
    )
});

export default MainCallButton;

const styles = StyleSheet.create({
    container : {
        position : 'absolute',
        top : 10 + Utill.screen.topSafe,
        right : 5,
        
    },
    button : {
        width : 103,
        height : 46,
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
    },
    icon : {
        width : 11.7,
        height : 14,
        marginBottom : 3,
    },
    text : {
        fontSize : 14,
        marginLeft : 8.5,
        marginBottom : 3,
        color : Utill.color.primary2,
    }
})