import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { TabBar } from 'react-native-tab-view';

export default props => (
    <View style={{ backgroundColor: "#115E54", paddingTop:20, elevation: 4, marginBottom: 6 }}>

        <StatusBar backgroundColor="#114D44" />
        
        <View style={{ height: 50, justifyContent: 'center', alignItems:'center' }}>
            <Text style={{ color: "#fff", fontSize: 20, marginLeft: 20 }}>WhatsApp Clone</Text>
        </View>

        <TabBar {...props} style={{ backgroundColor: "#115E54", elevation: 0 }} />
    </View>
);