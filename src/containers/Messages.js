/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, { Component } from 'react';
import {View, StyleSheet, Text, ScrollView, FlatList, TouchableOpacity, AsyncStorage} from 'react-native';
import TopBar from '../components/inicio/TopBarBack';
import CardMensajes from '../components/mensajes/CardMensajes';
import global from '../managers/Global';

export default class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            mensajes: [],
            length: 0,
        });
    }

    componentDidMount() {
        this.get_mensajes();
    }

    get_mensajes() {
        var query = global.firebase.database().ref(global.databasePath+'messages/' + global.userId);
        query.on('value', (childSnapshot) => {
            const mensajes = [];
            var length = 0;
            childSnapshot.forEach((doc) => {
                mensajes.push({
                    key         :doc.key,
                    datos       :doc.toJSON(),
                    timestamp   :doc.toJSON().timestamp,
                });

                length += Object.keys(doc.toJSON()).length;

                this.setState({
                    mensajes: mensajes.sort(function(a, b){return b.timestamp - a.timestamp}),
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
            if(value != null){ 
                if(this.state.length != value){
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


    componentWillReceiveProps(newProps) {
		//this.get_mensajes();
    }

    _renderItem = ({item, index}) => (
        <CardMensajes
            listing={item} 
            {...this.props}
        />
    );

    render() {
        return (
            
            <View style={styles.container}>

                <TopBar {...this.props}/>

                <View style={styles.header}>
                    <Text style={styles.titulo} >My Messages</Text>
                </View>

                <View style={styles.containerNot}>
                    <FlatList
                        data={this.state.mensajes}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={true}
                        showsVerticalScrollIndicator={true}
                        ListHeaderComponent={this.renderHeader}
                    />
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
    parrafo: {
        color: '#ffffff',
    },
    containerNot: {
        flex: 1
    }
});