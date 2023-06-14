import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import COLORS from '../../../constants/theme'
// import NewJobOpeningStack from '../../../navigation/StackNav/NewJobOpeningStack'


const New_hiring = (props) => {

    return (
        <ScrollView>
            <TouchableOpacity onPress={()=> props.navigation.navigate("CreateNewJobOpening")} >
                <Text style={styles.ButtonStyle}>Create New Opening</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}


const styles = StyleSheet.create({

    ButtonStyle: {
        textAlign: 'center',
        backgroundColor: COLORS.voilet,
        color: COLORS.white,
        padding: 6,
        marginLeft:60,
        marginRight:60,
        marginTop: 15,
        fontSize: 15,
        borderRadius: 20,
        
    }

})

export default New_hiring

