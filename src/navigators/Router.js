/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Splash               from '../screens/entrada/Splash';
import Intro                from '../screens/entrada/Intro';
import Login                from '../screens/entrada/Login';
import Signup               from '../screens/entrada/Signup';
import SignupFb             from '../screens/entrada/SignupFb';
import Recordar             from '../screens/entrada/Recordar';
import Bienvenida           from '../screens/entrada/Bienvenida';
import About                from '../screens/entrada/About';
import AboutIntro           from '../screens/entrada/AboutIntro';
import Dummy                from '../screens/entrada/Dummy';
import Menu                 from '../navigators/Menu';

import Search               from '../screens/home/Search';
import CreateRequest        from '../screens/create/CreateRequest';
import DetalleRequest       from '../screens/request/DetalleRequest';
import PlayerProfile        from '../screens/request/PlayerProfile';
import Calificar            from '../screens/request/Calificar';
import Comentar             from '../screens/request/Comentar';
import Comentarios          from '../screens/request/Comentarios'; 
import RequestMessages      from '../screens/request/RequestMessages'; 
import SendMessRequest      from '../screens/request/SendMessRequest'; 

import EnviarMensaje        from '../screens/mensajes/EnviarMensaje'; 
import VerMessages          from '../screens/mensajes/VerMessages'; 


const AppNavigator = createStackNavigator({
  	Splash:             { screen: Splash, navigationOptions: { header: null } },
    Intro:              { screen: Intro, navigationOptions: { header: null } },
    Login:              { screen: Login, navigationOptions: {  } },
    Signup:             { screen: Signup, navigationOptions: {  } },
    SignupFb:           { screen: SignupFb, navigationOptions: {  } },
    Recordar:           { screen: Recordar, navigationOptions: {  } },
    Bienvenida:         { screen: Bienvenida, navigationOptions: { header: null } },
    About:              { screen: About, navigationOptions: { header: null } },
    AboutIntro:         { screen: AboutIntro, navigationOptions: { header: null } },
    Dummy:              { screen: Dummy, navigationOptions: { header: null } },
    Menu:               { screen: Menu, navigationOptions: { header: null } },

    Search:             { screen: Search, navigationOptions: { header: null } },
    CreateRequest:      { screen: CreateRequest, navigationOptions: { header: null } },
    DetalleRequest:     { screen: DetalleRequest, navigationOptions: { header: null } },
    PlayerProfile:      { screen: PlayerProfile, navigationOptions: { header: null } },
    Calificar:          { screen: Calificar, navigationOptions: { header: null } },
    Comentar:           { screen: Comentar, navigationOptions: { header: null } },
    Comentarios:        { screen: Comentarios, navigationOptions: { header: null } },
    RequestMessages:    { screen: RequestMessages, navigationOptions: { header: null } },
    SendMessRequest:    { screen: SendMessRequest, navigationOptions: { header: null } },

    EnviarMensaje:      { screen: EnviarMensaje, navigationOptions: { header: null } },
    VerMessages:        { screen: VerMessages, navigationOptions: { header: null } },
},
{
    //initialRouteName: 'Splash',
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;