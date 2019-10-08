import React from 'react';
import {View, Modal, StyleSheet } from 'react-native';

import Text from './Text';
import Button from './Button';


import * as Utill from '../../utill';

const Alert = (props) => {
    const {visible, onPress, title, buttonText} = props;

    return (
        <Modal
        style ={styles.container}
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onPress}
        >
            <View style={styles.container}>
                <View style={styles.messageArea}> 
                    <Text style={styles.title}>
                        {title}
                    </Text>
                    <Button style={styles.button} onPress={onPress}>
                        <Text style={styles.buttonText}>
                            {buttonText}
                        </Text>
                    </Button>
                </View>
            </View>
        </Modal>
    )
}

export default Alert;

const styles = StyleSheet.create({
    container : {
        height : Utill.screen.screenHeight,
        backgroundColor : Utill.color.modalBackCover,
        justifyContent : 'center',
        alignItems : 'center',
    },
    messageArea : {
        backgroundColor : Utill.color.onColorBackground,
        borderRadius : 10,
        padding : 40,
        paddingBottom : 20,
        alignItems : 'center',
    },
    title : {
        marginBottom : 39,
        fontSize : 16,
        color : Utill.color.textBlack,
    },
    button : {
        alignItems : 'center',
    },
    buttonText : {
        color : Utill.color.primary1,
        fontSize : 16,
    }

})

