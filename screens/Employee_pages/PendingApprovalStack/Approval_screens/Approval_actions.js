import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { DrawerActions } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { COLORS } from '../../../../constants';

const Approval_actions = ({ navigation }) => {

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <SafeAreaView style={{ height: 50, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={{ paddingHorizontal: 14 }} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <MaterialCommunityIcons name='reorder-horizontal' color="black" size={25} />
                </TouchableOpacity>
                <Text style={{ color: COLORS.black, fontSize: 18 }}>Approval</Text>
            </SafeAreaView>


            <View style={styles.mainWrap}>
                {/* <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
                    <LinearGradient colors={['#40b3c2', '#87ecfa']} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={[styles.LinearGradient, styles.elevation]}>

                        <TouchableOpacity onPress={() => Toast.show({
                            type: 'success',
                            text1: 'Work on Progress'
                        })} style={[styles.cardWrap]}>
                            <MaterialCommunityIcons name="calendar" size={60} color={COLORS.white} />
                            <Text style={styles.cardHeading}>Attendance</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient colors={['#FFD93D', 'rgb(255, 217, 61)']} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={[styles.LinearGradient, styles.elevation]}>

                        <TouchableOpacity onPress={() => Toast.show({
                            type: 'success',
                            text1: 'Work on Progress'
                        })} style={[styles.cardWrap]}>
                            <MaterialCommunityIcons name="file-document-outline" size={60} color={COLORS.white} />
                            <Text style={[styles.cardHeading]}>Claim</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View> */}
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
                    {/* <LinearGradient colors={['#f56788', '#ffabbe']} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={[styles.LinearGradient, styles.elevation]}>

                        <TouchableOpacity onPress={() => Toast.show({
                            type: 'success',
                            text1: 'Work on Progress'
                        })} style={[styles.cardWrap]}>
                            <MaterialCommunityIcons name="exit-run" size={60} color={COLORS.white} />
                            <Text style={styles.cardHeading}>E-Resign</Text>
                        </TouchableOpacity>
                    </LinearGradient> */}
                    <LinearGradient colors={['#8696FE', 'rgb(196, 176, 255)']} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} style={[styles.LinearGradient, styles.elevation]}>
                        <TouchableOpacity onPress={() => navigation.navigate('EmployeeActionsTab', { flag: 'H' })} style={[styles.cardWrap]}>
                            <FontAwesome name="users" size={60} color={COLORS.white} />
                            <Text style={styles.cardHeading}>Hiring</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        </View>
    );
};

export default Approval_actions;

const styles = StyleSheet.create({
    mainWrap: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 150,
        // justifyContent: 'center',
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
