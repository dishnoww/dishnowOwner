// 페이지마다 따로 불러오던가 memo를 쓰던가

import React, {useEffect, useState} from 'react';
import {View, ScrollView, Image, StyleSheet, BackHandler, Platform} from 'react-native';

import {Text, TermsModal, Navbar, LoadingModal} from '../../component/common';
import {PageCounter} from '../../component/register';

import {useSelector, useDispatch} from 'react-redux';
import {registerStoreImage, register, registerGetImage, userStatusReset} from '../../store/modules/user';

import * as Utill from '../../utill';
import Toast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-picker';


import PageStore from './storeInfo';
import PageHost from './hostInfo';
import PageTerms from './terms';


const Register = (props) => {

    const [isPageMounted, setIsPageMounted] = useState(false);

    useEffect (()=>{
        if (!isPageMounted) setIsPageMounted(true);
    }, [isPageMounted]);

    const [scroll, setScroll] = useState(null);
    const [page, setPage] = useState(0);
    const [termsState, setTermsState] = useState({uri:'', visible:false});
    const [isGalleryVisible, setGalleryVisible] = useState(false);
    const [isLoadingVisible, setIsLoadingVisible] = useState(false);

    const dispatch = useDispatch();
    const {status, error, regist} = useSelector(state=>state.User.toJS());

    useEffect(()=>{
        console.log(regist);
        switch (status) {
            case 'registerStoreStore' :
                console.log(regist);
                    if (!_validateLicenseImage(regist.businessLicenseImage)) 
                        return Toast.show('사업자 등록증 사본을 확인해 주세요.');
                    _goNext();
            break;

            case 'registerStoreHost' :
                //vaidate regist
                dispatch(register(regist));
            break;
            case 'register' : 
                setIsLoadingVisible(true);
            break;
            case 'registerFail' : 
                setIsLoadingVisible(false);
                Toast.show(error);
            break;

            case 'registerSuccess' :
                setIsLoadingVisible(false);
                dispatch(userStatusReset());
                props.navigation.goBack();
                Toast.show('회원가입이 완료되었습니다.');
            break;
            
            case 'registerImageUploadFail' : 
                Toast.show('잠시 후 다시 시도해 주세요..');
                setIsLoadingVisible(false);
            break
            
            case 'registerGetLngLat' :
                // setIsLoadingVisible(true);
            break;
            case 'registerGetLngLatFail' : 
                setIsLoadingVisible(false);
                Toast.show('잠시 후 다시 시도해 주세요.')
            break;
            // case 'registerGetLngLatSuccess' : 
                // setIsLoadingVisible(false);
                // console.log('\n\n\n'+status+'\n\n\n');
            // break;

            default :  
            break;
        }
    }, [status]);



    // ===============================================================================
    // life cycle
    useEffect(()=> {
        BackHandler.addEventListener('hardwareBackPress', _handleBackPress)
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', _handleBackPress)
    }
    });
    // ===============================================================================
    // user event handle
    const _handleBackPress = (forced = false) => {
        if (!page) return false;
        if (isGalleryVisible) {_closeGallery(); return true;}
        _goBack(); return true;
    }
    const _onPressNavBack = () => {
        props.navigation.goBack();
    }
    const _onPressStoreNext = (payload) => {
        dispatch(registerStore(payload));
        // 유효성 검사 -> 저장 -> 다음페이지
    }
    const _onPressTermsNext = (payload) => {
        _goNext();
    }
    // ===============================================================================
    const options = {
        storageOptions: {
            title : '사진',
            skipBackup: true,
            path: 'images',
        },
    };
    const pickPhoto = (onPickPhoto) => {
        ImagePicker.launchImageLibrary(options, (response) => {
          console.log('Response = ', response);
        
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else {
            onPickPhoto(Platform.OS=='ios' ?response.uri :  `file:${response.path}`);
          }
          
      
        });
      }
      
    // ===============================================================================
    // onPressTermsItem
    const _onPressTerms =(state)=> {
        setTermsState(state);
    }
    // ===============================================================================
    // paging
    const _setPage =(p)=> {
        if (!isPageMounted) return false;
        setPage(p)
        scroll.scrollTo({ x: Utill.screen.screenWidth * p });
    }
    const _goNext =()=> {
        _setPage((page+1)%3);
    }
    const _goBack =()=> {
        page>=0?
            _setPage(page-1)
        :   _handleBackPress();
    }
    // ===============================================================================
    // Gallery On/Off
    const _openGallery = () => {
        dispatch(registerGetImage());
        setGalleryVisible(true);
    }

    const _closeGallery = () => {
        setGalleryVisible(false);
        
    }
    // ===============================================================================
    const _validateLicenseImage =(uri)=> {
        if (!uri) return false;
        // if (uri[uri.length-4]!=='.') return false;
        return true;
    }
    // ===============================================================================
    
    

    return (
        <View style={styles.container}>
            
            <LoadingModal visible={isLoadingVisible} />
            <TermsModal visible={termsState.visible} uri={termsState.uri} onPressCancel={()=>setTermsState({...termsState, visible:false})}/>

            <Navbar navigation={props.navigation} title={`회원가입`}/>
    
            <PageCounter page={page}/>
            {isPageMounted &&
                <ScrollView 
                    ref = {(ref) =>setScroll(ref)}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    pagingEnabled={true}
                    scrollEnabled={false}
                >
                    <PageTerms 
                        onPressTerms={(payload)=>_onPressTerms(payload)}
                        onNextPagePress={(payload)=>_onPressTermsNext(payload)}/>
                    <PageStore 
                        onNextPagePress={(payload)=>_onPressStoreNext(payload)} 
                        openGallery={()=>pickPhoto(uri=>dispatch(registerStoreImage(uri)))} />
                    <PageHost 
                        onNextPagePress={(payload)=>_onPressRegister(payload)} 
                        navigation={props.navigation} />

            </ScrollView>
        }
        </View>
    )

}

export default Register;



const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor:Utill.color.onColorBackground,
    },
    header : {
        width : Utill.screen.screenWidth,
        height : Utill.screen.topBarHeight,
        flexDirection : 'row',
        alignItems : 'center',
    },
    headerTitleArea : {
        position : 'absolute',
        alignItems : 'center',
        justifyContent : 'center',
    },
    headerTitle : {
        textAlign : 'center',
        fontSize : 18,
        color : Utill.color.textBlack,
        width : Utill.screen.screenWidth,
        height : Utill.screen.stopBarHeight,
    },
    headerButton : {
        position : 'absolute',
        padding : 15,
    },
    headerButtonIcon : {
        width : 9.5,
        height : 16, 
    },
}) 