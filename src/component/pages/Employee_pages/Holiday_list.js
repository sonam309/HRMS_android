import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Calendar from 'react-native-calendars/src/calendar';
import axios from 'axios';
import moment from 'moment';

const Holiday_list = () => {
  useEffect(() => {
    getHolidayList(new Date().getFullYear());
    getAttendance();
  }, []);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [holidayList, setHolidayList] = useState([]);
  const [markedDate, setMarkedDate] = useState({});
  const [finalO, setFinalO] = useState({});

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

  return (
    <View>
      <Calendar
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
