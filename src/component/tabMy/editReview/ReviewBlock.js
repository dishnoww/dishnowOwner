import React, {useState, useEffect, memo} from 'react';
import {View, StyleSheet, Image, FlatList, ImageBackground} from 'react-native';

import {Text ,TextInput, Button} from '../../../component/common';
import FastImage from 'react-native-fast-image';
import * as Utill from '../../../utill'

const ReviewBlock = memo((props) => {
    const {item, onPress, onPressImage} = props;
    const [answer, setAnswer] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [date, setDate] = useState('');
    const [image, setImage] = useState(JSON.parse(item.image));

    useEffect(()=>{
        setAnswer(item.answer);
        setDate(item.createdAt.substring(0, 10).replace('-', '.').replace('-', '.'));
    },[]);

    const ImageBlock = ({list}) => {
        return list.map((item, index)=> (
                <View key = {index}>
                    <FastImage 
                    style={styles.image} 
                    source={{
                        uri : item,
                        priority: FastImage.priority.normal
                    }} 
                    resizeMode={FastImage.resizeMode.cover}/>
                </View>
            ));
    }

    const StarView =({point})=> {
        return (
            <View style={styles.starArea}>
                <Image style={styles.starIcon} source={{uri:point>0?'pictostaractive':'pictostarblur'}}/>
                <Image style={styles.starIcon} source={{uri:point>1?'pictostaractive':'pictostarblur'}}/>
                <Image style={styles.starIcon} source={{uri:point>2?'pictostaractive':'pictostarblur'}}/>
                <Image style={styles.starIcon} source={{uri:point>3?'pictostaractive':'pictostarblur'}}/>
                <Image style={styles.starIcon} source={{uri:point>4?'pictostaractive':'pictostarblur'}}/>
            </View>
        )
    }

    return(
        <View style={styles.container}>
            <View style={styles.nicknameArea}> 
                <Text style={styles.nicnameText}>{item.name}</Text>
            </View>
            <View style={styles.ratingArea}> 
            <View>
                <StarView point={item.rating}/>
            </View>

                <Text style={styles.date}>{date}</Text>
            </View>
            <View style={styles.contentArea}>
                <Text style={styles.contentText}>{item.content}</Text>
            </View>


            <View style= {styles.imageArea}>
            {
                image.map((item, index)=> (
                    <Button 
                    key = {index}
                    onPress={()=>onPressImage(index, image)}>
                    <FastImage 
                        style={styles.image} 
                        source={{
                            uri : item,
                            priority: FastImage.priority.high
                        }} 
                        resizeMode={FastImage.resizeMode.cover}/>
                    </Button>
                ))
            }
            </View>
            
            {!isEdit && 
                <Button 
                    style={styles.button}
                    onPress={()=>setIsEdit(true)}>
                    <Text style={styles.buttonText}>답변하기</Text>
                </Button>
            }
            {isEdit &&
                <View style={{alignItems : 'center'}}>
                    <ImageBackground 
                    style ={styles.answerBackground}
                    source={{uri :'reviewinput'}}>
                        <TextInput
                            style={styles.answerTextInput}
                            placeholder={' 답변을 입력해주세요.'}
                            placeholderTextColor={Utill.color.defaultColor}
                            value={answer}
                            onChangeText={setAnswer}
                            autoFocus={true}
                            multiline={true}
                        />
                    </ImageBackground>
                        <Text 
                            numberOfLines={105}
                            ellipsizeMode={'tail'}
                            style={styles.warn}
                            >
                            {`리뷰댓글을 통해 예약자의 개인정보(연락처 등)와 욕설, 비방, 위협하는 댓글을 노출 할 수 없습니다. 위반 시 개인정보보호법에 의해 5년 이하의 징역 또는 5천만원 이하의 벌금형, 정보통신망법에 의해 1년 이하의 징역 또는 5천만원의 벌금형에 처해집니다. 또한 회사는 법을 위반한 댓글을 삭제, 광고계약 해지 등의 조치를 취할 수 있습니다.`}
                        </Text>
                    <Button 
                        style={styles.buttonSubmit}
                        onPress={()=>onPress(item.reviewId, answer)}>
                        <Text style={styles.buttonSubmitText}>답변등록</Text>
                    </Button>
                </View>
            }
        </View>
    )
});

export default ReviewBlock;

const styles = StyleSheet.create({
    container : {
        marginBottom : 15,
        backgroundColor : Utill.color.onColorBackground,
        width : Utill.screen.screenWidth,
    },
    starArea : {
        flexDirection : 'row',
    },
    starIcon : {
        width : 12.8,
        height : 12,
    },
    nicknameArea : {
        marginHorizontal : 15,
    },  
    nicnameText : {
        fontWeight : 'bold',
        fontSize : 14,
        color : Utill.color.textBlack,
    },
    ratingArea : {
        flexDirection : 'row',
        marginTop : 10,
        marginHorizontal : 15,
    }, 
    date : {
        color : Utill.color.itemTitle,
        fontSize : 12,
        marginLeft : 8.4,
    },    
    contentArea : {
        flexDirection : 'row',
        marginTop : 14,
        marginHorizontal : 15,
    },
    contentText : {
        fontSize : 14,
        color : Utill.color.textBlack,
    },
    imageArea : {
        flexDirection : 'row',
        margin : 15,
    },
    image : {
        width : 60 * Utill.screen.screenRatio,
        height : 60 * Utill.screen.screenRatio,
        marginRight : 10,
    },
    answerBackground : {
        width : 348 * Utill.screen.screenRatio,
        height : 110 * Utill.screen.screenRatio,
        justifyContent : 'center',
        paddingVertical : 15,
    },
    answerTextInput : {
        flex : 1,
        textAlignVertical : 'top',
        marginHorizontal : 27,
    },
    answerPlaceHolder : {
        fontSize : 14,
        color : Utill.color.defaultColor,
    },
    answerText : {
        fontSize : 14,
        color : Utill.color.textBlack,
    },
    button : {
        margin : 15,
        width : Utill.screen.screenWidth-30,
        height : 45,
        justifyContent : 'center',
        alignItems : 'center',
        borderColor : Utill.color.border,
        borderWidth : 1,
    },
    buttonText : {
        fontSize : 14,
        color : Utill.color.primary1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    warn : {
        fontSize : 12,
        lineHeight : 15,
        color : Utill.color.defaultColor,
        marginHorizontal : 15,
        // flex : 1,
    },
    buttonSubmit : {
        margin : 15,
        paddingHorizontal : 19,
        height : 36,
        alignSelf : 'flex-end',
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : Utill.color.primary1,
        borderRadius : 18,
    },
    buttonSubmitText : {
        fontSize : 14,
        color : Utill.color.onColorBackground,
        justifyContent : 'center',
        alignItems : 'center',
    },
})