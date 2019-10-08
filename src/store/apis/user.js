import * as fetch from '../../utill/fetch'

export const apiUrl = 'http://54.180.6.107:8001/api/host/'; 
import * as info from '../../utill/info.json'

export const getGeoCode = (adress) => {
    console.log('ll' + info.dishnowGeocoding);
    return fetch.getGeoCode(info.dishnowGeocoding, adress)
    .then(res => {
        if (res == null) return {isSuccess : false, payload : null, error : '잠시 후 다시 시도해 주세요'}
        return  {isSuccess : true, payload : res, error : null}
    }
    )

    .catch(error => ({error})); 
}
export function importTest(temp) {
    console.log(temp);
    return true;
}
export const getLogin = (data) => {
    const url = `${apiUrl}user/login`;
    return fetch.getServer(url, data)
    .then(res =>res.json().then(res=>res).catch(error=>({error})))
    .catch(error => ({error})); 
}

export const register = (data) => {
    const url = `${apiUrl}user`;
    return fetch.postServer(url, data)
    .then(res =>res.json())
    .then(res=>res)
    .catch(error => {
        console.log(error);
        return {error};
    });
}

export const me = (token) => {
    const url =`${apiUrl}user/me`;
    return fetch.getAuthServer(url, token)
    .then(res => res.json())
    .then(res => ({data : res}))
    .catch(error => ({error}));   
}
export const pushToken = (token, data=null) => {
    const url =`${apiUrl}user/pushToken`;
    return fetch.putAuthServer(url, token, data)
    .then(res => {
        console.log(res);
        return {isSuccess : res!=null};
    })
    .catch(error => ({error}));   
}

export const phoneAuth = (phone) => {
    const url = `${apiUrl}user/phoneAuth`;
    return fetch.getServer(url, phone)
    .then(res =>res.json().then(res=>res).catch(error=>({error})))
    .catch(error => ({error})); 
}