import React from 'react';
import {View, Modal, StyleSheet } from 'react-native';

import Text from './Text';
import Button from './Button';


import * as Utill from '../../utill';

const LogoutNodal = (props) => {
    const {visible, onPress, onPressCancel, title, subTitle, buttonCancelText, buttonOkText, buttonOkTextColor=null} = props;

    return (
        <Modal
        style ={styles.container}
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onPressCancel}
        >
            <View style={styles.container}>
                <View style={styles.messageArea}> 
                    {!!title && <View>
                        <Text style={styles.title}>
                            {title}
                        </Text>
                    </View>}
                    <View style={styles.subTitleArea}>
                        <Text style={styles.subTitle}>
                            {subTitle}
                        </Text>
                    </View>

                    <View style={styles.buttonArea}>
                        <Button style={styles.button} onPress={onPressCancel}>
                            <Text style={[styles.buttonText, {color:Utill.color.black}]}>
                                {buttonCancelText}
                            </Text>
                        </Button>
                        <Button style={styles.button} onPress={onPress}>
                            <Text style={[styles.buttonText, {color: !!buttonOkTextColor ? buttonOkTextColor : Utill.color.vaildRed}]}>
                                {buttonOkText}
                            </Text>
                        </Button>
                    </View>

                </View>
            </View>
        </Modal>
    )
}

export default LogoutNodal;

const styles = StyleSheet.create({
    container : {
        height : Utill.screen.screenHeight,
        backgroundColor : Utill.color.modalBackCover,
        justifyContent : 'center',
        alignItems : 'center',
    },
    messageArea : {
        backgroundColor : Utill.color.onColorBackground,
        borderRadius : 20,
        alignItems : 'center',
        width : 262,
    },
    title : {
        marginTop : 35,
        fontSize : 16,
        color : Utill.color.textBlack,
    },
    subTitleArea : {
        marginTop : 18,
        marginBottom : 12,
    },
    subTitle : {
        margin : 0,
        paddingTop : 25,
        paddingBottom : 5,
        fontSize : 14,
        lineHeight : 16,
        color : Utill.color.itemTitle,
        textAlign : 'center',
    },
    buttonArea : {
        flexDirection : 'row',
    },
    button : {
        flex : 1,
        alignItems : 'center',
    },
    buttonText : {
        fontSize : 16,
        marginVertical : 20,
    }

})

