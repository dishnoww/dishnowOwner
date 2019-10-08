/* 
 * ios - android 하나로
 * 비밀번호 찾기, terms?
 */

import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, ScrollView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';

import {useSelector, useDispatch} from 'react-redux';
import {login, reset} from '../store/modules/user'

import * as Utill from '../utill';
import * as API from '../utill/API';
import {Button, BigButton, Text, LoadingModal, TextInput} from '../component/common';
const Login = (props) => {
    const dispatch = useDispatch();
    const {status, error, hostId} = useSelector(state=>state.User.toJS());
    const [isLoadingVisible, setIsLoadingVisible] = useState(false);

    const {navigation} = props;

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const [buttonLock, setButtonLock] = useState(false);
    
    // useEffect(()=> {
    //     console.log('\n\n\n'+status+'\n\n\n');
    //     setIsLoadingVisible(false);
    // }, [])

    useEffect(()=> {

        switch (status) {
            case 'login' : 
                setIsLoadingVisible(true);
            break;
            case 'loginSuccess' : 
                setIsLoadingVisible(false);
                props.navigation.navigate('MainAppStack');
            break;
            case 'loginFail' : 
                setIsLoadingVisible(false);
                Toast.show(error);
            break;
            case 'logoutSuccess' :
                setIsLoadingVisible(false);
            break;
        }
    }, [status])

    const _onPressLogin = () => {
        // console.log(status);
        if (status != 'login') {
                // if      (!/^\d{5,15}$/.test(id)) Toast.show('사업자번호를 확인해 주세요.');
                // else if (!/^[A-Za-z0-9]{6,15}$/.test(password)) Toast.show('비밀번호를 확인해 주세요.');
                dispatch(login({id, password}));
            }
    }



    
    return (
        
        
            <LinearGradient
                start={{x:0,y:0}}
                end  ={{x:0,y:1}}
                colors={[Utill.color.primary1, Utill.color.primary2]} 
                style={styles.container}
            >
                
                 <KeyboardAwareScrollView
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    style ={{alignSelf:'stretch'}}
                    showsVerticalScrollIndicator = {false}
                    contentContainerStyle={[styles.container]}
                    enableAutomaticScroll={true}
                    enableOnAndroid={false}
                    onKeyboardWillShow={(frames) => {
                    // Toast.show('Keyboard event' + JSON.stringify(frames));
                }}>
                
                <LoadingModal visible={isLoadingVisible} />
                <View style = {styles.loginArea}>
                   

                    <View style = {styles.logoArea}>
                        <Image style={{width:280, height:73.2}} resizeMode={'cover'} source ={{uri : 'dishnowlogowhite'}}/>
                        <Text style = {styles.logoText}>{"for 사장님"}</Text>
                    </View>

                    <View>
                        <TextInput
                            keyboardType ={'number-pad'}
                            style = {styles.input}
                            value = {id}
                            onChangeText = {(text)=>setId(text)}
                            placeholder = {"사업자번호"}
                            placeholderTextColor = {Utill.color.onColorBackground}/>
                    </View>

                    <View>
                        <TextInput
                            secureTextEntry = {true}
                            style = {styles.input}
                            value = {password}
                            onChangeText = {(text)=>setPassword(text)}
                            placeholder = {"비밀번호"}
                            placeholderTextColor = {Utill.color.onColorBackground}/>
                    </View>


                    <BigButton
                        disable = {buttonLock}
                        style = {styles.loginButton}
                        onPress = {_onPressLogin}
                        title = {"로그인"}>
                    </BigButton>

                    


                    <Button 
                        style = {styles.create}
                        onPress = {()=>navigation.navigate('LoginRegister')}>
                        <Text style = {styles.createText}>{"새로운 계정 만들기"}</Text>
                    </Button>
                

                </View>
                
        </KeyboardAwareScrollView>
        
            </LinearGradient>
    )
}

export default Login;

const styles = StyleSheet.create({
    keyView : {
        width : Utill.screen.width,
        height : Utill.screen.screenHeight,
    },
    container : {
        paddingTop : Utill.screen.topSafe,
        flex : 1,
        // width : Utill.screen.width,
        // height : Utill.screen.screenHeight,
        justifyContent : 'flex-end',
        alignItems: 'center',
    },

    loginArea : {
        alignItems : 'center',
    },

    logoArea : {
        flex:1,
        justifyContent : 'center',
        alignItems : 'flex-end',
    },
    logoText : {
        padding : 0,
        margin : 0,
        top : -9,
        left : -9,
        fontSize : 14,
        color : Utill.color.onColorBackground,
    },
    input : {
        margin:0,
        padding:0,
        fontSize : 18,
        width : 278.5,
        paddingTop : 28,
        paddingBottom : 12,
        borderBottomWidth : 1.3,
        borderBottomColor : Utill.color.onColorBackground,
        color : Utill.color.onColorBackground,
    },
    loginButtonCover : {
        marginTop:50,
        borderRadius : 25,
        backgroundColor : Utill.color.onColorBackground,
        width : 260.5,
        height : 50,
        borderWidth :1,
        borderColor : '#ffffff'
    },
    loginButton : {
        marginTop:50,
    },
    loginButtonText : {
        fontSize : 18,
        color : Utill.color.primary1,
    },
    findPassword : {
        marginTop : 20,
    },
    findPasswordText : {
        padding : 0,
        margin : 0,
        fontSize : 14,
        color : Utill.color.onColorBackground,
    },
    create : {
        marginBottom : 40,
        paddingBottom : 5,
        borderBottomWidth : 0.3,
        marginTop : 99,
        borderBottomColor : Utill.color.onColorBackground,    
    },
    createText : {
        padding : 0,
        margin : 0,
        color : Utill.color.onColorBackground,    
    },
    placeholder : {
        padding : 0,
        margin : 0,
        fontSize : 18,
        color : Utill.color.onColorBackground,
    },
})