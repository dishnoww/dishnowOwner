import {createAction, handleActions } from 'redux-actions'
import {Map} from 'immutable';

const TOKEN = 'user/TOKEN';
const USER_STATUS_RESET = 'user/USER_STATUS_RESET';
export const AUTO_LOGIN = 'user/AUTO_LOGIN';
const AUTO_LOGIN_FAIL = 'user/AUTO_LOGIN_FAIL';
const AUTO_LOGIN_SUCCESS = 'user/AUTO_LOGIN_SUCCESS';
export const LOGIN = 'user/LOGIN';
const LOGIN_FAIL = 'user/LOGIN_FAIL';
const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS';
const LOGOUT = 'user/LOGOUT';
const LOGOUT_FAIL = 'user/LOGOUT_FAIL';
const LOGOUT_SUCCESS = 'user/LOGOUT_SUCCESS';
const REGISTER = 'user/REGISTER';
const REGISTER_FAIL = 'user/REGISTER_FAIL';
const REGISTER_SUCCESS = 'user/REGISTER_SUCCESS';
const REGISTER_STORE_STORE = 'user/REGISTER_STORE_STORE';
const REGISTER_STORE_HOST = 'user/REGISTER_STORE_HOST';
const REGISTER_STORE_IMAGE = 'user/REGISTER_STORE_IMAGE';
const REGISTER_GET_IMAGE = 'user/REGISTER_GET_IMAGE';
const REGISTER_IMAGE_UPLOAD_FAIL = 'user/REGISTER_IMAGE_UPLOAD_FAIL';
const REGISTER_VERIFY_CODE_STORE = 'user/REGISTER_VERIFY_CODE_STORE';
const REGISTER_VERIFY_CODE_REQUEST = 'user/REGISTER_VERIFY_CODE_REQUEST';
const REGISTER_VERIFY_CODE_REQUEST_FAIL = 'user/REGISTER_VERIFY_CODE_REQUEST_FAIL';
const REGISTER_VERIFY_CODE_REQUEST_SUCCESS = 'user/REGISTER_VERIFY_CODE_REQUEST_SUCCESS';
const REGISTER_VERIFY_CODE = 'user/REGISTER_VERIFY_CODE';
const REGISTER_VERIFY_CODE_COMPLETE = 'user/REGISTER_VERIFY_CODE_COMPLETE';
const REGISTER_VERIFY_CODE_TIMEOUT = 'user/REGISTER_VERIFY_CODE_TIMEOUT';
const REGISTER_GET_LONG_LAT = 'user/REGISTER_GET_LONG_LAT';
const REGISTER_GET_LONG_LAT_FAIL = 'user/REGISTER_GET_LONG_LAT_FAIL';
const REGISTER_GET_LONG_LAT_SUCCESS = 'user/REGISTER_GET_LONG_LAT_SUCCESS';
// const ME = 'user/ME';
// export const ME_FAIL = 'user/ME_FAIL';
// export const ME_SUCCESS = 'user/ME_SUCCESS';



export const token = createAction(TOKEN);
export const userStatusReset = createAction(USER_STATUS_RESET);

export const autoLogin = createAction(AUTO_LOGIN);
export const autoLoginFail = createAction(AUTO_LOGIN_FAIL);
export const autoLoginSuccess = createAction(AUTO_LOGIN_SUCCESS);

export const login = createAction(LOGIN);
export const loginFail = createAction(LOGIN_FAIL);
export const loginSuccess = createAction(LOGIN_SUCCESS);

export const logout = createAction(LOGOUT);
export const logoutSuccess = createAction(LOGOUT_SUCCESS);
export const logoutFail = createAction(LOGOUT_FAIL);

export const register = createAction(REGISTER);
export const registerFail = createAction(REGISTER_FAIL);
export const registerSuccess = createAction(REGISTER_SUCCESS);

export const registerStoreStore = createAction(REGISTER_STORE_STORE);
export const registerStoreHost = createAction(REGISTER_STORE_HOST);

export const registerStoreImage = createAction(REGISTER_STORE_IMAGE);
export const registerGetImage = createAction(REGISTER_GET_IMAGE);

export const registerImageUploadFail = createAction(REGISTER_IMAGE_UPLOAD_FAIL);

export const registerVerifyCodeStore = createAction(REGISTER_VERIFY_CODE_STORE);
export const registerVerifyCodeRequest = createAction(REGISTER_VERIFY_CODE_REQUEST);
export const registerVerifyCodeRequestFail = createAction(REGISTER_VERIFY_CODE_REQUEST_FAIL);
export const registerVerifyCodeRequestSuccess = createAction(REGISTER_VERIFY_CODE_REQUEST_SUCCESS);

export const registerVerifyCode = createAction(REGISTER_VERIFY_CODE);
export const registerVerifyCodeComplete = createAction(REGISTER_VERIFY_CODE_COMPLETE);
export const registerVerifyCodeTimeout = createAction(REGISTER_VERIFY_CODE_TIMEOUT);



export const registerGetLngLat = createAction(REGISTER_GET_LONG_LAT);
export const registerGetLngLatFail = createAction(REGISTER_GET_LONG_LAT_FAIL);
export const registerGetLngLatSuccess = createAction(REGISTER_GET_LONG_LAT_SUCCESS);


