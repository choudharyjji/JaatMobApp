import React, { Component } from 'react';
import {
Platform,
Image,
} from 'react-native';
import { Navigation } from 'react-native-navigation';

import { registerScreens } from './screens';

registerScreens();

// this will start our app
Navigation.startSingleScreenApp({
    screen: {
      screen: 'Jaat.StartUpScreen',
      title: 'Start Screen'
    }
});