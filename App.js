import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [checkInEnable, setCheckInEnable] = useState(true);
  const [checkOutEnable, setCheckOutEnable] = useState(false);

  useEffect(() => {
    setCurrentDate(new Date().getDate() + '/' +
      (new Date().getMonth() + 1) + '/'
      + new Date().getFullYear(),
    );

    getSavedDate();
  }, [])

  const saveDate = async () => {
    await AsyncStorage.setItem('DATE', new Date().getDate() + '/' +
      (new Date().getMonth() + 1) + '/'
      + new Date().getFullYear());


  };

  const getSavedDate = async () => {
    const date = await AsyncStorage.getItem('DATE');
    const status = await AsyncStorage.getItem('STATUS');
    if (date == new Date().getDate() + '/' +
      (new Date().getMonth() + 1) + '/'
      + new Date().getFullYear() && status == 'CIN') {
      setCheckInEnable(false);
      setCheckOutEnable(true);

    } else if (date == new Date().getDate() + '/' +
      (new Date().getMonth() + 1) + '/'
      + new Date().getFullYear() && status == 'COUT') {
      setCheckInEnable(false);
      setCheckOutEnable(false);
    }
    console.log(date);
  }

  const saveCheckIn = async () => {
    await AsyncStorage.setItem('STATUS', 'CIN');

  };
  const saveCheckOut = async () => {
    await AsyncStorage.setItem('STATUS', 'COUT');

  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={{
        fontSize: 20,
        fontWeight: '800',
        alignSelf: 'center',
        marginTop: 100,

      }}>{currentDate}</Text>

      <TouchableOpacity disabled={!checkInEnable}
        style={{
          height: 60, width: 200, justifyContent: 'center',
          alignItems: 'center', backgroundColor: checkInEnable ? 'green' : 'gray',
          alignSelf: 'center', borderRadius: 10, marginTop: 50
        }}
        onPress={() => {
          saveDate();
          saveCheckIn();
          setCheckInEnable(false);
          setCheckOutEnable(true);
        }}>
        <Text style={{ color: '#fff' }}>Check IN</Text>
      </TouchableOpacity>

      <TouchableOpacity disabled={!checkOutEnable}
        style={{
          height: 60, width: 200, justifyContent: 'center',
          alignItems: 'center', backgroundColor: checkOutEnable ? 'green' : 'gray', alignSelf: 'center',
          borderRadius: 10, marginTop: 50
        }}
        onPress={() => {
          saveCheckOut();
          setCheckInEnable(false);
          setCheckOutEnable(false);
        }}>
        <Text style={{ color: '#fff' }}>Check OUT </Text>
      </TouchableOpacity>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})