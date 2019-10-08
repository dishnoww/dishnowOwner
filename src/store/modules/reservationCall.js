import {createAction, handleActions } from 'redux-actions'
import {Map, List} from 'immutable';

const CALL_GET = 'reservation/CALL_GET';
const CALL_SET = 'reservation/CALL_SET';
const CALL_SET_FAIL = 'reservation/CALL_SET_FAIL';
const CALL_SET_SUCCESS = 'reservation/CALL_SET_SUCCESS';

const CALL_STATUS_RESET = 'reservation/CALL_STATUS_RESET';


export const callGet = createAction(CALL_GET);
export const callSet = createAction(CALL_SET);
export const callSetFail = createAction(CALL_SET_FAIL);
export const callSetSuccess = createAction(CALL_SET_SUCCESS);
export const callStatusReset = createAction(CALL_STATUS_RESET);


const initialState = Map({
    status : '',
    isCall : false,
})


export default handleActions({
    [CALL_GET] : (state, action) => state.set('isCall', action.payload=='true'),
    [CALL_SET] : (state, action) => state.set('status', 'callSet'),
    [CALL_SET_FAIL] : (state, action) => state.set('status', 'callSetFail'),
    [CALL_SET_SUCCESS] : (state, action) => {
        // console.log(action.payload);
        // console.log('call state');
        return state.set('status', 'callSetSuccess').set('isCall', action.payload=='true')
    },
    [CALL_STATUS_RESET] : (state, action) => state.set('status', ''),
}, initialState)