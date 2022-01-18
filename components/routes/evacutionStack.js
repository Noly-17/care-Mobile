import { createStackNavigator } from "react-navigation-stack";
import Evacuation from "../screens/Evacuation";
import Header from '../shared/header';
import React, { useState } from "react";
import {auth, db} from '../firebase'
import { ref, set, push, onValue } from 'firebase/database';

// const [checkAdmin, setCheckAdmin] = useState()


// useEffect(() => {
//     const dbRef = ref(db, 'users/');
//     onValue(dbRef, (snap) => {
//               const users = []
//               snap.forEach(item => {
//                   const data = item.val()
//                   if(auth.currentUser.uid == data.id){
//                       users.push(data)
//                       console.log(data.adminRole)
//                       setCheckAdmin(data.admi)
//                   }
//               })
              

//       });
// }, [])

const screens = {
    Evacuation: {
        screen: Evacuation,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} />,
                headerLeft: () => null,
                headerStyle: {
                    backgroundColor: '#3EB489',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
            }
        }
    }
}


const EvacuationStack = createStackNavigator(screens)


export default EvacuationStack;














