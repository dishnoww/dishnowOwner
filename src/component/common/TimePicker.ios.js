import React, {useState, useEffect} from 'react';
import {View, Picker, Modal, StyleSheet} from 'react-native';


import {Text, Button} from './index';
import * as Utill from '../../utill';




const MAX_HOURS = 24;

const TimePicker  = (props) => {
    const {visible, onRequestClose, onPickTime, prevTime} = props;

    const [time, setTime] = useState(prevTime);
    useEffect(()=>setTime(prevTime), [prevTime]);

    const _getItems = (MAX_RANGE) => {
        const items = [];
        for (let i = 0; i <= MAX_RANGE; i++) 
            items.push(<Picker.Item key={i} value={i} label={i<10?`0${i}`:`${i}`} />);
        return items;
    }

    const _handleChangeHours = (itemValue) => {
        const { onChange } = props;
        let newTime = {hour:itemValue, minute : time.minute};
        setTime(newTime);
        // onChange(newTime);
    }

    const _handleChangeMinutes = (itemValue) => {
        const { onChange } = props;
        let newTime = {hour: time.hour, minute : itemValue};
        setTime(newTime);
        // onChange(newTime);
    }

    const _onPickTime = () => {
        let _h = time.hour<10 ? `0${time.hour}` : `${time.hour}`;
        let _m = time.minute<10 ? `0${time.minute}` : `${time.minute}`;

        onPickTime(`${_h}:${_m}:00`);
        // console.log(time);
        _cancel();
    }


    const _cancel = () => {
        onRequestClose();
    }


    return (
        <Modal 
            visible = {visible}
            onRequestClose = {()=>onRequestClose()}
            onDismiss = {()=>onRequestClose()}
            animationType = {'fade'}
            animated = {true}
            transparent={true}
        >
            <View style={styles.container}>
            <View style={styles.card}>
                <View style = {{marginBottom : 20}}>
                    <Text>{`시간을 선택해 주세요.`}</Text>
                </View>
            
                <View style={styles.pickerArea}>
                    <Picker
                        style={styles.picker}
                        itemStyle={styles.text}
                        selectedValue={time.hour}
                        onValueChange={(itemValue) => _handleChangeHours(itemValue)}
                    >
                        {_getItems(24)}
                    </Picker>
                    <Text style={[styles.text, {flex : 0.25}]}>{` 시 `}</Text>
                    <Picker
                        style={styles.picker}
                        itemStyle={styles.text}
                        selectedValue={time.minute}
                        onValueChange={(itemValue) => _handleChangeMinutes(itemValue)}
                    >
                        {_getItems(59)}
                    </Picker>
                    <Text style={[styles.text, {flex : 0.25}]}>{` 분 `}</Text>
                    
                </View>
                <View style={styles.buttonArea}>
                    <Button
                        style = {styles.confirmButton}
                        onPress={_onPickTime}>
                        <Text style={styles.text}>{`취소`}</Text>
                    </Button>
                    <Button
                        style = {styles.confirmButton}
                        onPress={_onPickTime}>
                        <Text style={[styles.text, {color : Utill.color.primary1}]}>{`선택`}</Text>
                    </Button>
                </View>
            </View>
            </View>

        </Modal>
    )

}

export default TimePicker;

const styles = StyleSheet.create({
    container : {
        width : Utill.screen.screenWidth,
        height : Utill.screen.screenHeight,
        justifyContent : 'center',

        backgroundColor : '#00000055'
    } ,
    card : {
        padding : 25,
        paddingBottom : 18,
        width : Utill.screen.screenWidth - 50,
        marginHorizontal : 25,
        borderRadius : 12,

        backgroundColor : '#FFFFFF'
    },
    pickerArea : {
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
    },
    picker : {
        flex : 1,
        justifyContent : 'center',
        // height : 40,
        // width : 62,
    },
    slotContainer : {
        paddingVertical : 7,
    },
    slotItem : {
        height : 26,
        width : 62,
    },
    text : {
        fontSize : 18, 
        textAlign : 'center',
        color : Utill.color.textBlack,
    },
    
    buttonArea : {
        flexDirection : 'row',
        marginTop : 25,
        justifyContent : 'space-around',
        alignItems : 'center',
        alignSelf : 'stretch',
    },
    confirmButton : {
        paddingHorizontal : 22,
        paddingVertical : 10,
    }

})