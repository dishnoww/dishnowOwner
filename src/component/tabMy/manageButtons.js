import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import * as Utill from '../../utill'
import Button from '../common/Button';


const MenuButton = (props) => {
    return (
        <Button onPress={props.onPress}>
            <View>
            </View>
            <View>
                <Text>
                    {props.title}
                </Text>
            </View>
        </Button>
    )

}

export default (props) => {
    const {navigation} = props;
    return (
        <View style = {styles.container}>
            <MenuButton title='메뉴 관리' onPress={()=>navigation.navigate('MyMenu')}/>
            <MenuButton title='매장 관리' onPress={()=>navigation.navigate('MyStore')}/>
            <MenuButton title='리뷰 관리' onPress={()=>navigation.navigate('MyReview')}/>
        </View>
    )

}


const styles = StyleSheet.create({
    container : {
        width: Utill.screen.width,
        flexDirection:'row',
        justifyContent : 'space-around',
        alignItems : 'center',
    },
    image : {
        width:50,
        height:50,
    }
})
