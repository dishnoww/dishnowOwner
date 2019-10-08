import React, {useState, useEffect, memo} from 'react';
import {View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

import {Text, Button} from '../common';
import * as Utill from '../../utill';
import * as Time from '../../utill/time';




const WaitCard = memo((props) => {

    const {name, createdAt, time, peopleNumber, reservationId} = props.payload;
    const {currentTime} = props;
    const [data, setData] = useState({done : false});


    useEffect (()=> {
        let createTime = moment(createdAt).add(9, 'hours').format('YYYY-MM-DD HH:mm:ss');
        let expectTime = moment(time).add(9, 'hours').format('YYYY-MM-DD HH:mm:ss');
        // const currentTime = moment(moment().format("YYYY-MM-DD HH:mm:ss"));
        
        const reqHour = Time.gethh(createTime);
        const reqMinute = Time.getmm(createTime);
        const expHour = Time.gethh(expectTime);
        const expMinute = Time.getmm(expectTime);

        createTime = moment(createTime);
        let daysAgo = moment(currentTime.format('YYYY-MM-DD')).diff(moment(createTime.format('YYYY-MM-DD')), 'days');

        setData({
            done : true,
            reqHour : reqHour,
            reqMinute : reqMinute, 
            expHour : expHour,
            expMinute : expMinute,
            peopleNumber,
            name,
            reservationId,
            daysAgo
        })


    }, []);
    if (!data.done) return (
        <LinearGradient
            start={{x:1,y:0}}
            end  ={{x:0,y:0}}
            colors={[Utill.color.primary1, Utill.color.primary2]} 
            style={styles.container}/>

    )
    return (
        <LinearGradient
            start={{x:1,y:0}}
            end  ={{x:0,y:0}}
            colors={[Utill.color.primary1, Utill.color.primary2]} 
            style={styles.container}>

        <View style={styles.nameArea}>
            <Text style={styles.name}> {name} </Text>
        </View>

        <View>
            <Text style={styles.detailRequest}> {`요청시간 : ${(data.daysAgo==0?'오늘' :(data.daysAgo==1? '어제': data.daysAgo+'일전'))} ${data.reqHour}:${data.reqMinute}`} </Text>
            <Text style={styles.detail}> {`${data.expHour}시 ${data.expMinute}분`} </Text>
            <Text style={styles.detail}> {` ${data.peopleNumber}명`} </Text>
            
        </View>

        </LinearGradient>
    )
});

export default WaitCard;

const styles = StyleSheet.create({
    container : {
        height : 120,
        width : Utill.screen.screenWidth-30,
        paddingHorizontal : 24,
        marginVertical : 10,
        flexDirection : 'row',
        borderRadius : 15,
    },
    nameArea : {
        flex : 1,
        justifyContent : 'center',
    },
    name : {
        fontSize : 30,
        color : Utill.color.onColorBackground,
    },
    detailArea : {
        alignItems : 'stretch',
    },
    detailRequest : {
        marginVertical : 15,
        fontSize : 14,
        color : Utill.color.onColorBackground,
        textAlign : 'right',
    },
    detail : {
        marginBottom : 10,
        fontSize : 20,
        color : Utill.color.onColorBackground,
        textAlign : 'right',
    },
});
