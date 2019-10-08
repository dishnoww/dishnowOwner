import call from 'react-native-phone-call';
import {Linking} from 'react-native';
import info from './info.json';




export const callQnA = () => {
    const args = {
        number: info.dishnowPhone,
        prompt: false 
    }
    call(args).catch(console.error);
}

export const openKakaoPlusFreind = () => {
    Linking.canOpenURL(info.dishnowKaKao).then(res => {if(res) {Linking.openURL(info.dishnowKaKao)} else {Toast.show('잠시 후 다시 시도해주세요')}});
}