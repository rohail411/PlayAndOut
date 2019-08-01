/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, DatePickerAndroid, TimePickerAndroid, Picker, ToastAndroid } from 'react-native';
import global from '../../managers/Global';
import TopBar from '../../components/inicio/TopBarBack';
import Mapa   from '../../components/create/Mapa';
import Equipos 		from '../../components/create/promptEquipos'; 

export default class CreateRequest extends Component
{
	constructor(props) {
        super(props);
        this.state = {
            typed_place: 	global.place_to_play,
            typed_game: 	'',
            typed_players: 	'',
			typed_date: 	'Date to play?',
			typed_date_c: 	'',
			typed_time: 	'Time to play?',
			typed_min: 		'',
			typed_max: 		'',
			picker_genre:    '',

			selEquVisible: 	false,
			equipo: 		false,

			latitude: global.user_position.latitude,
        	longitude: global.user_position.longitude,

			selection: {
				start: 0,
				end: 0
			}
		};
	}

	componentWillUnmount(){
		console.log('CreateRequest unmount')
		this.setState({
            latitude: 0,
        	longitude: 0,
        });
	}

	componentDidMount() {
        this.setState({
            latitude: 		global.user_position.latitude,
			longitude: 		global.user_position.longitude,
        });
    }

	verificar_datos = () => 
	{
		if(this.state.typed_place == '' || this.state.typed_game == '' || this.state.typed_players == '')
		{
			ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
		}
		else if(this.state.picker_genre == '' || this.state.picker_genre == 'Select the genre:')
		{
			ToastAndroid.show('Select the genre', ToastAndroid.SHORT);
		}
		else if(this.state.typed_min == '' || this.state.typed_max == '')
		{
			ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
		}
		else if(Number(this.state.typed_min) > Number(this.state.typed_max))
		{
			ToastAndroid.show('The minimum age must be less than the maximum', ToastAndroid.SHORT);
		}
		else if(this.state.typed_date == 'Date to play?' || this.state.typed_time == 'Time to play?')
		{
			ToastAndroid.show('Select date and time', ToastAndroid.SHORT);
		}
		else{
			
			var participant =  {
				[global.userId]: {
				userId 	        : global.userId,
                picture   	    : global.user.picture,
                name 	        : global.user.name,
                status 	        : 'activo',
                joined	        : new Date().toDateString(),
				timestamp       : global.firebase.database.ServerValue.TIMESTAMP
				}
			}

			global.pedido_Id = global.userId + Date.now();
			global.firebase.database().ref(global.databasePath+'requests/' +  global.pedido_Id ).set({
				userId			: global.userId,
				name			: global.user.name,
				picture			: global.user.picture,
				
				place			: this.state.typed_place,
				game			: this.state.typed_game,
				players			: this.state.typed_players,
				cupos			: this.state.typed_players,
				genre			: this.state.picker_genre,
				minimun			: this.state.typed_min,
				maximum			: this.state.typed_max,
				date			: this.state.typed_date,
				time			: this.state.typed_time,
				date_c			: this.state.typed_date_c,
				
				city			: global.user.city,
				state			: global.user.state,
				location		: global.user_position,
				status			: 'active',
				participants	: participant,


				created	    : new Date().toDateString(),
				timestamp   : global.firebase.database.ServerValue.TIMESTAMP,
			});

			this.props.navigation.navigate('Requests');
		}
	}

	mostrarFechas = async () => {
		var days 	= ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sábado'];
		var months 	= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		try {
			const {action, year, month, day} = await DatePickerAndroid.open({
			  date: new Date()
			});
			if (action !== DatePickerAndroid.dismissedAction) {

				var mes = month + 1;
				var dia = day;
				if (mes < 10) mes = '0' + mes;
				if (dia < 10) dia = '0' + dia;

				var date = year+'-'+(mes)+'-'+dia;
				var fecha = months[month]+' '+day+', '+year;

				this.setState({
					typed_date: fecha,
					typed_date_c: date,
				});
			}
		} catch ({code, message}) {
			console.log('Cannot open date picker', message);
		}
	}

	mostrarTiempo = async () => {
		try {
			const {action, hour, minute} = await TimePickerAndroid.open({

			});
			if (action !== TimePickerAndroid.dismissedAction) {
				var time = hour+':'+minute;
				this.setState({
					typed_time: global.horarios[hour][0]+minute+global.horarios[hour][1]
				}); 
			}
		  } catch ({code, message}) {
			console.warn('Cannot open time picker', message);
		  }
	}


	sel_equipos = () => {
		this.setState({
			selEquVisible: true
        });
    }
	set_equipo = (value) => {
		if(value == 'close'){
			this.setState({
				selEquVisible: false,
			});
		}else{
			this.setState({
				selEquVisible: false,
				typed_game: value,
			});
		}
    }
	
	

