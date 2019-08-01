/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, { Component } from 'react';
import {View, StyleSheet, Text, ScrollView, FlatList, TouchableOpacity, Slider} from 'react-native';
import haversine from "haversine";

import TopBar           from '../../components/inicio/TopBarBack';
import CardRequest    from '../../components/requests/CardRequest';
import global           from '../../managers/Global';

export default class Search extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            requests: [],
            distancia: 1
        });
    }


    formatDate() {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [year, month, day].join('-');
    }


    distancia_ubicacion = (location_play) => {
        var number = haversine(global.current_position, location_play);
        var distancia = number.toFixed(1);
        return distancia;
    }

    componentDidMount() {
        this.search_requests(1);
    }

    search_requests(value) {
        var query = global.firebase.database().ref(global.databasePath+'requests').orderByChild('date_c').startAt(this.formatDate());
        query.on('value', (childSnapshot) => {
            const requests = [];
            childSnapshot.forEach((doc) => {
                
                if(this.distancia_ubicacion(doc.toJSON().location) <= this.state.distancia)
                {
                    requests.push({
                        key         :doc.key,
                        datos       :doc.toJSON(),
                        timestamp   :doc.toJSON().timestamp,
                    });
                }

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

    set_distancia = (val) => {
        this.state.distancia = val;
		this.setState({
            distancia:val
        });

        this.search_requests(1);
	}

    render() {
        return (
            
            <View style={styles.container}>

                <TopBar {...this.props}/>

                <View style={styles.header}>
                    <Text style={styles.titulo} >Latest Requests</Text>
                </View>

                <View style={ styles.sectionA }>
                    <View style={styles.left}>
                        <Text style={styles.textoA}>Search Distance:</Text>
                    </View>
                    <View style={styles.right}>
                        <Text style={styles.textoA}>{this.state.distancia}mi.</Text>
                    </View>
                </View>

                <View style={ styles.Slider }>
					<Slider
						style={{   }}
                        step={.5}
                        value={this.state.distancia}
						minimumValue={1}
						maximumValue={20}
						onValueChange={val => this.set_distancia(val)}
						onSlidingComplete={ val => this.set_distancia(val)}
						thumbTintColor='#e6103e'
						minimumTrackTintColor='#e6103e'
					/>
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
        alignItems: 'center',
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

    containerBotonera : {
        flexDirection: 'row',
		justifyContent:'center',
        marginBottom: 10,

    },
    botonSmall: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems:'center',
		backgroundColor:'#ce252d',
        borderRadius: 15,
		width: 120,
		height: 30,
		marginVertical: 10,
		marginHorizontal: 10,
    },
    botonTextSmall: {
		fontFamily: 'vagroundedbt',
		fontSize:14,
		color:'#ffffff',
		textAlign:'center'
    },

    sectionA : {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
        paddingTop: 20,
        // backgroundColor:'#ce252d',
    },
    left: {
        borderWidth: 0,
        justifyContent: 'center'
    },
    right: {
        flex:1,
        alignItems: 'flex-end',
    },
    Slider: {
		// flex:1,
        paddingVertical: 0,
        paddingHorizontal: 20,
        marginBottom: 20
	},
    textoA: {
        color:'#606060',
        fontWeight: 'bold',
    },
});