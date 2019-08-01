/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, { Component } from 'react';
import {View, StyleSheet, Text, Image, BackHandler } from 'react-native';
// import firebase from 'react-native-firebase';
import AppContainer         from './navigators/Router';
import Loader               from './components/general/loader';
import global               from './managers/Global'; 



console.disableYellowBox = true;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
			loading: false,
        };
    }
    
    componentDidMount() {
        global.events.addListener('loader_on', () => this.loader_on());
        global.events.addListener('loader_off', () => this.loader_off());
        //BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);

        /*
        firebase.messaging().getToken()
        .then(fcmToken => {
            if (fcmToken) {
            // user has a device token
            console.log('token device '+ fcmToken)
            } else {
            // user doesn't have a device token yet
            console.log('no token device '+ fcmToken)
            } 
        });
        */
    }
    componentWillUnmount() {
        //BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressed);
    }
    onReceived(notification) {
        console.log("Notification received: ", notification);
    }
    onOpened(openResult) {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);
    }
    
    onIds(device) {
        global.user.device_id = device.userId;
        console.log('Device info: ', device.userId);
    }

    onBackButtonPressed() {
        return true;
    }

    loader_on() {
        this.setState({ loading: true });
    }

    loader_off() {
        this.setState({ loading: false });
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Loader loading={this.state.loading} />
                <AppContainer/>
            </View>
        )
  }
}

export default App;

const styles = StyleSheet.create({
	container : {
	  	flex: 1,
    },
    
    logo: {
		width: 200,
		height: 200,
    }
});