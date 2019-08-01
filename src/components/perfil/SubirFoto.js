/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, { Component } from 'react';
import { StyleSheet, Text,  View, TouchableOpacity, Image } from 'react-native';
import global 			from '../../managers/Global'; 
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob 		from 'react-native-fetch-blob';;

export default class SubirFoto extends Component {

	constructor(props) {
		super(props);

		this.state = ({
            videos: [],
			loading: false,
			loading: false,
        });
	}


	cambiar_foto = () => {
		ImagePicker.openPicker({
			width: 200,
			height: 200,
			cropping: true
		  }).then(image => {
			this.set_video(image.path)
		});
	}
	set_video = (value) => {
		global.user.picture = '';
		global.events.emit('change_picture', '');
		let source = { uri: value };
		this.videocomunidad  = value
		global.toUpload  = value
		this.subir_video()
	}



    subir_video = () => {
			this.setState({ loading: true });

			const image = global.toUpload
	 
			const Blob = RNFetchBlob.polyfill.Blob
			const fs = RNFetchBlob.fs
			window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
			window.Blob = Blob
		

			var timeStamp = Math.floor(Date.now() / 1000);
			let uploadBlob = null
			const imageRef = global.firebase.storage().ref('pictures/'+global.userId+timeStamp+'.png')
			let mime = 'image/png'


			fs.readFile(image, 'base64')
			.then((data) => {
				return Blob.build(data, { type: `${mime};BASE64` })
			})
			.then((blob) => {
				uploadBlob = blob
				return imageRef.put(blob, { contentType: mime })
			})
			.then(() => {
				uploadBlob.close()
				return imageRef.getDownloadURL()
			})
			.then((url) => {

					
					global.user.picture = 'https://storage.googleapis.com/stopandboy-e2acb.appspot.com/pictures/'+global.userId+timeStamp+'.png';
					global.firebase.database().ref(global.databasePath+'users/' + global.userId).update({ 
						picture : global.user.picture
					}).then(function(snapshot) {
						global.events.emit('change_picture', '');
					});
					global.events.emit('change_picture', '');
			})
			.catch((error) => {
				console.log('subir '+error);
			})
	}

	render(){
		return(
			<View style={styles.container}>
				<TouchableOpacity style={styles.botonSmall} onPress={()=> this.cambiar_foto()}>
                    <Text style={styles.botonTextSmall}>Change Pic</Text>
                </TouchableOpacity> 
  			</View>
		)
	}
}

const styles = StyleSheet.create({
    container : {
    },

    botonSmall: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems:'center',
		backgroundColor:'#ce252d',
        borderRadius: 15,
		width: 110,
		height: 30,
    	elevation: 4,
		marginTop: 2,
    },
    botonTextSmall: {
		fontFamily: 'vagroundedbt',
		fontSize:15,
		color:'#ffffff',
		textAlign:'center'
    },
});