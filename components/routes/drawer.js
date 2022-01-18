import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import HomeStack from "./homeStack";
import ProfileStack from "./profileStack";
import EmergencyStack from "./emergencyStack"
import LogoutStack from "./profileStack";
import SignupStack from "./signUpStack";
import LoginStack from "./loginStack";
import EvacuationStack from "./evacutionStack";


const RootDrawerNavigator = createDrawerNavigator({

    Login: {
        screen: LoginStack,
        navigationOptions: () => {
            return {
                drawerLockMode: 'locked-closed',
                drawerLabel: () => null,
                
            }
        }

    },
    Home: {
        screen: HomeStack,
        navigationOptions: () => {
            return {
                drawerLockMode: 'locked-closed',
            }
        }
    },
    Profile: {
        screen: ProfileStack,
    },
    Emergency: {
        screen: EmergencyStack,
    },
    Evacuation: {
        screen: EvacuationStack,
    },
    Signup: {
        screen: SignupStack,
        navigationOptions: () => {
            return {
                drawerLockMode: 'locked-closed',
                drawerLabel: () => null,
            }
        }
    },
});



export default createAppContainer(RootDrawerNavigator)













