import { put, fork, take, call, select } from 'redux-saga/effects';
import {
     registerVerifyCodeRequest, registerVerifyCodeRequestFail, registerVerifyCodeStore, registerVerifyCodeRequestSuccess, 
} from '../modules/user';
import * as apiUser from '../apis/user';
import * as apiLocal from '../apis/local';

export default function* verfiySaga() {
    while(true) {
        const {payload} = yield take(registerVerifyCodeRequest);
        const phone = payload;
        const paRes = yield call(apiUser.phoneAuth, {phone});
        if      (paRes.error)    yield put({type : registerVerifyCodeRequestFail, payload : paRes.error});
        else if (paRes.message)  yield put({type : registerVerifyCodeRequestFail, payload : paRes.message});
        else {
            yield put({type : registerVerifyCodeRequestSuccess, payload : '인증번호가 발송 되었습니다.'});
            yield put({type : registerVerifyCodeStore, payload : paRes});
        }
    }


}