import {combineReducers} from 'redux';
import User from './user';
import Reservation from './reservation';
import ReservationCall from './reservationCall';
import ReservationAccept from './reservationAccept';
import ReservationConfirm from './reservationConfirm';
import ReservationBooked from './reservationBooked';

import MyMenuMain from './myMenuMain';
import MyMenuSub from './myMenuSub';
import MyStoreImage from './myStoreImage';
import MyStoreInformation from './myStoreInformation';
import MyReservationHistory from './myReservationHistory';

import Navigation from './navigation';

import MyReview from './myReview';

export default combineReducers({
    Navigation,
    User,
    Reservation,
    ReservationCall,
    ReservationAccept,
    ReservationConfirm,
    ReservationBooked,
    MyMenuMain,
    MyMenuSub,
    MyStoreImage,
    MyStoreInformation,
    MyReview,
    MyReservationHistory,
})