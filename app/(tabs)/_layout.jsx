import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs 
    screenOptions={{
      headerShown:false,
      tabBarActiveTintColor:Colors.PRIMARY
      }}
      >
        <Tabs.Screen name='home'
          options={{
            tabBarLabel:'Home',
            tabBarIcon:({color})=><Ionicons name="home" size={24} color={color} />
          }}
        />
        <Tabs.Screen name='favorite'
          options={{
            tabBarLabel:'Favorite',
            tabBarIcon:({color})=><FontAwesome name="heart" size={24} color={color} />
          }}
        />
         <Tabs.Screen name='inbox'
          options={{
            tabBarLabel:'Inbox',
            tabBarIcon:({color})=><Ionicons name="chatbubble" size={24} color={color} />
          }}
        />
        <Tabs.Screen name='profile'
          options={{
            tabBarLabel:'Profile',
            tabBarIcon:({color})=><FontAwesome6 name="people-roof" size={24} color={color} />
          }}
        />
    </Tabs>
  )
}