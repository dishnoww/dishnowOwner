import React, {useEffect, useState} from 'react';
import {AppState} from 'react-native';
import codePush from 'react-native-code-push';


import Navigatior from './navigator/rootNavigator';
import AsyncStorage from '@react-native-community/async-storage';

import OneSignal from 'react-native-onesignal'; // Import package from node modules

import Store from './store';
import apiLocal from './store/apis/local'
import {Provider} from 'react-redux';

import info from './utill/info.json';


const app =  (props) => {

  useEffect (()=>{
      

    AsyncStorage.setItem('localStorage/PUSH_USER_ID', '')
      OneSignal.init(info.dishnowOnsignal, 
      {
        kOSSettingsKeyAutoPrompt : true,
      });
    
      OneSignal.inFocusDisplaying(2);
    
      // OneSignal.init("67c75a0c-29d6-4abf-b4e1-cbbc781e1aa4");
      OneSignal.addEventListener('received', onReceived);
      // OneSignal.addEventListener('opened', onOpened);
      OneSignal.addEventListener('ids', onIds);
    
      OneSignal.configure(); 	// triggers the ids event

    return ()=> {
      OneSignal.removeEventListener('received', onReceived);
      // OneSignal.removeEventListener('opened', onOpened);
      OneSignal.removeEventListener('ids', onIds);


    }
  }, [])


  const onReceived = (notification) => {
    // console.log("Notification received: ", notification);
  }

  const onOpened = (openResult) => {
    // console.log('Message: ', openResult.notification.payload.body);
    // console.log('Data: ', openResult.notification.payload.additionalData);
    // console.log('isActive: ', openResult.notification.isAppInFocus);
    // console.log('openResult: ', openResult);

    // console.log(openResult.notification.payload.additionalData);
  }

  const onIds =  (device) => {
    // device.pushToken , device.userId
    AsyncStorage.setItem('localStorage/PUSH_USER_ID', `${device.userId}`)
                .then(console.log(device))
                .catch(e=>console.log(e));
    return null;
  }

  export default codepush(app);

  return (
    <Provider store={Store}>
        <Navigatior/>
    </Provider>

  )
  
}