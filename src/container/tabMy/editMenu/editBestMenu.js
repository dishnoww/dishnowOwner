import React, {Component, useState, useEffect} from 'react';
import {View, Image, Platform, ScrollView, StyleSheet,} from 'react-native';

import {useSelector, useDispatch} from 'react-redux'
import {menuMainGetServer, menuMainPutServer, menuMainImageUploadFile, menuMainStatusReset} from '../../../store/modules/myMenuMain';

import * as Utill from '../../../utill';
import {Button, Navbar, Text, LoadingModal, TextInput} from '../../../component/common';

import Toast from 'react-native-simple-toast';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';



const BestSeller =(props)=> {
    const [isPageLoaded, setIsPageLoaded] = useState(true);
    const dispatch = useDispatch();
    const {status, menu, uploadedImage} = useSelector(state=> state.MyMenuMain.toJS());
    const [isLoadingVisible, setIsLoadingVisible] = useState(false);

    // 갤러리로 부터 사진을 받을 아이의 index
    const [selectedImageBlock, setSelectedImageBlock] = useState(0);

    // 대표메뉴 목록
    const [mainMenu, setMainMenu] = useState([
        {
            name : '',
            price : '',
            image : '',
        },
        {
            name : '',
            price : '',
            image : '',
        },
        {
            name : '',
            price : '',
            image : '',
        },
    ]);

    const [uploadFlag, setUploadFlag] = useState([false, false, false]);


    useEffect (()=>{
        dispatch(menuMainGetServer());
    }, []);

    useEffect(()=> {

        // console.log(status);
        switch(status) {
            case 'menuMainGetServer' :
                setIsLoadingVisible(true);
            break;
            case 'menuMainGetServerFail' :
                setIsLoadingVisible(false);
                Toast.show('잠시 후 다시 시도해 주세요.');
                props.navigation.goBack();
            break; 
            case 'menuMainGetServerSuccess' :
                setIsLoadingVisible(false);
                if (!menu.mainMenu) break;
                    
                // console.log(menu.mainMenu);
                let parseMenu = JSON.parse(menu.mainMenu);
                // console.log(parseMenu);
                if( !parseMenu ) break;
                if( parseMenu.length == 0 ) break;
                // console.log(parseMenu);
                setMainMenu(state => {
                    let newState = state.slice();
                    for(let i=0; i<3; i++) {
                        newState[i].name = !!parseMenu[i].name ? parseMenu[i].name : '';
                        newState[i].price = !!parseMenu[i].price ? parseMenu[i].price : '';
                        newState[i].image = !!parseMenu[i].image ? parseMenu[i].image : '';
                    }
                    return newState;
                });
                
                
            break;

            // case 'menuMainImageUploadFile' :
            // break;
            case 'menuMainImageUploadFileFail' :
                setIsLoadingVisible(false);
                Toast.show('잠시 후 다시 시도해 주세요.');
            break;
            case 'menuMainImageUploadFileSuccess' :
                setMainMenu(state => {
                    let newState = state.slice();
                    for(let i=0, j=0; i<3; i++) if (uploadFlag[i]) newState[i].image = [uploadedImage[j++]];

                    // console.log(newState);
                    dispatch(menuMainPutServer({mainMenu : JSON.stringify(newState)}));
                    return newState;
                })
                setUploadFlag([false, false, false]);

            break;

            // case 'menuMainPutServer' :
            // break;
            case 'menuMainPutServerFail' :
                setIsLoadingVisible(false);
                Toast.show('잠시 후 다시 시도해 주세요.');
            break;
            case 'menuMainPutServerSuccess' :
                // console.log(menu);
                dispatch(menuMainStatusReset());
                Toast.show('저장 되었습니다.');
                props.navigation.goBack();
                setIsLoadingVisible(false);
            break;
                
        }
    }, [status]);

    // ===============================================================================
    const options = {
        storageOptions: {
            title : '사진',
            skipBackup: true,
            path: 'images',
        },
    };
    const openGallery = (from) => {
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
            console.log(uri);
            let newBestSeller = [...mainMenu];
            newBestSeller[from].image = [uri];

            // 해당 아이템을 파일로 취급
            setUploadFlag(state => {
                let newState = state.slice();
                newState[from] = true;
                return newState;
            });

            setMainMenu(newBestSeller);
            
          }
          
      
        });
      }
      
    // ===============================================================================


    const _renameMenu = (i, text) => {
        setMainMenu(state => {
            let newState = state.slice();
            newState[i].name = text;
            return newState;
        });
    }
    const _repriceMenu = (i, text) => {
        setMainMenu(state => {
            let newState = state.slice();
            newState[i].price = text;
            return newState;
        });
    }


    const _onPressSave = () => {
        if (!mainMenu[0].image[0] || !mainMenu[1].image[0] || !mainMenu[2].image[0]) return Toast.show('모든 매뉴 사진을 지정해 주세요.');
        if (!mainMenu[0].name[0] || !mainMenu[1].name[0] || !mainMenu[2].name[0]) return Toast.show('모든 매뉴들의 이름을 입력해 주세요.');
        if (!mainMenu[0].price[0] || !mainMenu[1].price[0] || !mainMenu[2].price[0]) return Toast.show('모든 매뉴들의 가격을 입력해 주세요.');

        setIsLoadingVisible(true);
        if (status == 'menuMainImageUploadFile') return;
        if (status == 'menuMainPutServer') return;
        let tempFileImages = [];
        for (let i=0; i<3; i++) {
            if (uploadFlag[i] === true) tempFileImages.push(mainMenu[i].image[0]);
        }
        setIsLoadingVisible(true);


        if (tempFileImages.length > 0) dispatch(menuMainImageUploadFile(tempFileImages));
        else dispatch(menuMainPutServer({mainMenu : JSON.stringify(mainMenu)}));
    }

    return (
        <View style={{flex:1}}>
            
            <Navbar navigation={props.navigation} onSavePress={_onPressSave} title={`대표 메뉴`}/>

            <LoadingModal visible={isLoadingVisible} />
            <ScrollView style={styles.container}>
            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                enableAutomaticScroll={true}
                enableOnAndroid={false}
            >
                <View style={styles.titleArea}>
                    <Text style={styles.title}>
                        {`사용자가 제일 먼저 보게 되는 메뉴입니다.`}
                    </Text>
                </View>
           
                <BestSellerItem 
                    id={0}
                    data={mainMenu[0]}
                    openGallery = {()=>openGallery(0)}
                    renameMenu = {(id, text)=> _renameMenu(id, text)}
                    repriceMenu = {(id, text)=> _repriceMenu(id, text)}
                />
                <BestSellerItem 
                    id={1}
                    data={mainMenu[1]}
                    openGallery = {()=>openGallery(1)}
                    renameMenu = {(id, text)=> _renameMenu(id, text)}
                    repriceMenu = {(id, text)=> _repriceMenu(id, text)}
                />
                <BestSellerItem 
                    id={2}
                    data={mainMenu[2]}
                    openGallery = {()=>openGallery(2)}
                    renameMenu = {(id, text)=> _renameMenu(id, text)}
                    repriceMenu = {(id, text)=> _repriceMenu(id, text)}
                />

                <View style={styles.tailArea}>
                    <Text style={styles.tail}>
                        {`상단의 저장 버튼을 누르면 입력한 내용이 반영됩니다.`}
                    </Text>
                </View>
                </KeyboardAwareScrollView>
            </ScrollView>
        </View> 
    )
}


