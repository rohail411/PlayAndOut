/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */

import * as firebase from 'firebase';
import global from './Global';

class Firebase {

    static init(){

        if(!global.initFirebase){
            global.initFirebase = true; 
            firebase.initializeApp({
                apiKey: "AIzaSyCkNHvXN-XkWAwu6u2dqKIsrxlEjvmzmPg",
                authDomain: "stopandboy-e2acb.firebaseapp.com",
                databaseURL: "https://stopandboy-e2acb.firebaseio.com",
                projectId: "stopandboy-e2acb",
                storageBucket: "stopandboy-e2acb.appspot.com",
                messagingSenderId: "699317574264"
            })
            console.log('Inicia Firebase!');
        }
    }

}
export default Firebase;