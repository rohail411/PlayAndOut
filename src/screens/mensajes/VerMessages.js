/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, { Component } from 'react';
import {View, StyleSheet, Text, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import TopBar from '../../components/inicio/TopBarBack';
import ItemMensaje from '../../components/mensajes/ItemMensaje';
import global from '../../managers/Global';

export default class VerMessages extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            mensajes: [],
        });
    }

    componentDidMount() {
        this.get_mensajes();
    }
    
    get_mensajes() {
        var query = global.firebase.database().ref(global.databasePath+'messages/' + global.userId + '/'+ global.mensajesId);
        query.on('value', (childSnapshot) => {
            const mensajes = [];
            childSnapshot.forEach((doc) => {
                mensajes.push({
                    key         :doc.key,
                    datos       :doc.toJSON(),
                    timestamp   :doc.toJSON().timestamp,
                });

                this.setState({
                    mensajes: mensajes.sort(function(a, b){return b.timestamp - a.timestamp})
                });
            });
        });
    }


    componentWillReceiveProps(newProps) {
		this.get_mensajes();
    }

    _renderItem = ({item, index}) => (
        <ItemMensaje
            listing={item} 
            {...this.props}
        />
    );

    render() {
        return (
            
            <View style={styles.container}>

                <TopBar {...this.props}/>

                <View style={styles.header}>
                    <Text style={styles.titulo} >{global.mensajesName}</Text>
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