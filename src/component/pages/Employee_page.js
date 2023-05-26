import React from 'react'
import { TouchableOpacity, View, Text, Image } from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import Home from './Employee_pages/Home'
import Attendance from './Employee_pages/Attendance';
import DrawerData from './Employee_pages/DrawerData';
import Holiday_list from './Employee_pages/Holiday_list';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import PaySlip from './Employee_pages/PaySlip';
import Onboarding from './Employee_pages/Onboarding';
import E_Resign from './Employee_pages/E_Resign';
import Jobs from './Employee_pages/Jobs';
import Hiring from './Employee_pages/Hiring';
import Help_desk from './Employee_pages/Help_desk';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icons from 'react-native-vector-icons/SimpleLineIcons'
import user_profile from '../images/user.png'

const Employee_page = (props) => {
  const Drawer = createDrawerNavigator();
  const { full_name, userName } = props.route.params;
  const navigator = props.navigation.navigate;

  function CustomDrawer(props) {
    return (
      <DrawerContentScrollView {...props} >
        <SafeAreaView style={{ backgroundColor: 'blue'}} >
          <Icons name='logout' size={20} style={{position:'absolute', right:10, top:10, color:'white'}} onPress={() => { navigator("Employee") }}/>

          <View style={{ flex: 1, height: 200, justifyContent: 'center', alignItems: 'center', margin: 0 }}>
            <Image source={user_profile} style={{ height: 80, width: 80, borderRadius: 40 }} />
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white', marginVertical: 6, textAlign:'center' }}>{full_name}</Text>
            <Text style={{ fontSize: 16, color: 'white' }}>Product Manager</Text>
          </View>

        </SafeAreaView>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', marginHorizontal: 12 }}>
          {DrawerData.map((item) => <DrawerIcons icon={item.icon} header={item.header} navigator={navigator} />)}

        </View>

      </DrawerContentScrollView>
    )
  }

  function DrawerIcons(props) {
    const header = props.header, icon = props.icon, navigator = props.navigator
    return (
      <TouchableOpacity key={header} style={{ backgroundColor: 'white', width: '45%', height: 90, alignItems: 'center', marginVertical: 8, borderRadius: 8, justifyContent: 'center', paddingVertical: 4 }} onPress={() => { navigator(`${header}`) }}>
        <Icon name={icon} color='blue' size={40} style={{ marginVertical: 4 }} />
        <Text style={{ color: 'black' }}>{header}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <Drawer.Navigator screenOptions={{ drawerStyle: { backgroundColor: '#c6cbef' } }} drawerContent={() => <CustomDrawer {...props} />}>

      <Drawer.Screen name="DashBoard" component={Home} options={{ title: `Welcome | ${full_name}` }} initialParams={{ userName: userName }} />
      <Drawer.Screen name="Attendance" component={Attendance} />
      <Drawer.Screen name="Holiday List" component={Holiday_list} />
      <Drawer.Screen name="PaySlip" component={PaySlip} />
      <Drawer.Screen name="Onboarding" component={Onboarding} />
      <Drawer.Screen name="E-Resign" component={E_Resign} />
      <Drawer.Screen name="Jobs" component={Jobs} />
      <Drawer.Screen name="Hiring" component={Hiring} />
      <Drawer.Screen name="Help Desk" component={Help_desk} />
    </Drawer.Navigator>
  )
}

export default Employee_page