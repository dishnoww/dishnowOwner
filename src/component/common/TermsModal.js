import React from 'react';
import {View, Text, Modal, StyleSheet} from 'react-native';
import { WebView } from 'react-native-webview';
import * as Utill from '../../utill';

import {Button} from '../../component/common';

const TermsModal = (props) => {
    const {visible, title = '이용약관', uri, onPressCancel} = props;


    const _onBridgeMessage = (data) => {
        const newData = {
            zipcode : data.zonecode,
            address : data.address,
        }

        // console.log(newData);
        onPress(newData);
        
    }

     return (
        <Modal
            animationType='none'
            transparent={false}
            visible={visible}
            onRequestClose={onPressCancel}
        >
            <View style={styles.container}>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding:15}}> 
                    <Text>{title}</Text>
                    <Button onPress={onPressCancel}>
                        <Text style={{color:'#AA0F0F'}}>{`뒤로`}</Text>
                    </Button>
                </View>
                <WebView source={{ uri }}/>
            </View>
        </Modal>
     )
}

export default TermsModal;

const styles = StyleSheet.create({
    container : {
        paddingTop : Utill.screen.topSafe,
        width : Utill.screen.screenWidth,
        height : Utill.screen.screenHeight,
        backgroundColor : '#FFFFFF',
    },
    card : {
        flex : 1,
        marginHorizontal : 15,
        marginVertical : 45,
        backgroundColor : '#FFFFFF',
        alignSelf : 'stretch',
        
    },

});

