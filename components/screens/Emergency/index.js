import React, { Component, useState, useEffect } from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Permissions from "expo-permissions";
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../../firebase';
import { ref, set, push, onValue } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth } from '../../firebase'




const Emergency = () => {

    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const [keyPush, setKeyPush] = useState(null)
    const [displayName, setDisplayName] = useState(auth.currentUser.displayName);
    const [displayEmail, setDisplayEmail] = useState(auth.currentUser.email);
    const [usersAddress, setUsersAddress] = useState();
    const [nambah, setNambah] = useState()

    useEffect(() => {
        const dbRef = ref(db, 'users/');
        onValue(dbRef, (snap) => {
                  const users = []
                  snap.forEach(item => {
                      const data = item.val()
                      if(auth.currentUser.uid == data.id){
                          users.push(data)
                          console.log(data.address)
                          setUsersAddress(data.address)
                          setNambah(data.phoneNumber)
                      }
                  })
                  
  
          });
    }, [])


    const _upload = async () => {

        const { status } = await Permissions.askAsync(Permissions.CAMERA);


        if (status == 'granted') {
            let result = await ImagePicker.launchCameraAsync()

            loadImage(result.uri)
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

    const loadImage = async (uri) => {
        const metadata = {
            contentType: 'image/jpeg'
        };
        const response = await fetch(uri);
        const blob = await response.blob();

        const name = new Date().getTime() + '-media.jpg'

        const storage = getStorage();
        const storRef = storageRef(storage, 'images/' + name);

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
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    console.log(nambah)
                    set(ref(db, 'requests/' + auth.currentUser.uid), {
                        id: auth.currentUser.uid,
                        username: displayName,
                        email: displayEmail,
                        lat: lat,
                        long: lng,
                        address: usersAddress,
                        profile_picture: downloadURL,
                        phoneNumber: nambah,
                        status: 'Pending'
                    });

                });

            }
        );
    }


    const _getLocation = async () => {
        try {

            const { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status != 'granted') {
                const response = await Permissions.askAsync(Permissions.LOCATION);
                console.log('not granted')
            }
            const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true })

            setLat(location.coords.latitude)
            setLng(location.coords.longitude)
            if (location.coords.latitude == lat && location.coords.longitude == lng) {
                _upload();
            }


        } catch (error) {
            console.log('Error', error)
        }
    }




    const coords = {
        latitude: lat,
        longitude: lng,
    }


    return (
        <>
            <View style={styles.container}>
                <Button mode="contained" style={styles.button} onPress={_getLocation}>Ping Me</Button>
                <MapView
                    style={styles.map}
                    showsUserLocation={true}
                    initialRegion={{
                        latitude: lat,
                        longitude: lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    region={{
                        latitude: lat,
                        longitude: lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker coordinate={coords} />
                    <Circle center={coords}
                        radius={1000}
                        strokeColor="#4F6D7A"
                        strokeWidth={2} />
                </MapView>

            </View>
        </>
    )
}


export default Emergency;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width:  '95%',
        height: '80%',
        position: 'relative',
        bottom: '8%'
    },
    button: {
        width: 170,
        alignSelf: 'center',
        position: 'absolute',
        bottom: '10%',
        backgroundColor: '#3EB489'

    }
});

// Dimensions.get('window').width