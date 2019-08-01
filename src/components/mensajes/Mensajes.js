/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, { Component } from 'react';
import {View, StyleSheet, Text, ScrollView, FlatList, TouchableOpacity} from 'react-native';

import TopBar           from '../../components/inicio/TopBarBack';
import CardComments    from '../../components/requests/CardComments';
import global           from '../../managers/Global';

export default class Comentarios extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            requests: [],
        });
    }

    componentDidMount() {
        var query = global.firebase.database().ref(global.databasePath+'comments/' + global.ver_perfil_id);
        query.on('value', (childSnapshot) => {
            const requests = [];
            childSnapshot.forEach((doc) => {
                requests.push({
                    key         :doc.key,
                    datos       :doc.toJSON(),
                    timestamp   :doc.toJSON().timestamp,
                });

                this.setState({
                    requests: requests.sort(function(a, b){return b.timestamp - a.timestamp})
                });
            });
        });
    }

    _renderItem = ({item, index}) => (
        <CardComments
            listing={item} 
            {...this.props}
        />
    );

    render() {
        return (
            
            <View style={styles.container}>

                <TopBar {...this.props}/>

                <View style={styles.header}>
                    <Text style={styles.titulo} >Comments</Text>
                </View>

                <View style={styles.containerNot}>
                    <FlatList
                        data={this.state.requests}
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
        //alignItems: 'center',
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