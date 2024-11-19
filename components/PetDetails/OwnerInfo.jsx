import { View, Text ,Image,StyleSheet} from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function OwnerInfo({pet}) {
  return (
    <View style={styles.container}>
    {/* Hình ảnh người dùng */}
    <View style={{display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap:20,}}>
    <Image
      source={{ uri:pet?.userImage }}
      style={{
        width: 50,
        height: 50,
        borderRadius: 99, 
      }}
    />

    {/* Thông tin người dùng */}
    <View style={{ marginTop: 10 }}>
      <Text
        style={{
          fontFamily: 'outfit-medium',
          fontSize: 17,
          color: '#000',
        }}
      >
        {pet?.username}
      </Text>
      <Text style={{ color: '#555', fontSize: 14 }}>Pet Owner</Text>
    </View>
    </View>
    <Ionicons name='send-sharp' size={24} color='black'/>
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap:20,
      backgroundColor: Colors.WHITE,
        borderWidth: 1,
        borderRadius: 12,
        marginHorizontal: 20,
        justifyContent: 'space-between',
        borderColor:Colors.PRIMARY
    }});