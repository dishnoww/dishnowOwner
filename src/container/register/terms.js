import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

import Text from '../../component/common/Text'
import {BigButtonBorder} from '../../component/common';
import * as Utill from '../../utill';

import CheckView from '../../component/register/TermsCheck';
import Toast from 'react-native-simple-toast';


export default (props) => {

    const {onNextPagePress, onPressTerms} = props;
    const [valid, setValid] = useState({c1 : false, c2 : false, c3 : false, c4 : false});
    const [validAll, setValidAll] = useState(false);
 
    const _onNextPress = () => {
        onNextPagePress();
    }

    const _onPressTerms = (uri) => {
        onPressTerms(uri);
    }
    const _validation =()=> {
        return valid.c1 && valid.c2 && valid.c3;
    }
    const _chackAll =(set)=>{
        setValidAll(set);
        setValid({c1 : set, c2 : set, c3 : set, c4 : set});
    }
    const _isCheckAll =()=> {
        return validAll? true:null;
    }
    return (
        <ScrollView style={styles.pageContainer}>

            <View>
                <Text style={styles.title}>{"디쉬나우 서비스 이용약관"}</Text>
            </View>
            <CheckView 
                title='모두 확인 동의합니다.'
                value={validAll}
                onChange={change=>_chackAll(change)}
                titleStyle={styles.checkTitleText}
            />
            <View style={styles.termsArea}>
                <CheckView 
                    title='(필수) 서비스 이용 약관 동의'
                    titleStyle={styles.checkContentText}
                    setValue={_isCheckAll()}
                    onChange={change=>{
                        setValid(v=>({...v, c1:change}));
                    }}
                    onPressBracket={()=>_onPressTerms({visible:true, uri:'http://dishnow.kr/terms/1.html'})}
                />
                <CheckView 
                    title='(필수) 개인정보 처리방침 동의'
                    titleStyle={styles.checkContentText}
                    setValue={_isCheckAll()}
                    onChange={change=>{
                        setValid(v=>({...v, c2:change}));
                    }}
                    onPressBracket={()=>_onPressTerms({visible:true, uri:'http://dishnow.kr/terms/2.html'})}
                />
                <CheckView 
                    title='(필수) 위치 기반 서비스 동의'
                    titleStyle={styles.checkContentText}
                    setValue={_isCheckAll()}
                    onChange={change=>{
                        setValid(v=>({...v, c3:change}));
                    }}
                    onPressBracket={()=>_onPressTerms({visible:true, uri:'http://dishnow.kr/terms/3.html'})}
                />
                <CheckView 
                    title='(선택) 마케팅 수신 동의'
                    titleStyle={styles.checkContentText}
                    setValue={_isCheckAll()}
                    onChange={change=>{
                        setValid(v=>({...v, c4:change}));
                    }}
                    onPressBracket={()=>_onPressTerms({visible:true, uri:'http://dishnow.kr/terms/4.html'})}
                />
            </View>
            <View style={styles.nextButtonArea}>
                    <BigButtonBorder title={'다음'} disabled={!_validation()} style={styles.nextButton} onPress={_onNextPress}>
                    </BigButtonBorder>
                </View>
        </ScrollView>
    )

}


const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems: 'center',
        padding : 22.5,
    },
    pageContainer : {
        width : Utill.screen.screenWidth,
        paddingHorizontal : 15,
    },
    termsArea : {
        borderTopWidth : 0.8,
        borderBottomWidth : 0.8,
        borderColor : Utill.color.border,
        height : 170,
        justifyContent : 'space-evenly',
        paddingHorizontal : 11.5,
        marginTop : 15,
    },

    title : {
        margin : 0,
        padding : 0,
        marginBottom: 46,
        fontSize : 16,
        color : Utill.color.textBlack,
    },

    checkTitleText : {
        fontSize : 15,
        color : Utill.color.textBlack,
    },
    checkContentText : {
        fontSize : 14,
        color : Utill.color.textBlack,
    },

    nextButtonArea : {
        flexDirection : 'row',
        justifyContent : 'center',
        marginTop : 39,
        marginBottom : 50,

    },
    nextButton : {
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