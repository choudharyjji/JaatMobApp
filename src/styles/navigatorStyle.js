import {
    Platform,
} from 'react-native';
import { Navigation } from 'react-native-navigation';

export const noNavTabbarNavigation = {
    orientation: 'portrait',
    navBarHidden: true,
    tabBarHidden: true,
    statusBarBlur: false,
    statusBarColor: 'rgba(153,113,66,0.9)',
}

export const appSingleNavigation = {
    navBarHidden: true,
    orientation: 'portrait',
    statusBarColor: 'rgba(153,113,66,0.9)',
    statusBarTextColorSchemeSingleScreen: 'rgba(153,113,66,0.9)',
}

export const singleScreenNavigation = {
    orientation: 'portrait',
    navBarHidden: true,
    tabBarHidden: true,
    statusBarColor: 'rgba(153,113,66,0.9)',
    statusBarTextColorScheme: 'rgba(153,113,66,0.9)',
}
