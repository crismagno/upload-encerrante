import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

export default class Imprimir extends React.Component {

    state = {
        texto: 'Escreva algo'
    }

    mudaNome = texto => {
        this.setState({ texto })
    }

    render() {
        return (
            <View style={styles.viewImprimir}>
                <Text style={styles.text}>{this.state.texto.length % 2 == 0 ? 'Par' : 'Impar'}</Text>
                <Text style={styles.text}>{this.state.texto}</Text>
                <TextInput style={styles.input} onChangeText={this.mudaNome} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewImprimir: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
        height: 50,
        width: 200,
        fontSize: 20,
    },
    text: {
        fontSize: 30,
        color: '#f4b5c2'
    }
})