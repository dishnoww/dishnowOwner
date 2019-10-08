

import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux'
import {reviewGetServer, reviewPutAnswerServer} from '../../../store/modules/myReview'

import {Text ,Button, Navbar, LoadingModal} from '../../../component/common'
import Answer from './answer';
import NoAnser from './noAnswer';

import Toast from 'react-native-simple-toast';

import * as Utill from '../../../utill'


const EditReview = (props) => {
    const {status, answer, noAnswer, count, pageAnswer, pageNoAnswer} = useSelector(state=> state.MyReview.toJS());
    const dispatch = useDispatch();
    const [isLoadingVisible, setIsLoadingVisible] = useState(true);
    const [page, setPage] = useState(1);
    
    useEffect (()=> {
        dispatch(reviewGetServer());
    }, []);

    useEffect(()=> {
        // console.log(status);
        switch(status) {
            case 'reviewGetServer' : 
            break;
            case 'reviewGetServerFail' : 
                Toast.show('잠시 후 다시 시도해 주세요.');
                props.navigation.goBack();
                setIsLoadingVisible(false);
            break;
            case 'reviewGetServerSuccess' : 
                setIsLoadingVisible(false);
            break;
            case 'reviewPutAnswerServer' : 
                setIsLoadingVisible(true);
            break;
            case 'reviewPutAnswerServerFail' : 
                Toast.show('잠시 후 다시 시도해 주세요.');
                setIsLoadingVisible(false);
            break;
            case 'reviewPutAnswerServerSuccess' : 
                Toast.show('등록 되었습니다.');
                dispatch(reviewGetServer());
            break;

            // case 'reviewGetAnswerServer' : 
            // break;
            case 'reviewGetAnswerServerFail' : 
                Toast.show('잠시 후 다시 시도해 주세요.');
                props.navigation.goBack();
                setIsLoadingVisible(false);
            break;
            // case 'reviewGetAnswerServerSuccess' : 
            // break;
            // case 'reviewGetNoAnswerServer' : 
            // break;
            case 'reviewGetNoAnswerServerFail' : 
                Toast.show('잠시 후 다시 시도해 주세요.');
                props.navigation.goBack();
                setIsLoadingVisible(false);
            break;
            // case 'reviewGetNoAnswerServerSuccess' : 
            // break;
        }
    }, [status]);

    

    return (
        <View style={styles.container}>
            <Navbar navigation={props.navigation} title={`리뷰 관리`}/>
            <LoadingModal visible={isLoadingVisible} />

            <View style={styles.tabArea}>
                <Button 
                    style={page==1 ? styles.button : styles.buttonUnSelected} 
                    onPress={()=>setPage(1)}>
                    <Text
                        style={page==1 ? styles.buttonTitle : styles.buttonTitleUnSelected}
                    >
                        {`미답변한 리뷰(${count.noAnswer})`}
                    </Text>
                </Button>

                <Button 
                    style={page==2 ? styles.button : styles.buttonUnSelected} 
                    onPress={()=>setPage(2)}>
                    <Text
                        style={page==2 ? styles.buttonTitle : styles.buttonTitleUnSelected}
                    >
                        {`답변한 리뷰(${count.answer})`}
                    </Text>
                </Button>
            </View>
            <Screen page={page} data={page==1 ? noAnswer : answer}/>
        </View>
    )
}
const Screen =(props)=> {
    if(props.page == 2) return <Answer data={props.data}/>
    return <NoAnser data={props.data}/>
}


export default EditReview;

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
    tabArea : {
        flexDirection : 'row',
        width : Utill.screen.screenWidth,
        paddingHorizontal : 22.5,
        justifyContent : 'center',
        alignItems : 'center',
    },
    screen : {
        flex : 1,
    },
    button : {
        flex : 1,
        borderBottomWidth : 2,
        justifyContent : 'center',
        alignItems : 'center',
        height : 39,
    },
    buttonUnSelected : {
        flex : 1,
        top : -0.25,
        borderBottomWidth : 1,
        borderBottomColor : Utill.color.defaultColor,
        justifyContent : 'center',
        alignItems : 'center',
        height : 39.25,
    },
    buttonTitle : {
        color : Utill.color.textBlack,
        fontSize : 16,
    },
    buttonTitleUnSelected : {
        color : Utill.color.border,
        fontSize : 16,
    }
})