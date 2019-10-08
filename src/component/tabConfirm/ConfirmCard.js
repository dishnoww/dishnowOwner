
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

import {Text, Button} from '../common';
import * as Utill from '../../utill';
import * as Time from '../../utill/time';



const ConfirmCard = (props) => {
    const [data, setData] = useState(null);
    const [isLate, setIsLate] = useState(false);

    useEffect (()=> {
        console.log(props.payload);
        const {name, createdAt, time, peopleNumber, phone,  reservationId, index}  = props.payload;
        let createTime = moment(createdAt).add(9, 'hours').format('YYYY-MM-DD HH:mm:ss');
        let expectTime = moment(time).add(9, 'hours').format('YYYY-MM-DD HH:mm:ss');
        const currentTime = moment(moment().format("YYYY-MM-DD HH:mm:ss"));

        createTime = moment(createTime);
        expectTime = moment(expectTime);

        const left = currentTime.diff(createTime, 'seconds');
        let daysAgo = moment(currentTime.format('YYYY-MM-DD')).diff(moment(createTime.format('YYYY-MM-DD')), 'days');


        createTime = createTime.format('YYYY-MM-DD HH:mm:ss');
        expectTime = expectTime.format('YYYY-MM-DD HH:mm:ss');

        const reqHour = Time.gethh(createTime);
        const reqMinute = Time.getmm(createTime);
        const expHour = Time.gethh(expectTime);
        const expMinute = Time.getmm(expectTime);
        
        setData({
            reqHour : reqHour,
            reqMinute : reqMinute, 
            expHour : expHour,
            expMinute : expMinute,
            peopleNumber,
            name,
            phone,
            reservationId,
            index,
            daysAgo
        })

        setIsLate(left > 1800);

    }, []);

    const _onPressArrive = () => {
        props.onPressArrival(data.reservationId);
    }
    const _onPressNoShow = () => {
        props.onPressNoShow(data.reservationId);
    }

    const onPressPhone =()=> {
        Utill.phone.callNumber(data.phone); // 전화앱 연결
    }

    if (data === null) return <View style={styles.container}></View>

    if(!isLate) return (
        <View style={styles.container}>

            <View style={styles.infoArea}>
                <View style={styles.nameArea}>
                    <Text style={styles.name}> {data.name} </Text>
                </View>

                <View>
                    <Text style={styles.detailRequest}> {`요청시간 : ${(data.daysAgo==0?'오늘' :(data.daysAgo==1? '어제': data.daysAgo+'일전'))} ${data.reqHour}:${data.reqMinute}`} </Text>
                    <Text style={styles.detail}> {`${data.expHour}시 ${data.expMinute}분`} </Text>
                    <Text style={styles.detail}> {` ${data.peopleNumber}명`} </Text>
                </View>

            </View>
            <View style={styles.buttonArea}>
                <Button style={styles.button} onPress={onPressPhone}>
                    <Image style={styles.icon} source={{uri : 'iconphone'}}/>
                </Button>
                <Button style={styles.button} onPress={_onPressArrive}>
                    <Text style={styles.buttonTitle}> {'도착'} </Text>
                </Button>
                <View style={styles.button2} onPress={_onPressNoShow}>
                    <Text style={styles.buttonTitle2}> {'미도착'} </Text>
                </View>
            </View>

        </View>
    );

    return (
        <View style={lateStyles.container}>

            <View style={lateStyles.infoArea}>
                <View style={lateStyles.nameArea}>
                    <Text style={lateStyles.name}> {data.name} </Text>
                </View>

                <View>
                    <Text style={styles.detailRequest}> {`요청시간 : ${(data.daysAgo==0?'오늘' :(data.daysAgo==1? '어제': data.daysAgo+'일전'))} ${data.reqHour}:${data.reqMinute}`} </Text>
                    <Text style={lateStyles.detail}> {`${data.expHour}시 ${data.expMinute}분`} </Text>
                    <Text style={lateStyles.detail}> {` ${data.peopleNumber}명`} </Text>
                </View>

            </View>
            <View style={lateStyles.buttonArea}>
                <Button style={lateStyles.button} onPress={onPressPhone}>
                    <Image style={lateStyles.icon} source={{uri : 'iconphone'}}/>
                </Button>
                <Button style={lateStyles.button} onPress={_onPressArrive}>
                    <Text style={lateStyles.buttonTitle}> {'도착'} </Text>
                </Button>
                <Button style={lateStyles.button} onPress={_onPressNoShow}>
                    <Text style={lateStyles.buttonTitle2}> {'미도착'} </Text>
                </Button>
            </View>

        </View>
    );
}

