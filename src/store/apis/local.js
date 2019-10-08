
import AsyncStorage from '@react-native-community/async-storage';

export const TOKEN = 'localStorage/TOKEN'
export const IS_CALL = 'localStorage/IS_CALL'
export const PUSH_TOKEN = 'localStorage/PUSH_TOKEN'
export const PUSH_USER_ID = 'localStorage/PUSH_USER_ID'

export const getLocal =  async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        // console.log(`get # ${key} : ${value}`);
        return value;
    } catch(e) {
        console.log(e);
    }
}

export const setLocal = async (key, data) => {
    try {
        await AsyncStorage.setItem(key, data);
        // console.log(`set # ${key} : ${data}`);
    } catch(e) {
        console.log(e);
    }
}
