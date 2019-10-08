import React, {memo, useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {withNavigationFocus} from 'react-navigation';

import {useSelector, useDispatch} from 'react-redux';
import { acceptGetServer, acceptRefresh, acceptRefreshSuccess} from '../store/modules/reservationAccept';

import MainCallButton from '../component/MainCallButton';
import {WaitCard} from '../component/tabWait';
import * as Utill from '../utill';

import Toast from 'react-native-simple-toast';
import moment from 'moment';




const tabWait = (props) => {
    const {status, accept} = useSelector(state=>state.ReservationAccept.toJS());
    const dispatch = useDispatch();
    const [currentTime, setCurrentTime] = useState(moment(moment().format("YYYY-MM-DD HH:mm:ss")));
    
    
    useEffect (()=> {
        dispatch(acceptGetServer());
    }, []);
    useEffect (()=> {
        // console.log(status);
        switch (status) {
            case 'acceptGetServer' : 
                // Toast.show('서버로 부터 목록을 가져옵니다.');
            break;
            case 'acceptGetServerFail' : 
                // Toast.show('서버로 부터 목록을 가져오지 못했습니다.');
                Toast.show('인터넷 연결 상태를 확인해 주세요.');
            break;
            case 'acceptGetServerSuccess' : 
                // Toast.show('서버로 부터 목록을 가져왔습니다.');
            break;
            case 'acceptRefresh' : 
                dispatch(acceptRefreshSuccess());
            break;
            case 'acceptRefreshSuccess' : 
                // Toast.show('로컬 기록을 업데이트 했습니다.');
            break;
        }
    }, [status])
    

    useEffect(()=> {
        if (props.isFocused) {
            // if (isLoaded) {
                // Toast.show('대기가 관심받고 있습니다.');
                // console.log('페이지가 로드 되고 나서 다시 돌아왔습니다.');
                dispatch(acceptRefresh());
            // }
        } else {
            // Toast.show('대기가 관심을 잃었습니다.');
            // setIsLoaded(false);
        }
    }, [props.isFocused])

    const _endReached = () => {
        dispatch(acceptRefresh());
    }
    const _onRefresh = () => {
        dispatch(acceptGetServer());
    }

    return (
        <View style={styles.container}>
            {/* {!isLoaded && <ActivityIndicator size="large" color="#0000ff" />} */}
            
            {(!accept.length) && !!currentTime &&
                <Text style={styles.text}>{'대기중인 예약이 없습니다.'}</Text>
            }
            
            {accept.length>0 && <FlatList
                contentContainerStyle ={styles.flat}
                data = {accept}
                onRefresh = {() => _onRefresh()}
                refreshing = {status=='acceptGetServer'}
                keyExtractor={(item, index) => `rwid-${item.reservationId}`}
                onEndReached = {()=>_endReached()}
                renderItem = { 
                    ({item}) => <WaitCard 
                                    payload={item} 
                                    currentTime = {currentTime}/>
                }/>
            }
            <MainCallButton/>
        </View>
    )
};


export default withNavigationFocus(tabWait);

const styles = StyleSheet.create({
    container : {
        paddingTop : Utill.screen.topSafe,
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : Utill.color.onColorBackground
    },
    flat : {
        paddingTop : 54,
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