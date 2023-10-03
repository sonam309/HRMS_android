import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FONTS, SIZES } from '../../../constants/font_size'
import COLORS from '../../../constants/theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { API } from '../../../utility/services';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const DocumentTypeBottomView = (props) => {

    const [loaderVisible, setLoaderVisible] = useState(false);
    const [documentName, setDocumentName] = useState('');
    const [numberOfPages, setNumberOfPages] = useState('');

    useEffect(() => {
        getCoordinates();
    }, [])



    const getCoordinates = async () => {

        console.log("loanType", props.loanType)
        const data = { loanType: props.loanType }
        axios.post(`${API
            }/api/saveEsignCordinate`, data).then((response) => {

                const resultData = response.data.Result[0];
                setDocumentName(resultData?.Document_name);
                setNumberOfPages(resultData?.NUMBER_OF_PAGES);

                console.log("coordinates", resultData);

            }).catch((error) => {

                Toast.show({
                    type: 'error',
                    text1: error
                })

            })

    }




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

            <View style={{ justifyContent: 'space-evenly', flexDirection: 'row',marginHorizontal:15,marginTop:20 }}>
                <View>
                    <Text style={{ color: COLORS.gray, ...FONTS.body5 }}>
                        Document Name
                    </Text>
                    <Text style={{ color: COLORS.black, ...FONTS.h4 }}>
                        {documentName}
                    </Text>

                </View>

                <Text style={{ justifyContent: 'center', backgroundColor: COLORS.white, elevation: 4, textAlign: 'center', verticalAlign: 'middle',borderRadius:6,padding:10,color:COLORS.black,...FONTS.h5 }}>
                    {numberOfPages}
                </Text>
            </View>

        </View>
    )
}

export default DocumentTypeBottomView