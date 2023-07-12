import { StyleSheet } from 'react-native'
import COLORS from '../constants/theme'

//Text style  Bold
export default TextBold = StyleSheet.create({
    BoldText: {
        color: COLORS.orange1,
        fontSize: 25,
        marginTop: 10, 
        marginBottom:10, 
        fontWeight:500,  
        textAlign: 'center',
    }
})


