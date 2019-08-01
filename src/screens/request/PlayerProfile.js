/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */
 
import React, { Component } from 'react';
import {View, StyleSheet, Text, ScrollView, TextInput, Image, TouchableOpacity, Alert, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icone from 'react-native-vector-icons/Entypo';
import Iconm from 'react-native-vector-icons/MaterialIcons';
import global from '../../managers/Global';
import TopBar from '../../components/inicio/TopBarBack';
import Estrellas from '../../components/perfil/Estrellas';

export default class PlayerProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ver_perfil: {},
        }
    }

    componentDidMount() {
        var query = global.firebase.database().ref(global.databasePath+'users/' + global.ver_perfil_id);
        query.once('value', (snapshot) => {
            if(snapshot.val() != null){
                global.ver_perfil = snapshot.val();
                this.setState({
                    ver_perfil: snapshot.val()
                });
            }
        });
    }

    calificar = () => {
        global.calificacion = 0;
        this.props.navigation.navigate('Calificar');
    }
    comentar = () => {
        this.props.navigation.navigate('Comentar');
    }
    comentarios = () => {
        this.props.navigation.navigate('Comentarios');
    }

    mensaje = () => {
        global.tipo_mensaje = 'profile';
        this.props.navigation.navigate('EnviarMensaje');
    }

    render_botonera = () => {

        if(global.ver_perfil_id !== global.userId){
            return (
                <View>
                    <TouchableOpacity style={styles.boton} onPress={()=> this.calificar()}>
                        <Text style={styles.botonText}>Rate Player</Text>
                    </TouchableOpacity> 

                    <TouchableOpacity style={styles.boton} onPress={()=> this.comentar()}>
                        <Text style={styles.botonText}>Write a Comment</Text>
                    </TouchableOpacity> 

                    <TouchableOpacity style={styles.boton} onPress={()=> this.mensaje()}>
                        <Text style={styles.botonText}>Send Message</Text>
                    </TouchableOpacity> 
                </View>
            );
        }else{
            return null;
        }

    }

    render() {
        return (
            
            <View style={styles.container}>

                <TopBar {...this.props}/>

                <View style={styles.header}>
                    <Text style={styles.titulo} >Player Profile</Text>
                </View>

                <ScrollView style={styles.container}>

                    <View style={styles.section}>

                        <View style={styles.left}>
                            <View style={ styles.buttonSmall }>
                                <Image  resizeMode = 'cover' style={styles.foto} source={ this.state.ver_perfil.picture == '' ? require('../../assets/avatar.png') : {uri: this.state.ver_perfil.picture }  }/>
                            </View>
                        </View>


                        <View style={styles.right}>
                            <Text style={styles.nombre}>{this.state.ver_perfil.name}</Text>
                            <Estrellas calificacion = {5}></Estrellas>
                            <TouchableOpacity style={styles.botonSmall} onPress={() => this.comentarios()}>
                                <Text style={styles.botonTextSmall}>view comments</Text>
                            </TouchableOpacity>
                        </View>

                        
                    </View>


                    <View style={styles.inputContainer}>

                        <View style={styles.inputBox}>
                            <View style={styles.containerIcon}>
                                <Icon style={[styles.icon]} name={'odnoklassniki'}/>
                            </View>
                            <Text style={styles.inputTexto}>{this.state.ver_perfil.kids}</Text>
                        </View>

                        <View style={styles.inputBoxMultiline}>
                            <View style={styles.containerIcon}>
                                <Iconm style={[styles.icon]} name={'description'}/>
                            </View>
                            <Text style={styles.inputTextoMultiline}>{this.state.ver_perfil.about}</Text>
                        </View>


                        { this.render_botonera() }
                        

                        

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
    },
    titulo: {
        fontSize: 20,
        color: '#ffffff',
        fontFamily: 'vagroundedbt',
    },

    avatarContainer: {
		flex:1,
		paddingVertical: 30,
		alignItems: 'center',
		justifyContent: 'center',
	},

	foto: {
		alignSelf: 'center',
   	 	height: 100,
		width: 100,
		borderRadius: 50,
		marginHorizontal: 3,
		marginBottom: 2,
    },


    section : {
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 20,
        paddingVertical: 40,
        // borderBottomWidth: 0.5,
        // borderBottomColor: '#0000001A',
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
        marginRight: 5,
    },

    nombre: {
		fontSize:20,
        color:'#017dc3',
        fontFamily: 'vagroundedbt',
    },
    comentarios: {
        fontSize:15,
        color:'#ce252d',
        fontFamily: 'vagroundedbt',
    },


    

    inputContainer: {
		paddingHorizontal:20,
		paddingBottom: 30,
	},
	inputBoxMultiline: {
		backgroundColor:'rgba(100,200,255,0.2)',
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 25,
		marginVertical: 5,
	},
	inputTextoMultiline: {
		color:'#000',
		flex:1,
        paddingVertical: 15,
        paddingRight: 5,
        fontSize:18,
	},


	inputBox: {
		backgroundColor:'rgba(100,200,255,0.2)',
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 25,
        height: 50,
		marginVertical: 2,
	},
	inputTexto: {
		color:'#000',
		flex:1,
		fontSize:18,
	},
	containerIcon: {
		width: 30,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 10
	},
	icon: {
		color: '#017dc3',
		fontSize: 20,
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

    botonSmall: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems:'center',
		backgroundColor:'#ce252d',
        borderRadius: 12,
		width: 120,
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