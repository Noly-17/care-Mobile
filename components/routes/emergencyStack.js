import { createStackNavigator } from "react-navigation-stack";
import Emergency from "../screens/Emergency";
import Header from '../shared/header';
import React from "react";


const screens = {
    Emergency: {
        screen: Emergency,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} />,
                headerLeft: () => null,
                headerStyle: {
                    backgroundColor: '#3EB489',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
            }
        }
    }
}


const EmergencyStack = createStackNavigator(screens)


export default EmergencyStack;














