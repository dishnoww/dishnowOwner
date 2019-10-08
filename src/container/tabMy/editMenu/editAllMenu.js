import React, {useState, useEffect} from 'react';
import {View, Image, FlatList, StyleSheet , ScrollView} from 'react-native';


import {Button, Navbar, LoadingModal, Text, TextInput} from '../../../component/common';
import * as Utill from '../../../utill';

import {useSelector, useDispatch} from 'react-redux'
import {menuSubGetServer, menuSubPutServer, menuSubStatusReset} from '../../../store/modules/myMenuSub';

import Toast from 'react-native-simple-toast';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


import CategoryBlock from '../../../component/tabMy/editMenu/CategoryBlock';


const EditSubMenu = (props) => {    
    const {status, menu} = useSelector(state=> state.MyMenuSub.toJS());
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoadingVisible, setIsLoadingVisible] = useState(false);
    const [categoryList, setCategoryList] = useState(null);

    useEffect(()=>{
        dispatch(menuSubGetServer());
    },[]);


    useEffect(()=> {
        switch(status) {
            case 'menuSubGetServer' :
            break; 
            case 'menuSubGetServerFail' :
                Toast.show('잠시 후 다시 시도해 주세요.');
                setIsLoaded(true);
                setIsLoadingVisible(false);
                props.navigation.goBack();
            break; 
            case 'menuSubGetServerSuccess' :
                    setIsLoaded(true);
                    setCategoryList(list => {
                        // {name : '', menu : [{ name : '', price : ''}}]};
                        // console.log('get menu');
                        // console.log(menu);
                        let newList = menu.subMenu ? JSON.parse(menu.subMenu).slice() : [{name : '', menu:[{name : '', price: ''}]}];
                        newList.push({name : '@appUi/Button'});
                        // console.log(newList);
                        return newList;
                    });
                    setIsLoadingVisible(false);
            break; 

            case 'menuSubPutServer' :
                    setIsLoadingVisible(true);
            break; 
            case 'menuSubPutServerFail' :
                Toast.show('잠시 후 다시 시도해 주세요.');
                setIsLoadingVisible(false);
            break; 
            case 'menuSubPutServerSuccess' :
                dispatch(menuSubStatusReset());
                Toast.show('저장 되었습니다.');
                props.navigation.goBack();
                setIsLoadingVisible(false);
            break; 
        }
    }, [status]);
    
    
    
    const _onPressSave = () => {
        if (status != 'menuSubPutServer') {
            const data = categoryList.slice(0, -1);
            // console.log(data);
            if (_validate(data)) dispatch(menuSubPutServer({subMenu : JSON.stringify(data)}));
        }
    }

    // ==================================================================================
    // update category
    const _createNewCategory = () => {
        setCategoryList( list => {
            let newCategoryList = list.slice();
            newCategoryList.splice(-1, 0, {name : '', menu:[{name : '', price: ''}]});    
            return newCategoryList;
        });
    }
    const _renameCategory = (categoryId, name) => {
        setCategoryList(list => {
            let newCategoryList = list.slice();
            newCategoryList[categoryId].name = name;
            return newCategoryList;
        });
    }

    const _removeCategory = (categoryId) => {
        setCategoryList(list => {
            let newCategoryList = list.slice();
            newCategoryList.splice(categoryId, 1);
            // console.log(newCategoryList);
            return newCategoryList
        });
    }

    // update menu
    const _createNewMenu = (categoryId) => {
        setCategoryList(list => {
            let newCategoryList = list.slice();
            newCategoryList[categoryId].menu.push({name : '', price : ''});
            return newCategoryList
        });
    }
    
    const _renameMenu = (categoryId, menuId, name) => {
        setCategoryList(list => {
            let newCategoryList = list.slice();
            newCategoryList[categoryId].menu[menuId].name = name;
            return newCategoryList;
        });
    }
    const _repriceMenu = (categoryId, menuId, price) => {
        setCategoryList(list => {
            let newCategoryList = list.slice();
            newCategoryList[categoryId].menu[menuId].price = price;
            return newCategoryList;
        });
    }

    const _removeMenu = (categoryId, menuId) => {
        setCategoryList(list => {
            let newCategoryList = list.slice();
            newCategoryList[categoryId].menu.splice(menuId, 1);
            return newCategoryList
        });
    }
    // ==================================================================================
    // api

    const _validate = (list) => {
        // console.log(list);
        try {
            if (list.length == 0) return false;
            for(let i=0; i<list.length; i++) {
                // console.log(list[i]);
                if (!list[i].name) {
                     Toast.show(`${i+1}번 카테고리의 이름을 확인해 주세요.`);
                     return false;
                }

                for(let j=0;j<list[i].menu.length; j++) {
                    // console.log(j);
                    // console.log(list[i].menu[j]);
                    if (!list[i].menu[j].name) {
                        Toast.show(`${list[i].name}의 ${j+1}번 메뉴 이름을 확인해 주세요.`);
                        return false;
                    }
                    if (!list[i].menu[j].price) {
                        Toast.show(`${list[i].name}의 ${list[i].menu[j].name}의 가격을 확인해 주세요.`);
                        return false;
                    }
                }
            }
            return true;
        } catch(e) {
            console.log(e);
            return false;
        }
    }
    // ==================================================================================



    return (
        <View style={styles.container}>
        <Navbar navigation={props.navigation} onSavePress={_onPressSave} title={`전체 메뉴`}/>
        <ScrollView >
        
            <LoadingModal visible={isLoadingVisible || !isLoaded} />
            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                enableAutomaticScroll={true}
                enableOnAndroid={false}
            >
            {isLoaded && <FlatList
                keyExtractor = {(item, index) => item.name == '@appUi/Button' ? `cl-btn` : `cl-${index}`}
                data={categoryList}
                renderItem={
                    ({item, index}) => {    
                        
                        if (item.name == '@appUi/Button') 
                            return (
                                <View style={{alignItems : 'center'}}>
                                    <Button 
                                        key={`cl-btn`}
                                        onPress={_createNewCategory}
                                        style={styles.addbutton}>
                                        <Text style={styles.addbuttonText}>{`+ 카테고리 추가`}</Text>
                                    </Button>
                                    <Text style={styles.tail}>{`상단의 저장 버튼을 누르면 입력한 내용이 반영됩니다.`}</Text>
                                </View>
                            )
                        else return (
                            <CategoryBlock
                                id={index}
                                data={item}
                                removeCategory = {(id)=>_removeCategory(id)}
                                renameCategory = {(id, text)=> _renameCategory(id, text)}
                                createNewMenu = {(id, text)=> _createNewMenu(id, text)}
                                removeMenu  ={(id, mid)=> _removeMenu(id, mid)}
                                renameMenu = {(id, menuId, text)=> _renameMenu(id, menuId, text)}
                                repriceMenu = {(id, menuId, text)=> _repriceMenu(id, menuId, text)}
                            /> 
                        )
                    }   
                }
            />}
        </KeyboardAwareScrollView>
        </ScrollView>
        </View>
    )


}

export default EditSubMenu;



const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : Utill.color.border,
    },
    addbutton : {
        backgroundColor: Utill.color.primary1,
        padding : 11,
        alignItems : 'center',
        alignSelf : 'stretch',
    },
    addbuttonText : {
        fontSize : 16,
        fontWeight : 'bold',
        color : Utill.color.onColorBackground,
    },
    tail : {
        fontSize : 12,
        color : Utill.color.defaultColor,
        paddingTop : 20,
        paddingBottom : 20,
    }
})
