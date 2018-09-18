import React, { Component } from 'react';
import { View, Text, StatusBar, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { voltarCena, abrirAddContato } from '../actions/AppActions'

const addCONTATO = require('../imgs/addcontact.png')

class TabBarMenu extends Component {

    toqueBtnAdd(){
        this.props.abrirAddContato()
        Actions.adicionarContato({ onBack: () => this.voltar() })
    }
    voltar() {
        this.props.voltarCena() //setar os valores da pag de add contato para default (msg erro, cor da view de erro..)
        Actions.pop()
    }

    render() {
        return (
            <View style={styles.main_view}>

                <StatusBar backgroundColor="#114D44" />

                <View style={styles.navbarView}>
                    <View style={{ height: 50, justifyContent: 'center' }}>
                        <Text style={{ color: "#fff", fontSize: 20, marginLeft: 20 }}>WhatsApp Clone</Text>
                    </View>

                    <View style={styles.rightElements}>
                        <View style={styles.botaoAddView}>
                            <TouchableOpacity
                                onPress={() => this.toqueBtnAdd()}>
                                <Image source={addCONTATO} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.txtLogout}>Sair</Text>
                        </View>
                    </View>
                </View>

                <TabBar {...this.props} style={{ backgroundColor: "#115E54", elevation: 0 }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_view: {
        backgroundColor: "#115E54",
        paddingTop: 20,
        elevation: 0,
        marginBottom: 6
    },
    navbarView: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    rightElements: {
        marginRight: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    botaoAddView: {
        width: 50
    },
    txtLogout: {
        fontSize: 20,
        color: '#FFF'
    }
});

const mapStateToProps = state => (
    {
    }
)

export default connect(mapStateToProps, {voltarCena, abrirAddContato})(TabBarMenu)
