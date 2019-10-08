import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {BigButtonColor, CustomAlert} from '../../component/common';
import {RegistInput, RegisterInputPhone, RegisterInputCode, } from '../../component/register';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import * as Utill from '../../utill';
import * as API from '../../utill/API';

import {useSelector, useDispatch} from 'react-redux'
import { registerStoreHost, register, registerVerifyCodeTimeout, registerVerifyCodeRequest, registerVerifyCode} from '../../store/modules/user'

import Toast from 'react-native-simple-toast'



export default (props) => {
    const dispatch = useDispatch();
    const {status, error, regist, verifyCode} = useSelector(state=>state.User.toJS());

    
    const [valid, setValid] = useState({name :false, phone : false, code: null, password: false, password1 : false, status: false});
    const [registable, setRegistable] = useState(false);
    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    const [timer, setTimer] = useState(null);
    const [timerCount, setTimerCount] = useState(0);

    const [isAlertVisible, setIsAlertVisible] = useState(false);


    const _onPressNext = () => {
        const d = {
                userName,
                userPhone,
                password,
            }
        dispatch(registerStoreHost(d));
    }
    useEffect(()=>{
        switch (status) {
            case 'registerStoreHost' : 
                setValid(v=>{return {...v, status : false}});
                dispatch(register(regist));
            break;
            case 'registerFail' : 
                setValid(v=>{return {...v, status : true}});
            break;

            case 'registerVerifyCodeStore' : 
                setIsAlertVisible(true);
                setValid(v=>({...v, code : null}));
                setTimer(timer=>{
                    if (timer === null) {
                        return setInterval(()=>setTimerCount(time=>time-1), 1000);
                    }
                });
                setTimerCount(t=>180);
            break;

            case 'registerVerifyCodeSuccess' : 
                setValid(v=>({...v, code : true}));
                setTimer(timer=> {
                    clearInterval(timer);
                    return null;
                });
                setTimerCount(t=>0);
            break;

            case 'registerVerifyCodeFail' : 
                setValid(v=>({...v, code : false}));
            break;

            case 'registerVerifyCodeTimeout' :
                setTimer(timer=> {
                    clearInterval(timer);
                    return null;
                });
                setTimerCount(t=>0);
            break;

            // index에서 처리
            // case 'registerImageUploadFail' : 
            //     Toast.show('잠시 후 다시 시도해 주세요.');
            // break
        }
    }, [status]);


    useEffect(()=>{
        // console.log(valid);
        setRegistable(_validate());
    }, [valid]);




    // ============================================================== 
    // timer
    const _startTimer = (time)=> {
        if(timer == null) {
            setTimerCount(time);
            setTimer(setInterval(_tick(timerCount), 1000));
        } else {
            
        }
        
    }


    const _stopTimer = () => {
        clearInterval(timer);
        setTimerCount(0);
    }

    // ============================================================== 
    const _onPressSendVerifyCode = () => {
        setValid(v=>({...v, code : false}));
        dispatch(registerVerifyCodeRequest(userPhone));
    }
    const _onPressVerifyCode = () => {
        dispatch(registerVerifyCode(code));
    }
    const _onPressAlertOk = () => {
        setIsAlertVisible(false);
    }

    // ============================================================== 
     const _validateName = (text) => {
        const res = /^[가-힣]{2,25}|[a-zA-Z]{2,25}\s[a-zA-Z]{2,25}$/.test(text);
        setValid(v=>{return {...v, name : res}});
        return res; // 뷰에 바로 적용될 수 있게 여기서 결과 리턴
     }
     const _validatePhone = (text) => {
        const res = /^\d{11}$/.test(text);
        setUserPhone(text);
        // setValid(v=>{return {...v, phone : res}});
        return res;
     }
     const _validateCode = (text) => {
        const res =/^\d{5}$/.test(text);
        setValid(v=>{return {...v, code : res}});
        if (res) { _stopTimer(); }
        return res;
     }
     const _validatePassword = (text) => {
        const res = /^[A-Za-z0-9]{6,15}$/.test(text);
        setValid(v=>{return {...v, password : res}});
        return res;
     }
     const _validatePassword1 = (text) => {
        const res = (password == text)
        setValid(v=>{return {...v, password1 : res}});
        return res;
     }
     const _validate = () => {
        return valid.name  && valid.password && valid.password1 && valid.code 
        // && valid.phone && valid.code && valid.status 
     }
    // ============================================================== 
    return (
        <View style={{flex : 1}}>

        <CustomAlert visible={isAlertVisible} title={'인증번호가 전송 되었습니다.'} buttonText={'확인'} onPress={_onPressAlertOk} />

        <ScrollView 
            style={styles.pageContainer}
            keyboardShouldPersistTaps='handled'>
            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                enableAutomaticScroll={true}
                enableOnAndroid={false}
            >
            <View>
                <Text style={styles.title}>{"본인 인증"}</Text>
            </View>
            <RegistInput 
                value = {userName} 
                title='이름'
                placeholder='이름을 입력하세요'
                onChangeText={(text)=>setUserName(text)}
                validateFunc = {(text) => _validateName(text)}
            />
            <RegisterInputPhone 
                value = {userPhone} 
                title='휴대폰 번호'
                placeholder={`휴대폰 번호를 '-'없이 입력하세요`}
                onChangeText= {text=>setUserPhone(text)}
                onPress = {_onPressSendVerifyCode}
                />
            <RegisterInputCode
                value = {code} 
                title='인증번호'
                placeholder='인증번호를 입력하세요'
                onChangeText={(text)=>setCode(text)}
                isValid = {valid.code}
                onPress={_onPressVerifyCode}
                time={timerCount}
            />
            <View>
                <Text style={[styles.title, {marginTop:50}]}>{"비밀번호 설정"}</Text>
            </View>

            <RegistInput 
                secureTextEntry = {true}
                value = {password} 
                title='비밀번호'
                placeholder='영문, 숫자 6~15자의 비밀번호를 설정하세요.'
                errorMsg='영문, 숫자 6~15자의 비밀번호를 설정하세요.'
                onChangeText={(text)=>setPassword(text)}
                validateFunc = {(text) => _validatePassword(text)}
            />

            <RegistInput
                secureTextEntry = {true}
                value = {password1} 
                title='비밀번호 확인'
                placeholder='비밀번호를 다시 한 번 입력하세요.'
                onChangeText={(text)=>setPassword1(text)}
                validateFunc = {(text) => _validatePassword1(text)}
            />

            <View style={styles.nextButtonArea}>
                <BigButtonColor 
                    disabled={registable}
                    title={'회원가입'} 
                    style={styles.nextButton} 
                    onPress={_onPressNext}>
                </BigButtonColor>
            </View>
        </KeyboardAwareScrollView>
        </ScrollView>
        </View>
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

    title : {
        margin : 0,
        padding : 0,
        marginBottom: 25,
        fontSize : 16,
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