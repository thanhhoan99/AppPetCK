import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router'
import MarkFav from '../MarkFav';

export default function PetListItem({ pet }) {
  const router=useRouter();
  console.log("Image URL:", pet.imageUrl);

  return (
    <TouchableOpacity
      style={{
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
        margin: 20,
        display: 'flex',
        alignItems: 'center', // Căn giữa các phần tử trong cột
      }}
      onPress={() => router.push({pathname:'/pet-details',params:pet})}
      // onPress={() => router.push("/businessdetail/" + pet?.id)}
    >
      <View style={{
        position:'absolute',zIndex:10,right:10,top:10
      }}>
        <MarkFav pet={pet} color={'white'}/>
      </View>
      <Image
        source={{ uri:pet.imageUrl }}
        style={{
          width: 120,
          height: 120,
          borderRadius: 15,
          marginBottom: 10, // Khoảng cách giữa ảnh và text
        }}
      />

      {/* Hiển thị tên pet */}
      <View style={{ alignItems: 'center' }}>
        <Text
          style={{
            fontFamily: 'outfit-bold',
            fontSize: 20,
            textAlign: 'center', // Căn giữa văn bản
          }}
        >
          {pet.name}
        </Text>

        {/* Hiển thị breed và age trên cùng một hàng */}
        <View style={{ flexDirection: 'row', gap: 5, marginTop: 5 }}>
          <Text
            style={{
              fontFamily: 'outfit',
              color: Colors.GRAY,
              fontSize: 15,
            }}
          >
            {pet.breed}
          </Text>
          <Text
            style={{
              fontFamily: 'outfit',
              color: Colors.PRIMARY,
              fontSize: 15,
              backgroundColor:Colors.VANG,
              borderRadius:7,
              paddingHorizontal:7,
              fontSize:14
            }}
          >
             {pet.age} years
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
  