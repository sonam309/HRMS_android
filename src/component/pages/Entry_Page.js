import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Entry_page = (props) => {
    let page = null


    const setEmployee = async () => {
        await AsyncStorage.setItem("type", "employee")
    }
    const setCandidate = async () => {
        await AsyncStorage.setItem("type", "candidate")
    }
    const getType = async () => {
        page = await AsyncStorage.getItem("type")
        {
            page ? (page === 'employee' ? props.navigation.navigate("Employee") : props.navigation.navigate("Candidate")) : null
        }
    }
    useEffect(() => {
        getType()
    }, [])

    return (
        <View style={styles.container}>

            {/* Company Logo */}
            <View style={{ flex: 2 }}>
                <Image source={require('../images/company_logo.jpg')} style={{ marginTop: 30, width: '100%', height: '100%' }} />
            </View>
            {/* Middle Image */}
            <View style={{ flex: 4 }}>
                <Image resizeMode='contain' source={require('../images/Entry_page.png')} style={{ marginTop: 30, width: '100%', height: '100%' }} />
            </View>


            {/* Options */}
            <View style={{ flex: 3, justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => { props.navigation.navigate("Employee"), setEmployee() }} style={[styles.loginButton, styles.elevation, { backgroundColor: '#1157bf' }]}>
                    <Text style={[styles.loginButtonText]}>Employee</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { props.navigation.navigate("Candidate"), setCandidate() }} style={[styles.loginButton, styles.elevation, { backgroundColor: 'red' }]}>
                    <Text style={[styles.loginButtonText]}>Candidate</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        height: '100%',
        width: '100%'
    },
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
    loginButton: {
        marginHorizontal: 25,
        borderRadius: 10,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    loginButtonText: {
        color: 'white'
    }
})


export default Entry_page