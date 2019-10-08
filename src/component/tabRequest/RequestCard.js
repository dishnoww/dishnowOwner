import React ,{useState, useEffect, memo} from 'react';
import {View, StyleSheet, ImageBackground, Image} from 'react-native';
import {Text, Button} from '../common';
import LinearGradient from 'react-native-linear-gradient';

import * as Time from '../../utill/time'


import * as Utill from '../../utill';
const {color} = Utill;

const ReservationCard = ({c, time, timerCount, count, onPressNo, onPressYes}) => {


   const [hour, setHour] = useState('00');
   const [minute, setMinute] = useState('00');

    useEffect(()=> {
        setHour(Time.gethh(time));
        setMinute(Time.getmm(time));
    }, [time])

    // useEffect(()=> {
    //     console.log('item changed');
    //     console.log(c);
    //     console.log(hour);
    //     console.log(minute);
    // }, [c])
    return (
        <LinearGradient
        start={{x:0,y:0}}
        end  ={{x:0,y:1}}
        colors={[color.primary1, color.primary2]} 
        style={{flex:1, alignSelf : 'stretch'}}>
            <ImageBackground 
            source ={{uri : 'dishnowsymbolbackground'}}
            style={styles.container}>
                
                <View style={styles.titleArea}> 
                    <View style={{flex:1, flexDirection : 'row', justifyContent : 'center', alignItems : 'center', borderBottomColor : color.onColorBackground, borderBottomWidth : 1, paddingBottom:11.9}}>
                        <Image style={styles.logo} source={{uri : 'dishnowsymbolwhite'}}/>
                            <Text style={styles.title}>
                                {'예약 요청이 왔습니다.'}
                            </Text>
                        
                    </View>

                </View>
                    <Text style={styles.counter}>
                        {`${timerCount}초 후에 자동 거절됩니다.`}
                    </Text>
                <View style={styles.infoArea} >
                    <Text style={styles.infoTitle}>
                        {'도착 예정 시간'}
                    </Text> 
                    <Text style={styles.info}>
                        {`${hour} 시  ${minute} 분`}
                    </Text> 

                    <Text style={[styles.infoTitle, {marginTop : 30}]}>
                        {'인원'}
                    </Text> 
                    <Text style={styles.info}>
                        {`${count} 명 `}
                    </Text> 



                </View>
                <View style={styles.buttonArea}>
                    <Button style={styles.button1} onPress={onPressNo}>
                        <Text style={styles.buttonText1}>{`거절`}</Text>
                    </Button>
                    <Button style={styles.button2} onPress={onPressYes}>
                        <Text style={styles.buttonText2}>{`수락`}</Text>
                    </Button>
                </View>
                


            </ImageBackground>
        </LinearGradient>
    )
    
}

export default ReservationCard;

const styles = StyleSheet.create({
    container : {
        flex : 1,
        paddingHorizontal : 15.5,
        alignItems : 'center',
    },
    titleArea : {
        marginTop : 77.4,
        flexDirection : 'row',
        
    },
    title : {
        fontSize : 18,
        fontWeight : 'bold',
        marginLeft : 8,
        color : color.onColorBackground,
    },
    counter : {
        marginTop : 12.6,
        fontSize : 12,
        color : color.onColorBackground,
    },
    logo : {
        width : 20,
        height : 20,
    },
    counter : {
        fontSize : 12,
        marginTop : 12.6,
        color : color.onColorBackground,
    },
    infoArea : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
    },
    info : {
        fontSize : 36,
        color : color.onColorBackground,
    },
    infoTitle : {
        fontSize : 16,
        color : color.onColorBackground,
        marginBottom : 10,
    },
    buttonArea : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        paddingBottom : 45,
    },
    button1 : {
        width : 150,
        height : 70,
        borderWidth : 1,
        borderColor : color.onColorBackground,
        borderRadius : 35,
        justifyContent : 'center',
        alignItems : 'center',
        marginRight : 15,
    },
    button2 : {
        width : 150,
        height : 70,
        backgroundColor : color.onColorBackground,
        borderRadius : 35,
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        marginLeft : 15,
    },
    buttonText1 : {
        fontSize : 24,
        fontWeight : 'bold',
        color : color.onColorBackground,
    },
    buttonText2 : {
        fontSize : 24,
        fontWeight : 'bold',
        color : color.primary2,
    },
    



})