import * as fetch from '../../utill/fetch'

export const apiUrl = 'http://54.180.6.107:8001/api/host/'; 

export const getServer = (route, token, payload=null) => {
    const url = `${apiUrl}${route}`; // 주소 바꿈
    return fetch.getAuthServer(url, token, payload)
    .then(res => res.json())
    .then(res => ({data : res}))
    .catch(error => ({error})); 
}

export const PutServer = (route, token, payload) => {
    const url = `${apiUrl}${route}`; 
    return fetch.putAuthServer(url, token, payload)
    .then(res => ({isSuccess : res ? true: false}))
    .catch(error => ({error})); 
}

// store -> information
export const storeGetInformation = (token) => {
    const url = `${apiUrl}store/information`; // 주소 바꿈
    return fetch.getAuthServer(url, token, null)
    .then(res => res.json())
    .then(res => ({data : res}))
    .catch(error => ({error})); 
}

export const storePutInformation = (token, payload) => {
    const url = `${apiUrl}store/`;
    return fetch.putAuthServer(url, token, payload)
    .then(res => ({isSuccess : !!res ? true: false}))
    .catch(error => ({error})); 
}

// store -> photos
export const storeGetImage = (token) => {
    const url = `${apiUrl}store/image`;
    return fetch.getAuthServer(url, token, null)
    .then(res => res.json())
    .then(res => ({data : res}))
    .catch(error => ({error})); 
}

export const storePutImage = (token, payload) => {
    const url = `${apiUrl}store/image`;
    return fetch.putAuthServer(url, token, payload)
    .then(res => ({isSuccess : !!res ? true: false}))
    .catch(error => ({error})); 
}
