import * as fetch from '../../utill/fetch'
export const apiUrl = 'http://54.180.6.107:8001/api/host/'; 

export const uploadImage = (image) => {
    const url = `http://54.180.6.107:8001/api/upload`;
    return fetch.postMultipartServer(url, image)
    .then(res => res.json())
    .then(res => {
        // console.log(res);
        return {images: res.location}
    }) // res 을 data 로
    .catch(error => ({error})); 
}