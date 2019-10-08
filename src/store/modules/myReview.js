import {createAction, handleActions } from 'redux-actions'
import {Map, List} from 'immutable';


// review
const REVIEW_STATUS_RESET = 'review/REVIEW_STATUS_RESET';


export const REVIEW_GET_SERVER = 'review/REVIEW_GET_SERVER';
export const REVIEW_GET_SERVER_FAIL = 'review/REVIEW_GET_SERVER_FAIL';
export const REVIEW_GET_SERVER_SUCCESS = 'review/REVIEW_GET_SERVER_SUCCESS';

export const REVIEW_GET_NO_SERVER = 'review/REVIEW_GET_NO_SERVER';
export const REVIEW_GET_NO_SERVER_FAIL = 'review/REVIEW_GET_NO_SERVER_FAIL';
export const REVIEW_GET_NO_SERVER_SUCCESS = 'review/REVIEW_GET_NO_SERVER_SUCCESS';

export const REVIEW_GET_ANSWER_SERVER = 'review/REVIEW_GET_ANSWER_SERVER';
export const REVIEW_GET_ANSWER_SERVER_FAIL = 'review/REVIEW_GET_ANSWER_SERVER_FAIL';
export const REVIEW_GET_ANSWER_SERVER_SUCCESS = 'review/REVIEW_GET_ANSWER_SERVER_SUCCESS';

export const REVIEW_GET_NO_ANSWER_SERVER = 'review/REVIEW_GET_NO_ANSWER_SERVER';
export const REVIEW_GET_NO_ANSWER_SERVER_FAIL = 'review/REVIEW_GET_NO_ANSWER_SERVER_FAIL';
export const REVIEW_GET_NO_ANSWER_SERVER_SUCCESS = 'review/REVIEW_GET_NO_ANSWER_SERVER_SUCCESS';

export const REVIEW_PUT_ANSWER_SERVER = 'review/REVIEW_PUT_ANSWER_SERVER';
export const REVIEW_PUT_ANSWER_SERVER_FAIL = 'review/REVIEW_PUT_ANSWER_SERVER_FAIL';
export const REVIEW_PUT_ANSWER_SERVER_SUCCESS = 'review/REVIEW_PUT_ANSWER_SERVER_SUCCESS';



export const reviewStatusReset = createAction(REVIEW_STATUS_RESET);

export const reviewGetServer = createAction(REVIEW_GET_SERVER);
export const reviewGetServerFail = createAction(REVIEW_GET_SERVER_FAIL);
export const reviewGetServerSuccess = createAction(REVIEW_GET_SERVER_SUCCESS);

export const reviewGetAnswerServer = createAction(REVIEW_GET_ANSWER_SERVER);
export const reviewGetAnswerServerFail = createAction(REVIEW_GET_ANSWER_SERVER_FAIL);
export const reviewGetAnswerServerSuccess = createAction(REVIEW_GET_ANSWER_SERVER_SUCCESS);

export const reviewGetNoAnswerServer = createAction(REVIEW_GET_NO_ANSWER_SERVER);
export const reviewGetNoAnswerServerFail = createAction(REVIEW_GET_NO_ANSWER_SERVER_FAIL);
export const reviewGetNoAnswerServerSuccess = createAction(REVIEW_GET_NO_ANSWER_SERVER_SUCCESS);

export const reviewPutAnswerServer = createAction(REVIEW_PUT_ANSWER_SERVER);
export const reviewPutAnswerServerFail = createAction(REVIEW_PUT_ANSWER_SERVER_FAIL);
export const reviewPutAnswerServerSuccess = createAction(REVIEW_PUT_ANSWER_SERVER_SUCCESS);




const initialState = Map({
    status : '',
    answer : [],
    noAnswer : [],
    pageAnswer : 1, 
    pageNoAnswer : 1,
    endReachedAnswer : false,
    endReachedNoAnswer : false,
    count : {noAnswer : 0, answer : 0 },
});

export default handleActions ({
    [REVIEW_STATUS_RESET] : (state, action) => state.set(initialState),
    [REVIEW_GET_SERVER] : (state, action) => state.set('status', 'reviewGetServer'),
    [REVIEW_GET_SERVER_FAIL] : (state, action) => state.set('status', 'reviewGetServerFail').set('error', action.payload),
    [REVIEW_GET_SERVER_SUCCESS] : (state, action) =>  {
        return state.set('status', 'reviewGetServerSuccess')
                    .set('answer', action.payload.answer)
                    .set('noAnswer', action.payload.noAnswer)
                    .set('count', action.payload.count);
    },

    [REVIEW_GET_ANSWER_SERVER] : (state, action) => state.set('status', 'reviewGetAnswerServer'),
    [REVIEW_GET_ANSWER_SERVER_FAIL] : (state, action) => state.set('status', 'reviewGetAnswerServerFail').set('error', action.payload),
    [REVIEW_GET_ANSWER_SERVER_SUCCESS] : (state, action) => {
        if (action.payload.length <= 0) return state.set('status', 'reviewGetAnswerServerSuccess').set('endReachedAnswer', true);
        return state.set('status', 'reviewGetAnswerServerSuccess')
                    .set('endReachedAnswer', (action.payload.length < 20))
                    .update('answer', state => state.concat(action.payload))
                    .update('pageAnswer', p => p+1);
    },

    [REVIEW_GET_NO_ANSWER_SERVER] : (state, action) => state.set('status', 'reviewGetNoAnswerServer'),
    [REVIEW_GET_NO_ANSWER_SERVER_FAIL] : (state, action) => state.set('status', 'reviewGetNoAnswerServerFail').set('error', action.payload),
    [REVIEW_GET_NO_ANSWER_SERVER_SUCCESS] : (state, action) => {
        if (action.payload.length <= 0) return state.set('status', 'reviewGetNoAnswerServerSuccess').set('endReachedNoAnswer', true);
        return state.set('status', 'reviewGetNoAnswerServerSuccess')
                    .set('endReachedNoAnswer', (action.payload.length < 20))
                    .update('noAnswer', state => state.concat(action.payload))
                    .update('pageNoAnswer', p => p+1);
    },
                                                         
    [REVIEW_PUT_ANSWER_SERVER] : (state, action) => state.set('status', 'reviewPutAnswerServer'),
    [REVIEW_PUT_ANSWER_SERVER_FAIL] : (state, action) => state.set('status', 'reviewPutAnswerServerFail').set('error', action.payload),
    [REVIEW_PUT_ANSWER_SERVER_SUCCESS] : (state, action) => state.set('status', 'reviewPutAnswerServerSuccess'),
}, initialState);