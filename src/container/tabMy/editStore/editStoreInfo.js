import React, {Component, useState, useEffect} from 'react';
import {View, Image, ScrollView, StyleSheet, FlatList} from 'react-native';

import {useSelector, useDispatch} from 'react-redux'
import {storeGetServer, storePutServer, storeStatusReset} from '../../../store/modules/myStoreInformation';

import * as Utill from '../../../utill';

import {Button, Navbar, Text, TextInput, ImageButton, LoadingModal, TimePicker} from '../../../component/common';
import OpeningHourList from '../../../component/tabMy/editStore/OpeningHourList'

import Toast from 'react-native-simple-toast';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const EditSotreInfo = (props) => {
    const dispatch = useDispatch();
    const {status, information, error} = useSelector(state=> state.MyStoreInformation.toJS());
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoadingVisible, setIsLoadingVisible] = useState(true);
    const [timePickerState, setTimePickerState] = useState({visible : false, days : 0 , isOpen : true, prevTime : {hour : 0, minute : 0}});
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [mainPhone, setMainPhone] = useState('');
    const [subPhone, setSubPhone] = useState('');
    const [keyword, setKeyword] = useState('');
    const [content, setContent] = useState('');
    const [facilities, setFacilities] =  useState({
        wifi : false,
        battery : false,
        parking : false,
        somke : false,
        kids : false,
        pet : false,
    });

    const [breakTime, setBreakTime] = useState('');
    const [openingHours, setOpeningHours] = useState([]);

    

    useEffect(()=> {

        setOpeningHours(
            [
                {
                    day : '월요일',
                    isHoliday : true,
                    open : '00:00:00',
                    close : '00:00:00',
                },
                {
                    day : '화요일',
                    isHoliday : true,
                    open : '00:00:00',
                    close : '00:00:00',
                },
                {
                    day : '수요일',
                    isHoliday : true,
                    open : '00:00:00',
                    close : '00:00:00',
                },
                {
                    day : '목요일',
                    isHoliday : true,
                    open : '00:00:00',
                    close : '00:00:00',
                },
                {
                    day : '금요일',
                    isHoliday : true,
                    open : '00:00:00',
                    close : '00:00:00',
                },
                {
                    day : '토요일',
                    isHoliday : true,
                    open : '00:00:00',
                    close : '00:00:00',
                },
                {
                    day : '일요일',
                    isHoliday : true,
                    open : '00:00:00',
                    close : '00:00:00',
                },
                
            ]);

        dispatch(storeGetServer());
    },[]); 

    useEffect(()=> {
        switch(status) {
            case 'storeGetServer' : 
                setIsLoadingVisible(true);
            break;
            case 'storeGetServerFail' : 
                setIsLoaded(true);
                setIsLoadingVisible(false);
                Toast.show('잠시 후 다시 시도해 주세요.');
                props.navigation.goBack();
            break;
            case 'storeGetServerSuccess' : 

                setName(information.name == 'null' ? '' : information.name);
                setAddress(information.address == 'null' ? '' : information.address);
                setMainPhone(information.mainPhone == 'null' ? '' : information.mainPhone);
                setSubPhone(information.subPhone == 'null' ? '' : information.subPhone);
                setContent(information.content == 'null' ? '' : information.content);
                setKeyword(information.keyword == 'null' ? '' : information.keyword);
                setBreakTime(information.breakTime == 'null' ? '' : information.breakTime);

                setFacilities(state => {
                    if(!information.facilities) return state;
                    let newState = {...state}
                    let parse = JSON.parse(information.facilities);
                    newState.wifi =    !!parse.wifi;
                    newState.battery = !!parse.battery;
                    newState.parking = !!parse.parking;
                    newState.somke =   !!parse.somke;
                    newState.kids =    !!parse.kids;
                    newState.pet =     !!parse.pet;
                    return newState;
                });
                setOpeningHours(state => {
                    
                    // if (!information.mondayOpen) return state;

                    let newState = state.slice();
                    newState[0].open = information.mondayOpen == null ? '00:00:00' : information.mondayOpen;
                    newState[0].close = information.mondayClose == null ? '00:00:00' : information.mondayClose;
                    newState[0].isHoliday = (newState[0].open=='00:00:00') && (newState[0].close=='00:00:00');

                    newState[1].open = information.tuesdayOpen == null ? '00:00:00' : information.tuesdayOpen;
                    newState[1].close = information.tuesdayClose == null ? '00:00:00' : information.tuesdayClose;
                    newState[1].isHoliday = (newState[1].open=='00:00:00') && (newState[1].close=='00:00:00');

                    newState[2].open = information.wednesdayOpen == null ? '00:00:00' : information.wednesdayOpen;
                    newState[2].close = information.wednesdayClose == null ? '00:00:00' : information.wednesdayClose;
                    newState[2].isHoliday = (newState[2].open=='00:00:00') && (newState[2].close=='00:00:00');

                    newState[3].open = information.thursdayOpen == null ? '00:00:00' : information.thursdayOpen;
                    newState[3].close = information.thursdayClose == null ? '00:00:00' : information.thursdayClose;
                    newState[3].isHoliday = (newState[3].open=='00:00:00') && (newState[3].close=='00:00:00');

                    newState[4].open = information.fridayOpen == null ? '00:00:00' : information.fridayOpen;
                    newState[4].close =information.fridayClose == null ? '00:00:00' : information.fridayClose;
                    newState[4].isHoliday = (newState[4].open=='00:00:00') && (newState[4].close=='00:00:00');

                    newState[5].open = information.saturdayOpen == null ? '00:00:00' : information.saturdayOpen;
                    newState[5].close = information.saturdayClose == null ? '00:00:00' : information.saturdayClose;
                    newState[5].isHoliday = (newState[5].open=='00:00:00') && (newState[5].close=='00:00:00');
                    
                    newState[6].open = information.sundayOpen == null ? '00:00:00' : information.sundayOpen;
                    newState[6].close = information.sundayClose == null ? '00:00:00' : information.sundayClose;
                    newState[6].isHoliday = (newState[6].open=='00:00:00') && (newState[6].close=='00:00:00');

                    console.log(newState);
                    
                    return newState;
                })
                setIsLoaded(true);
                setIsLoadingVisible(false);
            break;

            case 'storePutServer' : 
                setIsLoadingVisible(true);
            break;
            case 'storePutServerFail' : 
                setIsLoadingVisible(false);
                // Toast.show('잠시 후 다시 시도해 주세요.');

                Toast.show(error);
            break;
            case 'storePutServerSuccess' : 
                dispatch(storeStatusReset());
                Toast.show('저장 되었습니다.');
                props.navigation.goBack();
                setIsLoadingVisible(false);
            break;
        }
    },[status]); 

    const _onPressSave = () => {
        if (status == 'storePutServer') return;

        const data = {
            subPhone,
            keyword,
            content,
            facilities : JSON.stringify(facilities),
            mondayOpen : openingHours[0].isHoliday ? '00:00:00' : openingHours[0].open,
            mondayClose : openingHours[0].isHoliday ? '00:00:00' : openingHours[0].close,
            tuesdayOpen : openingHours[1].isHoliday ? '00:00:00' : openingHours[1].open,
            tuesdayClose : openingHours[1].isHoliday ? '00:00:00' : openingHours[1].close,
            wednesdayOpen : openingHours[2].isHoliday ? '00:00:00' : openingHours[2].open,
            wednesdayClose : openingHours[2].isHoliday ? '00:00:00' : openingHours[2].close,
            thursdayOpen : openingHours[3].isHoliday ? '00:00:00' : openingHours[3].open,
            thursdayClose : openingHours[3].isHoliday ? '00:00:00' : openingHours[3].close,
            fridayOpen : openingHours[4].isHoliday ? '00:00:00' : openingHours[4].open,
            fridayClose : openingHours[4].isHoliday ? '00:00:00' : openingHours[4].close,
            saturdayOpen : openingHours[5].isHoliday ? '00:00:00' : openingHours[5].open,
            saturdayClose : openingHours[5].isHoliday ? '00:00:00' : openingHours[5].close,
            sundayOpen : openingHours[6].isHoliday ? '00:00:00' : openingHours[6].open,
            sundayClose : openingHours[6].isHoliday ? '00:00:00' : openingHours[6].close,
            breakTime,
        }
        // console.log(data);
        dispatch(storePutServer(data));
    }

    const _changeOpenTimes = (index, time) => {
        let newTimes = openingHours.slice();
        newTimes.splice(index, 1, {...newTimes[index], open:time});
        setOpeningHours(newTimes);
    }

    const _changeCloseTimes = (index, time) => {
        let newTimes = openingHours.slice();
        newTimes.splice(index, 1, {...newTimes[index], close:time});
        setOpeningHours(newTimes);
    }

    const _changeHoliday = (index) => {
        let newTimes = openingHours.slice();
        newTimes.splice(index, 1, {...newTimes[index], isHoliday:!newTimes[index].isHoliday});
        setOpeningHours(newTimes);
    }

    return (
        <View style = {styles.container}>

            <Navbar navigation={props.navigation} title={`매장 정보`} onSavePress={_onPressSave}/>
            {/* modals */}
            <TimePicker 
                visible={timePickerState.visible} 
                prevTime = {timePickerState.prevTime}
                onPickTime={(time)=> 
                        timePickerState.isOpen ?
                            _changeOpenTimes(timePickerState.days, time) 
                        :   _changeCloseTimes(timePickerState.days, time)
                } 
                onRequestClose={()=>setTimePickerState(state=>({...state, visible : false}))}
            /> 
            <LoadingModal visible={isLoadingVisible} />

            {isLoaded &&
            <ScrollView>
            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                enableAutomaticScroll={true}
                enableOnAndroid={false}
            >
                {/* infomation */}
                <View style={[styles.infoBlock, {paddingBottom : 0,}]}>

                    <View style={styles.infoHolder}>
                        <Text style={styles.infoTextTitle}>{"가게명"}</Text>
                        <Text style={styles.infoTextContent}> {name} </Text>
                    </View>
                    
                    <View style={styles.infoHolder}>
                        <Text style={styles.infoTextTitle}>{"주소"}</Text>
                        <Text style={styles.infoTextContent}> {address} </Text>
                    </View>

                    <View style={styles.infoHolder}> 
                        <Text style={styles.infoTextTitle}>{"대표번호"}</Text>
                        <Text style={styles.infoTextContent}> {mainPhone} </Text>
                    </View>
                    {/* <Button style = {styles.editRequestButton} onPress={()=>{Utill.phone.callNumber('07046171529')}}> */}
                    <Button style = {styles.editRequestButton} onPress={()=>{Utill.dishnow.callQnA()}}>
                        <Text style={styles.editRequestButtonText}>
                            수정요청
                        </Text>
                    </Button>
                </View>
                


                
                


                <View style={styles.infoBlock}>
                    <View><Text style={styles.itemTitle}> {"전화번호 추가"} </Text></View>
                    <View>
                        <TextInput
                            style = {styles.textInput}
                            keyboardType={'number-pad'}
                            placeholder = '추가할 전화번호를 입력하세요.'
                            value = {subPhone}
                            onChangeText = {text=>setSubPhone(text)}
                        />
                    </View>
                </View>


                <View style={styles.infoBlock}>
                    <View>
                        <Text style={styles.itemTitle}> {"대표 키워드"} </Text>
                        <Text style={styles.itemSubTitle}> {"가게를 대표할 수 있는 키워드를 입력해 주세요. 예) 치킨, 맥주"} </Text>
                    </View>
                    <View>
                        <TextInput
                            style = {styles.textInput}
                            placeholder = '총 8자 이내로 입력하세요.'
                            value = {keyword}
                            onChangeText = {text=>setKeyword(text)}
                        />
                    </View>
                </View>


                <View style={styles.infoBlock}>
                    <View><Text style={styles.itemTitle}> {"가게소개"} </Text></View>
                    <View>
                        <TextInput
                        style = {styles.textInput}
                        multiline={true}
                        placeholder = '가게소개를 입력하세요.'
                        value={content}
                        onChangeText={text=>setContent(text)}
                        />
                    </View>
                </View>



                <View style = {styles.infoBlock}>
                <View><Text style={styles.itemTitle}> {"영업 시간"} </Text></View>
                <OpeningHourList 
                    style = {{paddingVertical:24 }}
                    times={openingHours}
                    onPress={(index, isOpen, time)=>{
                        // console.log({visible:true, days: index, isOpen, prevTime : time});
                        setTimePickerState({visible:true, days: index, isOpen, prevTime : time});
                    }}
                    onPressCheckBox = {(i)=>_changeHoliday(i)}
                />
                <TextInput
                    style = {[styles.textInput, {width : 290, alignSelf : 'center'}]}
                    placeholder={`예) break time 15:00~17:00`}
                    value={breakTime}
                    onChangeText={text=>setBreakTime(text)}
                />
                </View>  


                <View style = {styles.infoBlock}>
                <View><Text style={styles.itemTitle}> {"편의시설"} </Text></View>
                    <View style={[styles.facilitiesRow, {marginTop : 15}]}>
                        <Button 
                            style={styles.facilities}
                            onPress={()=>setFacilities(prev => {return {...prev, wifi : !prev.wifi}})}>
                            <Image 
                                style={styles.facilitiesIcon}
                                source={{uri : facilities.wifi ? 'iconwifiable' : 'iconwifiunable'}}/>
                            <Text style={styles.facilitiesTitle}>{'와이파이'}</Text>
                        </Button>
                        <Button 
                            style={styles.facilities}
                            onPress={()=>setFacilities(prev => {return {...prev, battery : !prev.battery}})}>
                            <Image 
                                style={styles.facilitiesIcon}
                                source={{uri : facilities.battery ? 'iconchargerable' : 'iconchargerunable'}}/>
                            <Text style={styles.facilitiesTitle}>{'휴대폰충전'}</Text>
                        </Button>
                        <Button 
                            style={styles.facilities}
                            onPress={()=>setFacilities(prev => {return {...prev, parking : !prev.parking}})}>
                            <Image 
                                style={styles.facilitiesIcon}
                                source={{uri : facilities.parking ? 'iconparkable' : 'iconparkunable'}}/>
                            <Text style={styles.facilitiesTitle}>{'주차장'}</Text>
                        </Button>
                    </View>
                    <View style={[styles.facilitiesRow, {marginTop:25, marginBottom:20}]}>
                        <Button 
                            style={styles.facilities}
                            onPress={()=>setFacilities(prev => {return {...prev, somke : !prev.somke}})}>
                            <Image 
                                style={styles.facilitiesIcon}
                                source={{uri : facilities.somke ? 'iconsmokeable' : 'iconsmokeunable'}}/>
                            <Text style={styles.facilitiesTitle}>{'흡연실'}</Text>
                        </Button>
                        <Button 
                            style={styles.facilities}
                            onPress={()=>setFacilities(prev => {return {...prev, kids : !prev.kids}})}>
                            <Image 
                                style={styles.facilitiesIcon}
                                source={{uri : facilities.kids ? 'iconkidsable' : 'iconkidsunable'}}/>
                            <Text style={styles.facilitiesTitle}>{'키즈존'}</Text>
                        </Button>
                        <Button 
                            style={styles.facilities}
                            onPress={()=>setFacilities(prev => {return {...prev, pet : !prev.pet}})}>
                            <Image 
                                style={styles.facilitiesIcon}
                                source={{uri : facilities.pet ? 'iconpetable' : 'iconpetunable'}}/>
                            <Text style={styles.facilitiesTitle}>{'반려동물'}</Text>
                        </Button>
                    </View>
                </View>
                <Text style={styles.tail}>{`상단의 저장 버튼을 누르면 입력한 내용이 반영됩니다.`}</Text>
            </KeyboardAwareScrollView>
            </ScrollView>
            }
        </View> 
        
    )

}

