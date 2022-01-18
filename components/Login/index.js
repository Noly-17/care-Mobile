import React, { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { View, Text } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'


const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();


    const handleSubmit = () => {
        try {
            signInWithEmailAndPassword(auth, email, password)
                .then((user) => {
                    const cred = user.user
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
                        LOGIN
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
                    Login
                </Button>
            </View>
        </View>
    );
};

export default Login;