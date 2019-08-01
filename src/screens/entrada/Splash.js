/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions, Alert, AsyncStorage } from 'react-native';
import {LoginManager} from 'react-native-fbsdk';
import Firebase     	from '../../managers/firebase';
import global 			from '../../managers/Global';


export default class Splash extends Component{

    componentDidMount() {
        setTimeout(() => {
            Firebase.init();
            global.firebase.auth().onAuthStateChanged(function(user){
                if(user){
                    if(global.userId != ''){
                        traer_datos()
                    }else{
                        traer_userId()
                    }
                }else{
                    login();
                    console.log("login");
                }
            })

            traer_userId = () => { this.traer_userId()  }
            traer_datos = () => { this.traer_datos() }
            login = () => { this.props.navigation.navigate('Intro'); global.events.emit('loader_off', ''); }

        }, 1000) 
    }

    traer_userId = async () => {
        try {
            const value = await AsyncStorage.getItem('userId');
            if(value != null){ 
                global.userId = value;
                this.traer_datos();
            }
        } catch (error) {
            console.log("Error retrieving data" + error);
        }
    }
    
    traer_datos = () => {
        var query = global.firebase.database().ref(global.databasePath).child('users');
            query.once('value', (snapshot) => {
                if(snapshot.val() != null){
                    this.verificar_datos();
                }else{
                    this.alerta('Older Version, please update. This release is: '+global.version);
                    global.firebase.auth().signOut();
                    global.userId = '';
                    AsyncStorage.clear();
                    LoginManager.logOut();
                }
        });
    }

    verificar_datos = () => {
        var query = global.firebase.database().ref(global.databasePath+'users/' + global.userId);
            query.once('value', (snapshot) => {
            if(snapshot.val() != null){
                global.user = snapshot.val();
                global.firebase.database().ref(global.databasePath+'users/' + global.userId).update({ 
                    device_id   : global.user.device_id
                });
                entrar();
            }
            else{
                if(global.tipo_registro == 'facebook'){
                    this.props.navigation.navigate('SignupFb');
                }
                else if(global.tipo_registro == 'email'){
                    global.firebase.database().ref(global.databasePath+'users/' + global.userId).set({            
                        userId	    : global.userId,
                        name	    : global.user.name,
                        email	    : global.user.email,
                        password	: global.user.password,
                        address	    : global.user.address,
                        phone	    : global.user.phone,
                        city	    : global.user.city,
                        state	    : global.user.state,
                        kids	    : global.user.kids,
                        about	    : global.user.about,
                        picture	    : global.user.picture,
                        fbId	    : global.user.fbId,
                        device_id   : global.user.device_id,
                        created	    : new Date().toDateString(),
                        timestamp   : global.firebase.database.ServerValue.TIMESTAMP,
                    }).then(function(snapshot) {
                        entrar();
                    });
                }else{
                    global.firebase.auth().signOut();
                }
            }
        })

        entrar = () => {
            global.events.emit('loader_off', '');
            this.check_about();
        }

        
    }


    check_about = async () => {
        try {
            const value = await AsyncStorage.getItem('userAbout');
            if(value != null){ 
                this.props.navigation.navigate('Bienvenida', {reload:'reload'});
            }else{
                this.guardar_about();
            }
        } catch (error) {
            console.log("Error retrieving data" + error);
        }
    }
    
    guardar_about = async () => {
        try {
            await AsyncStorage.setItem('userAbout', 'true');
            this.props.navigation.navigate('AboutIntro');
        } catch (error) {
            console.log("Error set data" + error);
        }
    }

    alerta = (value) => {
		Alert.alert(
			'Login',
			value,
			[
			  {text: '', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
			  {text: 'Close'},
			],
			{ cancelable: false }
		)
    }
    

    






    
    render() {
        return (
            <View style={styles.container}>
                <Image resizeMode="contain" style={styles.image} source={require('../../assets/logo.png')} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 300,
        height: 300
    }
})