import {
  ScrollView,
  useWindowDimensions,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import RenderHtml, {RenderHTML} from 'react-native-render-html';
import Icons from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../../components/Loader';
import SelectDropdown from 'react-native-select-dropdown';
import {API} from '../../../../utility/services';
import Toast from 'react-native-toast-message';
import {removeElement, isTag} from 'domutils';
import TextDropdown from '../../../../components/TextDropdown';
// import {TextInput} from 'react-native-gesture-handler';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {COLORS} from '../../../../constants';
import {SIZES, FONTS} from '../../../../constants';
import Header from '../../../../components/Header';
import LinearGradient from 'react-native-linear-gradient';
import {
  getInterviewList,
  getCandidateInterviewData,
} from '../../../../redux/interviewDetailSlice';

const Details = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const {width} = useWindowDimensions();
  const {
    candidate_ID,
    category,
    date,
    mail_body,
    approver,
    action,
    jobId,
    wholeList,
  } = props.route.params;

  const {candidateInterviewData} = useSelector(state => state.inteviewDetail);
  const [jobRequestData, setJobRequestData] = useState(null);
  const [jobOpeningData, setJobOpeningData] = useState(null);
  const [HTMLdata, setHTMLdata] = useState(null);
  const [data, setData] = useState(null);
  const [disableBtn, setDisableBtn] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(true);
  const userId = useSelector(state => state.auth.userId);
  let modifiedTemplate = null;

  const [hirningLead, setHiringLead] = useState([]);
  const [selectedhirningLead, setSelectedHiringLead] = useState('');
  const [selectedHiringLeadValue, setSelectedHiringLeadValue] = useState('');
  const [compensationAmount, setCompensationAmount] = useState('');
  const [numOfPosition, setNumOfPosition] = useState('');
  const [salaryRemark, setSalaryRemark] = useState('');
  var n = '';
  var rn = '';

  const [test, setTest] = useState('');
  //version 2.2 sonam 2.aug,2023

  function onElement(element) {
    // Remove the first two children of an ol tag.
    if (element.tagName === 'tr') {
      for (const child of element.children) {
        if (child.tagName === 'td') {
          // console.log(
          //   'children',
          //   child.next.children[0].name === 'b' &&
          //     child.next.children[0].children[0].data === '0',
          // );

          if (
            child.next.children[0].name === 'b' &&
            child.next.children[0].children[0].data === '0'
          )
            // hasValue = true;
            removeElement(element);
          break;
        }
      }
    }
  }

  const domVisitors = {
    onElement: onElement,
  };

  const getInterviewListData = async () => {
    const data = {
      operFlag: 'G',
      candidateId: candidate_ID,
    };
    dispatch(getCandidateInterviewData(data));
  };

  useEffect(() => {
    getDropdownData('L');
    getInterviewListData();

    // console.log("remarrrr115",JSON.stringify(data?.Table[0]?.REMARK));
    {
      switch (category) {
        case 'Salary Allocation':
          getSalaryData(), getSalaryHTMLData();
          break;
        case 'New Job Opening':
          getJobOpeningData();
          break;
        case 'New Job Request':
          getJobRequestData();
          break;
      }
    }
  }, []);

  // Title, States and Employment Data
  const getDropdownData = async P => {
    let response = await fetch(`${API}/api/User/getParam?getClaim=${P}`);
    response = await response.json();
    const returnedData = response;

    if (P === 'L') {
      setHiringLead(returnedData);
    }
  };

  // getting state value
  const checkHiringLeadValue = value => {
    {
      for (let index = 0; index < hirningLead.length; index++) {
        const element = hirningLead[index];
        if (element.PARAM_NAME === value)
          setSelectedHiringLeadValue(element.PARAM_ID);
      }
    }
  };

  const selectedDropDownText = id => {
    if (id === 'hiringLead') {
      return jobRequestData.HIRING_LEAD_NAME
        ? jobRequestData.HIRING_LEAD_NAME
        : hirningLead?.map(a => a.PARAM_NAME)[0];
    }
  };

  const selectDropDownValue = id => {
    if (id === 'hiringLead') {
      return jobRequestData.HIRING_LEAD
        ? jobRequestData.HIRING_LEAD
        : hirningLead?.map(a => a.PARAM_ID)[0];
    }
  };

  // Variables to be updated for salary allocation
  let fullName,
    contactPersonMob,
    contactPersonName,
    baseSalary,
    employerPF,
    grossAmount,
    fuelAllowance,
    dvrAllowance,
    specialAllowance,
    bonusPay,
    conveyanceAllowance,
    bikeMaintenaceAllowance,
    foodAllowance,
    HRA,
    yearbaseVariable,
    yearlybasectc,
    YearHRA,
    YearfoodAllowance,
    YearbikeMaintenaceAllowance,
    YearconveyanceAllowance,
    YearbonusPay,
    YearspecialAllowance,
    YeardvrAllowance,
    YearfuelAllowance,
    YeargrossAmount,
    YearemployerPF,
    YeartotalSalValue,
    MonthtotalSalValue,
    JobTitle,
    candidateDep,
    //V_2.2 sk
    distanceAllowance,
    yearlyDistanceAllowance,
    fieldAllowance,
    YearlyFieldAllowance,
    inchargeAllowance,
    yearlyInchargeAllowance,
    performanceAllowance,
    yearlyPerformanceAllowance,
    protfolioQualityAllowance,
    yearlyPortfolioQualityAllowance,
    leaveTravelAllowance,
    yearlyLTAllowance,
    otherReimbursement,
    yearlyOtherReimbursement,
    fuelReimbursement,
    yearFuelReimbursement,
    employeeESIC,
    yearlyEmployeeEsic,
    FoodCoupon,
    yearlyFoodCoupon,
    gratuity,
    yearlyGratuity,
    nps,
    yearlyNps;

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
    // employerEsic: data?.Table[0]?.EMPLOYER_ESIC,
    professionTax: data?.Table[0]?.PROFESSION_TAX,
    annualType: '0',
    basicSalery: '0',
    bikeMaintainace: '0',
    bonusPay: '0',
    conveyanceAllowance: '0',
    hra: '0',
    specialAllowance: '0',
    fuelReimbursement: data?.Table[0]?.FUEL_REMBURSEMENT, //V_2.2 sk
    totalAmount: '0',
    distanceAllowance: data?.Table[0]?.DISTANCE_ALLOWANCE, //V_2.2 sk
    fieldAllowance: data?.Table[0]?.FIELD_ALLOWANCE, //V_2.2 sk
    inchargeAllowance: data?.Table[0]?.INCHG_ALLOWANCE, //V_2.2 sk
    performanceAllowance: data?.Table[0]?.PRFORM_ALLOWANCE, //V_2.2 sk
    protfolioQualityAllowance: data?.Table[0]?.PORTFOL_ALLOWANCE, //V_2.2 sk
    leaveTravelAllowance: data?.Table[0]?.LEV_TRVEL_ALLOWANCE, //V_2.2 sk
    otherReimbursement: data?.Table[0]?.OTHR_REMBURS_ALLOWANCE, //V_2.2 sk
    employeeESIC: data?.Table[0]?.EMPLOYER_ESIC_ALLOWNCE, //V_2.2 sk
    FoodCoupon: data?.Table[0]?.FOOD_COUPON, //V_2.2 sk
    gratuity: data?.Table[0]?.GRATUITY_AMT, //V_2.2 sk
    nps: data?.Table[0]?.EMPLOYE_NPS, //V_2.2 sk
    driveAllowance: '0',
    esicPercentage: '0',
    foodAllowance: '0',
    Remark: salaryRemark,
    approver: '',
    salApproverId: '',
    fixedCtcMonthly: data?.Table[0]?.FIXED_CTC_MONTHLY,
    fixedCtcYearly: data?.Table[0]?.FIXED_CTC_ANNUALLY,
    employeePfCheck: data?.Table[0]?.EMPLR_PF_CHECK,
    costOfCompany: '0',
  };
  {
    console.log('remarrrr115', JSON.stringify(data?.Table[0]?.REMARK));
  }

  // for Approving salary pending approvals
  const SalaryAction = oprFlag => {
    console.log('26999', SalaryDetails, oprFlag);
    axios
      .post(`${API}/api/hrms/saveSaleryAllocation`, {
        ...SalaryDetails,
        operFlag: oprFlag,
        // Remark: salaryRemark,
      })
      .then(response => {
        // console.log("salary", SalaryDetails)
        const returnedData = response?.data;
        console.log('this is response from backend', returnedData);

        Toast.show({
          type: 'success',
          text1: returnedData?.MSG,
        });
        setDisableBtn(true);
        navigation.goBack();
      })
      .catch(error => {
        // Alert.alert('Error', error);
        // console.log("error", error)
        Toast.show({
          type: 'error',
          text1: error,
        });
      });
  };

  const jobRequestAction = async opr => {
    // console.warn("opr flag", opr);
    if (selectedhirningLead != '' && compensationAmount != '') {
      // console.log("sendData",JSON.stringify({
      //     operFlag: opr,
      //     txnId: jobId,
      //     jobLeadId: selectedHiringLeadValue,
      //     compensation: compensationAmount,
      // }))

      var formData = new FormData();
      formData.append(
        'data',
        JSON.stringify({
          operFlag: opr,
          txnId: jobId,
          jobLeadId: selectedHiringLeadValue,
          compensation: compensationAmount,
        }),
      );

      try {
        let res = await fetch(`${API}/api/hrms/jobOpeningRequest`, {
          method: 'POST',
          body: formData,
        });
        res = await res.json();
        // console.log("before", res);

        Toast.show({
          type: 'success',
          text1: res?.MSG,
        });

        if (res.FLAG === 'S') {
          props.navigation.goBack();
        }
      } catch (error) {
        // console.log(error)
        Toast.show({
          type: 'error',
          text1: error,
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Please Select hiring lead',
      });
    }
  };

  const jobOpeningAction = async opr => {
    let jobInfodata = {
      oper: opr,
      jobId: jobId,
      jobLeadId: selectedHiringLeadValue,
      compensation: compensationAmount,
    };
    jobInfodata = JSON.stringify(jobInfodata);
    // console.log(jobInfodata)
    try {
      let res = await fetch(`${API}/api/createNewJob`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: jobInfodata,
      });

      res = await res.json();
      res = res?.Result;
      // console.log("this is response from backend", res)

      Toast.show({
        type: 'success',
        text1: res[0].MSG,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error,
      });
      // console.log(error)
    }
  };

  // Fetching salary allocation template
  const getSalaryHTMLData = async () => {
    let totalData = await fetch(`${API}/api/Admin/getHiringTemplate?tempId=7`);
    totalData = await totalData.json();
    totalData = totalData.Result[0]?.MAIL_BODY;
    setHTMLdata(totalData);
    // console.log("htmlForm", totalData);
  };

  // Fetching salary allocation data
  const getSalaryData = () => {
    axios
      .post(`${API}/api/hrms/saveSaleryAllocation`, {
        operFlag: 'V',
        candidateId: candidate_ID,
      })
      .then(response => {
        const returnedData = response?.data;
        setData(returnedData);
        setSalaryRemark(data?.Table[0]?.REMARK);

        console.log('Response375.....', returnedData);
      });
  };

  // Setting the variables data coming for Salary Allocation
  const updating = () => {
    // console.log('htmldataaaaa', data);
    fullName = data.Table1[0]?.FULL_NAME;
    JobTitle = data?.Table[0]?.DESIGNATION;
    contactPersonMob = data.Table1[0]?.CONTACT_PERSON;
    contactPersonName = data.Table1[0]?.FULL_NAME;
    candidateDep = data?.Table[0]?.DEPARTMENT_NAME;
    baseSalary = data.Table[0]?.BASIC_SAL;
    HRA = data.Table[0]?.HRA;
    foodAllowance = data.Table[0]?.FOOD_ALLOWANCE;
    bikeMaintenaceAllowance = data.Table[0]?.BIKE_MANTENANCE;
    conveyanceAllowance = data.Table[0]?.CONVEYANCE_ALLOWANCE;
    bonusPay = data.Table[0]?.BONUS_PAY;
    specialAllowance = data.Table[0]?.SPECIAL_ALLOWANCE;
    dvrAllowance = data.Table[0]?.DRIVER_ALLOWANCE;
    fuelAllowance = data.Table[0]?.FUEL_ALLOWANCE;
    grossAmount = data.Table[0]?.GROSS_AMOUNT;
    employerPF = data.Table[0]?.EMPLOPYER_PF;
    distanceAllowance = data.Table[0]?.DISTANCE_ALLOWANCE; //V_2.2 sk
    fieldAllowance = data.Table[0]?.FIELD_ALLOWANCE; //V_2.2 sk
    inchargeAllowance = data.Table[0]?.INCHG_ALLOWANCE; //V_2.2 sk
    performanceAllowance = data.Table[0]?.PRFORM_ALLOWANCE; //V_2.2 sk
    protfolioQualityAllowance = data.Table[0]?.PORTFOL_ALLOWANCE; //V_2.2 sk
    leaveTravelAllowance = data.Table[0]?.LEV_TRVEL_ALLOWANCE; //V_2.2 sk
    otherReimbursement = data.Table[0]?.OTHR_REMBURS_ALLOWANCE; //V_2.2 sk
    fuelReimbursement = data.Table[0]?.FUEL_REMBURSEMENT; //V_2.2 sk
    employeeESIC = data.Table[0]?.EMPLOYER_ESIC_ALLOWNCE; //V_2.2 sk
    FoodCoupon = data.Table[0]?.FOOD_COUPON; //V_2.2 sk
    gratuity = data.Table[0]?.GRATUITY_AMT; //V_2.2 sk
    nps = data.Table[0]?.EMPLOYE_NPS; //V_2.2 sk
    ctc = data.Table[0]?.BRKP_CTC;

    yearlyNps = Number(nps) * 12; //V_2.2 sk
    yearlyGratuity = Number(gratuity) * 12; //V_2.2 sk
    yearlyFoodCoupon = Number(FoodCoupon) * 12; //V_2.2 sk
    yearlyEmployeeEsic = Number(employeeESIC) * 12; //V_2.2 sk
    yearFuelReimbursement = Number(fuelReimbursement) * 12; //V_2.2 sk
    yearlyOtherReimbursement = Number(otherReimbursement) * 12; //V_2.2 sk
    yearlyLTAllowance = Number(leaveTravelAllowance) * 12; //V_2.2 sk
    yearlyPortfolioQualityAllowance = Number(protfolioQualityAllowance) * 12; //V_2.2 sk
    yearlyPerformanceAllowance = Number(performanceAllowance) * 12; //V_2.2 sk
    yearlyInchargeAllowance = Number(inchargeAllowance) * 12; //V_2.2 sk
    yearlyDistanceAllowance = Number(distanceAllowance) * 12; //V_2.2 sk
    YearlyFieldAllowance = Number(fieldAllowance) * 12; //V_2.2 sk
    yearbaseVariable = Number(baseSalary) * 12;
    yearlybasectc = Number(ctc) * 12;
    YearHRA = Number(HRA) * 12;
    YearfoodAllowance = Number(foodAllowance) * 12;
    YearbikeMaintenaceAllowance = Number(bikeMaintenaceAllowance) * 12;
    YearconveyanceAllowance = Number(conveyanceAllowance) * 12;
    YearbonusPay = Number(bonusPay) * 12;
    YearspecialAllowance = Number(specialAllowance) * 12;
    YeardvrAllowance = Number(dvrAllowance) * 12;
    YearfuelAllowance = Number(fuelAllowance) * 12;
    YeargrossAmount = Number(grossAmount) * 12;
    YearemployerPF = Number(employerPF) * 12;

    // Monthly value
    MonthtotalSalValue = Number(ctc);
    // Number(baseSalary) + Number(HRA) + Number(foodAllowance) + Number(bikeMaintenaceAllowance) + Number(conveyanceAllowance) + Number(bonusPay) + Number(specialAllowance) + Number(dvrAllowance) + Number(fuelAllowance) + Number(grossAmount) + Number(employerPF)
    //     //V_2.2 sk
    //     + Number(distanceAllowance) + Number(fieldAllowance) + Number(inchargeAllowance) + Number(performanceAllowance) + Number(protfolioQualityAllowance) + Number(leaveTravelAllowance) + Number(otherReimbursement) + Number(fuelReimbursement) + Number(employeeESIC) + Number(FoodCoupon) + Number(gratuity) + Number(nps)

    //Total Year Value
    YeartotalSalValue = Number(yearlybasectc);
    // Number(yearbaseVariable) + Number(YearHRA) + Number(YearfoodAllowance) + Number(YearbikeMaintenaceAllowance) + Number(YearconveyanceAllowance) + Number(YearbonusPay) + Number(YearspecialAllowance) + Number(YeardvrAllowance) + Number(YearfuelAllowance) + Number(YeargrossAmount) + Number(YearemployerPF)
    //     //V_2.2 sk
    //     + Number(yearlyDistanceAllowance) + Number(YearlyFieldAllowance) + Number(yearlyInchargeAllowance) + Number(yearlyPerformanceAllowance) + Number(yearlyDistanceAllowance) + Number(yearlyPortfolioQualityAllowance) + Number(yearlyLTAllowance) + Number(yearlyOtherReimbursement) + Number(yearFuelReimbursement) + Number(yearlyEmployeeEsic) + Number(yearlyFoodCoupon) + Number(yearlyGratuity) + Number(yearlyNps)

    // console.log('ctttctctct', data.Table[0]?.BRKP_CTC);
  };

  // Updating the HTML data for Salary Allocation
  const updateHTML = () => {
    data ? updating() : null;
    return data && HTMLdata
      ? // console.warn(fullName),

        HTMLdata.replace('NameVariable', fullName ? fullName : 'fullName')
          .replaceAll(
            'DesignationVariable',
            JobTitle === '' ? 'DesignationVariable' : JobTitle,
          )
          .replaceAll(
            'contactPersonVarMob',
            contactPersonMob == '' ? 'contactPersonVarMob' : contactPersonMob,
          )
          .replaceAll(
            'contactPersonVarName',
            contactPersonName == ''
              ? 'contactPersonVarName'
              : contactPersonName,
          )
          // .replaceAll("ContractionsVariable", candidateBeforeValue == "" ? "ContractionsVariable" : candidateBeforeValue)
          // .replaceAll("CompensationVariable", compensation == "" ? "CompensationVariable" : compensation)
          // .replaceAll('DateVariable', startDate == "" ? "DateVariable" : dateOfIssue)

          // .replaceAll('NameVariable', candidateName == "" ? 'NameVariable' : candidateName)
          .replaceAll(
            'DepartmentVariable',
            candidateDep == '' ? 'DepartmentVariable' : candidateDep,
          )
          .replaceAll('MonthBaseVariable', baseSalary == '0' ? '0' : baseSalary)
          .replaceAll(
            'YearBaseVariable',
            yearbaseVariable == '0' ? '0' : yearbaseVariable,
          )
          .replaceAll('MonthHRAVariable', HRA == '0' ? '0' : HRA)
          .replaceAll('YearHRAVariable', YearHRA == '0' ? '0' : YearHRA)
          .replaceAll(
            'MonthlyfoodVariable',
            foodAllowance == '0' ? '0' : foodAllowance,
          )
          .replaceAll(
            'YearlyfoodVariable',
            YearfoodAllowance == '0' ? '0' : YearfoodAllowance,
          )
          .replaceAll(
            'MonthBikeVariable',
            bikeMaintenaceAllowance == '0' ? '0' : bikeMaintenaceAllowance,
          )
          .replaceAll(
            'YearBikeVariable',
            YearbikeMaintenaceAllowance == '0'
              ? '0'
              : YearbikeMaintenaceAllowance,
          )
          .replaceAll(
            'MonthConveyanceVariable',
            conveyanceAllowance == '0' ? '0' : conveyanceAllowance,
          )
          .replaceAll(
            'YearlyConveyanceVariable',
            YearconveyanceAllowance == '0' ? '0' : YearconveyanceAllowance,
          )
          .replaceAll('MonthBonusVariable', bonusPay == '0' ? '0' : bonusPay)
          .replaceAll(
            'YearlyBonusVariable',
            YearbonusPay == '0' ? '0' : YearbonusPay,
          )
          .replaceAll(
            'MonthSpecialVariable',
            specialAllowance == '0' ? '0' : specialAllowance,
          )
          .replaceAll(
            'YearSpecialVariable',
            YearspecialAllowance == '0' ? '0' : YearspecialAllowance,
          )
          .replaceAll(
            'MonthdvrVariable',
            dvrAllowance == '0' ? '0' : dvrAllowance,
          )
          .replaceAll(
            'YeardvrVariable',
            YeardvrAllowance == '0' ? '0' : YeardvrAllowance,
          )
          .replaceAll(
            'MonthFuelVariable',
            fuelAllowance == '0' ? '0' : fuelAllowance,
          )
          .replaceAll(
            'YearFuelVariable',
            YearfuelAllowance == '0' ? '0' : YearfuelAllowance,
          )
          .replaceAll(
            'MonthGrossVariable',
            grossAmount == '0' ? '0' : grossAmount,
          )
          .replaceAll(
            'YearGrossVariable',
            YeargrossAmount == '0' ? '0' : YeargrossAmount,
          )
          .replaceAll('MonthemployerPF', employerPF == '0' ? '0' : employerPF)
          .replaceAll(
            'YearemployerPF',
            YearemployerPF == '0' ? '0' : YearemployerPF,
          )
          .replaceAll(
            'MonthTotalCompVariable',
            MonthtotalSalValue == '0' ? '0' : MonthtotalSalValue,
          )
          .replaceAll(
            'MonthDistanceVariable',
            distanceAllowance == '0' ? '0' : distanceAllowance,
          ) //V_2.2 sk
          .replaceAll(
            'MonthFieldVariable',
            fieldAllowance == '0' ? '0' : fieldAllowance,
          ) //V_2.2 sk
          .replaceAll(
            'MonthInchgVariable',
            inchargeAllowance == '0' ? '0' : inchargeAllowance,
          ) //V_2.2 sk
          .replaceAll(
            'YearlyDistanceVariable',
            yearlyDistanceAllowance == '0' ? '0' : yearlyDistanceAllowance,
          ) //V_2.2 sk
          .replaceAll(
            'YearInchgVariable',
            yearlyInchargeAllowance == '0' ? '0' : yearlyInchargeAllowance,
          ) //V_2.2 sk
          .replaceAll(
            'YearFieldVariable',
            YearlyFieldAllowance == '0' ? '0' : YearlyFieldAllowance,
          ) //V_2.2 sk
          .replaceAll(
            'MonthPrformVariable',
            performanceAllowance == '0' ? '0' : performanceAllowance,
          ) //V_2.2 sk
          .replaceAll(
            'YearPrformVariable',
            yearlyPerformanceAllowance == '0'
              ? '0'
              : yearlyPerformanceAllowance,
          ) //V_2.2 sk
          .replaceAll(
            'MonthPortfolVariable',
            protfolioQualityAllowance == '0' ? '0' : protfolioQualityAllowance,
          ) //V_2.2 sk
          .replaceAll(
            'YearPortfolVariable',
            yearlyPortfolioQualityAllowance == '0'
              ? '0'
              : yearlyPortfolioQualityAllowance,
          ) //V2.2 sk
          .replaceAll(
            'MonthLeaveTrvlVariable',
            leaveTravelAllowance == '0' ? '0' : leaveTravelAllowance,
          ) //V_2.2 sk
          .replaceAll(
            'YearLeaveTrvlVariable',
            yearlyLTAllowance == '0' ? '0' : yearlyLTAllowance,
          ) //V_2.2 sk
          .replaceAll(
            'MonthOthrReimbrslVariable',
            otherReimbursement == '0' ? '0' : otherReimbursement,
          ) //V_2.2 sk
          .replaceAll(
            'YearOthrReimbrslVariable',
            yearlyOtherReimbursement == '0' ? '0' : yearlyOtherReimbursement,
          ) //V_2.2 sk
          .replaceAll(
            'MonthFuelRembrsVariable',
            fuelReimbursement == '0' ? '0' : fuelReimbursement,
          ) //V_2.2 sk
          .replaceAll(
            'YearFuelRembrsVariable',
            yearFuelReimbursement == '0' ? '0' : yearFuelReimbursement,
          ) //V_2.2 sk
          .replaceAll(
            'MonthEmployerEsicVariable',
            employeeESIC == '0' ? '0' : employeeESIC,
          ) //V_2.2 sk
          .replaceAll(
            'YearEmployerEsicVariable',
            yearlyEmployeeEsic == '0' ? '0' : yearlyEmployeeEsic,
          ) //V_2.2 sk
          .replaceAll(
            'MonthFoodCouponVariable',
            FoodCoupon == '0' ? '0' : FoodCoupon,
          ) //V_2.2 sk
          .replaceAll(
            'YearFoodCouponVariable',
            yearlyFoodCoupon == '0' ? '0' : yearlyFoodCoupon,
          ) //V_2.2 sk
          .replaceAll('MonthGratuityVariable', gratuity == '0' ? '0' : gratuity) //V_2.2 sk
          .replaceAll(
            'YearGratuityVariable',
            yearlyGratuity == '0' ? '0' : yearlyGratuity,
          ) //V_2.2 sk
          .replaceAll('MonthNPSVariable', nps == '0' ? '0' : nps) //V_2.2 sk
          .replaceAll('yearNPSVariable', yearlyNps == '0' ? '0' : yearlyNps) //V_2.2 sk
          .replaceAll(
            'YearTotalCompVariable',
            YeartotalSalValue == '0' ? '0' : YeartotalSalValue,
          )
      : null;
  };

  // function call for updating the HTML for Salary Allocation
  modifiedTemplate = updateHTML();

  // Fetching data for new job request
  const getJobRequestData = async () => {
    let formData = new FormData();
    formData.append(
      'data',
      JSON.stringify({operFlag: 'V', txnId: jobId, userId: userId}),
    );
    // console.log("first", formData._parts)
    let res = await fetch(`${API}/api/hrms/jobOpeningRequest`, {
      method: 'POST',
      body: formData,
    });
    res = await res?.json();
    // console.log("after", res)
    res = await res?.Table[0];
    console.log('responsedataJobb req', res);
    setJobRequestData(res);
    setCompensationAmount(res?.COMPENSATION);
    setSelectedHiringLead(res?.HIRING_LEAD_NAME);
    setNumOfPosition(res?.NO_OF_POSITION);
    setSelectedHiringLeadValue(res?.HIRING_LEAD_ID);
    // console.log("jobrequestsssssssssssssssss", res?.COMPENSATION);
  };

  // Fetching data for new job opening
  const getJobOpeningData = async () => {
    let res = await fetch(
      `${API}/api/getJobs?jobStatus=0&jobId=${jobId}&leadId&userId`,
    );
    // console.warn(jobId);
    res = await res?.json();
    res = await res?.Table[0];
    // console.log("jobOpening", res)
    setJobOpeningData(res);
    setCompensationAmount(res?.COMPENSATION);
    setSelectedHiringLead(res?.HIRING_LEAD_NAME);
    setSelectedHiringLeadValue(res?.HIRING_LEAD_ID);

    // console.warn(res);
  };

  // Displaying data for new job opening
  const JobOpening = () => {
    return (
      <>
        <ScrollView
          style={{backgroundColor: COLORS.white, padding: 10, flex: 1}}>
          <Loader loaderVisible={loaderVisible} />
          {/* Top Icon */}
          <View style={styles.topIcon}>
            <View
              style={[
                {
                  backgroundColor: COLORS.lightBlue,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                },
              ]}>
              <Icons name="building-o" color={COLORS.white} size={35} />
            </View>
          </View>

          {/* Position */}
          <Text
            style={{
              paddingVertical: 10,
              textAlign: 'center',
              fontWeight: '500',
              fontSize: 20,
              color: COLORS.voilet,
            }}>
            {jobOpeningData?.JOB_TITLE}
          </Text>

          {/* Location & Job type */}
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text
              style={{
                paddingHorizontal: 2,
                textAlignVertical: 'center',
                fontSize: 16,
              }}>
              {' '}
              <MaterialIcons
                name="location-pin"
                size={20}
                color={COLORS.lightBlue}
              />{' '}
              {jobOpeningData?.CITY}
              <Text style={{fontWeight: '700'}}> ∙</Text>
            </Text>

            <Text
              style={{
                paddingHorizontal: 2,
                textAlignVertical: 'center',
                fontSize: 16,
              }}>
              {' '}
              <MaterialCommunityIcons
                name="office-building-outline"
                size={20}
                color={COLORS.red}
              />{' '}
              {jobOpeningData?.DEPARTMENT_NAME}
              <Text style={{fontWeight: '700'}}> ∙</Text>
            </Text>

            <Text
              style={{
                paddingHorizontal: 2,
                textAlignVertical: 'center',
                fontSize: 16,
              }}>
              {' '}
              <MaterialIcons
                name="pending-actions"
                color={COLORS.pink}
                size={20}
              />{' '}
              {jobOpeningData?.JOB_STATUS}
            </Text>
          </View>

          {/* Basic Info -> No. of position, Job type, Compensation */}
          <View
            style={{
              borderWidth: 1,
              borderColor: COLORS.lightGray,
              marginVertical: 5,
              paddingVertical: 15,
              paddingHorizontal: 10,
              borderRadius: 12,
            }}>
            <View style={{flexDirection: 'row', paddingVertical: 5}}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Icons name="briefcase" size={25} color={COLORS.purple} />
                <Text style={{paddingVertical: 5, fontWeight: '500'}}>
                  Opening
                </Text>
                <Text
                  style={{
                    paddingTop: 5,
                    fontWeight: '500',
                    color: COLORS.black,
                  }}>
                  {jobOpeningData?.NO_OF_POSITIONS}
                </Text>
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <MaterialCommunityIcons
                  name="clock"
                  size={25}
                  color={COLORS.lightOrange}
                />
                <Text style={{paddingVertical: 5, fontWeight: '500'}}>
                  Job Type
                </Text>
                <Text
                  style={{
                    paddingTop: 5,
                    fontWeight: '500',
                    color: COLORS.black,
                  }}>
                  {jobOpeningData?.E_TYPE}
                </Text>
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <View
                  style={{
                    backgroundColor: COLORS.lightGreen,
                    width: 25,
                    borderRadius: 12.5,
                    height: 25,
                    padding: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icons name="rupee" size={25} />
                </View>
                <Text style={{paddingVertical: 5, fontWeight: '500'}}>
                  Compensation
                </Text>
                {/* <Text style={{ paddingTop: 5, fontWeight: 500, color: COLORS.black }}>Rs. {jobOpeningData?.COMPENSATION}</Text> */}
                <TextInput
                  defaultValue={compensationAmount}
                  onChangeText={value => (n = value)}
                  onEndEditing={() => setCompensationAmount(n)}
                  style={{
                    borderWidth: 0.5,
                    borderColor: COLORS.lightGray,
                    height: 40,
                    marginTop: 5,
                    borderRadius: 8,
                    paddingHorizontal: 8,
                  }}
                  keyboardType="number-pad"
                  maxLength={10}
                />
              </View>
            </View>

            <View style={{flexDirection: 'row', paddingVertical: 5}}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <MaterialCommunityIcons
                  name="cash-check"
                  color={COLORS.red}
                  size={30}
                />
                <Text style={{paddingVertical: 5, fontWeight: '500'}}>
                  Budget
                </Text>
                <Text
                  style={{
                    paddingTop: 5,
                    fontWeight: '500',
                    color: COLORS.black,
                  }}>
                  {jobOpeningData?.BUDGET}
                </Text>
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <MaterialIcons
                  name="pending-actions"
                  color={COLORS.pink}
                  size={30}
                />
                <Text style={{paddingVertical: 5, fontWeight: '500'}}>
                  Job Status
                </Text>
                <Text
                  style={{
                    paddingTop: 5,
                    fontWeight: '500',
                    color: COLORS.black,
                  }}>
                  {jobOpeningData?.JOB_STATUS1}
                </Text>
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <View
                  style={{
                    backgroundColor: COLORS.lightGreen,
                    width: 30,
                    borderRadius: 15,
                    height: 30,
                    padding: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons name="apache-kafka" size={28} />
                </View>
                <Text style={{paddingVertical: 5, fontWeight: '500'}}>
                  Experience
                </Text>
                <Text
                  style={{
                    paddingTop: 5,
                    fontWeight: '500',
                    color: COLORS.black,
                  }}>
                  {' '}
                  {jobOpeningData?.EXPERIENCE} years
                </Text>
              </View>
            </View>
          </View>

          {/* More details -> Posted by, Location, experience, Date Posted */}
          <View
            style={{
              paddingVertical: 15,
              paddingHorizontal: 10,
              marginVertical: 15,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: COLORS.lightGray,
            }}>
            <Text style={{paddingVertical: 5, fontWeight: '500'}}>
              Hiring Lead
            </Text>
            {/* <Text style={{ color: COLORS.black, fontWeight: 500, paddingVertical: 5, borderBottomWidth: 1, borderColor: COLORS.lightGray }}>{jobOpeningData?.HIRING_LEAD_NAME}</Text> */}
            <TextDropdown
              caption={'Hiring Lead'}
              data={hirningLead}
              setData={setSelectedHiringLead}
              setIdvalue={setSelectedHiringLeadValue}
              defaultButtonText={selectedhirningLead}
              // captionStyle={{ color: COLORS.green, ...FONTS.h4 }}
            />

            <Text
              style={{marginTop: 10, paddingVertical: 5, fontWeight: '500'}}>
              Address
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontWeight: '500',
                paddingVertical: 5,
                borderBottomWidth: 1,
                borderColor: COLORS.lightGray,
              }}>
              {jobOpeningData?.CITY}, {jobOpeningData?.PROVINCE_NAME},{' '}
              {jobOpeningData?.COUNTRY_NAME}
            </Text>

            <Text
              style={{marginTop: 10, paddingVertical: 5, fontWeight: '500'}}>
              Job Remarks
            </Text>
            {/* <Text style={{ color: COLORS.black, fontWeight: 500 }}>{jobOpeningData?.JOB_DESC}</Text> */}
            <RenderHTML
              source={{html: jobOpeningData?.JOB_DESC}}
              contentWidth={responsiveWidth(100)}
            />
          </View>
          {jobOpeningData && setLoaderVisible(false)}
        </ScrollView>
      </>
    );
  };

  // Displaying data new for job request
  const JobRequest = () => {
    // console.warn("Job request Data", jobRequestData);

    let JD = jobRequestData?.UPLOAD_JD_DOC;
    return jobRequestData != null ? (
      <ScrollView style={{flex: 1, backgroundColor: COLORS.white, padding: 10}}>
        <Loader loaderVisible={loaderVisible} />
        {/* Top Icons */}
        <View style={styles.topIcon}>
          <View
            style={[
              {
                backgroundColor: COLORS.lightBlue,
                justifyContent: 'center',
                alignItems: 'center',
                width: 60,
                height: 60,
                borderRadius: 30,
              },
            ]}>
            <Icons name="building-o" color={COLORS.white} size={35} />
          </View>
        </View>

        {jobRequestData && setLoaderVisible(false)}

        {/* Position */}
        <Text
          style={{
            paddingVertical: 10,
            textAlign: 'center',
            fontWeight: '500',
            fontSize: 20,
            color: COLORS.voilet,
          }}>
          {jobRequestData?.DESIGNATION_NAME}
        </Text>

        {/* Location & Job type */}
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text
            style={{
              paddingHorizontal: 2,
              textAlignVertical: 'center',
              fontSize: 17,
            }}>
            {' '}
            <MaterialIcons
              name="location-pin"
              size={20}
              color={COLORS.lightBlue}
            />{' '}
            {jobRequestData?.CITY}
            <Text style={{fontWeight: '700'}}> ∙</Text>
          </Text>

          <Text
            style={{
              paddingHorizontal: 1,
              textAlignVertical: 'center',
              fontSize: 17,
            }}>
            {' '}
            <MaterialCommunityIcons
              name="office-building-outline"
              size={20}
              color={COLORS.red}
            />{' '}
            {jobRequestData?.DPET_NAME}
            <Text style={{fontWeight: '700'}}> ∙</Text>
          </Text>

          <Text
            style={{
              paddingHorizontal: 2,
              textAlignVertical: 'center',
              fontSize: 17,
            }}>
            {' '}
            <MaterialCommunityIcons
              name="clock"
              size={20}
              color={COLORS.lightOrange}
            />{' '}
            {jobRequestData?.JOB_STATUS}
          </Text>
        </View>

        {/* Basic Info -> No. of position, Job type, Compensation */}
        <View
          style={{
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: COLORS.lightGray,
            marginVertical: 5,
            paddingVertical: 15,
            paddingHorizontal: 10,
            borderRadius: 12,
          }}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Icons name="briefcase" size={25} color={COLORS.purple} />
            <Text style={{paddingVertical: 5, fontWeight: '500'}}>
              No. of Positions
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: -10,
              }}>
              {/* <Text style={{ fontWeight: '400', color: COLORS.black }}>Rs.</Text> */}
              <TextInput
                defaultValue={numOfPosition}
                onChangeText={value => (n = value)}
                onEndEditing={() => setNumOfPosition(n)}
                style={{
                  borderWidth: 0.5,
                  borderColor: COLORS.lightGray,
                  height: 40,
                  width: '30%',
                  textAlign: 'center',
                  marginTop: 5,
                  borderRadius: 8,
                }}
                keyboardType="number-pad"
                maxLength={10}
              />
            </View>

            {/* <Text style={{ paddingTop: 5, fontWeight: 500, color: COLORS.black }}>{jobRequestData?.NO_OF_POSITION}</Text> */}
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <MaterialCommunityIcons
              name="clock"
              size={25}
              color={COLORS.lightOrange}
            />
            <Text style={{paddingVertical: 5, fontWeight: '500'}}>
              Job Type
            </Text>
            <Text
              style={{paddingTop: 5, fontWeight: '500', color: COLORS.black}}>
              {jobRequestData?.EMPLOYMENT_TYPE}
            </Text>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: COLORS.lightGreen,
                width: 25,
                borderRadius: 12.5,
                height: 25,
                padding: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icons name="rupee" size={25} />
            </View>
            <Text style={{paddingVertical: 5, fontWeight: '500'}}>
              Compensation/M
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: -10,
              }}>
              <Text style={{fontWeight: '500', color: COLORS.black}}>Rs.</Text>
              <TextInput
                defaultValue={compensationAmount}
                onChangeText={value => (n = value)}
                onEndEditing={() => setCompensationAmount(n)}
                style={{
                  borderWidth: 0.5,
                  borderColor: COLORS.lightGray,
                  height: 40,
                  marginTop: 5,
                  borderRadius: 8,
                  paddingHorizontal: 8,
                }}
                keyboardType="number-pad"
                maxLength={10}
              />
            </View>
          </View>
        </View>

        {/* More details -> Posted by, Location, experience, Date Posted */}
        <View
          style={{
            paddingVertical: 15,
            paddingHorizontal: 10,
            marginVertical: 15,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: COLORS.lightGray,
          }}>
          {/* <Text style={{ paddingVertical: 5, fontWeight: 500 }}>Hiring Lead</Text>
                    <Text style={{ color: COLORS.black, fontWeight: 500, paddingVertical: 5, borderBottomWidth: 1, borderColor: COLORS.lightGray }}>{jobRequestData?.HIRING_LEAD_NAME}</Text> */}

          {/* <View style={{ height: 75, }}> */}
          {/* <Text style={{ paddingVertical: 5, fontWeight: 500 }}>Hiring Lead</Text>
                        <SelectDropdown 
                        search
                         data={hirningLead?.map(a => a.PARAM_NAME)}
                          buttonStyle={[styles.inputHolder]} 
                          onSelect={(value) => { setSelectedHiringLead(value), checkHiringLeadValue(value) }}
                           defaultButtonText={selectedDropDownText("hiringLead")}
                            defaultValueByIndex={selectDropDownValue("hiringLead")} buttonTextStyle={{ fontSize: 15, color: COLORS.black }} /> */}
          {/* <Text>{JSON.stringify(hirningLead)}</Text> */}
          <TextDropdown
            caption={'Hiring Lead'}
            data={hirningLead}
            setData={setSelectedHiringLead}
            setIdvalue={setSelectedHiringLeadValue}
            defaultButtonText={selectedhirningLead}
            // captionStyle={{ color: COLORS.green, ...FONTS.h4 }}
          />
          {/* </View> */}

          <Text style={{marginTop: 10, paddingVertical: 5, fontWeight: '500'}}>
            Minimum Experience{' '}
          </Text>
          <Text
            style={{
              color: COLORS.black,
              fontWeight: '500',
              paddingVertical: 5,
              borderBottomWidth: 1,
              borderColor: COLORS.lightGray,
            }}>
            {jobRequestData?.MIN_EXP} years
          </Text>

          <Text style={{marginTop: 10, paddingVertical: 5, fontWeight: '500'}}>
            Location
          </Text>
          <Text
            style={{
              color: COLORS.black,
              fontWeight: '500',
              paddingVertical: 5,
              borderBottomWidth: 1,
              borderColor: COLORS.lightGray,
            }}>
            {jobRequestData?.CITY}, {jobRequestData?.STATE_NAME},{' '}
            {jobRequestData?.POSTAL_CODE}
          </Text>

          <Text style={{marginTop: 10, paddingVertical: 5, fontWeight: '500'}}>
            Date Posted:
          </Text>
          <Text style={{color: COLORS.black, fontWeight: '500'}}>
            {jobRequestData?.CREATED_DATE}
          </Text>
        </View>

        {/* More about the job */}
        <Text style={{fontWeight: '600', fontSize: 20, color: COLORS.black}}>
          Job Remarks
        </Text>
        <Text>{jobRequestData?.JOB_DESCRIPTION}</Text>

        {/* Job desciption */}
        <View style={{marginVertical: 10}}>
          <Text style={{fontWeight: '500', fontSize: 16, color: COLORS.black}}>
            Job Description
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.lightGreen,
              height: 50,
              borderRadius: 12,
              padding: 10,
              marginVertical: 5,
              justifyContent: 'center',
            }}
            onPress={() => props.navigation.navigate('Job Desc', {JD})}>
            <Text>{jobRequestData?.UPLOAD_JD_DOC} </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    ) : null;
  };

  let approveType, rejectType;

  const Type = () => {
    switch (category) {
      case 'Salary Allocation': {
        approveType = SalaryAction;
        rejectType = SalaryAction;
        return (
          <ScrollView>
            <Loader loaderVisible={loaderVisible} />
            <RenderHtml
              domVisitors={domVisitors}
              contentWidth={width}
              source={{html: `${modifiedTemplate}`}}
            />
            {modifiedTemplate && setLoaderVisible(false)}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                paddingVertical: SIZES.radius,
                backgroundColor: COLORS.white,
                marginTop: -10,
                width: responsiveWidth(95),
                alignSelf: 'center',
                borderRadius: SIZES.radius,
              }}>
              {/* <Text
            style={{
              ...FONTS.h3,
              fontWeight: '700',
              color: COLORS.black,
            }}>
            Candidate Information
          </Text>
         */}

              <View
                style={{
                  backgroundColor: COLORS.disableOrange1,
                  padding: SIZES.base,
                  borderRadius: 50,
                }}>
                <Image
                  source={require('../../../../assets/images/candidate_info.png')}
                  style={{
                    height: 65,
                    width: 65,
                  }}
                />
              </View>

              <View>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 16,
                    fontWeight: '600',
                  }}>
                  Candidate Information
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                  }}>
                  Tap here to see candidate details
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Candidate_basic_info', {
                        candidateId: candidateInterviewData?.CANDIDATE_ID,
                      });
                    }}
                    style={{
                      marginTop: 12,
                    }}>
                    <LinearGradient
                      colors={[COLORS.orange1, COLORS.disableOrange1]}
                      start={{x: 0, y: 0}}
                      end={{x: 2, y: 0}}
                      style={{borderRadius: 50, padding: 8, width: 90}}>
                      <Text
                        style={{
                          color: COLORS.white,
                          ...FONTS.h4,
                          textAlign: 'center',
                          paddingVertical: 3,
                        }}>
                        Details
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Candidate_details', {
                        resume: candidateInterviewData?.RESUME,
                        name: candidateInterviewData?.CANDIDATE_NAME,
                        designation: candidateInterviewData?.JOB_TITLE,
                        date: candidateInterviewData?.SCHEDULED_DATE,
                        interviewEndTime: `${candidateInterviewData?.SCHEDULE_TIME_TO}-${candidateInterviewData?.SCHEDULE_TIME_FROM}`,
                        interviewStartTime:
                          candidateInterviewData?.SCHEDULE_TIME_TO,
                        status: candidateInterviewData?.STATUS,
                        candidateId: candidateInterviewData?.CANDIDATE_ID,
                        interviewId: candidateInterviewData?.INTERVIEW_ID,
                        interviewType: candidateInterviewData?.INTERVIEW_TYPE,
                        interviewMail: candidateInterviewData?.INTERVIEW_MAIL,
                        profilePic: candidateInterviewData?.PROFILE_PIC,
                      });
                    }}
                    style={{
                      marginTop: 12,
                    }}>
                    <LinearGradient
                      colors={[COLORS.orange1, COLORS.disableOrange1]}
                      start={{x: 0, y: 0}}
                      end={{x: 2, y: 0}}
                      style={{borderRadius: 50, padding: 8, width: 110}}>
                      <Text
                        style={{
                          color: COLORS.white,
                          ...FONTS.h4,
                          textAlign: 'center',
                          paddingVertical: 3,
                        }}>
                        Assesment
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View
              style={{
                marginVertical: SIZES.base,
                marginHorizontal: SIZES.radius,
              }}>
              <Text
                style={{
                  color: COLORS.black,
                  ...FONTS.h4,
                  marginBottom: SIZES.base,
                }}>
                Remarks
                 {/* {JSON.stringify(salaryRemark)} */}
              </Text>
              {/* <TextInput
                placeholder="Remarks"
                style={{
                  backgroundColor: COLORS.white,
                  borderRadius: SIZES.radius,
                  borderWidth: 1,
                  borderColor: COLORS.lightGray1,
                }}
                value={salaryRemark}
                onChangeText={setSalaryRemark}
              /> */}

              <TextInput
                defaultValue={salaryRemark}
                // onChangeText={setSalaryRemark}
                onChangeText={value => (rn = value)}
                onEndEditing={() => setSalaryRemark(rn)}
                style={{
                  borderWidth: 0.5,
                  borderColor: COLORS.lightGray,
                  height: 40,
                  color: COLORS.black,
                  marginTop: 5,
                  borderRadius: 8,
                  paddingHorizontal: 8,
                }}
              />
            </View>
          </ScrollView>
        );
      }

      case 'New Job Opening':
        approveType = jobOpeningAction;
        rejectType = jobOpeningAction;
        return <JobOpening />;

      case 'New Job Request':
        approveType = jobRequestAction;
        rejectType = jobRequestAction;
        return <JobRequest />;
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header title={'Salary allocation'} />

      <View
        style={{
          flex: 1,
        }}>
        <Type />

        {/* {console.log('candidateData', candidateInterviewData)} */}
      </View>

      {/* Approval Buttons */}
      {action === 'P' && (
        <View style={styles.footerDesign}>
          <TouchableOpacity
            // disabled={disableBtn}
            onPress={() => approveType('C')}
            style={[
              {
                backgroundColor: disableBtn
                  ? COLORS.disableGreen
                  : COLORS.green,
              },
              styles.buttonStyle,
            ]}>
            <MaterialCommunityIcons
              name="check-circle-outline"
              size={20}
              color={COLORS.white}
            />
            <Text style={{color: COLORS.white, fontWeight: '600'}}>
              {' '}
              Approve{' '}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => rejectType('R')}
            // disabled={disableBtn}
            style={[
              {backgroundColor: disableBtn ? COLORS.disableRed : COLORS.red},
              styles.buttonStyle,
            ]}>
            <MaterialCommunityIcons
              name="close-circle-outline"
              size={20}
              color={COLORS.white}
            />
            <Text style={{color: COLORS.white, fontWeight: '600'}}>
              {' '}
              Reject{' '}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  textBox: {
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 12,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  textArea: {
    flex: 1,
    paddingVertical: 10,
  },
  headers: {
    marginVertical: 5,
    fontWeight: '500',
    color: COLORS.black,
    fontSize: 17,
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
    borderTopWidth: 1,
  },
  topIcon: {
    backgroundColor: COLORS.skyBlue,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    marginVertical: 5,
  },

  inputHolder: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    flex: 1,
    borderRadius: 10,
    marginHorizontal: 0,
    marginVertical: 5,
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
export default Details;
