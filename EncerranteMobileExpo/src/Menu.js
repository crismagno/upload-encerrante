import React from "react";
import { createDrawerNavigator } from "react-navigation";

import ParImpar from './components/ParImpar'
import Imprimir from './components/Imprimir'

export default createDrawerNavigator({
    ParImpar: {
        screen: () => <ParImpar numero={Math.floor(Math.random() * 10 - 1)} />,
        navigationOptions: {title: 'Par & Impar' }
    },

    Imprimir: {
        screen: Imprimir
    }
}, {drawerWidth: 200})