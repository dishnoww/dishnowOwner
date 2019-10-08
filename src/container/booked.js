import React, {memo, useEffect, useState} from 'react';
import {View, StyleSheet, Image, ImageBackground, ActivityIndicator} from 'react-native';
import moment from 'moment';

import {useSelector, useDispatch} from 'react-redux';
import {bookedPull} from '../store/modules/reservationBooked';
import {confirmPush, } from '../store/modules/reservationConfirm';
import {acceptConfirm, } from '../store/modules/reservationAccept';

import {Text, BigButtonBorder} from '../component/common';

import * as Utill from '../utill';

const Booked = memo((props) => {
    const bookedList = useSelector(state => state.ReservationBooked.toJS());
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const [left, setLeft] = useState(); // 화면에 표시될 도착 예정 시간 (left 분후)


    useEffect(()=> {
        if (bookedList.length > 0) {
            // console.log(bookedList[0]);
            let eaTime = moment(bookedList[0].time).add(9, 'hours').format('YYYY-MM-DD HH:mm:ss');
            const currentTime = moment(moment().format("YYYY-MM-DD HH:mm:ss"));
        
            eaTime = moment(eaTime);
            
            setLeft(Math.floor(((eaTime - currentTime)*0.001)/60));
            setIsLoaded(true);
        }
    },[bookedList])
    

    const _onPress = () => {
        if(bookedList.length == 0) props.navigation.goBack();
        else if (isLoaded) {
            // console.log('blist data  ' + JSON.stringify(bookedList));
            dispatch(acceptConfirm(bookedList[0].reservationId));
            dispatch(bookedPull());
            dispatch(confirmPush(bookedList[0]));
            setIsLoaded(false);
            if(bookedList.length <= 1) props.navigation.goBack();
        }
    }

    return (
        <View style={styles.container}>
            
            <View style={styles.titleArea}>
                <Image style={styles.logo} resizeMode={'contain'} source={{uri : 'dishnowsymbolpurple'}} />
                <Text style={styles.title}>{'예약 완료'}</Text>
            </View>

            <Text style={styles.subTitle}>{'손님 맞을 준비를 해볼까요?'}</Text>

            
            <View style={{flex:1, justifyContent:'center'}}>
                {!isLoaded && <ActivityIndicator size="large" color="#0000ff" />}
                {isLoaded && 
                    <ImageBackground
                        style={styles.infoContainer}
                        source={{uri:'bookedinfocard'}}
                    >
                        <View style={styles.nameArea}>
                            <Text style={styles.name}>{bookedList[0].name}</Text>
                        </View>

                        <View style={{flex:1, justifyContent : 'center'}}>
                            <View style={styles.infoArea}>

                                <View style={styles.infoLine}>
                                    <Text style={styles.infoTitle}>{'인원'}</Text>
                                    <Text style={styles.infoData}>{`${bookedList[0].peopleNumber}`}</Text>
                                </View>

                                <View style={[styles.infoLine, {marginTop:17}]}>
                                    <Text style={styles.infoTitle}>{'도착 예정 시간'}</Text>
                                    <Text style={styles.infoData}>{`${left>0? left : -left} 분 ${left>0? '후' : '전'}`}</Text>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                }
            </View>
            
            <BigButtonBorder title={'확인'} onPress={_onPress} disabled={!isLoaded}/>
        </View>
    )
});

export default Booked;

const styles = StyleSheet.create({
    container : {
        paddingTop : Utill.screen.statusbarHeight,
        flex : 1,
        alignItems : 'center',
        paddingBottom : 45,
    },
    titleArea : {
        flexDirection : 'row',
        marginTop : 65,
    },
    logo : {
        width : 45,
        height : 45,
    },
    title : {
        marginLeft : 18,
        fontSize : 42,
        color : Utill.color.primary1,
    },
    subTitle : {
        marginTop : 49,
        fontSize : 16,
        color : Utill.color.itemTitle,
    },
    infoContainer : {
        width : 280,
        height : 178,
        paddingHorizontal : 34,
        paddingVertical : 9,
        alignItems : 'center',
    },
    nameArea : {
        alignItems : 'center',
        justifyContent : 'center',
        width : 194,
        borderBottomWidth : 1,
        borderBottomColor : Utill.color.border,
        paddingVertical : 20
    },
    name : {
        fontSize : 18,
        fontWeight : 'bold',
        color : Utill.color.textBlack,
    },
    infoArea : {
        marginVertical : 20,
    },
    infoLine : {
        flexDirection : 'row',
    },
    infoTitle : {
        fontSize : 14,
        color : Utill.color.textBlack,
    },
    infoData : {
        marginLeft : 15,
        fontSize : 14,
        fontWeight : 'bold',
        color : Utill.color.textBlack,
    },

    
})