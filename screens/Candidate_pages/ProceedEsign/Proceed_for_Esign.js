import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FONTS, SIZES } from '../../../constants/font_size';
import COLORS from '../../../constants/theme';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomInput from '../../../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { getCandidateList } from '../../../redux/eSignSlice';

const Proceed_for_Esign = (props) => {

    const dispatch = useDispatch()

  const { candidateList, loading } = useSelector((state) => state.eSign)


    const [isMobileOtp, setIsMobileOtp] = useState(false);
    const [isBiometric, setIsBiometric] = useState(false);
    const [candidateName, setCandidateName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [candidateMobileNo, setCandidateMobileNo] = useState('');
    const [candidateAddress, setCandidateAddress] = useState('');
    const [IstGuarantorName, setIstGuarantorName] = useState('');
    const [IstGuarantorRelation, setIstGuarantorRelation] = useState('');
    const [IIndGuarantorName, setIIndGuarantorName] = useState('');
    const [IIndGuaran, setIIndGuarantorRelationtorRelation] = useState('');

    useEffect(() => {
     setPredefinedData()
    }, [candidateList])

    const setPredefinedData = () => {
        if(candidateList.size>0){

            
        }
    }
    

    useEffect(() => {

        getEsignData();
    
      }, [])


      const getEsignData = async () => {
        const data = {
          user: 'TMP2140',
          flag: 'V'
        }
        dispatch(getCandidateList(data))
      }


    return (
        <View>
            {/* Top headerView */}
            <View style={{ width: '100%', flexDirection: 'row', elevation: 6, backgroundColor: COLORS.white, padding: 15 }}>
                <TouchableOpacity onPress={() => props.navigation.goBack()} >
                    <Icons name="arrow-left" size={28} color={COLORS.black} style={{ alignSelf: 'center', }} verticalAlign={'center'} />
                </TouchableOpacity>
                <Text style={{ ...FONTS.body3, fontSize: 17, color: COLORS.black, verticalAlign: 'middle', marginLeft: 20 }}>Esign</Text>
            </View>

            <View>

                {/* radio button group */}
                <View style={{ flexDirection: 'row', paddingLeft: 15, paddingRight: 15, paddingTop: 15, width: '100%' }}>

                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                        <TouchableOpacity disabled onPress={() => setIsMobileOtp(isMobileOtp === "true" ? "false" : "true")}
                            style={{ alignItems: "center", padding: SIZES.base, flexDirection: "row", justifyContent: "space-between", }}>
                            {isMobileOtp === "true" ? <Icons name='radiobox-marked' size={25} color={COLORS.orange} /> : <Icons name='checkbox-blank-circle-outline' size={25} color={COLORS.orange} />}
                            <Text style={{ color: COLORS.green, ...FONTS.body4, textAlign: 'center', marginLeft: 5 }}>Mobile OTP</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                        <TouchableOpacity onPress={() => setIsBiometric(isBiometric === "true" ? "false" : "true")}
                            style={{ alignItems: "center", padding: SIZES.base, flexDirection: "row", justifyContent: "space-between", }}>
                            {isBiometric === "true" ? <Icons name='radiobox-marked' size={25} color={COLORS.orange} /> : <Icons name='checkbox-blank-circle-outline' size={25} color={COLORS.orange} />}
                            <Text style={{ color: COLORS.green, ...FONTS.body4, textAlign: 'center', marginLeft: 5 }}>Biometric</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>

                    <View style={{ width: '45%' }}>


                        <CustomInput
                            caption={'Candidate Name'}
                        />
                        <CustomInput
                            caption={'Candidate Mobile No.'}
                        />
                        <CustomInput
                            caption={'1st Guarantor Name'}
                        />

                        <CustomInput
                            caption={'2nd Guarantor Name'}
                        />

                    </View>

                    <View style={{ width: '45%' }}>


                        <CustomInput
                            caption={'Job Title'}
                        />
                        <CustomInput
                            caption={'Candidate Address'}
                        />
                        <CustomInput
                            caption={'1st Guarantor Relation'}
                        />

                        <CustomInput
                            caption={'2nd Guarantor Relation'}
                        />

                    </View>


                </View>


            </View>


        </View>
    )
}

export default Proceed_for_Esign