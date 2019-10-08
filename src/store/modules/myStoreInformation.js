import {createAction, handleActions } from 'redux-actions'
import {Map, List} from 'immutable';


// store
const STORE_STATUS_RESET = 'store/STORE_STATUS_RESET';
export const STORE_GET_SERVER = 'store/STORE_GET_SERVER';
export const STORE_GET_SERVER_FAIL = 'store/STORE_GET_SERVER_FAIL';
export const STORE_GET_SERVER_SUCCESS = 'store/STORE_GET_SERVER_SUCCESS';

export const STORE_PUT_SERVER = 'store/STORE_PUT_SERVER';
export const STORE_PUT_SERVER_FAIL = 'store/STORE_PUT_SERVER_FAIL';
export const STORE_PUT_SERVER_SUCCESS = 'store/STORE_PUT_SERVER_SUCCESS';

export const storeStatusReset = createAction(STORE_STATUS_RESET);

export const storeGetServer = createAction(STORE_GET_SERVER);
export const storeGetServerFail = createAction(STORE_GET_SERVER_FAIL);
export const storeGetServerSuccess = createAction(STORE_GET_SERVER_SUCCESS);

export const storePutServer = createAction(STORE_PUT_SERVER);
export const storePutServerFail = createAction(STORE_PUT_SERVER_FAIL);
export const storePutServerSuccess = createAction(STORE_PUT_SERVER_SUCCESS);


const initialState = Map({
    status : '',
    information : {},
});

export default handleActions ({
    [STORE_STATUS_RESET] : (state, action) => state.set('status', ''),
    [STORE_GET_SERVER] : (state, action) => state.set('status', 'storeGetServer'),
    [STORE_GET_SERVER_FAIL] : (state, action) => state.set('status', 'storeGetServerFail').set('error', action.payload),
    [STORE_GET_SERVER_SUCCESS] : (state, action) => state.set('status', 'storeGetServerSuccess')
                                                         .set('information', action.payload),

    [STORE_PUT_SERVER] : (state, action) => state.set('status', 'storePutServer'),
    [STORE_PUT_SERVER_FAIL] : (state, action) => state.set('status', 'storePutServerFail').set('error', action.payload),
    [STORE_PUT_SERVER_SUCCESS] : (state, action) => state.set('status', 'storePutServerSuccess'),
}, initialState);