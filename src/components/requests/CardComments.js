/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import global from '../../managers/Global';

export default class CardRequest extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		return(
			<View style={styles.card}  >
				<View style={styles.header}>
                    <View style={styles.headerLeft}>
					<Image  resizeMode = 'cover' style={styles.foto} source={ this.props.listing.datos.picture == '' ? require('../../assets/avatar.png') : {uri: this.props.listing.datos.picture}  }/>
                    </View>

                    <View style={styles.headerRight}>
                        <Text style={styles.textCreated}>{this.props.listing.datos.name}</Text>
                        <Text style={styles.cardSub}>{this.props.listing.datos.created}</Text>
						<Text style={styles.cardintro}>{this.props.listing.datos.about}</Text>
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
	
	cardintro: {
        //fontSize: 15,
		color: '#000',
		//fontFamily: 'vagroundedbt',
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
});