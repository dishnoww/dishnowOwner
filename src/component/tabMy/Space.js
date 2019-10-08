import React from 'react';
import {View, StyleSheet} from 'react-native';

import * as Utill from '../../utill';

const Space = (props) => {
    return <View style={[styles.space, props.style]}><View style={{flex:1}}/> </View>
}
export default Space;

const styles = StyleSheet.create({
    space : {
        marginHorizontal:15,
        height:10,
        borderBottomColor:Utill.color.border,
        borderBottomWidth:1,
        backgroundColor : '#222222',
    },
})