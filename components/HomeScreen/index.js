import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

const Home = ({ navigation }) => {
    return (
        <View>
            <Text>
                Home
            </Text>
            <Button onPress={() => navigation.navigate('Evacuation')}>
                Press ME
            </Button>
        </View>
    )
}


export default Home;