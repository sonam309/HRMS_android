import { View, StyleSheet, Text, Modal, ActivityIndicator } from 'react-native'
import React from 'react'

const Loader = (props) => {
    const {loaderVisible} = props
    return (
        <View>
            {loaderVisible ? <View style={{ width: '100%', height: '100%', position: 'absolute', backgroundColor: 'black' }}>
                <Modal transparent={true} animationType='slide' visible={loaderVisible}>
                    <View style={styles.wrapper}>
                            <ActivityIndicator color='#fc5203' size={70} style={{zIndex:1}} />
                    </View>
                </Modal>
            </View > : null}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        opacity:0.5,
        zIndex: -1
    }
})

export default Loader