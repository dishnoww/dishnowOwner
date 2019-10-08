import {createAction, handleActions } from 'redux-actions'
import {Map, List} from 'immutable';



// menuMain
const MENU_MAIN_STATUS_RESET = 'store/MENU_MAIN_STATUS_RESET';
export const MENU_MAIN_GET_SERVER = 'menuMain/MENU_MAIN_GET_SERVER';
export const MENU_MAIN_GET_SERVER_FAIL = 'menuMain/MENU_MAIN_GET_SERVER_FAIL';
export const MENU_MAIN_GET_SERVER_SUCCESS = 'menuMain/MENU_MAIN_GET_SERVER_SUCCESS';

export const MENU_MAIN_PUT_SERVER = 'menuMain/MENU_MAIN_PUT_SERVER';
export const MENU_MAIN_PUT_SERVER_FAIL = 'menuMain/MENU_MAIN_PUT_SERVER_FAIL';
export const MENU_MAIN_PUT_SERVER_SUCCESS = 'menuMain/MENU_MAIN_PUT_SERVER_SUCCESS';

export const MENU_MAIN_IMAGE_UPLOAD_FILE = 'menuMain/MENU_MAIN_IMAGE_UPLOAD_FILE';
export const MENU_MAIN_IMAGE_UPLOAD_FILE_FAIL = 'menuMain/MENU_MAIN_IMAGE_UPLOAD_FILE_FAIL';
export const MENU_MAIN_IMAGE_UPLOAD_FILE_SUCCESS = 'menuMain/MENU_MAIN_IMAGE_UPLOAD_FILE_SUCCESS';

export const MENU_MAIN_IMAGE_UPLOAD_LINK = 'menuMain/MENU_MAIN_IMAGE_UPLOAD_LINK';
export const MENU_MAIN_IMAGE_UPLOAD_LINK_FAIL = 'menuMain/MENU_MAIN_IMAGE_UPLOAD_LINK_FAIL';
export const MENU_MAIN_IMAGE_UPLOAD_LINK_SUCCESS = 'menuMain/MENU_MAIN_IMAGE_UPLOAD_LINK_SUCCESS';

export const menuMainStatusReset = createAction(MENU_MAIN_STATUS_RESET);

export const menuMainGetServer = createAction(MENU_MAIN_GET_SERVER);
export const menuMainGetServerFail = createAction(MENU_MAIN_GET_SERVER_FAIL);
export const menuMainGetServerSuccess = createAction(MENU_MAIN_GET_SERVER_SUCCESS);

export const menuMainPutServer = createAction(MENU_MAIN_PUT_SERVER);
export const menuMainPutServerFail = createAction(MENU_MAIN_PUT_SERVER_FAIL);
export const menuMainPutServerSuccess = createAction(MENU_MAIN_PUT_SERVER_SUCCESS);

export const menuMainImageUploadFile = createAction(MENU_MAIN_IMAGE_UPLOAD_FILE);
export const menuMainImageUploadFileFail = createAction(MENU_MAIN_IMAGE_UPLOAD_FILE_FAIL);
export const menuMainImageUploadFileSuccess = createAction(MENU_MAIN_IMAGE_UPLOAD_FILE_SUCCESS);

const initialState = Map({
    status : '',
    image : [],
    uploadedImage : [],
    menu : {},
});

export default handleActions ({
    [MENU_MAIN_STATUS_RESET] : (state, action) => state.set('status', ''),
    [MENU_MAIN_GET_SERVER] : (state, action) => state.set('status', 'menuMainGetServer'),
    [MENU_MAIN_GET_SERVER_FAIL] : (state, action) => state.set('status', 'menuMainGetServerFail').set('error', action.payload),
    [MENU_MAIN_GET_SERVER_SUCCESS] : (state, action) => state.set('status', 'menuMainGetServerSuccess')
                                                         .set('menu', action.payload),

    [MENU_MAIN_PUT_SERVER] : (state, action) => state.set('status', 'menuMainPutServer'),
    [MENU_MAIN_PUT_SERVER_FAIL] : (state, action) => state.set('status', 'menuMainPutServerFail').set('error', action.payload),
    [MENU_MAIN_PUT_SERVER_SUCCESS] : (state, action) => state.set('status', 'menuMainPutServerSuccess'),

    [MENU_MAIN_IMAGE_UPLOAD_FILE] : (state, action) => state.set('status', 'menuMainImageUploadFile'),
    [MENU_MAIN_IMAGE_UPLOAD_FILE_FAIL] : (state, action) => state.set('status', 'menuMainImageUploadFileFail').set('error', action.payload),
    [MENU_MAIN_IMAGE_UPLOAD_FILE_SUCCESS] : (state, action) => {
        // console.log(action.payload);
        return state.set('uploadedImage', action.payload)
                    .set('status', 'menuMainImageUploadFileSuccess');
                    
    },

}, initialState);