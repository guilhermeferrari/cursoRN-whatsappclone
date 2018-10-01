import React, { Component } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { TabViewAnimated, SceneMap } from 'react-native-tab-view';
import { connect } from 'react-redux'

import TabBarMenu from './TabBarMenu';
import Conversas from './Conversas';
import Contatos from './Contatos';
import { autenticarUsuario } from '../actions/AutenticacaoActions';
import { COLOR_HTML_P, COLOR_HTML_S } from './FormLogin';
class Principal extends Component {

    state = {
        index: 0,
        routes: [
            { key: '1', title: 'Conversas' },
            { key: '2', title: 'Contatos' }
        ],
    };

    _handleChangeTab = index => this.setState({ index });

    _renderHeader = props => <TabBarMenu {...props} />;

    _renderScene = SceneMap({
        '1': Conversas,
        '2': Contatos
    });

    render() {
        return (
            <TabViewAnimated
                style={styles.container}
                navigationState={this.state}
                renderScene={this._renderScene}
                renderHeader={this._renderHeader}
                onRequestChangeTab={this._handleChangeTab} />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default connect(null, { autenticarUsuario })(Principal)
