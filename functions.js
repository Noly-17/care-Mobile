import NetInfo from '@react-native-community/netinfo';

export const checkConnection = () => {
    return NetInfo.fetch().then(state => {
        return state.isConnected;
    })
}