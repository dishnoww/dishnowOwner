import React, {useState, useEffect} from 'react';
import {View, Text, Modal, StyleSheet, FlatList, Button, ScrollView} from 'react-native';
import { WebView } from 'react-native-webview';
import * as Utill from '../../utill';
import TextInput from './TextInput';

import Postcode from 'react-native-daum-postcode';


const testHtml = `
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
	<style> html, body { width: 100%; height: 100%; margin:0px; padding: 0px; background-color: #ececec; } </style>
</head>
<body>
	<div id="layer" style="width:100%; min-height: 100%;"></div>
	<script type="text/javascript">
    function callback() {
			var element_layer = document.getElementById('layer');
			daum.postcode.load(function(){
				new daum.Postcode({
					...window.options,
					oncomplete: function(data) {
						window.ReactNativeWebView.postMessage(JSON.stringify(data));
					},
					onresize: function(size) {
						document.getElementById('layer').style.height = size.height + 'px';
					},
					onclose: function(state) {
						callback();
					},
					width : '100%',
					height: '100%',
				}).embed(element_layer);
			});
    }
		function initOnReady(options) {
			window.options = options;
			
			var s = document.createElement('script');
			s.onreadystatechange = callback; 
			s.type = 'text/javascript'; 
			s.src = 'https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js?autoload=false';
			s.onload = callback;

			var x = document.getElementsByTagName('script')[0]; 
			x.parentNode.insertBefore(s, x);
    }
	</script>
</body>

`
const DaumPostModal = (props) => {
    const {visible, onPressCancel, onPress} = props;

	const { jsOptions, onSelected, ...otherProps } = props;


    const _onBridgeMessage = (data) => {
        const newData = {
            zipcode : data.zonecode,
            address : data.address,
        }

        console.log(data);
        onPress(newData);
        
    }
	const injectedJavaScript = `initOnReady(${JSON.stringify(jsOptions)}); void(0);`;
    const onMessage = ({nativeEvent}) => {
		try {
			nativeEvent.data && _onBridgeMessage(JSON.parse(nativeEvent.data));
		}
		catch (e) {
            console.log(e);
		}
	}

     return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onPressCancel}
        >
        <View style={styles.container}>
            <View style={styles.card}>
                <WebView
                    onLoad={()=>console.log("WebView is Ready")}
                    style = {{width : Utill.screen.width, height : Utill.screen.screenHeight}}
                    jsOptions={{ animation: true }}
                    source={{ html : testHtml, baseUrl: 'https://daum.net' }}
                    onMessage={onMessage}
                    injectedJavaScript={injectedJavaScript}
                    mixedContentMode={"compatibility"}
                    useWebKit={true}
                    onShouldStartLoadWithRequest={() => true}
                />
            </View>
        </View>
        </Modal>
     )
}

export default DaumPostModal;

const styles = StyleSheet.create({
    container : {
        width : Utill.screen.screenWidth,
        height : Utill.screen.screenHeight -  Utill.screen.bottomSafe,
        backgroundColor : '#000000AA',
    },
    card : {
        flex : 1,
        marginHorizontal : 15,
        marginVertical : 45,
        marginBottom : 80,
        backgroundColor : '#FFFFFF',
        alignSelf : 'stretch',
        
    },

});