import React from 'react';
import { Text ,View} from 'react-native';
import COLORS from '../../constants/theme';


const Apply_Leave=()=>{


    return(
        <View>
            <Text style={{backgroundColor: COLORS.voilet, color:'white',fontSize:18,height:50,textAlign:'center',marginTop:0.5,verticalAlign:'middle',fontWeight:'500'}}>
                Apply leave 
            </Text>
        </View>
    )

}

export default Apply_Leave