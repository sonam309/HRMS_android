import EmployeeDrawer from "../../navigation/DrawerNav/EmployeeDrawer"

const Employee_page = (props) => {

  const navigator = props.navigation.navigate;
  return (
    <EmployeeDrawer navigator={navigator}/>
  )
}

export default Employee_page