
import React, {useState, useEffect, memo} from 'react';
import {View, StyleSheet, Image, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux'
import {reviewGetServer, reviewGetAnswerServer, reviewPutAnswerServer} from '../../../store/modules/myReview'

import ReviewBlockAnswer from '../../../component/tabMy/editReview/ReviewBlockAnswer';
import * as Utill from '../../../utill'
import {TextInput, ImageModal} from '../../../component/common';

import Toast from 'react-native-simple-toast';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { ScrollView } from 'react-native-gesture-handler';

const Answer =(props)=> {
    const {status, pageAnswer, endReachedAnswer} = useSelector(state=> state.MyReview.toJS());
    const dispatch = useDispatch();
    const {data} = props;
    const [imageModal, setImageModal] = useState({visible : false, urls : []});

    const _zoomInImage = (index, imageUrls) => {
        setImageModal({visible : true, urls : imageUrls, index});
    }
    const _zoomOutImage = () => {
        setImageModal({visible : false, urls : []});
    }

    

    const _onEndReached = () => {
        if (!endReachedAnswer)
            if (status != 'reviewGetAnswerServer')
                dispatch(reviewGetAnswerServer({page : pageAnswer}));
    }
    const _onPressSaveAnswer = (reviewId, answer) => {
        if (status != 'reviewPutAnswerServer') {
            if (answer.length == 0) return Toast.show('답변을 입력해주세요.');
            // console.log({reviewId, answer});
            dispatch(reviewPutAnswerServer({reviewId, answer}));
        }
    }
    const _onPressDeleteAnswer = (reviewId) => {
        if (status != 'reviewPutAnswerServer') {
            // console.log({reviewId});
            dispatch(reviewPutAnswerServer({reviewId}));
        }
    }

    return ( 
        <ScrollView
            style={styles.container}
        >
        <ImageModal 
            visible={imageModal.visible} 
            urls={imageModal.urls} 
            onDismiss={_zoomOutImage}
            index = {imageModal.index}
        />
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            enableAutomaticScroll={true}
            enableOnAndroid={false}
        >
            <FlatList
            contentContainerStyle={{alignItems : 'center', paddingBottom : 35, paddingTop : 20}}
            onEndReached = {_onEndReached}
            data={data}
            keyExtractor = {(item, index) => `item-${item.reviewId}`}
            renderItem={
                ({item}) => {
                    return (
                        <ReviewBlockAnswer 
                        item={item} 
                        onPressImage = {(index, images) => _zoomInImage(index, images)}
                        onPress={(reviewId, answer)=>_onPressSaveAnswer(reviewId, answer)}
                        onPressDelete={(reviewId)=>_onPressDeleteAnswer(reviewId)}/>
                    )
                }
            }/>
        </KeyboardAwareScrollView>
        </ScrollView>
    )
}

export default Answer;



const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : Utill.color.onColorBackground,
    },
})