export default EditSotreInfo;






const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor: Utill.color.border,
    },
    editRequestButton : {
        paddingVertical : 15,
        marginTop : 15,
        justifyContent : 'center',
        alignItems : 'center',
        borderTopWidth : 1,
        borderTopColor : Utill.color.border,
    },
    editRequestButtonText : {
        fontSize : 14,
        color : Utill.color.primary1, 
    },
    infoBlock : {
        backgroundColor: Utill.color.onColorBackground,
        marginBottom:12,
        padding:10,
    },
    infoHolder : {
        flexDirection : 'row',
        justifyContent : 'flex-start',
        padding : 10,
    },
    infoTextTitle : {
        color : Utill.color.itemTitle,
    },
    infoTextContent : {
        color : Utill.color.black,
        marginLeft : 20,
    },
    itemTitle : {
        fontSize : 14,
        fontWeight : 'bold',
        color : Utill.color.black,
    },
    itemSubTitle : {
        marginTop : 10,
        fontSize : 12,
        color : Utill.color.itemTitle,
    },
    textInput : {
        padding : 0,
        margin : 0,
        paddingBottom : 7,
        marginTop : 15,
        borderBottomWidth : 1,
        borderBottomColor : Utill.color.defaultColor,
        fontSize : 16,
    },
    facilitiesRow : {
        flexDirection:'row',
        alignSelf : 'stretch',
        marginHorizontal : 47,

    },
    facilities : {
        alignItems : 'center',
        flex : 1,
    },
    facilitiesIcon : {
        width : 40,
        height : 40,
    },
    facilitiesTitle : {
        marginTop : 8,
        fontSize : 14,
        color : Utill.color.itemTitle
    },
    tail : {
        fontSize : 12,
        color : Utill.color.defaultColor,
        paddingTop : 10,
        paddingBottom : 20,
        alignSelf : 'center',
    }

})
