import { put, fork, take, call } from 'redux-saga/effects';
import {
    login, loginFail, loginSuccess,
    autoLogin, autoLoginSuccess, autoLoginFail,
    // me, meSuccess, meFail,
    LOGIN, AUTO_LOGIN,
    //  ME_FAIL, ME_SUCCESS,

} from '../modules/user';
import * as apiUser from '../apis/user';
import * as apiLocal from '../apis/local';

export default function* loginSaga() {

    while(true) {
        const {type, payload} = yield take([login, autoLogin]);
        switch (type) {
            case LOGIN : 
                const loginRes = yield call(apiUser.getLogin, {businessNumber : payload.id, password : payload.password} );

                // console.log(loginRes);
                if (loginRes.message) {
                    // console.log('메세지가 있습니다.');
                    // console.log(loginRes.message);
                    yield put(loginFail(loginRes.message));
                }
                else if (!loginRes.token)    yield put(loginFail('잠시 후 다시 시도해 주세요'));
                else if (!!loginRes.error)   yield put(loginFail('잠시 후 다시 시도해 주세요'));
                else                         yield call(meSaga, loginRes.token, loginSuccess, loginFail);
            break;

            case AUTO_LOGIN :
                const autologinRes = yield call(apiLocal.getLocal, apiLocal.TOKEN);
                if (!autologinRes) yield put(autoLoginFail('저장된 토큰이 없습니다.'));
                else               yield call(meSaga, autologinRes, autoLoginSuccess, autoLoginFail);
                
            break;
        }

    }
}



function* meSaga(token, successAction, FailAction) {
    const meRes = yield call(apiUser.me, token);
    if (!meRes.data || meRes.error) yield put(FailAction(meRes.error));
    else {
        const pushUserId = yield call(apiLocal.getLocal, apiLocal.PUSH_USER_ID);
        yield call(apiLocal.setLocal, apiLocal.TOKEN, token);
        const data = {
            hostId : meRes.data.hostId, 
            isCall : meRes.data.isCall,
            pushToken : pushUserId,
        };

        const pushRes = yield call(apiUser.pushToken, token, data);
        if (pushRes.error) {
            // console.log(pushRes);
            yield put(FailAction(pushRes.error));
        }else {
            yield put(successAction(data));
        }
    }

}

//     while(true) {
//         const {type, payload} = yield take([login, autoLogin]);
//         switch (type) {
//             case LOGIN : 
//                 const loginRes = yield call(apiUser.getLogin, {businessNumber : payload.id, password : payload.password} );
//                 if (!loginRes.token)     yield put(loginFail(loginRes.error));
//                 else if (loginRes.error) yield put(loginFail(loginRes.error));
//                 else  {
//                     const lme = yield call(apiUser.me, loginRes.token);
//                     if (!lme.data || lme.error) {
//                         yield put(loginFail(lme.error));
//                     } else {
//                         // console.log(lme.data);
//                         yield call(apiLocal.setLocal, apiLocal.TOKEN, loginRes.token);
//                         yield put(loginSuccess(lme.data)); 
//                     }
//             }   
//             break;

//             case AUTO_LOGIN :
//                 const autologinRes = yield call(apiLocal.getLocal, apiLocal.TOKEN);
//                 if (!autologinRes) yield put({type : autoLoginFail, payload : '저장된 토큰이 없습니다.'});
//                 else {
//                     const alme = yield call(apiUser.me, autologinRes);
//                     if (!alme.data || alme.error) {
//                         yield put(autoLoginFail(alme.error));
//                     } else {
//                         yield put(autoLoginSuccess(alme.data)); 
//                     }
//                 }
//             break;
//         }

//     }
// }