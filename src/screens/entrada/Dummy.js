/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, { Component } from 'react';
import {View, StyleSheet,  Image} from 'react-native';

export default class Dummy extends Component
{
    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('Menu')
        }, 0)
    }

    render() {
        return (
            <View style={styles.container}>
                <Image resizeMode="contain" style={styles.image} source={require('../../assets/logo.png')} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 300,
        height: 300
    }
});