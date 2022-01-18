import React, { useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { auth, db } from '../firebase';
import { ref, set, push, onValue } from 'firebase/database';

const Header = ({ navigation }) => {

    const [ isVerified, setIsVerified] = useState(true)

    useEffect(() => {
        const dbRef = ref(db, 'users/');
        onValue(dbRef, (snap) => {
                  const users = []
                  snap.forEach(item => {
                      const data = item.val()
                      if(auth.currentUser.uid == data.id){
                          users.push(data)
                          console.log(data.verified)
                          setIsVerified(data.verified)
                      }
                  })
                  
  
          });
    }, [])

    const openMenu = () => {
        navigation.openDrawer();
    }
    return (
        <View style={styles.header}>
            {
                isVerified ? 
                <MaterialIcons name='menu' size={28} style={styles.icon} onPress={openMenu} />
                : null
            }
            <View>
                <Text style={styles.headerText}>C . A . R. E</Text>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333',
        letterSpacing: 1
    },

    icon: {
        position: 'absolute',
        left: 16
    }
})
