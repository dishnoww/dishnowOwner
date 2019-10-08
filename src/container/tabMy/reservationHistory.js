import React , {useState, useEffect}from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import {Button, Navbar, LoadingModal, Text} from '../../component/common';
import * as Utill from '../../utill';

import {useSelector, useDispatch} from 'react-redux'
import {historyGetServer, historyStatusReset} from '../../store/modules/myReservationHistory';

import Toast from 'react-native-simple-toast';


// data = [[{}, {}, {}], [{}, {}, {}], [{}, {}, {}]]
// [userId , storeId, peopleNumber, time, state]
const ReservationHistory = (props) => { 
    const {status, history, endReached, page} = useSelector(state=> state.MyReservationHistory.toJS());
    const dispatch = useDispatch();
    const [isLoadingVisible, setIsLoadingVisible] = useState(true);

    const [historyList, setHistoryList] = useState([]);

    useEffect(()=> {
        dispatch(historyGetServer({page}));
        return ()=> dispatch(historyStatusReset());
    },[]);

    useEffect(()=> {
        switch(status) {
            case 'historyGetServer' :
            break; 
            case 'historyGetServerFail' :
                Toast.show('잠시 후 다시 시도해 주세요.');
                setIsLoadingVisible(false);
                props.navigation.goBack();
            break; 
            case 'historyGetServerSuccess' :
                    setHistoryList(list => {
                        return list.concat(history);
                    });
                    setIsLoadingVisible(false);
            break; 
        }
    }, [status]);

    const _onEndReached = () => {
        if (!endReached)
            if (status != 'historyGetServer')
                dispatch(historyGetServer({page}));
    }

    return (
        <View style={styles.container}>

            <Navbar navigation={props.navigation} title={`예약 내역`}/>
            <LoadingModal visible={isLoadingVisible} />
            <FlatList 
            data = {historyList}
            keyExtractor = {(item, index) => `rid-${item.reservationId}`}
            onEndReached = {_onEndReached}
            renderItem={({item, index})=> {
                const prevDate = index>0 ? historyList[index-1].time.substring(0, 10) : ''; 
                const currentDate = item.time.substring(0, 10);
                return <Item item={{
                    date : currentDate, 
                    time : {h : item.time.substring(11, 13), m : item.time.substring(14, 16)}, 
                    createdAt : item.createdAt, 
                    name : item.name,
                    peopleNumber : item.peopleNumber
                }} 
                titleVisible={currentDate != prevDate}/>
            
            }}/>

        </View>
    )
}
export default ReservationHistory;

const Item = ({titleVisible, item:{name, time, createdAt, date, peopleNumber}}) => {
    return (
        <View>
            {titleVisible && 
                <View style = {styles.dateTitleArea}>
                    <Text style = {styles.dateTitleText}>{date}</Text>
                </View>
            }
            <View style={styles.infoArea}>
                <View>
                    <Text style={styles.infoCreatedTimeText}>{createdAt.slice(-8, -3)}</Text>
                </View>
                <View style={styles.infoTextArea}>
                    <Text style={styles.name}>{name}</Text> 
                    <Text style={styles.peopleNumber}>{`${peopleNumber}명`}</Text> 
                    <Text style={styles.time}>{`${time.h}시 ${time.m}분`}</Text>
                </View>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex:1,
    },
    dateTitleArea : {
        paddingHorizontal : 15,
        height : 30,
        justifyContent : 'center',
        backgroundColor : Utill.color.border,
    },
    dateTitleText : {
        fontSize : 16,
        color : Utill.color.itemTitle,
    },
    infoArea : {
        padding : 15,
        paddingTop : 10,
        borderBottomColor : Utill.color.border,
        borderBottomWidth : 1,
    },
    infoCreatedTimeText : {
        fontSize : 12,
        color : Utill.color.itemTitle,
    },
    infoTextArea : {
        marginTop : 10,
        flexDirection : 'row',
    },
    name : {
        flex : 1,
        fontSize : 16,
        lineHeight : 24,
        color : Utill.color.textBlack,
    },
    peopleNumber : {
        fontWeight : 'bold',
        fontSize : 16,
        lineHeight : 24,
        color : Utill.color.textBlack,
    },
    time : {
        marginLeft : 20,
        fontWeight : 'bold',
        fontSize : 16,
        lineHeight : 24,
        color : Utill.color.textBlack,
    }

});