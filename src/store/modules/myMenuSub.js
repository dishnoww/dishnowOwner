import {createAction, handleActions } from 'redux-actions'
import {Map, List} from 'immutable';



// menuSub
const MENU_SUB_STATUS_RESET = 'store/MENU_SUB_STATUS_RESET';
export const MENU_SUB_GET_SERVER = 'menuSub/MENU_SUB_GET_SERVER';
export const MENU_SUB_GET_SERVER_FAIL = 'menuSub/MENU_SUB_GET_SERVER_FAIL';
export const MENU_SUB_GET_SERVER_SUCCESS = 'menuSub/MENU_SUB_GET_SERVER_SUCCESS';

export const MENU_SUB_PUT_SERVER = 'menuSub/MENU_SUB_PUT_SERVER';
export const MENU_SUB_PUT_SERVER_FAIL = 'menuSub/MENU_SUB_PUT_SERVER_FAIL';
export const MENU_SUB_PUT_SERVER_SUCCESS = 'menuSub/MENU_SUB_PUT_SERVER_SUCCESS';

export const menuSubStatusReset = createAction(MENU_SUB_STATUS_RESET);

export const menuSubGetServer = createAction(MENU_SUB_GET_SERVER);
export const menuSubGetServerFail = createAction(MENU_SUB_GET_SERVER_FAIL);
export const menuSubGetServerSuccess = createAction(MENU_SUB_GET_SERVER_SUCCESS);

export const menuSubPutServer = createAction(MENU_SUB_PUT_SERVER);
export const menuSubPutServerFail = createAction(MENU_SUB_PUT_SERVER_FAIL);
export const menuSubPutServerSuccess = createAction(MENU_SUB_PUT_SERVER_SUCCESS);


const initialState = Map({
    status : '',
    menu : [/* menu payload */],
});


// menu payload 
// {
//     category : '',
//     menu : [
//         {name : '', price : ''},
//     ]
// },


export default handleActions ({
    [MENU_SUB_STATUS_RESET] : (state, action) => state.set('status', ''),
    [MENU_SUB_GET_SERVER] : (state, action) => state.set('status', 'menuSubGetServer'),
    [MENU_SUB_GET_SERVER_FAIL] : (state, action) => state.set('status', 'menuSubGetServerFail').set('error', action.payload),
    [MENU_SUB_GET_SERVER_SUCCESS] : (state, action) => state.set('status', 'menuSubGetServerSuccess')
                                                         .set('menu', action.payload),

    [MENU_SUB_PUT_SERVER] : (state, action) => state.set('status', 'menuSubPutServer'),
    [MENU_SUB_PUT_SERVER_FAIL] : (state, action) => state.set('status', 'menuSubPutServerFail').set('error', action.payload),
    [MENU_SUB_PUT_SERVER_SUCCESS] : (state, action) => state.set('status', 'menuSubPutServerSuccess'),
}, initialState);