import React, {useState} from 'react';
import {View, StyleSheet, Image, ImageBackground} from 'react-native';
import {Text, Button, NoShowModal, DaumPostModal} from '../component/common';

import moment from 'moment';
import * as Utill from '../utill';

const Test =(props) => {
    const [visible, setVisible] = useState(false);


    return (
        <View style={{flex : 1}}>
            <DaumPostModal 
                visible={visible}
                onPress={()=>setVisible(false)}
                onPressCancel={()=>setVisible(false)}
                />

                <Button style={{flex:1}} onPress={()=> setVisible(true)}>
                    <Text style={{flex:1}}>모달! 당신의 아들이 돌아왔소</Text>
                </Button>

            
        </View>
    )
}

export default Test;
