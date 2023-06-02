import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Calendar from 'react-native-calendars/src/calendar';
import axios from 'axios';
import moment from 'moment';
import SelectDropdown from 'react-native-select-dropdown';

const Holiday_list = () => {
  useEffect(() => {
    getHolidayList(new Date().getFullYear());
    getAttendance();
  }, []);

  useEffect(() => {
    getHolidayList(year);
  }, [year]);

  const [modalVisible, setModalVisible] = useState(false);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [holidayList, setHolidayList] = useState([]);
  const [markedDate, setMarkedDate] = useState({});
  const [finalO, setFinalO] = useState({});

  const [year, setYear] = useState(new Date());

  var markedDates = {};
  const finalObject = {};

  const createMarkedListObj = returnedData => {
    returnedData.forEach(item => {
      const day = parseInt(item.DATED.substring(0, 2));
      const monthAbbreviation = item.DATED.substring(3, 6);
      const year = item.YEARS;

      const monthMap = {
        Jan: '01',
        Feb: '02',
        Mar: '03',
        Apr: '04',
        May: '05',
        Jun: '06',
        Jul: '07',
        Aug: '08',
        Sep: '09',
        Oct: '10',
        Nov: '11',
        Dec: '12',
        // Add more month mappings if needed
      };

      const month = monthMap[monthAbbreviation];

      const dateKey = `${year}-${month}-${day.toString().padStart(2, '0')}`;

      markedDates[dateKey] = {marked: true};
    });

    setMarkedDate(markedDates);
  };

  const getHolidayList = selectedYear => {
    axios
      .get(
        `https://econnectsatya.com:7033/api/Admin/getHoliday?year=${selectedYear}`,
      )
      .then(response => {
        const returnedData = response?.data?.Result;

        if (returnedData[0]?.YEARS) {
          createMarkedListObj(returnedData);
          setHolidayList(returnedData);
        } else {
          setHolidayList([]);
        }
      });
  };

  const getAttendance = () => {
    axios
      .post(`https://econnectsatya.com:7033/api/Admin/Attendance`, {
        userId: '10011',
        monthYear: 'May2023',
      })
      .then(response => {
        const returnedData = response?.data?.Result;

        // Create the final object

        returnedData.map(obj => {
          // Extract the date from the DATED field
          // const date = new Date(obj.DATED).toISOString().split('T')[0];
          const date = moment(obj.DATED, 'MMM DD YYYY hh:mmA').format(
            'YYYY-MM-DD',
          );

          // Determine markedDotColor based on ATTENDANCE_FLAG
          let markedDotColor = '';

          if (obj.ATTENDANCE_FLAG === 'A') {
            markedDotColor = 'red';
          } else if (obj.ATTENDANCE_FLAG === 'P') {
            markedDotColor = '#33AA54';
          } else if (obj.ATTENDANCE_FLAG === 'S') {
            markedDotColor = 'orange';
          } else {
            markedDotColor = 'gray';
          }

          // Add the date as a key to the final object
          markedDates[date] = {marked: true, dotColor: markedDotColor};
        });
      });
  };

  const getRandomColor = () => {
    const red = Math.floor(Math.random() * 128); // Limiting red to darker shades (0-127)
    const green = Math.floor(Math.random() * 128); // Limiting green to darker shades (0-127)
    const blue = Math.floor(Math.random() * 128); // Limiting blue to darker shades (0-127)
    return `rgb(${red}, ${green}, ${blue})`;
  };

  const modalData = [
    {
      heading: 'Shift',
      caption: '9:30 to 6:30',
    },
    {
      heading: 'Actual',
      caption: 'none',
    },
    {
      heading: 'Regularised',
      caption: 'none',
    },
    {
      heading: 'Hours',
      caption: '00:0 Hours',
    },
    {
      heading: 'Deficit',
      caption: '9:00',
    },
    {
      heading: 'Leave status',
      caption: 'none',
    },
    {
      heading: 'Reason',
      caption: 'none',
    },
    {
      heading: 'Application',
      caption: 'none',
    },
    {
      heading: 'Raw Swipes',
      caption: 'none',
    },
  ];

  return (
    <View>
      {/* {showBottomUpModal && (
        <BottomUpModal
          isVisible={showBottomUpModal}
          onClose={() => setShowBottomUpModal(false)}
          visibleHieght={380}>
         { <View>
            <Text>Modal</Text>
          </View>}
        </BottomUpModal>
      )} */}

      {/* //calendar modal start  */}
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                }}>
                {modalData.map(data => {
                  return (
                    <View style={styles.modalWrap}>
                      <Text style={styles.modalTextHeading}>
                        {data.heading}
                      </Text>
                      <Text style={styles.modalTextCaption}>
                        {data.caption}
                      </Text>
                    </View>
                  );
                })}
              </View>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Okay</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>

      {/* //calendar modal end */}

      {/* dropdown start */}
      <View style={{margin: 10}}>
        <SelectDropdown
          data={Array.from(
            {length: new Date().getFullYear() - 1990 + 1},
            (_, index) => (1990 + index).toString(),
          )}
          onSelect={selectedItem => {
            setYear(selectedItem);
          }}
          buttonStyle={[
            styles.elevation,
            styles.dropDownStyle,
            {width: '100%'},
          ]}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          defaultButtonText={'Select an Year'}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />
      </View>
      {/* dropdown end */}

      <Calendar
        initialDate={year}
        style={{marginBottom: 20, elevation: 4, backgroundColor: '#fff'}}
        headerStyle={{backgroundColor: '#220046'}}
        theme={{
          arrowColor: 'white',
          monthTextColor: 'white',
          textSectionTitleColor: 'white',
        }}
        markedDates={markedDate}
        onMonthChange={month => {
          if (month.year !== selectedYear) {
            setSelectedYear(month.year);
            getHolidayList(month.year);
          }
        }}
        dayComponent={({date, state, marking}) => {
          return (
            <TouchableOpacity
              onLongPress={() => {
                setModalVisible(true);
                console.log('selected day', date.day);
              }}
              style={{
                padding: 5,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 16,
                }}>
                {date.day}
              </Text>
              {marking && marking.dotColor === 'orange' ? (
                <View
                  style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    overflow: 'hidden',
                    transform: [{rotate: '90deg'}],
                    elevation: 2,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#DDE6ED',
                      height: 5,
                      width: 10,
                    }}
                  />
                  <View
                    style={{
                      backgroundColor: '#88C385',
                      height: 5,
                      width: 10,
                    }}
                  />
                </View>
              ) : (
                marking && (
                  <View
                    style={{
                      height: 10,
                      width: 10,
                      backgroundColor: marking?.dotColor
                        ? marking.dotColor
                        : '#87CEEB',
                      borderRadius: 5,
                    }}
                  />
                )
              )}
            </TouchableOpacity>
          );
        }}
      />
      {holidayList.length > 0 &&
        holidayList.map((holiday, index) => {
          return (
            <View
              style={{
                backgroundColor: '#ffffff',
                marginVertical: 5,
                padding: 5,
                paddingHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              key={index}>
              <View
                style={{
                  backgroundColor: getRandomColor(),
                }}>
                <Text
                  style={{
                    padding: 5,
                    color: '#ffffff',
                    fontSize: 20,
                  }}>
                  {holiday.DATED}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                  }}>
                  {holiday?.DESCR}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'gray',
                  }}>
                  {holiday?.DAY_NAME}
                </Text>
              </View>
            </View>
          );
        })}
    </View>
  );
};

export default Holiday_list;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  buttonClose: {
    backgroundColor: '#220046',
    width: 100,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalWrap: {
    minWidth: 100,
    marginVertical: 10,
  },
  modalTextHeading: {
    fontSize: 16,
    fontWeight: '600',
  },
  elevation: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 7,
  },
  dropDownStyle: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 40,
  },
});
