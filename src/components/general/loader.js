/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, { Component } from 'react';
import { StyleSheet, Text,  View,  Modal, ActivityIndicator} from 'react-native';

const Loader = props => {
    const {
      loading,
      ...attributes
    } = props;
  
    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={loading}
            onRequestClose={() => {console.log('close modal')}}
            >
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator
                        size="large" 
                        color="#ffffff"
                        animating={loading} 
                        />
                </View>
            </View>
        </Modal>
    )
  }
  
  const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(0,0,0,0.8)'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#e6103e',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
  });
  
  export default Loader;