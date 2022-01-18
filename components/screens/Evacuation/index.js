import React, { Component, useState, useEffect } from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import MapView, { Circle, Marker, PROVIDER_GOOGLE, MapViewDirections, Polyline } from 'react-native-maps';
import * as Permissions from "expo-permissions";
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../../firebase';
import { ref, set, push, getDatabase, child, get } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {decode} from "@mapbox/polyline";
import PolylineDirection from '@react-native-maps/polyline-direction';



const Evacuation = () => {

    const [users, setUsers] = useState(null);
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const [dropLocation, setDropLocation] = useState(null)
    // const [coords, setCoords] = useState([]);

    const GOOGLE_MAPS_APIKEY = "AIzaSyCKGctZNeIYsMvXsVYQqPSkm2yO9wh1bes"

    const tokyoRegion = {
        latitude: 15.215288476840579,
        longitude: 120.10803222656251,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      const chibaRegion = {
        latitude: 14.95009216614807,
            longitude: 120.64636230468751,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };


    useEffect(() => {


        // console.log(coords)
        // getDirections(tokyoRegion, chibaRegion)
        // .then(coords => setCoords(coords))
        // .catch(err => console.log("Something went wrong"));

        _getLocation()
        const dbRef = ref(getDatabase());
        get(child(dbRef, `evacuationRoutes/`))
            .then((snapshot) => {
                const users = []
                snapshot.forEach(item => {
                    const data = item.val()
                    users.push(data)
                })
                // this.setState({
                //     users: users,
                // })
                setUsers(users);
                console.log(users)

            }).catch((error) => {
                console.error(error);
            });

    }, [])






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



        } catch (error) {
            console.log('Error', error)
        }
    }




    const ggwp = {
        latitude: lat,
        longitude: lng,
    }


    // const getDirections = async (startLoc, destinationLoc) => {
    //     try {
    //       const KEY = "AIzaSyCKGctZNeIYsMvXsVYQqPSkm2yO9wh1bes"; //put your API key here.
    //       //otherwise, you'll have an 'unauthorized' error.
    //       let resp = await fetch(
    //         `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${KEY}`
    //       );
    //       let respJson = await resp.json();
    //       let points = decode(respJson.routes[0].overview_polyline.points);
    //       console.log(points);
    //       let coords = points.map((point, index) => {
    //         return {
    //           latitude: point[0],
    //           longitude: point[1]
    //         };
    //       });
    //       setCoords(coords)
    //     } catch (error) {
    //       return error;
    //     }
    //   };
    

const origin = { latitude: 19.363631, longitude: -99.182545 };
const destination = { latitude: 19.2932543, longitude: -99.1794758 };
     

    return (
        <>
            <View style={styles.container}>
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
                    <Marker coordinate={ggwp} />
                    <Circle center={ggwp}
                        radius={1000}
                        strokeColor="#4F6D7A"
                        strokeWidth={2} />

                        <PolylineDirection
          origin={origin}
          destination={tokyoRegion}
          apiKey={GOOGLE_MAPS_APIKEY}
          strokeWidth={4}
          strokeColor="#12bc00"
        />

                        {/* <Polyline
        coordinates={coords} //specify our coordinates
        strokeColor={"red"}
        strokeWidth={3}
      />                         */}



                    {
                        users && users.map(user => {
                            const ggwp = {
                                latitude: user.latitude,
                                longitude: user.longitude
                            }
                            return (
                                <Marker
                                    key={user.latitude}
                                    coordinate={ggwp}
                                    onPress={() => {
                                        setDropLocation(ggwp)
                                    }}
                                />

                            )
                        })
                    }
                </MapView>

            </View>
        </>
    )
}


export default Evacuation;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        position: 'relative',
        bottom: '10%'
    },
    button: {
        width: 170,
        alignSelf: 'center',
        position: 'absolute',
        bottom: '10%',

    }
});








