import React , {useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';

import {Text} from '../component/common';
import * as Utill from '../utill';

export default (props) => {

    
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>{'환영합니다!'}</Text>
            </View>

            <View style={styles.nameArea}>
                <Text style={[styles.text, styles.name]}>{'홍길동'}</Text><Text style={styles.text}>{'회원가입을 축하합니다.'}</Text>
                <Text style={styles.t2}>{'디쉬나우 서비스를 이용하실 수 있도록\n심사 후 카카오톡으로 안내가 발송됩니다.'}</Text>
            </View>
            
            <View>
                <Image style={styles.image} source={{uri:'iconjudge'}}/>
            </View>

            <Button >
                <Text>{'고객센터 문의'}</Text>
            </Button>
        </View>
    )
}


const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems: 'center',
    },
    image : {
        width : 122.1,
        height : 146.5,
    },
    title : {
        marginTop: 64,
        fontSize : 50,
        color : Utill.color.textBlack,
    },
    name : {
        color : Utill.color.primary1,
    },  
    nameArea : {
        flexDirection : 'row',
        justifyContent : 'center',
    },
    text : {
        fontSize : 18,

    },
    t1 : {
        flexDirection : 'row',
        justifyContent : 'center',
        marginTop : 39,
        marginBottom : 50,

    },
    t2 : {
        width : 263,
        height : 51,
        borderRadius : 25.5,
        borderWidth : 0.5,
        borderColor : Utill.color.primary1,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : Utill.color.onColorBackground
    },
    nextButtonText : {
        fontSize : 18, 
        color : Utill.color.primary1,
    }
  
})