import {Navigation} from 'react-native-navigation';

//Start Up Screen
import StartUpScreen from './StartUpScreen';
import SignInScreen from './SignInScreen';
import MainScreen from './MainScreen';

export function registerScreens() {

Navigation.registerComponent('Jaat.StartUpScreen', () => StartUpScreen);
Navigation.registerComponent('Jaat.SignInScreen', () => SignInScreen);
Navigation.registerComponent('Jaat.MainScreen', () => MainScreen);

}