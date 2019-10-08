import React, {useState} from 'react';
import {View, Text, Image, FlatList, StyleSheet} from 'react-native';

import * as Utill from '../../../utill';
import FastImage from 'react-native-fast-image';


export default ({photos}) => {

    const [page, setPage] = useState(0);

    const bannerScrollHandle = (event) => {
        let contentOffset = event.nativeEvent.contentOffset;
        let viewSize = event.nativeEvent.layoutMeasurement;
        let pageNum = Math.round(contentOffset.x / viewSize.width);
        setPage(pageNum);        
    }


    if (photos.length)
        return (
            <View style = {styles.container}>
                
                {!photos && <Text></Text>}
                {photos &&
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={photos}
                        horizontal={true}
                        pagingEnabled={true}
                        keyExtractor = {(item, index) => `bnv-${index}`}
                        onScroll={bannerScrollHandle}
                        renderItem= {({item}) =>{ 
                            return <View>
                                {item.substring(0,1) == "p" && 
                                    <Image
                                        style={styles.container}
                                        source={{uri:item}}
                                        resizeMode={'cover'}/>
                                }
                                {item.substring(0,1) != "p" &&  
                                    <FastImage 
                                        style = {styles.container}
                                        source = {{uri:item}}>
                                    </FastImage>
                                }
                            </View>      
                    }}/>
                }

                <View style={styles.indexArea}>
                    <Text style={styles.indexText}>{`${page+1} / ${photos.length}`}</Text>
                </View>
            </View>
        )

    return <View style = {styles.container}>
        <Text>{'등록된 사진이 없어요!'}</Text></View>
}

const styles = StyleSheet.create({
    container : {
        width : Utill.screen.screenWidth,
        height : 182 * Utill.screen.screenRatio,
        backgroundColor : Utill.color.secondary2,
        justifyContent : 'center',
        alignItems : 'center',
    },
    indexArea : {
        height : 22,
        position : 'absolute',
        color : '#FFFFFF',
        alignSelf : 'flex-end',
        backgroundColor : '#030303',
        borderRadius :11,
        paddingHorizontal : 10,
        paddingVertical : 3,        
        top : 10,
        right : 10,
    },
    indexText : {
        fontSize : 12,
        color:Utill.color.onColorBackground,
    }
})