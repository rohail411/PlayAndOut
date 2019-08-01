/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, { Component } from 'react';
import {StyleSheet, Text, View, Image,  TouchableOpacity, ImageBackground, AsyncStorage, Linking  } from 'react-native';
import {LoginManager, AccessToken, GraphRequest, GraphRequestManager} from 'react-native-fbsdk';
import Icon from 'react-native-vector-icons/FontAwesome';
import global from '../../managers/Global';

export default class Intro extends Component
{
	registro_facebook = () => 
	{
		global.events.emit('loader_on', '');
		LoginManager.logInWithReadPermissions(['email','public_profile']).then(
			function (result) {
				if (result.isCancelled) {
					console.log('Login was cancelled');
					global.events.emit('loader_off', '');
				} 
				else
				{
					AccessToken.getCurrentAccessToken().then((data) => {
						global.credential = global.firebase.auth.FacebookAuthProvider.credential(data.accessToken);
					}).then(() => {
						const infoRequest = new GraphRequest('me?fields=id,first_name,last_name,email,picture.height(200)', null, this.responseInfoCallback);
						new GraphRequestManager().addRequest(infoRequest).start();
					})
				}
			},
			function (error) {
				console.log('Login error: ' + error);
			}
		);

		responseInfoCallback = (error, result) => {
			if (error) {
				console.log('Login error: ' + error);
				global.events.emit('loader_off', '');
			} else {

				console.log('responseInfoCallback '+result.email);
				
				global.user.name 		= result.first_name+' '+result.last_name
				global.user.email  		= result.email
				global.user.fbId  		= result.id
				global.user.picture		= 'https://graph.facebook.com/'+result.id+'/picture?type=large'
				

				var user = result.email;
				global.userId = user.replace(/\./g, "_");
				global.tipo_registro = 'facebook';
				
				this.guardar_userId_fb();
			}
		}
	}
	
	guardar_userId_fb = async (value) => {

		console.log('guardar_userId:' +global.userId);
		
		try {
			await AsyncStorage.setItem('userId', global.userId);
			global.firebase.auth().signInWithCredential(global.credential);
		} catch (error) {
			global.events.emit('loader_off', '');
		}		
	}

	render() {
		return(
			<ImageBackground source={require('../../assets/background.png')} style={{width: '100%', height: '100%'}} > 
			<View style={styles.container}>

				<View style={styles.logoContainer}>
					<Image  resizeMode = 'contain' style={styles.logo} source={ require('../../assets/logo.png')}/>
				</View>

				<View style={styles.inputContainer}>
					<TouchableOpacity style={styles.botonFb} onPress={() => this.registro_facebook()}>
						<Icon style={[styles.icon,{marginRight: 16, fontSize: 21}]} name={'facebook'}/>
						<Text style={styles.botonTextFb}>Enter with Facebook</Text>
					</TouchableOpacity> 

					<TouchableOpacity style={styles.botonreg} onPress={() => this.props.navigation.navigate('Login')}>
						<Icon style={[styles.icon,{marginRight: 16, fontSize: 21}]}  name={'envelope'}/>
						<Text style={styles.botonregText}>Enter with Email</Text>
					</TouchableOpacity> 

					<TouchableOpacity style={styles.signupContainer} onPress={() => Linking.openURL('https://storage.googleapis.com/stopandboy-e2acb.appspot.com/privacy.html')}>
						<Text style={styles.signupButton}>Privacy Policy</Text>
					</TouchableOpacity>
				</View>
				
			</View>
			</ImageBackground>
		)
	}
}






const styles = StyleSheet.create({
	container : {
		flex: 1,
	},

	logoContainer: {
		flex: 1,
		alignItems:'center',
		justifyContent: 'flex-end',
		paddingHorizontal:30,
	},
	logo: {
		width: 300,
		height: 300,
    },
	tituloText: {
		fontSize:30,
		fontWeight: 'bold',
		color:'#ffffff',
		textAlign:'center'
	},
	tituloTextA: {
		//fontSize:16,
		//fontFamily: 'Circular',
		color:'#ffffff',
		textAlign:'center'
	},




	inputContainer: {
		flex: 1,
		paddingHorizontal:30,
		justifyContent: 'flex-end',
		paddingVertical:30,
	},

	botonFb: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems:'center',
		backgroundColor:'#143d82',
        borderRadius: 25,
		height: 50,
		marginBottom:15,
		elevation: 4,
	},
	botonTextFb: {
		fontFamily: 'vagroundedbt',
		fontSize:20,
		color:'#ffffff',
		textAlign:'center'
	},
	icon: {
		color: 'white',
		fontSize: 20,
	},

	botonreg: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems:'center',
		backgroundColor:'#ce252d',
        borderRadius: 25,
		height: 50,
		marginBottom:15,
    	elevation: 4,
	},
	botonregText: {
		fontFamily: 'vagroundedbt',
		fontSize:20,
		color:'#ffffff',
		textAlign:'center'
	},


	signupContainer : {
		alignItems:'center',
		justifyContent :'center',
		height: 20,
	},
	signupButton: {
		color:'#ffffff',
		fontSize:14,
		fontFamily: 'vagroundedbt',
	},
});