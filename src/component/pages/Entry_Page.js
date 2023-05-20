import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React,{useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Entry_page = (props) => {
    let page = null

    
    const setEmployee = async () => {
       await AsyncStorage.setItem("type", "employee")
    }
    const setCandidate = async () => {
       await AsyncStorage.setItem("type", "candidate")
    }
    const getType = async () =>{
        page = await AsyncStorage.getItem("type")
        // console.warn(page);
        {
            page?(page==='employee'?props.navigation.navigate("Employee"):props.navigation.navigate("Candidate")):null
        }
    }
    useEffect(() => {
     getType()
    }, [])
    
    return (
        <View style={styles.container}>

            {/* Company Logo */}
            <Image source={require('../images/company_logo.jpg')} style={{ marginTop: 30, width: '100%', height: 120 }} />
            {/* Middle Image */}
            <Image source={require('../images/Entry_page.png')} style={{ marginTop: 30, width: '100%', height: 250 }} />

            {/* Options */}
            <TouchableOpacity style={styles.loginButton}>
                <Text onPress={() => { props.navigation.navigate("Employee"), setEmployee() }} style={[styles.loginButtonText, { backgroundColor: '#1157bf' }]}>Employee</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton}>
                <Text onPress={() => { props.navigation.navigate("Candidate"), setCandidate() }} style={[styles.loginButtonText, { backgroundColor: 'red' }]}>Candidate</Text>
            </TouchableOpacity>

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
    loginButton: {
        marginLeft: 25,
        marginRight: 25
    },
    loginButtonText: {
        marginTop: 15,
        borderRadius: 10,
        height: 50,
        textAlignVertical: 'center',
        textAlign: 'center',
        color: 'white'
    }
})


export default Entry_page