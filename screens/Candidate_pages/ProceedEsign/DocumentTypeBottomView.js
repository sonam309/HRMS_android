import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FONTS, SIZES } from '../../../constants/font_size'
import COLORS from '../../../constants/theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { API } from '../../../utility/services';
import { useDispatch, useSelector } from 'react-redux';
import { getCoordinates } from '../../../redux/eSignSlice';


const DocumentTypeBottomView = (props) => {

    
    const dispatch = useDispatch()

    const { candidateList, loading, coordinatesList } = useSelector((state) => state.eSign)

    const [loaderVisible, setLoaderVisible] = useState(false);
    const [documentName, setDocumentName] = useState('');
    const [numberOfPages, setNumberOfPages] = useState('');
   

    useEffect(() => {
        // getCoordinates();
        console.log("loanType",props.loanType);
        const data = { loanType: props.loanType }
        dispatch(getCoordinates(data))

    }, [])

   

    return (
        <View>
            <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center', }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Text style={{ ...FONTS.h3, color: COLORS.black }}>Document Type</Text>
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'flex-end' }} onPress={() => props.onPress()}>
                    <Icon name='close-circle-outline' size={30} color={COLORS.orange} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => props.getAxisData()}>
                <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', marginHorizontal: 15, marginTop: 20 }}>
                    <View>
                        <Text style={{ color: COLORS.gray, ...FONTS.body5 }}>
                            Document Name
                        </Text>
                        <Text style={{ color: COLORS.black, ...FONTS.h4 }}>
                            {coordinatesList?.Document_name}
                        </Text>
                    </View>

                    <Text style={{ justifyContent: 'center', backgroundColor: COLORS.white, elevation: 4, textAlign: 'center', verticalAlign: 'middle', borderRadius: 6, padding: 10, color: COLORS.black, ...FONTS.h5 }}>
                        {coordinatesList?.NUMBER_OF_PAGES}
                    </Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}

export default DocumentTypeBottomView