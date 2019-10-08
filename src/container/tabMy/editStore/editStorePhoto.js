import React, {Component, useState, useEffect} from 'react';
import {View, Text, Image, Platform, ScrollView, StyleSheet} from 'react-native';

import * as Utill from '../../../utill';
import {Button, Navbar, LoadingModal, TextInput} from '../../../component/common/';
import BannerView from '../../../component/tabMy/editStore/bannerView' ;

import {useSelector, useDispatch} from 'react-redux'
import {imageGetServer, imageUploadFile, imageUploadLink, imageStatusReset} from '../../../store/modules/myStoreImage';

import Toast from 'react-native-simple-toast';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-picker';



const BestSeller =(props)=> {
    const { status, image, error, willUploadUrl } = useSelector(state => state.MyStoreImage.toJS());
    const dispatch = useDispatch();

    const [isLoadingVisible, setIsLoadingVisible] = useState(false);              // 갤러리 Modal 표시
    
    const [selectedPhotoBlock, setSelectedPhotoBlock] = useState(0);            // 갤러리로 부터 사진을 받을 아이의 index
    const [photo, setPhoto] = useState(['','','','','']);                       // 대표메뉴 목록
    const [origin, setOrigin] = useState([]);
    const [convert, setConvert] = useState([]);

    const [banner, setBanner] = useState([]);                                   // 목록에 있는 사지만 카피해서 넣을 공간

    useEffect(()=> {
        dispatch(imageGetServer());
    }, []);


    useEffect(()=> {
        switch (status) {
            case 'imageGetServer' : 
                setIsLoadingVisible(true); 
            break;
            case 'imageGetServerFail' : 
            console.log(error);
                setIsLoadingVisible(false); 
            break;
            case 'imageGetServerSuccess' :
                let parseMain = JSON.parse(image.mainImage);
                let parseSub = JSON.parse(image.subImage);
                let newPhotos = parseMain.concat(parseSub);

                const n = newPhotos.length;
                if (n == 5) setPhoto(newPhotos);
                else {
                    for(let i=0; i<5-n; i++) {
                        newPhotos.push('');
                    }
                    setPhoto(newPhotos);
                }
            setIsLoadingVisible(false); 
            break;

            case 'imageUploadFile' : 
                setIsLoadingVisible(true); 
            break;
            case 'imageUploadFileFail' : 
            console.log(error);
                setIsLoadingVisible(false); 
            break;
            case 'imageUploadFileSuccess' :
                let tempOrigin = origin.slice();
                for(let i=0,j=0;i<tempOrigin.length;i++) {
                    if (typeof tempOrigin[i] == 'number') tempOrigin[i] = willUploadUrl[j++];
                    if (j>convert.length-1) break;
                }
                dispatch(imageUploadLink(tempOrigin.filter(image=>!!image)));
            break;
            case 'imageUploadLink' : 
                setIsLoadingVisible(true); 
            break;
            case 'imageUploadLinkFail' : 
                setIsLoadingVisible(false);
                Toast.show('잠시 후 다시 시도해 주세요.');
                props.navigation.goBack();
                console.log(error);
            break;
            case 'imageUploadLinkSuccess' :
                dispatch(imageStatusReset());
                Toast.show('저장 되었습니다.');
                props.navigation.goBack();
                setIsLoadingVisible(false);
            break;
            default : 
                setIsLoadingVisible(false); 
            break;
        }
    }, [status])
    
    // ==========================================================================================================
    useEffect(()=> {
        setBanner(photo.filter(item=>item!==''));
    }, [photo])
     // ===============================================================================
     const options = {
        storageOptions: {
            title : '사진',
            skipBackup: true,
            path: 'images',
        },
    };
    const pickPhoto = (from) => {


        ImagePicker.launchImageLibrary(options, (response) => {
          console.log('Response = ', response);
        
             if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const uri = Platform.OS=='ios' ? response.uri : `file:${response.path}`;
                console.log('\n\n\n\n\n\n');
                console.log(uri);

                let newPhoto = [...photo];
                newPhoto[from] = uri;

                setPhoto(newPhoto);
                console.log(newPhoto);
            }
          
      
        });
      }
      
    // ===============================================================================
    const openGallery = (from) => {

        if (!photo[from]) {
            setSelectedPhotoBlock(from);
            pickPhoto(from);
        } else {
            let newPhoto = photo.slice();
            newPhoto[from] = '';
            setPhoto(newPhoto);
        }
    }


    const _isListEmpty = (list) => {
        for(let i=0; list.length<0; i++) {
            if(list[i] != '') return false;
        }
        return true;
    }
    // ==========================================================================================================

    const _onPressSave = () => {
        if (!photo[0]) return Toast.show('외관 사진이 없습니다.');

        let tempOrigin = photo.slice();
        let tempImageList = [];

        for(let i=0, j=0; i< tempOrigin.length; i++) {
            if (!tempOrigin[i]) continue;
            if ((tempOrigin[i].charAt() == 'f') || (tempOrigin[i].charAt() == 'p')){
                tempImageList[j] = tempOrigin[i];
                tempOrigin[i] = j;
                j++;
            } 
        }
        setOrigin(tempOrigin);
        setConvert(tempImageList);
        if (!!tempImageList.length) dispatch(imageUploadFile(tempImageList));
        else dispatch(imageUploadLink(banner));
    }
    
