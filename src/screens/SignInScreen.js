import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { noNavTabbarNavigation, appSingleNavigation } from '../styles/navigatorStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import FacebookLogin from './FacebookLogin';
import GoogleLogin from './GoogleLogin';

export default class SignInScreen extends Component {
    static navigatorStyle = appSingleNavigation;
    
    constructor(props) {
        super(props);
            
        this.state = {
            pageLoading: false,
            logged: false,
            name: ''
        }
    
    }

    async storeToken(accessToken)
    {
        try{

            await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
            //this.getToken();

        }catch(error){
            console.log('something went wrong with store token Method');
        }
    }

    async getToken()
    {
        try{

            let token = await AsyncStorage.getItem(ACCESS_TOKEN);
            return token;
        }catch(error){
            console.log('something went wrong with get token Method');
        }
    }

    render(){

        return(
            <KeyboardAvoidingView behavior="padding" style={{position: 'relative', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{position: 'absolute',
                top: 0,
                bottom: 0, right: 0, left: 0, width: null, height: null,
                }}>
                <Image
                    source={require('../../img/jaat-signin-background.jpg')}
                    style={{position:'absolute',
                    bottom: 0,
                    left: 0, 
                    right: 0,
                    top: 0,
                    width: null,
                    height: null,
                    flex: 1}}
                />
                </View>
                <ActivityIndicator 
                    animating={this.state.pageLoading}
                    color="#000"
                />
                <View class={styles.container}>
                    
                    <FacebookLogin navigator={this.props.navigator} />
                    <GoogleLogin navigator={this.props.navigator} />
                    <View style={styles.logincontainer}>
                        <View style={styles.inputbar}>
                            <View style={{height: 40, padding: 9}}>
                                <Icon name="at" size={16} color="rgba(0,0,0,0.7)" />
                            </View>
                            <TextInput
                                style={{width: 200, height: 30, paddingLeft: 10,
                                paddingTop: 5,
                                paddingBottom: 5,
                                paddingRight: 5,
                                borderLeftWidth: 0.8, 
                                borderLeftColor: 'rgba(0,0,0,0.1)', }}
                                placeholder='Your Email Address'
                                underlineColorAndroid='transparent'
                                returnKeyType="next"
                                onSubmitEditing={() => this.passwordInput.focus()}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                //onChangeText={(val) => this.setState({username: val})}
                            />
                        </View>
                        <View style={styles.seprator}></View>
                        <View style={styles.inputbar}>
                            <View style={{height: 40, padding: 9}}>
                                <Icon name="lock" size={16} color="rgba(0,0,0,0.7)" />
                            </View>
                            <TextInput
                                style={{width: 200, height: 30, paddingLeft: 10,
                                paddingTop: 5,
                                paddingBottom: 5,
                                paddingRight: 5,
                                borderLeftWidth: 0.8, 
                                borderLeftColor: 'rgba(0,0,0,0.1)',}}
                                placeholder='Your Password'
                                underlineColorAndroid='transparent'
                                returnKeyType="go"
                                secureTextEntry
                                ref={(input) => this.passwordInput = input}
                                //onChangeText={(val) => this.setState({username: val})}
                            />
                        </View>
                    </View>
                    <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <TouchableOpacity>
                            <Text style={{width: 115, 
                            marginRight: 10, 
                            textAlign: 'center', 
                            borderWidth: 0.5,
                            borderColor: 'rgba(0,0,0,0.5)',
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            color: 'rgba(255,255,255,1)',
                            padding: 5  }}>Register</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={{width: 115, 
                            textAlign: 'center', 
                            borderWidth: 0.5,
                            borderColor: 'rgba(0,0,0,0.5)',
                            backgroundColor: 'rgba(97,173,102,1)',
                            color: '#fff',
                            padding: 5 }}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        zIndex: 9
    },
    facebookBtn: {
        
    },
    logincontainer: {
        backgroundColor: '#fff',
        height: 80,
        borderWidth: 1,
        borderColor: '#fff',
        padding: 5
    },
    inputbar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    seprator: {
        borderBottomWidth: 0.8, 
        borderBottomColor: 'rgba(0,0,0,0.1)',
        marginBottom: 5
    }
});