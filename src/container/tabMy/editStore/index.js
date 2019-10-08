

import React from 'react';
import {View, StyleSheet} from 'react-native';

import * as Utill from '../../../utill';
import {MenuButton2,} from '../../../component/tabMy';
import NavBar from '../../../component/common/Navbar';


const EditMenu = (props) => {
    const {navigation} = props;

    return (
        <View style={styles.container}>

            <NavBar navigation={navigation} SaveVisible={true} title={`매장 관리`}/>
            <MenuButton2 title={`매장 정보`} source={{uri:'pictomenu'}} onPress = {()=>navigation.navigate('MyStoreInfo')}/>
            <View style={styles.space}/>
            <MenuButton2 title={`매장 사진`} source={{uri:'pictostore'}} onPress = {()=>navigation.navigate('MyStorePhoto')}/>

        </View>
    )
    
}

export default EditMenu;


const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    space : {
        marginHorizontal : 15,
        borderBottomColor:Utill.color.border,
        borderBottomWidth:1
    },
})