import React, { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { View, Text, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../firebase'
import { ref, set, push } from 'firebase/database';
import { updateProfile } from "firebase/auth";
import * as Permissions from "expo-permissions";
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import SelectDropdown from 'react-native-select-dropdown'
import PaperSelect from 'react-native-paper-select';
import { Picker } from "@react-native-picker/picker";







const SignUp = ({ navigation }) => {
    const [email, setEmail] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState();
    const [address, setAddress] = useState();
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [isShow, setIsShow] = useState(false)
    const [imagePath, setImagePath] = useState(null)
    const [downloadImage, setDownloadImage] = useState()
    const [handleVerify, setHandleVerify] = useState()

    /// Input Name
    const [firstName, setFirstName] = useState();
    const [middleName, setMiddleName] = useState();
    const [lastName, setLastName] = useState();

    /// Input address
    const [province, setProvince] = useState()
    const [city, setCity] = useState()
    const [barangay, setBarangay] = useState()

    const fullName = `${firstName}`+ " " +`${middleName}`+ " "+`${lastName}`
    const signUpAddress = `${barangay}`+ ", " +`${city}`+ ", " + `${province}` 
    console.log(signUpAddress)

    const navigateLogin = () => {
        navigation.navigate('Login')

    }



    const _upload = async () => {

        const { status } = await Permissions.askAsync(Permissions.CAMERA);


        if (status == 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync()

            loadImage(result.uri)
                .then(() => {
                    console.log(result)
                    Alert.alert('Success')
                    setImagePath(result.uri)
                })
                .catch((error) => {
                    Alert.alert(error)
                })
        } else {
            Alert.alert(' PLEASE ALLOW CAMERA ACCESS ')
        }

    }

    const loadImage = async (uri) => {
        const metadata = {
            contentType: 'image/jpeg'
        };
        const response = await fetch(uri);
        const blob = await response.blob();

        const name = new Date().getTime() + '-media.jpg'

        const storage = getStorage();
        const storRef = storageRef(storage, 'displayPhoto/' + name);

        const uploadTask = uploadBytesResumable(storRef, blob, metadata);
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.log(error)
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setDownloadImage(downloadURL)
                });
            }
        );

    }


    const handleVerification = async () => {

        const { status } = await Permissions.askAsync(Permissions.CAMERA);


        if (status == 'granted') {
            let result = await ImagePicker.launchCameraAsync()

            _verify(result.uri)
                .then(() => {
                    console.log(result)
                    Alert.alert('Success')
                })
                .catch((error) => {
                    Alert.alert(error)
                })
        } else {
            Alert.alert(' PLEASE ALLOW CAMERA ACCESS ')
        }

    }

    const _verify = async (uri) => {
        const metadata = {
            contentType: 'image/jpeg'
        };
        const response = await fetch(uri);
        const blob = await response.blob();

        const name = new Date().getTime() + '-media.jpg'

        const storage = getStorage();
        const storRef = storageRef(storage, 'verifyPhoto/' + name);

        const uploadTask = uploadBytesResumable(storRef, blob, metadata);
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.log(error)
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setHandleVerify(downloadURL)
                });
            }
        );

    }

    const handleSubmit = () => {
        try {
                createUserWithEmailAndPassword(auth, email, password)
                    .then((user) => {
                        const cred = user.user
                        console.log(cred)
                        updateProfile(auth.currentUser, {
                            displayName: fullName,
                            phoneNumber: phoneNumber,
                            photoURL: downloadImage
                        }).then(() => {
                            set(ref(db, 'users/' + cred.uid), {
                                id: cred.uid,
                                fullname: cred.displayName,
                                email: cred.email,
                                phoneNumber: phoneNumber,
                                address: signUpAddress,
                                verify_photo: handleVerify,
                                display_picture: cred.photoURL,
                                adminRole: false,
                                verified: false
                            });
                            console.log(cred.photoURL)
                            Alert.alert('Success')
                            navigation.navigate('Login')
                        })

                    })

        } catch {
            console.log('Failed to Signup')
        }
    }

    const Prov = ["Pampanga"]
    const Cit = ["Minalin"]
    const Bar = ["San Isidro", "Sta. Rita", "Lourdes", "Sta. Maria"]

    const [country, setCountry] = useState('Unknown');

     
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ width: '85%', alignSelf: 'center' }}>
                <View
                    style={{ height: 100, justifyContent: 'center' }}
                >
                    <Text
                        style={{ fontSize: 25, fontWeight: '600', alignSelf: 'center', marginBottom: 5 }}
                    >
                        Sign Up
                    </Text>
                </View>
                {
                    !isShow ? <View>
                    {
                                <TouchableOpacity onPress={_upload}>
                                    {
                                        imagePath == null ?
                                            <Image source={{ uri: 'https://cdn1.iconfinder.com/data/icons/rounded-black-basic-ui/139/Photo_Add-RoundedBlack-512.png' }}
                                                style={{ width: 210, height: 200, alignSelf: 'center', borderRadius: 150 }}
                                            /> :
                                            <Image source={{ uri: imagePath }}
                                                style={{ width: 210, height: 200, alignSelf: 'center', borderRadius: 150 }}
                                            />
                                    }
                                </TouchableOpacity>
                                
                            }
                            <Button style={{ marginBottom: 20 }} onPress={handleVerification}>
                                Verify
                            </Button>
                        <TextInput
                            style={{ marginTop: 6 }}
                            label="Email"
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />
                        <TextInput
                            style={{ marginTop: 6 }}
                            label="Password"
                            value={password}
                            onChangeText={text => setPassword(text)}
                            secureTextEntry
                        />
                        <TextInput
                            style={{ marginTop: 6 }}
                            label="Confirm Password"
                            value={confirmPassword}
                            onChangeText={text => setConfirmPassword(text)}
                            secureTextEntry
                        />

                        <Button style={{ marginTop: 20, backgroundColor: '#3EB489' }} mode="contained" onPress={() => {
                              if(email !== null && password !== null && confirmPassword !== null){
                                if (password === confirmPassword) {
                                    setIsShow(true)
                                } else {
                                    Alert.alert('Password do not match')
                                }                    
                            }
                           
                                }}>
                            Next
                        </Button>
                        <Button style={{ marginTop: 20 }} mode='outlined' onPress={navigateLogin}>
                            Login
                        </Button>
                    </View>
                        : null
                }
                {
                    isShow ?
                        <View>
                        <View style={{ 
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#333',
                            marginBottom: 7}}>
                        <TextInput
                            label="First Name"
                            value={firstName}
                            onChangeText={text => setFirstName(text)}
                            style={{width: '50%', marginRight: 6}}
                        />
                        <TextInput
                            label="Middle Name"
                            value={middleName}
                            onChangeText={text => setMiddleName(text)}
                            style={{width: '50%'}}
                        />
                        </View>
                        <View style={{ 
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#333',}}>
                        <TextInput
                            label="Last Name"
                            value={lastName}
                            onChangeText={text => setLastName(text)}
                            style={{width: '100%'}}
                        />
                        </View>

                            <TextInput
                                style={{ marginTop: 6 }}
                                label="Phone Number"
                                value={phoneNumber}
                                onChangeText={text => setPhoneNumber(text)}
                            />
                         
                       <View style={{ 
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#333',}}
                            >
                       <SelectDropdown
                       defaultButtonText={'Province'}
                       buttonStyle={{backgroundColor: '#e7e7e7', width: '50%', margin: 2}}
                            data={Prov}
                            onSelect={(selectedItem) => {
                                console.log(selectedItem)
                                setProvince(selectedItem)
                            }}
                            />
                            <Picker/>

                            <SelectDropdown
                            defaultButtonText={'City'}
                            buttonStyle={{backgroundColor: '#e7e7e7', width: '50%', margin: 8}}
                            data={Cit}
                            dropdownIconPosition={'right'}
                            onSelect={(selectedItem) => {
                                console.log(selectedItem)
                                setCity(selectedItem)
                            }}
                            />       
                            <Picker/>

                         
                       </View>
                        <View style={{ 
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#333',}}>
                        <SelectDropdown
                        defaultButtonText={'Barangay'}
                        buttonStyle={{backgroundColor: '#e7e7e7', width: '100%'}}
                            data={Bar}
                            onSelect={(selectedItem) => {
                                console.log(selectedItem)
                                setBarangay(selectedItem)
                            }}
                            />
                        <Picker/>
                         </View>
                            <Button style={{ marginTop: 20, backgroundColor: '#3EB489' }} mode="contained" onPress={handleSubmit}>
                                SignUp
                            </Button>
                            <Button style={{ marginTop: 20  }} mode='outlined' onPress={() => setIsShow(false)}>
                                Back
                            </Button>
                        </View>
                        : null

                }



            </View>
        </View>
    );
};

export default SignUp;

