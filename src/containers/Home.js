/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, { Component } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, TouchableHighlight , BackHandler, ScrollView, ToastAndroid, AsyncStorage} from 'react-native';

import global           from '../managers/Global';
import TopBar           from '../components/inicio/TopBar';
import Mapa             from '../components/inicio/Mapa';
import PlacesModal 		from '../components/create/promptPlaces'; 
import ModalBuyApp 		from '../components/create/ModalBuyApp'; 


export default class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            typed_place: 	'Where do you want play?',

			ModalBuyAppVisible: 	false,
			selEquVisible: 	false,
			equipo: 		false,
            length: 0,
            temp: 0,
		};
	}

    componentWillUnmount() {
        console.log('inicio unmount');
        //BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressed);
    }

    componentDidMount() {
        console.log('inicio mount');  
        global.events.emit('loader_off', '');
        global.events.addListener('set_location', () => this.set_location());
        global.events.addListener('set_location_text', () => this.set_location_text());
        //BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);

        var query = global.firebase.database().ref(global.databasePath+'messages/' + global.userId);
        query.on('value', (childSnapshot) => {
            const mensajes = [];
            var length = 0;
            childSnapshot.forEach((doc) => {
                length += Object.keys(doc.toJSON()).length
                this.setState({
                    length: length
                });
            });
            entrar();
        });
        entrar = () => {
            this.check_length();
        }
    }
    check_length = async () => {
        try {
            const value = await AsyncStorage.getItem('countMessages');
            this.setState({
                    temp: value
                });
            if(value != null){ 
                if(this.state.length != value ){
                    this.guardar_length();
                }
            }else{
                if(this.state.length > 1){
                    this.guardar_length();
                }
            }
        } catch (error) {
            console.log("Error retrieving data" + error);
        }
    }
    guardar_length = async () => {
        global.events.emit('show_badge', '');
        try {
            await AsyncStorage.setItem('countMessages', this.state.length.toString());
        } catch (error) {
            console.log("Error set data" + error);
        }
    }

    set_location() {
        this.setState({
            selEquVisible: false,
            typed_place: global.places_name,
        });
    }

    set_location_text() {
        this.setState({
            typed_place: global.places_name_drag,
        });
    }

    onBackButtonPressed() {
        //BackHandler.exitApp();
        return true;
    }

    sel_equipos = () => {
		this.setState({
			selEquVisible: true
        });
    }
	set_equipo = (value) => {
		this.setState({
			selEquVisible: false,
			typed_game: value,
		});
    }

    crear() {
        global.events.emit('loader_off', '');
        global.place_to_play = this.state.typed_place;
        if(this.state.typed_place == 'Where do you want play?'){
            ToastAndroid.show('Enter where do you want play', ToastAndroid.SHORT);
        }else{
            this.props.navigation.navigate('CreateRequest');
        }
    }

    check_purchase() {
        global.events.emit('loader_on', '');
        var query = global.firebase.database().ref(global.databasePath+'purchases/' + global.userId);
            query.once('value', (snapshot) => {
            global.events.emit('loader_off', '');
            if(snapshot.val() !== null && snapshot.val().userId == global.userId){
                this.crear();
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

    render() {
        return (
            <View style={styles.container}>
                
                <TopBar {...this.props}/>

                <PlacesModal
                    visible={this.state.selEquVisible}
                    onCancel={() => this.setState({ selEquVisible: false })}
                    onSubmit={(value) => this.set_equipo(value)}
                />
                
                <ModalBuyApp
                    visible={this.state.ModalBuyAppVisible}
                    onCancel={() => this.setState({ ModalBuyAppVisible: false })}
                    onSubmit={(value) => this.set_purchase(value)}
                />

                <TouchableOpacity   activeOpacity={1} style={styles.popup} onPress={this.sel_equipos}>
                    <View style={styles.inputBox}>
                        <Text style={this.state.typed_place !== 'Where do you want play?' ? styles.dateTextA : styles.dateTextB}>{this.state.typed_place}</Text>
                    </View>
                </TouchableOpacity  >

                <Mapa style={styles.map} {...this.props}/>

                <View style={styles.containerb}>
                    <View style={styles.containerBoton}>
                        <TouchableOpacity style={styles.boton} onPress={() => this.check_purchase()}>
                            <Text style={styles.botonText}>Create New Request</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    map: {
        //flex: 1,
    },
    popup: {
        justifyContent:'center',
        backgroundColor: '#a1d348',
        paddingVertical: 5,
        paddingHorizontal:10,
    },
    textoA: {
        color:'white',
        // fontWeight: 'bold',
        fontSize:12,
        fontFamily: 'vagroundedbt'
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

    dateTextA: {
		color:'white',
		fontSize:18,
		paddingHorizontal:10,
	},
	dateTextB: {
		color:'rgba(255, 255,255,0.5)',
		fontSize:18,
		paddingHorizontal:10,
	},

    


    containerb : {
        //flex: 1,
        paddingVertical:10,
        backgroundColor:'#ffffff',
        justifyContent: 'flex-end',
        alignItems:'center',
    },
    containerBoton: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    boton: {
        flex: 1,
        marginHorizontal:10,
        justifyContent: 'center',
		alignItems:'center',
		backgroundColor:'#ce252d',
        borderRadius: 25,
		height: 50,
    	elevation: 4,
    },
    botonText: {
        fontSize:20,
		color:'#ffffff',
        textAlign:'center',
        //fontWeight: 'bold',
        fontFamily: 'vagroundedbt'
    }
});