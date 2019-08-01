/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, { Component } from 'react';
import { View, Text, TouchableHighlight,  TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import global from '../../managers/Global';
import ModalBuyApp from '../../components/create/ModalBuyApp'; 

export default class CardRequest extends Component {
	constructor(props) {
		super(props);

		this.state = ({
            picture: '',
			ModalBuyAppVisible: 	false,
        });
	}

	componentDidMount() {
       global.events.addListener('change_picture', () => this.change_picture());
	   this.change_picture();
    }

	change_picture() {
		var query = global.firebase.database().ref(global.databasePath+'users/' + this.props.listing.datos.userId);
        query.once('value', (snapshot) => {
            if(snapshot.val() != null){
                this.setState({
					picture: snapshot.val().picture,
                });
            }
        });
    }

	check_purchase() {
        global.events.emit('loader_on', '');
        var query = global.firebase.database().ref(global.databasePath+'purchases/' + global.userId);
            query.once('value', (snapshot) => {
            global.events.emit('loader_off', '');
            if(snapshot.val() !== null && snapshot.val().userId == global.userId){
                this.ver_detalle();
            }
            else{
                this.setState({
                    ModalBuyAppVisible: true
                });
            }
        });
    }
    set_purchase = (value) => {
		this.setState({
			ModalBuyAppVisible: false,
		});
    }

	ver_detalle = () => 
	{
		global.ver_user_rating = this.props.listing.datos.userId;
		this.props.navigation.navigate('DetalleRequest', {listing: this.props.listing})
    }

	render(){
		return(
			<View style={styles.container}>
				<ModalBuyApp
					visible={this.state.ModalBuyAppVisible}
					onCancel={() => this.setState({ ModalBuyAppVisible: false })}
					onSubmit={(value) => this.set_purchase(value)}
				/>
				<TouchableOpacity style={styles.card} onPress={() => this.check_purchase()} >
					<View style={styles.header}>
						<View style={styles.headerLeft}>
						<Image  resizeMode = 'cover' style={styles.foto} source={ this.state.picture == '' ? require('../../assets/avatar.png') : {uri: this.state.picture}  }/>
						</View>

						<View style={styles.headerRight}>
							<Text style={styles.textCreated}>Created by: {this.props.listing.datos.name}</Text>
							<Text style={styles.cardintro}>{this.props.listing.datos.game}</Text>
							<Text style={styles.cardSub}>{this.props.listing.datos.date}</Text>
						</View>

						<View style={styles.right}>
							<Icons name={'angle-right'} size={20} color={'#017dc3'} />
						</View>
					</View>
				</TouchableOpacity>
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
        fontSize: 12,
		color: '#017dc3',
		fontFamily: 'vagroundedbt',
	},
	
	cardintro: {
        fontSize: 15,
		color: '#000',
		fontFamily: 'vagroundedbt',
	},

	right: {
		alignItems: 'flex-end',
		justifyContent:'center',
    },
	
    cardSub: {
		color: '#606060',
		fontFamily: 'vagroundedbt',
		color: 'rgba(0,0,0,0.5)',
	},
});