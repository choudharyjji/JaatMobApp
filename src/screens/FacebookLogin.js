import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FBSDK, { LoginManager , AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

export default class FacebookLogin extends Component {
    
    async getAccesToken(_this) {
        var __this=_this
        await(AccessToken.getCurrentAccessToken().then(
            (data) => {
            //console.log(data)
            let accessToken = data.accessToken
            
            let req = new GraphRequest('/me', 
                {
                    parameters: {
                    fields: {string : 'email,name,friends,picture'},
                    accessToken: {string : accessToken.toString()}
                    }
                },
                (err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        //console.log(res.email)
                        //__this.props.navigation.navigate('Perfil',{ user: res })
                        //console.log(res);
                        __this._createdbUser(res.name, res.name, res.name, res.picture.data.url, res.email, 'false', 'facebook', res);
                        
                    }
                }
            )
            new GraphRequestManager().addRequest(req).start();
        }));
    }

    async _createdbUser(full_name, password, cpassword, profile_pic, email, access_token, account_source, userres){
        try {
            let response = await fetch('http://jaat.co.in/app/public/api/user/create', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    full_name: full_name,
                    password: password,
                    confirm_password: cpassword,
                    profile_pic: profile_pic,
                    email: email,
                    access_token: access_token,
                    account_source: account_source
                    
                })
            });
    
            let res = await response.text();
            
            if(response.status >= 200 && response.status < 300)
            {
                //success
                this.props.navigator.push({
                    screen: 'Jaat.MainScreen',
                    passProps: {
                        user : userres,
                        logged: true
                    }
                });
    
            }else{
                //error
                let error = response;
                throw error;
            }
    
            } catch(error) {
                
                console.log('error: '+ error);
                
            } 
    }

    _fbAuth(){

        var _this=this
        LoginManager.logInWithReadPermissions(['public_profile']).then(
          function(result) {
            if (result.isCancelled) {
              console.log('Login cancelled');
            } else {
              //console.log('Login success with permissions: '+result.grantedPermissions.toString());
              _this.getAccesToken(_this)
            }
          },
          function(error) {
            console.log('Login fail with error: ' + error);
          }
        );

    }

    render() {
        return(
            <TouchableOpacity 
                style={{backgroundColor: "#3b5998", marginBottom: 5, paddingTop: 5, paddingBottom: 5, paddingLeft: 15, paddingRight: 15 }}
                onPress={this._fbAuth.bind(this)}
            >
                <Text style={{fontFamily: 'Roboto', color: '#fff', fontSize: 15, width: 180, height: 25 }}>
                    <Icon name="facebook" size={16} color="#fff" />    Sign in with Facebook
                </Text>
            </TouchableOpacity>
        );
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