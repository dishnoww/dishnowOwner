import React from 'react';
import {View, Modal, StyleSheet, ActivityIndicator } from 'react-native';

import Text from './Text';
import Button from './Button';


import * as Utill from '../../utill';

const LoadingModal = (props) => {
    const {visible, onPress, onPressCancel, title, subTitle, buttonCancelText, buttonOkText} = props;

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onPressCancel}
        >
            <View style={styles.container}>
                <ActivityIndicator size={'large'} color={Utill.color.primary1}/> 
            </View>
        </Modal>
    )
}

export default LoadingModal;

const styles = StyleSheet.create({
    container : {
        width : Utill.screen.screenWidth,
        height : Utill.screen.screenHeight,
        backgroundColor : Utill.color.modalBackCover,
        justifyContent : 'center',
        alignItems : 'center',
    },
})

