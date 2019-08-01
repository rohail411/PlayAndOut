import React, { Component } from 'react';
import {
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  View
} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types'
import BotonLarge		from './BotonLarge';
import BotonClose		from './BotonClose';
import BotonSection		from './BotonSection';


export default class Equipos extends Component {
  static propTypes = {
    title: PropTypes.string,
    visible: PropTypes.bool,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    cancelText: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    submitText: PropTypes.string,
    onChangeText: PropTypes.func.isRequired,
    borderColor: PropTypes.string,
    promptStyle: PropTypes.object,
    titleStyle: PropTypes.object,
    buttonStyle: PropTypes.object,
    buttonTextStyle: PropTypes.object,
    submitButtonStyle: PropTypes.object,
    submitButtonTextStyle: PropTypes.object,
    cancelButtonStyle: PropTypes.object,
    cancelButtonTextStyle: PropTypes.object,
    inputStyle: PropTypes.object,
    textInputProps: PropTypes.object,
  };

  static defaultProps = {
    visible: false,
    defaultValue: '',
    cancelText: 'Cancel',
    submitText: 'OK',
    borderColor:'#ccc',
    promptStyle: {},
    titleStyle: {},
    buttonStyle: {},
    buttonTextStyle: {},
    submitButtonStyle: {},
    submitButtonTextStyle: {},
    cancelButtonStyle: {},
    cancelButtonTextStyle: {},
    inputStyle: {},
    onChangeText: () => {},
  };

  state = {
    value: '',
    visible: false,
  };

  componentDidMount() {
    this.setState({value: this.props.defaultValue});
  }

  componentWillReceiveProps(nextProps) {
    const { visible, defaultValue } = nextProps;
    this.setState({ visible, value:defaultValue });
  }

  _onChangeText = (value) => {
    this.setState({ value });
    this.props.onChangeText(value);
  };

  _onSubmitPress = () => {
    const { value } = this.state;
    this.props.onSubmit(value);
  };

  _onSetValue = (valor) => {
    const { value } = this.state;
    this.props.onSubmit(valor);
  };

  _onCancelPress = () => {
    this.props.onCancel();
  };

  close = () => {
    this.setState({visible: false});
  };

  _renderDialog = () => {
    const {
      title,
      placeholder,
      defaultValue,
      cancelText,
      submitText,
      borderColor,
      promptStyle,
      titleStyle,
      buttonStyle,
      buttonTextStyle,
      submitButtonStyle,
      submitButtonTextStyle,
      cancelButtonStyle,
      cancelButtonTextStyle,
      inputStyle
    } = this.props;
    return (
      <View style={styles.dialog} key="prompt">
        <View style={styles.dialogOverlay}/>

        <ScrollView style={styles.scroll}>
        

            <View style={styles.botonContainer}>

            <BotonClose activo={true} text="Close" handleOnPress={() => this._onSetValue('close')} />
            <BotonLarge activo={true} text="Ball Tag" handleOnPress={() => this._onSetValue('Ball Tag')} />
            <BotonLarge activo={true} text="Button,Button" handleOnPress={() => this._onSetValue('Button,Button')} />
            <BotonLarge activo={true} text="Baseball" handleOnPress={() => this._onSetValue('Baseball')} />
            <BotonLarge activo={true} text="Cops And Robers" handleOnPress={() => this._onSetValue('Cops And Robers')} />
            <BotonLarge activo={true} text="Crack The Whip" handleOnPress={() => this._onSetValue('Crack The Whip')} />
            <BotonLarge activo={true} text="Dandy Shandy" handleOnPress={() => this._onSetValue('Dandy Shandy')} />
            <BotonLarge activo={true} text="Dodgeball" handleOnPress={() => this._onSetValue('Dodgeball')} />
            <BotonLarge activo={true} text="Double Dutch" handleOnPress={() => this._onSetValue('Double Dutch')} />
            <BotonLarge activo={true} text="Freeze Tag" handleOnPress={() => this._onSetValue('Freeze Tag')} />
            <BotonLarge activo={true} text="The Floor Is Lava" handleOnPress={() => this._onSetValue('The Floor Is Lava')} />
            <BotonLarge activo={true} text="Hide And Seek" handleOnPress={() => this._onSetValue('Hide And Seek')} />
            <BotonLarge activo={true} text="Hoop Rolling" handleOnPress={() => this._onSetValue('Hoop Rolling')} />
            <BotonLarge activo={true} text="Hopscotch" handleOnPress={() => this._onSetValue('Hopscotch')} />
            <BotonLarge activo={true} text="Hurray" handleOnPress={() => this._onSetValue('Hurray')} />
            <BotonLarge activo={true} text="Jacks" handleOnPress={() => this._onSetValue('Jacks')} />
            <BotonLarge activo={true} text="Jumpsies" handleOnPress={() => this._onSetValue('Jumpsies')} />
            <BotonLarge activo={true} text="Kick The Can" handleOnPress={() => this._onSetValue('Kick The Can')} />
            <BotonLarge activo={true} text="Marbles" handleOnPress={() => this._onSetValue('Marbles')} />
            <BotonLarge activo={true} text="Marco Polo" handleOnPress={() => this._onSetValue('Marco Polo')} />
            <BotonLarge activo={true} text="Pick Up Stick" handleOnPress={() => this._onSetValue('Pick Up Stick')} />
            <BotonLarge activo={true} text="Red Rover" handleOnPress={() => this._onSetValue('Red Rover')} />
            <BotonLarge activo={true} text="Ringolevio" handleOnPress={() => this._onSetValue('Ringolevio')} />
            <BotonLarge activo={true} text="Tag" handleOnPress={() => this._onSetValue('Tag')} />

            <BotonSection activo={true} text="Sports" />
            <BotonLarge activo={true} text="Soccer" handleOnPress={() => this._onSetValue('Soccer')} />
            <BotonLarge activo={true} text="Basketball" handleOnPress={() => this._onSetValue('Basketball')} />
            <BotonLarge activo={true} text="Baseball" handleOnPress={() => this._onSetValue('Baseball')} />
            <BotonLarge activo={true} text="Hockey tl" handleOnPress={() => this._onSetValue('Hockey tl')} />
            <BotonLarge activo={true} text="Tennis" handleOnPress={() => this._onSetValue('Tennis')} />
            <BotonLarge activo={true} text="Lacrosse" handleOnPress={() => this._onSetValue('Lacrosse')} />
            <BotonLarge activo={true} text="Volleyball" handleOnPress={() => this._onSetValue('Volleyball')} />

            


		    </View>

        </ScrollView>

      </View>
    );
  };

  render() {
    return (
      <Modal onRequestClose={() => this.close()} transparent={true} visible={this.props.visible}>
        {this._renderDialog()}
      </Modal>
    );
  }
};
