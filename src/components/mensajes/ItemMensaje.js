/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import global from '../../managers/Global';

export default class ItemMensaje extends Component {
	constructor(props) {
		super(props);
		this.state = ({
            picture: '',
        });
	}


	componentDidMount() {
		console.log('card mount')
        var query = global.firebase.database().ref(global.databasePath+'users/' + this.props.listing.datos.userId);
        query.once('value', (snapshot) => {
            if(snapshot.val() != null){

				this.props.listing.datos.picture = snapshot.val().picture;
				console.log('card mount'+this.props.listing.datos.picture)
                this.setState({
					picture: snapshot.val().picture,
                });
            }
        });
    }

	reply = () => {
		global.tipo_mensaje = 'reply';
		global.ver_perfil = this.props.listing.datos;
		global.ver_perfil_id = this.props.listing.datos.userId;
        this.props.navigation.navigate('EnviarMensaje');
    }

    eliminar = () =>{
        global.firebase.database().ref(global.databasePath+'messages/' + global.userId+'/' + global.mensajesId + '/' + this.props.listing.key).remove().then((data) => {
            this.props.navigation.navigate('Messages', {reload:'reload'});
        });
    }

    alerta_eliminar = () => {
		this.setState({ loading: false });
		Alert.alert(
			'Delete Message',
			'Are you sure to eliminate this message?',
			[
                {text: 'YES', onPress: () => this.eliminar() },
			    {text: 'NO', style: 'cancel'},
			],
			{ cancelable: false }
		)
    }


	render_botonera = () => {
        if(this.props.listing.datos.userId !== global.userId){
			return (
				<View style={styles.containerBotonera}>
					<TouchableOpacity style={styles.botonSmall} onPress={()=> this.reply()}>
						<Text style={styles.botonTextSmall}>Reply</Text>
					</TouchableOpacity> 
					<TouchableOpacity style={styles.botonSmall} onPress={()=> this.alerta_eliminar()}>
						<Text style={styles.botonTextSmall}>Delete</Text>
					</TouchableOpacity> 
				</View>
			);
        }else{
            return (
                <View style={styles.containerBotonera}>
					<TouchableOpacity style={styles.botonSmall} onPress={()=> this.alerta_eliminar()}>
						<Text style={styles.botonTextSmall}>Delete</Text>
					</TouchableOpacity> 
				</View>
            );
        }
    };

	render(){
		return(
			<View style={styles.card}  >
				<View style={styles.header}>
                    <View style={styles.headerLeft}>
						<Image  resizeMode = 'cover' style={styles.foto} source={ this.state.picture == '' ? require('../../assets/load_pic.png') : {uri: this.state.picture}  }/>
						
                    </View>

                    <View style={styles.headerRight}>
                        <Text style={styles.textCreated}>{this.props.listing.datos.name}</Text>
                        <Text style={styles.textCreatedTo}>To: {this.props.listing.datos.to}</Text>
                        <Text style={styles.cardSub}>{this.props.listing.datos.created}</Text>
						<Text style={styles.cardintro}>{this.props.listing.datos.about}</Text>
						{ this.render_botonera() }
                    </View>
                </View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	card: {
		marginTop: 10,
		paddingBottom: 10,
		borderBottomWidth: 0.5,
		borderBottomColor: '#0000001A',
		marginHorizontal: 20,
	},

	header : {
        flexDirection: 'row',
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    headerRight: {
        flex:1,
		marginLeft: 10,
		justifyContent:'center',
    },

	foto: {
		alignSelf: 'center',
   	 	height: 60,
		width: 60,
		borderRadius: 30,
    },

	textCreated: {
		color: '#017dc3',
		fontFamily: 'vagroundedbt',
	},
	
	textCreatedTo: {
		color: '#ce252d',
		fontFamily: 'vagroundedbt',
		fontSize: 12,
	},
	
	cardintro: {
		color: '#000',
	},

	right: {
		alignItems: 'flex-end',
		justifyContent:'center',
    },
	
    cardSub: {
		color: '#606060',
		fontFamily: 'vagroundedbt',
		color: 'rgba(0,0,0,0.5)',
		fontSize: 12,
	},

	
	containerBotonera : {
        flexDirection: 'row',
		marginTop: 20,
		justifyContent:'flex-end',

    },

	botonSmall: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems:'center',
		backgroundColor:'#ce252d',
        borderRadius: 12,
		width: 80,
		height: 24,
		marginVertical: 5,
		marginLeft: 10,
    },
    botonTextSmall: {
		fontFamily: 'vagroundedbt',
		fontSize:14,
		color:'#ffffff',
		textAlign:'center'
    },
});