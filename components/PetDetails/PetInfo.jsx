import { View, Text, TouchableOpacity ,Image} from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import {useRouter } from 'expo-router'
import MarkFav from '../MarkFav';

export default function PetInfo({pet}) {
  const router=useRouter();
  console.log("Image URL:", pet.imageUrl);
  

  return (
    <View>
        <View style={{position:'absolute',zIndex:10,
          display:'flex',flexDirection:'row',
          justifyContent:'space-between',
          width:'100%',padding:20
        }}>
          <TouchableOpacity onPress={()=>router.back()}>
            <Ionicons name="arrow-back-circle" size={40} color="white" />
          </TouchableOpacity>
           
           
        </View> 
        
        <Image source={{uri:pet.imageUrl}}
                        style={{
                            width:'100%',
                            height:340}} />
        <View style={{
                      display:'flex',flexDirection:'row',
                      justifyContent:'space-between',
                     padding:20,marginTop:-20,backgroundColor:'#fff',
                     borderTopLeftRadius:25,borderTopRightRadius:25
                    }}>       
        <View  style={{
                     padding:20,marginTop:-20,backgroundColor:'#fff',borderTopLeftRadius:25,borderTopRightRadius:25
                    }}>
                    <Text style={{
                      fontFamily:'outfit-bold',
                      fontSize:26
                    }}>{pet?.name}</Text>
                    <Text style={{
                      fontFamily:'outfit',
                      fontSize:18
                    }}>{pet?.address}</Text>
                </View>
              
                    <MarkFav pet={pet}/>
           
              </View>       
    </View>
  )
}