import {createAction, handleActions } from 'redux-actions'
import {Map, List} from 'immutable';




const BOOKED_PUSH = 'reservation/BOOKED_PUSH';
const BOOKED_PULL = 'reservation/BOOKED_PULL';

export const bookedPush = createAction(BOOKED_PUSH);
export const bookedPull = createAction(BOOKED_PULL);



const initialState = List([]);


export default handleActions ({
    [BOOKED_PUSH] : (state, action) => {
        // const list = state.toArray();
        return state.concat([action.payload]);
    },
    [BOOKED_PULL] : (state, action) => {
        return state.slice(1);
    }
}, initialState);
