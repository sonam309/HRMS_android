import React, { useContext, useEffect, useState } from 'react'
import COLORS from '../../constants/theme'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { View, Text, TouchableOpacity, ScrollView, Linking, Image, BackHandler, Alert, NativeModules, NativeEventEmitter } from 'react-native'
import { FONTS, SIZES } from '../../constants/font_size';
import LinearGradient from 'react-native-linear-gradient';
import { EsignD, circleFill, circleGreen, circleTranceparent, company_logo_2, esignIcon, esignViewIcon, expernallinkImage, test } from '../../assets';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { useSelector, useDispatch } from 'react-redux';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { candidateAuthActions } from '../../redux/candidateAuthSlice';
import Loader from '../../components/Loader';
import PieChart from 'react-native-pie-chart';
import { API, API2 } from '../../utility/services';
import Toast from 'react-native-toast-message';
import CustomAlert from '../../components/CustomAlert/index';
import axios from 'axios';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { WebView } from 'react-native-webview';


const CandidateDashboard = (props) => {
    const dispatch = useDispatch();
    const current_Status = useSelector(state => state.candidateAuth.candidateStatus)
    const Job_Title = useSelector(state => state.candidateAuth.candidateRole)
    const [loaderVisible, setLoaderVisible] = useState(false);
    const { candidateId, candidateName, candidateStatusId, offerAcceptFlag, daysToJoin, candidateOfferLetter, growingDays, totalDay
    } = useSelector(state => state.candidateAuth)

    const [showAlert, setShowAlert] = useState(false);
    const [exitAlert, setExitAlert] = useState(false);
    const [profileAlert, setProfileAlert] = useState(false);
    const [offerLetterAlert, setOfferLetterAlert] = useState(false);
    const [employeeCreateFlag, setEmployeeCreateFlag] = useState('');
    const [esignCount, setEsignCount] = useState();
    const [todoList, setTodoList] = useState('');


    const [error, setError] = useState(false)
    const [tkenRes, setTkenRes] = useState();
    const [input, setInput] = useState("");
    const [count, setCount] = useState("");
    const [pendingTest, setPendingTest] = useState('');

    const isFocused = useIsFocused();


    useEffect(() => {
        if (isFocused) {
            console.log("testttttttttttttt")
            if (candidateId) {
                getCandidateOfferDetails()

            }
        }
    }, [props, isFocused, candidateId])


    useEffect(() => {

        if (isFocused) {
            if (candidateId) {
                getEsignData();
            }
        }

    }, [props, isFocused])


    useEffect(() => {

        if (isFocused) {
            if (candidateId) {
                getEsignData();
            }

        }
    }, [props, isFocused, candidateId])


    // getEsignData
    const getEsignData = async () => {

        setLoaderVisible(true);
        const data = {
            user: candidateId,
            candidateId: candidateId,
            flag: 'V'
        }

        // console.log("esigncanid", data);

        axios.post(`${API}/api/saveEsignDataNew`, data).then((response) => {

            const result = response.data.Result;
            console.log("esignData", result[0]);
            setEsignCount(result[0]?.ESSIGN_CNT);
            setLoaderVisible(false);

        })

    }



    const getCandidateOfferDetails = async (type) => {

        const userData = { loginId: candidateId }
        setLoaderVisible(true);
        axios.post(`${API}/api/hrms/candidateOfferCheck`, userData).then((response) => {

            const resultData = response.data;

            console.log("candidateOfferCheck", resultData);
            setLoaderVisible(false);
            dispatch(candidateAuthActions.updateLogin({
                candidateStatusId: resultData?.Result[0]?.STATUS,
                candidateStatus: resultData?.Result[0]?.CANDIDATE_STATUS
            }))


            setEmployeeCreateFlag(resultData?.Result[0]?.EMP_CREATION_FLAG);
            setTodoList(resultData?.Result[0]?.DOC_REQ);
            setPendingTest(resultData?.Result[0]?.PENDING_TEST);

            if (type === "offer") {
                resultData?.Result[0]?.OFFER_LETTER !== null && resultData?.Result[0]?.OFFER_LETTER !== "" ? props.navigation.navigate("Offer Letter") : setOfferLetterAlert(true)
            }

            if (type === "Document") {

                resultData?.Result[0]?.DOC_REQ !== 0 && resultData?.Result[0]?.DOC_REQ !== "" ? props.navigation.navigate("Candidate_Document") :
                    setShowAlert(true)
            }
            if (type === "profile") {
                resultData?.Result[0]?.OFER_ACPT_FLAG == "A" ? props.navigation.navigate("Candidate profile") : setProfileAlert(true)
            }
            if (type === "track") {

                resultData?.Result[0]?.CANDIDATE_STATUS && props.navigation.navigate("Status view page")
            }


        }).catch((error) => {
            // console.log(error)
            setLoaderVisible(false)

            Toast.show({
                type: 'error',
                text1: error
            })

        })


    }


    const finalSubmit = async () => {

        const userData = { candidateId: candidateId }
        axios.post(`${API}/api/User/completeCanProfile`, userData).then((response) => {

            const resultData = response.data;
            // console.log("finalSubmit", resultData.FLAG);

            if (resultData.FLAG === "S") {

                Toast.show({
                    type: 'success',
                    text1: resultData.MSG
                })
            } else {

                Toast.show({
                    type: 'error',
                    text1: resultData.MSG
                })

            }


        }).catch((error) => {
            // console.log(error)
            setLoaderVisible(false)

            Toast.show({
                type: 'error',
                text1: error
            })

        })

    }


    useEffect(() => {
        // for handling back button in android
        const backAction = () => {
            if (props.navigation.isFocused()) {
                setExitAlert(true)
            }
        };

        const backPressHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
        return () => {
            backPressHandler.remove();
        };
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            getEsignData()
        }, [])
    );


    return (
        <View>

            <View style={{
                backgroundColor: COLORS.white, paddingHorizontal: 12, paddingBottom: 8, shadowColor: COLORS.orange1,
                elevation: 5
            }}>
                <CustomAlert messageStyle={{ color: COLORS.black, ...FONTS.h3 }} showCancel={false} showConfirm={true} confirmButtonColor={COLORS.green} confirmTxt='Ok' show={offerLetterAlert} setShow={setOfferLetterAlert} message={"Offer Letter not generated Yet"} />
                <CustomAlert messageStyle={{ color: COLORS.black, ...FONTS.h3 }} showCancel={false} showConfirm={true} confirmButtonColor={COLORS.green} confirmTxt='Ok' show={profileAlert} setShow={setProfileAlert} message={"Before accepting offer letter You can not fill perosnal Details"} />
                <CustomAlert messageStyle={{ color: COLORS.black, ...FONTS.h3 }} showCancel={false} showConfirm={true} confirmButtonColor={COLORS.green} confirmTxt='Ok' show={showAlert} setShow={setShowAlert} message={"Document need to be submit after offer letter acceptance"} />
                <CustomAlert show={exitAlert} setShow={setExitAlert} title={"Wait"} message={"Are you sure, you want to exit the App?"} onConfirmPressed={() => BackHandler.exitApp()} />

                {/* <Text style={{ ...FONTS.h2, color: COLORS.orange1, textAlignVertical: 'center', marginTop: 10 }}>Welcome</Text> */}
                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', width: '45%', paddingHorizontal: 4, alignItems: 'center', flex: 1 }}>
                        <FontAwesomeIcon name="user-circle-o" size={25} color={COLORS.black} />
                        <Text style={{ ...FONTS.h3, color: COLORS.black, marginLeft: 8 }}>{candidateName}</Text>
                    </View>

                    <TouchableOpacity style={{ justifyContent: 'flex-end', backgroundColor: COLORS.white }} onPress={() => { props.navigation.navigate("Candidate_Login"), dispatch(candidateAuthActions.logOut()) }}>
                        <Icons name='logout' size={30} style={{ color: COLORS.black, padding: 8 }} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                <Loader loaderVisible={loaderVisible} />
                {
                    employeeCreateFlag !== '' && employeeCreateFlag !== null && employeeCreateFlag === 'Y' ?
                        <>
                            <View style={{ flex: 1, marginHorizontal: 10, marginTop: 20, borderRadius: 12, padding: 15 }}>

                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <View >
                                        <View style={{ flexDirection: 'row', marginLeft: 12 }}>
                                            {
                                                esignCount >= 0 ? <Image source={circleFill} style={{ width: 40, height: 40, justifyContent: 'center' }} /> : <Image source={circleTranceparent} style={{ width: 40, height: 40, justifyContent: 'center' }} />
                                            }
                                            <Text style={{ marginTop: 7, color: COLORS.orange1, justifyContent: 'center', ...FONTS.h5, marginLeft: -8 }}>
                                                -----------
                                            </Text>
                                        </View>
                                        <Text style={{ color: COLORS.black, ...FONTS.h5, }}>
                                            Candidate
                                        </Text>
                                    </View>

                                    <View >
                                        <View style={{ flexDirection: 'row', marginLeft: -5 }}>
                                            {
                                                esignCount == 1 || esignCount >= 1 ? <Image source={circleFill} style={{ width: 40, height: 40, justifyContent: 'center' }} /> : <Image source={circleTranceparent} style={{ width: 40, height: 40, justifyContent: 'center' }} />
                                            }
                                            <Text style={{ marginTop: 7, color: COLORS.orange1, justifyContent: 'center', ...FONTS.h5, marginLeft: -8 }}>
                                                --------------
                                            </Text>
                                        </View>
                                        <Text style={{ color: COLORS.black, ...FONTS.h5, }}>
                                            1st Guarantor
                                        </Text>
                                    </View>
                                    <View >
                                        <View style={{ flexDirection: 'row', marginLeft: -5 }}>
                                            {
                                                esignCount == 2 || esignCount >= 2 ? <Image source={circleFill} style={{ width: 40, height: 40, justifyContent: 'center' }} /> : <Image source={circleTranceparent} style={{ width: 40, height: 40, justifyContent: 'center' }} />
                                            }
                                            <Text style={{ marginTop: 7, color: COLORS.orange1, justifyContent: 'center', ...FONTS.h5, marginLeft: -8 }}>
                                                ---------------
                                            </Text>
                                        </View>
                                        <Text style={{ color: COLORS.black, ...FONTS.h5, }}>
                                            2nd Guarantor
                                        </Text>
                                    </View>

                                    <View >
                                        <View style={{ flexDirection: 'row', marginLeft: -5 }}>
                                            {
                                                esignCount !== null && esignCount > 2 ? <Image source={circleFill} style={{ width: 40, height: 40, justifyContent: 'center' }} /> : <Image source={circleTranceparent} style={{ width: 40, height: 40, justifyContent: 'center' }} />
                                            }

                                        </View>
                                        <Text style={{ color: COLORS.black, ...FONTS.h5, }}>
                                            Complete
                                        </Text>
                                    </View>

                                </View>
                            </View>

                            <TouchableOpacity disabled={esignCount <= 2 ? false : true} onPress={() => props.navigation.navigate("Pending_Esign_list")}>
                                <View style={{ borderRadius: 12, backgroundColor: (esignCount < 2 ? COLORS.white : '#d9d9d9'), width: '35%', justifyContent: 'center', padding: 15, marginLeft: 20, elevation: 2 }}>

                                    <Image source={EsignD} style={{ width: 60, height: 60, marginTop: 10, justifyContent: 'center', alignItems: 'center', marginLeft: 30 }} />

                                    <Text style={{ ...FONTS.h5, color: COLORS.black, alignSelf: 'center', marginTop: 5 }}>My Esign</Text>
                                </View>
                            </TouchableOpacity>
                        </>
                        :
                        // header view
                        //  Status view  
                        <View style={{ marginHorizontal: 10, }}>

                            {/* <Text style={{ ...FONTS.h1, padding: 10, flex: 1, width: '100%', alignSelf: 'center', flexDirection: 'row',textAlign:'center',margin:20 ,color:COLORS.orange1}}>Welcome {candidateName}</Text> */}



                            <View style={{ backgroundColor: COLORS.disableOrange1, borderColor: COLORS.green, paddingVertical: 8, borderRadius: 12, marginVertical: 8, marginTop: 30 }}>
                                <Text style={{ ...FONTS.h3, color: COLORS.black, marginHorizontal: 15 }}>You are applied for {Job_Title}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', gap: 20, marginTop: 15 }}>
                                    <View>
                                        {growingDays ? <PieChart
                                            widthAndHeight={100} series={[growingDays, totalDay - growingDays]} sliceColor={[COLORS.green, COLORS.white]} coverRadius={0.85} >
                                            {/* {console.log("joining days", daysToJoin, totalDay, growingDays, (totalDay - growingDays))} */}
                                        </PieChart> : <PieChart
                                            widthAndHeight={100} series={[0, 1]} sliceColor={[COLORS.green, COLORS.white]} coverRadius={0.85} >
                                            {/* {console.log("joining days", daysToJoin, totalDay, growingDays, (totalDay - growingDays))} */}
                                        </PieChart>}

                                        {/* series={[daysToJoin === null ? "1" : daysToJoin, totalDay === null ? "2" : totalDay - daysToJoin === null ? "1" : daysToJoin]} */}

                                        {growingDays ? <View style={{ position: "absolute", height: 80, width: 80, borderRadius: 45, alignItems: "center", justifyContent: "center", alignSelf: "center", top: 10, padding: 10, }}>
                                            <Text style={{ ...FONTS.h2, color: COLORS.black, alignSelf: "center", fontWeight: "bold" }}>{daysToJoin === null ? "1" : daysToJoin}</Text>
                                            <Text style={{ ...FONTS.body5, color: COLORS.orange1, alignSelf: "center", fontWeight: "700" }}
                                            >Days to</Text>
                                            <Text style={{
                                                ...FONTS.body5, color: COLORS.orange1, alignSelf: "center", fontWeight: "700", lineHeight: 12
                                            }}>Join</Text>
                                        </View> : <Text style={{ position: "absolute", height: 80, width: 80, borderRadius: 45, alignItems: "center", justifyContent: "center", alignSelf: "center", top: 18, padding: 5, left: 30, ...FONTS.h1, color: COLORS.black }}>...</Text>}
                                    </View>
                                    <View>
                                        <Text style={{ color: COLORS.black, fontSize: 15, flexWrap: "wrap", textAlign: 'left' }}>Job Status Pending at </Text>

                                        <Text style={{ ...FONTS.body1, fontSize: 16, color: COLORS.green, textAlign: 'left', lineHeight: 22 }}> {current_Status}</Text>
                                        <TouchableOpacity style={{
                                            marginTop: 12
                                        }} onPress={() => getCandidateOfferDetails("track")}>
                                            <LinearGradient
                                                colors={[COLORS.orange1, COLORS.disableOrange1]}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 2, y: 0 }}
                                                style={{ borderRadius: 8, padding: 8, }} >
                                                <Text style={{ color: COLORS.white, ...FONTS.h4, textAlign: 'center' }}>Track job Status</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                }

                {pendingTest &&
                    <View style={{ marginHorizontal: 12, marginVertical: 12 }}>
                        <Text style={{ fontWeight: 500, fontSize: 16, color: COLORS.black }}> {pendingTest === "C" ? "Complete Task" : "To Do's"}</Text>

                        <TouchableOpacity onPress={() => { pendingTest === "C" ? props.navigation.navigate("TestResult") : props.navigation.navigate("TestScreen") }}>
                            <View style={{ flex: 1, flexDirection: 'row', height: responsiveHeight(10), borderRadius: SIZES.radius, backgroundColor: COLORS.disableOrange1, marginTop: 10, justifyContent: 'space-between' }}>

                                <Text style={{
                                    textAlignVertical: 'center',
                                    padding: 10,
                                    ...FONTS.h5,
                                    fontSize: 16,
                                    color: COLORS.orange1,
                                    marginLeft: 10
                                }}>
                                    {pendingTest === "C" ? "Complete Test..." : "Proceed for Test..."}
                                </Text>
                                <Image source={test} style={{ height: 50, width: 50, alignSelf: 'center', marginEnd: 20 }} />
                            </View>
                        </TouchableOpacity>

                    </View>
                }

                {/* offer Letter view */}

                {candidateOfferLetter && <View style={{ marginHorizontal: 12, marginVertical: 12 }}>
                    <Text style={{ fontWeight: 500, fontSize: 16, color: COLORS.black }}> Offer Letter
                        {/* {JSON.stringify(tkenRes)} */}
                    </Text>
                    <TouchableOpacity style={{ backgroundColor: COLORS.disableOrange1, paddingVertical: 20, borderRadius: 12, width: "100%", marginVertical: 12, borderColor: COLORS.orange1, borderWidth: 0.5, }} onPress={() => { [getCandidateOfferDetails("offer")] }}>
                        <View style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'space-between' }}>
                            <SimpleLineIcons name="envelope-letter" size={30} color={COLORS.orange} style={{ marginHorizontal: 30 }} />
                            <Text style={{ fontWeight: 500, fontSize: 14, color: COLORS.orange, marginRight: 30, textAlignVertical: 'center' }}>View Offer Letter{">"}</Text>
                        </View>

                    </TouchableOpacity>
                </View>}


                {/* task view */}

                {todoList !== '' && todoList !== 0 && <View style={{ marginHorizontal: 12, marginVertical: 6 }}>
                    <Text style={{ fontWeight: 500, fontSize: 16, color: COLORS.black }}> Task1
                        {/* {JSON.stringify(count,"ggvbg")}  */}
                    </Text>
                    <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'space-between', marginVertical: 6, elevation: 5 }}>
                        {/* profile view */}
                        <TouchableOpacity style={{ height: 160, width: "45%", borderColor: COLORS.orange, borderWidth: 0.5, backgroundColor: COLORS.disableOrange1, padding: 12, alignItems: 'center', justifyContent: 'center', borderRadius: 12 }}
                            onPress={() => { getCandidateOfferDetails("profile") }}>
                            <FontAwesome5 name="user" size={44} color={COLORS.orange1} />
                            <Text style={{ color: COLORS.orange1, fontWeight: 500, fontSize: 16, marginTop: 12 }}>  Your profile     </Text>
                        </TouchableOpacity>
                        {/* document view */}

                        <TouchableOpacity onPress={() => { [getCandidateOfferDetails("Document")] }} style={{ borderColor: COLORS.green, borderWidth: 0.5, height: 160, backgroundColor: COLORS.disableGreen, padding: 12, alignItems: 'center', justifyContent: 'center', borderRadius: 12, width: "45%", }}>

                            <Icons name="file-document-outline" size={44} color={COLORS.green} />
                            <Text style={{ color: COLORS.green, fontWeight: 500, fontSize: 16, marginTop: 12 }}>  Documents  </Text>
                        </TouchableOpacity>
                    </View>
                </View>}
                {/* final submittion view */}

                {todoList !== '' && todoList !== 0 &&
                    <View style={{ marginHorizontal: 12, marginVertical: 6, width: '100%' }}>

                        {candidateStatusId <= "166" && <TouchableOpacity style={{
                            marginTop: 12, justifyContent: 'flex-end', width: responsiveWidth(35), alignSelf: 'flex-end', marginRight: 25, marginTop: -5
                        }}
                            onPress={() => finalSubmit()}>

                            <LinearGradient
                                colors={[COLORS.orange1, COLORS.disableOrange1]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 2, y: 0 }}
                                style={{ borderRadius: 8, padding: 8, }} >

                                <Text style={{ color: COLORS.white, ...FONTS.h4, textAlign: 'center' }}>Final submittion</Text>
                            </LinearGradient>
                        </TouchableOpacity>}

                    </View>}

                {/* about satya */}
                <View style={{ marginHorizontal: SIZES.radius, marginBottom: 100, marginTop: 20 }}>
                    <Text style={{ fontWeight: 500, fontSize: 16, color: COLORS.black, }}>About Satya </Text>
                    <TouchableOpacity onPress={() => Linking.openURL('https://satyamicrocapital.com/')}
                        style={{ marginTop: 10, marginBottom: 10, backgroundColor: COLORS.white, height: responsiveHeight(55), borderRadius: SIZES.radius, alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderColor: COLORS.lightGray, }}>

                        <View style={{ height: '95%', width: '95%', justifyContent: 'center' }}>
                            {/* <Image source={company_logo_2} style={{ height: '100%', width: '100%', }} /> */}

                            <WebView source={{ uri: 'https://satyamicrocapital.com/' }} />
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View >
    )
}


export default CandidateDashboard