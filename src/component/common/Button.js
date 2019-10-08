import React, {Component} from 'react'
import {TouchableOpacity, TouchableNativeFeedback, View} from 'react-native';


export default (props) => {
        return (
                <TouchableOpacity 
                onPress={props.onPress} 
                style = {props.style} 
                hitSlop = {props.hitSlop ? props.hitSlop : {top : 7, bottom : 7, right : 7, left : 7}}>

                        {props.children}

                </TouchableOpacity>
            
        )
}