export default ConfirmCard;

const styles = StyleSheet.create({
    container : {
        height : 166,
        width : Utill.screen.screenWidth-30,
        marginVertical : 10,
        borderRadius : 15,
        borderWidth : 1,
        borderColor : Utill.color.primary1,
    },
    infoArea : {
        paddingHorizontal : 24,
        flexDirection : 'row',
    },
    nameArea : {
        flex : 1,
        justifyContent : 'center',
    },
    name : {
        fontSize : 30,
        color : Utill.color.black,
    },
    detailArea : {
        alignItems : 'stretch',
    },
    detailRequest : {
        marginVertical : 15,
        fontSize : 14,
        color : Utill.color.black,
        textAlign : 'right',
    },
    detail : {
        marginBottom : 10,
        fontSize : 20,
        color : Utill.color.black,
        textAlign : 'right',
    },
    buttonArea : {
        flexDirection : 'row',
        paddingHorizontal : 17,
    },
    icon : {
        width : 12.1,
        height : 16,
    },
    button : {
        flex : 1,
        height : 34,
        justifyContent : 'center',
        alignItems : 'center',
        borderColor : Utill.color.secondary2,
        borderWidth : 1,
        borderRadius : 17,
        marginHorizontal : 7,
        marginTop : 2,
    },
    button2 : {
        flex : 1,
        height : 34,
        justifyContent : 'center',
        alignItems : 'center',
        marginHorizontal : 7,
        marginTop : 2,
    },
    buttonTitle : {
        fontWeight : 'bold',
        fontSize : 16,
        color : Utill.color.primary1,
    },
    buttonTitle2 : {
        fontWeight : 'bold',
        fontSize : 16,
        color : Utill.color.border,
    }
});

const lateStyles = StyleSheet.create({
    container : {
        height : 166,
        width : Utill.screen.screenWidth-30,
        marginVertical : 10,
        borderRadius : 15,
        backgroundColor : Utill.color.border,
    },
    infoArea : {
        paddingHorizontal : 24,
        flexDirection : 'row',
    },
    nameArea : {
        flex : 1,
        justifyContent : 'center',
    },
    name : {
        fontSize : 30,
        color : Utill.color.black,
    },
    detailArea : {
        alignItems : 'stretch',
    },
    detailRequest : {
        marginVertical : 15,
        fontSize : 14,
        color : Utill.color.black,
        textAlign : 'right',
    },
    detail : {
        marginBottom : 10,
        fontSize : 20,
        color : Utill.color.black,
        textAlign : 'right',
    },
    buttonArea : {
        flexDirection : 'row',
        paddingHorizontal : 17,
    },
    icon : {
        width : 12.1,
        height : 16,
    },
    button : {
        flex : 1,
        height : 34,
        justifyContent : 'center',
        alignItems : 'center',
        borderColor : Utill.color.onColorBackground,
        borderWidth : 1,
        borderRadius : 17,
        marginHorizontal : 7,
        marginTop : 2,
    },
    buttonTitle : {
        fontWeight : 'bold',
        fontSize : 16,
        color : Utill.color.primary1,
    },
    buttonTitle2 : {
        fontWeight : 'bold',
        fontSize : 16,
        color : Utill.color.vaildRed,
    }
});
