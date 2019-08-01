/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */
 
import React, { Component } from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity, Alert } from 'react-native';
import global from '../../managers/Global';
import ModalBuyApp  from '../../components/create/ModalBuyApp'; 

export default class Comprar extends Component {
    constructor (props) {
        super(props)
        this.state = {
          con_cupo: false,
        }
    }


    componentDidMount() {
        this.setState({
            con_cupo: false,
        })

        for (var key in this.props.listing.datos.participants) {
            if(this.props.listing.datos.participants[key].userId == global.userId){
                this.setState({
                    con_cupo: true,
                })
            }
        }
    }


    check_purchase(value) {
        global.events.emit('loader_on', '');
        var query = global.firebase.database().ref(global.databasePath+'purchases/' + global.userId);
            query.once('value', (snapshot) => {
            global.events.emit('loader_off', '');
            if(snapshot.val() !== null && snapshot.val().userId == global.userId){
                this.verificar_cupos_disponibles(value);
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

    verificar_cupos_disponibles = (value) => {
        global.tipo_join = value;
		var query = global.firebase.database().ref(global.databasePath+'requests/' + this.props.listing.key);
        query.once('value', (snapshot) => {
            if(snapshot.val() != null){

                if(global.tipo_join == '1')
                {
                    if(snapshot.val().cupos > 0){
                        if(global.tipo_join == '1'){
                            global.cupo_comprado = snapshot.val().cupos - 1;
                            this.join();
                        }
                    }
                    else{
                        this.alerta_no_cupos();
                    }
                }
                else{
                    global.cupo_comprado = snapshot.val().cupos + 1;
                    this.unjoin();
                }
				
			}
		})
    }
    
    join = () => {
        var query = global.firebase.database().ref(global.databasePath+'requests/' + this.props.listing.key);
        query.update({
            cupos : global.cupo_comprado
        }).then((data) => {
    
            global.firebase.database().ref(global.databasePath+'requests/' + this.props.listing.key + '/participants/' + global.userId).set({
                userId 	        : global.userId,
                picture   	    : global.user.picture,
                name 	        : global.user.name,
                status 	        : 'activo',
                joined	        : new Date().toDateString(),
                timestamp       : global.firebase.database.ServerValue.TIMESTAMP,
            }).then((data) => {
                this.joins()
            });
    
        });
    }

    unjoin = (item) => 
	{
        var query = global.firebase.database().ref(global.databasePath+'requests/' + this.props.listing.key);
        query.update({
            cupos : global.cupo_comprado
        }).then((data) => {
            global.firebase.database().ref(global.databasePath+'requests/' + this.props.listing.key + '/participants/' + global.userId).remove().then((data) => {
                this.joins()
            });
        });
    }

    joins= () =>{

        console.log('remove join'+global.tipo_join)
        this.props.navigation.navigate('Requests', {reload:'reload'})
    }
    
    eliminar = () =>{
        global.firebase.database().ref(global.databasePath+'requests/' + this.props.listing.key).remove().then((data) => {
            this.joins()
        });
    }



    alerta_eliminar = () => {
		this.setState({ loading: false });
		Alert.alert(
			'Delete Request',
			'Are you sure to eliminate this request?',
			[
                {text: 'YES', onPress: () => this.eliminar(), style: 'cancel' },
			    {text: 'NO'},
			],
			{ cancelable: false }
		)
    }
    
    alerta_no_cupos = () => {
		this.setState({ loading: false });
		Alert.alert(
			'Join Request',
			"You can't join now, the request is full.",
			[
			  {text: '', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
			  {text: 'CLOSE'},
			],
			{ cancelable: false }
		)
    }


    render_botonera = count => {
        if(this.props.listing.datos.userId !== global.userId){
            if(!this.state.con_cupo){
                return (
                    <View style={styles.section}>
                        <TouchableOpacity style={ styles.boton } onPress={() => this.check_purchase('1')}>
                            <Text style={styles.botonText}>Join</Text>
                        </TouchableOpacity>
                    </View>
                );
            }else{
                return (
                    <View style={styles.section}>
                        <TouchableOpacity style={ styles.boton } onPress={() => this.verificar_cupos_disponibles('2')}>
                            <Text style={styles.botonText}>Unjoin</Text>
                        </TouchableOpacity>
                    </View>
                );
            }
        }else{
            return (
                <View style={styles.section}>
                    <TouchableOpacity style={ styles.boton } onPress={() => this.alerta_eliminar()}>
                        <Text style={styles.botonText}>Delete Request</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <ModalBuyApp
                    visible={this.state.ModalBuyAppVisible}
                    onCancel={() => this.setState({ ModalBuyAppVisible: false })}
                    onSubmit={(value) => this.set_purchase(value)}
                />
                    { this.render_botonera() }
            </View>
        );
    }
}

const styles = StyleSheet.create({
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