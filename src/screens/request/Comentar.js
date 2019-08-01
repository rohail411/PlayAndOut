/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Iconm from 'react-native-vector-icons/MaterialIcons';
import global from '../../managers/Global';
import Calificador from '../../components/detalle/Calificador';
import TopBar from '../../components/inicio/TopBarBack';

export default class Comentar extends Component
{
	constructor(props) {
        super(props);
        this.state = {
            typed_about: ''
        }
	}
	
	comenta = () => 
	{
		if(this.state.typed_about  == '' )
		{
			//this.alerta('Please fill all fields.');
		}
		else{
			global.comment_Id = global.userId + Date.now();
			global.firebase.database().ref(global.databasePath+'comments/' + global.ver_perfil_id+'/'+global.comment_Id).set({ 
                userId			: global.userId,
				name			: global.user.name,
				picture			: global.user.picture,
				about 			: this.state.typed_about,
				created	        : new Date().toDateString(),
				timestamp       : global.firebase.database.ServerValue.TIMESTAMP
			});
			
			this.props.navigation.navigate('PlayerProfile');
		}
	}

	render() {
		return(
			<View style={styles.container}>

				<TopBar {...this.props}/>

				<ScrollView style={styles.container}>

				<View style={styles.containerTitulo}>
				<Image  resizeMode = 'cover' style={styles.foto} source={ global.ver_perfil.picture == '' ? require('../../assets/avatar.png') : {uri: global.ver_perfil.picture }  }/>
					<Text style={styles.nombre}>{global.ver_perfil.name}</Text>
				</View>

				<View style={styles.botonContainer}>

					<View style={styles.inputBoxMultiline}>
                            <TextInput
                                style={styles.inputTextoMultiline}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                placeholder="Write a comment..."
                                placeholderTextColor = 'rgba(0,0,0,0.1)'
                                autoCapitalize = 'sentences'
                                multiline = {true}
                                blurOnSubmit = {true}
                                returnKeyType={'done'}
                                value={this.state.typed_about}
                                onChangeText={ (text) => { this.setState({ typed_about: text }); } }
                                /> 
                    </View>

					<TouchableOpacity style={styles.boton} onPress={() => this.comenta()}>
						<Text style={styles.botonText}>Send</Text>
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
		backgroundColor:'#ffffff',
	},

	containerTitulo: {
		//flex: 1,
		alignItems:'center',
		justifyContent: 'center',
		paddingHorizontal:10,
		paddingVertical:30,
		
	},
	foto: {
		alignSelf: 'center',
   	 	height: 100,
		width: 100,
		borderRadius: 50,
		marginBottom: 10,
    },
	nombre: {
		fontSize:20,
		fontFamily: 'vagroundedbt',
		color:'#017dc3',
		textAlign:'center'
	},
	
	inputBoxMultiline: {
		backgroundColor:'rgba(100,200,255,0.2)',
		flex:1,
		//alignItems: 'center',
		justifyContent: 'flex-end',
		borderRadius: 25,
		//marginVertical: 10,
		paddingHorizontal:10,
	},
	inputTextoMultiline: {
		color:'#000',
		flex:1,
        paddingVertical: 15,
		fontSize:18,
		height: 200,
		textAlignVertical: 'top'
	},


	botonContainer: {
		flex:1,
		paddingHorizontal:30,
		marginBottom: 20,
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