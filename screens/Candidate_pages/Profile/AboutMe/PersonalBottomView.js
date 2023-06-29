import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'

const PersonalBottomView = () => {
    const [addressHeight, setAddressHeight] = useState(40)
    const [addressHeight1, setAddressHeight1] = useState(40)
    const [pLocationHeight, setPLocationHeight] = useState(40)
    const [cLocationHeight, setCLocationHeight] = useState(40)
    return (
        <ScrollView style={{ height: '100%' }} showsVerticalScrollIndicator={false}>

            <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Salutation</Text>
                    <TextInput style={styles.inputHolder} />
                </View>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>First Name</Text>
                    <TextInput style={styles.inputHolder} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Middle Name</Text>
                    <TextInput style={styles.inputHolder} />
                </View>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Last Name</Text>
                    <TextInput style={styles.inputHolder} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Father Name</Text>
                    <TextInput style={styles.inputHolder} />
                </View>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Category</Text>
                    <TextInput style={styles.inputHolder} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Actual Date of Birth</Text>
                    <TextInput style={styles.inputHolder} />
                </View>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Record Date of Birth</Text>
                    <TextInput style={styles.inputHolder} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Country of Birth</Text>
                    <TextInput style={styles.inputHolder} />
                </View>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Place of Birth</Text>
                    <TextInput style={styles.inputHolder} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Identification Marks</Text>
                    <TextInput style={styles.inputHolder} />
                </View>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Gender</Text>
                    <TextInput style={styles.inputHolder} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Marital Status</Text>
                    <TextInput style={styles.inputHolder} />
                </View>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Date of Marriage</Text>
                    <TextInput style={styles.inputHolder} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
                <View style={{ width: '100%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Blood Group</Text>
                    <TextInput style={styles.inputHolder} />
                </View>
            </View>

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Preferred Location</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7, height: pLocationHeight }]} multiline={true} onContentSizeChange={event => { setPLocationHeight(event.nativeEvent.contentSize.height) }} />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Current Location</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7, height: cLocationHeight }]} multiline={true} onContentSizeChange={event => { setCLocationHeight(event.nativeEvent.contentSize.height) }} />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Resume Source</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />

            <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Ref Email ID</Text>
                    <TextInput style={styles.inputHolder} />
                </View>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Reference Contact No.</Text>
                    <TextInput style={styles.inputHolder} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Reference Name</Text>
                    <TextInput style={styles.inputHolder} />
                </View>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Reference Occupation</Text>
                    <TextInput style={styles.inputHolder} />
                </View>
            </View>

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Reference Address</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7, height: addressHeight }]} multiline={true} onContentSizeChange={event => { setAddressHeight(event.nativeEvent.contentSize.height) }} />



            <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Ref Email ID 1</Text>
                    <TextInput style={styles.inputHolder} />
                </View>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Reference Contact No.1</Text>
                    <TextInput style={styles.inputHolder} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Reference Name 1</Text>
                    <TextInput style={styles.inputHolder} />
                </View>
                <View style={{ width: '48%', paddingHorizontal: 2 }}>
                    <Text style={{ color: 'green' }}>Reference Occupation 1</Text>
                    <TextInput style={styles.inputHolder} />
                </View>
            </View>
            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Reference Address 1</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7, height: addressHeight1 }]} multiline={true} onContentSizeChange={event => { setAddressHeight1(event.nativeEvent.contentSize.height) }} />

            <View style={{ paddingBottom: 320 }}></View>

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    inputHolder: {
        borderWidth: 1, height: 40, borderColor: 'black', borderRadius: 12
    },
})

export default PersonalBottomView