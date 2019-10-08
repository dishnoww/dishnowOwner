import { put, fork, take, call, cancel, select } from 'redux-saga/effects';

import {imageGetServer , imageGetServerFail , imageGetServerSuccess ,
        imageUploadFile, imageUploadFileFail, imageUploadFileSuccess,
        imageUploadLink, imageUploadLinkFail, imageUploadLinkSuccess,
        IMAGE_GET_SERVER, IMAGE_UPLOAD_FILE, IMAGE_UPLOAD_LINK,
} from '../modules/myStoreImage';

import {storeGetServer, storeGetServerFail, storeGetServerSuccess,
        storePutServer, storePutServerFail, storePutServerSuccess,
        STORE_GET_SERVER, STORE_PUT_SERVER
} from '../modules/myStoreInformation';

import {menuMainGetServer, menuMainGetServerFail, menuMainGetServerSuccess,
        menuMainPutServer, menuMainPutServerFail, menuMainPutServerSuccess,
        menuMainImageUploadFile, menuMainImageUploadFileFail, menuMainImageUploadFileSuccess,
        menuMainImageUploadLink, menuMainImageUploadLinkFail, menuMainImageUploadLinkSuccess,
        MENU_MAIN_GET_SERVER, MENU_MAIN_PUT_SERVER, MENU_MAIN_IMAGE_UPLOAD_FILE, MENU_MAIN_IMAGE_UPLOAD_LINK
} from '../modules/myMenuMain';

import {menuSubGetServer, menuSubGetServerFail, menuSubGetServerSuccess,
        menuSubPutServer, menuSubPutServerFail, menuSubPutServerSuccess,
        MENU_SUB_GET_SERVER, MENU_SUB_PUT_SERVER
} from '../modules/myMenuSub';

import {reviewGetServer, reviewGetServerFail, reviewGetServerSuccess,
        reviewGetAnswerServer, reviewGetAnswerServerFail, reviewGetAnswerServerSuccess,
        reviewPutAnswerServer, reviewPutAnswerServerFail, reviewPutAnswerServerSuccess,
        reviewGetNoAnswerServer, reviewGetNoAnswerServerFail, reviewGetNoAnswerServerSuccess,
        REVIEW_GET_SERVER, REVIEW_GET_ANSWER_SERVER, REVIEW_GET_NO_ANSWER_SERVER, REVIEW_PUT_ANSWER_SERVER
} from '../modules/myReview';

import {historyGetServer, historyGetServerFail, historyGetServerSuccess,
    HISTORY_GET_SERVER,
} from '../modules/myReservationHistory';

import * as apiStore from '../apis/store';
import * as apiUpload from '../apis/upload';
import * as apiLocal from '../apis/local';

export default function* storeSaga() {
    const token = yield call(apiLocal.getLocal, apiLocal.TOKEN);
    while (true) {
        const {type, payload} = yield take([
            imageGetServer, imageUploadFile, imageUploadLink,
            storeGetServer, storePutServer,
            menuMainGetServer, menuMainPutServer, menuMainImageUploadFile,
            menuSubGetServer, menuSubPutServer,
            reviewGetServer, reviewGetAnswerServer, reviewGetNoAnswerServer, reviewPutAnswerServer,
            historyGetServer
        ]);
        switch (type) {
            case IMAGE_UPLOAD_FILE : yield fork(uploadImage, payload, imageUploadFileSuccess, imageUploadFileFail);
            break; // payload : [파일링크, 파일링크, ...] -> [이미지주소, 이미지주소, ...] 

            case IMAGE_UPLOAD_LINK : yield fork(imageUploadLinkSaga, token, payload);
            break; // payload : [이미지주소, 이미지주소, ...] -> success / fail

            case IMAGE_GET_SERVER : yield fork(GetSaga, token, 'store/image', payload, imageGetServerSuccess, imageGetServerFail);
            break; // mount 되었을때 dispatch 되겠지

            case STORE_GET_SERVER : yield fork(GetSaga, token, 'store/', payload, storeGetServerSuccess, storeGetServerFail);
            break; // mount 되었을때 dispatch 되겠지

            case STORE_PUT_SERVER : yield fork(PutSaga, token, 'store/', payload, storePutServerSuccess, storePutServerFail);
            break; // payload :

            case MENU_MAIN_GET_SERVER : yield fork(GetSaga, token, 'menu/main', payload, menuMainGetServerSuccess, menuMainGetServerFail);
            break; // mount 되었을때 dispatch 되겠지

            case MENU_MAIN_PUT_SERVER : yield fork(PutSaga, token, 'menu/main', payload, menuMainPutServerSuccess, menuMainPutServerFail);
            break;

            case MENU_MAIN_IMAGE_UPLOAD_FILE : yield fork(uploadImage, payload, menuMainImageUploadFileSuccess, menuMainImageUploadFileFail);
            break; // payload : [로컬주소, 로컬주소, ...] -> [서버주소, 서버주소, ...]

            case MENU_MAIN_IMAGE_UPLOAD_LINK : 
            break; //수정바람

            case MENU_SUB_GET_SERVER : yield fork(GetSaga, token, 'menu/sub', payload, menuSubGetServerSuccess, menuSubGetServerFail);
            break; // mount 되었을때 dispatch 되겠지

            case MENU_SUB_PUT_SERVER : yield fork(PutSaga, token, 'menu/sub', payload, menuSubPutServerSuccess, menuSubPutServerFail);
            break;

            case REVIEW_GET_SERVER : yield fork(ReviewGetSaga, token, reviewGetServerSuccess, reviewGetServerFail);
            break; // mount 되었을때 
            case REVIEW_GET_ANSWER_SERVER : yield fork(GetSaga, token, 'review/answer', payload, reviewGetAnswerServerSuccess, reviewGetAnswerServerFail);
            break; //   페이징
            case REVIEW_GET_NO_ANSWER_SERVER : yield fork(GetSaga, token, 'review/noAnswer', payload, reviewGetNoAnswerServerSuccess, reviewGetNoAnswerServerFail);
            break; //  페이징

            case REVIEW_PUT_ANSWER_SERVER : yield fork(PutSaga, token, 'review/', payload, reviewPutAnswerServerSuccess, reviewPutAnswerServerFail);
            break; // payload : {reviewId, answer}

            case HISTORY_GET_SERVER : yield fork(GetSaga, token, 'reservation/', payload, historyGetServerSuccess, historyGetServerFail);
            break; // mount 되었을때 dispatch 되겠지

        }
    }
}

