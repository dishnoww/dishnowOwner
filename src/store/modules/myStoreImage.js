import {createAction, handleActions } from 'redux-actions'
import {Map, List} from 'immutable';



// image
const IMAGE_STATUS_RESET  ='store/IMAGE_STATUS_RESET'
export const IMAGE_GET_SERVER = 'store/IMAGE_GET_SERVER';
const IMAGE_GET_SERVER_FAIL = 'store/IMAGE_GET_SERVER_FAIL';
const IMAGE_GET_SERVER_SUCCESS = 'store/IMAGE_GET_SERVER_SUCCESS';

export const IMAGE_UPLOAD_FILE = 'store/IMAGE_UPLOAD_FILE';
const IMAGE_UPLOAD_FILE_FAIL = 'store/IMAGE_UPLOAD_FILE_FAIL';
const IMAGE_UPLOAD_FILE_SUCCESS = 'store/IMAGE_UPLOAD_FILE_SUCCESS';

export const IMAGE_UPLOAD_LINK = 'store/IMAGE_UPLOAD_LINK';
const IMAGE_UPLOAD_LINK_FAIL = 'store/IMAGE_UPLOAD_LINK_FAIL';
const IMAGE_UPLOAD_LINK_SUCCESS = 'store/IMAGE_UPLOAD_LINK_SUCCESS';

export const imageStatusReset = createAction(IMAGE_STATUS_RESET);

export const imageGetServer = createAction(IMAGE_GET_SERVER);
export const imageGetServerFail = createAction(IMAGE_GET_SERVER_FAIL);
export const imageGetServerSuccess = createAction(IMAGE_GET_SERVER_SUCCESS);

export const imageUploadFile = createAction(IMAGE_UPLOAD_FILE);
export const imageUploadFileFail = createAction(IMAGE_UPLOAD_FILE_FAIL);
export const imageUploadFileSuccess = createAction(IMAGE_UPLOAD_FILE_SUCCESS);

export const imageUploadLink = createAction(IMAGE_UPLOAD_LINK);
export const imageUploadLinkFail = createAction(IMAGE_UPLOAD_LINK_FAIL);
export const imageUploadLinkSuccess = createAction(IMAGE_UPLOAD_LINK_SUCCESS);


const initialState = Map({
    image : List(['', '', '', '', '']),
    willUploadUrl : [],
    status : '',
    error : '',
});


export default handleActions ({
    [IMAGE_STATUS_RESET] : (state, action) => state.set('status', ''),
    [IMAGE_GET_SERVER] : (state, action) => state.set('status', 'imageGetServer'),
    [IMAGE_GET_SERVER_FAIL] : (state, action) => state.set('status', 'imageGetServerFail').set('error', action.payload),
    [IMAGE_GET_SERVER_SUCCESS] : (state, action) => {
        
        return state.set('status', 'imageGetServerSuccess')
                    .set('image', action.payload);
    },

    [IMAGE_UPLOAD_FILE] : (state, action) => state.set('status', 'imageUploadFile'),
    [IMAGE_UPLOAD_FILE_FAIL] : (state, action) => state.set('status', 'imageUploadFileFail').set('error', action.payload),
    [IMAGE_UPLOAD_FILE_SUCCESS] : (state, action) => {
        // console.log('\n' + action.payload);
        // console.log('업로드한 이미지의 링크 목록\n >> ' + JSON.stringify(action.payload));
        return state.set('willUploadUrl', action.payload)
                    .set('status', 'imageUploadFileSuccess');
                    
    },

    [IMAGE_UPLOAD_LINK] : (state, action) => state.set('status', 'imageUploadLink'),
    [IMAGE_UPLOAD_LINK_FAIL] : (state, action) => state.set('status', 'imageUploadLinkFail').set('error', action.payload),
    [IMAGE_UPLOAD_LINK_SUCCESS] : (state, action) => state.set('status', 'imageUploadLinkSuccess'),
}, initialState);