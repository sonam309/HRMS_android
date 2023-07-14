import { ScrollView, useWindowDimensions, View, Text, TouchableOpacity, Alert, StyleSheet, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import RenderHtml from 'react-native-render-html';
import COLORS from '../../../constants/theme';
import Icons from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector } from 'react-redux';
import Loader from '../../../components/Loader';

const Details = (props) => {
    const { width } = useWindowDimensions();
    const { candidate_ID, category, date, mail_body, approver, action, jobId } = props.route.params
    const [jobRequestData, setJobRequestData] = useState(null);
    const [jobOpeningData, setJobOpeningData] = useState(null);
    const [HTMLdata, setHTMLdata] = useState(null)
    const [data, setData] = useState(null)
    const [disableBtn, setDisableBtn] = useState(false);
    const [loaderVisible, setLoaderVisible] = useState(true);
    const userId = useSelector(state => state.auth.userId)
    let modifiedTemplate = null;

    useEffect(() => {
        {
            switch (category) {
                case "Salary Allocation":
                    (getSalaryData(), getSalaryHTMLData())
                    break;
                case "New Job Opening":
                    (getJobOpeningData())
                    break;
                case "New Job Request":
                    (getJobRequestData())
                    break;
            }
        }
    }, [])

    // Variables to be updated for salary allocation
    let fullName, contactPersonMob, contactPersonName, baseSalary, employerPF, grossAmount, fuelAllowance, dvrAllowance, specialAllowance, bonusPay, conveyanceAllowance, bikeMaintenaceAllowance, foodAllowance, HRA, yearbaseVariable, YearHRA, YearfoodAllowance, YearbikeMaintenaceAllowance, YearconveyanceAllowance, YearbonusPay, YearspecialAllowance, YeardvrAllowance, YearfuelAllowance, YeargrossAmount, YearemployerPF, YeartotalSalValue, MonthtotalSalValue, JobTitle, candidateDep

    // Updating Salary details
    var SalaryDetails = {
        txnId: data?.Table[0]?.TXN_ID,
        userId: userId,
        candidateId: data?.Table[0]?.CANDIDATE_ID,
        previousCtc: data?.Table[0]?.PREVIOUS_CTC,
        hike: data?.Table[0]?.HIKE,
        camputedValue: data?.Table[0]?.COMPUTED_VALUE,
        annuallyCtc: data?.Table[0]?.ANNUALY_CTC,
        monthlyCtc: data?.Table[0]?.FIXED_CTC_MONTHLY,
        grossAmount: grossAmount,
        calGrossAmmount: data?.Table[0]?.CAL_GROS_AMT,
        annualVariable: data?.Table[0]?.ANNUAL_VARIABLE,
        fixedCtc: data?.Table[0]?.FIXED_CTC,
        employerPf: employerPF,
        employerEsic: data?.Table[0]?.EMPLOYER_ESIC,
        professionTax: data?.Table[0]?.PROFESSION_TAX,
        annualType: '0',
        basicSalery: '0',
        bikeMaintainace: '0',
        bonusPay: '0',
        conveyanceAllowance: '0',
        hra: '0',
        specialAllowance: '0',
        fuelRembursment: '0',
        totalAmount: '0',
        distanceAllowance: '0',
        driveAllowance: '0',
        esicPercentage: '0',
        foodAllowance: '0',
        Remark: '',
        approver: '',
        salApproverId: '',
        fixedCtcMonthly: data?.Table[0]?.FIXED_CTC_MONTHLY,
        fixedCtcYearly: data?.Table[0]?.FIXED_CTC_ANNUALLY,
        employeePfCheck: data?.Table[0]?.EMPLR_PF_CHECK,
        costOfCompany: '0',
    };

    // for Approving salary pending approvals
    const SalaryAction = (oprFlag) => {
        axios.post('https://econnectsatya.com:7033/api/hrms/saveSaleryAllocation', { ...SalaryDetails, operFlag: oprFlag })
            .then(response => {
                console.log("salary", SalaryDetails)
                const returnedData = response?.data;
                console.log("this is response from backend", returnedData);
                ToastAndroid.show(returnedData?.MSG, 3000)
                setDisableBtn(true);
            })
            .catch(error => {
                // Alert.alert('Error', error);
                console.log("error", error)
            });
    };

    const jobRequestAction = async (opr) => {
        // console.warn("opr flag", opr);
        var formData = new FormData();
        formData.append('data', JSON.stringify({ operFlag: opr, txnId: jobId }),);

        try {
            let res = await fetch("https://econnectsatya.com:7033/api/hrms/jobOpeningRequest", {
                method: "POST",
                body: formData

            })
            res = await res.json();
            console.log("before", res);

            ToastAndroid.show(res.MSG, 3000)

            if (res.FLAG === "S") {
                props.navigation.goBack()
            }

        } catch (error) {
            console.log(error)
        }
    };

    const jobOpeningAction = async (opr) => {

        let jobInfodata = { oper: opr, jobId: jobId };
        jobInfodata = JSON.stringify(jobInfodata)
        console.log(jobInfodata)
        try {
            let res = await fetch("https://econnectsatya.com:7033/api/createNewJob", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: jobInfodata
            })

            res = await res.json();
            res = res?.Result;
            console.log("this is response from backend", res)

            ToastAndroid.show(res[0].MSG, 3000)

        } catch (error) {
            console.log(error)
        }
    };


    // Fetching salary allocation template
    const getSalaryHTMLData = async () => {
        let totalData = await fetch('https://econnectsatya.com:7033/api/Admin/getHiringTemplate?tempId=7')
        totalData = await totalData.json()
        totalData = totalData.Result[0]?.MAIL_BODY
        setHTMLdata(totalData)
    }

    // Fetching salary allocation data
    const getSalaryData = () => {
        axios.post('https://econnectsatya.com:7033/api/hrms/saveSaleryAllocation', {
            operFlag: "V",
            candidateId: candidate_ID
        })
            .then(response => {
                const returnedData = response?.data;
                setData(returnedData)
            });
    }

    // Setting the variables data coming for Salary Allocation
    const updating = () => {
        // console.warn(data);
        fullName = data.Table1[0]?.FULL_NAME
        JobTitle = data?.Table[0]?.DESIGNATION
        contactPersonMob = data.Table1[0]?.CONTACT_PERSON
        contactPersonName = data.Table1[0]?.FULL_NAME
        candidateDep = data?.Table[0]?.DEPARTMENT_NAME
        baseSalary = data.Table[0]?.BASIC_SAL
        HRA = data.Table[0]?.HRA
        foodAllowance = data.Table[0]?.FOOD_ALLOWANCE
        bikeMaintenaceAllowance = data.Table[0]?.BIKE_MANTENANCE
        conveyanceAllowance = data.Table[0]?.CONVEYANCE_ALLOWANCE
        bonusPay = data.Table[0]?.BONUS_PAY
        specialAllowance = data.Table[0]?.SPECIAL_ALLOWANCE
        dvrAllowance = data.Table[0]?.DRIVER_ALLOWANCE
        fuelAllowance = data.Table[0]?.FUEL_REMBURSEMENT
        grossAmount = data.Table[0]?.GROSS_AMOUNT
        employerPF = data.Table[0]?.EMPLOPYER_PF
        yearbaseVariable = Number(baseSalary) * 12
        YearHRA = Number(HRA) * 12
        YearfoodAllowance = Number(foodAllowance) * 12
        YearbikeMaintenaceAllowance = Number(bikeMaintenaceAllowance) * 12
        YearconveyanceAllowance = Number(conveyanceAllowance) * 12
        YearbonusPay = Number(bonusPay) * 12
        YearspecialAllowance = Number(specialAllowance) * 12
        YeardvrAllowance = Number(dvrAllowance) * 12
        YearfuelAllowance = Number(fuelAllowance) * 12
        YeargrossAmount = Number(grossAmount) * 12
        YearemployerPF = Number(employerPF) * 12

        // Monthly value
        MonthtotalSalValue = Number(baseSalary) + Number(HRA) + Number(foodAllowance) + Number(bikeMaintenaceAllowance) + Number(conveyanceAllowance) + Number(bonusPay) + Number(specialAllowance) + Number(dvrAllowance) + Number(fuelAllowance) + Number(grossAmount) + Number(employerPF)

        //Total Year Value
        YeartotalSalValue = Number(yearbaseVariable) + Number(YearHRA) + Number(YearfoodAllowance) + Number(YearbikeMaintenaceAllowance) + Number(YearconveyanceAllowance) + Number(YearbonusPay) + Number(YearspecialAllowance) + Number(YeardvrAllowance) + Number(YearfuelAllowance) + Number(YeargrossAmount) + Number(YearemployerPF)
    }

    // Updating the HTML data for Salary Allocation
    const updateHTML = () => {
        data ? updating() : null
        return (
            data && HTMLdata ?
                (
                    // console.warn(fullName),
                    // console.warn(HTMLdata),
                    HTMLdata
                        .replace("NameVariable", fullName ? fullName : "fullName")
                        .replaceAll("DesignationVariable", JobTitle === "" ? "DesignationVariable" : JobTitle)
                        .replaceAll("contactPersonVarMob", contactPersonMob == "" ? "contactPersonVarMob" : contactPersonMob)
                        .replaceAll("contactPersonVarName", contactPersonName == "" ? "contactPersonVarName" : contactPersonName)
                        // .replaceAll("ContractionsVariable", candidateBeforeValue == "" ? "ContractionsVariable" : candidateBeforeValue)
                        // .replaceAll("CompensationVariable", compensation == "" ? "CompensationVariable" : compensation)
                        // .replaceAll('DateVariable', startDate == "" ? "DateVariable" : dateOfIssue)

                        // .replaceAll('NameVariable', candidateName == "" ? 'NameVariable' : candidateName)
                        .replaceAll('DepartmentVariable', candidateDep == "" ? 'DepartmentVariable' : candidateDep)
                        .replaceAll('MonthBaseVariable', baseSalary == "0" ? '0' : baseSalary)
                        .replaceAll('YearBaseVariable', yearbaseVariable == "0" ? '0' : yearbaseVariable)
                        .replaceAll('MonthHRAVariable', HRA == "0" ? '0' : HRA)
                        .replaceAll('YearHRAVariable', YearHRA == "0" ? '0' : YearHRA)
                        .replaceAll('MonthlyfoodVariable', foodAllowance == "0" ? '0' : foodAllowance)
                        .replaceAll('YearlyfoodVariable', YearfoodAllowance == "0" ? '0' : YearfoodAllowance)
                        .replaceAll('MonthBikeVariable', bikeMaintenaceAllowance == "0" ? '0' : bikeMaintenaceAllowance)
                        .replaceAll('YearBikeVariable', YearbikeMaintenaceAllowance == "0" ? '0' : YearbikeMaintenaceAllowance)
                        .replaceAll('MonthConveyanceVariable', conveyanceAllowance == "0" ? '0' : conveyanceAllowance)
                        .replaceAll('YearlyConveyanceVariable', YearconveyanceAllowance == "0" ? '0' : YearconveyanceAllowance)
                        .replaceAll('MonthBonusVariable', bonusPay == "0" ? '0' : bonusPay).replaceAll('YearlyBonusVariable', YearbonusPay == "0" ? '0' : YearbonusPay)
                        .replaceAll('MonthSpecialVariable', specialAllowance == "0" ? '0' : specialAllowance)
                        .replaceAll('YearSpecialVariable', YearspecialAllowance == "0" ? '0' : YearspecialAllowance).replaceAll('MonthdvrVariable', dvrAllowance == "0" ? '0' : dvrAllowance).replaceAll('YeardvrVariable', YeardvrAllowance == "0" ? '0' : YeardvrAllowance).replaceAll('MonthFuelVariable', fuelAllowance == "0" ? '0' : fuelAllowance).replaceAll('YearFuelVariable', YearfuelAllowance == "0" ? '0' : YearfuelAllowance).replaceAll('MonthGrossVariable', grossAmount == "0" ? '0' : grossAmount).replaceAll('YearGrossVariable', YeargrossAmount == "0" ? '0' : YeargrossAmount).replaceAll('MonthemployerPF', employerPF == "0" ? '0' : employerPF).replaceAll('YearemployerPF', YearemployerPF == "0" ? '0' : YearemployerPF).replaceAll('MonthTotalCompVariable', MonthtotalSalValue == "0" ? '0' : MonthtotalSalValue).replaceAll('YearTotalCompVariable', YeartotalSalValue == "0" ? '0' : YeartotalSalValue)) : null)
    }

    // function call for updating the HTML for Salary Allocation
    modifiedTemplate = updateHTML()

    // Fetching data for new job request
    const getJobRequestData = async () => {
        let formData = new FormData();
        formData.append('data', JSON.stringify({ operFlag: "V", txnId: jobId, userId: userId }))
        let res = await fetch("https://econnectsatya.com:7033/api/hrms/jobOpeningRequest", {
            method: "POST",
            body: formData
        })
        res = await res?.json()
        res = await res?.Table[0]
        console.log(res)
        setJobRequestData(res)
        // console.log("job request", res);
    }

    // Fetching data for new job opening
    const getJobOpeningData = async () => {
        let res = await fetch(`https://econnectsatya.com:7033/api/getJobs?jobStatus=0&jobId=${jobId}&leadId&userId`)
        console.warn(jobId);
        res = await res?.json();
        res = await res?.Table[0];
        setJobOpeningData(res);
        console.warn(res);
    }

    // Displaying data for new job opening
    const JobOpening = () => {

        return (
            <>

                <ScrollView style={{ backgroundColor: COLORS.white, padding: 10, flex: 1 }}>
                    <Loader loaderVisible={loaderVisible} />
                    {/* Top Icon */}
                    <View style={styles.topIcon}>

                        <View style={[{ backgroundColor: COLORS.lightBlue, justifyContent: 'center', alignItems: 'center', width: 60, height: 60, borderRadius: 30 }]}>
                            <Icons name='building-o' color={COLORS.white} size={35} />
                        </View>

                    </View>

                    {/* Position */}
                    <Text style={{ paddingVertical: 10, textAlign: 'center', fontWeight: 500, fontSize: 20, color: COLORS.voilet }}>{jobOpeningData?.JOB_TITLE}</Text>

                    {/* Location & Job type */}
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ paddingHorizontal: 2, textAlignVertical: 'center', fontSize: 16 }}> <MaterialIcons name='location-pin' size={20} color={COLORS.lightBlue} /> {jobOpeningData?.CITY}<Text style={{ fontWeight: 700 }}>  ∙</Text></Text>

                        <Text style={{ paddingHorizontal: 2, textAlignVertical: 'center', fontSize: 16 }}> <MaterialCommunityIcons name='office-building-outline' size={20} color={COLORS.red} /> {jobOpeningData?.DEPARTMENT_NAME}<Text style={{ fontWeight: 700 }}>  ∙</Text></Text>

                        <Text style={{ paddingHorizontal: 2, textAlignVertical: 'center', fontSize: 16 }}> <MaterialIcons name='pending-actions' color={COLORS.pink} size={20} /> {jobOpeningData?.JOB_STATUS}</Text>

                    </View>


                    {/* Basic Info -> No. of position, Job type, Compensation */}
                    <View style={{ borderWidth: 1, borderColor: COLORS.lightGray, marginVertical: 5, paddingVertical: 15, paddingHorizontal: 10, borderRadius: 12 }}>

                        <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Icons name='briefcase' size={25} color={COLORS.purple} />
                                <Text style={{ paddingVertical: 5, fontWeight: 500 }}>Opening</Text>
                                <Text style={{ paddingTop: 5, fontWeight: 500, color: COLORS.black }}>{jobOpeningData?.NO_OF_POSITIONS}</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <MaterialCommunityIcons name='clock' size={25} color={COLORS.lightOrange} />
                                <Text style={{ paddingVertical: 5, fontWeight: 500 }}>Job Type</Text>
                                <Text style={{ paddingTop: 5, fontWeight: 500, color: COLORS.black }}>{jobOpeningData?.E_TYPE}</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <View style={{ backgroundColor: COLORS.lightGreen, width: 25, borderRadius: 12.5, height: 25, padding: 2, justifyContent: 'center', alignItems: 'center' }}>
                                    <Icons name='rupee' size={25} />
                                </View>
                                <Text style={{ paddingVertical: 5, fontWeight: 500 }}>Compensation</Text>
                                <Text style={{ paddingTop: 5, fontWeight: 500, color: COLORS.black }}>Rs. {jobOpeningData?.COMPENSATION}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <MaterialCommunityIcons name='cash-check' color={COLORS.red} size={30} />
                                <Text style={{ paddingVertical: 5, fontWeight: 500 }}>Budget</Text>
                                <Text style={{ paddingTop: 5, fontWeight: 500, color: COLORS.black }}>{jobOpeningData?.BUDGET}</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <MaterialIcons name='pending-actions' color={COLORS.pink} size={30} />
                                <Text style={{ paddingVertical: 5, fontWeight: 500 }}>Job Status</Text>
                                <Text style={{ paddingTop: 5, fontWeight: 500, color: COLORS.black }}>{jobOpeningData?.JOB_STATUS1}</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <View style={{ backgroundColor: COLORS.lightGreen, width: 30, borderRadius: 15, height: 30, padding: 2, justifyContent: 'center', alignItems: 'center' }}>
                                    <MaterialCommunityIcons name='apache-kafka' size={28} />
                                </View>
                                <Text style={{ paddingVertical: 5, fontWeight: 500 }}>Experience</Text>
                                <Text style={{ paddingTop: 5, fontWeight: 500, color: COLORS.black }}> {jobOpeningData?.EXPERIENCE} years</Text>
                            </View>
                        </View>

                    </View>

                    {/* More details -> Posted by, Location, experience, Date Posted */}
                    <View style={{ paddingVertical: 15, paddingHorizontal: 10, marginVertical: 15, borderRadius: 12, borderWidth: 1, borderColor: COLORS.lightGray }}>

                        <Text style={{ paddingVertical: 5, fontWeight: 500 }}>Hiring Lead</Text>
                        <Text style={{ color: COLORS.black, fontWeight: 500, paddingVertical: 5, borderBottomWidth: 1, borderColor: COLORS.lightGray }}>{jobOpeningData?.HIRING_LEAD_NAME}</Text>


                        <Text style={{ marginTop: 10, paddingVertical: 5, fontWeight: 500 }}>Address</Text>
                        <Text style={{ color: COLORS.black, fontWeight: 500, paddingVertical: 5, borderBottomWidth: 1, borderColor: COLORS.lightGray }}>{jobOpeningData?.CITY}, {jobOpeningData?.PROVINCE_NAME}, {jobOpeningData?.COUNTRY_NAME}</Text>

                        <Text style={{ marginTop: 10, paddingVertical: 5, fontWeight: 500 }}>Job Remarks</Text>
                        <Text style={{ color: COLORS.black, fontWeight: 500 }}>{jobOpeningData?.JOB_DESC}</Text>
                    </View>
                    {jobOpeningData && setLoaderVisible(false)}
                </ScrollView>

            </>
        )
    }

    // Displaying data new for job request
    const JobRequest = () => {
        // console.warn("Job request Data", jobRequestData);

        let JD = jobRequestData?.UPLOAD_JD_DOC
        return (jobRequestData != null ? (
            <ScrollView style={{ backgroundColor: COLORS.white, padding: 10, flex: 1 }}>
                <Loader loaderVisible={loaderVisible} />
                {/* Top Icons */}
                <View style={styles.topIcon}>

                    <View style={[{ backgroundColor: COLORS.lightBlue, justifyContent: 'center', alignItems: 'center', width: 60, height: 60, borderRadius: 30 }]}>
                        <Icons name='building-o' color={COLORS.white} size={35} />
                    </View>

                </View>

                {jobRequestData && setLoaderVisible(false)}

                {/* Position */}
                <Text style={{ paddingVertical: 10, textAlign: 'center', fontWeight: 500, fontSize: 20, color: COLORS.voilet }}>{jobRequestData?.DESIGNATION_NAME}</Text>

                {/* Location & Job type */}
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ paddingHorizontal: 2, textAlignVertical: 'center', fontSize: 17 }}> <MaterialIcons name='location-pin' size={20} color={COLORS.lightBlue} /> {jobRequestData?.CITY}<Text style={{ fontWeight: 700 }}>  ∙</Text></Text>

                    <Text style={{ paddingHorizontal: 2, textAlignVertical: 'center', fontSize: 17 }}> <MaterialCommunityIcons name='office-building-outline' size={20} color={COLORS.red} /> {jobRequestData?.DPET_NAME}<Text style={{ fontWeight: 700 }}>  ∙</Text></Text>

                    <Text style={{ paddingHorizontal: 2, textAlignVertical: 'center', fontSize: 17 }}> <MaterialCommunityIcons name='clock' size={20} color={COLORS.lightOrange} /> {jobRequestData?.JOB_STATUS}</Text>

                </View>


                {/* Basic Info -> No. of position, Job type, Compensation */}
                <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: COLORS.lightGray, marginVertical: 5, paddingVertical: 15, paddingHorizontal: 10, borderRadius: 12 }}>

                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Icons name='briefcase' size={25} color={COLORS.purple} />
                        <Text style={{ paddingVertical: 5, fontWeight: 500 }}>No. of Positions</Text>
                        <Text style={{ paddingTop: 5, fontWeight: 500, color: COLORS.black }}>{jobRequestData?.NO_OF_POSITION}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <MaterialCommunityIcons name='clock' size={25} color={COLORS.lightOrange} />
                        <Text style={{ paddingVertical: 5, fontWeight: 500 }}>Job Type</Text>
                        <Text style={{ paddingTop: 5, fontWeight: 500, color: COLORS.black }}>{jobRequestData?.EMPLOYMENT_TYPE}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{ backgroundColor: COLORS.lightGreen, width: 25, borderRadius: 12.5, height: 25, padding: 2, justifyContent: 'center', alignItems: 'center' }}>
                            <Icons name='rupee' size={25} />
                        </View>
                        <Text style={{ paddingVertical: 5, fontWeight: 500 }}>Compensation</Text>
                        <Text style={{ paddingTop: 5, fontWeight: 500, color: COLORS.black }}>Rs. {jobRequestData?.COMPENSATION}</Text>
                    </View>
                </View>


                {/* More details -> Posted by, Location, experience, Date Posted */}
                <View style={{ paddingVertical: 15, paddingHorizontal: 10, marginVertical: 15, borderRadius: 12, borderWidth: 1, borderColor: COLORS.lightGray }}>

                    <Text style={{ paddingVertical: 5, fontWeight: 500 }}>Hiring Lead</Text>
                    <Text style={{ color: COLORS.black, fontWeight: 500, paddingVertical: 5, borderBottomWidth: 1, borderColor: COLORS.lightGray }}>{jobRequestData?.HIRING_LEAD_NAME}</Text>

                    <Text style={{ marginTop: 10, paddingVertical: 5, fontWeight: 500 }}>Minimum Experience </Text>
                    <Text style={{ color: COLORS.black, fontWeight: 500, paddingVertical: 5, borderBottomWidth: 1, borderColor: COLORS.lightGray }}>{jobRequestData?.MIN_EXP} years</Text>

                    <Text style={{ marginTop: 10, paddingVertical: 5, fontWeight: 500 }}>Location</Text>
                    <Text style={{ color: COLORS.black, fontWeight: 500, paddingVertical: 5, borderBottomWidth: 1, borderColor: COLORS.lightGray }}>{jobRequestData?.CITY}, {jobRequestData?.STATE_NAME}, {jobRequestData?.POSTAL_CODE}</Text>

                    <Text style={{ marginTop: 10, paddingVertical: 5, fontWeight: 500 }}>Date Posted:</Text>
                    <Text style={{ color: COLORS.black, fontWeight: 500 }}>{jobRequestData?.CREATED_DATE}</Text>
                </View>

                {/* More about the job */}
                <Text style={{ fontWeight: 600, fontSize: 20, color: COLORS.black }}>Job Remarks</Text>
                <Text>{jobRequestData?.JOB_DESCRIPTION}</Text>

                {/* Job desciption */}
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontWeight: 500, fontSize: 16, color: COLORS.black }}>Job Description</Text>
                    <TouchableOpacity style={{ backgroundColor: COLORS.lightGreen, height: 50, borderRadius: 12, padding: 10, marginVertical: 5, justifyContent: 'center' }} onPress={() => props.navigation.navigate('Job Desc', { JD })}>
                        <Text >{jobRequestData?.UPLOAD_JD_DOC} </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        ) : null)

    }

    let approveType, rejectType;

    const Type = () => {
        switch (category) {
            case "Salary Allocation":
                {
                    approveType = SalaryAction;
                    rejectType = SalaryAction;
                    return (
                        <>
                            <ScrollView>
                                <Loader loaderVisible={loaderVisible} />
                                <RenderHtml contentWidth={width} source={{ html: `${modifiedTemplate}` }} />
                                {modifiedTemplate && setLoaderVisible(false)}
                            </ScrollView>
                        </>
                    )
                }

            case "New Job Opening":
                approveType = jobOpeningAction;
                rejectType = jobOpeningAction;
                return <JobOpening />

            case "New Job Request":
                approveType = jobRequestAction;
                rejectType = jobRequestAction
                return <JobRequest />

        }
    }

    return (
        <View style={{ flex: 1 }}>

            <Type />

            {/* Approval Buttons */}
            {action === 'P' && <View style={styles.footerDesign}>
                <TouchableOpacity disabled={disableBtn} onPress={() => approveType('C')} style={[{ backgroundColor: disableBtn ? COLORS.disableGreen : COLORS.green }, styles.buttonStyle]}>

                    <MaterialCommunityIcons name="check-circle-outline" size={20} color={COLORS.white} />
                    <Text style={{ color: COLORS.white, fontWeight: '600', }}> Approve </Text>

                </TouchableOpacity>

                <TouchableOpacity onPress={() => rejectType('R')} disabled={disableBtn} style={[{ backgroundColor: disableBtn ? COLORS.disableRed : COLORS.red }, styles.buttonStyle]}>
                    <MaterialCommunityIcons name="close-circle-outline" size={20} color={COLORS.white} />
                    <Text style={{ color: COLORS.white, fontWeight: '600', }}> Reject </Text>
                </TouchableOpacity>
            </View>}

        </View>
    )
}
const styles = StyleSheet.create({
    textBox: {
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 12,
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    textArea: {
        flex: 1,
        paddingVertical: 10
    },
    headers: {
        marginVertical: 5,
        fontWeight: 500,
        color: COLORS.black,
        fontSize: 17
    },
    buttonStyle: {
        padding: 12,
        marginLeft: 24,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    footerDesign: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        height: 80,
        backgroundColor: COLORS.white,
        justifyContent: 'flex-end',
        borderTopColor: COLORS.orange,
        borderTopWidth: 1
    },
    topIcon: {
        backgroundColor: COLORS.skyBlue,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        width: 80,
        height: 80,
        borderRadius: 40,
        marginVertical: 5
    },
})
export default Details