export default BestSeller;


const BestSellerItem = ({id, data, openGallery, renameMenu, repriceMenu}) => {

    const [price, setPrice] = useState('');
    const [isFocus, setIsFocus] = useState(false);

    useEffect(()=> {
        setPrice(_encodePrice(data.price));
    }, [data.price]);

    const _renameMenu = (text) => {
        renameMenu(id, text);
    }

    const _encodePrice = (value) => {
        if(value.length < 3) return value;
        
        let priceCopy = _decodePrice(value).toString();
        let priceList = [];

        const first = priceCopy.length % 3;
        let head = first;
        let tail = 0;
        
        while(tail < priceCopy.length) {
            if (head!=0) priceList.push(priceCopy.slice(tail, head));
            tail = head; head += 3;
        }
        
        return `${priceList.join(',')}원`;
    }
    const _decodePrice = (value) => {
        if(value=='') return '';
        priceCopy =  value.replace(/\D/g,'');
        return priceCopy;
    }

    return (
        <View style={styles.bestMenuBlock}>
            <View style={styles.infoArea}>
                <View>
                    <Text style={styles.infoTitle}>
                        {`대표 메뉴 ${id+1}`}
                    </Text>
                </View>
                
                <View>
                    <TextInput 
                        style={styles.infoMenuTitle}
                        placeholder = "메뉴 입력"
                        value = {data.name}
                        onChangeText={_renameMenu}/>
                </View>

                <View>
                    <TextInput 
                        value={isFocus ? data.price : price} 
                        style={styles.infoMenuPrice}
                        keyboardType={'number-pad'}
                        placeholder = "가격 입력"
                        onChangeText={text=>repriceMenu(id, _decodePrice(text))}
                        onFocus={()=>setIsFocus(true)}
                        onBlur={()=>setIsFocus(false)}/>
                </View>
                
            </View>

            <View>
                <Button onPress = {()=>openGallery(id)}>
                    <ImageBlock style={styles.imageBlock} uri={data.image[0]}/>
                </Button>
            </View>
        </View>
    )
                
            
}


