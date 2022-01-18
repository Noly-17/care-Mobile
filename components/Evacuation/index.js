import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

const Evacuation = ({ navigation }) => {
    return (
        <View>
            <Text>
                Evacuation
            </Text>
            <Button onPress={() => navigation.navigate('Home')}>
                Press ME
            </Button>
        </View>
    )
}


export default Evacuation;