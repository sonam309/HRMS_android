import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

const CustomTextInput = (props) => {
    return (
        <TextInput placeholderTextColor='#a5abb5' style={[styles.inputHolder, styles.elevation]} placeholder={props.placeholder} value={props.value} onChangeText={props.onChangeText} />
    )
}

const styles = StyleSheet.create({
    elevation: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 7
    },
    inputHolder: {
        borderWidth: 1,
        borderColor: 'white',
        flex: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        marginHorizontal: 3,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal:10
    },
})

export default CustomTextInput