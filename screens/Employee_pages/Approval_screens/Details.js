import { ScrollView, useWindowDimensions, View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import RenderHtml from 'react-native-render-html';
import COLORS from '../../../constants/theme';
import Icons from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Details = (props) => {
    const { width } = useWindowDimensions();
    const { keys, category, date, mail_body, approver, action } = props.route.params

    // Variables to be updated
    let fullName, contactPersonMob, contactPersonName, baseSalary, employerPF, grossAmount, fuelAllowance, dvrAllowance, specialAllowance, bonusPay, conveyanceAllowance, bikeMaintenaceAllowance, foodAllowance, HRA, yearbaseVariable, YearHRA, YearfoodAllowance, YearbikeMaintenaceAllowance, YearconveyanceAllowance, YearbonusPay, YearspecialAllowance, YeardvrAllowance, YearfuelAllowance, YeargrossAmount, YearemployerPF, YeartotalSalValue, MonthtotalSalValue

    const [HTMLdata, setHTMLdata] = useState(null)
    const [data, setData] = useState(null)
    const [disableBtn, setDisableBtn] = useState(false);

    // Salary details
    var SalaryDetails = {
        txnId: data?.Table[0]?.TXN_ID,
        userId: 10011,
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
        operFlag: 'C',
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


    const approveDetail = () => {
        axios.post('https://econnectsatya.com:7033/api/hrms/saveSaleryAllocation', { ...SalaryDetails })
            .then(response => {
                const returnedData = response?.data;
                console.log(returnedData);
                Alert.alert('Approved', returnedData?.MSG);
                setDisableBtn(true);
            })
            .catch(error => {
                Alert.alert('Error', error);
            });
    };

    const rejectDetail = () => {
        axios.post('https://econnectsatya.com:7033/api/hrms/saveSaleryAllocation', { ...SalaryDetails, operFlag: 'R' })
            .then(response => {
                const returnedData = response?.data;
                Alert.alert('Rejected', returnedData?.MSG);
                setDisableBtn(true);
            })
            .catch(error => {
                Alert.alert('Error', error);
            });
    };

    const getHTMLdata = async () => {
        let totalData = await fetch('https://econnectsatya.com:7033/api/Admin/getHiringTemplate?tempId=7')
        totalData = await totalData.json()
        totalData = totalData.Result[0]?.MAIL_BODY
        setHTMLdata(totalData)
    }


    const getData = () => {
        axios.post('https://econnectsatya.com:7033/api/hrms/saveSaleryAllocation', {
            operFlag: "V",
            candidateId: keys
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
        contactPersonMob = data.Table1[0]?.CONTACT_PERSON
        contactPersonName = data.Table1[0]?.FULL_NAME
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
        // console.warn("this is data " + data);
        data ? updating() : null

        return (
            data && HTMLdata ?
                (
                    // console.warn(fullName),
                    // console.warn(HTMLdata),
                    HTMLdata
                        .replace("NameVariable", fullName ? fullName : "fullName")
                        // .replaceAll("DesignationVariable", JobTitle == "" ? "DesignationVariable" : JobTitle)
                        .replaceAll("contactPersonVarMob", contactPersonMob == "" ? "contactPersonVarMob" : contactPersonMob)
                        .replaceAll("contactPersonVarName", contactPersonName == "" ? "contactPersonVarName" : contactPersonName)
                        // .replaceAll("ContractionsVariable", candidateBeforeValue == "" ? "ContractionsVariable" : candidateBeforeValue)
                        // .replaceAll("CompensationVariable", compensation == "" ? "CompensationVariable" : compensation)
                        // .replaceAll('DateVariable', startDate == "" ? "DateVariable" : dateOfIssue)
                        // .replaceAll('JoiningVariable', effTo == "" ? "JoiningVariable" : dateOfJoining)
                        // .replaceAll('NameVariable', candidateName == "" ? 'NameVariable' : candidateName)
                        // .replaceAll('DepartmentVariable', candidateDep == "" ? 'DepartmentVariable' : candidateDep)
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

    let modifiedTemplate = updateHTML()

    useEffect(() => {
        getData();
        getHTMLdata();
    }, [])
    // this is for new job opening
    const JobOpening = () => {
        return (
            <View style={{ flex: 1, marginHorizontal: 10, justifyContent: 'center' }}>

                <View style={{ marginVertical: 10 }}>
                    <Text style={styles.headers}>Applied Date</Text>
                    <View style={styles.textBox}>
                        <Text style={styles.textArea}>{date}</Text>
                        <Icons name='calendar' color={COLORS.pink} size={25} />
                    </View>
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text style={styles.headers}>Detail</Text>
                    <View style={styles.textBox}>
                        <Text style={styles.textArea}>{mail_body}</Text>
                    </View>
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text style={styles.headers}>Pending By</Text>
                    <View style={styles.textBox}>
                        <Text style={styles.textArea}>{approver}</Text>
                        <MaterialIcons name='pending-actions' color={COLORS.pink} size={25} />
                    </View>
                </View>

            </View>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            {category !== "New Job Opening" ?
                (
                    // salary allocation
                    <ScrollView>
                        <RenderHtml contentWidth={width} source={{ html: `${modifiedTemplate}` }} />
                    </ScrollView>
                ) :
                // new job opening 
                (<JobOpening />)
            }

            {/* Approval Buttons */}
            {action === 'P' ? <View style={styles.footerDesign}>
                <TouchableOpacity disabled={disableBtn} onPress={() => approveDetail()} style={[{ backgroundColor: disableBtn ? COLORS.disableGreen : COLORS.green }, styles.buttonStyle]}>

                    <MaterialCommunityIcons name="check-circle-outline" size={20} color={COLORS.white} />
                    <Text style={{ color: COLORS.white, fontWeight: '600', }}> Approve </Text>

                </TouchableOpacity>

                <TouchableOpacity onPress={() => rejectDetail()} disabled={disableBtn} style={[{ backgroundColor: disableBtn ? COLORS.disableRed : COLORS.red }, styles.buttonStyle]}>
                    <MaterialCommunityIcons name="close-circle-outline" size={20} color={COLORS.white} />
                    <Text style={{ color: COLORS.white, fontWeight: '600', }}> Reject </Text>
                </TouchableOpacity>
            </View> : null}

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
        justifyContent: 'flex-end'
    }
})
export default Details