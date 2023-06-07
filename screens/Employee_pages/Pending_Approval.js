import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Pending_Approval = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, []);

    const renderHeader = () => {
        return (
            <View style={{ flexDirection: 'row', paddingVertical: 18, paddingHorizontal: 12, backgroundColor: "#220046" }}>
                <Pressable onPress={() => navigation.navigate('DashBoard')}>
                    <Ionicons name="arrow-back" size={24} color={"white"} />
                </Pressable>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>Pending Approvals</Text>
                </View>
            </View>
        )
    };

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            {renderHeader()}

            <View style={{ padding: 36, alignItems: 'center' }}>
                <Text style={{ fontSize: 22, fontWeight: "600" }}>
                    Select Action
                </Text>
                <Text>Select one action to proceed</Text>
            </View>

            <View style={styles.mainWrap}>

                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>

                    <LinearGradient colors={['#40b3c2', '#87ecfa']} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={[styles.LinearGradient, styles.elevation]}>

                        <TouchableOpacity onPress={() => navigation.navigate('Attendance_approval', { screen: 'Attendance_approval' })} style={[styles.cardWrap]}>

                            <MaterialCommunityIcons name="calendar" size={60} color={"white"} />

                            <Text style={styles.cardHeading}>Attendance</Text>

                        </TouchableOpacity>

                    </LinearGradient>

                    <LinearGradient colors={['#FFD93D', 'rgb(255, 217, 61)']} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={[styles.LinearGradient,styles.elevation]}>

                        <TouchableOpacity onPress={() => navigation.navigate('Pending Approval', { screen: 'Claim_approval' })} style={[styles.cardWrap]}>

                            <MaterialCommunityIcons name="file-document-outline" size={60} color={"white"} />
                            <Text style={[styles.cardHeading]}>Claim</Text>

                        </TouchableOpacity>

                    </LinearGradient>

                </View>

                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>

                    <LinearGradient colors={['#f56788', '#ffabbe']} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={[styles.LinearGradient, styles.elevation]}>

                        <TouchableOpacity onPress={() => navigation.navigate('Pending Approval', { screen: 'EResign_approval' })} style={[styles.cardWrap]}>

                            <MaterialCommunityIcons name="exit-run" size={60} color={"white"} />

                            <Text style={styles.cardHeading}>E-Resign</Text>

                        </TouchableOpacity>

                    </LinearGradient>

                    <LinearGradient colors={['#8696FE', 'rgb(196, 176, 255)']} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} style={[styles.LinearGradient, styles.elevation]}>

                        <TouchableOpacity onPress={() => navigation.navigate('Pending Approval', { screen: 'Employee_approval', })} style={[styles.cardWrap]}>

                            <FontAwesome name="users" size={60} color={"white"} />

                            <Text style={styles.cardHeading}>Hiring</Text>

                        </TouchableOpacity>

                    </LinearGradient>

                </View>

            </View>
        </View>
    );
};

export default Pending_Approval;

const styles = StyleSheet.create({
    mainWrap: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    elevation: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 7,
    },
    LinearGradient: {
        marginVertical: 12,
        borderRadius: 24,
        width: '40%',
    },
    cardWrap: {
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardHeading: {
        fontSize: 18,
        fontWeight: "600",
        color: "white",
    }
});
