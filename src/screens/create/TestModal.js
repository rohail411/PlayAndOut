/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, { Component } from 'react';
import {View, StyleSheet, Text, ScrollView, FlatList, TouchableOpacity, Image} from 'react-native';
import Iconf from 'react-native-vector-icons/FontAwesome';

import TopBar           from '../../components/inicio/TopBarBack';
import CardRequest    from '../../components/requests/CardRequest';
import global           from '../../managers/Global';

export default class TestModal extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            requests: [],
        });
    }


   

    componentDidMount() {
        this.search_requests(1);
    }

    search_requests(value) {
    }

    _renderItem = ({item, index}) => (
        <CardRequest
            listing={item} 
            {...this.props}
        />
    );

    check_purchase() {

    }

    render() {
        return (
            
            <View style={styles.dialogOverlay}>
                <View style={styles.container}>

                    <View style={styles.logo}>
                        <Image resizeMode="contain" style={styles.image} source={require('../../assets/logo.png')} />
                    </View>

                    <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,  alignItems: 'flex-end', padding:5}}>
                        <TouchableOpacity style={styles.boton2} onPress={() => this.props.navigation.navigate('Search')}>
                            <Iconf name="close" size={25} color='white' />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.features}>
                        <Text style={styles.titulo} >Enjoy the full version:</Text>
                        <Text style={styles.subtitulo} >• Create Requests</Text>
                        <Text style={styles.subtitulo} >• Join to Requests</Text>
                        <Text style={styles.subtitulo} >• Send Messages</Text>
                        <Text style={styles.subtitulo} >• Rate and comment</Text>
                    </View>

                    <View style={styles.containerBoton}>
                        <TouchableOpacity style={styles.boton} onPress={() => this.check_purchase()}>
                            <Text style={styles.botonText}>Buy Now: $0.99</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
            
        );
    }
};

const styles = StyleSheet.create({
    dialogOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },

    container : {
		flex: 1,
        marginHorizontal: 20,
        marginVertical: 100,
        borderRadius: 10,
        backgroundColor:'#ffffff',
        justifyContent: 'space-between',
	},

    logo: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
    },
    image: {
        width: 250,
        height: 80
    },

    features: {
        alignItems: 'center',
    },
    titulo: {
        fontSize: 25,
        color: '#017dc3',
        fontFamily: 'vagroundedbt',
    },
    subtitulo: {
        fontSize: 19,
        fontFamily: 'vagroundedbt',
    },

    containerBoton: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 30,
    },
    boton: {
        flex: 1,
        marginHorizontal:20,
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
        fontFamily: 'vagroundedbt'
    },

    boton2: {
        flexDirection: 'row',
        alignItems: 'center',
		justifyContent: 'center',
        backgroundColor:'#ce252d',
		borderRadius: 25,
        width: 50,
        height: 50,
    },

    botonText2: {
        fontSize:40,
		color:'#ffffff',
        textAlign:'center',
        fontFamily: 'vagroundedbt',
        marginLeft: 5
    }
});