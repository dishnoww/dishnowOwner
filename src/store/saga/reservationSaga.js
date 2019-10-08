import { put, fork, take, call, cancel, select } from 'redux-saga/effects';

import {callGet, callSet, callSetFail, callSetSuccess,
} from '../modules/reservationCall';

import {requestGetServer, requestGetServerFail, requestGetServerSuccess, requestGetServerSuccessEmpty,
        requestAccept, requestAcceptFail, requestAcceptSuccess,
        requestReject, requestRejectFail, requestRejectSuccess,
        requestPop, requestSetList, requestWillUnmount,
        REQUEST_REJECT, REQUEST_ACCEPT, REQUEST_WILL_UNMOUNT,
} from '../modules/reservation';

import {acceptGetServer, acceptGetServerFail, acceptGetServerSuccess,
        acceptPush, acceptRefresh, acceptSet
} from '../modules/reservationAccept';

import {confirmGetServer, confirmGetServerFail, confirmGetServerSuccess,
        confirmArrive, confirmArriveFail, confirmArriveSuccess,
        confirmNoShow, confirmNoShowFail, confirmNoShowSuccess,
        CONFIRM_ARRIVE, CONFIRM_NO_SHOW
} from '../modules/reservationConfirm';





import * as apiReservation from '../apis/reservation';
import * as apiLocal from '../apis/local';

export default function* reservationSaga({hostid, isCall}) {
    const token = yield call(apiLocal.getLocal, apiLocal.TOKEN);
    // console.log('서버에서 받아온 isCall : ' + isCall);
    if (isCall) yield put(callGet(isCall));
    const callTask = yield fork(callSaga, {token});

    const requestGetTask = yield fork(requestGetSaga, token);
    // console.log('forked request get saga');
    const requestPutTask = yield fork(requestPutSaga, token);
    // console.log('forked request put saga');
    const acceptTask = yield fork(acceptSaga, token);
    const confirmTask = yield fork(confirmSaga, token);
    const confirmPutTask = yield fork(confirmPutSaga, token);
    // console.log('forked sagas');
}


function* callSaga({token}) {
    while(true) {
        const {payload} = yield take(callSet);
        const {isCall, error} = yield call(apiReservation.putIsCall, token);
        if (!isCall || !!error) yield put(callSetFail());
        else {
            // console.log(isCall);
            // yield call(apiLocal.setLocal, apiLocal.IS_CALL, payload.isCall);
            yield put(callSetSuccess(isCall));
        }
    }
}
function* requestGetSaga(token) {
    
    while(true) {
        yield take(requestGetServer);
        const {data, error=null} = yield call(apiReservation.requestGetServer, token);
        if (!data || error) yield put(requestGetServerFail('통신오류'));
        else {
            if (data.length > 0) yield put({type : requestGetServerSuccess, payload : data});
            else {
                yield put({type : requestGetServerSuccessEmpty, payload : []});
            }
        }
    }
}

function* requestPutSaga (token) {
    while(true) {
        //  수락 / 거절 
        const {type, payload : {hostId, reservationId}} = yield take([REQUEST_ACCEPT, REQUEST_REJECT]);
        let res = {};
        switch (type) {
            case REQUEST_ACCEPT :
                // console.log(`${hostId}, ${reservationId}`);
               res = yield call(apiReservation.requestAccept, token, {hostId, reservationId});
            //    console.log(res);
               if (!res.isSuccess || res.error) yield put({type : requestAcceptFail, payload : null});
               else                        yield put(requestAcceptSuccess());
            break;

            case  REQUEST_REJECT :
                res = yield call(apiReservation.requestReject, token, {hostId, reservationId});
                
                if (!res.isSuccess || res.error) yield put({type : requestRejectFail, payload : null});
                else                        yield put({type : requestRejectSuccess, payload : null});
            break;
        }
    }
}


function* acceptSaga(token) {
    
    while(true) {
        yield take(acceptGetServer);
        const {data, error} = yield call(apiReservation.acceptGetServer, token);
        if (!data || error) yield put(acceptGetServerFail('통신오류'));
        else {
            yield put(acceptGetServerSuccess((data.length > 0) ? data : []));
        }
    }
}

function* confirmSaga(token) {
    
    while(true) {
        yield take(confirmGetServer);
        // console.log('get confirm list from server');
        const {data, error} = yield call(apiReservation.confirmGetServer, token);

        if (!data || error) yield put(confirmGetServerFail('통신오류'));
        else {
            // console.log(data);
            yield put(confirmGetServerSuccess((data.length > 0) ? data : []));
        }
    }
}



function* confirmPutSaga (token) {
    while(true) {
        //  수락 / 거절 
        const {type, payload : {reservationId}} = yield take([confirmArrive, confirmNoShow]);
        let res = {};
        switch (type) {
            case CONFIRM_ARRIVE :
               res = yield call(apiReservation.confirmArrive, token, {reservationId});
                // console.log(res);
               if (!res || res.error) yield put(confirmArriveFail());
               else                             yield put(confirmArriveSuccess(reservationId));
            break;

            case  CONFIRM_NO_SHOW :
                res = yield call(apiReservation.confirmNoShow, token, {reservationId});
                
                if (!res || res.error) yield put(confirmNoShowFail());
                else                             yield put(confirmNoShowSuccess(reservationId));
            break;
        }
    }
}
