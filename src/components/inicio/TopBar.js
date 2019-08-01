/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/Entypo';
import global from '../../managers/Global';

export default class TopBar extends Component {

    abre_menu = (value) => 
	{
        //this.props.navigation.openDrawer();
    }
    
    render() {
        return (
            <View style={styles.container}>

                <View style={ styles.menu  } >
                    <Icon name="menu" size={30} color={'rgba(255, 255,255,0)'} />
                </View>

                <View style={styles.logo}>
                    <Image resizeMode="contain" style={styles.image} source={require('../../assets/logo_barra.png')} />
                </View>

                <View style={ styles.menu  } >
                    <Icon name="menu" size={30} color={'rgba(255, 255,255,0)'} />
                </View>

            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 80,
        backgroundColor: '#017dc3',
    },

    menu: {
        alignItems: 'center',
		justifyContent: 'center',
        paddingHorizontal:20,
    },
    menuTexto: {
        fontSize:10,
		color:'#ffffff',
        textAlign:'center',
    },

    logo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 350,
        height: 80
    }
});