import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React from 'react';
import Attendance from '../../screens/Employee_pages/AttendanceStack/Attendance';
import DashBoard from '../../screens/Employee_pages/DashboardStack/Dashboard';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {user_profile} from '../../assets';
import {useDispatch, useSelector} from 'react-redux';
import {authActions} from '../../redux/authSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Regulization from '../../screens/Employee_pages/AttendanceStack/Regulization';
import Apply_Leave from '../../screens/Employee_pages/AttendanceStack/Apply_Leave';
import {createStackNavigator} from '@react-navigation/stack';
import CreateHiringTab from '../TabNav/CreateHiringTab';
import CreateNewJobOpening from '../../screens/Employee_pages/Hiring_screens/CreateNewJobOpening';
import Job_Description from '../../screens/Employee_pages/Hiring_screens/Job_Description';
import Candidate_details from '../../screens/Employee_pages/Hiring_screens/Candidate_details';
import Candidate_Resume from '../../screens/Employee_pages/Hiring_screens/Candidate_Resume';
import Approval_actions from '../../screens/Employee_pages/PendingApprovalStack/Approval_screens/Approval_actions';
import EmployeeActionsTab from '../TabNav/EmployeeActionsTab';
import Details from '../../screens/Employee_pages/PendingApprovalStack/Approval_screens/Details';
import Description_Job from '../../screens/Employee_pages/PendingApprovalStack/Approval_screens/Description_Job';
import CandidateTestResult from '../../screens/Employee_pages/Hiring_screens/CandidateTestResult';
import {COLORS, FONTS, SIZES, icons} from '../../constants';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function AttendanceStackScreen({navigation}) {
  return (
    <Stack.Navigator initialRouteName={'AttendanceHome'}>
      <Stack.Screen
        name="AttendanceHome"
        component={Attendance}
        headerMode="none"
        options={{
          headerMode: 'none',
          mode: 'none',
        }}
      />
      <Stack.Screen
        name="Regulization"
        component={Regulization}
        headerMode="none"
        options={{
          headerMode: 'none',
          mode: 'none',
        }}
      />
      <Stack.Screen
        name="Leave"
        component={Apply_Leave}
        headerMode="none"
        options={{
          headerMode: 'none',
          mode: 'none',
        }}
      />
    </Stack.Navigator>
  );
}

function HiringStackScreen({navigation}) {
  return (
    <Stack.Navigator initialRouteName="Hiring_page">
      <Stack.Screen
        name="Hiring_page"
        component={CreateHiringTab}
        headerMode="none"
        options={{
          headerMode: 'none',
          mode: 'none',
        }}
      />
      <Stack.Screen
        name="CreateNewJobOpening"
        options={{title: 'Job Opening Request'}}
        component={CreateNewJobOpening}
      />
      <Stack.Screen
        name="Job_Description"
        options={{title: 'Job Description'}}
        component={Job_Description}
      />
      <Stack.Screen
        name="Candidate_details"
        options={{title: 'Candidate Feedback'}}
        component={Candidate_details}
      />
      <Stack.Screen
        name="Candidate_Resume"
        options={{title: 'Candidate Resume'}}
        component={Candidate_Resume}
      />
      <Stack.Screen
        name="CandidateTestResult"
        options={{title: 'Result'}}
        component={CandidateTestResult}
      />
    </Stack.Navigator>
  );
}

function EmployeeApprovalStackScreen({navigation}) {
  return (
    <Stack.Navigator initialRouteName="Approval_actions">
      <Stack.Screen
        name="Approval_actions"
        component={Approval_actions}
        options={{
          headerMode: 'none',
          mode: 'none',
        }}
      />

      <Stack.Screen
        name="EmployeeActionsTab"
        component={EmployeeActionsTab}
        options={{
          headerMode: 'none',
          mode: 'none',
        }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          headerMode: 'none',
          mode: 'none',
        }}
      />
      <Stack.Screen
        name="Job Desc"
        component={Description_Job}
        options={{
          headerMode: 'none',
          mode: 'none',
        }}
      />
    </Stack.Navigator>
  );
}

