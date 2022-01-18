import  AsyncStorage from "@react-native-async-storage/async-storage"

export const getFromAsyncStorage = async (key, setEmail) => {
   return await AsyncStorage.getItem(key)
    .then((value)=> setEmail(value))
    .catch((error)=> console.log(error))
}

export const findPasswordAsync = async (key, setPassword) => {
    await AsyncStorage.getItem('password')
    .then((value)=> setPassword(value))
    .catch((error)=> console.log(error))
}

export const storeInAsyncStorage = (key, value) => {
    AsyncStorage.setItem(key, value)
}