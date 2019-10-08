import { put, fork, take, call, select } from 'redux-saga/effects';
import {
    register, registerVerifyCodeRequest, registerSuccess, registerFail, 
    registerImageUploadFail, registerVerifyCodeRequestSuccess, 
    registerGetLngLat, registerGetLngLatFail, registerGetLngLatSuccess,
    REGISTER_GET_LONG_LAT, REGISTER_GET_LONG_LAT_FAIL, REGISTER_GET_LONG_LAT_SUCCESS,
    REGISTER, REGISTER_VERIFY_CODE_REQUEST, 

} from '../modules/user';
import * as apiUpload from '../apis/upload';
import * as apiLocal from '../apis/local';
import * as apiUser from '../apis/user';

export default function* registerSaga() {
    while(true) {
        const {type, payload} = yield take([register, registerGetLngLat]);

        console.log('ll aa' + type +  JSON.stringify(payload));
        switch(type) {
            case 'user/REGISTER_GET_LONG_LAT' :
                const geoRes = yield call(apiUser.getGeoCode, payload);

                if (!!geoRes.error) yield put(registerGetLngLatFail(geoRes.error));
                if (!geoRes.isSuccess) yield put(registerGetLngLatFail('잠시 후 다시 시도해 주세요.'));
                if (!geoRes.payload) yield put(registerGetLngLatFail('잠시 후 다시 시도해 주세요.'));
                else {
                    data = {
                        longitude : geoRes.payload.lng,
                        latitude : geoRes.payload.lat,
                    }
                    console.log(data);
                    yield put(registerGetLngLatSuccess(data));
                }
            break;
            case 'user/REGISTER' :
                console.log('ll aa into register');
                const uploadRes = yield call(apiUpload.uploadImage, payload.businessLicenseImage);
                console.log('ll aa uploade respawns' + JSON.stringify(uploadRes));
                if (!!uploadRes.images) {
                    payload.businessLicenseImage = JSON.stringify(uploadRes.images); // 항상stringify 해서 올릴 것.
                    yield call(registerRequestSaga, payload);
                } else yield put(registerImageUploadFail());
            break;

            default : 
            break;
        }
    }
}

function* registerRequestSaga(payload) {
    let res = yield call(apiUser.register, payload);
    console.log(res);
//     if (!res.ok){
//         if (res.error != null) yield put(registerFail(error));
//         else yield put(registerFail(!!res.payload.message ? res.payload.message : '잠시 후 다시 시도해 주세요.'));
//     } else yield put(registerSuccess(res.payload.token));
    if (!!res.message)      yield put(registerFail(res.message));
    else if (!res.token)    yield put(registerFail('잠시 후 다시 시도해 주세요'));
    else if (!!res.error)   yield put(registerFail('잠시 후 다시 시도해 주세요'));
    else                    yield put(registerSuccess(res.token));
}