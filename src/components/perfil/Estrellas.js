/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icons            from 'react-native-vector-icons/FontAwesome';
import global from '../../managers/Global';

export default class Estrellas extends Component {

    constructor(props) {
        super(props);

        this.state = {
            color1: '#fff03b',
            color2: '#fff03b',
            color3: '#fff03b',
            color4: '#fff03b',
            color5: '#fff03b',
        }
    }

    componentDidMount() {

        var query = global.firebase.database().ref(global.databasePath+'ratings/' + global.ver_user_rating);
        query.on('value', (snapshot) => {
            var count = 0;
            var rating = 0;
            var value = 0;
            snapshot.forEach((doc) => {
                count += 1;
                rating += doc.toJSON().rating;
            });

            value = rating/count;

            this.setState({
                color1: 'rgba(0,0,0,0.3)',
                color2: 'rgba(0,0,0,0.3)',
                color3: 'rgba(0,0,0,0.3)',
                color4: 'rgba(0,0,0,0.3)',
                color5: 'rgba(0,0,0,0.3)',
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
        });
    }

	render(){
		return(
			<View>
                <View style={styles.botonesContainer}>
                    <Icons style={styles.star} name="star" size={20} color={this.state.color1} />
                    <Icons style={styles.star} name="star" size={20} color={this.state.color2} />
                    <Icons style={styles.star} name="star" size={20} color={this.state.color3} />
                    <Icons style={styles.star} name="star" size={20} color={this.state.color4} />
                    <Icons style={styles.star} name="star" size={20} color={this.state.color5} />
                </View>
  			</View>
		)
	}
}

const styles = StyleSheet.create({
    botonesContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		marginVertical: 6,
    },
    star : {
        marginRight: 2
    },
});