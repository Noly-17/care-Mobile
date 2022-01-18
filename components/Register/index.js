import React, { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { View, Text } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'


const SignUp = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();


    const handleSubmit = () => {
        try {
            createUserWithEmailAndPassword(auth, email, password)
                .then((user) => {
                    const cred = user.user
                    console.log('Success')
                })
        } catch {
            console.log('Failed to Login')
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ width: '85%', alignSelf: 'center' }}>
                <View
                    style={{ height: 100, justifyContent: 'center' }}
                >
                    <Text
                        style={{ fontSize: 25, fontWeight: '600', alignSelf: 'center', marginBottom: 30 }}
                    >
                        Sign Up
                    </Text>
                </View>
                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={{ marginTop: 10 }}
                    label="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />
                <Button style={{ marginTop: 20 }} mode="contained" onPress={handleSubmit}>
                    Sign Up
                </Button>
            </View>
        </View>
    );
};

export default SignUp;