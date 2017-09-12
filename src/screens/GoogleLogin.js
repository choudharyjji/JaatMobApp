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
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

export default class GoogleLogin extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            user: null
        }
    }

    componentWillMount(){
        GoogleSignin.configure({
            webClientId: '776506334488-066c3v96vcn8fu6uhfkhbp5c9qhvejtc.apps.googleusercontent.com'
        });
    }

    __userloggedIn(){
        let details = this.state.user;
        this.props.navigator.push({
            screen: 'Jaat.MainScreen',
            passProps: {
                user : details,
                logged: true
            }
        });
    }

    async _createdbUser(full_name, password, cpassword, profile_pic, email, access_token, account_source){
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
                this.__userloggedIn();
    
            }else{
                //error
                let error = response;
                throw error;
            }
    
            } catch(error) {
                
                console.log('error: '+ error);
                
            } 
    }

    _googleAuth(){
        GoogleSignin.signIn()
        .then((user) => {
            
            console.log(user.accessToken);
            this.setState({user: user});
            this._createdbUser(user.name, user.name, user.name, user.photo, user.email, user.accessToken, 'google');

        })
        .catch((err) => {
          console.log('WRONG SIGNIN', err);
        })
        .done();

    }

    render() {
        return(
            <TouchableOpacity
                style={{backgroundColor: "#D6201F", marginBottom: 5, paddingTop: 5, paddingBottom: 5, paddingLeft: 15, paddingRight: 15 }}
                onPress={this._googleAuth.bind(this)}
            >
                <Text style={{fontFamily: 'Roboto', color: '#fff', fontSize: 15, width: 180, height: 25 }}>
                    <Icon name="google-plus" size={16} color="#fff" />    Sign in with Google
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