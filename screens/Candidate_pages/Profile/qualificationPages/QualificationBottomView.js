import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import {COLORS, FONTS, SIZES} from '../../../../constants';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {API} from '../../../../utility/services';
import Toast from 'react-native-toast-message';
import TextDropdown from '../../../../components/TextDropdown';
import Loader from '../../../../components/Loader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {showAlert, closeAlert} from 'react-native-customisable-alert';

const QualificationBottomView = ({
  qualification,
  onPress,
  fetchQualificationData,
}) => {
  const userId = useSelector(state => state.candidateAuth.candidateId);

  const [showForm, setShowForm] = useState(false);

  const [operFlag, setOperFlag] = useState('A');

  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedStateValue, setSelectedStateValue] = useState('');

  const [country, setCountry] = useState([]);
  const [selectCountry, setselectCountry] = useState('');
  const [selectedCountryValue, setSelecetCountryValue] = useState('');

  const [Qualifications, setQualifications] = useState([]);
  const [selectQualifications, setSelectQualifications] = useState('');
  const [selectedQualificationsValue, setSelectedQualificationsValue] =
    useState('');

  const [qualificationMode, setQualificationMode] = useState([]);
  const [selectedQualiMode, setSelectedQualiMode] = useState('');
  const [selectedQualiModeValue, setSelectedQualiModeValue] = useState('');

  const [stream, setStream] = useState([]);
  const [selectedStream, setSelectedStream] = useState('');
  const [selectedStreamValue, setSelectedStreamValue] = useState('');

  const [specilization, setSpecilization] = useState('');
  const [University, setUniversity] = useState('');
  const [institute, setInstitute] = useState('');
  const [city, setCity] = useState('');
  const [fromYear, setFromYear] = useState('');
  const [passYear, setPassingYear] = useState();
  const [rollNum, setRollNum] = useState('');

  const [isHighestQualification, setIsHighestQualification] = useState(false);
  const [grade, setGrade] = useState('');
  const [TXNID, setTXNID] = useState('');
  const [approvalFlag, setApprovalFlag] = useState('');
  const [approveRemark, setApproveRemarks] = useState('');
  const [loaderVisible, setLoaderVisible] = useState(false);

  useEffect(() => {
    getDropdownData(7);
    getDropdownData(4);
    getDropdownData(33);
    getDropdownData(34);
    getDropdownData(35);
    getQualificationData();
  }, []);

  // Title, States and Employment Data
  const getDropdownData = async P => {
    let response = await fetch(`${API}/api/User/getParam?getClaim=${P}`);
    response = await response.json();
    const returnedData = response;

    if (P === 7) {
      setStates(returnedData);
    } else if (P === 4) {
      setCountry(returnedData);
    } else if (P === 33) {
      setQualifications(returnedData);
    } else if (P === 34) {
      setQualificationMode(returnedData);
    } else if (P === 35) {
      setStream(returnedData);
    }
  };

  const DeleteQualification = async ({txnID}) => {
    try {
      let qualificationData = {
        txnId: txnID,
        operFlag: 'D',
        userId: userId,
      };
      // console.warn(qualificationData);
      setLoaderVisible(true);
      let res = await fetch(`${API}/api/hrms/candidateQualification`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(qualificationData),
      });
      res = await res.json();
      res = await res?.Result[0]?.MSG;
      setLoaderVisible(false);
      fetchQualificationData();
      Toast.show({
        type: 'success',
        text1: res,
      });
    } catch (error) {
      setLoaderVisible(false);
      Toast.show({
        type: 'error',
        text1: error,
      });
    }
  };

  const getQualificationData = async () => {
    let qualficationData = {operFlag: 'V', candidateId: userId};
    let res = await fetch(`${API}/api/hrms/candidateQualification`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(qualficationData),
    });
    res = await res.json();
    // res = await res?.Result;
    console.log('qualficationDataaaaaa', res);
    setApproveRemarks(res[0]?.DOC_REJ_REMARK);
    setApprovalFlag(res[0]?.APPROVAL_FLAG);
  };

  const updateQualification = item => {
    // console.log("getQualifications", item);
    item.FLAG === 'S' ? setOperFlag('E') : setOperFlag('A');
    setSpecilization(item?.SPECIALIZATION);
    setUniversity(item?.UNIVERSITY);
    setInstitute(item?.INSTITUTE);
    setCity(item?.CITY);
    setFromYear(item?.FROM_YEAR);
    setPassingYear(item?.PASS_YEAR);

    setIsHighestQualification(item?.IS_HIGHEST_QUALIFICATION);

    setSelectQualifications(item?.QUALIFICATIONS_NAME);
    setSelectedQualificationsValue(item?.QUALIFICATIONS_ID);

    setSelectedStream(item?.STREAM);
    setSelectedStreamValue(item?.STREAM_ID);

    setSelectedQualiMode(item?.QUALIFICATION_MODE);
    setSelectedQualiModeValue(item?.QUALIFICATION_MODE_ID);

    setselectCountry(item?.COUNTRY);
    // setSelecetCountryValue(item?.COUNTRY_ID);

    setSelectedState(item?.STATE_NAME);
    setSelectedStateValue(item?.STATE_ID);
    setTXNID(item?.TXN_ID);
    setGrade(item?.PER_GRADE);
    // setRollNum(item?.ROLL_NO);

    setShowForm(true);

    // console.log("editdata", edit);
  };

  const saveQualificationDetails = async () => {
    // console.log("selectedQualifications", selectQualifications);
    if (selectQualifications !== undefined) {
      try {
        const qualificationData = {
          txnId: TXNID,
          candidateId: userId,
          qualifications: selectedQualificationsValue,
          stream: selectedStreamValue,
          specilization: specilization,
          university: University,
          institute: institute,
          qualificatinMode: selectedQualiModeValue,
          country: 'India',
          state: selectedStateValue,
          city: city,
          fromYear: fromYear,
          passYear: passYear,
          isHighestQualification: isHighestQualification,
          userId: userId,
          operFlag: operFlag,
          percentage: grade,
          rollNo: rollNum,
        };

        // console.log("request", qualificationData);
        setLoaderVisible(true);
        let res = await fetch(`${API}/api/hrms/candidateQualification`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(qualificationData),
        });
        res = await res.json();
        res = await res?.Result[0]?.MSG;
        // console.log("QualificationResponse", res);
        setLoaderVisible(false);
        onPress();
        Toast.show({
          type: 'success',
          text1: res,
        });
      } catch (error) {
        setLoaderVisible(false);
        Toast.show({
          type: 'error',
          text1: error,
        });
      }
    } else {
      setLoaderVisible(false);
      Toast.show({
        type: 'error',
        text1: 'Please select Qualificataions',
      });
    }
  };

  const selectedDropDownText = id => {
    if (id === 'qualification') {
      return selectQualifications
        ? selectQualifications
        : Qualifications?.map(a => a.PARAM_NAME)[0];
    } else if (id === 'Stream') {
      return selectedStream
        ? selectedStream
        : stream?.map(a => a.PARAM_NAME)[0];
    } else if (id === 'QualificationMode') {
      return selectedQualiMode
        ? selectedQualiMode
        : qualificationMode?.map(a => a.PARAM_NAME)[0];
    } else if (id === 'country') {
      return selectCountry ? selectCountry : country?.map(a => a.PARAM_NAME)[0];
    } else if (id === 'state') {
      return selectedState ? selectedState : states?.map(a => a.PARAM_NAME)[0];
    }
  };

  const selectDropDownValue = id => {
    if (id === 'qualification') {
      return selectedQualificationsValue
        ? selectedQualificationsValue
        : Qualifications?.map(a => a.PARAM_ID)[0];
    } else if (id === 'Stream') {
      return selectedStreamValue
        ? selectedStreamValue
        : stream?.map(a => a.PARAM_ID)[0];
    } else if (id === 'QualificationMode') {
      return selectedQualiModeValue
        ? selectedQualiModeValue
        : qualificationMode?.map(a => a.PARAM_ID)[0];
    } else if (id === 'country') {
      return selectedCountryValue
        ? selectedCountryValue
        : country?.map(a => a.PARAM_ID)[0];
    } else if (id === 'state') {
      return selectedStateValue
        ? selectedStateValue
        : states?.map(a => a.PARAM_ID)[0];
    }
  };

  // getting state value
  const checkStreamValue = value => {
    {
      for (let index = 0; index < stream.length; index++) {
        const element = stream[index];
        if (element.PARAM_NAME === value)
          setSelectedStreamValue(element.PARAM_ID);
      }
    }
  };

  // getting state value
  const checkStateValue = value => {
    {
      for (let index = 0; index < states.length; index++) {
        const element = states[index];
        if (element.PARAM_NAME === value)
          setSelectedStateValue(element.PARAM_ID);
      }
    }
  };
  // getting country value
  const checkCountryValue = value => {
    {
      for (let index = 0; index < country.length; index++) {
        const element = country[index];
        if (element.PARAM_NAME === value)
          setSelecetCountryValue(element.PARAM_ID);
      }
    }
  };

  // getting Qualifications  value
  const checkQualificationsValue = value => {
    {
      for (let index = 0; index < Qualifications.length; index++) {
        const element = Qualifications[index];
        if (element.PARAM_NAME === value)
          setSelectedQualificationsValue(element.PARAM_ID);
      }
    }
  };

  // getting QualificationsMode  value
  const checkQualificationsModeValue = value => {
    {
      for (let index = 0; index < qualificationMode.length; index++) {
        const element = qualificationMode[index];
        if (element.PARAM_NAME === value)
          setSelectedQualiModeValue(element.PARAM_ID);
      }
    }
  };

  const QualificationDetails = () => {
    return (
      <View style={{padding: 4}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontWeight: 700, color: 'black'}}>
            Language Details:{' '}
          </Text>

          <TouchableOpacity
            onPress={() => setShowForm(true)}
            style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
            <Text>ADD</Text>
            <Icons name="plus" size={16} />
          </TouchableOpacity>
        </View>

        {qualification.map((item, index) => (
          <DisplayQualification item={item} key={index} />
        ))}
      </View>
    );
  };

  // for displaying single language details
  const DisplayQualification = ({item, key}) => {
    return (
      <View
        key={key}
        style={{
          backgroundColor: COLORS.disableOrange1,
          padding: 6,
          borderRadius: 12,
          marginVertical: 4,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: COLORS.orange1, fontWeight: 500}}>
            {item.QUALIFICATIONS_NAME}{' '}
          </Text>
          {/* <Icons position='absolute' onPress={() => DeleteQualification({ txnID: item.TXN_ID })} right={0} name='trash-can-outline' color={COLORS.green} size={20} />
                    <Icons position='absolute' onPress={() => updateQualification(item)} right={20} name='square-edit-outline' color={COLORS.green} size={20} /> */}

          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 0,
              padding: 5,
            }}
            onPress={() => DeleteQualification({txnID: item.TXN_ID})}>
            <Icons name="trash-can-outline" color={COLORS.green} size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 30,
              padding: 5,
            }}
            onPress={() => updateQualification(item)}>
            <Icons name="square-edit-outline" color={COLORS.green} size={20} />
          </TouchableOpacity>
        </View>
        <Text style={{fontWeight: 600}}>
          Stream:- <Text style={{fontWeight: 400}}>{item.STREAM}</Text>
        </Text>
        <Text style={{fontWeight: 600}}>
          Roll No:- <Text style={{fontWeight: 400}}>{item.ROLL_NO}</Text>
        </Text>
        <Text style={{fontWeight: 600}}>
          University:- <Text style={{fontWeight: 400}}>{item.UNIVERSITY}</Text>
        </Text>
        <Text style={{fontWeight: 600}}>
          Institute:- <Text style={{fontWeight: 400}}>{item.INSTITUTE}</Text>
        </Text>
        <Text style={{fontWeight: 600}}>
          Mode:-{' '}
          <Text style={{fontWeight: 400}}>{item.QUALIFICATION_MODE}</Text>
        </Text>
        <Text style={{fontWeight: 600}}>
          Batch:-{' '}
          <Text style={{fontWeight: 400}}>
            {item.FROM_YEAR} - {item.PASS_YEAR}
          </Text>
        </Text>
        <Text style={{fontWeight: 600}}>
          Location:-{' '}
          <Text style={{fontWeight: 400}}>
            {item.CITY}, {item.STATE_NAME}, {item.COUNTRY}
          </Text>
        </Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <Text style={{...FONTS.h3, fontSize: 20, color: COLORS.orange}}>
          Qualifications
        </Text>

        {approvalFlag !== null && approvalFlag === 'R' ? (
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => {
              showAlert({
                title: approveRemark,
                customIcon: 'none',
                message: '',
                alertType: 'error',
                btnLabel: 'ok',
                onPress: () => closeAlert(),
              });
            }}>
            <Icons name="alert-circle-outline" size={25} color={COLORS.red} />
          </TouchableOpacity>
        ) : (
          ''
        )}

        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            width: '100%',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity onPress={onPress}>
            <Icons
              name="close-circle-outline"
              size={30}
              color={COLORS.orange}
            />
          </TouchableOpacity>
        </View>
      </View>
      {loaderVisible ? (
        <View style={{alignItems: 'center', marginTop: '30%'}}>
          <ActivityIndicator color={COLORS.orange1} />
          <Text
            style={{
              ...FONTS.h3,
              fontWeight: '500',
              color: COLORS.orange1,
              marginTop: SIZES.base,
            }}>
            Loading your details
          </Text>
        </View>
      ) : (
        <KeyboardAwareScrollView
          extraScrollHeight={270}
          behavior={'padding'}
          enableAutomaticScroll={true}
          keyboardShouldPersistTaps={'always'}
          style={{flex: 1, marginBottom: 170}}
          contentContainerStyle={{
            paddingBottom: 170,
          }}
          showsVerticalScrollIndicator={false}>
          {/* <ScrollView showsVerticalScrollIndicator={false}> */}
          {/* Qualifications dropdown */}

          {/* <Text>{JSON.stringify(qualification)}</Text> */}
          {!showForm &&
          qualification &&
          qualification[0]?.QUALIFICATIONS_NAME &&
          qualification.length > 0 ? (
            <QualificationDetails />
          ) : (
            <View>
              <View style={{}}>
                <TextDropdown
                  caption={'Qualifications'}
                  data={Qualifications}
                  setData={setSelectQualifications}
                  setIdvalue={setSelectedQualificationsValue}
                  defaultButtonText={selectQualifications}
                  captionStyle={{color: COLORS.green, ...FONTS.h4}}
                />

                {/* <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Qualifications</Text>
                            <SelectDropdown data={Qualifications?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setSelectQualifications(value), checkQualificationsValue(value) }} defaultButtonText={selectedDropDownText("qualification")} defaultValueByIndex={selectDropDownValue("qualification")} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} /> */}
              </View>

              {/* Stream dropdown */}
              <View style={{marginTop: 10}}>
                <TextDropdown
                  caption={'Stream'}
                  data={stream}
                  setData={setSelectedStream}
                  setIdvalue={setSelectedStreamValue}
                  defaultButtonText={selectedStream}
                  captionStyle={{color: COLORS.green, ...FONTS.h4}}
                />

                {/* <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Stream</Text>
                            <SelectDropdown data={stream?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setSelectedStream(value), checkStreamValue(value) }} defaultButtonText={selectedDropDownText("Stream")} defaultValueByIndex={selectDropDownValue("Stream")} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} /> */}
              </View>

              {/* Specialization */}
              <View style={{height: 75, marginTop: 10}}>
                <Text style={{color: COLORS.green, ...FONTS.body4}}>
                  Specialization
                </Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: COLORS.black,
                    borderRadius: 12,
                    height: 45,
                    paddingLeft: 5,
                  }}
                  placeholder=""
                  onChangeText={setSpecilization}
                  value={specilization}
                />
              </View>

              <View style={{height: 75, marginTop: 10}}>
                <Text style={{color: COLORS.green, ...FONTS.body4}}>
                  Roll Number
                </Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: COLORS.black,
                    borderRadius: 12,
                    height: 45,
                    paddingLeft: 5,
                  }}
                  placeholder=""
                  onChangeText={setRollNum}
                  value={rollNum}
                />
              </View>

              {/* Grades */}
              <View style={{height: 75, marginTop: 10}}>
                <Text style={{color: COLORS.green, ...FONTS.body4}}>
                  Percentage(CGPA)
                </Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: COLORS.black,
                    borderRadius: 12,
                    height: 45,
                    paddingLeft: 5,
                  }}
                  placeholder=""
                  onChangeText={setGrade}
                  value={grade}
                  keyboardType="numeric"
                  maxLength={5}
                />
              </View>

              {/* Institute dropdown */}
              <View style={{height: 75, marginTop: 10}}>
                <Text style={{color: COLORS.green, ...FONTS.body4}}>
                  Institute
                </Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: COLORS.black,
                    borderRadius: 12,
                    height: 45,
                    paddingLeft: 5,
                  }}
                  placeholder="Institute Name"
                  onChangeText={setInstitute}
                  value={institute}
                />
              </View>

              {/* University dropdown */}
              <View style={{height: 75, marginTop: 10}}>
                <Text style={{color: COLORS.green, ...FONTS.body4}}>
                  University
                </Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: COLORS.black,
                    borderRadius: 12,
                    height: 45,
                    paddingLeft: 5,
                  }}
                  placeholder=""
                  onChangeText={setUniversity}
                  value={University}
                />
              </View>

              {/* From year */}
              <View style={{height: 75, marginTop: 10}}>
                <Text style={{color: COLORS.green, ...FONTS.body4}}>
                  From Year
                </Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: COLORS.black,
                    borderRadius: 12,
                    height: 45,
                    paddingLeft: 5,
                  }}
                  placeholder="yyyy"
                  onChangeText={setFromYear}
                  value={fromYear}
                  keyboardType="numeric"
                  maxLength={4}
                />
              </View>

              {/* Passing year */}
              <View style={{height: 75, marginTop: 10}}>
                <Text style={{color: COLORS.green, ...FONTS.body4}}>
                  Passing Year
                </Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: COLORS.black,
                    borderRadius: 12,
                    height: 45,
                    paddingLeft: 5,
                  }}
                  placeholder="yyyy"
                  onChangeText={setPassingYear}
                  value={passYear}
                  keyboardType="numeric"
                  maxLength={4}
                />
              </View>

              {/* Qualifications mode dropdown */}
              <View style={{marginTop: 10}}>
                <TextDropdown
                  caption={'Qualifications Mode'}
                  data={qualificationMode}
                  setData={setSelectedQualiMode}
                  setIdvalue={setSelectedQualiModeValue}
                  defaultButtonText={selectedQualiMode}
                  captionStyle={{color: COLORS.green, ...FONTS.h4}}
                />

                {/* <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Qualifications Mode</Text>
                            <SelectDropdown data={qualificationMode?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setSelectedQualiMode(value), checkQualificationsModeValue(value) }} defaultButtonText={selectedDropDownText("QualificationMode")} defaultValueByIndex={selectDropDownValue("QualificationMode")} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} /> */}
              </View>

              {/* City dropdown */}
              <View style={{height: 75, marginTop: 10}}>
                <Text style={{color: COLORS.green, ...FONTS.body4}}>City</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: COLORS.black,
                    borderRadius: 12,
                    height: 45,
                    paddingLeft: 5,
                  }}
                  placeholder="City"
                  onChangeText={setCity}
                  value={city}
                />
              </View>

              {/* State dropdown */}
              <View style={{marginTop: 10}}>
                <TextDropdown
                  caption={'State'}
                  data={states}
                  setData={setSelectedState}
                  setIdvalue={setSelectedStateValue}
                  defaultButtonText={selectedState}
                  captionStyle={{color: COLORS.green, ...FONTS.h4}}
                />

                {/* <Text style={{ color: COLORS.green, ...FONTS.body4 }}>State</Text>
                            <SelectDropdown data={states?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setSelectedState(value), checkStateValue(value) }} defaultButtonText={selectedDropDownText("state")} defaultValueByIndex={selectDropDownValue("state")} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} /> */}
              </View>

              {/* Country dropdown */}
              {/* <View style={{ marginTop: 10 }}>

                                <TextDropdown
                                    caption={'Country'}
                                    data={country}
                                    setData={setselectCountry}
                                    setIdvalue={setSelecetCountryValue}
                                    defaultButtonText={selectCountry}
                                    captionStyle={{ color: COLORS.green, ...FONTS.h4 }}
                                /> */}

              <Text
                style={{
                  color: 'green',
                  paddingHorizontal: 6,
                  paddingVertical: 3,
                }}>
                Country<Text style={{color: 'red', fontWeight: 500}}>*</Text>
              </Text>
              <TextInput
                style={[
                  styles.inputHolder,
                  {
                    color: COLORS.darkGray2,
                    textAlign: 'center',
                    borderRadius: 6,
                  },
                ]}
                value={'India'}
              />

              {/* <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Country</Text>
                            <SelectDropdown data={country?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setselectCountry(value), checkCountryValue(value) }} defaultButtonText={selectedDropDownText("country")} defaultValueByIndex={selectDropDownValue("country")} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} /> */}
              {/* </View> */}

              {/* hieghest Qualification check  */}
              <View
                style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() =>
                    setIsHighestQualification(
                      isHighestQualification == 'true' ? 'false' : 'true',
                    )
                  }
                  style={{
                    alignItems: 'center',
                    width: '90%',
                    padding: SIZES.base,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: COLORS.green,
                      ...FONTS.body3,
                      textAlign: 'center',
                    }}>
                    Is Highest Qualification
                  </Text>
                  {isHighestQualification === 'true' ? (
                    <Icons
                      name="checkbox-marked-circle-outline"
                      size={25}
                      color={COLORS.orange}
                    />
                  ) : (
                    <Icons
                      name="checkbox-blank-circle-outline"
                      size={25}
                      color={COLORS.orange}
                    />
                  )}
                  {/* </View> */}
                </TouchableOpacity>
              </View>

              {/* save button */}
              {approvalFlag !== null && approvalFlag !== 'A' ? (
                <TouchableOpacity onPress={() => saveQualificationDetails()}>
                  <LinearGradient
                    colors={[COLORS.orange1, COLORS.disableOrange1]}
                    start={{x: 0, y: 0}}
                    end={{x: 2, y: 0}}
                    style={{borderRadius: 8, padding: 10, marginTop: 10}}>
                    <Text
                      style={{
                        color: COLORS.white,
                        textAlign: 'center',
                        ...FONTS.body3,
                      }}>
                      {' '}
                      Save{' '}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              ) : (
                ''
              )}
            </View>
          )}
          <View style={{marginBottom: 270}}></View>
          {/* </ScrollView> */}
        </KeyboardAwareScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputHolder: {
    borderWidth: 1,
    borderColor: COLORS.black,
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

export default QualificationBottomView;
