/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import global from '../../managers/Global';

export default class Calificador extends Component {

    constructor(props) {
        super(props);

        this.state = {
            color1: 'rgba(0,0,0,0.5)',
            color2: 'rgba(0,0,0,0.5)',
            color3: 'rgba(0,0,0,0.5)',
            color4: 'rgba(0,0,0,0.5)',
            color5: 'rgba(0,0,0,0.5)',
        }
    }

    valor = (value) => 
	{
        global.calificacion = value;
        
        this.setState({
            color1: 'rgba(0,0,0,0.5)',
            color2: 'rgba(0,0,0,0.5)',
            color3: 'rgba(0,0,0,0.5)',
            color4: 'rgba(0,0,0,0.5)',
            color5: 'rgba(0,0,0,0.5)',
        });

        if(value == 1){
            this.setState({
                color1: '#fff03b',
            });
        }
        if(value == 2){
            this.setState({
                color1: '#fff03b',
                color2: '#fff03b',
            });
        }
        if(value == 3){
            this.setState({
                color1: '#fff03b',
                color2: '#fff03b',
                color3: '#fff03b',
            });
        }
        if(value == 4){
            this.setState({
                color1: '#fff03b',
                color2: '#fff03b',
                color3: '#fff03b',
                color4: '#fff03b',
            });
        }
        if(value == 5){
            this.setState({
                color1: '#fff03b',
                color2: '#fff03b',
                color3: '#fff03b',
                color4: '#fff03b',
                color5: '#fff03b',
            });
        }
	}

	render(){
		return(
			<View>
                <View style={styles.botonesContainer}>

                    <TouchableOpacity style={styles.boton} onPress={() => this.valor(1)}>
                        <Icons style={styles.star} name="star" size={50} color={this.state.color1} />
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.boton} onPress={() => this.valor(2)}>
                        <Icons style={styles.star} name="star" size={50} color={this.state.color2} />
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.boton} onPress={() => this.valor(3)}>
                        <Icons style={styles.star} name="star" size={50} color={this.state.color3} />
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.boton} onPress={() => this.valor(4)}>
                        <Icons style={styles.star} name="star" size={50} color={this.state.color4} />
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.boton} onPress={() => this.valor(5)}>
                        <Icons style={styles.star} name="star" size={50} color={this.state.color5} />
                    </TouchableOpacity>

                </View>
  			</View>
		)
	}
}

const styles = StyleSheet.create({
    botonesContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
        marginBottom: 20,
    },
    star : {
        marginHorizontal: 5
    },
});