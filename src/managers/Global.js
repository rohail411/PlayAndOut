/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import EventEmitter from 'EventEmitter';
import * as firebase 	from 'firebase';
//var firebase = require('firebase');

export default {
    STORE_KEY: '',
    BASE_URL: '',
    events: new EventEmitter(),
    firebase: firebase,

    version: '1.0.164',
    initFirebase: false,
    databasePath: 'develop/',
    //databasePath: 'desarrollo/',
    
    conectado: false,
    tipo_registro: '',

    userId: '',

    user: {
        name	    : '',
        email	    : '',
        password	: '',
        address	    : '',
        phone	    : '',
        city	    : '',
        state	    : '',
        kids	    : '',
        about	    : '',
        picture	    : '',
        fbId	    : '',
        device_id   : ''
    },
    
    user_position: {
        latitude: 0,
        longitude: 0
    },

    current_position: {
        latitude: 0,
        longitude: 0
    },

    places: {
        latitude: 0,
        longitude: 0,
        name_drag:''
    },

    places_name: '',
    sendpos: false,

    // about: 'The main idea of app, is for children to meet up in a designated and agreed upon place to play together, leaving aside the use of electronic devices, and for them to use their creativity to have fun. \n\nLets not allow electronic devices to became the main focus for our children to get distracted or entertained, depriving them the ability to interact with others and develop better interpersonal skills. \n\nAs their parents, lets get involve and support them, by being part of these new adventure. they will thank us in the future for investing quality time with and them.',
    // aboutIntro: 'Play N’ Out is and application that was created with the purpose for children and adults to come together and enjoy playing games and/or sports, as well to build a friendship without having any type of discrimination of gender, race or religious beliefs. \n\nPlan N’ out is not responsible of any injury obtained during the activities get together or any other incidents that could happen during the activities.  All participants are responsible for their own safety. \n\nAll children MUST be accompanied by a parent/guardian at ALL times. \n\n All games or activities MUST be held in a public place, such as; playgrounds, Parks, or fields).  For the safety of all participants, activities will NOT be held in any private residency.\n\n',
    
    about:      'Play N’ Out is and application that was created with the purpose of a new way to play sports in real time, connecting with other players; You can create teams and schedules to play with  them. \n\nalso to build a friendship without having any type of discrimination of gender, race or religious beliefs. \n\nPlan N’ out is not responsible of any injury obtain during the activities get together or any other incidents that could be happen during the activities.  All participants are responsible for their own safety. \n\nAll children MUST be accompanied by a parent/guarding at ALL times. \n\nAll games or activities MUST be held in a public place, such as; playgrounds, Parks, or fields).  For the safety of all participants, activities will NOT be held in any private residency.',
    aboutIntro: 'Play N’ Out is and application that was created with the purpose of a new way to play sports in real time, connecting with other players; You can create teams and schedules to play with  them. \n\nalso to build a friendship without having any type of discrimination of gender, race or religious beliefs. \n\nPlan N’ out is not responsible of any injury obtain during the activities get together or any other incidents that could be happen during the activities.  All participants are responsible for their own safety. \n\nAll children MUST be accompanied by a parent/guarding at ALL times. \n\nAll games or activities MUST be held in a public place, such as; playgrounds, Parks, or fields).  For the safety of all participants, activities will NOT be held in any private residency.',

    horarios: [
        ["12:"," am"],
        ["1:"," am"],
        ["2:"," am"],
        ["3:"," am"],
        ["4:"," am"],
        ["5:"," am"],
        ["6:"," am"],
        ["7:"," am"],
        ["8:"," am"],
        ["9:"," am"],
        ["10:"," am"],
        ["11:"," am"],
        ["12:"," pm"],
        ["1:"," pm"],
        ["2:"," pm"],
        ["3:"," pm"],
        ["4:"," pm"],
        ["5:"," pm"],
        ["6:"," pm"],
        ["7:"," pm"],
        ["8:"," pm"],
        ["9:"," pm"],
        ["10:"," pm"],
        ["11:"," pm"],
    ],    
};