/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import global from '../../managers/Global';

const styles = StyleSheet.create({
  IconBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    minWidth: 15,
    height: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF0000',
  },
});

export default class IconBadge extends Component {
    static propTypes = {
        MainElement: PropTypes.element.isRequired,
        BadgeElement: PropTypes.element.isRequired,
        MainViewStyle: PropTypes.object,
        IconBadgeStyle: PropTypes.object,
        Hidden: PropTypes.bool,
    };
    static defaultProps = {
        MainViewStyle: {},
        IconBadgeStyle: {},
        Hidden: true,
    };
    state = {};

    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
    }


    componentDidMount() {
       global.events.addListener('show_badge', () => this.show_badge());
       global.events.addListener('hide_badge', () => this.hide_badge());
    }

    show_badge() {
        this.setState({ 
            show: true,
         });
    }

    hide_badge() {
        this.setState({ 
            show: false,
         });
    }



    render() {
        const {
        MainViewStyle,
        MainElement,
        Hidden,
        IconBadgeStyle,
        BadgeElement,
        } = this.props;
        return (
        <View style={[MainViewStyle || {}]}>
            {MainElement}
            {this.state.show && (
            <View style={[styles.IconBadge, IconBadgeStyle || {}]}>
                {BadgeElement}
            </View>
            )}
        </View>
        );
    }
}