import { View, Text, TouchableOpacity, ScrollView, Linking, Image, BackHandler, Alert, NativeModules, NativeEventEmitter } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FONTS, SIZES } from '../../../constants/font_size';
import COLORS from '../../../constants/theme';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomInput from '../../../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { getCandidateList } from '../../../redux/eSignSlice';
import Toast from 'react-native-toast-message';
import BottomUpModal from '../../../components/BottomUpModal';
import DocumentTypeBottomView from './DocumentTypeBottomView';
import LinearGradient from 'react-native-linear-gradient'
import axios from 'axios';
import { API } from '../../../utility/services';
const { EsignModule } = NativeModules;
const eventEmitter = new NativeEventEmitter(EsignModule);





const Proceed_for_Esign = (props) => {

    const dispatch = useDispatch()

    const { candidateList, loading, coordinatesList } = useSelector((state) => state.eSign)


    const [isMobileOtp, setIsMobileOtp] = useState(false);
    const [isBiometric, setIsBiometric] = useState(true);
    const [candidateName, setCandidateName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [candidateMobileNo, setCandidateMobileNo] = useState('');
    const [candidateAddress, setCandidateAddress] = useState('');
    const [IstGuarantorName, setIstGuarantorName] = useState('');
    const [IstGuarantorRelation, setIstGuarantorRelation] = useState('');
    const [IIndGuarantorName, setIIndGuarantorName] = useState('');
    const [IIndGuarantorRelationtorRelation, setIIndGuarantorRelationtorRelation] = useState('');
    const [documentTypeView, setDocumentTypeView] = useState(false);
    const [docTypeView, setDocTypeView] = useState(false);
    const [fileName, setFileName] = useState('');
    const [loanType, setLoanType] = useState('');
    const [esignCount, setEsignCount] = useState('');
    const [XYAXIS, setXYAXIS] = useState('');
    const [documentName, setDocumentName] = useState('');
    const [numberOfPages, setNumberOfPages] = useState('');

    const [error, setError] = useState(false)
    const [tkenRes, setTkenRes] = useState();
    const [input, setInput] = useState("");
    const [count, setCount] = useState("");
    const [authMode, setAuthMode] = useState('2');


    useEffect(() => {

        eventEmitter.addListener("EventCount", (eventCount) => {
            setCount(eventCount)
        });
        return () => {
            eventEmitter.removeAllListeners();
        }
    }, [])



    useEffect(() => {
        setPredefinedData()
    }, [candidateList])

    const setPredefinedData = () => {
        console.log("candidateList", candidateList);

        if (candidateList.length > 0) {

            console.log("candidateName", candidateList[0]?.CANDIDATE_NAME)
            setCandidateName(candidateList[0]?.CANDIDATE_NAME);
            setJobTitle(candidateList[0]?.POST);
            setCandidateMobileNo(candidateList[0]?.CANDIDATE_MOB);
            setCandidateAddress(candidateList[0]?.CANDIDATE_ADD);
            setIstGuarantorRelation(candidateList[0]?.FIRST_G_RELATION);
            setIIndGuarantorName(candidateList[0]?.SECOND_G_NAME);
            setIstGuarantorName(candidateList[0]?.FIRST_G_NAME);
            setIIndGuarantorRelationtorRelation(candidateList[0]?.SECOND_G_RELATION);
            setFileName(candidateList[0]?.FILE_NAME);
            setEsignCount(candidateList[0]?.ESSIGN_CNT);


            // if (candidateList[0]?.ESSIGN_CNT !== null && candidateList[0]?.ESSIGN_CNT >= 0) {

            //     setIstGuarantorName(candidateList[0]?.FIRST_G_NAME);

            // } else if (candidateList[0]?.ESSIGN_CNT != null && candidateList[0]?.ESSIGN_CNT > 0 && candidateList[0]?.ESSIGN_CNT < 2) {

            //     setIstGuarantorName(candidateList[0]?.SECOND_G_SO)

            // }

        }
    }


    useEffect(() => {

        getEsignData();

    }, [])


    const checkConfigration = () => {

        if (fileName.includes('Appointment')) {
            setLoanType("A");
        } else if (fileName.includes('JoiningKit')) {
            setLoanType("J");
        } else {

            if (esignCount !== null && esignCount == 0) {
                setLoanType("E");
            } else if (esignCount !== null && esignCount > 0 && esignCount < 2) {

                setLoanType("F");
            } else if (esignCount !== null && esignCount == 2) {

                setLoanType("S");

            } else {
                setLoanType("K");
            }

            if (loanType) {

                setDocTypeView(true);
            }

        }


    }

    const getEsignData = async () => {
        const data = {
            user: 'TMP2140',
            flag: 'V'
        }
        dispatch(getCandidateList(data))
    }


    const generateEsignJson = () => {
        let prefillJson = {};

        if (esignCount === 0) {
            prefillJson = {
                full_name: candidateName,
                mobile_number: candidateMobileNo,
            };
        } else if (esignCount < 2) {
            prefillJson = {
                full_name: IstGuarantorName,
                mobile_number: candidateMobileNo,
            };
        } else if (esignCount === 2) {
            prefillJson = {
                full_name: IIndGuarantorName,
                mobile_number: candidateMobileNo,
            };
        }

        prefillJson.user_email = 'systemadministrator@satyamicrocapital.com';


        return prefillJson;
    }



    const EsignEvent = async () => {

        if (isMobileOtp) {
            setAuthMode('1');
        } else if (isBiometric) {
            setAuthMode('2');
        } else {
            setAuthMode('');
        }

        const data = {
            documentName: documentName,
            noOfPages: numberOfPages,
            userId: "TMP2140",
            docPath: fileName,
            status: "A",
            eSignCount: esignCount,
            appVersion: "2.5",
            rawData: JSON.stringify({
                "pdf_pre_uploaded": true, "config": {
                    "auth_mode": authMode,
                    "reason": documentName,
                    "positions": JSON.parse(XYAXIS),
                    "skip_email": true,
                    "name_match": {
                        "match": true,
                        "score": 55
                    }
                },
                "prefill_options": generateEsignJson()
            })
        }

        console.log("esignProddatatatattat", data);

        axios.post(`${API}/api/Kyc/ProceedForEsign`, data)
            .then(async (response) => {

                const returnedData = response.data;
                console.log("proceesEsignResponse",returnedData);
                setTkenRes(returnedData?.data?.token);
                var tokenRes = await EsignModule.GetToken(returnedData?.data?.token);

            }).catch((error) => {
                Alert.alert('Alert Title', error, [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);

            })
    }

    const getAxisData = () => {

        console.log("getCoordinateDat", coordinatesList.XYAXIS);
        setXYAXIS(coordinatesList?.XYAXIS);
        setDocumentName(coordinatesList?.Document_name);
        setNumberOfPages(coordinatesList?.NUMBER_OF_PAGES);
        setDocTypeView(false);
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
                            {isBiometric === "true" ? <Icons name='radiobox-marked' size={25} color={COLORS.orange} /> :
                                //  <Icons name='checkbox-blank-circle-outline' size={25} color={COLORS.orange} />
                                <Icons name='radiobox-marked' size={25} color={COLORS.orange} />}
                            <Text style={{ color: COLORS.green, ...FONTS.body4, textAlign: 'center', marginLeft: 5 }}>Biometric</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                {/* candidate information view */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                    <View style={{ width: '45%' }}>
                        <CustomInput
                            caption={'Candidate Name'}
                            value={candidateName}
                            onChangeText={setCandidateName}
                        />
                        <CustomInput
                            caption={'Candidate Mobile No.'}
                            value={candidateMobileNo}
                            onChangeText={setCandidateMobileNo}
                        />
                        <CustomInput
                            caption={'1st Guarantor Name'}
                            value={IstGuarantorName}
                            onChangeText={setIstGuarantorName}
                        />

                        <CustomInput
                            caption={'2nd Guarantor Name'}
                            value={IIndGuarantorName}
                            onChangeText={setIIndGuarantorName}
                        />
                    </View>
                    <View style={{ width: '45%' }}>
                        <CustomInput
                            caption={'Job Title'}
                            value={jobTitle}
                            onChangeText={setJobTitle}
                        />
                        <CustomInput
                            caption={'Candidate Address'}
                            value={candidateAddress}
                            onChangeText={setCandidateAddress}
                        />
                        <CustomInput
                            caption={'1st Guarantor Relation'}
                            value={IstGuarantorRelation}
                            onChangeText={setIstGuarantorRelation}
                        />
                        <CustomInput
                            caption={'2nd Guarantor Relation'}
                            value={IIndGuarantorRelationtorRelation}
                            onChangeText={setIIndGuarantorRelationtorRelation}

                        />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginTop: 20 }}>
                    <View>
                        <Text style={{ color: COLORS.gray, fontSize: 11 }}>
                            Document Type
                        </Text>
                        <Text style={{ color: COLORS.black, ...FONTS.h4 }}>
                            Select Configure
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => checkConfigration()}>
                        <View style={{
                            flexDirection: 'row', backgroundColor: COLORS.white, borderRadius: 6, marginLeft: 120,
                            borderColor: COLORS.lightGray, borderWidth: 0.5, height: 40, width: 140, alignItems: 'center',
                        }}>
                            <Icons name='cogs' size={25} color={COLORS.orange} style={{ margin: 6, transform: [{ rotateY: '180deg' }] }} />
                            <Text style={{ ...FONTS.h4, color: COLORS.black, }}>
                                Configration
                            </Text>

                        </View>

                    </TouchableOpacity>
                    {

                        docTypeView && (
                            <BottomUpModal isVisible={docTypeView} onClose={() => { setDocTypeView(false); }}>
                                {<DocumentTypeBottomView loanType={loanType} getAxisData={getAxisData} onPress={() => setDocTypeView(false)} />}
                            </BottomUpModal>
                        )
                    }

                </View>

                {/* submit button */}
                <View style={{
                    paddingLeft: 20,
                    paddingRight: 20,
                    marginTop: 150,
                }}>

                    <TouchableOpacity disabled={XYAXIS !== '' && XYAXIS != null ? false : true}
                        onPress={() => [EsignEvent()]}>
                        <LinearGradient
                            colors={[COLORS.orange1, COLORS.disableOrange1]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 2, y: 0 }}
                            style={{ borderRadius: 8, padding: 10, marginTop: 20 }} >
                            <Text style={{ color: COLORS.white, textAlign: 'center', ...FONTS.body3, }}>
                                Submit
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                </View>


            </View>


        </View>
    )
}

export default Proceed_for_Esign