import {createStackNavigator} from 'react-navigation';

import MyStoreHome from '../../container/tabMy/editStore'
import MyStoreInfo from '../../container/tabMy/editStore/editStoreInfo'
import MyStorePhoto from '../../container/tabMy/editStore/editStorePhoto'


const Stack = createStackNavigator(
    {
        MyStoreHome : {screen : MyStoreHome},
        MyStoreInfo : {screen : MyStoreInfo},
        MyStorePhoto : {screen : MyStorePhoto},
    },
    {
        initialRouteName : 'MyStoreHome',
        headerMode : 'none',
    }
)
export default Stack; 


