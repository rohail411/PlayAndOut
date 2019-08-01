/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, { Component } from 'react';
import {View, StyleSheet, Text, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import TopBar from '../components/inicio/TopBarBack';
import CardRequest from '../components/requests/CardRequest';
import global from '../managers/Global';

export default class Requests extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            requests: [],
            creadas: 0,
            joins: 0,
        });
    }

    componentDidMount() {
        this.traer_requests();
    }

    componentWillReceiveProps() {
        this.setState({
            requests: [],
         });
        this.traer_requests();
    }  


    traer_requests() {

        var query = global.firebase.database().ref(global.databasePath+'requests').orderByChild('participants/'+global.userId).startAt(global.userId);
            query.on('value', (snapshot) => {

                const requests = [];
                this.state.creadas = 0;
                this.state.joins = 0;

                snapshot.forEach((doc) => {

                    this.state.joins += 1;

                    if(doc.toJSON().userId == global.userId){
                        this.state.creadas += 1;
                    }

                    requests.push({
                        key     :doc.key,
                        datos   : doc.toJSON(),
                        timestamp: doc.toJSON().timestamp,
                    });

                    this.setState({
                        requests: requests.sort(function(a, b){return b.timestamp - a.timestamp})
                    });
                });
            });
    }


     

    _renderItem = ({item, index}) => (
        <CardRequest
            listing={item} 
            {...this.props}
        />
    );

    render() {
        return (
            
            <View style={styles.container}>

                <TopBar {...this.props}/>

                <View style={styles.header}>
                    <Text style={styles.titulo} >My Requests and Joins</Text>
                    <Text style={styles.parrafo} >Created: {this.state.creadas}</Text>
                    <Text style={styles.parrafo} >Joined: {this.state.joins}</Text>
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
        flex: 1,
        //paddingHorizontal: 20,
    }
});