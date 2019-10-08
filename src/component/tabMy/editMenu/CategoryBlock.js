import React, {Component, useState, useEffect, memo} from 'react';
import {View, Image, StyleSheet} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {Button, ImageButton, Text, TextInput} from '../../common';
import * as Utill from '../../../utill';

import MenuItem from './MenuItem';


const CategoryBlock = memo((props) => {

    const {id=0, data, renameCategory, removeCategory, createNewMenu, renameMenu, repriceMenu, removeMenu} = props;

    const [name, setName] = useState('');
    const [menuList, setMenuList] = useState([]);



    useEffect(()=>{
        setMenuList(data.menu);
    }, [data.menu]);
    useEffect(()=>{
        setName(data.name);
    }, [data.name]);



    const _renameCategory = () => { 
        renameCategory(id , name);
    }
    const _removeCategory = () => { 
        removeCategory(id);
    }
    
    return (
        <View style = {styles.container}>

            <View style={styles.categoryArea}>
                <TextInput 
                value={name}
                style = {styles.categoryInput}
                placeholder={'카테고리를 입력해 주세요 (예, 안주, 주류, 튀김 등)'}
                onChangeText={setName}
                onBlur={e=>_renameCategory()}/>
                <ImageButton 
                    onPress={()=>_removeCategory(id)}
                    style={styles.categoryIcon} 
                    source={{uri : 'iconx'}}
                    />
            </View>

            { menuList.map(
            (menu, index)=>{
                return (
                    <MenuItem 
                    key={`clml-${index}`}
                    id={index} 
                    price = {menu.price}
                    name = {menu.name}
                    renameMenu ={(mid, name)=>{renameMenu(id, mid, name)}}
                    repriceMenu ={(mid, name)=>{repriceMenu(id, mid, name)}}
                    removeMenu ={(mid)=>{removeMenu(id, mid)}}
                    />
                )
            })}
        
            
            <Button 
                onPress={()=>createNewMenu(id)}
                style={styles.menuButton}>
                <Text style={styles.menuButtonText}>{`+ 메뉴 추가`}</Text>    
            </Button>

        </View>
    )
});
export default CategoryBlock;





const styles = StyleSheet.create({
    container : {
        backgroundColor : Utill.color.onColorBackground,
        marginBottom : 15,
    },
    categoryArea : {
        flexDirection : 'row',
        paddingHorizontal : 12,
        paddingLeft : 15, 
        paddingRight : 18.4,
        alignItems : 'center',
    },
    categoryInput : {
        flex : 1,
        paddingVertical : 12,
        fontSize : 16,
        color : Utill.color.textBlack,
        textAlign : 'left',
    },
    categoryPlaceholder : {
        fontSize : 16,
        color : Utill.color.defaultColor,
    },
    categoryIcon : {
        width : 15,
        height : 15,
        padding : 3.5,
    },
    menuButton : {
        paddingVertical : 18,
        alignItems : 'stretch',
    },
    menuButtonText : {
        fontSize : 14,
        textAlign : 'center',
        color : Utill.color.primary1,
    },
    menuItem : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginHorizontal : 15,
        borderBottomWidth : 1,
        borderBottomColor : Utill.color.border,
    },
    menuItemInputTitle : {
        margin : 0,
        padding : 0,
    },
    menuItemInputPrice : {
        margin : 0,
        padding : 0,
        textAlign : 'right',
    },
    menuItemIcon : {
        width : 15,
        height : 15,
        marginRight : 3.5,
        marginLeft : 15,
    },
    won : {
        fontSize : 14,
        color : Utill.color.textBlack,
    },

})