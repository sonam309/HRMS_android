import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ToastAndroid, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import Loader from '../../../../components/Loader'
import COLORS from '../../../../constants/theme'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import RenderHtml from 'react-native-render-html';
import { useSelector } from 'react-redux'
import axios from 'axios'

const SalaryAllocation = (props) => {
    const userId = useSelector(state => state.auth.userId)
    const { width } = useWindowDimensions();

    const { candidate_ID, action } = props
    const [loaderVisible, setLoaderVisible] = useState(true);
    const [disableBtn, setDisableBtn] = useState(false);
    const [HTMLdata, setHTMLdata] = useState(null)
    const [data, setData] = useState(null)

    // Variables to be updated for salary allocation
    let fullName, contactPersonMob, contactPersonName, baseSalary, employerPF, grossAmount, fuelAllowance, dvrAllowance, specialAllowance, bonusPay, conveyanceAllowance, bikeMaintenaceAllowance, foodAllowance, HRA, yearbaseVariable, YearHRA, YearfoodAllowance, YearbikeMaintenaceAllowance, YearconveyanceAllowance, YearbonusPay, YearspecialAllowance, YeardvrAllowance, YearfuelAllowance, YeargrossAmount, YearemployerPF, YeartotalSalValue, MonthtotalSalValue, JobTitle, candidateDep, modifiedTemplate = null;

    useEffect(() => {
        getSalaryData()
        getSalaryHTMLData()
    }, [])

    // Fetching salary allocation template
    const getSalaryHTMLData = async () => {
        let totalData = await fetch('https://econnectsatya.com:7033/api/Admin/getHiringTemplate?tempId=7')
        totalData = await totalData.json()
        totalData = totalData.Result[0]?.MAIL_BODY
        setHTMLdata(totalData)
    }

    // Fetching salary allocation data
    const getSalaryData = async () => {
        let response = await fetch('https://econnectsatya.com:7033/api/hrms/saveSaleryAllocation', {
            method: "POST",
            headers: { Accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({ operFlag: "V", candidateId: candidate_ID })
        })
        response = await response.json()
        // console.log(response)
        setData(response)
    }

    // Setting the variables data coming for Salary Allocation
    const updatingValues = () => {
        // console.log("inside updating",data);
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
        annualType: data?.Table[0]?.ANNUAL_TYPE,
        basicSalery: data?.Table[0]?.BASIC_SAL,
        bikeMaintainace: data?.Table[0]?.BIKE_MANTENANCE,
        bonusPay: data?.Table[0]?.BONUS_PAY,
        conveyanceAllowance: data?.Table[0]?.CONVEYANCE_ALLOWANCE,
        hra: data?.Table[0]?.HRA,
        specialAllowance: data?.Table[0]?.SPECIAL_ALLOWANCE,
        fuelRembursment: data?.Table[0]?.FUEL_REMBURSEMENT,
        totalAmount: data?.Table[0]?.TOTAL_AMT,
        distanceAllowance: data?.Table[0]?.DISTANCE_ALLOWANCE,
        driveAllowance: data?.Table[0]?.DRIVER_ALLOWANCE,
        esicPercentage: data?.Table[0]?.EISC_PERCENTAGE,
        foodAllowance: data?.Table[0]?.FOOD_ALLOWANCE,
        Remark: data?.Table[0]?.REMARKS,
        approver: data?.Table[0]?.APPROVER,
        salApproverId: '0',
        fixedCtcMonthly: data?.Table[0]?.FIXED_CTC_MONTHLY,
        fixedCtcYearly: data?.Table[0]?.FIXED_CTC_ANNUALLY,
        employeePfCheck: data?.Table[0]?.EMPLR_PF_CHECK,
        costOfCompany: '0',
    };

    // for Approving salary pending approvals
    const SalaryAction = (oprFlag) => {
        axios.post('https://econnectsatya.com:7033/api/hrms/saveSaleryAllocation', { ...SalaryDetails, operFlag: oprFlag })
            .then(response => {
                // console.log("salary", SalaryDetails)
                const returnedData = response?.data;
                // console.log("this is response from backend", returnedData);
                ToastAndroid.show(returnedData?.MSG, 3000)
                setDisableBtn(true);
            })
            .catch(error => {
                // Alert.alert('Error', error);
                console.log("error", error)
            });
    };

    const removingRows = () => {

    }

    // Updating the HTML data for Salary Allocation
    const replacingValues = () => {
        updatingValues()
        return (
            HTMLdata
                .replaceAll("NameVariable", fullName ? fullName : "fullName")
                .replaceAll("DesignationVariable", JobTitle === "" ? "DesignationVariable" : JobTitle)
                .replaceAll("contactPersonVarMob", contactPersonMob === "" ? "contactPersonVarMob" : contactPersonMob)
                .replaceAll("contactPersonVarName", contactPersonName === "" ? "contactPersonVarName" : contactPersonName)
                // .replaceAll("ContractionsVariable", candidateBeforeValue == "" ? "ContractionsVariable" : candidateBeforeValue)
                // .replaceAll("CompensationVariable", compensation == "" ? "CompensationVariable" : compensation)
                // .replaceAll('DateVariable', startDate == "" ? "DateVariable" : dateOfIssue)

                // .replaceAll('NameVariable', candidateName == "" ? 'NameVariable' : candidateName)
                .replaceAll('DepartmentVariable', candidateDep === "" ? 'DepartmentVariable' : candidateDep)
                .replaceAll('MonthBaseVariable', baseSalary === "0" ? '0' : baseSalary)
                .replaceAll('YearBaseVariable', yearbaseVariable === "0" ? '0' : yearbaseVariable)
                .replaceAll('MonthHRAVariable', HRA === "0" ? '0' : HRA)
                .replaceAll('YearHRAVariable', YearHRA === "0" ? '0' : YearHRA)
                .replaceAll('MonthlyfoodVariable', foodAllowance === "0" ? '0' : foodAllowance)
                .replaceAll('YearlyfoodVariable', YearfoodAllowance === "0" ? '0' : YearfoodAllowance)
                .replaceAll('MonthBikeVariable', bikeMaintenaceAllowance === "0" ? '0' : bikeMaintenaceAllowance)
                .replaceAll('YearBikeVariable', YearbikeMaintenaceAllowance === "0" ? '0' : YearbikeMaintenaceAllowance)
                .replaceAll('MonthConveyanceVariable', conveyanceAllowance === "0" ? '0' : conveyanceAllowance)
                .replaceAll('YearlyConveyanceVariable', YearconveyanceAllowance === "0" ? '0' : YearconveyanceAllowance)
                .replaceAll('MonthBonusVariable', bonusPay === "0" ? '0' : bonusPay)
                .replaceAll('YearlyBonusVariable', YearbonusPay === "0" ? '0' : YearbonusPay)
                .replaceAll('MonthSpecialVariable', specialAllowance === "0" ? '0' : specialAllowance)
                .replaceAll('YearSpecialVariable', YearspecialAllowance === "0" ? '0' : YearspecialAllowance)
                .replaceAll('MonthdvrVariable', dvrAllowance === "0" ? '0' : dvrAllowance)
                .replaceAll('YeardvrVariable', YeardvrAllowance === "0" ? '0' : YeardvrAllowance)
                .replaceAll('MonthFuelVariable', fuelAllowance === "0" ? '0' : fuelAllowance)
                .replaceAll('YearFuelVariable', YearfuelAllowance === "0" ? '0' : YearfuelAllowance)
                .replaceAll('MonthGrossVariable', grossAmount === "0" ? '0' : grossAmount)
                .replaceAll('YearGrossVariable', YeargrossAmount === "0" ? '0' : YeargrossAmount)
                .replaceAll('MonthemployerPF', employerPF === "0" ? '0' : employerPF)
                .replaceAll('YearemployerPF', YearemployerPF === "0" ? '0' : YearemployerPF)
                .replaceAll('MonthTotalCompVariable', MonthtotalSalValue === "0" ? '0' : MonthtotalSalValue)
                .replaceAll('YearTotalCompVariable', YeartotalSalValue === "0" ? '0' : YeartotalSalValue))

    }

    { data && HTMLdata && ((modifiedTemplate = replacingValues()), removingRows()) }


    return (
        <>
            <ScrollView>
                <Loader loaderVisible={loaderVisible} />
                <RenderHtml contentWidth={width} source={{ html: `${modifiedTemplate}` }} onHTMLLoaded={() => setLoaderVisible(false)} />
            </ScrollView>

            {/* Approval Buttons */}
            {action === 'P' && <View style={styles.footerDesign}>
                <TouchableOpacity disabled={disableBtn} onPress={() => SalaryAction('C')} style={[{ backgroundColor: disableBtn ? COLORS.disableGreen : COLORS.green }, styles.buttonStyle]}>

                    <MaterialCommunityIcons name="check-circle-outline" size={20} color={COLORS.white} />
                    <Text style={{ color: COLORS.white, fontWeight: '600', }}> Approve </Text>

                </TouchableOpacity>

                <TouchableOpacity onPress={() => SalaryAction('R')} disabled={disableBtn} style={[{ backgroundColor: disableBtn ? COLORS.disableRed : COLORS.red }, styles.buttonStyle]}>
                    <MaterialCommunityIcons name="close-circle-outline" size={20} color={COLORS.white} />
                    <Text style={{ color: COLORS.white, fontWeight: '600', }}> Reject </Text>
                </TouchableOpacity>
            </View>}

        </>
    )
}

const styles = StyleSheet.create({
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
})

export default SalaryAllocation