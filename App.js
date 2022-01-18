import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './components/routes/drawer';
import NetInfo from "@react-native-community/netinfo";
import { goOffline } from '@firebase/database';
import { checkConnection } from './functions';
import OfflineMode from './components/screens/OfflineMode';

export default function App() {
 
  const [ connectStatus, setConnectStatus] = useState(false);

  useEffect(() => {
    checkConnection().then(res => {
      setConnectStatus(true)
    })
  }, [])

  return (
    connectStatus ? (
    <>
    <Navigator />

    </>
    ) : <OfflineMode />
  );

  
}
