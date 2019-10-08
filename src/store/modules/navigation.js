import {createAction, handleActions } from 'redux-actions'
import {Map, List} from 'immutable';

const CURRENT_TAB = 'app/CURRENT_TAB';

export const currentTab = createAction(CURRENT_TAB);

const initialState = 'tab1';


export default handleActions ({
    [CURRENT_TAB] : (state, action) => {
        // console.log(action.payload);
        return action.payload
    },
}, initialState);


