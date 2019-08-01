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
import Places		from '../inicio/Places';


export default class PlacesModal extends Component {
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

        {/* <ScrollView style={styles.scroll}> */}


          <View style={styles.container}>

            <View style={styles.places}>
              <Places style={styles.containers} {...this.props}/>
            </View>
          <BotonLarge activo={true} text="Close" handleOnPress={() => this._onSetValue('Hide And Seek')} />

		    </View>

        {/* </ScrollView> */}

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