const EmployeeDrawer = props => {
  const dispatch = useDispatch();
  const {navigator} = props;
  const userData = useSelector(state => state.auth);

  const CustomDrawer = props => {
    return (
      // #FDEBD0
      <View style={{flex: 1}}>
        <DrawerContentScrollView {...props}>
          <View
            style={{
              backgroundColor: COLORS.white,
              borderBottomWidth: 1,
              borderColor: COLORS.lightGray,
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                flex: 1,
                height: 180,
                justifyContent: 'center',
                // alignItems: 'center',
                margin: 0,
              }}>
              <Image
                source={user_profile}
                style={{height: 80, width: 80, borderRadius: 40}}
              />
              <Text
                style={{
                  fontSize: 18,
                  color: COLORS.black,
                  fontWeight: '800',
                  marginTop: 15,
                }}>
                {userData.userName + ' (' + userData.userId + ')'}
              </Text>
              <Text
                style={{
                  color: COLORS.darkGray2,
                  ...FONTS.body4,
                  lineHeight: 14,
                }}>
                {userData.userEmail}
              </Text>
            </View>
          </View>

          <ScrollView
            style={{
              flex: 1,
            }}
            contentContainerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              width: '100%',
              marginTop: SIZES.radius,
            }}>
            <DrawerItemList {...props} />
          </ScrollView>
        </DrawerContentScrollView>

        <View
          style={{
            padding: 10,
            paddingHorizontal: 20,
            borderTopWidth: 1,
            borderTopColor: '#ccc',
          }}>
          <TouchableOpacity
            onPress={() => {
              dispatch(authActions.logOut());
            }}
            style={{paddingVertical: 15}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="exit-outline" size={22} color={'#000'} />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Roboto-Medium',
                  marginLeft: 5,
                  color: '#000',
                }}>
                Sign Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Drawer.Navigator
      backBehavior="history"
      initialRouteName="DashBoard"
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: COLORS.lightGray2,
        drawerInactiveBackgroundColor: COLORS.white,
        drawerActiveTintColor: COLORS.black,
        // drawerInactiveTintColor: COLORS.green,
        // drawerActiveBorderColor: COLORS.white,
        // drawerInactiveBorderColor: COLORS.lightGray,

        drawerLabelStyle: {
          fontSize: 15,
          width: '100%',
        },

        drawerItemStyle: {
          width: 120,
          height: 100,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: SIZES.radius * 1.5,
          marginBottom: SIZES.radius,
          // borderWidth: 1,
          borderRadius: SIZES.radius,
          paddingHorizontal: SIZES.base,
        },
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Dashboard"
        component={DashBoard}
        options={{
          drawerIcon: ({color}) => (
            // <Ionicons name="home-outline" size={28} color={color} />
            <Image
              source={icons.dashboard}
              style={{
                height: 32,
                width: 32,
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Attendance"
        component={AttendanceStackScreen}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={icons.leave}
              style={{
                height: 32,
                width: 32,
              }}
            />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Holiday List"
        component={Holiday_list}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      /> */}
      {/* <Drawer.Screen
        name="PaySlip"
        component={PaySlip}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      /> */}
      <Drawer.Screen
        name="Pending Approval"
        component={EmployeeApprovalStackScreen}
        options={{
          drawerIcon: ({color}) => (
            // <Ionicons name="checkbox-outline" size={28} color={color} />
            <Image
              source={icons.approval}
              style={{
                height: 34,
                width: 34,
              }}
            />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Onboarding"
        component={Onboarding}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      /> */}
      {/* <Drawer.Screen
        name="E-Resign"
        component={E_Resign}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      /> */}
      {/* <Drawer.Screen
        name="Jobs"
        component={Jobs}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}

      /> */}
      <Drawer.Screen
        name="Hiring"
        component={HiringStackScreen}
        options={{
          drawerIcon: ({color}) => (
            // <Ionicons name="people-outline" size={28} color={color} />
            <Image
              source={icons.hiring}
              style={{
                height: 32,
                width: 32,
              }}
            />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="AttendanceStack"
        backBehavior="history"
        component={AttendanceStack}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Help Desk"
        component={Help_desk}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
};

export default EmployeeDrawer;
