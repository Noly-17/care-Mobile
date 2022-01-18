import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { auth, db } from '../../firebase';
import { ref, set, push, onValue } from 'firebase/database';


const Home = ({ navigation, lockDrawer }) => {
    const [isVerified, setIsVerified] = useState(true)

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


   
    const handleVerify = async () => {

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
        <View style={styles.container}>
            <Image
                source={require('../../../assets/logo.png')}
                style={styles.image}
            />
            {
            isVerified ? 
            <View style={styles.text}>  
            <Button mode='contained' onPress={() => navigation.navigate('Emergency')} style={styles.button}>
                Send Emergency
            </Button>
            </View>
            :
            <View style={styles.text}>  
            <Text>Please "Verify" your account first</Text>
            <Button mode='contained' onPress={handleVerify} style={styles.button}>
                Verify your account
            </Button>
            <Button mode='contained' onPress={handleSubmit} style={styles.buttonlg}>
                Logout
            </Button>
            </View>
            }
        </View>
    )
}


export default Home;



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonlg: {
        marginTop: 5
    },
    button: {
        backgroundColor: '#3EB489'
    },
    text: {
        alignSelf: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: '26%',
     },
    image: {
        alignSelf: 'center',
        width: 300,
        height: 300,
        position: 'relative',
        top: '18%',
     }
})