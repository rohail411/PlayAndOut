/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */
 
import React, { Component } from 'react';
import {View, StyleSheet, Text, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import TopBar from '../../components/inicio/TopBarBack';
import ItemMensajes from '../../components/requests/ItemMensajes';
import global from '../../managers/Global';

export default class RequestMessages extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            mensajes: [],
        });
    }

    componentDidMount() {
        var query = global.firebase.database().ref(global.databasePath+'requests/' + global.mensajesrequesId + '/messages');
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

        console.log('mensajesrequesId '+global.mensajesrequesId)
    }


    send = () => {
        this.props.navigation.navigate('SendMessRequest');
    }

    _renderItem = ({item, index}) => (
        <ItemMensajes
            listing={item} 
            {...this.props}
        />
    );

    render() {
        return (
            
            <View style={styles.container}>

                <TopBar {...this.props}/>

                <View style={styles.header}>
                    <Text style={styles.titulo} >Request Messages</Text>
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


                <View style={styles.containerb}>
                    <View style={styles.containerBoton}>
                        <TouchableOpacity style={styles.boton} onPress={() => this.send()}>
                            <Text style={styles.botonText}>Send Message</Text>
                        </TouchableOpacity>
                    </View>
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
    },


    containerb : {
        //flex: 1,
        paddingVertical:10,
        backgroundColor:'#fff',
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