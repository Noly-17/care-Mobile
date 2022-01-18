import React, { Component} from 'react';
import { StyleSheet, Text, View, FlatList, Image, List, TouchableOpacity  } from 'react-native';

class OfflineMode extends Component {

    state = {
        isShow: false,
        key: null
    }

    handleImages = () => {
        console.log('ggwp')
       } 

render(){

    const Cit = [  
        {
            id: 1,
            barangay: 'San Isidro, Minalin',
            hotlineNumer: '09550412920',
            src:  <Image source={require('../../../assets/sanisidro.png')}/>
        },
        {
            id: 2,
            barangay: 'Lourdes, Minalin',
            hotlineNumer: '09550412920',
            src:  <Image source={require('../../../assets/lourdes.png')}/>
        },
        {
            id: 3,
            barangay: 'Sto. Domingo, Minalin',
            hotlineNumer: '09550412920',
            src:  <Image source={require('../../../assets/lourdes.png')}/>
        },
        {
            id: 4,
            barangay: 'Sta. Rita, Minalin',
            hotlineNumer: '09550412920',
            src:  <Image  style={{ width: 150, height: 150, alignSelf: 'center'}} source={require('../../../assets/lourdes.png')}/>
        },
       ]


    return (
        <View style={styles.container}> 
            
            <Text style={{ fontWeight: '900'}}>No Internet Connection</Text>
            <FlatList
           data={Cit}
           keyExtractor={(x, i) => console.log(x.id)}
           renderItem={({item}) => 
           <TouchableOpacity
           onPress={()=>{
               this.setState({
                key: item.id
               })
                if(this.state.key == item.id){
                    this.setState({
                        isShow: true
                    })
                }

                console.log(this.state.isShow)
                console.log(this.state.key)
               
           }}
           style={styles.perItem}>
               <View  style={styles.perItemText}>
               <Text >{item.barangay}</Text>
               <Text >{item.hotlineNumer}</Text>
                </View>
           </TouchableOpacity>
           
            }   
         />
          {
                   Cit.map((perIds) => {
                       return (
                          this.state.key == perIds ? 
                           <View>
                               {Cit.src}
                          </View> : null
                       )
                   })
          }
         
        </View>
    )
}
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60,
        backgroundColor: '#fff'
    },
    perItem: {
        marginTop: 20,
        backgroundColor: '#3EB489',
        width: 300,
        height: 100,
        borderRadius: 20,
        position: 'relative'
    },
    perItemText: {
        position: 'absolute',
        top: 30,
        left: 70
    }
})

export default OfflineMode
