import call from 'react-native-phone-call'

export const callNumber = phone => {
    const args = {
        number: phone,
        prompt: false 
    }
    call(args).catch(console.error);
}