/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, { Component } from 'react';
import {View, StyleSheet, Text, ScrollView, FlatList, TouchableOpacity, Share} from 'react-native';
import TopBar from '../components/inicio/TopBarBack';

export default class Friends extends Component {

    onShare = async () => {
        try {
          const result = await Share.share({
            message: "Play N' Out | Find and meet new friends and go to play fun games with them. DOWNLOAD NOW: https://play.google.com/store/apps/details?id=com.playandout",
          })
    
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
    };

    render() {
        return (
            
            <View style={styles.container}>

                <TopBar {...this.props}/>

                <View style={styles.header}>
                    <Text style={styles.titulo} >My Friends</Text>
                </View>

                <View style={styles.botonContainer}>
                    <TouchableOpacity style={styles.boton} onPress={()=> this.onShare()}>
                        <Text style={styles.botonText}>Invite Friends</Text>
                    </TouchableOpacity> 
                </View>

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
    
    botonContainer: {
		paddingHorizontal:20,
		paddingBottom: 30,
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