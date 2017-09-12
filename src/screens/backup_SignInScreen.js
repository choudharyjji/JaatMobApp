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
    ActivityIndicator
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { noNavTabbarNavigation, appSingleNavigation } from '../styles/navigatorStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';
import FBSDK, { LoginManager , AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

// const config = {4rfgt54r43
//     apiKey: "AIzaSyDVfYrCPxQ3NlxZrmSQjJL23XfvKhoZCoc",
//     authDomain: "jaatdatabase.firebaseapp.com",
//     databaseURL: "https://jaatdatabase.firebaseio.com",
//     projectId: "jaatdatabase",
//     storageBucket: "jaatdatabase.appspot.com",
//     messagingSenderId: "1060695418074"
// };
// firebase.initializeApp(config);

export default class SignInScreen extends Component {
    static navigatorStyle = appSingleNavigation;
    
    constructor(props) {
        super(props);
            
        this.state = {
            pageLoading: false,
            logged: false
        }
    
    }

    _fbAuth(){

        try {
            this.setState({pageLoading: true});

            LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
                function(result) {
                  if (result.isCancelled) {
                    this.setState({pageLoading: false});
                    console.log('Login cancelled');
                  } else {
                    
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                          
                            //token received
                            let token = data.accessToken.toString();
                            let req = new GraphRequest('/me', {
                                parameters: {
                                    'fields': {
                                        'string' : 'email,name,friends,picture'
                                    },
                                    accessToken: {
                                        string : token.toString()
                                    }
                                }
                            }, (err, res) => {
                                if (err) {
                                    console.log(err);
                                  } else {
                                    console.log(res);
                                    //__this.props.navigation.navigate('Perfil',{ user: res })
                                  }
                            });
                            
                            
                            // fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
                            // .then((response) => response.json())
                            // .then((json) => {
                            //   // Some user object has been set up somewhere, build that user here
                            //   console.log(json);
                            // //   user.name = json.name
                            // //   user.id = json.id
                            // //   user.user_friends = json.friends
                            // //   user.email = json.email
                            // //   user.username = json.name
                            // //   user.loading = false
                            // //   user.loggedIn = true
                            // //   user.avatar = setAvatar(json.id)      
                            // })
                            // .catch(() => {
                            //   reject('ERROR GETTING DATA FROM FACEBOOK')
                            // })
                        }
                      )

                  }
                },
                function(error) {
                    this.setState({pageLoading: false});
                    console.log('Login fail with error: ' + error);
                }
            );
            //const result = await LoginManager.logInWithPublishPermissions(['publish_actions']);
            // const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
            // const tokenData = await AccessToken.getCurrentAccessToken();
            // const token = tokenData.accessToken.toString();
            //const credential = firebase.auth.FacebookAuthProvider.credential(token);
            //const user = await firebase.auth().signInWithCredential(credential);
            
            //this.initFBUser(token);
            //insert the user to the firebase database
            // firebase.database().ref(`/users/${user.uid}/profile`).set({
            //     name: user.displayName,
            //     email: user.email,
            //     avatar: user.photoURL
            // });
            this.setState({pageLoading: false});

        } catch (error) {
            //error goes here 
            this.setState({pageLoading: false});
            console.log(error.message);
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
                    <TouchableOpacity
                        style={{backgroundColor: "#D6201F", marginBottom: 5, paddingTop: 5, paddingBottom: 5, paddingLeft: 15, paddingRight: 15 }}

                    >
                        <Text style={{fontFamily: 'Roboto', color: '#fff', fontSize: 15, width: 180, height: 25 }}>
                            <Icon name="google-plus" size={16} color="#fff" />    Sign in with Google
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{backgroundColor: "#3b5998", marginBottom: 5, paddingTop: 5, paddingBottom: 5, paddingLeft: 15, paddingRight: 15 }}
                        onPress={this._fbAuth.bind(this)}
                    >
                        <Text style={{fontFamily: 'Roboto', color: '#fff', fontSize: 15, width: 180, height: 25 }}>
                            <Icon name="facebook" size={16} color="#fff" />    Sign in with Facebook
                        </Text>
                    </TouchableOpacity>
                    <View>
                        <Text style={{marginBottom: 10, color: '#fff', alignSelf: 'center'}}>
                            Or sign in with your account
                        </Text>
                    </View>
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