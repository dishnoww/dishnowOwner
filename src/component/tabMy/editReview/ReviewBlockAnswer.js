import React, {useState, useEffect, memo} from 'react';
import {View, StyleSheet, Image, FlatList, ImageBackground} from 'react-native';

import {Text ,Button, TextInput} from '../../../component/common';
import FastImage from 'react-native-fast-image';
import * as Utill from '../../../utill'

const ReviewBlockAnswer = memo((props) => {
    const {item, onPress, onPressDelete, onPressImage} = props;
    const [answer, setAnswer] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [date, setDate] = useState('');
    const [image, setImage] = useState(JSON.parse(item.image));

    useEffect(()=>{
        setAnswer(item.answer);
        setDate(item.createdAt.substring(0, 10).replace('-', '.').replace('-', '.'));
    },[]);

 

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
            {item.image.length > 0 && 
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
            }

            <View style={{alignItems : 'center'}}>
                <View style={styles.answerTextInputBackground}>
                    <TextInput
                        style={styles.answerTextInput}
                        placeholder={' 답변을 입력해주세요.'}
                        placeholderTextColor={Utill.color.defaultColor}
                        value={answer}
                        onChangeText={setAnswer}
                        multiline={true}
                    />
                </View>
                <View style={styles.buttonArea}>
                    <Button 
                        style={styles.button}
                        onPress={()=>onPressDelete(item.reviewId)}>
                        <Text style={styles.buttonText}>삭제</Text>
                    </Button>
                    <Button 
                        style={styles.button}
                        onPress={()=>onPress(item.reviewId, answer)}>
                        <Text style={styles.buttonText}>수정</Text>
                    </Button>
                </View>
            </View>
            
        </View>
    )
});

export default ReviewBlockAnswer;

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
    answerTextInputBackground : {
        alignSelf : 'stretch',
        height : 92 * Utill.screen.screenRatio,
        paddingHorizontal : 12,
        marginHorizontal : 15,
        backgroundColor : Utill.color.border,
    },
    answerTextInput : {
        flex : 1,
        textAlignVertical : 'top',
    },
    answerPlaceHolder : {
        fontSize : 14,
        color : Utill.color.defaultColor,
    },
    answerText : {
        fontSize : 14,
        color : Utill.color.textBlack,
    },
    buttonArea : {
        flexDirection : 'row',
        marginTop : 15,
        marginHorizontal : 15,
        justifyContent : 'flex-end',
        width : Utill.screen.screenWidth-30,
    },
    button : {
        marginHorizontal : 10,
        alignSelf : 'flex-end',
        justifyContent : 'center',
        alignItems : 'center',
    },
    buttonText : {
        fontSize : 14,
        color : Utill.color.primary1,
        justifyContent : 'center',
        alignItems : 'center',
    },
})