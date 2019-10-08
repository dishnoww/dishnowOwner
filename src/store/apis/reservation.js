import * as fetch from '../../utill/fetch'

export const apiUrl = 'http://54.180.6.107:8001/api/host/'; 


export function importTest(temp) {
    console.log(temp);
    return true;
}

export const putIsCall = (token, isCall) => {
    const url = `${apiUrl}store/call`;
    return fetch.putAuthServer(url, token, null)
    .then(res => res.json())
    .then(res => ({isCall : res.isCall}))
    .catch(error => ({error})); 
}

// request tab
export const requestGetServer = (token) => {
    const url = `${apiUrl}reservation/request`;
    return fetch.getAuthServer(url, token, null)
    .then(res => res.json())
    .then(res => ({data : res}))
    .catch(error => ({error})); 
}

export const requestAccept = (token, payload) => {
    const url = `${apiUrl}reservation/accept`;
    return fetch.putAuthServer(url, token, payload)
    .then(res => ({isSuccess : res ? true: false}))
    .catch(error => ({error})); 
}

export const requestReject = (token, payload) => {
    const url = `${apiUrl}reservation/reject`;
    return fetch.putAuthServer(url, token, payload)
    .then(res => ({isSuccess : res ? true: false}))
    .catch(error => ({error})); 
}


// accept tab
export const acceptGetServer = (token) => {
    const url = `${apiUrl}reservation/accept`;
    return fetch.getAuthServer(url, token, null)
    .then(res => res.json())
    .then(res => ({data : res}))
    .catch(error => ({error})); 
}

// confirm tab
export const confirmGetServer = (token) => {
    const url = `${apiUrl}reservation/confirm`;
    return fetch.getAuthServer(url, token, null)
    .then(res => res.json())
    .then(res => ({data : res}))
    .catch(error => ({error})); 
}
export const confirmArrive = (token, payload) => {
    //reservationId
    const url = `${apiUrl}reservation/arrive`;
    return fetch.putAuthServer(url, token, payload)
    .then(res => {
        return res === null ? false : true;
    })
    .catch(error => ({error})); 
}

export const confirmNoShow = (token, payload) => {
    //reservationId
    const url = `${apiUrl}reservation/noShow`;
    return fetch.putAuthServer(url, token, payload)
    .then(res => ({isSuccess : res ? true: false}))
    .catch(error => ({error})); 
}

