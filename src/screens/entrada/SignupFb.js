/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icone from 'react-native-vector-icons/Entypo';
import Iconm from 'react-native-vector-icons/MaterialIcons';
import global from '../../managers/Global';

export default class SignupFb extends Component
{
	static navigationOptions = {
		title: '',
		headerTintColor: 'white',
		headerStyle: { 	backgroundColor: '#017dc3', shadowOpacity: 0, elevation: 0, }
	};


	constructor(props) {
        super(props);
        this.state = {
            typed_name: 		'',
            typed_email: 		'',
            typed_password: 	'000000',
			typed_address: 		'',
			typed_phone: 		'',
			typed_city: 		'',
			typed_state: 		'',
			typed_kids: 		'',
			typed_about: 		'',
		};
	}

	componentDidMount() {
		global.events.emit('loader_off', '');

        this.setState({
            typed_name	    : global.user.name,
            typed_email		: global.user.email,
        });
    }



	verificar_datos = () => 
	{
		global.events.emit('loader_on', '');
		if(this.state.typed_name == '' || this.state.typed_email == '' || this.state.typed_password == '' || this.state.typed_address == '' || this.state.typed_phone == '' || this.state.typed_city == '' || this.state.typed_state == '' || this.state.typed_kids == '' || this.state.typed_about  == '' )
		{
			this.alerta('Please fill all fields.');
		}
		else{
			global.user.name 		= this.state.typed_name;
			global.user.email 		= this.state.typed_email;
			global.user.password 	= this.state.typed_password;
			global.user.address 	= this.state.typed_address;
			global.user.phone 		= this.state.typed_phone;
			global.user.city 		= this.state.typed_city;
			global.user.state 		= this.state.typed_state;
			global.user.kids 		= this.state.typed_kids;
			global.user.about 		= this.state.typed_about;
			
			var user = global.user.email;
			global.userId = user.replace(/\./g, "_");
				
			global.tipo_registro = 'email';
			this.guardar_user();
		}
	}

