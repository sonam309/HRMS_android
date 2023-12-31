import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Attendance from '../../screens/Employee_pages/Attendance';
import DrawerData from '../../data/DrawerData';
import E_Resign from '../../screens/Employee_pages/E_Resign';
import Help_desk from '../../screens/Employee_pages/Help_desk';
import Hiring from '../../screens/Employee_pages/Hiring';
import Holiday_list from '../../screens/Employee_pages/Holiday_list';
import Jobs from '../../screens/Employee_pages/Jobs';
import Onboarding from '../../screens/Employee_pages/Onboarding';
import PaySlip from '../../screens/Employee_pages/PaySlip';
import DashBoard from '../../screens/Employee_pages/Dashboard';
import Pending_Approval from '../../screens/Employee_pages/Pending_Approval';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { user_profile } from '../../assets';
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../redux/authSlice';
import COLORS from '../../constants/theme';
import { FONTS } from '../../constants/font_size';

const EmployeeDrawer = (props) => {
    const Drawer = createDrawerNavigator();
    const dispatch = useDispatch();
    const { navigator } = props;
    const userData = useSelector(state => state.auth)

    const CustomDrawer = (props) => {

        return (
            // #FDEBD0
            <DrawerContentScrollView {...props} >
                <View style={{ backgroundColor: COLORS.lightestGreen }}>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <TouchableOpacity style={{ backgroundColor: COLORS.lightestGreen, color: 'white' }} onPress={() => { navigator('Employee_Login'), dispatch(authActions.logOut()) }}>
                            <Icons name='logout' size={25} style={{ color:COLORS.red, padding: 8 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1, height: 200, justifyContent: 'center', alignItems: 'center', margin: 0 }}>
                        <Image source={user_profile} style={{ height: 80, width: 80, borderRadius: 40 }} />
                        <Text style={{ fontSize: 16, ...FONTS.h3, color: COLORS.orange1, textAlign: 'center' }}>{userData.userName+" ("+userData.userId+")"}</Text>
                        <Text style={{ fontSize: 16, color:COLORS.hyperlinkBlue, ...FONTS.h4 }}>{userData.userEmail}</Text>
                    </View>

                </View>

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', marginHorizontal: 12 }}>
                    {DrawerData.map((item) => <DrawerIcons key={item.id} icon={item.icon} header={item.header} navigator={navigator} />)}
                </View>

            </DrawerContentScrollView>
        )
    }

    function DrawerIcons(props) {
        const header = props.header, icon = props.icon, navigator = props.navigator
        return (
            <TouchableOpacity key={header} style={{ backgroundColor: 'white', elevation: 5, width: '45%', height: 90, alignItems: 'center', marginVertical: 8, borderRadius: 8, justifyContent: 'center', paddingVertical: 4 }} onPress={() => { navigator(`${header}`) }}>
                <Icons name={icon} color={COLORS.green} size={40} style={{ marginVertical: 4 }} />
                <Text style={{ color: COLORS.darkGray2, textAlign: 'center', fontSize: 13 }}>{header}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <Drawer.Navigator initialRouteName='DashBoard' screenOptions={{ drawerStyle: { backgroundColor: COLORS.white } }} drawerContent={() => <CustomDrawer {...props} />}>

            <Drawer.Screen name="DashBoard" component={DashBoard} options={{ headerShown: false }} />
            <Drawer.Screen name="Attendance" component={Attendance} />
            <Drawer.Screen name="Holiday List" component={Holiday_list} />
            <Drawer.Screen name="PaySlip" component={PaySlip} />
            <Drawer.Screen name="Pending Approval" component={Pending_Approval} options={{ headerShown: false }} />
            <Drawer.Screen name="Onboarding" component={Onboarding} />
            <Drawer.Screen name="E-Resign" component={E_Resign} />
            <Drawer.Screen name="Jobs" component={Jobs} />
            <Drawer.Screen name="Hiring" component={Hiring} options={{ headerShown: false }} />
            <Drawer.Screen name="Help Desk" component={Help_desk} />
        </Drawer.Navigator>
    )
}

export default EmployeeDrawer