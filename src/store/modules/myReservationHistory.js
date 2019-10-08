import {createAction, handleActions } from 'redux-actions'
import {Map, List} from 'immutable';


// history
const HISTORY_STATUS_RESET = 'history/HISTORY_STATUS_RESET';
export const HISTORY_GET_SERVER = 'history/HISTORY_GET_SERVER';
export const HISTORY_GET_SERVER_FAIL = 'history/HISTORY_GET_SERVER_FAIL';
export const HISTORY_GET_SERVER_SUCCESS = 'history/HISTORY_GET_SERVER_SUCCESS';

export const historyStatusReset = createAction(HISTORY_STATUS_RESET);

export const historyGetServer = createAction(HISTORY_GET_SERVER);
export const historyGetServerFail = createAction(HISTORY_GET_SERVER_FAIL);
export const historyGetServerSuccess = createAction(HISTORY_GET_SERVER_SUCCESS);


const initialState = Map({
    status : '',
    history : [],
    endReached : false,
    page : 0,
    error : '',
});

export default handleActions ({
    [HISTORY_STATUS_RESET] : (state, action) => state.set('status', '').set('endReached', false).set('page', 0),
    [HISTORY_GET_SERVER] : (state, action) => state.set('status', 'historyGetServer'),
    [HISTORY_GET_SERVER_FAIL] : (state, action) => state.set('status', 'historyGetServerFail').set('error', action.payload),
    [HISTORY_GET_SERVER_SUCCESS] : (state, action) => {
        const newData = action.payload;
        let isEndReached = (newData.length < 20)
        if (newData.length <= 0) return state.set('status', 'historyGetServerSuccess').set('endReached', true);
        return state.set('status', 'historyGetServerSuccess')
                    .set('endReached', isEndReached)
                    .set('history', newData)
                    .update('page', p => p+1);
    },
                                                         

}, initialState);