/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, { Component } from 'react';
import {Text} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { TabBarBottom } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Entypo';
import Iconf from 'react-native-vector-icons/FontAwesome';
import Iconm from 'react-native-vector-icons/MaterialIcons';

import Home 			from '../containers/Home';
import Requests 		from '../containers/Requests';
import Friends 			from '../containers/Friends';
import Messages 		from '../containers/Messages';
import Profile    		from '../containers/Profile';
import IconBadge    		from '../components/mensajes/IconBadge';


const TabNavigator = createBottomTabNavigator({
	Home: 	    	{ screen: Home, navigationOptions : 	{ tabBarIcon: ({ tintColor }) =>  <Icon name="location-pin" size={21} color={tintColor} /> } },
	Requests: 		{ screen: Requests, navigationOptions : { tabBarIcon: ({ tintColor }) =>  <Iconf name="child" size={21} color={tintColor} /> } },
	Friends: 		{ screen: Friends, navigationOptions : 	{ tabBarIcon: ({ tintColor }) =>  <Iconf name="group" size={20} color={tintColor} /> } },
	// Messages: 		{ screen: Messages, navigationOptions : { tabBarIcon: ({ tintColor }) =>  <Icon name="chat" size={21} color={tintColor} /> } },
	Messages: 		{ screen: Messages, navigationOptions : { tabBarIcon: ({ tintColor }) =>  <IconBadge MainElement={<Icon name="chat" size={21} color={tintColor} /> }
					BadgeElement={<Text style={{ color: 'white' }}>{''}</Text>} Hidden={''=== 0} /> } },



	Profile: 		{ screen: Profile, navigationOptions : 	{ tabBarIcon: ({ tintColor }) =>  <Iconm name="face" size={21} color={tintColor} /> } },
}, {
	tabBarOptions: {
		labelStyle: {
			fontSize: 12,
			//fontWeight: 'bold',
			marginBottom: 5,
			fontFamily: 'vagroundedbt'
		},
		style: {
			borderTopWidth: 0,
        },
		activeTintColor: '#ffffff',
		inactiveTintColor: '#4ea4d5',
		activeBackgroundColor: '#017dc3',
        inactiveBackgroundColor: '#017dc3',
	},
	tabBarComponent: TabBarBottom,
	tabBarPosition: 'bottom',
});

export default createAppContainer(TabNavigator);