// 사진 버튼
const ImageBlock = (props) => {
    const {uri} = props;

    if(!!uri) {
        return  uri.substring(0,1) == "p" ?
            <Image
                style={styles.imageBlock}
                source={{uri}}
                resizeMode={'cover'}/>
        :   <FastImage
                style={[styles.imageBlock, {alignItems : 'flex-end'}]}
                source={{uri,
                        priority: FastImage.priority.high}}
                resizeMode={FastImage.resizeMode.cover}/>

    }

    return (
        <View style={[styles.imageBlock, {justifyContent : 'center', alignItems : 'center'}]}>
            <Image 
                style={styles.imageIcon} 
            source={{uri : 'iconcamera'}}
            />
        </View>
    )
}



const styles = StyleSheet.create({
    container : {
        flex : 1,
        paddingHorizontal : 15,
    }, 
    titleArea : {
        paddingVertical : 15,
        marginHorizontal : 15,
        borderBottomColor : Utill.color.border,
        borderBottomWidth : 1,
        alignItems : 'center',
    },
    title : {
        fontSize : 12,
        fontWeight : 'bold',
        color : Utill.color.black,
    },
    infoArea : {
        paddingTop : 4,
        paddingBottom : 9,
    },
    infoTitle : {
        fontSize : 12,
        fontWeight : 'bold',
    },
    infoMenuTitle : {
        fontSize : 14,
        margin : 0,
        padding : 0,
        marginTop : 28,
    },
    infoMenuPrice  : {
        fontSize : 14,
        paddingTop : 15,
        margin : 0,
    },
    bestMenuBlock : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        width : Utill.screen.width,
        borderBottomColor : Utill.color.border,
        borderBottomWidth : 1,
    },
    imageBlock : {
        marginVertical : 20.4,
        width : 102,
        height : 102,
        backgroundColor : Utill.color.secondary2,
    },
    imageIcon : {
        width : 27.2,
        height : 22,
    },
    tailArea : {
        marginTop : 20.4,
        alignItems : 'center',
    },
    tail : {
        fontSize : 12,
    },

})