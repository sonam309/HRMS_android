import { ScrollView, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import RenderHtml from 'react-native-render-html';

const Data = (props) => {
    const { width } = useWindowDimensions();
    const { keys } = props.route.params

    let fullName, contactPersonMob, contactPersonName, baseSalary, employerPF, grossAmount, fuelAllowance, dvrAllowance, specialAllowance, bonusPay, conveyanceAllowance, bikeMaintenaceAllowance, foodAllowance, HRA, yearbaseVariable, YearHRA, YearfoodAllowance, YearbikeMaintenaceAllowance, YearconveyanceAllowance, YearbonusPay, YearspecialAllowance, YeardvrAllowance, YearfuelAllowance, YeargrossAmount, YearemployerPF, YeartotalSalValue, MonthtotalSalValue

    const [HTMLdata, setHTMLdata] = useState(null)
    const [data, setData] = useState(null)

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

    return (
        <ScrollView>
            <RenderHtml contentWidth={width} source={{ html: `${modifiedTemplate}` }} />
        </ScrollView>
    )
}

export default Data