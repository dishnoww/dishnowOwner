
import {loginSuccess, registerSuccess, autoLoginSuccess, 
        logout,
        logoutFail,
        logoutSuccess} from '../modules/user';
import { fork, take, cancel } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registerSaga from './registerSaga';
import verifySaga from './verifySaga';
import reservationSaga from './reservationSaga';
import storeSaga from './storeSaga';


export default function* rootSaga() {
    while(true) {
        // console.log('RUN!');
        const loginTask = yield fork(loginSaga);
        const verifyTask = yield fork(verifySaga);
        const registerTask = yield fork(registerSaga);
        const {type, payload} = yield take([loginSuccess, autoLoginSuccess]);
        const reservationTask = yield fork(reservationSaga, payload);
        const storeTask = yield fork(storeSaga);
        yield cancel(verifyTask);
        yield cancel(loginTask);
        yield cancel(registerTask);

        yield take(logoutSuccess);


        yield cancel(reservationTask);
        yield cancel(storeTask);
    }
}