import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {registerStoreStore, registerGetLngLat} from '../../store/modules/user'

import {BigButtonBorder, DaumPostModal} from '../../component/common';
import {RegistInput, RegistInputAddress, RegisterInputFile} from '../../component/register';
import * as Utill from '../../utill';
import * as API from '../../utill/API';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast'


export default (props) => {
    const dispatch = useDispatch();
    const {status, error, regist} = useSelector(state => state.User.toJS());
    const [postVisible, setPostVisible] = useState(false);

    const [businessNumber, setBusinessNumber] = useState('');
    const [hostName, setHostName] = useState('');
    const [storeName, setStoreName] = useState('');
    const [address, setAddress] = useState({zipcode : '', address : ''});
    const [tempAddress, setTempAddress] = useState({zipcode : '', address : ''});
    const [subAddress, setSubAddress] = useState('');
    const [storePhone, setStorePhone] = useState('');
    const [businessLicenseImage, setBusinessLicenseImage] = useState([''])
    const [valid, setValid] = useState({bnum:false, host:false, store:false, address:false, zipcode:false, phone:false, image:false});

    const _onNextPress = () => {

        const d = {
            businessNumber,
            hostName,
            storeName,
            storePhone,
            businessLicenseImage,
            zipCode : address.zipcode,
            address : `${address.address}, ${subAddress}`,

        }
        dispatch(registerStoreStore(d));
    }

    useEffect(()=>{
        switch (status) {
            case 'registerStoreImage' : 
            setValid(v=>{return {...v, image : true}});
                setBusinessLicenseImage([regist.businessLicenseImage]);
            break;
            case 'registerGetLngLatFail' :
                Toast.show('잠시 후 다시 시도해 주세요.');
            break;
            case 'registerGetLngLatSuccess' : 
            // Toast.show('get long lat');
                setAddress({...tempAddress});
                setValid(v=>{return {...v, zipcode : true, address : true}});
            break;
        }
    }, [status]);

    // ==============================================================
    const _onChangeBusinessNumber = (text) => {
        let newText = text.replace(/\D/g,'');
        setBusinessNumber(newText);
        const res =/^\d{5,15}$/.test(text);
        setValid(v=>{return {...v, bnum : res}});
    }
    const _onChangeHostName = (text) => {
        setHostName(text);
        const res = /^[가-힣]{2,25}|[a-zA-Z]{2,25}\s[a-zA-Z]{2,25}$/.test(text);
        setValid(v=>{return {...v, host : res}});
    }
    const _onChangeStoreName = (text) => {
        setStoreName(text);
        // const res = /^[가-힣]{2,25}|[a-zA-Z]{2,25}\s[a-zA-Z]{2,25}$/.test(text);
        const res = text.length > 1;
        setValid(v=>{return {...v, store : res}});
    }
    const _onChangePhone = (text) => {
        setStorePhone(text);
        // const res = /^\d{11}$/.test(text);
        const res = text.length > 4;
        setValid(v=>{return {...v, phone : res}});
    }
    const _onSearhPost = (data) => {
        setTempAddress(data);
        setPostVisible(false);
        dispatch(registerGetLngLat(data.address));
    }
    const _validate = () => {
        // console.log(valid);
        return valid.bnum && valid.zipcode && valid.address && valid.phone && valid.image
    }
    // ==============================================================
    return (
        <ScrollView 
        style={styles.container}>
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            enableAutomaticScroll={true}
            enableOnAndroid={false}
        >
            <DaumPostModal visible={postVisible} onPress={_onSearhPost} onPressCancel={()=>setPostVisible(false)}/>
            <View>
                <Text style={styles.title}>{"사업자 정보"}</Text>
            </View>
            <RegistInput 
                title='사업자번호'
                value={businessNumber}
                keyboardType={'number-pad'}
                placeholder='-를 뺀 11자리 사업자번호를 입력하세요.'
                onChangeText={(text)=>_onChangeBusinessNumber(text)}
            />
            <RegisterInputFile 
                title='사업자등록증 사본'
                text={businessLicenseImage[0]}
                onPress={props.openGallery}/>
            <RegistInput 
                title='사업주명'
                value={hostName}
                placeholder='사업주명 입력하세요.'
                onChangeText={(text)=>_onChangeHostName(text)}
            />
            <View>
                <Text style={[styles.title, {marginTop:50}]}>{"업소 정보"}</Text>
            </View>
            <RegistInput 
                title='업소 이름'
                value={storeName}
                placeholder='업소 이름을 입력하세요.'
                onChangeText={(text)=>_onChangeStoreName(text)}
            />
            <RegistInput 
                title='업소 전화번호'
                value={storePhone}
                keyboardType={'number-pad'}
                placeholder='업소 대표 전화번호를 입력하세요.'
                onChangeText={(text)=>_onChangePhone(text)}
            />

            <RegistInputAddress
                title='업소 주소'
                placeholder = {['우편번호', '주소', '상세주소']}
                onPress={()=>setPostVisible(true)}
                address={{...address, subAddress}}
                onChangeText={data=>setSubAddress(data)}
            />

            <View style={styles.nextButtonArea}>
                <BigButtonBorder disabled={!_validate()} title={'다음'} style={styles.nextButton} onPress={_onNextPress}>
                </BigButtonBorder>
            </View>
        </KeyboardAwareScrollView>
        </ScrollView> 
    )
    
}


const styles = StyleSheet.create({
    container : {
        width : Utill.screen.screenWidth,
        paddingHorizontal : 15,
    },

    title : {
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