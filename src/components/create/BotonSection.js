/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
//import colors from '../../styles/colors';

export default class BotonSection extends Component {
  render() {

    
  	const {
        loading,
        disabled,
        text,
        textColor, 
        background,
        icon,
        handleOnPress,
        textSize,
        textWeight,
        iconPosition,
        textAlign,
        borderColor
    } = this.props;
  	const backgroundColor = background || 'transparent';
  	//const color = textColor || colors.black;
    const fontSize = textSize || 16;
    const fontWeight = textWeight || '600';
    const alignPosition = textAlign || 'center';
    const iconLocation = iconPosition || 'left';
    //const border = borderColor || colors.white;
    const opacityStyle = disabled || loading ? 0.5 : 1;
    const textOpacity = loading ? 0 : 1;

    return (
        <View style={styles.enterContainer}>
            <View style={ styles.buttonOn }  >
                <Text style={styles.buttonText}>{text}</Text>
            </View>
        </View>
    );
  }
}

BotonSection.propTypes = {

    handleOnPress: PropTypes.func.isRequired,
    /*
    text: PropTypes.string.isRequired,
    textColor: PropTypes.string,
    textSize: PropTypes.string,
    textWeight: PropTypes.string,
    textAlign: PropTypes.string,
    background: PropTypes.string,
    borderColor: PropTypes.string,
    icon: PropTypes.object,
    iconPosition: PropTypes.string,
    
    disabled: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    */
};

const styles = StyleSheet.create({
    enterContainer: {
        paddingHorizontal:40,
        marginVertical: 5,
        marginTop: 30,
    },
    
	buttonOn: {
		justifyContent: 'center',
		backgroundColor:'#a1d348',
		borderRadius: 18,
        height: 36,
    },
    

	buttonText: {
		fontSize:18,
		color:'#ffffff',
        textAlign:'center',
        fontFamily: 'vagroundedbt',
	},
});