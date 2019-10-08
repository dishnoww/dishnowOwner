
import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';

//Stacks (Tab page)
import Confirm from '../container/tabConfirm';
import Request from '../container/tabRequest';
import Wait from '../container/tabWait';
import My from './myStack';

import TabItem from '../component/TabItem'

import * as Utill from '../utill';

// help : https://reactnavigation.org/docs/en/tab-based-navigation.html

const mainTabNav = createBottomTabNavigator(
    {
        tab1 : {screen : Request},
        tab2 : {screen : Wait},
        tab3 : {screen : Confirm},
        tab4 : My,
    },
    {
        resetOnBlur : true,
        defaultNavigationOptions: ({ navigation }) => ({
            allowFontScaling : false,
            keyboardHidesTabBar : true,
            tabBarIcon :  ({focused, tintColor}) => {
                const {routeName} = navigation.state;
                let uri = '';
                switch (routeName) {
                    case 'tab1' : uri = focused ? 'icontabbellfocused' : 'icontabbell' ; break;
                    case 'tab2' : uri = focused ? 'icontabonwaitfocused' : 'icontabonwait' ; break;
                    case 'tab3' : uri = focused ? 'icontabreservationfocused' : 'icontabreservation' ;  break;
                    case 'tab4' : uri = focused ? 'icontabshopfocused' : 'icontabshop' ; break;
                }


                let label = '';
                switch (routeName) {
                    case 'tab1' : label = '예약 요청'; break;
                    case 'tab2' : label = '수락 목록'; break;
                    case 'tab3' : label = '예약 완료'; break;
                    case 'tab4' : label = 'MY'; break;
                }
                return (
                    <TabItem label={label} source={{uri}} tintColor={tintColor} />
                )
            }

        }),
        tabBarOptions: {
            activeTintColor : Utill.color.primary1,
            inactiveTintColor : Utill.color.defaultColor,
            allowFontScaling : false,
            showLabel : false,
            style : {height : Utill.screen.bottomTabHeight, padding : 0},
        },
    }
)

mainTabNav.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }
  
    return {
      tabBarVisible,
    };
  };

export default mainTabNav;

