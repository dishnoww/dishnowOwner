import React from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';

import {Button, TextInput} from '../../common';
import * as Utill from '../../../utill'


const OpeningHourList = ({times, onPress ,onPickOpenTime, onPickCloseTime, onPressCheckBox}) => {

    // console.log(typeof times);
    return times.map(
        (item, i)=> {

            // console.log('items');

            //  console.log(item);

            return (
                <View style={styles.rowBlock} key={`oh-${i}`}>
                    <View>
                        <Text style={styles.text}>{item.day}</Text>
                    </View>

                    <Times 
                        item={item} 
                        onPress={(isOpen, time)=>onPress(i, isOpen, time)}
                    />

                    <View style={styles.checkBox}>
                        <Text style={[item.isHoliday?styles.text:styles.textHoliday, {marginRight : 5}]}>{'휴무'}</Text>
                        <Switch 
                            thumbColor={Utill.color.onColorBackground}
                            trackColor={{false: Utill.color.defaultColor, true: Utill.color.primary1}}
                            ios_backgroundColor={{false: Utill.color.defaultColor, true: Utill.color.primary1}}
                            onValueChange={()=>onPressCheckBox(i)} 
                            value={!item.isHoliday}/>
                     </View>
                    
                </View>

            )
        }
    )
}


export default OpeningHourList;



const Times = ({item, onPickCloseTime, onPickOpenTime, onPress}) => {
    const _mTomm = (time) => {
        return time === 0 ? '00': (time<10 ? '0'+time : time)
    }
    

    if (!item.isHoliday) return (
        <View style={{flexDirection:'row'}}>
            <Button onPress={()=>onPress(true, {hour : item.open.substring(0,2)*1, minute : item.open.substring(3,5)*1})}>
                <Text style={[styles.text, {marginLeft : 20}]}>
                    {`${item.open.substring(0,2)} : ${item.open.substring(3,5)}`}
                </Text>
            </Button>
            
            <View>
                <Text style={[styles.text, {marginHorizontal : 12}]}> {"~"} </Text>
            </View>

            <Button onPress={()=>onPress(false, {hour : item.close.substring(0,2)*1, minute : item.close.substring(3,5)*1})}>
                <Text style={styles.text}>
                    {`${item.close.substring(0,2)} : ${item.close.substring(3,5)}`}
                </Text>
            </Button>
        </View>
    )
    return (
        <View style={{flexDirection:'row'}}>
            <Text style={[styles.textHoliday, {marginLeft : 20}]}>{`00 : 00`}</Text>
            
                <Text style={[styles.text, {marginHorizontal : 12}]}> {"~"} </Text>
            
            <Text style={styles.textHoliday}>{`00 : 00`}</Text>
        </View>
    )

}



const styles = StyleSheet.create({
    rowBlock : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent: 'center',
        marginTop : 17,
    },
    textHoliday : {
        fontSize : 14,
        color : Utill.color.defaultColor,
    },
    text : {
        fontSize : 14,
        color : Utill.color.textBlack,
    },
    checkBox : {
        alignItems: 'center',
        flexDirection : 'row',
        marginLeft : 37,
    },

})