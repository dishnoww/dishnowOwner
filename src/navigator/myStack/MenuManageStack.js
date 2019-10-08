import {createStackNavigator} from 'react-navigation';

import MyMenuHome from '../../container/tabMy/editMenu'
import MyMenuAll from '../../container/tabMy/editMenu/editAllMenu'
import MyMenuBestSeller from '../../container/tabMy/editMenu/editBestMenu'

const Stack = createStackNavigator(
    {
        MyMenuHome : {screen : MyMenuHome},
        MyMenuAll : {screen : MyMenuAll},
        MyMenuBestSeller : {screen : MyMenuBestSeller},
    },
    {
        initialRouteName : 'MyMenuHome',
        headerMode : 'none',
    }
)
export default Stack; 