const initialState = Map({
    regist : {
        businessNumber : '',
        userName : '',
        userPhone : '',
        password : '',
        hostName : '',
        storeName : '',
        storePhone : '',
        address : '',
        zipCode : '',
        businessLicenseImage : '',
        longitude : '',
        latitude : '',

    },
    token : '',
    hostId : '',
    isCall : '',
    verifyCode : '',
    status : '',
    error : '',
});

export default handleActions ({

    [TOKEN] : (state, action) => state.set('token', action.payload),
    [USER_STATUS_RESET] : (state, action) => state.set('status', ''),

    [AUTO_LOGIN] : (state, action) =>  state.set('status', 'autologin')
                                            .set('error', null),

    [AUTO_LOGIN_FAIL] : (state, action) =>  state.set('status', 'autoLoginFail')
                                                 .set('error', action.payload),

    [AUTO_LOGIN_SUCCESS] : (state, action) => {
        const user = {
            ...state,
            status : 'autoLoginSuccess',
             error : null,
            ...action.payload};
        return Map(user);
    },

    [LOGIN] : (state, action) =>  state.set('status', 'login')
                                       .set('error', null),

    [LOGIN_FAIL] : (state, action) =>  state.set('status', 'loginFail')
                                            .set('error', action.payload),

    [loginSuccess] : (state, action) =>  {
        // console.log('login success');
        // console.log(action.payload);
        const user = {
            ...state,
            status : 'loginSuccess',
             error : null,
            ...action.payload};
        return Map(user);
    },




    [LOGOUT] : (state, action) =>  state.set('status', 'logout')
                                       .set('error', null),
    [LOGOUT_FAIL] : (state, action) =>  state.set('status', 'logoutFail')
                                       .set('error', '잠시 후 다시 시도해 주세요.'),
    [LOGOUT_SUCCESS] : (state, action) =>  state.set('status', 'logoutSuccess')
                                                .set('error', null),

    [REGISTER] : (state, action) =>  state.set('status', 'register')
                                          .set('error', null),

    [REGISTER_FAIL] : (state, action) =>  state.set('status', 'registerFail')
                                               .set('error', action.payload),

    [REGISTER_SUCCESS] : (state, action) => {
        const user = {
            ...state,
            status : 'registerSuccess',
             error : null,
            ...action.payload};
        return Map(user);
    },
    [REGISTER_STORE_STORE] : (state, {payload}) => state.set('regist' , {...state.get('regist'), ...payload})
                                                        .set('status' , 'registerStoreStore')
                                                        .set('error', null),

    [REGISTER_GET_IMAGE] : (state, action) =>  state.set('status', 'registerGetImage')
                                                    .set('error', null),

    [REGISTER_STORE_IMAGE] : (state, action) => state.set('regist' , {...state.get('regist'), businessLicenseImage : action.payload})
                                                     .set('status' , 'registerStoreImage')
                                                     .set('error', null),
    
    [REGISTER_STORE_HOST] : (state, {payload}) => state.set('regist' , {...state.get('regist'), ...payload})
                                                       .set('status' , 'registerStoreHost')
                                                       .set('error', null),
                                                       
    [REGISTER_VERIFY_CODE_REQUEST] : (state, action) =>  state.set('status', 'registerVerifyCodeRequest')
                                                              .set('error', null),

    [REGISTER_VERIFY_CODE_REQUEST_FAIL] : (state, action) =>  state.set('status', 'registerVerifyCodeRequestFail')
                                                                   .set('error', action.payload),

    [REGISTER_VERIFY_CODE_REQUEST_SUCCESS] : (state, action) =>  state.set('status', 'registerVerifyCodeRequestSuccess')
                                                                      .set('error', action.payload),

    [REGISTER_VERIFY_CODE_STORE] : (state, {payload}) => state.set('verifyCode', payload)
                                                              .set('status', 'registerVerifyCodeStore')
                                                              .set('error', payload),

    [REGISTER_VERIFY_CODE] : (state, {payload}) => {
        const verifycode = state.get('verifyCode');
        if (verifycode == payload) 
            return state.set('status', 'registerVerifyCodeSuccess') 
                        .set('error', '유효한 코드');
        else 
            return state.set('status', 'registerVerifyCodeFail') 
                        .set('error', '유효하지 않은 코드입니다.');
    },
    [REGISTER_VERIFY_CODE_TIMEOUT] :  (state, {payload}) => state.set('status', 'registerVerifyCodeTimeout')
                                                                 .set('error', action.payload),


    [REGISTER_IMAGE_UPLOAD_FAIL] : (state, action) => state.set('status', 'registerImageUploadFail')
                                                           .set('error', action.payload),

    [REGISTER_GET_LONG_LAT] : (state, action) => state.set('status', 'registerGetLngLat')
                                                      .set('error', null),

    [REGISTER_GET_LONG_LAT_FAIL] : (state, action) => state.set('status', 'registerGetLngLatFail')
                                                           .set('error', action.payload.error),

    [REGISTER_GET_LONG_LAT_SUCCESS] : (state, action) =>  {
        console.log('\n\n\n\n\n\n\n\n\n\n\n');
        console.log(action);
        console.log('\n\n\n\n\n\n\n\n\n\n\n');

        return state.set('status', 'registerGetLngLatSuccess')
            .set('regist' , {...state.get('regist'), ...action.payload})
    },

    

}, initialState);

