/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, { Component } from 'react';
import {View, StyleSheet, Text, ScrollView, TextInput, Image, TouchableOpacity, Alert, AsyncStorage, Linking} from 'react-native';
import {LoginManager} from 'react-native-fbsdk';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icone from 'react-native-vector-icons/Entypo';
import Iconm from 'react-native-vector-icons/MaterialIcons';
import global from '../managers/Global';
import TopBar from '../components/inicio/TopBarBack';
import Estrellas from '../components/perfil/Estrellas';
import SubirFoto from '../components/perfil/SubirFoto';

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            typed_name: 		'',
			typed_address: 		'',
			typed_phone: 		'',
			typed_city: 		'',
			typed_state: 		'',
			typed_kids: 		'',
            typed_about: 		''
        }
    }

    componentDidMount() {

        /*
        this.subs = [
            this.props.navigation.addListener('willFocus', this.componentDidFocus()),
            this.props.navigation.addListener('willBlur', this.componentWillBlur()),
        ];
        */
       global.events.addListener('change_picture', () => this.change_picture());
        this.setState({
            typed_name	    : global.user.name,
            typed_address	: global.user.address,
            typed_phone	    : global.user.phone,
            typed_city	    : global.user.city,
            typed_state	    : global.user.state,
            typed_kids	    : global.user.kids,
            typed_about	    : global.user.about,
        });
    }

    change_picture() {
        this.setState({  });
    }

    componentDidFocus() {
        global.ver_user_rating = global.userId;
        //this.setState({});
        this.abrir();
        console.log('componentDidFocus'+global.ver_user_rating)
    }

    componentWillBlur() {
        console.log('componentWillBlur')
    }

    abrir = () => 
	{

    }
    
    verificar_datos = () => 
	{
		global.events.emit('loader_on', '');
		if(this.state.typed_name == '' || this.state.typed_email == '' || this.state.typed_password == '' || this.state.typed_address == '' || this.state.typed_phone == '' || this.state.typed_city == '' || this.state.typed_state == '' || this.state.typed_kids == '' || this.state.typed_about  == '' )
		{
			this.alerta('Please fill all fields.');
		}
		else{
			global.firebase.database().ref(global.databasePath+'users/' + global.userId).update({ 
                name 		: this.state.typed_name,
                address 	: this.state.typed_address,
                phone 		: this.state.typed_phone,
                city 		: this.state.typed_city,
                state 		: this.state.typed_state,
                kids 		: this.state.typed_kids,
                about 		: this.state.typed_about
            }).then(function(snapshot) {
                global.events.emit('loader_off', '');
            });
		}
    }
    
    alerta = (value) => {
		global.events.emit('loader_off', '');
		Alert.alert(
			'Sign Up',
			value,
			[
			  {text: '', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
			  {text: 'Close'},
			],
			{ cancelable: false }
		)
	}

    cambiar_foto = () => {

    }

    comentarios = () => {
        global.ver_perfil_id = global.userId;
        this.props.navigation.navigate('Comentarios');
    }

    ver_legal = () => {
        this.props.navigation.navigate('About');
    }

    ver_terms = () => {
        Linking.openURL('https://storage.googleapis.com/stopandboy-e2acb.appspot.com/terms.html').catch((err) => console.error('An error occurred', err));
    }

    ver_privacy = () => {
        Linking.openURL('https://storage.googleapis.com/stopandboy-e2acb.appspot.com/privacy.html').catch((err) => console.error('An error occurred', err));
    }

    restore = () => {
        
    }

    cerrar = () => {
        global.userId = '';
        global.user = '';
        global.user.picture = '';
        global.user.name = '';
        AsyncStorage.clear();
        global.firebase.auth().signOut();
        LoginManager.logOut();
    }

    render() {
        return (
            
            <View style={styles.container}>

                <TopBar {...this.props}/>

                <View style={styles.header}>
                    <Text style={styles.titulo} >My Profile</Text>
                </View>

                <ScrollView style={styles.container}>

                    <View style={styles.avatarContainer}>
                        <Image  resizeMode = 'cover' style={styles.foto} source={ global.user.picture == '' ? require('../assets/avatar.png') : {uri: global.user.picture}  }/>
                        <View>
                            <Estrellas> </Estrellas>
                        </View>
                        <View>
                            <SubirFoto > </SubirFoto>
                        </View>
                    </View>	

                    <View style={styles.inputContainer}>

                        <View style={styles.inputBox}>
                            <View style={styles.containerIcon}>
                                <Icon style={[styles.icon]} name={'user'}/>
                            </View>
                            <TextInput
                                style={styles.inputTexto}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                placeholder="Name"
                                placeholderTextColor = 'rgba(0,0,0,0.1)'
                                autoCapitalize = 'words'
                                value={this.state.typed_name}
                                onChangeText={ (text) => { this.setState({ typed_name: text }); } }
                                /> 
                        </View>

                        <View style={styles.inputBox}>
                            <View style={styles.containerIcon}>
                                <Icon style={[styles.icon]} name={'map-marker'}/>
                            </View>
                            <TextInput
                                style={styles.inputTexto}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                placeholder="Address"
                                placeholderTextColor = 'rgba(0,0,0,0.1)'
                                autoCapitalize = 'words'
                                value={this.state.typed_address}
                                onChangeText={ (text) => { this.setState({ typed_address: text }); } }
                                /> 
                        </View>

                        <View style={styles.inputBox}>
                            <View style={styles.containerIcon}>
                                <Icon style={[styles.icon]} name={'phone'}/>
                            </View>
                            <TextInput
                                style={styles.inputTexto}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                placeholder="Phone"
                                placeholderTextColor = 'rgba(0,0,0,0.1)'
                                keyboardType={'phone-pad'}
                                value={this.state.typed_phone}
                                onChangeText={ (text) => { this.setState({ typed_phone: text }); } }
                                /> 
                        </View>

                        <View style={styles.inputBox}>
                            <View style={styles.containerIcon}>
                                <Iconm style={[styles.icon]} name={'location-city'}/>
                            </View>
                            <TextInput
                                style={styles.inputTexto}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                placeholder="City"
                                placeholderTextColor = 'rgba(0,0,0,0.1)'
                                autoCapitalize = 'words'
                                value={this.state.typed_city}
                                onChangeText={ (text) => { this.setState({ typed_city: text }); } }
                                /> 
                        </View>

                        <View style={styles.inputBox}>
                            <View style={styles.containerIcon}>
                                <Iconm style={[styles.icon]} name={'location-city'}/>
                            </View>
                            <TextInput
                                style={styles.inputTexto}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                placeholder="State"
                                placeholderTextColor = 'rgba(0,0,0,0.1)'
                                autoCapitalize = 'words'
                                value={this.state.typed_state}
                                onChangeText={ (text) => { this.setState({ typed_state: text }); } }
                                /> 
                        </View>

                        <View style={styles.inputBox}>
                            <View style={styles.containerIcon}>
                                <Icon style={[styles.icon]} name={'odnoklassniki'}/>
                            </View>
                            <TextInput
                                style={styles.inputTexto}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                placeholder="Kids"
                                placeholderTextColor = 'rgba(0,0,0,0.1)'
                                keyboardType={'number-pad'}
                                maxLength={2}
                                value={this.state.typed_kids}
                                onChangeText={ (text) => { this.setState({ typed_kids: text }); } }
                                /> 
                        </View>

                        <View style={styles.inputBoxMultiline}>
                            <View style={styles.containerIcon}>
                                <Iconm style={[styles.icon]} name={'description'}/>
                            </View>
                            <TextInput
                                style={styles.inputTextoMultiline}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                placeholder="About My Children"
                                placeholderTextColor = 'rgba(0,0,0,0.1)'
                                autoCapitalize = 'sentences'
                                multiline = {true}
                                blurOnSubmit = {true}
                                returnKeyType={'done'}
                                value={this.state.typed_about}
                                onChangeText={ (text) => { this.setState({ typed_about: text }); } }
                                /> 
                        </View>
                        
                        

                        <TouchableOpacity style={styles.boton} onPress={()=> this.verificar_datos()}>
                            <Text style={styles.botonText}>Save</Text>
                        </TouchableOpacity> 

                        <TouchableOpacity style={styles.boton} onPress={()=> this.comentarios()}>
                            <Text style={styles.botonText}>View Comments</Text>
                        </TouchableOpacity> 

                        <View style={ styles.espacio }/>
                        <View style={styles.line}/>
                        <View style={ styles.espacio }/>
                        <View style={ styles.espacio }/>


                        <TouchableOpacity style={ styles.section } onPress={() => this.ver_legal()}>
                            <View style={styles.left}>
                                <Text style={styles.legales}>About Play And Out</Text>
                            </View>
                            <View style={styles.right}>
                                <Icon name={'angle-right'} size={20} color={'#017dc3'} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={ styles.section } onPress={() => this.ver_terms()}>
                            <View style={styles.left}>
                                <Text style={styles.legales}>Terms of Use</Text>
                            </View>
                            <View style={styles.right}>
                                <Icon name={'angle-right'} size={20} color={'#017dc3'} />
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity style={ styles.section } onPress={() => this.ver_privacy()}>
                            <View style={styles.left}>
                                <Text style={styles.legales}>Privacy Policy</Text>
                            </View>
                            <View style={styles.right}>
                                <Icon name={'angle-right'} size={20} color={'#017dc3'} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={ styles.section } onPress={() => this.restore()}>
                            <View style={styles.left}>
                                <Text style={styles.legales}>Restore Purchases</Text>
                            </View>
                            <View style={styles.right}>
                                <Icon name={'angle-right'} size={20} color={'#017dc3'} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={ styles.section } onPress={() => this.cerrar()}>
                            <View style={styles.left}>
                                <Text style={styles.legales}>Logout</Text>
                            </View>
                        </TouchableOpacity>


                <View style={ styles.section }>
                    <View style={styles.left}>
                        <Text style={styles.legales}>Version: {global.version}</Text>
                    </View>
                    <View style={styles.right}>
                    </View>
                </View>

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




    section : {
        flexDirection: 'row',
        //paddingHorizontal: 20,
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
    },

    espacio : {
        paddingVertical: 10,
    },
    
    line : {
        paddingVertical: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: '#0000001A',
    },

    legales: {
		fontFamily: 'vagroundedbt',
		fontSize:15,
		//color:'#000000',
		textAlign:'center'
    },
    
    
});