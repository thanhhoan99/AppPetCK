import { View, Text,Image } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import PetSubinfoCard from './PetSubinfoCard'


export default function PetSubinfo({pet}) {
  return (
    <View style={{paddingHorizontal:20}}>
        <View style={{
            display: 'flex',
            flexDirection: 'row'}}>
           <PetSubinfoCard 
           icon={require('./../../assets/images/calendar.png')}
           title={'Age'}
           value={pet?.age+" year"}/>
           <PetSubinfoCard icon={require('./../../assets/images/zeroa.png')}
           title={'Breed'}
           value={pet?.breed}/>
        </View>
        <View style={{
            display: 'flex',
            flexDirection: 'row'}}>
           <PetSubinfoCard 
           icon={require('./../../assets/images/transgender.png')}
           title={'Sex'}
           value={pet?.sex}/>
           <PetSubinfoCard icon={require('./../../assets/images/weight-gain.png')}
           title={'Weight'}
           value={pet?.weight}/>
        </View>
    </View>
  )
}