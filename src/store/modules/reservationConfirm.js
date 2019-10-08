import {createAction, handleActions } from 'redux-actions'
import {Map, List} from 'immutable';


const CONFIRM_GET_SERVER = 'reservation/CONFIRM_GET_SERVER';
const CONFIRM_GET_SERVER_FAIL = 'reservation/CONFIRM_GET_SERVER_FAIL';
const CONFIRM_GET_SERVER_SUCCESS = 'reservation/CONFIRM_GET_SERVER_SUCCESS';

export const CONFIRM_ARRIVE = 'reservation/CONFIRM_ARRIVE';
const CONFIRM_ARRIVE_FAIL = 'reservation/CONFIRM_ARRIVE_FAIL';
const CONFIRM_ARRIVE_SUCCESS = 'reservation/CONFIRM_ARRIVE_SUCCESS';

export const CONFIRM_NO_SHOW = 'reservation/CONFIRM_NO_SHOW';
const CONFIRM_NO_SHOW_FAIL = 'reservation/CONFIRM_NO_SHOW_FAIL';
const CONFIRM_NO_SHOW_SUCCESS = 'reservation/CONFIRM_NO_SHOW_SUCCESS';



const CONFIRM_PUSH = 'reservation/CONFIRM_PUSH';
const CONFIRM_SET = 'reservation/CONFIRM_SET';

const CONFIRM_REFRESH = 'reservation/CONFIRM_REFRESH';


// const CONFIRM_TIMEPUT_REFRESH = 'reservation/CONFIRM_TIMEPUT_REFRESH';
// const CONFIRM_USERHANDLE_REFRESH = 'reservation/CONFIRM_TIMEPUT_REFRESH';


export const confirmGetServer = createAction(CONFIRM_GET_SERVER);
export const confirmGetServerFail = createAction(CONFIRM_GET_SERVER_FAIL);
export const confirmGetServerSuccess = createAction(CONFIRM_GET_SERVER_SUCCESS);

export const confirmArrive = createAction(CONFIRM_ARRIVE);
export const confirmArriveFail = createAction(CONFIRM_ARRIVE_FAIL);
export const confirmArriveSuccess = createAction(CONFIRM_ARRIVE_SUCCESS);

export const confirmNoShow = createAction(CONFIRM_NO_SHOW);
export const confirmNoShowFail = createAction(CONFIRM_NO_SHOW_FAIL);
export const confirmNoShowSuccess = createAction(CONFIRM_NO_SHOW_SUCCESS);

export const confirmPush = createAction(CONFIRM_PUSH);
export const confirmSet = createAction(CONFIRM_SET);

export const confirmRefresh = createAction(CONFIRM_REFRESH);

const initialState = Map({
    confirm : List([]),
    status : '',
    error : '잠시 후 다시 시도해 주세요.',
});


export default handleActions ({
    [CONFIRM_GET_SERVER] : (state, action) => state.set('status', 'confirmGetServer'),
    [CONFIRM_GET_SERVER_FAIL] : (state, action) => state.set('status', 'confirmGetServerFail').set('error', action.payload),
    [CONFIRM_GET_SERVER_SUCCESS] : (state, action) => {
        return state.set('status', 'confirmGetServerSuccess')
                    .set('confirm', action.payload);
    },

    // {payload : [{요청}, {요청}, {요청}, ...]}
    // 서버에서 받아올때
    [CONFIRM_SET] :  (state, action) => {
        return state.set('confirm', List(action.payload)).set('status', 'confirmPushSuccess');
    },

    // {payload : {요청}}
    // 유저가 수락을 했고 그결과가 푸쉬로 날라와서 화면에 표시된 알림창에서 확인을 눌렀을때
    [CONFIRM_PUSH] : (state, action) => {
        return state.set('status', 'confirmPushSuccess')
                    .update('confirm', list => { 
                    return [action.payload].concat(list);
                    });
    },

    [CONFIRM_ARRIVE] : (state, action) => {
        return state.set('status', 'confirmArrive');
    },
    [CONFIRM_ARRIVE_FAIL] : (state, action) => {
        return state.set('status', 'confirmArriveFail');
    },
    [CONFIRM_ARRIVE_SUCCESS] : (state, action) => {
        return state.set('status', 'confirmArriveSuccess')
                    .update('confirm', list => {
                        for(let i=0; i<list.length; i++) {
                            if(list[i].reservationId == action.payload) {
                                list.splice(i, 1);
                                break;
                            }
                        }
                        return list;
                    });
                        
    },


    [CONFIRM_NO_SHOW] : (state, action) => {
        return state.set('status', 'confirmNoShow');
    },
    [CONFIRM_NO_SHOW_FAIL] : (state, action) => {
        return state.set('status', 'confirmNoShowFail');

    },
    [CONFIRM_NO_SHOW_SUCCESS] : (state, action) => {

        return state.set('status', 'confirmNoShowSuccess')
                    .update('confirm', list => {
                        for(let i=0; i<list.length; i++) {
                            if(list[i].reservationId == action.payload) {
                                list.splice(i, 1);
                                break;
                            }
                        }
                        return list;
                    });
    },

}, initialState);
