import React, { useEffect, useState } from 'react'
import COLORS from '../../constants/theme'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { View, Text, TouchableOpacity, ScrollView, Linking, ToastAndroid, Image, BackHandler, Alert } from 'react-native'
import { FONTS, SIZES } from '../../constants/font_size';
import LinearGradient from 'react-native-linear-gradient';
import { company_logo_2, expernallinkImage } from '../../assets';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { useSelector, useDispatch } from 'react-redux';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import ReverseGeocoding from '../../functions/ReverseGeocoding';
import { candidateAuthActions } from '../../redux/candidateAuthSlice';
import Loader from '../../components/Loader';
import { useRoute } from '@react-navigation/native';
import Offer_Letter from './Offer_Letter';
import PieChart from 'react-native-pie-chart';

const CandidateDashboard = (props) => {
    const dispatch = useDispatch();
    const route = useRoute();
    const current_Status = useSelector(state => state.candidateAuth.candidateStatus)
    const Job_Title = useSelector(state => state.candidateAuth.candidateRole)
    const [loaderVisible, setLoaderVisible] = useState(false);
    const { candidateId, candidateName, candidateStatusId, offerAcceptFlag, daysToJoin, candidateOfferLetter, 
       } = useSelector(state => state.candidateAuth)
    const candidateAuth = useSelector(state => state.candidateAuth)
    const [docCount, setDocCount] = useState();


    const getDocData = async () => {
        let PersonalData = { operFlag: "V", candidateId: candidateId, candidateStatus: candidateStatusId }
        let formData = new FormData();
        formData.append('data', JSON.stringify(PersonalData))

        setLoaderVisible(true)
        let res = await fetch("https://econnectsatya.com:7033/api/hrms/assesmentSave", {
            method: "POST",
            body: formData
        })

        res = await res.json()
        setLoaderVisible(false);
        console.log("CheckDocCount", res)
        setDocCount(res.PO_DOC_REQ);

        { res.PO_DOC_REQ !== "0" ? props.navigation.navigate("Candidate_Document") : Alert.alert("Document need to be submit after offer letter acceptance") }

    }


    useEffect(() => {

        console.log(candidateName);

        // console.log("dayss data", totalDays, growingDays, daysToJoin);


        // for handling back button in android
        const backAction = () => {
            if (props.navigation.isFocused()) {

                Alert.alert('Wait', 'Are you sure, you want to exit the App?', [
                    {
                        text: 'No',
                        onPress: () => null,
                    },
                    {
                        text: 'Yes',
                        onPress: () => BackHandler.exitApp(),
                    },
                ]);

                return true;
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


    const loadInBrowser = () => {
        Linking.openURL('https://satyamicrocapital.com/').catch(err => ToastAndroid.show("Couldn't load page" + err, 4000));
    };
    return (
        <View>
            {/* {console.log("dayssSonam", growingDays + ", " + totalDays + ", " + daysToJoin)} */}
            <View style={{
                backgroundColor: COLORS.white, paddingHorizontal: 12, paddingBottom: 8, shadowColor: COLORS.orange1,
                elevation: 5
            }}>

                <Text style={{ ...FONTS.h2, color: COLORS.orange1, textAlignVertical: 'center', marginTop: 10 }}>Welcome</Text>
                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', width: '45%', paddingHorizontal: 4, alignItems: 'center', flex: 1 }}>

                        <FontAwesomeIcon name="user-circle-o" size={25} color={COLORS.black} />
                        <Text style={{ ...FONTS.h3, color: COLORS.black, marginLeft: 8 }}>{candidateName}</Text>

                    </View>

                    <TouchableOpacity style={{ justifyContent: 'flex-end', }} onPress={() => { props.navigation.navigate("Candidate_Login"), dispatch(candidateAuthActions.logOut()) }}>
                        <Icons name='logout' size={30} style={{ color: COLORS.black, padding: 8 }} />
                    </TouchableOpacity>

                </View>
            </View>
            <ScrollView>
                <Loader loaderVisible={loaderVisible} />
                {/* header view */}

                {/* Status view */}
                <View style={{ marginHorizontal: 12, }}>
                    <View style={{ backgroundColor: COLORS.disableOrange1, borderColor: COLORS.green, paddingVertical: 8, borderRadius: 12, marginVertical: 8, marginTop: 30 }}>
                        <Text style={{ ...FONTS.h3, color: COLORS.black, marginHorizontal: 15 }}>You are applied for {Job_Title}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', gap: 20, marginTop: 15 }}>
                            {/* <View>
                                <PieChart
                                    widthAndHeight={100} series={[daysToJoin && daysToJoin, totalDays && totalDays - daysToJoin && daysToJoin]} sliceColor={[COLORS.green, 'white']} coverRadius={0.80} />
                                <View style={{
                                    position: "absolute",
                                    height: 80,
                                    width: 80,
                                    borderRadius: 45,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    alignSelf: "center",
                                    top: 10,
                                    padding: 8,

                                }}>
                                    <Text style={{
                                        ...FONTS.h2,
                                        color: COLORS.black,
                                        alignSelf: "center",
                                        fontWeight: "bold"
                                    }}>{daysToJoin && daysToJoin}</Text>
                                    <Text style={{
                                        ...FONTS.body5,
                                        color: COLORS.orange1,
                                        alignSelf: "center",
                                        fontWeight: "700"
                                    }}>Days to</Text>
                                    <Text style={{
                                        ...FONTS.body5,
                                        color: COLORS.orange1,
                                        alignSelf: "center",
                                        fontWeight: "700",
                                        lineHeight: 12
                                    }}>Join</Text>
                                </View>
                            </View> */}
                            <View>
                                <Text style={{ color: COLORS.black, fontSize: 15, marginHorizontal: 15, flexWrap: "wrap" }}>Job Status Pending at </Text>
                                <Text style={{ ...FONTS.body1, fontSize: 16, color: COLORS.green, textAlign: 'center', lineHeight: 22 }}> {current_Status}</Text>
                                <TouchableOpacity style={{
                                    marginTop: 12
                                }} onPress={() => props.navigation.navigate("Status_view_page")}>
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

                {/* offer Letter view */}
                <View style={{ marginHorizontal: 12, marginVertical: 12 }}>
                    <Text style={{ fontWeight: 500, fontSize: 16, color: COLORS.black }}> Offer Letter  </Text>
                    <TouchableOpacity style={{ backgroundColor: COLORS.disableOrange1, paddingVertical: 20, borderRadius: 12, width: "100%", marginVertical: 12, borderColor: COLORS.orange1, borderWidth: 0.5, }} onPress={() => { candidateOfferLetter !== null ? props.navigation.navigate("Offer_Letter") : Alert.alert("Offer Letter not generated Yet") }}>
                        <View style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'space-between' }}>
                            <SimpleLineIcons name="envelope-letter" size={30} color={COLORS.orange} style={{ marginHorizontal: 30 }} />
                            <Text style={{ fontWeight: 500, fontSize: 14, color: COLORS.orange, marginRight: 30, textAlignVertical: 'center' }}>View Offer Letter{">"}</Text>
                        </View>

                    </TouchableOpacity>
                </View>


                {/* task view */}
                <View style={{ marginHorizontal: 12, marginVertical: 6 }}>
                    <Text style={{ fontWeight: 500, fontSize: 16, color: COLORS.black }}> Task  </Text>
                    <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'space-between', marginVertical: 6, elevation: 5 }}>
                        {/* profile view */}
                        <TouchableOpacity style={{ height: 160, width: "45%", borderColor: COLORS.orange, borderWidth: 0.5, backgroundColor: COLORS.disableOrange1, padding: 12, alignItems: 'center', justifyContent: 'center', borderRadius: 12 }}
                            onPress={() => { offerAcceptFlag === "A" ? props.navigation.navigate("Candidate_profile") : Alert.alert("Before accepting offer letter You can not fill perosnal Details") }}>
                            <FontAwesome5 name="user" size={44} color={COLORS.orange1} />
                            <Text style={{ color: COLORS.orange1, fontWeight: 500, fontSize: 16, marginTop: 12 }}>  Your profile     </Text>
                        </TouchableOpacity>
                        {/* document view */}

                        <TouchableOpacity onPress={() => getDocData()} style={{ borderColor: COLORS.green, borderWidth: 0.5, height: 160, backgroundColor: COLORS.disableGreen, padding: 12, alignItems: 'center', justifyContent: 'center', borderRadius: 12, width: "45%", }}>

                            <Icons name="file-document-outline" size={44} color={COLORS.green} />
                            <Text style={{ color: COLORS.green, fontWeight: 500, fontSize: 16, marginTop: 12 }}>  Documents </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* about satya */}
                <View style={{ marginHorizontal: SIZES.radius, }}>
                    <Text style={{ fontWeight: 500, fontSize: 16, color: COLORS.black, }}>About Satya </Text>
                    <TouchableOpacity onPress={() => Linking.openURL('https://satyamicrocapital.com/')}
                        style={{ marginTop: 10, marginBottom: 10, backgroundColor: COLORS.white, height: 110, borderRadius: SIZES.radius, alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderColor: COLORS.lightGray, }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', zIndex: 1000, top: 5, right: 5, borderWidth: 1, borderColor: COLORS.lightGray, borderRadius: SIZES.base / 2, padding: SIZES.base / 4, }}>
                            <Image source={expernallinkImage}
                                style={{ height: 20, width: 20, }} />
                            {/* <Text style={{ marginLeft: SIZES.base, ...FONTS.body5}}>satyamicrocapital.com</Text>  */}
                        </View>
                        <View style={{ height: 100, width: 200, }}>
                            <Image source={company_logo_2} style={{ height: '100%', width: '100%', }} />
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}


const data = [
    {
        id: 0,
        status: 'On-Progress',
        date: '03-03-2023'
    },
    {
        id: 1,
        status: 'Paid',
        date: '04-03-2023'
    },
    {
        id: 3,
        status: 'Finish',
        date: '05-03-2023'
    },
    {
        id: 3,
        status: 'Finish',
        date: '05-03-2023'
    },
    {
        id: 3,
        status: 'Finish',
        date: '05-03-2023'
    },
]
export default CandidateDashboard