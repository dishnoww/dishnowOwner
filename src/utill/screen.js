
import {Dimensions, Platform, StatusBar} from 'react-native';
import { getInset } from 'react-native-safe-area-view';


const window = Dimensions.get('window');
const screen = Dimensions.get('screen');
const width  = Math.max(window.width, screen.width);
const height = Math.max(window.height, screen.height);

export const landScape = width > height;
// export const topSafe = getInset('top',landScape);
export const topSafe = getInset('top',landScape);
export const bottomSafe = getInset('bottom', landScape);
export const statusbarHeight = StatusBar.currentHeight;
export const topBarHeight = 56;
export const bottomTabHeight = 60;
export const paddingSide = 20;
export const screenWidth = width; 
export const screenHeight = (Platform.OS === 'ios' ? height : (height - statusbarHeight)) 
export const keyboardVerticalOffset = Platform.OS === 'ios' ? 64 : 0;

export const BaseWidth = 360;
export const screenRatio = width/BaseWidth;





