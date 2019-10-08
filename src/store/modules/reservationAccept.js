import {createAction, handleActions } from 'redux-actions'
import {Map, List} from 'immutable';
import moment from 'moment';


const ACCEPT_GET_SERVER = 'reservation/ACCEPT_GET_SERVER';
const ACCEPT_GET_SERVER_FAIL = 'reservation/ACCEPT_GET_SERVER_FAIL';
const ACCEPT_GET_SERVER_SUCCESS = 'reservation/ACCEPT_GET_SERVER_SUCCESS';


const ACCEPT_PUSH = 'reservation/ACCEPT_PUSH';
const ACCEPT_SET = 'reservation/ACCEPT_SET';

const ACCEPT_CONFIRM = 'reservation/ACCEPT_CONFIRM';

const ACCEPT_REFRESH = 'reservation/ACCEPT_REFRESH';
const ACCEPT_REFRESH_SUCCESS = 'reservation/ACCEPT_REFRESH_SUCCESS';


// const ACCEPT_TIMEPUT_REFRESH = 'reservation/ACCEPT_TIMEPUT_REFRESH';
// const ACCEPT_USERHANDLE_REFRESH = 'reservation/ACCEPT_TIMEPUT_REFRESH';


export const acceptGetServer = createAction(ACCEPT_GET_SERVER);
export const acceptGetServerFail = createAction(ACCEPT_GET_SERVER_FAIL);
export const acceptGetServerSuccess = createAction(ACCEPT_GET_SERVER_SUCCESS);

export const acceptPush = createAction(ACCEPT_PUSH);
export const acceptSet = createAction(ACCEPT_SET);

export const acceptConfirm = createAction(ACCEPT_CONFIRM);

export const acceptRefresh = createAction(ACCEPT_REFRESH);
export const acceptRefreshSuccess = createAction(ACCEPT_REFRESH_SUCCESS);

const initialState = Map({
    accept : List([]),
    status : '',
    error : '잠시 후 다시 시도해 주세요.',
});


export default handleActions ({
    [ACCEPT_GET_SERVER] : (state, action) => state.set('status', 'acceptGetServer'),
    [ACCEPT_GET_SERVER_FAIL] : (state, action) => state.set('status', 'acceptGetServerFail').set('error', action.payload),
    [ACCEPT_GET_SERVER_SUCCESS] : (state, action) => {
        return state.set('status', 'acceptGetServerSuccess')
                    .set('accept', action.payload);
    },

    // {payload : [{요청}, {요청}, {요청}, ...]}
    // 서버에서 받아올때
    [ACCEPT_SET] :  (state, action) => {
        return state.set('accept', List(action.payload)).set('status', 'acceptPushSuccess');
    },

    // {payload : {요청}}
    // 수락을 눌렀을때
    [ACCEPT_PUSH] : (state, action) => {
        // console.log(state.get('accept').toString());
        return state.set('status', 'acceptPushSuccess')
                    .update('accept', list => { 
                    // return list.push(action.payload); 여기서 list는 immuteable 이 아니다 
                    return list.concat([action.payload]);
                    });
    },

    // payload : (reservationId) 99 
    [ACCEPT_CONFIRM] : (state, action) => {
        // console.log('confirmed id : ' + action.payload)
        return state.update('accept', list => {

            for(let i=0; i<list.length; i++) {
                if(list[i].reservationId == action.payload) {
                    list.splice(i, 1);
                    return list;
                }
            }
            return list;
        });
    },

    [ACCEPT_REFRESH] : (state, action) => {
        // console.log(state.get('accept').toString());
        return state.set('status', 'acceptRefresh')
                    .update('accept', list => { 
                        // return list.push(action.payload); 여기서 list는 array
                        
                        if (!list) return list;
                        if (list.length < 0) return list;
                        // console.log(list.length);
                        const currentTime = moment(moment().format("YYYY-MM-DD HH:mm:ss"));
                        for(let i=0; i<list.length;i++) {
                            const {createdAt, time }  = list[i];
                            let createTime = moment(createdAt).add(9, 'hours').format('YYYY-MM-DD HH:mm:ss');
                            let expectTime = moment(time).add(9, 'hours').format('YYYY-MM-DD HH:mm:ss');
                        
                            createTime = moment(createTime);
                            expectTime = moment(expectTime);

                            const left = Math.floor((currentTime - expectTime)*0.001);

                            createTime = createTime.format('YYYY-MM-DD HH:mm:ss');
                            expectTime = expectTime.format('YYYY-MM-DD HH:mm:ss');

                            // console.log(`item[${i}] : ${left} sec ago`)
                            if(left < 1800) return list.slice(i);
                            if (i === list.length-1) return [];
                        }
                        return list;
                    });
                    
    },
    [ACCEPT_REFRESH_SUCCESS] : (state, action) => state.set('status', 'acceptRefreshSuccess'),

}, initialState);
