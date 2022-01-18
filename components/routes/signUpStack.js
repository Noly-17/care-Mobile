import { createStackNavigator } from "react-navigation-stack";
import Register from "../screens/Register";
import Header from '../shared/header';
import React from "react";
import drawer from "./drawer";

const screens = {
    Signup: {
        screen: Register,
        navigationOptions: ({ navigation }) => {
            return {
                header: () => null,
            }
        }
    }
}


const SignupStack = createStackNavigator(screens)


export default SignupStack;














