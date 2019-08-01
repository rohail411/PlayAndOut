/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, { Component } from 'react';
import { StyleSheet, Text,  View, TouchableOpacity, Image } from 'react-native';
import global from '../../managers/Global';
import ModalBuyApp  from '../../components/create/ModalBuyApp'; 

export default class DetalleParticipantes extends Component 
{
    constructor(props) {
		super(props);

		this.state = ({
            picture: '',
        });
	}

    componentDidMount() {
       global.events.addListener('change_picture', () => this.change_picture());
	   this.change_picture();
    }

	change_picture() {
		var query = global.firebase.database().ref(global.databasePath+'users/' + this.props.link);
        query.once('value', (snapshot) => {
            if(snapshot.val() != null){
                this.setState({
					picture: snapshot.val().picture,
                });
            }
        });
    }


    check_purchase(key) {
        global.ver_perfil_id = key;
        global.ver_user_rating = key;
        global.events.emit('loader_on', '');
        var query = global.firebase.database().ref(global.databasePath+'purchases/' + global.userId);
            query.once('value', (snapshot) => {
            global.events.emit('loader_off', '');
            if(snapshot.val() !== null && snapshot.val().userId == global.userId){
                this.ver_perfil();
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



    ver_perfil() {
        this.props.navigation.navigate('PlayerProfile');
    }

	render(){
		return(
			<View style={styles.container}>

                <ModalBuyApp
                    visible={this.state.ModalBuyAppVisible}
                    onCancel={() => this.setState({ ModalBuyAppVisible: false })}
                    onSubmit={(value) => this.set_purchase(value)}
                />

                <TouchableOpacity  style={ styles.boton} onPress={() => this.check_purchase(this.props.link)}>
                    <Image  
                        resizeMode = 'cover' 
                        style={styles.foto} 
                        source={ this.state.picture == '' ? require('../../assets/avatar.png') : {uri: this.state.picture}  }
                        />
                    <Text 
                        numberOfLines={1}
                        style={styles.nombre}>{this.props.nombre}</Text>
                </TouchableOpacity>
  			</View>
		)
	}
}

const styles = StyleSheet.create({
    container : {
        //paddingHorizontal: 20,
    },
    
    section : {
        paddingVertical: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: '#0000001A',
    },

    botonesContainer: {
		flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
		justifyContent: 'center',
    },
    titulos: {
		fontSize:20,
        color:'#606060',
        fontWeight: '600',
    },

    boton: {
        marginVertical: 5,
        marginRight: 10,
    },

    foto: {
		alignSelf: 'center',
   	 	height: 50,
		width: 50,
        borderRadius: 100,
    },


    nombre: {
		fontSize:14,
        textAlign:'center',
        width: 60,
        color:'#000',
	},
});