	render() {
		return(
			<View style={styles.container}>

			<TopBar {...this.props}/>

			<Equipos
				visible={this.state.selEquVisible}
				onCancel={() => this.setState({ selEquVisible: false })}
				onSubmit={(value) => this.set_equipo(value)}
			/>

			<ScrollView style={styles.container}>

				<Mapa 
					style={styles.container} 
					latitude={this.state.latitude} 
					longitude={this.state.longitude}
					{...this.props}
				/>

				<View style={styles.inputContainer}>

					<View style={styles.inputBox}>
						<TextInput
							style={styles.inputTexto}
							underlineColorAndroid='rgba(0,0,0,0)'
							placeholder="Name of place to play?"
							placeholderTextColor = 'rgba(255, 255,255,0.6)'
							autoCapitalize = 'words'
							value={this.state.typed_place}
							onChangeText={ (text) => { this.setState({ typed_place: text }); } }
							/> 
					</View>

					<View style={styles.inputBox}>
						<TextInput
							style={styles.inputTexto}
							underlineColorAndroid='rgba(0,0,0,0)'
							placeholder="What game do you want play?"
							placeholderTextColor = 'rgba(255, 255,255,0.6)'
							autoCapitalize = 'words'
							value={this.state.typed_game}
							onChangeText={ (text) => { this.setState({ typed_game: text }); } }
							/> 

							<TouchableOpacity style={ styles.botonSelect } onPress={this.sel_equipos}>
                        		<Text style={ styles.botonSelectText }>+</Text>
                    		</TouchableOpacity>
					</View>

					

					<View style={styles.inputBox}>
						<TextInput
							style={styles.inputTexto}
							underlineColorAndroid='rgba(0,0,0,0)'
							placeholder="How many participants?"
							placeholderTextColor = 'rgba(255, 255,255,0.6)'
							keyboardType={'number-pad'}
							maxLength={2}
							onChangeText={ (text) => { this.setState({ typed_players: text }); } }
							/> 
					</View>

					
					<View style={styles.inputBoxPicker}>
						<Picker
							selectedValue={this.state.picker_genre}
							style={this.state.picker_genre !== '' ? styles.pickerTextoA : styles.pickerTextoB}
							onValueChange={(itemValue, itemIndex) => this.setState({picker_genre: itemValue}) }
						>
							<Picker.Item label='Select the genre:' value="Select the genre:"/>
							<Picker.Item label="Only Girls" value="Only Girls"/>
							<Picker.Item label="Only Boys" value="Only Boys"/>
							<Picker.Item label="Girls and Boys" value="Girls and Boys"/>
						</Picker>
					</View>


					<View style={styles.inputBox}>
						<TextInput
							style={styles.inputTexto}
							underlineColorAndroid='rgba(0,0,0,0)'
							placeholder="Minimum age?"
							placeholderTextColor = 'rgba(255, 255,255,0.6)'
							keyboardType={'number-pad'}
							maxLength={2}
							onChangeText={ (text) => { this.setState({ typed_min: text }); } }
							/> 
						<TextInput
							style={styles.inputTexto}
							underlineColorAndroid='rgba(0,0,0,0)'
							placeholder="Maximum age?"
							placeholderTextColor = 'rgba(255, 255,255,0.6)'
							keyboardType={'number-pad'}
							maxLength={2}
							onChangeText={ (text) => { this.setState({ typed_max: text }); } }
							/> 
					</View>


					<TouchableOpacity  style={styles.inputBox} onPress={this.mostrarFechas}>
						<Text style={this.state.typed_date !== 'Date to play?' ? styles.dateTextA : styles.dateTextB}>{this.state.typed_date}</Text>
					</TouchableOpacity >

					<TouchableOpacity  style={styles.inputBox} onPress={this.mostrarTiempo}>
						<Text style={this.state.typed_time !== 'Time to play?' ? styles.dateTextA : styles.dateTextB}>{this.state.typed_time}</Text>
					</TouchableOpacity >

					<TouchableOpacity style={styles.boton} onPress={this.verificar_datos}>
						<Text style={styles.botonText }>Create Request</Text>
					</TouchableOpacity> 

				</View>

			</ScrollView>	

			</View>	
		)
	}
}


const styles = StyleSheet.create({
	container : {
	  	flex: 1,
		backgroundColor:'#017dc3',
	},
	
	containerTitulo : {
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 20,
  	},
	





	inputContainer: {
		flex: 1,
		paddingHorizontal:20,
		paddingVertical:20,
	},
	inputBox: {
		backgroundColor:'rgba(255, 255,255,0.2)',
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 25,
        height: 50,
		marginVertical: 5,
		paddingHorizontal:10,
	},
	inputTexto: {
		flex: 1,
		color:'#ffffff',
		fontSize:18,
		paddingHorizontal:10,
	},
	dateTextA: {
		color:'rgba(255, 255,255,1)',
		fontSize:18,
		paddingHorizontal:10,
	},
	dateTextB: {
		color:'rgba(255, 255,255,0.6)',
		fontSize:18,
		paddingHorizontal:10,
	},

	inputBoxPicker: {
		backgroundColor:'rgba(255, 255,255,0.2)',
		flex: 1,
		borderRadius: 25,
        height: 50,
		marginVertical: 5,
		paddingHorizontal:10,
	},
	picker: {
		flex:1
	},
	pickerTextoA: {
		color:'#ffffff',
		fontSize:18,
	},
	pickerTextoB: {
		color:'rgba(255, 255,255,0.6)',
		fontSize:18,
	},

	

	botonSelect: {
		alignItems:'center',
		justifyContent: 'center',
		
		backgroundColor:'rgba(0, 255,0,0.5)',
        borderRadius: 20,
		height: 40,
		width:40
	},
	botonSelectText: {
		fontFamily: 'vagroundedbt',
		fontSize:20,
		color:'#ffffff',
		textAlign:'center'
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
	}
});