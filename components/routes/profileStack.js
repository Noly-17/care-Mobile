import { createStackNavigator } from "react-navigation-stack";
import Profile from "../screens/Profile";
import Header from '../shared/header';
import React from "react";

const screens = {
    Profile: {
        screen: Profile,
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


const ProfileStack = createStackNavigator(screens)


export default ProfileStack;














