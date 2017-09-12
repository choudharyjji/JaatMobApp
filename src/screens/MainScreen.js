import React, { Component } from 'react';
import {
    Text,
    View,
    Button,
    Image,
    StyleSheet,
} from 'react-native';

import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { singleScreenNavigation } from '../styles/navigatorStyle';

export default class MainScreen extends Component {
    static navigatorStyle = singleScreenNavigation;
    constructor(props) {
        super(props);
        
    }
    render(){
        return(
            
            <View>
                <Text>Hello {this.props.user.name}</Text>
                
            </View>

        );
    }
}