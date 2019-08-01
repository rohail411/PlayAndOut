import React, { Component } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  View,
  Platform,
  ToastAndroid
} from 'react-native';
import PropTypes from 'prop-types';
import Iconf from 'react-native-vector-icons/FontAwesome';
import * as RNIap from 'react-native-iap';
import BotonLarge		from './BotonLarge';
import Places		from '../inicio/Places';
import global       from '../../managers/Global';


const itemSkus = Platform.select({
  android: [
    'full_app'
  ]
});


export default class ModalBuyApp extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        defaultValue: PropTypes.string,
        onCancel: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
    };

    static defaultProps = {
        visible: false,
        defaultValue: '',
        onChangeText: () => {},
    };

    state = {
        value: '',
        visible: false,
        products: '',
        receipt: ''
    };

    // componentDidMount() {
    //     this.setState({value: this.props.defaultValue});
    //     //  verificar_inapp_purchases();
    // }


    async componentDidMount() {
        try {
            const result = await RNIap.initConnection();
            // await RNIap.consumeAllItems();

            const products = await RNIap.getProducts(itemSkus);
            console.log('Products', products[0]);

            this.setState({value: this.props.defaultValue});
            
        } catch (err) {
            console.warn(err.code, err.message);
        }
    }

    async verificar_inapp_purchases() {
        
        try {
                const purchase = await RNIap.buyProduct('full_app');
                this.purchase_succesfull('yes');
                // this.setState({ receipt: purchase.transactionReceipt });
                console.log('respuesta compra');
                
            } catch (err) {
                console.warn(err.code, err.message);
                ToastAndroid.show('An error has occured. Please try again later.', ToastAndroid.SHORT);
        }
        
    }

    componentWillReceiveProps(nextProps) {
        const { visible, defaultValue } = nextProps;
        this.setState({ visible, value:defaultValue });
    }
    close = () => {
        this.setState({visible: false});
    };

    _onCancel = () => {
        this.props.onCancel();
    };

    _onSubmit = () => {
        this.verificar_inapp_purchases();
    };

    purchase_succesfull = (result) => {
        console.log('purchase_succesfull '+result);
        
        global.events.emit('loader_on', '');
        var query = global.firebase.database().ref(global.databasePath+'purchases/' + global.userId);
        query.set({            
            userId	    : global.userId,
            name	    : global.user.name,
            email	    : global.user.email,
            purchase	: 'yes',
            created	    : new Date().toDateString(),
            timestamp   : global.firebase.database.ServerValue.TIMESTAMP,
        }).then(function(snapshot) {
            global.events.emit('loader_off', '');
            successful();
        });
        successful = () => {
            this.props.onSubmit();
        };
    
    };

    

    _renderDialog = () => {
        const {
            defaultValue,
        } = this.props;

        return (
            <View style={styles.dialogOverlay}>
                <View style={styles.container}>

                    <View style={styles.logo}>
                        <Image resizeMode="contain" style={styles.image} source={require('../../assets/logo.png')} />
                    </View>

                    <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,  alignItems: 'flex-end', padding:5}}>
                        <TouchableOpacity style={styles.boton2} onPress={() => this._onCancel('close')}>
                            <Iconf name="close" size={25} color='white' />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.features}>
                        <Text style={styles.titulo} >Enjoy the full version:</Text>
                        <Text style={styles.subtitulo} >Create Requests</Text>
                        <Text style={styles.subtitulo} >Join to Requests</Text>
                        <Text style={styles.subtitulo} >Send Messages</Text>
                        <Text style={styles.subtitulo} >Rate and comment</Text>
                        <Text style={styles.subtitulo} >and much more!</Text>
                    </View>

                    <View style={styles.containerBoton}>
                        <TouchableOpacity style={styles.boton} onPress={() => this._onSubmit()}>
                            <Text style={styles.botonText}>Buy Now: $0.99</Text>
                        </TouchableOpacity>
                    </View>

                </View>
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


let styles = StyleSheet.create({
    dialogOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },

    container : {
		flex: 1,
        marginHorizontal: 20,
        marginVertical: 100,
        borderRadius: 10,
        backgroundColor:'#ffffff',
        justifyContent: 'space-between',
	},

    logo: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
    },
    image: {
        width: 250,
        height: 80
    },

    features: {
        alignItems: 'center',
    },
    titulo: {
        fontSize: 25,
        color: '#017dc3',
        fontFamily: 'vagroundedbt',
    },
    subtitulo: {
        fontSize: 19,
        fontFamily: 'vagroundedbt',
    },

    containerBoton: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 30,
    },
    boton: {
        flex: 1,
        marginHorizontal:20,
        justifyContent: 'center',
		alignItems:'center',
		backgroundColor:'#ce252d',
        borderRadius: 25,
		height: 50,
    	elevation: 4,
    },
    botonText: {
        fontSize:20,
		color:'#ffffff',
        textAlign:'center',
        fontFamily: 'vagroundedbt'
    },

    boton2: {
        flexDirection: 'row',
        alignItems: 'center',
		justifyContent: 'center',
        backgroundColor:'#ce252d',
		borderRadius: 25,
        width: 50,
        height: 50,
    },

    botonText2: {
        fontSize:40,
		color:'#ffffff',
        textAlign:'center',
        fontFamily: 'vagroundedbt',
        marginLeft: 5
    }
});