	alerta = (value) => {
		global.events.emit('loader_off', '');
		Alert.alert(
			'Sign Up',
			value,
			[
			  {text: '', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
			  {text: 'Close'},
			],
			{ cancelable: false }
		)
	}

	guardar_user = () => {
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

		entrar = () => {
            this.props.navigation.navigate('Bienvenida', {reload:'reload'});
        }
	}
	

	render() {
		return(
			<ScrollView style={styles.container}>

				<View style={styles.tituloContainer}>
					<Text style={styles.textTitulo}>Parents Info:</Text>
				</View>

				<View style={styles.inputContainer}>


					<View style={styles.inputBox}>
						<View style={styles.containerIcon}>
							<Icon style={[styles.icon]} name={'user'}/>
						</View>
						<TextInput
							style={styles.inputTexto}
							underlineColorAndroid='rgba(0,0,0,0)'
							placeholder="Name"
							placeholderTextColor = 'rgba(255, 255,255,0.6)'
							autoCapitalize = 'words'
							onSubmitEditing={()=> this.email.focus()}
							value={this.state.typed_name}
							onChangeText={ (text) => { this.setState({ typed_name: text }); } }
							/> 
					</View>

					<View style={styles.inputBox}>
						<View style={styles.containerIcon}>
							<Icon style={[styles.icon]} name={'envelope'}/>
						</View>
						<TextInput
							style={styles.inputTexto}
							underlineColorAndroid='rgba(0,0,0,0)'
							placeholder="Email"
							placeholderTextColor = 'rgba(255, 255,255,0.6)'
							keyboardType={'email-address'}
							ref={(input) => this.email = input}
							onSubmitEditing={()=> this.password.focus()}
							value={this.state.typed_email}
							onChangeText={ (text) => { this.setState({ typed_email: text }); } }
							/> 
					</View>

					<View style={styles.inputBox}>
						<View style={styles.containerIcon}>
							<Icon style={[styles.icon]} name={'map-marker'}/>
						</View>
						<TextInput
							style={styles.inputTexto}
							underlineColorAndroid='rgba(0,0,0,0)'
							placeholder="Address"
							placeholderTextColor = 'rgba(255, 255,255,0.6)'
							autoCapitalize = 'words'
							ref={(input) => this.address = input}
							onSubmitEditing={()=> this.phone.focus()}
							onChangeText={ (text) => { this.setState({ typed_address: text }); } }
							/> 
					</View>


					<View style={styles.inputBox}>
						<View style={styles.containerIcon}>
							<Icon style={[styles.icon]} name={'phone'}/>
						</View>
						<TextInput
							style={styles.inputTexto}
							underlineColorAndroid='rgba(0,0,0,0)'
							placeholder="Phone"
							placeholderTextColor = 'rgba(255, 255,255,0.6)'
							keyboardType={'phone-pad'}
							ref={(input) => this.phone = input}
							onSubmitEditing={()=> this.city.focus()}
							onChangeText={ (text) => { this.setState({ typed_phone: text }); } }
							/> 
					</View>

					<View style={styles.inputBox}>
						<View style={styles.containerIcon}>
							<Iconm style={[styles.icon]} name={'location-city'}/>
						</View>
						<TextInput
							style={styles.inputTexto}
							underlineColorAndroid='rgba(0,0,0,0)'
							placeholder="City"
							placeholderTextColor = 'rgba(255, 255,255,0.6)'
							autoCapitalize = 'words'
							ref={(input) => this.city = input}
							onSubmitEditing={()=> this.states.focus()}
							onChangeText={ (text) => { this.setState({ typed_city: text }); } }
							/> 
					</View>

					<View style={styles.inputBox}>
						<View style={styles.containerIcon}>
							<Iconm style={[styles.icon]} name={'location-city'}/>
						</View>
						<TextInput
							style={styles.inputTexto}
							underlineColorAndroid='rgba(0,0,0,0)'
							placeholder="State"
							placeholderTextColor = 'rgba(255, 255,255,0.6)'
							autoCapitalize = 'words'
							ref={(input) => this.states = input}
							onSubmitEditing={()=> this.kids.focus()}
							onChangeText={ (text) => { this.setState({ typed_state: text }); } }
							/> 
					</View>

					<View style={styles.inputBox}>
						<View style={styles.containerIcon}>
							<Icon style={[styles.icon]} name={'odnoklassniki'}/>
						</View>
						<TextInput
							style={styles.inputTexto}
							underlineColorAndroid='rgba(0,0,0,0)'
							placeholder="Kids"
							placeholderTextColor = 'rgba(255, 255,255,0.6)'
							keyboardType={'number-pad'}
							maxLength={2}
							ref={(input) => this.kids = input}
							onSubmitEditing={()=> this.about.focus()}
							onChangeText={ (text) => { this.setState({ typed_kids: text }); } }
							/> 
					</View>

					<View style={styles.inputBoxMultiline}>
						<View style={styles.containerIcon}>
							<Iconm style={[styles.icon]} name={'description'}/>
						</View>
						<TextInput
							style={styles.inputTextoMultiline}
							underlineColorAndroid='rgba(0,0,0,0)'
							placeholder="About My Children"
							placeholderTextColor = 'rgba(255, 255,255,0.6)'
							autoCapitalize = 'sentences'
                            multiline = {true}
                            blurOnSubmit = {true}
                            returnKeyType={'done'}
							ref={(input) => this.about = input}
							//onSubmitEditing={()=> this.verificar_datos()}
							onChangeText={ (text) => { this.setState({ typed_about: text }); } }
							/> 
					</View>
					

					

					

					

					<TouchableOpacity style={styles.boton} onPress={()=> this.verificar_datos()}>
						<Text style={styles.botonText}>Sign Up</Text>
					</TouchableOpacity> 
				</View>

			</ScrollView>	
		)
	}
}






const styles = StyleSheet.create({
	container : {
	  	flex: 1,
		backgroundColor:'#017dc3',
	},

	tituloContainer: {
		alignItems:'center',
		justifyContent: 'center',
	},
	logo: {
		height: 100,
		width: 100,
	},
	textTitulo: {
		fontSize:30,
		fontFamily: 'vagroundedbt',
		color:'#ffffff',
		textAlign:'center'
	},
	

	inputContainer: {
		paddingHorizontal:20,
		paddingVertical: 30,
	},
	inputBoxMultiline: {
		backgroundColor:'rgba(255, 255,255,0.2)',
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 25,
		marginVertical: 2,
	},
	inputTextoMultiline: {
		color:'#ffffff',
		flex:1,
		paddingVertical: 15,
		fontSize:18,
	},


	inputBox: {
		backgroundColor:'rgba(255, 255,255,0.2)',
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 25,
        height: 50,
		marginVertical: 2,
	},
	inputTexto: {
		color:'#ffffff',
		flex:1,
		fontSize:18,
	},
	containerIcon: {
		width: 30,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 10
	},
	icon: {
		color: 'white',
		fontSize: 20,
	},


  	boton: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems:'center',
		backgroundColor:'#ce252d',
        borderRadius: 25,
		height: 50,
    	elevation: 4,
		marginTop: 20,
	},
	botonText: {
		fontFamily: 'vagroundedbt',
		fontSize:20,
		color:'#ffffff',
		textAlign:'center'
	},
});