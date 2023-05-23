import { View, Text } from 'react-native'
import React from 'react'
import Home from './Employee_pages/Home'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Attendance from './Employee_pages/Attendance';
const Drawer = createDrawerNavigator();

const Employee_page = (props) => {
  const { full_name } = props.route.params;
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" options={{title:`Welcome | ${full_name}`, drawerLabel:'Home'}} component={Home} />
      <Drawer.Screen name="Attendance" component={Attendance} />
    </Drawer.Navigator>
  )
}

export default Employee_page