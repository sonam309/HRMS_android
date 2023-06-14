import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import New_hiring from '../../screens/Employee_pages/Hiring_screens/New_hiring';
import Interview_status from '../../screens/Employee_pages/Hiring_screens/Interview_status';
import COLORS from '../../constants/theme';

const Tab = createMaterialTopTabNavigator();

const CreateHiringTab=(props)=>{

    return (
        <Tab.Navigator initialRouteName='New_hiring'
        screenOptions={{
            tabBarActiveTintColor: COLORS.white,
            tabBarIndicatorStyle:{backgroundColor:COLORS.voilet,width:'50%',height:'100%'}, // styling of selected indicator
            tabBarIndicatorContainerStyle:{backgroundColor:COLORS.voilet,opacity:0.8},
            tabBarAndroidRipple:{borderless:false}, // ripple effect on pressing the button
          }}>
            <Tab.Screen name="New_hiring" component={New_hiring}  options={{ tabBarLabel: 'Job Openings'}}/>
            <Tab.Screen name="Interview_status" component={Interview_status}  options={{ tabBarLabel: 'Interviews'}}
             />
        </Tab.Navigator>
    )

}

export default CreateHiringTab