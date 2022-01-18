import { createStackNavigator } from "react-navigation-stack";
import Home from "../screens/HomeScreen";
import Header from '../shared/header';
import React from "react";



const screens = {
    Home: {
        screen: Home,
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


const HomeStack = createStackNavigator(screens)


export default HomeStack;














