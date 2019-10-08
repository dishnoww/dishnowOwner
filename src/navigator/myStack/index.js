import {createStackNavigator} from 'react-navigation';

import MyHome from '../../container/tabMy';
import MyMenu from './MenuManageStack';
import MyStore from './StoreManageStack';
// import MyReview from '../../container/tabMy/editReview';
import MyReview from '../../container/tabMy/editReview';
import MyHistory from '../../container/tabMy/reservationHistory';

const Stack = createStackNavigator(
    {
        MyHome : {screen : MyHome},
        MyReview : {screen : MyReview},
        MyHistory : {screen : MyHistory},
        MyMenu,
        MyStore,
    },
    {
        initialRouteName : 'MyHome',
        headerMode : 'none',
    }
)

Stack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }
  
    return {
      tabBarVisible,
    };
  };
export default Stack; 


