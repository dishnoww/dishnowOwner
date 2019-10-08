
import React, {useEffect} from 'react';
import {createSwitchNavigator, createAppContainer, createStackNavigator} from 'react-navigation';


import {useSelector, useDispatch} from 'react-redux';
import { currentTab } from '../store/modules/navigation';

//screens
import Splash from '../container/splash';
import Login from './LoginStack';
import Main from './MainTab';
import Booked from '../container/booked';
import Test from '../container/modalTest';

function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

const MainAppStack = createStackNavigator(
  {
    Main : {screen : Main},
    BookedModal : {screen : Booked},
  },
  {
    headerMode : 'none',
    mode : 'modal',
  }
)
const RootNavigaitor = createAppContainer(createSwitchNavigator(
    {
      Splash,
      Login,
      MainAppStack,

      Test
    },
    {
      initialRouteName : 'Splash',
    }
  )
);

  
  
  export default () => {
    const dispatch = useDispatch();

    return <RootNavigaitor
      onNavigationStateChange = {(prevState, currentState, action) => {
        const currentScreen = getActiveRouteName(currentState);
        const prevScreen = getActiveRouteName(prevState);
        if (prevScreen !== currentScreen) {
          dispatch(currentTab(currentScreen));
        }
      }}
    />

  }