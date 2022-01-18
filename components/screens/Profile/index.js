import React, { useState, useEffect } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { View, Text, Image } from 'react-native';
import { auth } from '../../firebase'


const Profile = ({ navigation }) => {
    const [email, setEmail] = useState();
    const [displayName, setDisplayName] = useState(auth.currentUser.displayName);
    const [displayPic, setDisplayPic] = useState(auth.currentUser.photoURL);

    console.log()

    const handleSubmit = () => {

        try {
            // signInWithEmailAndPassword(auth, email, password)
            //     .then((user) => {
            //         const cred = user.user
            //     })
            auth
                .signOut()
                .then(() => {
                    navigation.push('Login')
                }
                );

        } catch {
            console.log('Failed to Login')
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center'}}>
            <View style={{ width: '85%', alignSelf: 'center' }}>
                <View
                    style={{ height: 100, justifyContent: 'center' }}
                >
                    <Image source={{ uri: displayPic }} style={{ marginBottom: 30, width: 210, height: 200, alignSelf: 'center', borderRadius: 150 }} />


                    <Text
                        style={{ fontSize: 25, fontWeight: '600', alignSelf: 'center', marginBottom: 20 }}
                    >
                        {displayName}
                    </Text>
                </View>

                <Button style={{ marginTop: 120, backgroundColor: '#3EB489' }} mode="contained" onPress={handleSubmit}>
                    LOGOUT
                </Button>
            </View>
        </View>
    );
};

export default Profile;