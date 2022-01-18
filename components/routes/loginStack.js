import { createStackNavigator } from "react-navigation-stack";
import Login from "../screens/Login";
import Header from '../shared/header';
import React from "react";
import drawer from "./drawer";

const screens = {
    Login: {
        screen: Login,
        navigationOptions: ({ navigation }) => {
            return {
                header: () => null,
            }
        }
    },
    rawerLockMode: 'locked-closed'

    
}


const LoginStack = createStackNavigator(screens)


export default LoginStack;














