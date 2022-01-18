import React, { useState, useEffect } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { View, Text, Image, Alert } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase'
import { getDatabase, ref, child, get } from "firebase/database";
import Cache from '../../Cache';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {findEmailAsync, getFromAsyncStorage, findPasswordAsync, storeInAsyncStorage} from '../../storage'


const Login = ({ navigation }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [sers, setUsers] = useState([])

    useEffect(() => {
        // findEmailAsync(setEmail);
        // findPasswordAsync(setPassword);


        // try {

        //         getFromAsyncStorage("email").then((mail) => {
        //             getFromAsyncStorage("password").then((pass) => {
        //                 if(email == mail && password == pass){
        //                     Alert.alert(mail)
        //                     console.log(' user logged in')
        //                     navigation.push('Home')

        //                 }
        //             })
        //         })

        // } catch {
        //     console.log('Failed to Login')
        // }

        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/`))
            .then((snapshot) => {
                const users = []
                snapshot.forEach(item => {
                    const data = item.val()
                    users.push(data)
                })
                setUsers(users)
                console.log(sers)

            }).catch((error) => {
                console.error(error);
            });


    }, [])


    const handleSubmit = () => {

        try {


            signInWithEmailAndPassword(auth, email, password)
                .then((user) => {
                    // storeInAsyncStorage("email", email)
                    // storeInAsyncStorage("password", password)
                    AsyncStorage.setItem('email', email)
                    console.log(' user logged in')
                    navigation.push('Home')


                })

        } catch {
            console.log('Failed to Login')
        }
    }

    const signUpRedirect = () => {
        navigation.push('Signup')

    }

    return (
        <View style={{ flex: 1, justifyContent: 'center',  }}>
            <View style={{ width: '85%', alignSelf: 'center' }}>
            <Cache uri='https://liquipedia.net/commons/images/b/b9/Is_GG_logo_v2.png'/>
            <Image source={require('../../../assets/logo.png')} style={{ width: 150, height: 150, alignSelf: 'center'}}/>

                <View
                    style={{ height: 100, justifyContent: 'center' }}
                >
                    <Text
                        style={{ fontSize: 25, fontWeight: 'bold', alignSelf: 'center', marginBottom: 30, }}
                    >
                        WELCOME
                    </Text>
                </View>
                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={text => {setEmail(text)}
                    }
                />
                <TextInput
                    style={{ marginTop: 10 }}
                    label="Password"
                    value={password}
                    onChangeText={text => {setPassword(text)
                    }}
                    secureTextEntry
                />
                <Button style={{ marginTop: 20, backgroundColor: '#3EB489' }} mode="contained" onPress={handleSubmit}>
                    Login
                </Button>
                <Button style={{ marginTop: 20 }} onPress={signUpRedirect}>
                    Register
                </Button>

            </View>
        </View>
    );
};

export default Login;