// View
    return (
        <View style={{flex:1}}>

            <Navbar navigation={props.navigation} title={'매장사진'} onSavePress={_onPressSave}/>

            {/* modals */}
            <LoadingModal visible={isLoadingVisible}/>
            <ScrollView style={{flex:1}}>

                <BannerView photos = {banner}/>

                <View style={{paddingHorizontal:15}}>
                    <View style={{marginBottom : 15}}>
                        <Text style={styles.title}>{`외관 사진 (필수 - 최대 1장)`}</Text>
                    </View>
                    <Button onPress = {()=>openGallery(0)}>
                        <PhotoBlock 
                            index = {0}
                            uri = {photo[0]}
                            // uri = {{uri : 'ph://106E99A1-4F6A-45A2-B320-B0AD4A8E8473/L0/001'}}
                        />
                    </Button>
                    <View style={{marginBottom : 10}}>
                        <Text style={styles.title}>{`내부 사진 (선택 - 최대 4장)`}</Text>
                    </View>
                    <View style={{marginBottom : 10}}>
                        <Text style={styles.subTitle}>{`음식, 가게 내부, 이벤트 등의 손님에게 보여질 사진을 올려주세요.`}</Text>
                    </View>
                    <View style={styles.AddtionalArea}>
                    <AdditionalPhotoList bundle = {{photo:photo.slice(1), openGallery:(index)=>openGallery(index)}}/>
                    </View> 
                </View>
                <View style={styles.tailArea}>
                        <Text style={styles.tail}>
                            {`상단의 저장 버튼을 누르면 입력한 내용이 반영됩니다.`}
                        </Text>
                    </View>
            </ScrollView>
            
        </View> 
    )
}


export default BestSeller;


const AdditionalPhotoList = ({bundle}) => {
    return bundle.photo.map (
        (item, index) => {
            return (
                <Button key={`${index}`}
                    onPress = {()=>bundle.openGallery(index+1)}>
                    <PhotoBlock 
                        index = {index+1}
                        uri = {item}
                    />
                </Button>
            )
        }
    )
}


// 사진 버튼
const PhotoBlock = (props) => {
    const {uri} = props;
    
    if(!!uri) {
        return (
            <View
                style={{
                    width : 60, 
                    height : 60,
                }} 
            >
                {uri.substring(0,1) == "p" ?
                    <Image
                        style={styles.photoBlock}
                        source={{uri}}
                        resizeMode={'cover'}/>
                :   <FastImage
                        style={styles.photoBlock}
                        source={{uri,
                                priority: FastImage.priority.high}}
                        resizeMode={FastImage.resizeMode.cover}/>
                }
                <View style={{
                    position : 'absolute',
                    right : 0,
                    Top : 0,
                    backgroundColor:Utill.color.black
                }}>
                
                <Image 
                    style={{
                        width : 16, 
                        height : 16, 
                        margin : 2
                    }} 
                    resizeMode={'contain'} 
                    source={{uri : 'iconxwhite'}}/>
                
                </View>
            </View>
        )
    }
    
    return (
        <View style={[styles.photoBlock, {justifyContent : 'center', alignItems : 'center'}]}>
            <Image style={styles.photoIcon} 
            source={{uri : 'iconcamera'}}/>
        </View>
    )
}



const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
    bannerImage : {
        width : Utill.screen.width,
        height : 182 * Utill.screen.screenRatio,
    },
    bestMenuBlock : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        width : Utill.screen.width,
    },
    photoBlock : {
        width : 60,
        height : 60,
        backgroundColor : Utill.color.secondary2,
    },
    AddtionalArea : {
        flexDirection : 'row',
        width : 270,
        justifyContent :'space-between',
    },
    title : {
        fontSize : 14,
        fontWeight : 'bold',
        marginTop : 30,
    },
    photoIcon : {
        width : 27.2,
        height : 22,
    },
    subTitle : {
        fontSize : 12,
    },
    tailArea : {
        marginHorizontal : 15,
        marginTop : 73,
        paddingTop : 20,
        paddingBottom : 27,
        alignItems : 'center',
        borderTopColor : Utill.color.border,
        borderTopWidth : 1,
    },
    tail : {
        fontSize : 12,
        color : Utill.color.defaultColor,
    },

})