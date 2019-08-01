/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */
import React, { Component } from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import global       from '../../managers/Global';
import Estrellas    from '../../components/perfil/Estrellas';
import ModalBuyApp  from '../../components/create/ModalBuyApp'; 

export default class Creador extends Component {
    constructor (props) {
        super(props)

        this.state = {
            nombre: '',
            picture: '',
            ModalBuyAppVisible: false,
        }
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
        global.ver_perfil_id = this.props.listing.datos.userId;
        global.ver_user_rating = this.props.listing.datos.userId;
        this.props.navigation.navigate('PlayerProfile');
    }

    render() {
        return (
            <View style={styles.container}>

                <ModalBuyApp
                    visible={this.state.ModalBuyAppVisible}
                    onCancel={() => this.setState({ ModalBuyAppVisible: false })}
                    onSubmit={(value) => this.set_purchase(value)}
                />
                
                <View style={styles.section}>
                    <View style={styles.left}>
                        <Text style={styles.textLets}>Let's play:</Text>
                        <Text style={styles.textGame}>{this.props.listing.datos.game}</Text>
                    </View>
                </View>




                <View style={styles.section}>

                    <View style={styles.left}>
                        <Text style={styles.titulos}>Created by:</Text>
                        <Text style={styles.nombre}>{this.props.listing.datos.name}</Text>
                        <Estrellas calificacion = {5}></Estrellas>
                        <TouchableOpacity style={styles.botonSmall} onPress={() => this.check_purchase()}>
                            <Text style={styles.botonTextSmall}>view profile</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.right}>
                        <TouchableOpacity style={ styles.buttonSmall } onPress={() => this.check_purchase()}>
                            <Image  resizeMode = 'cover' style={styles.foto} source={ this.state.picture == '' ? require('../../assets/avatar.png') : {uri: this.state.picture}  }/>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    section : {
        flexDirection: 'row',
        paddingVertical: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: '#0000001A',
    },

    left: {
        borderWidth: 0,
    },
    right: {
        flex:1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    foto: {
		alignSelf: 'center',
   	 	height: 80,
		width: 80,
        borderRadius: 100,
        marginRight: 10,
    },

    textLets: {
		fontSize:20,
        color:'#a1d348',
        fontFamily: 'vagroundedbt',
    },
    textGame: {
		fontSize:30,
        color:'#017dc3',
        fontFamily: 'vagroundedbt',
    },




    titulos: {
		fontSize:15,
        color:'#017dc3',
        fontFamily: 'vagroundedbt',
    },



    nombre: {
        fontSize:18,
        color:'#000',
    },

    comentarios: {
        fontSize:15,
        color:'#ce252d',
        fontFamily: 'vagroundedbt',
    },


    botonSmall: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems:'center',
		backgroundColor:'#ce252d',
        borderRadius: 12,
		width: 100,
		height: 24,
		marginVertical: 5,
    },
    botonTextSmall: {
		fontFamily: 'vagroundedbt',
		fontSize:14,
		color:'#ffffff',
		textAlign:'center'
    },



});