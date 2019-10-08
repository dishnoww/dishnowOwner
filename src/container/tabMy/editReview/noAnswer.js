
import React, {useState, useEffect, memo} from 'react';
import {View, StyleSheet, Image, FlatList, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux'
import {reviewGetNoAnswerServer, reviewPutAnswerServer} from '../../../store/modules/myReview'


import ReviewBlock from '../../../component/tabMy/editReview/ReviewBlock';
import * as Utill from '../../../utill'
import {TextInput, ImageModal} from '../../../component/common';

import Toast from 'react-native-simple-toast';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const NoAnswer =(props)=> {
    const {status, pageNoAnswer, endReachedNoAnswer} = useSelector(state=> state.MyReview.toJS());
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
        if (!endReachedNoAnswer)
            if (status != 'reviewGetNoAnswerServer') {
                dispatch(reviewGetNoAnswerServer({page : pageNoAnswer}));
            }
    }

    const _onPressSaveAnswer = (reviewId, answer) => {
        if (!answer) return Toast.show('답변을 입력해 주세요');
        if (status != 'reviewPutAnswerServer') {
            // console.log({reviewId, answer});
            dispatch(reviewPutAnswerServer({reviewId, answer}));
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
            onEndReached={_onEndReached}
            contentContainerStyle={{alignItems : 'center', paddingBottom : 35, paddingTop : 20}}
            data={data}
            keyExtractor = {(item, index) => `item-${item.reviewId}`}
            renderItem={
                ({item}) => {
                    return (
                        <ReviewBlock 
                        item={item} 
                        onPressImage = {(index, images) => _zoomInImage(index, images)}
                        onPress={(reviewId, answer)=>_onPressSaveAnswer(reviewId, answer)}/>
                    )
                }
            }/>
         </KeyboardAwareScrollView>
        </ScrollView> 
    )
}



export default NoAnswer;



const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : Utill.color.onColorBackground,
    },
})
