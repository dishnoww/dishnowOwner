import React, {Component, useState, useEffect, memo} from 'react';
import {View, StyleSheet} from 'react-native';


import {ImageButton, Text, TextInput} from '../../common';
import * as Utill from '../../../utill';;

const MenuItem = memo((props) => {
    const {id, renameMenu, repriceMenu, removeMenu} = props;
    const [price, setPrice] = useState('');
    const [isFocus, setIsFocus] = useState(false);

    useEffect(()=> {
        // console.log(props.price);
        setPrice(_encodePrice(props.price));
        // setPrice(props.value);
    }, [props.price]);


    const _removeMenu = () => {
        removeMenu(id);
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
        priceCopy = value.replace(/\D/g,'');
        return priceCopy;
    }

    return (
        <View style={styles.menuItem}>
            <TextInput 
                value={props.name} 
                style={styles.menuItemInputTitle} 
                placeholder = '메뉴 입력'
                onChangeText={text=>renameMenu(id, text)}
                />
            <View style={{flexDirection:'row', alignItems : 'center'}}>
                <TextInput 
                    keyboardType ={'number-pad'}
                    value={isFocus ? props.price : price} 
                    style={styles.menuItemInputPrice}  
                    placeholder = '가격 입력' 
                    onChangeText={text=>repriceMenu(id, _decodePrice(text))}
                    onFocus={()=>setIsFocus(true)}
                    onBlur={()=>setIsFocus(false)}
                />
                <ImageButton 
                    style={styles.menuItemIcon} 
                    resizeMode={'contain'} 
                    source={{uri : 'iconminus'}}
                    onPress = {()=> _removeMenu()}
                />
            </View>
        </View>
    )
});

export default MenuItem;





const styles = StyleSheet.create({
    menuItem : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginHorizontal : 15,
        borderBottomWidth : 1,
        borderBottomColor : Utill.color.border,
    },
    menuItemInputTitle : {
        flex : 1,
        paddingLeft : 0,
        marginLeft : 0,
        paddingTop : 20,
        paddingBottom : 15,
        // textAlign : 'left',
    },
    menuItemInputPrice : {
        fontSize : 14,
        margin : 0,
        paddingTop : 20,
        paddingBottom : 15,
        textAlign : 'left',
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