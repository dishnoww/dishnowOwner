import React, {useState, useEffect, memo}  from 'react';
import {View, AppState, StyleSheet} from 'react-native';
import OneSignal from 'react-native-onesignal';
import {withNavigationFocus} from 'react-navigation';

import {useSelector, useDispatch} from 'react-redux'
import {acceptPush} from '../store/modules/reservationAccept';
import {requestGetServer, requestAdded, requestPush, requestPop, requestTimeout, requestAccept, requestReject} from '../store/modules/reservation';
import { callStatusReset } from '../store/modules/reservationCall';
import { confirmGetServer } from '../store/modules/reservationConfirm';
import { acceptGetServer } from '../store/modules/reservationAccept';
import {bookedPush} from '../store/modules/reservationBooked';

import {Text, Button} from '../component/common';
import {RequestCard} from '../component/tabRequest'
import * as Utill from '../utill';
import * as Time from '../utill/time';
import MainCallButton from '../component/MainCallButton';

import Toast from 'react-native-simple-toast';
import moment from 'moment';

const TabRequest = (props) => {
    
    
    const [appState, setAppState] = useState(AppState.currentState);

    const dispatch = useDispatch();
    const {status, error } = useSelector(state =>state.Reservation.toJS());
    const callStatus = useSelector(state =>state.ReservationCall.get('status'));
    const isCall = useSelector(state =>state.ReservationCall.get('isCall'));
    const request = useSelector(state =>state.Reservation.get('request').toJS());
    const {hostId} = useSelector(state =>state.User.toJS());

    const tabState = useSelector(state =>state.Navigation);
    
    const [currentRequest, setCurrentRequest] = useState(null);
    const [timer, setTimer] = useState(null);
    const [timerCount, setTimerCount] = useState(0);
    const [navlistener, setNavListener] = useState([]);

    const [oneSignallistener, setOneSignalListener] = useState([]);
    
    useEffect (()=> {
        setTimeout(()=> dispatch(requestGetServer()),10);
        // dispatch(acceptGetServer());
        // dispatch(confirmGetServer());
        // // tabbar listener
        
        setNavListener([
            AppState.addEventListener('change', (state) => {
                // console.log(state)
                // console.log(typeof state)
                // console.log(appState)
                // console.log(typeof state)

                setAppState((prevState)=>{
                    switch (state) {
                        case "active" :
                        if  (prevState == "inactive" || prevState == "background") {
                            dispatch(requestGetServer());
                        }
                        break;
                        // case "background" :
                            
                        // break;
                    }
                    return state;
                });
                
            })
        ]);

        return () => {
            // Toast.show('removed');
            navlistener.forEach(sub => sub.remove());
            // OneSignal.forEach(sub => sub.remove());
            
        }
    }, []);
    useEffect ( ()=> {
        setOneSignalListener(listener => {
            return [
                OneSignal.addEventListener('received', _onesignalRecived),
                OneSignal.addEventListener('opened', _onesignalRecived),
            ]
        });
    }, [tabState])


    // status
    useEffect( ()=> {
        // console.log(status);
        switch (status) {
            //리스트 받아오기
            case 'requestGetServer' :
                // Toast.show('요청을 받아옵니다.');
            break;
            
            case 'requestGetServerFail' : 
                // console.log('서버로부터 목록을 가져오지 못했습니다.');
                Toast.show('인터넷 연결 상태를 확인해 주세요.');
            break;

            case 'requestGetServerSuccess' : 
                // Toast.show('요청을 받았습니다.');
                _getRequestList();
            break;

            case 'requestGetServerSuccessEmpty' : 
                // Toast.show('받은 요청이 없습니다.');
            break;
 
            // 요청 수락
            case 'requestAccept' : 
            break;

            case 'requestAcceptFail' : 
                Toast.show('인터넷 연결 상태를 확인해 주세요.');
            break;

            case 'requestAcceptSuccess' :
                dispatch(acceptPush(request[0]));
                _popReuqestList();
                Toast.show('요청을 수락했습니다.');
            break;

            // 요청 거절
            case 'requestReject' : 
            break;

            case 'requestRejectFail' : 
            Toast.show('인터넷 연결 상태를 확인해 주세요.');
            break;

            case 'requestRejectSuccess' :
                _popReuqestList();
                Toast.show('요청을 거절했습니다.');
            break;

            // 요청 하나를 탭으로 가져옴
            case 'requestAdded' : 
                // console.log(currentRequest);
                _timerStart();
            break;
            //요청이 뽑힘
            case 'requestPop' : 
                _getRequestList();
            break;

            case 'requestPush' : 
                _getRequestList();
            break;

            case 'requestTimeout' : 
                // console.log('time out');
                _popReuqestList();
            break;
        } 

    }, [status])

    useEffect(()=> {
        switch (callStatus) {
            case 'callSetSuccess' : 
                Toast.show(isCall ? '콜을 받습니다.' : '콜을 받지 않습니다.');
                dispatch(callStatusReset());
            break;
            case 'callSetFail' : 
                Toast.show('잠시 후 다시 시도해 주세요.');
                dispatch(callStatusReset());
            break;
        }
    }, [callStatus]);

    

    // tick
    useEffect ( ()=> {
        if (timer && (timerCount <= 0)) {
            _timerStop();
            dispatch(requestTimeout());
        }
    }, [timerCount]);



    // timer 
    const _timerStart =()=> {
        setTimer(timer=>{
            if (timer==null) return setInterval(()=>_timerTick(), 1000);
        });
    }

    const _timerTick =()=> {
        setTimerCount(count=>count-1);

    }

    const _timerStop =()=> {
        setTimer(timer=> {
            if (timer!=null) {
                clearInterval(timer);
                return null;
            }
            return timer; // 이거 리턴 없으면 앱 전체적으로 꼬임
        })
    }

    
    // push event listener
    const _onesignalRecived = (notification) => {

        console.log(notification);
        if (!notification) return;
        let notiData = notification.notification? {...notification.notification} : notification;
        
        const {type = null , createdAt = null, time = null, peopleNumber = null, reservationId = null, name = null, phone = null} = notiData.payload.additionalData;
        const payload = {}
        switch (type) {
            case 'request' :
                payload.name = name;
                payload.reservationId = reservationId;
                payload.createdAt = Time._pushParse(createdAt);
                payload.time = Time._pushParse(time);
                payload.peopleNumber = peopleNumber;
                if (reservationId) {
                    dispatch(requestPush([payload])) 
                    if ((tabState == 'tab2') || (tabState == 'tab3') || (tabState == 'MyHome'))
                        props.navigation.navigate('tab1');
                    
                }
            break;
            case 'confirm' : 
                payload.phone = phone;
                payload.name = name;
                payload.reservationId = reservationId;
                payload.createdAt = Time._pushParse(createdAt);
                payload.time = Time._pushParse(time);
                payload.peopleNumber = peopleNumber;
                dispatch(bookedPush(payload));
                props.navigation.navigate('BookedModal');
            break;
            default : break;
        }
    }

    // pop request
    const _popReuqestList = () => {
        setCurrentRequest(null);
        dispatch(requestPop());
    }

    // get request list 
    const _getRequestList = () => {
        _timerStop();

        let tempRequest = request.length>0 ? request[0] : [];

        if (!!tempRequest && !!request[0]){

            let createTime = moment(tempRequest.createdAt).add(9, 'hours').format('YYYY-MM-DD HH:mm:ss');
            let expectTime = moment(tempRequest.time).add(9, 'hours').format('YYYY-MM-DD HH:mm:ss');
            const currentTime = moment(moment().format("YYYY-MM-DD HH:mm:ss"));
 
            createTime = moment(createTime);
            expectTime = moment(expectTime);

            
            const left = 120 - Math.floor((currentTime-createTime)*0.001);
            tempRequest.time = expectTime.format('YYYY-MM-DD HH:mm:ss');
            tempRequest.createdAt = createTime.format('YYYY-MM-DD HH:mm:ss');

            if (left > 0) {
                setCurrentRequest(tempRequest);
                setTimerCount(left);
                dispatch(requestAdded());
            } else {
                dispatch(requestPop());
            }
        } else {
            setCurrentRequest(null);
        }
    }




    const _onPressYes = () => {
        dispatch(requestAccept({hostId : hostId, reservationId : currentRequest.reservationId}));
        return null;
        
    }
    const _onPressNo = () => {
        dispatch(requestReject({hostId : hostId, reservationId : currentRequest.reservationId}));
        return null;
    }

    return (
        <View style={styles.container}>

            {!currentRequest &&
                <Text style={styles.text}>{'요청내역이 없습니다.'}</Text>
            }
            {currentRequest &&
                <RequestCard 
                    c = {currentRequest}
                    time = {currentRequest.time}
                    timerCount={timerCount} 
                    count={currentRequest.peopleNumber} 
                    onPressYes={_onPressYes} 
                    onPressNo={_onPressNo} /> 
            }
            <MainCallButton/>
        </View>
    )
}


export default withNavigationFocus(TabRequest);



const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : Utill.color.onColorBackground,
        paddingTop : Utill.screen.topSafe,
        justifyContent : 'center',
        alignItems : 'center',
    },
    text : {

        fontSize : 18,
        color : Utill.color.defaultColor,
    }
});


