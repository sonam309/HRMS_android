import React,{ useEffect} from 'react';
import { Text ,View, BackHandler} from 'react-native';
import COLORS from '../../../constants/theme';


const Apply_Leave=({navigation})=>{

    // useEffect(() => {
    //     // for handling back button in android
    
    //     const backAction = () => {
    //       if (navigation.isFocused()) {
    //         navigation.goBack()
    //       }
    //     };
    
    //     const backPressHandler = BackHandler.addEventListener(
    //       'hardwareBackPress',
    //       backAction,
    //     );
    //     return () => {
    //       backPressHandler.remove();
    //     };
    //   }, []);
    return(
        <View>
            <Text style={{backgroundColor: COLORS.voilet, color:'white',fontSize:18,height:50,textAlign:'center',marginTop:0.5,verticalAlign:'middle',fontWeight:'500'}}>
                Apply leave 
            </Text>
        </View>
    )

}

export default Apply_Leave