import React from 'react'
import { Text, View, StyleSheet, TextInput, } from "react-native"

export default props => {
    let valor = 0

    return (
        <View style={styles.viewParImpar}>
            <Text style={{color: 'green', fontSize: 20 }} >{valor % 2 == 0 ? 'Par' : 'Impar'}</Text>
            <TextInput  style={styles.input} onChange={(e) => valor = e}/>
        </View>
    )
}


const styles = StyleSheet.create({
    viewParImpar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    input: {
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightColor: 'black',
        borderLeftColor: 'black',
        borderTopColor: 'black',
        borderBottomColor: 'black',
        
    }
})