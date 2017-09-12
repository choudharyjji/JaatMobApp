import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import { appSingleNavigation } from '../styles/navigatorStyle';
import Video from 'react-native-video';

export default class StartUpScreen extends Component {
    static navigatorStyle = appSingleNavigation;

    render() {
        return(
        <View style={styles.container}>
            <Video
            source={require('../video/Lion-intro.mp4')}
            rate={1.0}
            volume={1.0}
            muted={false}
            resizeMode={"cover"}
            repeat
            style={styles.video}
            />
            <View></View>
            <View style={styles.content}>
                <TouchableHighlight onPress={this._onPressStart.bind(this)}>
                    <Text style={styles.text}>Continue</Text>
                </TouchableHighlight>
            </View>
        </View>
        );
    }

_onPressStart(){

    this.props.navigator.push({
        screen: 'Jaat.SignInScreen'
    });
}
} 

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    video: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    content: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end',
    },
    text: {
        fontSize: 15,
        textAlign: 'center',
        margin: 10,
        borderWidth: 1,
        borderRadius:5,
        borderColor: 'rgba(115,82,46,0.5)',
        backgroundColor: 'rgba(153,113,66,0.5)',
        color: '#fff',
        padding: 8
    },
});