import React, {Component} from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {Text,Button} from './index'
import * as Utill from '../../utill'
 


const Navbar = (props) => {
    const {navigation, title='디쉬나우', onSavePress, BackbuttonDisable=false, paddingHorizontal = 15} = props;
    return (    
        <View style={styles.container}>
                <View style={[styles.logo, {width : Utill.screen.screenWidth, height: (60*Utill.screen.screenRatio) + Utill.screen.topSafe, paddingTop:Utill.screen.topSafe, position: 'absolute', alignItems : 'center', justifyContent : 'center'}]}>
                    <Text style ={styles.titleText}>{title}</Text>
                </View>
                <BackButton onPress={()=>{if(!BackbuttonDisable)navigation.pop()}} paddingHorizontal={paddingHorizontal}/>
                

                {onSavePress &&
                    <SaveButton onPress={onSavePress} paddingHorizontal={paddingHorizontal}/>
                }

                
                

                
        </View>
    )
}


export default Navbar;




const BackButton = ({onPress, paddingHorizontal}) => {
    
    return (
        <Button 
            style={{
                left : paddingHorizontal,
                Top : Utill.screen.topSafe,
            }}
            onPress={onPress} 
        >
            <Image style={styles.backBottonIcon} source={{uri : 'iconsquarebracket'}} />
        </Button>
    )

}


const SaveButton = ({onPress, paddingHorizontal}) => {
    
    return (
        <Button
            style = {{
                right : paddingHorizontal,
                Top : 2 + Utill.screen.topSafe,
            }}
            onPress = {onPress}
        >
            <Text style={styles.saveButtonText}>
                저장
            </Text>
        </Button>
    )
}




const styles = StyleSheet.create({
    container: {
        height: (60) + Utill.screen.topSafe,
        flexDirection : 'row',
        alignSelf:'stretch',
        alignItems:'center',
        justifyContent: 'space-between',
        paddingTop : Utill.screen.topSafe,
        backgroundColor : Utill.color.onColorBackground,
    },
    logo: {
        position : 'absolute',
        alignItems:'center',
        margin : 0,
    },

    titleText : {
        margin : 0,
        fontSize : 18,
        color : Utill.color.textBlack,
    },
    backBottonIcon : {
        width : 9.5,
        height : 16, 
    },
    saveButtonText : {
        fontSize : 16,
        color : Utill.color.black,
    }
});