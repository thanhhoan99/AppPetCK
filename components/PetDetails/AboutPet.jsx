import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'

export default function AboutPet({pet}) {

    const [readMore,setReadMore]=useState(true);
  return (
    <View style={{
        padding:20,
        backgroundColor:'#fff',
        
      }}>
      <Text style={{
         fontFamily:'outfit-bold',
         fontSize:20
         }}>About {pet?.name}</Text>
           <Text  numberOfLines={readMore?3:20}  style={{
         fontFamily:'outfit',
         lineHeight:25,
         padding: 10,
         borderRadius: 10,
         borderColor: Colors.GRAY,      
         }}>{pet?.about}</Text>
         {readMore&& 
         <Pressable onPress={()=>setReadMore(false)}>
         <Text 
         style={{
            fontFamily:'outfit-bold',          
            borderColor: Colors.GRAY,
            fontSize:12,
            }}>    read more</Text>
            </Pressable>}
    </View>
  )
}