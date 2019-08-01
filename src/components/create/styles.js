import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  dialog: {
    flex: 1,
    //alignItems: 'center'
  },
  dialogOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  dialogContent: {
    elevation: 5,
    marginTop: 150,
    width: 300,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    overflow: 'hidden'
  },
  dialogTitle: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  dialogTitleText: {
    fontSize: 18,
    fontWeight: '600'
  },
  dialogBody: {
    paddingHorizontal: 10
  },
  dialogInput: {
    height: 50,
    fontSize: 18
  },
  dialogFooter: {
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  dialogAction: {
    flex: 1,
    padding: 15
  },
  dialogActionText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#006dbf'
  },




  container : {
		flex: 1,
    paddingTop: 80,
		//backgroundColor:'#ffffff'
	},
  places : {
		flex: 1,
    //paddingVertical: 100,
    paddingHorizontal:20,
    borderRadius: 10,
		backgroundColor:'#ffffff'
	},

  scroll : {
		flex: 1,
		//backgroundColor:'#ffffff'
	},
  botonContainer: {
		flex:1,
		paddingHorizontal:20,
		paddingVertical: 20
  },
  buttonEntrar: {
		flexDirection: 'row',
		justifyContent: 'center',
		backgroundColor:'#f68d2c',
		borderRadius: 50,
		paddingVertical: 6,
		marginVertical: 5,
		//width:200
	},
	buttonTextEnter: {
		fontSize:18,
		fontFamily: 'bauhausregular',
		color:'#ffffff',
		textAlign:'center'
	},


  sports: {
        paddingHorizontal:40,
        marginTop: 20,
    },
});
