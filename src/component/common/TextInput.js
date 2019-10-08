import React from 'react';
import {TextInput, Platform} from 'react-native';

const DefaultText = (props) => {
    const defaultStyle = Platform.select({
        ios : {
            fontFamily : 'AppleSDGothicNeo-Regular',
        },
        android : {
            fontFamily : 'roboto',
            includeFontPadding : false
        }
    });

    const {children, style} = props;

    return (
        <TextInput {...props}
            allowFontScaling = {false}
            style = {[defaultStyle, style]}
        />
    )
}

export default DefaultText;