function* GetSaga(token, route, payload=null, successAction, failAction) {
    const {data, error} = yield call(apiStore.getServer, route, token, payload);
    if      (!data)          yield put(failAction('통신오류'));
    else if (!!data.message) yield put(failAction(data.message));
    else if (error)          yield put(failAction(error));
    else {
        yield put(successAction(data));
        // console.log('get some data from server -> '+JSON.stringify(data));
    }
};

function* PutSaga(token, route, payload, successAction, failAction) {
    const {isSuccess, error} = yield call(apiStore.PutServer, route, token, payload);
    if      (!isSuccess) yield put(failAction('잠시 후 다시 시도해 주세요.'));
    else if (error)      yield put(failAction(error));
    else {
        yield put(successAction());
        // console.log('put some data to server -> '+JSON.stringify(payload));
    }
};


function* uploadImage(list, successAction, failAction) {
    const {images, error} = yield call(apiUpload.uploadImage, list);
    if      (!images) yield put(failAction('통신오류'));
    else if ( error ) yield put(failAction(error));
    else              yield put(successAction(images));
};

function* imageUploadLinkSaga(token, photos) {
    const formbody = {mainImage :JSON.stringify([photos[0]]), subImage : JSON.stringify(photos.slice(1))};
    const {isSuccess, error} = yield call(apiStore.storePutImage, token, formbody);
    if      (!isSuccess)   yield put(imageUploadLinkFail('통신오류'));
    else if (error)        yield put(imageUploadLinkFail('통신오류'));
    else yield put(imageUploadLinkSuccess());
};


function* ReviewGetSaga(token, successAction, failAction) {
    let payload = {answer : null, noAnswer : null, count : {noAnswer : null, answer : null}};

    const countRes = yield call(apiStore.getServer, 'review/count', token);
    if      (!countRes.data)          yield put(failAction('통신오류'));
    else if (!!countRes.data.message) yield put(failAction(countRes.data.message));
    else if (countRes.error)          yield put(failAction(countRes.error));
    else if ((countRes.data.noAnswer === '0') && (countRes.data.answer === '0')) {
        payload.count = countRes.data;
        payload.answer = [];
        payload.noAnswer = [];
        yield put(successAction(payload));
    } else {
        result = 0;
        payload.count = countRes.data;
        const answerRes = yield call(apiStore.getServer, 'review/answer', token);
        if      (!answerRes.data)          yield put(failAction('통신오류'));
        else if (!!answerRes.data.message) yield put(failAction(answerResdata.message));
        else if (answerRes.error)          yield put(failAction(answerRes.error));
        else { payload.answer = answerRes.data; result++; }

        const noAnswerRes = yield call(apiStore.getServer, 'review/noAnswer', token);
        if      (!noAnswerRes.data)          yield put(failAction('통신오류'));
        else if (!!noAnswerRes.data.message) yield put(failAction(noAnswerRes.data.message));
        else if (noAnswerRes.error)          yield put(failAction(noAnswerRes.error));
        else { payload.noAnswer = noAnswerRes.data; result++; }

        if (result == 2) yield put(successAction(payload));
    }
};