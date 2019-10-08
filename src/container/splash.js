import React, {useState, useEffect} from 'react';
import {Image} from 'react-native';
import * as Utill from '../utill';
import LinearGradient from 'react-native-linear-gradient';

import {useSelector, useDispatch} from 'react-redux';

import {requestGetServer} from '../store/modules/reservation';
import {autoLogin} from '../store/modules/user';

import Toast from 'react-native-simple-toast';


// Splash == loginx
export default (props) => {
    const {navigation} = props;
    const dispatch = useDispatch();
    const {status, error, hostId} = useSelector(state=>state.User.toJS());


    //========================================================================
    

    useEffect(()=>{
        // console.log('splash : ' + status)
        switch (status) {
            case 'autoLoginSuccess' : 
                _next('MainAppStack');
            break;
            case 'loginSuccess' : 
                _next('MainAppStack');
            break;
            case 'autoLoginFail':  
                // Toast.show(error);
                _next('Login');
            break;
            default :
                dispatch(autoLogin()); 
            break;
        }

    },[status])


    const _next = (screen) => {
            navigation.navigate(screen);
    }

    return (
        <LinearGradient
        start={{x:0,y:0}}
        end  ={{x:0,y:1}}
        colors={[Utill.color.primary1, Utill.color.primary2]} 
        style={{flex:1, padding: 49}}>
            <Image style={{flex : 1}} resizeMode={'contain'} source={{uri : 'dishnowlogowhite'}}/>
        </LinearGradient>
    )

}
