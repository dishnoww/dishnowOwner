import React, {memo, useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import moment from 'moment';

import MainCallButton from '../component/MainCallButton';
import ConfirmCard from '../component/tabConfirm/ConfirmCard';
import NoShowModal from '../component/common/NoShowModal';

import {useSelector, useDispatch} from 'react-redux';
import { confirmGetServer, confirmArrive, confirmNoShow } from '../store/modules/reservationConfirm';
import * as Utill from '../utill';


import Toast from 'react-native-simple-toast';


const TabConfirm = (props) => {
    const {status, confirm} = useSelector(state=>state.ReservationConfirm.toJS());
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();

    // console.log(props);
    const [modal, setModal] = useState({visible:false, index:null, reservationId:null});
    

    useEffect (()=> {
        dispatch(confirmGetServer());
    }, []);


    useEffect (()=> {
        // console.log('confirm status change to : '+ status);
        switch (status) {
            case 'confirmGetServer' : 
                // Toast.show('서버로 부터 목록을 가져옵니다.');
            break;
            case 'confirmGetServerFail' : 
                // Toast.show('서버로 부터 목록을 가져오지 못했습니다.');
                setIsLoaded(true);
            break;
            case 'confirmGetServerSuccess' : 
                // Toast.show('서버로 부터 목록을 가져왔습니다.');
                setIsLoaded(true);
            break;
            case 'confirmArrive' : 
                // Toast.show('도착을 누르셨어요!');
            break;
            case 'confirmArriveFail' : 
                Toast.show('잠시 후 다시 시도해 주세요.');
            break;
            case 'confirmArriveSuccess' : 
                // Toast.show('이것은 도착');
            break;
            case 'confirmNoShow' : 
                // Toast.show('미도착을 누르셨스요');
            break;
            case 'confirmNoShowFail' : 
                Toast.show('잠시 후 다시 시도해 주세요.');
            break;
            case 'confirmNoShowSuccess' : 
                // Toast.show('이것은 미도착');
            break;
        }
    }, [status])
 
    // useEffect(()=> {
    //     if (props.isFocused) {
    //         if (isLoaded) {
    //             // Toast.show('컴펌이 관심받고 있습니다.');
    //         }
    //     } else {
    //         // Toast.show('컴펌이 관심을 잃었습니다.');
    //     }
    // }, [props.isFocused])
    

    const _endReached = () => {
        return null;
    }

    const _onRefresh = () => {
        dispatch(confirmGetServer());
    }


    // arrive
    const _onPressArrival = (reservationId) => {
        // dispatch(...도착(reservationid));
        // console.log('pressed ' + reservationId);
        dispatch(confirmArrive({reservationId}));
    }
     

    // noshow
    const _onPressNoShow = (reservationId) => {
        setModal({ visible : true, reservationId});
    }
    const _onPressModalNoShow = () =>  {
        dispatch(confirmNoShow({reservationId : modal.reservationId}));
        setModal({ visible : false, reservationId : null});
    }
    const _onPressModalCancel = () =>  {
        setModal({ visible : false, reservationId : null});
    }
     
    
    return (
        <View style={styles.container}>
            <NoShowModal 
                visible={modal.visible}
                title={'혹시 손님이 도착하지 않으셨나요?'}
                subTitle={`미도착을 누를 시 예약이 취소되며,\n손님에게 패널티가 발생합니다.`}
                buttonOkText={'미도착'}
                buttonCancelText={'취소'}
                onPress={()=>_onPressModalNoShow()}
                onPressCancel={()=>_onPressModalCancel()}
            />
            {!confirm.length && 
                <Text style={styles.text}>{'완료된 예약이 없습니다.'}</Text>
            }
            
            {!!confirm.length && 
            <FlatList
                contentContainerStyle ={styles.flat}
                data = {confirm}
                extraData = {confirm}
                onRefresh = {() => _onRefresh()}
                refreshing = {status=='confirmGetServer'}
                keyExtractor={(item, index) => `rcid-${item.reservationId}`}
                onEndReached = {()=>_endReached()}
                renderItem = { 
                    ({item}) => {
                        return <ConfirmCard payload={item} 
                            onPressNoShow={(reservationId) =>_onPressNoShow(reservationId) }
                            onPressArrival={(reservationId) => _onPressArrival(reservationId) } />
                    }
                }/>
            }
            <MainCallButton/>
        </View>
    )
    
}


export default withNavigationFocus(TabConfirm);

const styles = StyleSheet.create({
    container : {
        paddingTop : Utill.screen.topSafe,
        alignItems : 'center',
        justifyContent : 'center',
        flex : 1,
    },
    flat : {
        paddingHorizontal : 15,
    },
    logo : {
        width : 121,
        height : 121,
    },
    text : {
        fontSize : 18,
        color : Utill.color.defaultColor,
    }
})

