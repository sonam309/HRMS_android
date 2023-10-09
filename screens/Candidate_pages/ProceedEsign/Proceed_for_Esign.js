import { View, Text, TouchableOpacity, ScrollView, Linking, Image, BackHandler, Alert, NativeModules, NativeEventEmitter, PermissionsAndroid, ActivityIndicator } from 'react-native'
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
import { API } from '../../../utility/services';
import GetLocation from 'react-native-get-location'
import Loader from '../../../components/Loader';
import axios from 'axios';



const { EsignModule } = NativeModules;
const eventEmitter = new NativeEventEmitter(EsignModule);





const Proceed_for_Esign = (props) => {

    const dispatch = useDispatch()

    const { candidateList, loading, coordinatesList } = useSelector((state) => state.eSign)
    const { candidateId } = useSelector(state => state.candidateAuth)

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
    const [authMode, setAuthMode] = useState('1');
    const [esignStatusCode, setEsignStatusCode] = useState('');
    const [clientId, setClientId] = useState('');
    const [name, setName] = useState('');
    const [moNum, setMoNum] = useState('');
    const [txnID, setTxnID] = useState('');
    const [aadharID, setAadharId] = useState('');
    const [loaderVisible, setLoaderVisible] = useState(false);
    const [latitude, setLatitude] = useState(false);
    const [longitude, setLongitude] = useState(false);



    useEffect(() => {

        // eventEmitter.addListener("EventCount", (eventCount) => {
        //     setCount(eventCount)
        //     console.log("esignResponseData",eventCount);
        // });
        // return () => {
        //     eventEmitter.removeAllListeners();
        // }
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
            setTxnID(candidateList[0]?.TXN_ID);


            if (esignCount === 0) {

                setAadharId(candidateList[0]?.CAN_AADHAR);
                setName(candidateList[0]?.CANDIDATE_NAME);
                setMoNum(candidateList[0]?.CANDIDATE_MOB);

            } else if (esignCount === 1) {

                setName(candidateList[0]?.FIRST_G_NAME);
                setAadharId(candidateList[0]?.FIRST_G_AADHAR);
                setMoNum(candidateList[0]?.CANDIDATE_MOB);

            } else if (esignCount === 2) {

                setName(candidateList[0]?.SECOND_G_NAME);
                setAadharId(candidateList[0]?.SECOND_G_AADHAR);
                setMoNum(candidateList[0]?.CANDIDATE_MOB);
            }



        }
    }


    useEffect(() => {

        getEsignData();
        Geolocation();

    }, [])



    const Geolocation = async () => {



        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        granted === PermissionsAndroid.RESULTS.GRANTED ? (GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 30000,
        })
            .then(location => {
                // console.log(location);
                setLatitude(location.latitude);
                setLongitude(location.longitude);
                console.log("lat,lang", location.latitude, location.longitude)

            })
            .catch(error => { const { code, message } = error; Alert.alert(code, message); })) : (Alert.alert("Location permission not granted"))

    }

    const checkConfigration = () => {

        if (fileName.includes('Appointment')) {
            console.log("first", fileName);
            setLoanType("A");
        } else if (fileName.includes('JoiningKit')) {
            console.log("2nd", fileName);
            setLoanType("J");
        } else {
            console.log("3rd", fileName);

            if (esignCount !== null && esignCount == 0) {
                console.log("4th", esignCount);
                setLoanType("E");
            } else if (esignCount !== null && esignCount === 1) {
                console.log("5th", esignCount);
                setLoanType("F");
            } else if (esignCount !== null && esignCount === 2) {
                console.log("6th", esignCount);
                setLoanType("S");

            } else {
                console.log("7th", esignCount);
                setLoanType("K");
            }



        }

        console.log("first,,,,,,", loanType)

    }

    useEffect(() => {
        if (loanType) {
            console.log("loanType", loanType);
            setDocTypeView(true);
        }
    }, [loanType])



    const getEsignData = async () => {
        const data = {
            user: candidateId,
            flag: 'V'
        }
        dispatch(getCandidateList(data))
    }

    const getEsignDocument = async (clienid) => {



        const data = {
            preUpload: "true",
            clientId: clienid,
            documentName: fileName,
            branchCode: '',
            appNo: '',
            name: name,
            mobNo: moNum,
            docPath: fileName,
            status: '',
            emailAddress: '',
            userId: candidateId,
            memberId: '',
            appFileNo: '',
            authMode: authMode,
            txnId: txnID,
            aadharID: aadharID,
            latitude: latitude,
            longitude: longitude,
            count: '',
            coBorrowerAdhar: '',
            coBorrowerName: '',
            eSignCount: esignCount
        }

        console.log("getdocRequest", data);

        axios.post(`${API}/api/Kyc/GetSignedDocument`, data)
            .then((response) => {
                const returnedData = response;
                console.log("getDocumentResponse", returnedData);

                if (returnedData?.status == "200" || returnedData?.status === "200") {
                    Toast({
                        type: 'success',
                        text: "Esign Done Successfully"
                    })

                    props.navigation.navigate("CandidateDashboard")

                }
                // props.goBack();

            }).catch((error) => {
                console.log("response", JSON.stringify(error))
                // Toast.show({
                //     type: 'error',
                //     text1: error
                // })

            })

    }

    const generateEsignJson = () => {
        let prefillJson = {};

        if (esignCount === 0) {
            prefillJson = {
                full_name: candidateName,
                mobile_number: candidateMobileNo,
            };
        } else if (esignCount === 1) {
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
            userId: candidateId,
            docPath: fileName,
            status: "A",
            eSignCount: esignCount,
            appVersion: "2.5",
            rawData: JSON.stringify({
                "pdf_pre_uploaded": true, "config": {
                    "auth_mode": "1",
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

        setLoaderVisible(true)

        axios.post(`${API}/api/Kyc/ProceedForEsign`, data)
            .then(async (response) => {

                const returnedData = response.data;
                setLoaderVisible(false)
                console.log("proceesEsignResponse", returnedData);
                setTkenRes(returnedData?.data?.token);
                setClientId(returnedData?.data?.client_id);
                var tokenRes = await EsignModule.GetToken(returnedData?.data?.token);


                let esignResponseData = {}

                //get Esign data from nsdl
                eventEmitter.addListener("EventCount", (eventCount) => {
                    setCount(eventCount)

                    // esignResponseData=eventCount;
                    const esignRes = JSON.parse(eventCount);
                    console.log("esignResponseData", esignRes);
                    // console.log("esignResponseData1", esignRes["status_code"]);
                    console.log("esignResponstatus", esignRes.status_code);

                    if (esignRes.status_code == "200" || esignRes.status_code === "200") {


                        getEsignDocument(returnedData?.data?.client_id);

                    } else {


                        Toast.show({
                            type: 'success',
                            text1: esignRes.status_code
                        })
                    }



                });
                return () => {
                    eventEmitter.removeAllListeners();
                }




            }).catch((error) => {
                setLoaderVisible(false)
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
            {loaderVisible ? (<View style={{ alignItems: 'center', marginTop: '30%', }}>
                <ActivityIndicator color={COLORS.orange1} />
                <Text style={{ ...FONTS.h3, fontWeight: '500', color: COLORS.orange1, marginTop: SIZES.base, }}>
                    Loading your details
                </Text>
            </View>
            ) :

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
            }

        </View>
    )
}

export default Proceed_for_Esign