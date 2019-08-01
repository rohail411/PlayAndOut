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

export default class CardMensajes extends Component {
	constructor(props) {
		super(props);
		this.state = ({
            name: '',
            picture: '',
        });
	}

	view = () => {
		global.events.emit('hide_badge', '');
		global.mensajesId = this.props.listing.key;
		global.mensajesName = this.state.name;
        this.props.navigation.navigate('VerMessages');
    }

	componentDidMount() {
		
        var query = global.firebase.database().ref(global.databasePath+'users/' + this.props.listing.key);
        query.once('value', (snapshot) => {
            if(snapshot.val() != null){
                this.setState({
                    name: snapshot.val().name,
                    picture: snapshot.val().picture,
                });
            }
        });
    }

	render(){
		return(
			<View style={styles.card}  >
				<View style={styles.header}>

                    <View style={styles.headerLeft}>
						<Image  resizeMode = 'cover' style={styles.foto} source={ this.state.picture == '' ? require('../../assets/avatar.png') : {uri: this.state.picture}  }/>
                    </View>

                    <View style={styles.headerRight}>
                        <Text style={styles.textCreated}>{this.state.name}</Text>
                    </View>

					<View style={styles.containerBotonera}>
						<TouchableOpacity style={styles.botonSmall} onPress={()=> this.view()}>
							<Text style={styles.botonTextSmall}>view</Text>
						</TouchableOpacity> 
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
		alignItems: 'center',
    },
    headerRight: {
        flex:1,
		marginLeft: 10,
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

	
	containerBotonera : {
		// backgroundColor:'red',
		// justifyContent:'flex-end',
    },

	botonSmall: {
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