import React from 'react';
import { Image} from 'react-native';

import Button from './Button';



const IconOff = 'iconcheckcircledisable';
const IconOn = 'iconcheckcircle';

const Check = (props) => {

    const {onPress, value, style} = props;

    return (
        <Button style={style} onPress={onPress}>
            <Image style={{width : 22, height : 22,}} resizeMode={'cover'} source={{uri : value?IconOn:IconOff}} />
        </Button>
    );
}

export default Check; 