import React , {useState, useEffect}from 'react';
import {View, Image, StyleSheet, Linking} from 'react-native';

import Manage from '../../component/tabMy/manageButtons';

import {useSelector, useDispatch} from 'react-redux';
import {logout, logoutFail, logoutSuccess} from '../../store/modules/user'

import Toast from 'react-native-simple-toast'
import {MenuButton, MenuButton1} from '../../component/tabMy';
import {Button, Text, LogoutModal, LoadingModal} from '../../component/common';
import * as Utill from '../../utill';
import * as API from '../../utill/API';
import * as apiUser from '../../store/apis/user'

export default (props) => {
    const dispatch = useDispatch();
    const {hostId} = useSelector(state=>state.User.toJS());
    const {status} = useSelector(state=>state.User.toJS());
    const [alertVisible , setAlertVisible] = useState(false);
    const [isLoadingVisible, setIsLoadingVisible] = useState(false);

    const _logout = async () => {

        const token = await API.getLocal(API.TOKEN);
        const pushRes = await apiUser.pushToken(token, {hostId, pushToken : ''});
        // console.log(pushRes);
        if (!pushRes.isSuccess) {
            dispatch(logoutFail());
            Toast.show('잠시 후 다시 시도해 주세요.');
            setIsLoadingVisible(false);
        } else if (pushRes.error) {
            dispatch(logoutFail(pushRes.error));
            Toast.show('잠시 후 다시 시도해 주세요.');
            setIsLoadingVisible(false);
        } else {
            setIsLoadingVisible(false);
            dispatch(logoutSuccess());
            await API.setLocal(API.TOKEN, '');
            props.navigation.navigate('LoginHome');
        }
    }

    const _onPressLogout = () => {
        setAlertVisible(true);
    }
    const _onPressLogoutConfirm = () => {
        setAlertVisible(false);
        setIsLoadingVisible(true);
        setTimeout(()=> {
            _logout();
        }, 100);
    }
    return (
        <View style={styles.container}>
            <LoadingModal visible={status=='logout'} />
            <LogoutModal 
                visible={alertVisible}
                title={null}
                subTitle={`로그아웃 하시겠습니까?`}
                buttonOkText={'로그아웃'}
                buttonCancelText={'취소'}
                buttonOkTextColor={Utill.color.primary1}
                onPress={()=>_onPressLogoutConfirm()}
                onPressCancel={()=>setAlertVisible(false)}
            />
            <Text style={styles.title}>{`업소관리`}</Text>
            <MenuButton title={`메뉴관리`} source={{uri:'pictomenu'}} onPress={()=>props.navigation.navigate('MyMenu')} />
            <MenuButton title={`매장관리`} source={{uri:'pictostore'}} onPress={()=>props.navigation.navigate('MyStore')} />
            <MenuButton title={`리뷰관리`} source={{uri:'pictedit'}} onPress={()=>props.navigation.navigate('MyReview')} />
            <MenuButton title={`예약내역`} source={{uri:'pictreservation'}} onPress={()=>props.navigation.navigate('MyHistory')}  />
            
            <View style={styles.space}/>

            <Text style={styles.title}>{`예약내역`}</Text>
            
            <MenuButton1 title={`전화 문의`} source={{uri:'pictophone'}} buttonText={`전화하기`} onPress={()=>Utill.dishnow.callQnA()} />
            <MenuButton1 title={`카카오톡 1:1 문의`} source={{uri:'pictochat'}} buttonText={`문의하기`} onPress = {()=>Utill.dishnow.openKakaoPlusFreind()}/>

            <View style={[styles.space, {marginBottom:10}]}/>

            <MenuButton title={`로그아웃`} source={{uri:'pictosignout'}} onPress={()=>_onPressLogout()}/>
        </View> 
    )

}


const styles = StyleSheet.create({
    container : {
        paddingTop : Utill.screen.topSafe,
        flex : 1,
    },
    space : {
        marginHorizontal:15,
        height:10,
        borderBottomColor:Utill.color.border,
        borderBottomWidth:1
    },
    title : {
        marginTop:15,
        marginLeft : 15,
        fontSize : 12,
        color : Utill.color.textBlack,
    },
    button : {
        width : Utill.screen.width,
        padding:15,
        borderWidth:1,
        margin : 1,
    }
})
