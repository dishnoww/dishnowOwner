import {createStackNavigator} from 'react-navigation';

import LoginHome from '../container/login';
import LoginRegister from '../container/register';
import LoginJoined from '../container/joined';
// import Test from '../container/tabMy';

const Stack = createStackNavigator(
    {
        LoginHome : {screen : LoginHome},
        LoginRegister : {screen : LoginRegister},
        LoginJoined : {screen : LoginJoined},
        // Test : {screen : Test},
    },
    {
        initialRouteName : 'LoginHome',
        headerMode : 'none',
    }
)

export default Stack; 