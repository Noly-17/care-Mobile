import React from 'react';
import { Button } from 'react-native-paper';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const Emergency = () => {
    return (
        <>
            <Button mode="contained">Ping Me</Button>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }} />
            </View>
            <Text>Wait Respondents</Text>
        </>
    )
}

export default Emergency;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: 350,
    },
});
