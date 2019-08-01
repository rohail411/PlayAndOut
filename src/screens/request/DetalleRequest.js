/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */
 
import React, { Component } from 'react';
import {View, StyleSheet, Text, ScrollView, Image, TouchableOpacity} from 'react-native';

import TopBar           from '../../components/inicio/TopBarBack';
import global           from '../../managers/Global';
import Mapa             from '../../components/detalle/Mapa';
import Creador          from '../../components/detalle/Creador';
import Info             from '../../components/detalle/Info';
import Comprar 	        from '../../components/detalle/Comprar';
import Participantes    from '../../components/detalle/Participantes';
import ModalBuyApp      from '../../components/create/ModalBuyApp'; 

export default class DetalleRequest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listing: this.props.navigation.state.params.listing,
        }
    }

    componentDidMount() {
        console.log('DetalleRequest key '+this.state.listing.key)
    }

    check_purchase() {
        global.events.emit('loader_on', '');
        var query = global.firebase.database().ref(global.databasePath+'purchases/' + global.userId);
            query.once('value', (snapshot) => {
                global.events.emit('loader_off', '');
                if(snapshot.val() !== null && snapshot.val().userId == global.userId){
                    this.messages();
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
    

    messages = () =>{
        global.mensajesrequesId = this.state.listing.key;
        this.props.navigation.navigate('RequestMessages');
    }

    render() {
        return (
            
            <View style={styles.container}>

                <ModalBuyApp
                    visible={this.state.ModalBuyAppVisible}
                    onCancel={() => this.setState({ ModalBuyAppVisible: false })}
                    onSubmit={(value) => this.set_purchase(value)}
                />

                <TopBar {...this.props}/>

                <View style={styles.header}>
                    <Text style={styles.titulo} >Request Details</Text>
                </View>

                <ScrollView style={styles.container}>

                    <Mapa 
                        style={styles.container} 
                        latitude={this.state.listing.datos.location.latitude} 
                        longitude={this.state.listing.datos.location.longitude}
                        {...this.props}
                    />

                    <Creador listing={this.state.listing} {...this.props}/>
                    <Info listing={this.state.listing} {...this.props}/>
                    <Participantes listing={this.state.listing} {...this.props}/>

                    <View style={styles.botonera}>
                        <Comprar listing={this.state.listing} {...this.props}/>

                        <TouchableOpacity style={styles.boton} onPress={()=> this.check_purchase()}>
                            <Text style={styles.botonText}>Messages</Text>
                        </TouchableOpacity> 
                    </View>

                </ScrollView>	

            </View>
            
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header : {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#a1d348',
        alignItems: 'center',
    },
    titulo: {
        fontSize: 20,
        color: '#ffffff',
        fontFamily: 'vagroundedbt',
    },

    botonera : {
        paddingHorizontal: 20,
        paddingVertical: 30,
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