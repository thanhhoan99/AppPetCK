import { View, Text, ScrollView ,StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '@/components/Home/Header';
import Slider from '@/components/Home/Slider';
import PetListByCategory from '@/components/Home/PetListByCategory';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Link } from 'expo-router';



export default function Home() {
  return (
   <ScrollView>
   <Header/>
    <Slider/>
    <PetListByCategory/>
   <Link href={'/add-new-pet'} style={styles.addNewPetContainer}>
    <MaterialIcons name='pets' size={24} color="black"/>
    <Text style={{fontFamily: 'outfit-medium', color:Colors.PRIMARY}}>
      Add New</Text>
   </Link>
 </ScrollView>
 
);
}

const styles = StyleSheet.create({
  addNewPetContainer: {
    display: 'flex',
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
      padding: 20,
      marginTop: 20,
      backgroundColor: Colors.VANG,
      borderWidth: 1,
      borderColor: Colors.PRIMARY,
      borderRadius: 15,
      borderStyle: 'dashed',
      justifyContent: 'center',
      textAlign: 'center'
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    borderRadius: 99,
    marginTop: 0
  }
});