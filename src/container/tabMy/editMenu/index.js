import React, {Component, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import * as Utill from '../../../utill';
import {MenuButton2, Space} from '../../../component/tabMy';
import NavBar from '../../../component/common/Navbar';


const EditMenu = (props) => {
    const {navigation} = props;


    return (
        <View style={styles.container}>

            <NavBar navigation={navigation} SaveVisible={true} title={`메뉴 관리`}/>
            <MenuButton2 title={`전체 메뉴`} source={{uri:'pictomenu'}} onPress = {()=>navigation.navigate('MyMenuAll')}/>
            <View style={styles.space}/>
            <MenuButton2 title={`대표 메뉴`} source={{uri:'pictocamera'}} onPress = {()=>navigation.navigate('MyMenuBestSeller')}/>

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