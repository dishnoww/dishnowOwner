import {createAction, handleActions } from 'redux-actions'
import {Map, List} from 'immutable';


// Rquest tab
const REQUEST_GET_SERVER = 'reservation/REQUEST_GET_SERVER';
const REQUEST_GET_SERVER_FAIL = 'reservation/REQUEST_GET_SERVER_FAIL';
const REQUEST_GET_SERVER_SUCCESS = 'reservation/REQUEST_GET_SERVER_SUCCESS';
const REQUEST_GET_SERVER_SUCCESS_EMPTY = 'reservation/REQUEST_GET_SERVER_SUCCESS_EMPTY';

export const REQUEST_ACCEPT = 'reservation/REQUEST_ACCEPT';
const REQUEST_ACCEPT_FAIL = 'reservation/REQUEST_ACCEPT_FAIL';
const REQUEST_ACCEPT_SUCCESS = 'reservation/REQUEST_ACCEPT_SUCCESS';

export const REQUEST_REJECT = 'reservation/REQUEST_REJECT';
const REQUEST_REJECT_FAIL = 'reservation/REQUEST_REJECT_FAIL';
const REQUEST_REJECT_SUCCESS = 'reservation/REQUEST_REJECT_SUCCESS';

const REQUEST_POP = 'reservation/REQUEST_POP';
const REQUEST_PUSH = 'reservation/REQUEST_PUSH';
const REQUEST_SET_LIST = 'reservation/REQUEST_SET_LIST';

const REQUEST_ADDED = 'reservation/REQUEST_ADDED';

const REQUEST_TIMEOUT = 'reservation/REQUEST_TIMEOUT';

const REQUEST_WILL_UNMOUNT = 'reservation/REQUEST_WILL_UNMOUNT';


export const requestGetServer = createAction(REQUEST_GET_SERVER);
export const requestGetServerFail = createAction(REQUEST_GET_SERVER_FAIL);
export const requestGetServerSuccess = createAction(REQUEST_GET_SERVER_SUCCESS);
export const requestGetServerSuccessEmpty = createAction(REQUEST_GET_SERVER_SUCCESS_EMPTY);


export const requestAccept = createAction(REQUEST_ACCEPT);
export const requestAcceptFail = createAction(REQUEST_ACCEPT_FAIL);
export const requestAcceptSuccess = createAction(REQUEST_ACCEPT_SUCCESS);

export const requestReject = createAction(REQUEST_REJECT);
export const requestRejectFail = createAction(REQUEST_REJECT_FAIL);
export const requestRejectSuccess = createAction(REQUEST_REJECT_SUCCESS);

export const requestPop = createAction(REQUEST_POP);
export const requestPush = createAction(REQUEST_PUSH);
export const requestSetList = createAction(REQUEST_SET_LIST);

export const requestAdded = createAction(REQUEST_ADDED);

export const requestTimeout = createAction(REQUEST_TIMEOUT);

export const requestWillUnmount  = createAction(REQUEST_WILL_UNMOUNT);




const initialState = Map({
    status : '',
    request : List([]),
});

// [
//     {
//         "reservationId": 72,
//         "time": "2019-07-17 16:48:09",
//         "createdAt": "2019-07-17 16:38:09",
//         "peopleNumber": 10
//     }
// ]

export default handleActions ({
    // 서버에 목록을 요청합니다. -> saga effect
    [REQUEST_GET_SERVER] : (state, action) => state.set('status', 'requestGetServer'),

    // 요청에 대한 상태를 저장합니다. 상태에 따른 행동은 saga 혹은 container 가 결정합니다.
    [REQUEST_GET_SERVER_FAIL] : (state, action) => state.set('status', 'requestGetServerFail'),
    [REQUEST_GET_SERVER_SUCCESS] : (state, action) => state.set('request', List(action.payload))
                                                           .set('status', 'requestGetServerSuccess'),
    [REQUEST_GET_SERVER_SUCCESS_EMPTY] : (state, action) => state.set('status', 'requestGetServerSuccessEmpty'),

    // 요청을 수락하려 합니다.
    [REQUEST_ACCEPT] : (state, action) => state.set('status', 'requestAccept'),

    // 맘대로 두지 않습니다.
    [REQUEST_ACCEPT_FAIL] : (state, action) => state.set('status', 'requestAcceptFail'),
    [REQUEST_ACCEPT_SUCCESS] : (state, action) => state.set('status', 'requestAcceptSuccess'),

    //  ``
    [REQUEST_REJECT] :  (state, action) => state.set('status', 'requestReject'),
    [REQUEST_REJECT_FAIL] :  (state, action) => state.set('status', 'requestRejectFail'),
    [REQUEST_REJECT_SUCCESS] :  (state, action) => state.set('status', 'requestRejectSuccess'),


    
                                                  
    // {payload : [{요청}]}
    [REQUEST_PUSH] : (state, action) => {
        // console.log('푸쉬요청  : '+JSON.stringify(action.payload));
        return state.update('request', list => list.concat(action.payload))
                                             .set('status', 'requestPush')
    },

    // {payload : [{요청}, {요청}, {요청}, ... ]}
    [REQUEST_SET_LIST] : (state, action) => state.update('request', list => list.concat(action.payload))
                                            .set('status', 'requestSetList'),

    // 가장 첫 목록을 뽑아 버립니다.
    [REQUEST_POP] : (state, action) => {
        return state.update('request', list => list.shift())
                                            .set('status', 'requestPop')
    },

    [REQUEST_ADDED] : (state, action) => state.set('status', 'requestAdded'),

    [REQUEST_TIMEOUT] : (state, action) => state.set('status', 'requestTimeout'),
    [REQUEST_WILL_UNMOUNT] : (state, action) => state.set('status', 'requestWillUnmount'),

}, initialState);


